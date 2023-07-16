import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";

import HomePage from "./pages/HomePage";
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const PostDetailsPage = lazy(() => import("./pages/PostDetailsPage"));
const DashboardLayout = lazy(() => import("./module/dashboard/DashboardLayout"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
import PostManage from "./module/post/PostManage";
import PostAddNew from "./module/post/PostAddNew";
import PostCategory from "./module/post/PostCategory";
import Loading from "./components/loading/Loading";
import CategoryAddNew from "./module/category/CategoryAddNew";
import UserProfile from "./module/user/UserProfile";
import UserManage from "./module/user/UserManage";
import UserAddNew from "./module/user/UserAddNew";
import CategoryManage from "./module/category/CategoryManage";
import CategoryUpdate from "./module/category/CategoryUpdate";
import UserUpdate from "./module/user/UserUpdate";

function App() {
    return (
        <div>
            <Suspense fallback={<Loading />}>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<HomePage></HomePage>}></Route>
                        <Route path="/sign-up" element={<SignUpPage />}></Route>
                        <Route path="/sign-in" element={<SignInPage />}></Route>
                        <Route path="*" element={<NotFoundPage />}></Route>

                        <Route path="/blog/:slug" element={<PostDetailsPage />}></Route>

                        <Route element={<DashboardLayout />}>
                            <Route path="/dashboard" element={<DashboardPage></DashboardPage>}></Route>
                            <Route path="/manage/add-post" element={<PostAddNew></PostAddNew>}></Route>
                            <Route path="/manage/post" element={<PostManage></PostManage>}></Route>
                            <Route path="/manage/category" element={<CategoryManage></CategoryManage>}></Route>
                            <Route path="/manage/add-category" element={<CategoryAddNew></CategoryAddNew>}></Route>
                            <Route path="/manage/update-category" element={<CategoryUpdate></CategoryUpdate>}></Route>
                            <Route path="/manage/user" element={<UserManage></UserManage>}></Route>
                            <Route path="/manage/add-user" element={<UserAddNew></UserAddNew>}></Route>
                            <Route path="/manage/update-user" element={<UserUpdate></UserUpdate>}></Route>
                            <Route path="/profile" element={<UserProfile></UserProfile>}></Route>
                        </Route>
                    </Routes>
                </AuthProvider>
            </Suspense>
        </div>
    );
}

export default App;
