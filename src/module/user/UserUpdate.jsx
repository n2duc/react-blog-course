import React from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import ImageUpload from "../../components/image/ImageUpload";
import Field from "../../components/Field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import FieldCheckboxes from "../../components/Field/FieldCheckboxes";
import Radio from "../../components/checkbox/Radio";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { userRole, userStatus } from "../../utils/contants";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../../firebase/firsebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/authContext";
import Textarea from "../../components/textarea/Textarea";

const UserUpdate = () => {
    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        watch,
        reset,
        formState: { isValid, isSubmitting },
    } = useForm({ mode: "onChange" });
    const [params] = useSearchParams();
    const watchStatus = watch("status");
    const watchRole = watch("role");
    const userId = params.get("id");
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
    const handleUpdateUser = async (values) => {
        if (!isValid) return;
        if (userInfo?.role !== userRole.ADMIN) {
            Swal.fire(
                "Failed",
                "You have no right to do this action",
                "warning"
            );
            return;
        }
        try {
            const colRef = doc(db, "users", userId);
            await updateDoc(colRef, {
                ...values,
                avatar: imgUrl,
            });
            toast.success("Update user information successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Update user failed!");
        }
    };
    async function deleteAvatar() {
        const colRef = doc(db, "users", userId);
        await updateDoc(colRef, {
            avatar: "",
        });
    };
    useEffect(() => {
        setImageUrl(imageUrl);
    }, [imageUrl, setImageUrl]);
    useEffect(() => {
        async function fetchData() {
            if (!userId) return;
            const colRef = doc(db, "users", userId);
            const docData = await getDoc(colRef);
            reset(docData && docData.data());
        }
        fetchData();
    }, [userId, reset]);
    if (!userId) return null;

    return (
        <div>
            <div>
                <DashboardHeading
                    title="Update user"
                    desc="Update user information"
                ></DashboardHeading>
                <form onSubmit={handleSubmit(handleUpdateUser)}>
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
                                name="fullname"
                                placeholder="Enter your fullname"
                                control={control}
                            ></Input>
                        </Field>
                        <Field>
                            <Label>Username</Label>
                            <Input
                                name="username"
                                placeholder="Enter your username"
                                control={control}
                            ></Input>
                        </Field>
                    </div>
                    <div className="form-layout">
                        <Field>
                            <Label>Email</Label>
                            <Input
                                name="email"
                                placeholder="Enter your email"
                                control={control}
                                type="email"
                            ></Input>
                        </Field>
                        <Field>
                            <Label>Password</Label>
                            <Input
                                name="password"
                                placeholder="Enter your password"
                                control={control}
                                type="password"
                            ></Input>
                        </Field>
                    </div>
                    <div className="form-layout">
                        <Field>
                            <Label>Status</Label>
                            <FieldCheckboxes>
                                <Radio
                                    name="status"
                                    control={control}
                                    checked={
                                        Number(watchStatus) ===
                                        userStatus.ACTIVE
                                    }
                                    value={userStatus.ACTIVE}
                                >
                                    Active
                                </Radio>
                                <Radio
                                    name="status"
                                    control={control}
                                    checked={
                                        Number(watchStatus) ===
                                        userStatus.PENDING
                                    }
                                    value={userStatus.PENDING}
                                >
                                    Pending
                                </Radio>
                                <Radio
                                    name="status"
                                    control={control}
                                    checked={
                                        Number(watchStatus) === userStatus.BAN
                                    }
                                    value={userStatus.BAN}
                                >
                                    Banned
                                </Radio>
                            </FieldCheckboxes>
                        </Field>
                        <Field>
                            <Label>Role</Label>
                            <FieldCheckboxes>
                                <Radio
                                    name="role"
                                    control={control}
                                    checked={
                                        Number(watchRole) === userRole.ADMIN
                                    }
                                    value={userRole.ADMIN}
                                >
                                    Admin
                                </Radio>
                                <Radio
                                    name="role"
                                    control={control}
                                    checked={Number(watchRole) === userRole.MOD}
                                    value={userRole.MOD}
                                >
                                    Moderator
                                </Radio>
                                <Radio
                                    name="role"
                                    control={control}
                                    checked={
                                        Number(watchRole) === userRole.USER
                                    }
                                    value={userRole.USER}
                                >
                                    User
                                </Radio>
                            </FieldCheckboxes>
                        </Field>
                    </div>
                    <div className="form-layout">
                        <Field>
                            <Label>Description</Label>
                            <Textarea name="description" control={control}></Textarea>
                        </Field>
                    </div>
                    <Button
                        kind="primary"
                        className="mx-auto w-[200px]"
                        type="submit"
                        $isLoading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        Update user
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default UserUpdate;
