import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardHeading from "../dashboard/DashboardHeading";
import Field from "../../components/Field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import FieldCheckboxes from "../../components/Field/FieldCheckboxes";
import Radio from "../../components/checkbox/Radio";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firsebase-config";
import { categoryStatus, userRole } from "../../utils/contants";
import { toast } from "react-toastify";
import slugify from "slugify";

const CategoryUpdate = () => {
    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { isValid, isSubmitting },
    } = useForm({
        mode: "onChange",
        defaultValues: {},
    });
    const [params] = useSearchParams();
    const categoryId = params.get("id");
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            const colRef = doc(db, "categories", categoryId);
            const singleDoc = await getDoc(colRef);
            reset(singleDoc.data());
        };
        fetchData();
    }, [categoryId, reset]);
    const handleUpdateCategory = async (values) => {
        if (!isValid) return;
        if (userInfo?.role !== userRole.ADMIN) {
            Swal.fire("Failed", "You have no right to do this action", "warning");
            return;
        }
        const colRef = doc(db, "categories", categoryId);
        await updateDoc(colRef, {
            name: values.name,
            slug: slugify(values.slug || values.name, {
                lower: true,
            }),
            status: Number(values.status),
        });
        toast.success("Update category successfully!");
        navigate("/manage/category");
    };
    const watchStatus = watch("status");
    if (!categoryId) return null;
    return (
        <div>
            <DashboardHeading
                title="Update Category"
                desc={`Update your category ID: ${categoryId}`}
            ></DashboardHeading>
            <form
                autoComplete="off"
                onSubmit={handleSubmit(handleUpdateCategory)}
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
                                checked={
                                    Number(watchStatus) ===
                                    categoryStatus.APPROVED
                                }
                                value={categoryStatus.APPROVED}
                            >
                                Approved
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={
                                    Number(watchStatus) ===
                                    categoryStatus.UNAPPROVED
                                }
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
                    Update category
                </Button>
            </form>
        </div>
    );
};

export default CategoryUpdate;
