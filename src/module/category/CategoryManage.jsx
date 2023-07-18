import React, { useEffect, useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import Button from "../../components/Button/Button";
import Table from "../../components/table/Table";
import LabelStatus from "../../components/label/LabelStatus";
import ActionView from "../../components/action/ActionView";
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";
import { collection, deleteDoc, doc, getDocs, limit, onSnapshot, query, startAfter, where } from "firebase/firestore";
import { db } from "../../firebase/firsebase-config";
import Swal from "sweetalert2";

import { categoryStatus, userRole } from "../../utils/contants";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";

const CATEGORY_PER_PAGE = 4;

const CategoryManage = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [searchCate, setSearchCate] = useState(undefined);
    const [lastDoc, setLastDoc] = useState();
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();
    const categoryDebounce = useDebounce(searchCate);

    const handleLoadMore = async () => {
        const nextRef = query(
            collection(db, "categories"),
            startAfter(lastDoc || 0),
            limit(CATEGORY_PER_PAGE)
        );
        onSnapshot(nextRef, snapshot => {
            let results = [];
            snapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setCategoryList([...categoryList, ...results]);
        });
        const documentSnapshots = await getDocs(nextRef);
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
        setLastDoc(lastVisible);
    };

    useEffect(() => {
        async function fetchData() {
            const colRef = collection(db, "categories");
            const newRef = categoryDebounce ? query(
                colRef,
                where("name", ">=", categoryDebounce),
                where("name", "<=", categoryDebounce + "utf8"),
            ) : query(colRef, limit(CATEGORY_PER_PAGE));

            const documentSnapshots = await getDocs(newRef);
            const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
            
            onSnapshot(colRef, (snapshot => {
                setTotal(snapshot.size);
            }));

            onSnapshot(newRef, snapshot => {
                let results = [];
                snapshot.forEach((doc) => {
                    results.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setCategoryList(results);
            });
            setLastDoc(lastVisible);
        };
        fetchData();
    }, [categoryDebounce]);

    const onDeleteCategory = async (docId) => {
        if (userInfo?.role !== userRole.ADMIN) {
            Swal.fire("Failed", "You have no right to do this action", "warning");
            return;
        }
        const colRef = doc(db, "categories", docId);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2EBAC1',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteDoc(colRef);
                Swal.fire(
                    'Deleted!',
                    'Category has been deleted.',
                    'success'
                )
            }
        })
    };

    return (
        <div>
            <DashboardHeading
                title="Categories"
                desc="Manage your categories"
            >
                <div className="flex gap-4 items-center justify-center">
                    <input 
                        type="text" 
                        placeholder="Search category..." 
                        className="bg-gray-100 py-4 px-5 rounded-lg outline-none text-sm h-[50px] max-w-[260px] w-full"
                        onChange={(e) => setSearchCate(e.target.value)}
                    />
                    <Button kind="ghost" height="50px" to="/manage/add-category">Create Category</Button>
                </div>
            </DashboardHeading>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryList.length > 0 && categoryList.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <span className="italic text-gray-400">{category.slug}</span>
                            </td>
                            <td>
                                {Number(category.status) === categoryStatus.APPROVED && (
                                    <LabelStatus type="success">Approved</LabelStatus>
                                )}
                                {Number(category.status) === categoryStatus.UNAPPROVED && (
                                    <LabelStatus type="warning">Unapproved</LabelStatus>
                                )}
                            </td>
                            <td>
                                <div className="flex items-center gap-x-3">
                                    <ActionView></ActionView>
                                    <ActionEdit onClick={() => navigate(`/manage/update-category?id=${category.id}`)}></ActionEdit>
                                    <ActionDelete onClick={() => onDeleteCategory(category.id)}></ActionDelete>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {total > categoryList.length && (
                <Button kind="primary" type="button" onClick={handleLoadMore} className="mt-6 mx-auto max-w-[140px] w-full">
                    Load More
                </Button>
            )}
        </div>
    );
};

export default CategoryManage;