import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";

import HomePage from "./pages/HomePage";
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const PostDetailsPage = lazy(() => import("./pages/PostDetailsPage"));
const DashboardLayout = lazy(() => import("./module/dashboard/DashboardLayout"));
import DashboardPage from "./pages/DashboardPage";
import PostManage from "./module/post/PostManage";
import PostAddNew from "./module/post/PostAddNew";
import Loading from "./components/loading/Loading";

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
                            <Route path="/manage/post" element={<PostManage></PostManage>}></Route>
                            <Route path="/manage/add-post" element={<PostAddNew></PostAddNew>}></Route>
                        </Route>
                    </Routes>
                </AuthProvider>
            </Suspense>
        </div>
    );
}

export default App;
