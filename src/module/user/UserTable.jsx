import React from "react";
import { useState } from "react";
import Table from "../../components/table/Table";
import { useEffect } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firsebase-config";
import { useNavigate } from "react-router-dom";
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";
import { userRole, userStatus } from "../../utils/contants";
import LabelStatus from "../../components/label/LabelStatus";
import { deleteUser } from "firebase/auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UserTable = () => {
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const colRef = collection(db, "users");
        onSnapshot(colRef, (snapshot) => {
            const results = [];
            snapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setUserList(results);
        });
    }, []);

    const handleDeleteUser = async (user) => {
        const colRef = doc(db, "users", user.id);
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
                    'User has been deleted.',
                    'success'
                )
            }
        })
        await deleteUser(user);
        toast.success("Deleted user!")
    }

    const renderRoleName = (name) => {
        switch(name) {
            case userRole.ADMIN:
                return "Admin";
            case userRole.MOD:
                return "Moderator";
            case userRole.USER:
                return "User"
            default:
                break;
        }
    };

    const renderLabelStatus = (status) => {
        switch(status) {
            case userStatus.ACTIVE:
                return <LabelStatus type="success">Active</LabelStatus>
            case userStatus.PENDING:
                return <LabelStatus type="warning">Pending</LabelStatus>
            case userStatus.BAN:
                return <LabelStatus type="danger">Rejected</LabelStatus>
            default:
                break;
        }
    };

    // Render User
    const renderUserItem = (user) => {
        return (
            <tr key={user.id}>
                <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
                <td>
                    <div className="flex items-center gap-x-3">
                        <img src={user?.avatar} alt="avatar" className="flex-shrink-0 object-cover w-10 h-10 rounded-md" />
                        <div className="flex-1">
                            <h3>{user?.fullname}</h3>
                            <time className="text-sm text-gray-300">
                                {new Date(user?.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}
                            </time>
                        </div>
                    </div>
                </td>
                <td>{user?.username}</td>
                <td title={user.email}>{user?.email.slice(0, 5) + "..."}</td>
                <td>{renderLabelStatus(Number(user?.status))}</td>
                <td>{renderRoleName(Number(user?.role))}</td>
                <td>
                    <div className="flex items-center gap-x-3">
                        <ActionEdit onClick={() => navigate(`/manage/update-user?id=${user.id}`)}></ActionEdit>
                        <ActionDelete onClick={() => handleDeleteUser(user)}></ActionDelete>
                    </div>
                </td>
            </tr>
        )
    };

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Info</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.length > 0 && userList.map((user) => renderUserItem(user))}
                </tbody>
            </Table>
        </div>
    );
};

export default UserTable;
