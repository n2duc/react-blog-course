import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";

const HomePage = lazy(() => import("./pages/HomePage"));
const BlogsPage = lazy(() => import("./pages/BlogsPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Loading = lazy(() => import("./components/loading/Loading"));

const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const CategoryAddNew = lazy(() => import("./module/category/CategoryAddNew"));
const CategoryManage = lazy(() => import("./module/category/CategoryManage"));
const CategoryUpdate = lazy(() => import("./module/category/CategoryUpdate"));

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const DashboardLayout = lazy(() => import("./module/dashboard/DashboardLayout"));

const PostDetailsPage = lazy(() => import("./pages/PostDetailsPage"));
const PostAddNew = lazy(() => import("./module/post/PostAddNew"));
const PostManage = lazy(() => import("./module/post/PostManage"));
const PostUpdate = lazy(() => import("./module/post/PostUpdate"));

const UserProfile = lazy(() => import("./module/user/UserProfile"));
const UserManage = lazy(() => import("./module/user/UserManage"));
const UserAddNew = lazy(() => import("./module/user/UserAddNew"));
const UserUpdate = lazy(() => import("./module/user/UserUpdate"));

const App = () => {
    return (
        <div>
            <Suspense fallback={<Loading />}>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<HomePage></HomePage>}></Route>
                        <Route path="/blogs" element={<BlogsPage></BlogsPage>}></Route>
                        <Route path="/sign-up" element={<SignUpPage />}></Route>
                        <Route path="/sign-in" element={<SignInPage />}></Route>
                        <Route path="*" element={<NotFoundPage />}></Route>

                        <Route path="/blog/:slug" element={<PostDetailsPage />}></Route>
                        <Route path="/category/:slug" element={<CategoryPage />}></Route>

                        <Route element={<DashboardLayout />}>
                            <Route path="/dashboard" element={<DashboardPage></DashboardPage>}></Route>
                            <Route path="/manage/posts" element={<PostManage></PostManage>}></Route>
                            <Route path="/manage/add-post" element={<PostAddNew></PostAddNew>}></Route>
                            <Route path="/manage/update-post" element={<PostUpdate></PostUpdate>}></Route>
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
