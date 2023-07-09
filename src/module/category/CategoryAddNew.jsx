import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/authContext";
import DashboardHeading from "../dashboard/DashboardHeading";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Field from "../../components/Field/Field";
import Button from "../../components/Button/Button";
import FieldCheckboxes from "../../components/Field/FieldCheckboxes";
import Radio from "../../components/checkbox/Radio";

const CategoryAddNew = () => {
    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { isValid, isSubmitting },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            slug: "",
            status: 1,
            createdAt: new Date(),
        },
    });
    const { userInfo } = useAuth();
    return (
        <div>
            <DashboardHeading
                title="New category"
                desc="Add new category"
            ></DashboardHeading>
            <form autoComplete="off">
                <div className="form-layout">
                    <Field>
                        <Label>Name</Label>
                        <Input
                            control={control}
                            name="name"
                            placeholder="Enter your category name"
                            required
                        ></Input>
                    </Field>
                    <Field>
                        <Label>Slug</Label>
                        <Input
                            control={control}
                            name="slug"
                            placeholder="Enter your slug"
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
                                checked={true}
                            >
                                Approved
                            </Radio>
                            <Radio name="status" control={control}>
                                Unapproved
                            </Radio>
                        </FieldCheckboxes>
                    </Field>
                </div>
                <Button
                    kind="primary"
                    className="mx-auto w-[200px]"
                    type="submit"
                    disabled={isSubmitting}
                    $isLoading={isSubmitting}
                >
                    Add new category
                </Button>
            </form>
        </div>
    );
};

export default CategoryAddNew;
