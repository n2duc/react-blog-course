import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, where } from "firebase/firestore"

import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import Field from "../../components/Field/Field";
import Radio from "../../components/checkbox/Radio";
import { Dropdown } from "../../components/dropdown";
import Button from "../../components/Button/Button";
import { postStatus, userRole } from "../../utils/contants";
import ImageUpload from "../../components/image/ImageUpload";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import Toggle from "../../components/toggle/Toggle";
import { db } from "../../firebase/firsebase-config";
import { useAuth } from "../../contexts/authContext";
import { toast } from "react-toastify";
import DashboardHeading from "../dashboard/DashboardHeading";
import Swal from "sweetalert2";


const PostAddNew = () => {
    const { userInfo } = useAuth();
    const [categories, setCategories] = useState([]);
    const [nameSelectCategory, setNameSelectCategory]  = useState("");
    const [loading, setLoading] = useState(false);
    
    const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
        mode: "onChange",
        defaultValues: {
            title: "",
            slug: "",
            status: 2,
            hot: false,
            imgUrl: "",
            category: {},
            user: {},
        },
    });
    
    const { imgUrl, progress, handleDeleteImage, handleSelectImage, handleResetUpload } = useFirebaseImage(setValue, getValues);
    const watchStatus = watch("status");
    const watchHot = watch("hot");

    useEffect(() => {
        document.title = "Add new post";
    }, []);
    // const watchCategory = watch("category");
    useEffect(() => {
        async function fetchUserData() {
            if (!userInfo.email) return;
            const q = query(
                collection(db, "users"),
                where("email", "==", userInfo.email)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setValue("user", {
                    id: doc.id,
                    ...doc.data(),
                });
            });
        }
        fetchUserData();
    }, [userInfo.email]);
    const addPostHandler = async (values) => {
        if (userInfo?.role !== userRole.ADMIN) {
            Swal.fire("Failed", "You have no right to do this action", "warning");
            return;
        }
        setLoading(true);
        try {
            const cloneValues = {...values};
            cloneValues.slug = slugify(values.slug || values.title, { lower: true });
            cloneValues.status = Number(values.status);

            const colRef = collection(db, "posts");
            await addDoc(colRef, {
                ...cloneValues,
                imgUrl,
                createdAt: serverTimestamp(),
            });
            toast.success("Create new post successfully");
            reset({
                title: "",
                slug: "",
                status: 2,
                hot: false,
                imgUrl: "",
                category: {},
                user: {},
            });
            handleResetUpload();
            setNameSelectCategory("");
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        async function getDataCategories() {
            const colRef = collection(db, "categories");
            const q = query(colRef, where("status", "==", 1));
            const querySnapshot = await getDocs(q);
            let result = [];
            querySnapshot.forEach((doc) => {
                result.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setCategories(result);
        };
        getDataCategories();
    }, []);

    const handleClickCategory = async (item) => {
        const colRef = doc(db, "categories", item.id);
        const docData = await getDoc(colRef);
        setValue("category", {
            id: docData.id,
            ...docData.data(),
        });
        setNameSelectCategory(item.name);
    };

    return (
    <>
        <DashboardHeading title="Add post" desc="Add new post"></DashboardHeading>
        <form onSubmit={handleSubmit(addPostHandler)}>
            <div className="grid grid-cols-2 gap-x-10 mb-7">
                <Field>
                    <Label>Title</Label>
                    <Input control={control} placeholder="Enter your title" name="title" required ></Input>
                </Field>
                <Field>
                    <Label>Slug</Label>
                    <Input control={control} placeholder="Enter your slug" name="slug" ></Input>
                </Field>
            </div>
            <div className="grid grid-cols-2 gap-x-10 mb-7">
                <Field>
                    <Label>Image</Label>
                    <ImageUpload
                        className="h-[240px]"
                        onChange={handleSelectImage} 
                        handleDeleteImage={handleDeleteImage}
                        name="imageUpload" 
                        progress={progress} 
                        image={imgUrl}
                    >
                    </ImageUpload>
                </Field>
                <Field>
                    <Label>Category</Label>
                    <Dropdown>
                        <Dropdown.Select placeholder={nameSelectCategory || "Select the category"}></Dropdown.Select>
                        <Dropdown.List>
                            {categories.length > 0 && categories.map((item) => (
                                <Dropdown.Option key={item.id} onClick={() => handleClickCategory(item)}>
                                    {item.name}
                                </Dropdown.Option>
                            ))}
                        </Dropdown.List>
                    </Dropdown>
                </Field>
            </div>
            <div className="grid grid-cols-2 gap-x-10 mb-7">
                <Field>
                    <Label>Status</Label>
                    <div className="flex items-center gap-x-5">
                        <Radio
                            name="status"
                            control={control}
                            checked={Number(watchStatus) === postStatus.APPROVED}
                            value={postStatus.APPROVED}
                        >
                            Approved
                        </Radio>
                        <Radio
                            name="status"
                            control={control}
                            checked={Number(watchStatus) === postStatus.PENDING}
                            value={postStatus.PENDING}
                        >
                            Pending
                        </Radio>
                        <Radio
                            name="status"
                            control={control}
                            checked={Number(watchStatus) === postStatus.REJECTED}
                            value={postStatus.REJECTED}
                        >
                            Reject
                        </Radio>
                    </div>
                </Field>
                <Field>
                    <Label>Feature post</Label>
                    <Toggle on={watchHot === true} onClick={() => setValue("hot", !watchHot)}></Toggle>
                </Field>
            </div>
            <Button type="submit" className="mx-auto max-w-[180px] w-full" $isLoading={loading} disabled={loading}>
                Add new post
            </Button>
        </form>
    </>);
};

export default PostAddNew;
