import React, { useEffect } from "react";
import ImageUpload from "../../components/image/ImageUpload";
import DashboardHeading from "../dashboard/DashboardHeading";
import Field from "../../components/Field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { useAuth } from "../../contexts/authContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firsebase-config";
import { toast } from "react-toastify";

const UserProfile = () => {
    const { control, reset, handleSubmit, watch, setValue, getValues, formState: { isValid, isSubmitting } } = useForm({ mode: "onChange" });
    const imageUrl = getValues("avatar");
    const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
    const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
    const { userInfo } = useAuth();
    const {
        imgUrl,
        setImageUrl,
        progress,
        handleDeleteImage,
        handleSelectImage,
    } = useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
    async function deleteAvatar() {
        const colRef = doc(db, "users", userInfo.uid);
        await updateDoc(colRef, {
            avatar: "",
        });
    }
    useEffect(() => {
        setImageUrl(imageUrl);
    }, [imageUrl, setImageUrl]);
    useEffect(() => {
        async function fetchData() {
            if (!userInfo.uid) return;
            const colRef = doc(db, "users", userInfo.uid);
            const docData = await getDoc(colRef);
            reset(docData && docData.data())
        }
        fetchData();
    }, [userInfo.uid, reset])

    const handleUpdateProfile = async (values) => {
        if (!isValid) return;
        try {
            const colRef = doc(db, "users", userInfo.uid);
            await updateDoc(colRef, {
                ...values,
                avatar: imgUrl,
            });
            toast.success("Update user information successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Update profile failed!");
        }
    } 
    console.log(userInfo.uid)
    return (
        <div>
            <DashboardHeading
                title="Account information"
                desc="Update your account information"
            ></DashboardHeading>
            <form onSubmit={handleSubmit(handleUpdateProfile)}>
                <div className="text-center mb-10">
                    <ImageUpload
                        className="!w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"
                        image={imgUrl}
                        progress={progress}
                        onChange={handleSelectImage}
                        handleDeleteImage={handleDeleteImage}
                    ></ImageUpload>
                </div>
                <div className="form-layout">
                    <Field>
                        <Label>Fullname</Label>
                        <Input
                            control={control}
                            name="fullname"
                            placeholder="Enter your fullname"
                        ></Input>
                    </Field>
                    <Field>
                        <Label>Username</Label>
                        <Input
                            control={control}
                            name="username"
                            placeholder="Enter your username"
                        ></Input>
                    </Field>
                </div>
                <div className="form-layout">
                    <Field>
                        <Label>Date of Birth</Label>
                        <Input
                            control={control}
                            name="birthday"
                            placeholder="dd/mm/yyyy"
                        ></Input>
                    </Field>
                    <Field>
                        <Label>Mobile Number</Label>
                        <Input
                            control={control}
                            name="phone"
                            placeholder="Enter your phone number"
                        ></Input>
                    </Field>
                </div>
                <div className="form-layout">
                    <Field>
                        <Label>Email</Label>
                        <Input
                            control={control}
                            name="email"
                            type="email"
                            placeholder="Enter your email address"
                        ></Input>
                    </Field>
                    <Field></Field>
                </div>
                <div className="form-layout">
                    <Field>
                        <Label>New Password</Label>
                        <Input
                            control={control}
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                        ></Input>
                    </Field>
                    <Field>
                        <Label>Confirm Password</Label>
                        <Input
                            control={control}
                            name="confirmPassword"
                            type="password"
                            placeholder="Enter your confirm password"
                        ></Input>
                    </Field>
                </div>
                <Button
                        kind="primary"
                        className="mx-auto w-[200px]"
                        type="submit"
                        $isLoading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        Update profile
                    </Button>
            </form>
        </div>
    );
};

export default UserProfile;
