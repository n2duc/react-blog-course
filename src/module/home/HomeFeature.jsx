import React, { useEffect, useState } from 'react';
import Heading from '../../components/layouts/Heading';
import PostFeatureItem from '../post/PostFeatureItem';
import { styled } from 'styled-components';
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firsebase-config';

const HomeFeatureStyles = styled.div``;

const HomeFeature = () => {
    const [posts, setPost] = useState([]);
    useEffect(() => {
        const colRef = collection(db, "posts");
        // Truy van posts noi bat
        const queries = query(colRef, where("status", "==", 1), where("hot", "==", true), limit(3));
        onSnapshot(queries, (snapshot) => {
            const results = [];
            snapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data(),
                });
            })
            // Set post vao state posts
            setPost(results);
        })
    }, []);
    if (posts.length <= 0) return null;
    return (
        <HomeFeatureStyles className="home-block">
            <div className="container">
                <Heading>Featured Posts</Heading>
                <div className="grid-layout">
                    {posts.map(post => (
                        <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
                    ))}
                </div>
            </div>
        </HomeFeatureStyles>
    )
};

export default HomeFeature;