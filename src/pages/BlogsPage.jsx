import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import Heading from "../components/layouts/Heading";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firsebase-config";
import PostItem from "../module/post/PostItem";

const BlogsPage = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const colRef = collection(db, "posts");
        onSnapshot(colRef, (snapshot) => {
            const results = [];
            snapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setPosts(results);
        });
    }, []);
    useEffect(() => {
        document.title = "N2D Blog - Blogs";
    }, []);
    if (posts.length <= 0) return null;
    return (
        <Layout>
            <div className="container">
                <div className="py-10">
                    <Heading>BLogs</Heading>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                        {posts.map((item) => (
                            <PostItem key={item.id} data={item}></PostItem>
                            ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default BlogsPage;
