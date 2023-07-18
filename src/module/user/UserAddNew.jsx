import React from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import Field from "../../components/Field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import FieldCheckboxes from "../../components/Field/FieldCheckboxes";
import Radio from "../../components/checkbox/Radio";
import ImageUpload from "../../components/image/ImageUpload";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { userRole, userStatus } from "../../utils/contants";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { auth, db } from "../../firebase/firsebase-config";
import { addDoc, collection, serverTimestamp, setDoc } from "firebase/firestore";
import useShortName from "../../hooks/useShortName";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/authContext";

const UserAddNew = () => {
    const { control, handleSubmit, setValue, watch, getValues, reset, formState: {isValid, isSubmitting} } = useForm({
        mode: "onChange",
        defaultValues: {
            fullname: "",
            username: "",
            email: "",
            password: "",
            avatar: "",
            status: userStatus.ACTIVE,
            role: userRole.USER,
            createdAt: new Date(),
        },
    });
    const { imgUrl, progress, handleDeleteImage, handleSelectImage, handleResetUpload } = useFirebaseImage(setValue, getValues);
    const { userInfo } = useAuth();
    const handleCreateUser = async (values) => { 
        if (!isValid) return;
        if (userInfo?.role !== userRole.ADMIN) {
            Swal.fire("Failed", "You have no right to do this action", "warning");
            return;
        }
        const userName = useShortName(values.fullname);
        try {
            await createUserWithEmailAndPassword(auth, values.email, values.password);
            await addDoc(collection(db, "users"), {
                fullname: values.fullname,
                email: values.email,
                password: values.password,
                username: values.username || userName,
                avatar: imgUrl,
                status: Number(values.status),
                role: Number(values.role),
                createdAt: serverTimestamp(),
            });
            toast.success("Create new user successfully!")
            reset({
                fullname: "",
                username: "",
                email: "",
                password: "",
                avatar: "",
                status: userStatus.ACTIVE,
                role: userRole.USER,
                createdAt: new Date(),
            });
            handleResetUpload();
        } catch (error) {
            console.log(error);
            toast.error(`${error}`)
        }
    };
    const watchStatus = watch("status");
    const watchRole = watch("role");
    return (
        <div>
            <DashboardHeading
                title="New user"
                desc="Add new user to system"
            ></DashboardHeading>
            <form onSubmit={handleSubmit(handleCreateUser)}>
                <div className="text-center mb-10">
                    <ImageUpload className="!w-[200px] h-[200px] !rounded-full min-h-0 mx-auto" image={imgUrl} progress={progress} onChange={handleSelectImage} handleDeleteImage={handleDeleteImage}></ImageUpload>
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
                                checked={Number(watchStatus) === userStatus.ACTIVE}
                                value={userStatus.ACTIVE}
                            >
                                Active
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={Number(watchStatus) === userStatus.PENDING}
                                value={userStatus.PENDING}
                            >
                                Pending
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={Number(watchStatus) === userStatus.BAN}
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
                                checked={Number(watchRole) === userRole.ADMIN}
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
                                checked={Number(watchRole) === userRole.USER}
                                value={userRole.USER}
                            >
                                User
                            </Radio>
                        </FieldCheckboxes>
                    </Field>
                </div>
                <Button
                    kind="primary"
                    className="mx-auto w-[200px]"
                    type="submit"
                    $isLoading={isSubmitting}
                    disabled={isSubmitting}
                >
                    Add new user
                </Button>
            </form>
        </div>
    );
};

export default UserAddNew;
