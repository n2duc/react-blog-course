import React from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import slugify from "slugify";

import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import Field from "../../components/Field/Field";
import Radio from "../../components/checkbox/Radio";
import { Dropdown } from "../../components/dropdown";
import Button from "../../components/Button/Button";
import { postStatus } from "../../utils/contants";
import ImageUpload from "../../components/image/ImageUpload";
import useFirebaseImage from "../../hooks/useFirebaseImage";

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
    const { control, watch, setValue, handleSubmit, getValues } = useForm({
        mode: "onChange",
        defaultValues: {
            title: "",
            slug: "",
            status: 2,
            category: "",
        },
    });

    const watchStatus = watch("status");
    // const watchCategory = watch("category");

    const addPostHandler = async (values) => {
        const cloneValues = {...values};
        cloneValues.slug = slugify(cloneValues.slug || cloneValues.title, { lower: true });
        cloneValues.status = Number(values.status);
        console.log(cloneValues);
        // handleUploadImage(cloneValues.image);
    }

    const { imgUrl, progress, handleDeleteImage, handleSelectImage } = useFirebaseImage(setValue, getValues);

    return <PostAddNewStyles>
        <h1 className="dashboard-heading">Add new post</h1>
        <form onSubmit={handleSubmit(addPostHandler)}>
            <div className="grid grid-cols-2 gap-x-10 mb-10">
                <Field>
                    <Label>Title</Label>
                    <Input control={control} placeholder="Enter your title" name="title" required ></Input>
                </Field>
                <Field>
                    <Label>Slug</Label>
                    <Input control={control} placeholder="Enter your slug" name="slug" ></Input>
                </Field>
            </div>
            <div className="grid grid-cols-2 gap-x-10 mb-10">
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
            <div className="grid grid-cols-2 gap-x-10 mb-10">
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
                <Field>
                    <Label>Category</Label>
                    <Dropdown>
                        <Dropdown.Option>Knowledge</Dropdown.Option>
                        <Dropdown.Option>Blockchain</Dropdown.Option>
                        <Dropdown.Option>Setup</Dropdown.Option>
                        <Dropdown.Option>Nature</Dropdown.Option>
                        <Dropdown.Option>Developer</Dropdown.Option>
                    </Dropdown>
                </Field>
            </div>
            <Button type="submit" className="mx-auto">
                Add new post
            </Button>
        </form>
    </PostAddNewStyles>;
};

export default PostAddNew;
