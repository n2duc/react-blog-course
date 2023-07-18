import React from "react";
import { useForm } from "react-hook-form";
import DashboardHeading from "../dashboard/DashboardHeading";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Field from "../../components/Field/Field";
import Button from "../../components/Button/Button";
import FieldCheckboxes from "../../components/Field/FieldCheckboxes";
import Radio from "../../components/checkbox/Radio";
import { categoryStatus, userRole } from "../../utils/contants";
import slugify from "slugify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firsebase-config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CategoryAddNew = () => {
    const {
        control,
        handleSubmit,
        watch,
        reset,
        setValue,
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
    const handleAddNewCategory = async (values) => {
        if (!isValid) return;
        if (userInfo?.role !== userRole.ADMIN) {
            Swal.fire("Failed", "You have no right to do this action", "warning");
            return;
        }
        const newValues = { ...values };
        newValues.slug = slugify(newValues.slug || newValues.name, {
            lower: true,
        });
        newValues.status = Number(newValues.status);
        const colRef = collection(db, "categories");
        try {
            await addDoc(colRef, {
                ...newValues,
                createdAt: serverTimestamp(),
            });
            toast.success("Create new category done!");
        } catch (error) {
            toast.error(error.message);
        } finally {
            reset({
                name: "",
                slug: "",
                status: 1,
                createdAt: new Date(),
            })
        }
        console.log(newValues);
    };
    const watchStatus = watch("status");
    return (
        <div>
            <DashboardHeading
                title="New category"
                desc="Add new category"
            ></DashboardHeading>
            <form
                autoComplete="off"
                onSubmit={handleSubmit(handleAddNewCategory)}
            >
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
                                checked={Number(watchStatus) === categoryStatus.APPROVED}
                                value={categoryStatus.APPROVED}
                            >
                                Approved
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                                value={categoryStatus.UNAPPROVED}
                            >
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
