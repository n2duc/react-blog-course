import React from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import axios from "axios";
import { imgbbAPI } from "../../config/apiConfig";

import Field from "../../components/Field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import ImageUpload from "../../components/image/ImageUpload";
import { Dropdown } from "../../components/dropdown";
import Radio from "../../components/checkbox/Radio";
import Toggle from "../../components/toggle/Toggle";
import Button from "../../components/Button/Button";
import { useAuth } from "../../contexts/authContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { categoryStatus, postStatus, userRole } from "../../utils/contants";
import Swal from "sweetalert2";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase/firsebase-config";
import { toast } from "react-toastify";
import { useMemo } from "react";
import slugify from "slugify";
Quill.register("modules/imageUploader", ImageUploader);

const PostUpdate = () => {
    const { userInfo } = useAuth();
    const [params] = useSearchParams();
    const postId = params.get("id");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState([]);
    const [nameSelectCategory, setNameSelectCategory]  = useState("");
    const navigate = useNavigate();

    const { control, setValue, getValues, handleSubmit, watch, reset, formState: { isValid, isSubmitting } } = useForm({ mode: "onChange" });

    const imageURL = getValues("imgUrl");
    const imageName = getValues("image_name");
    const { imgUrl, setImageUrl, progress, handleDeleteImage, handleSelectImage, handleResetUpload } = useFirebaseImage(setValue, getValues, imageName, deletePostImage);
    
    const watchStatus = watch("status");
    const watchHot = watch("hot");

    async function deletePostImage() {
        if (userInfo?.role !== userRole.ADMIN) {
            Swal.fire("Failed", "You have no right to do this action", "warning");
            return;
        }
        const colRef = doc(db, "users", postId);
        await updateDoc(colRef, {
            avatar: "",
        })
    }
    useEffect(() => {
        setImageUrl(imageURL);
    }, [imageURL, setImageUrl])

    useEffect(() => {
        async function fetchData() {
            if (!postId) return;
            const docRef = doc(db, "posts", postId);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.data()) {
                reset(docSnapshot.data());
                setNameSelectCategory(docSnapshot.data()?.category.name || "");
                setContent(docSnapshot.data?.content || "");
            }
        }
        fetchData();
    }, [postId, reset]);
    useEffect(() => {
        async function getCategoriesData() {
            const colRef = collection(db, "categories");
            const q = query(colRef, where("status", "==", categoryStatus.APPROVED));
            const querySnapshot = await getDocs(q);
            let result = [];
            querySnapshot.forEach((doc) => {
                result.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setCategories(result);
        }
        getCategoriesData();
    }, []);
    const updatePostHandler = async (values) => {
        if (!isValid) return;
        if (userInfo?.role !== userRole.ADMIN) {
            Swal.fire("Failed", "You have no right to do this action", "warning");
            return;
        }
        const docRef = doc(db, "posts", postId);
        values.status = Number(values.status);
        values.slug = slugify(values.slug || values.title, { lower: true });
        await updateDoc(docRef, {
            ...values,
            imgUrl,
            content,
        });
        toast.success("Update post successfully!");
    }

    const handleClickCategory = async (item) => {
        const colRef = doc(db, "categories", item.id);
        const docData = await getDoc(colRef);
        setValue("category", {
            id: docData.id,
            ...docData.data(),
        });
        setNameSelectCategory(item.name);
    };

    const modules = useMemo(() => ({
        toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["link", "image"],
        ],
        imageUploader: {
            upload: async (file) => {
                console.log("upload: ~ file", file);
                const bodyFormData = new FormData();
                console.log("upload: ~ bodyFormData", bodyFormData);
                bodyFormData.append("image", file);
                const response = await axios({
                    method: "post",
                    url: imgbbAPI,
                    data: bodyFormData,
                    headers: {
                    "Content-Type": "multipart/form-data",
                    },
                });
                return response.data.data.url;
            },
        },
    }), []);

    useEffect(() => {
        document.title = "Update post";
    }, []);
    if (!postId) return null;
    return (
        <div>
            <DashboardHeading
                title="Update Post"
                desc={`Update your post ID: ${postId}`}
            ></DashboardHeading>
            <form onSubmit={handleSubmit(updatePostHandler)}>
                <div className="form-layout">
                    <Field>
                        <Label>Title</Label>
                        <Input control={control} placeholder="Enter your title" name="title" required ></Input>
                    </Field>
                    <Field>
                        <Label>Slug</Label>
                        <Input control={control} placeholder="Enter your slug" name="slug" ></Input>
                    </Field>
                </div>
                <div className="form-layout">
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
                <div className="mb-10">
                    <Field>
                        <Label>Content</Label>
                        <div className="w-full entry-content">
                            <ReactQuill
                                modules={modules}
                                theme="snow"
                                value={content}
                                onChange={setContent}
                            />
                        </div>
                    </Field>
                </div>
                <div className="form-layout">
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
                <Button type="submit" className="mx-auto max-w-[180px] w-full" $isLoading={isSubmitting} disabled={isSubmitting}>
                    Update post
                </Button>
            </form>
        </div>
    );
};

export default PostUpdate;
