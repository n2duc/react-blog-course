import React, { useState, useEffect } from "react";
import Layout from "../components/layouts/Layout";
import { useParams } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/firsebase-config";
import Heading from "../components/layouts/Heading";
import PostItem from "../module/post/PostItem";

const CategoryPage = () => {
    const [posts, setPosts] = useState([]);
    const params = useParams();
    useEffect(() => {
        async function fetchData() {
            const docRef = query(
                collection(db, "posts"),
                where("category.slug", "==", params.slug)
            );
            onSnapshot(docRef, (snapshot) => {
                const results = [];
                snapshot.forEach((doc) => {
                    results.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setPosts(results);
            });
        }
        fetchData();
    }, [params.slug]);
    if (posts.length <= 0) return null;
    return (
        <Layout>
            <div className="container">
                <div className="pt-10"></div>
                <Heading>Danh mục {params.slug}</Heading>
                <div className="grid-layout grid-layout--primary">
                    {posts.map((item) => (
                        <PostItem key={item.id} data={item}></PostItem>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default CategoryPage;
