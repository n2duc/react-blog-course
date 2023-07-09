import React from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import Field from "../../components/Field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import FieldCheckboxes from "../../components/Field/FieldCheckboxes";
import Radio from "../../components/checkbox/Radio";

const UserAddNew = () => {
    const { control } = useForm({ mode: "onChange" });
    return (
        <div>
            <DashboardHeading title="New user" desc="Add new user to system"></DashboardHeading>
            <form>
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
                            <Radio name="status" control={control}>
                                Active
                            </Radio>
                            <Radio name="status" control={control}>
                                Pending
                            </Radio>
                            <Radio name="status" control={control}>
                                Banned
                            </Radio>
                        </FieldCheckboxes>
                    </Field>
                    <Field>
                        <Label>Role</Label>
                        <FieldCheckboxes>
                            <Radio name="role" control={control}>
                                Admin
                            </Radio>
                            <Radio name="role" control={control}>
                                Moderator
                            </Radio>
                            <Radio name="role" control={control}>
                                Editor
                            </Radio>
                            <Radio name="role" control={control}>
                                User
                            </Radio>
                        </FieldCheckboxes>
                    </Field>
                </div>
                <Button kind="primary" className="mx-auto w-[200px]">
                    Add new user
                </Button>
            </form>
        </div>
    );
};

export default UserAddNew;
