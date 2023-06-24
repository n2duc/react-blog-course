import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import slugify from "slugify";
import { collection, getDocs, query, where } from "firebase/firestore"

import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import Field from "../../components/Field/Field";
import Radio from "../../components/checkbox/Radio";
import { Dropdown } from "../../components/dropdown";
import Button from "../../components/Button/Button";
import { postStatus } from "../../utils/contants";
import ImageUpload from "../../components/image/ImageUpload";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import Toggle from "../../components/toggle/Toggle";
import { db } from "../../firebase/firsebase-config";

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        document.title = "Add new post";
    }, []);

    const { control, watch, setValue, handleSubmit, getValues } = useForm({
        mode: "onChange",
        defaultValues: {
            title: "",
            slug: "",
            status: 2,
            categoryId: "",
            hot: false,
        },
    });

    const watchStatus = watch("status");
    const watchHot = watch("hot");
    // const watchCategory = watch("category");

    const addPostHandler = async (values) => {
        const cloneValues = {...values};
        cloneValues.slug = slugify(cloneValues.slug || cloneValues.title, { lower: true });
        cloneValues.status = Number(values.status);
        console.log(cloneValues);
        // handleUploadImage(cloneValues.image);
    }

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

    const { imgUrl, progress, handleDeleteImage, handleSelectImage } = useFirebaseImage(setValue, getValues);

    return <PostAddNewStyles>
        <h1 className="dashboard-heading">Add new post</h1>
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
                    <Label>Author</Label>
                    <Input control={control} placeholder="Find the author" name="author"></Input>
                </Field>
            </div>
            <div className="grid grid-cols-2 gap-x-10 mb-7">
                <Field>
                    <Label>Feature post</Label>
                    <Toggle on={watchHot === true} onClick={() => setValue("hot", !watchHot)}></Toggle>
                </Field>
                <Field>
                    <Label>Category</Label>
                    <Dropdown>
                        <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
                        <Dropdown.List>
                            {categories.length > 0 && categories.map((item) => (
                                <Dropdown.Option key={item.id} onClick={() => setValue("categoryId", item.id)}>
                                    {item.name}
                                </Dropdown.Option>
                            ))}
                        </Dropdown.List>
                    </Dropdown>
                </Field>
            </div>
            <div className="grid grid-cols-2 gap-x-10 mb-7">
                <Field>
                    <Label>Image</Label>
                    <ImageUpload
                        className="h-[240px]"
                        onChange={handleSelectImage} 
                        name="imageUpload" 
                        progress={progress} 
                        image={imgUrl}
                        handleDeleteImage={handleDeleteImage}
                    >
                    </ImageUpload>
                </Field>
            </div>
            <Button type="submit" className="mx-auto">
                Add new post
            </Button>
        </form>
    </PostAddNewStyles>;
};

export default PostAddNew;
