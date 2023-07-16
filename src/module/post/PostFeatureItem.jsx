import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firsebase-config";
import useShortName from "../../hooks/useShortName";

const PostFeatureItemStyles = styled.div`
    width: 100%;
    border-radius: 10px;
    position: relative;
    height: 169px;
    .post {
        &-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 12px;
            overflow: hidden;
        }
        &-overlay {
            position: absolute;
            inset: 0;
            border-radius: 12px;
            background-color: rgba(0, 0, 0, 0.75);
            mix-blend-mode: multiply;
            opacity: 0.6;
        }
        &-content {
            position: absolute;
            inset: 0;
            z-index: 10;
            padding: 20px;
            color: white;
        }
        &-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }
        &-info {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            font-weight: 600;
            color: inherit;
            margin-left: auto;
        }
        &-dot {
            display: inline-block;
            width: 4px;
            height: 4px;
            background-color: currentColor;
            border-radius: 100rem;
        }
    }

    @media screen and (min-width: 1024px) {
        height: 272px;
    }
    @media screen and (max-width: 1023.98px) {
        .post {
            &-content {
                padding: 15px;
            }
        }
    }
`;

const PostFeatureItem = ({ data }) => {
    const [category, setCategory] = useState("");
    const [user, setUser] = useState("");
    
    useEffect(() => {
        async function fetch() {
            const docRef = doc(db, "categories", data.categoryId);
            const docSnap = await getDoc(docRef);
            setCategory(docSnap.data());
        };
        fetch();
    }, [data.categoryId]);
    useEffect(() => {
        async function fetchUser() {
            if (data.userId) {
                const docRef = doc(db, "users", data.userId);
                const docSnap = await getDoc(docRef);
                if (docSnap.data) {
                    setUser(docSnap.data());
                }
            }
        };
        fetchUser();
    }, [data.userId]);
    if (!data || !data.id) return null;
    const userName = useShortName(user?.fullname)
    const datePost = new Date(new Date(data?.createdAt?.seconds * 1000)).toLocaleDateString("vi-VI");
    return (
        <PostFeatureItemStyles>
            <PostImage url={data.imgUrl} alt="unsplash"></PostImage>
            <div className="post-overlay"></div>
            <div className="post-content">
                <div className="post-top">
                    {category?.name && <PostCategory to={category.slug}>{category.name}</PostCategory>}
                    <PostMeta to={userName} authorName={userName} date={datePost}></PostMeta>
                </div>
                <PostTitle to={`blog/${data.slug}`} size="big">{data.title}</PostTitle>
            </div>
        </PostFeatureItemStyles>
    );
};

export default PostFeatureItem;
