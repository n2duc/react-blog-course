import React, { useState, useEffect } from "react";
import Table from "../../components/table/Table";
import DashboardHeading from "../dashboard/DashboardHeading";
import Button from "../../components/Button/Button";
import ActionView from "../../components/action/ActionView";
import { useNavigate } from "react-router-dom";
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";
import { postStatus } from "../../utils/contants";
import LabelStatus from "../../components/label/LabelStatus";
import { useAuth } from "../../contexts/authContext";

import { collection, deleteDoc, doc, getDocs, limit, onSnapshot, query, startAfter, where } from "firebase/firestore";
import { db } from "../../firebase/firsebase-config";
import Swal from "sweetalert2";
import useDebounce from "../../hooks/useDebounce";
import { userRole } from "../../utils/contants";
import PostTitle from "./PostTitle";

const POST_PER_PAGE = 5;

const PostManage = () => {
    const [postList, setPostList] = useState([]);
    const [searchPost, setSearchPost] = useState("");
    const [lastDoc, setLastDoc] = useState();
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const { userInfo } = useAuth();

    const postDebounce = useDebounce(searchPost);

    const handleLoadMore = async () => {
        const nextRef = query(
            collection(db, "posts"),
            startAfter(lastDoc || 0),
            limit(POST_PER_PAGE)
        );
        onSnapshot(nextRef, snapshot => {
            let results = [];
            snapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setPostList([...postList, ...results]);
        });
        const documentSnapshots = await getDocs(nextRef);
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        setLastDoc(lastVisible);
    };

    useEffect(() => {
        async function fetchData() {
            const colRef = collection(db, "posts");
            const newRef = postDebounce ? query(
                colRef,
                where("title", ">=", postDebounce),
                where("title", "<=", postDebounce + "utf8"),
            ) : query(colRef, limit(POST_PER_PAGE));

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
                setPostList(results);
            });
            setLastDoc(lastVisible);
        };
        fetchData();
    }, [postDebounce]);

    const handleDeletePost = async (postId) => {
        const colRef = doc(db, "posts", postId);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2EBAC1',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete it!'
        }).then(async (result) => {
            if (result.isConfirmed && userInfo?.role === userRole.ADMIN) {
                await deleteDoc(colRef);
                Swal.fire(
                    'Deleted!',
                    'Your post has been deleted.',
                    'success'
                )
            } else {
                Swal.fire("Failed", "You have no right to do this action", "warning");
                console.log("O day")
            }
        })
    };

    const renderPostStatus = (status) => {
        switch(status) {
            case postStatus.APPROVED:
                return <LabelStatus type="success">Approved</LabelStatus>
            case postStatus.PENDING:
                return <LabelStatus type="warning">Pending</LabelStatus>
            case postStatus.REJECTED:
                return <LabelStatus type="danger">Rejected</LabelStatus>
            default:
                break;
        }
    };
    return (
        <div>
            <DashboardHeading title="All posts" desc="Manage all posts"></DashboardHeading>
            <div className="mb-10 flex justify-end">
                <div className="w-full max-w-[300px]">
                    <input
                        type="text"
                        className="w-full p-4 rounded-lg border border-solid border-gray-300"
                        placeholder="Search post..."
                        onChange={(e) => setSearchPost(e.target.value)}
                    />
                </div>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Post</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {postList.length > 0 && postList.map((post) => {
                        const date = post?.createdAt?.seconds
                            ? new Date(post?.createdAt?.seconds * 1000)
                            : new Date();
                        const formatDate = new Date(date).toLocaleDateString("vi-VI");
                        return (
                            <tr key={post.id}>
                                <td title={post.id}>{post.id?.slice(0, 5) + "..."}</td>
                                <td className="!pr-[100px]">
                                    <div className="flex items-center gap-x-3">
                                        <img
                                            src={post.imgUrl}
                                            alt={post.image_name}
                                            className="w-[66px] h-[55px] rounded object-cover"
                                        />
                                        <div className="flex-1">
                                            <PostTitle to={post.slug} className="font-semibold">{post.title}</PostTitle>
                                            <time className="text-sm text-gray-500">
                                                Date: {formatDate}
                                            </time>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="text-gray-500">{post.category?.name}</span>
                                </td>
                                <td>
                                    <span className="text-gray-500">{post.user?.username}</span>
                                </td>
                                <td>{renderPostStatus(post.status)}</td>
                                <td>
                                    <div className="flex items-center gap-x-3 text-gray-500">
                                        <ActionView onClick={() => navigate(`/${post.slug}`)} />
                                        <ActionEdit onClick={() => navigate(`/manage/update-post?id=${post.id}`)} />
                                        <ActionDelete onClick={() => handleDeletePost(post.id)} />
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            {total > postList.length && (
                <div className="mt-10 text-center">
                    <Button kind="primary" type="button" className="mx-auto w-[140px]" onClick={handleLoadMore}>
                        Load more
                    </Button>
                </div>
            )}
        </div>
    );
};

export default PostManage;
