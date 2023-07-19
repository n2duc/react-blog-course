import React from "react";
import { styled } from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import slugify from "slugify";

const PostNewestItemStyles = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 28px;
    padding-bottom: 28px;
    border-bottom: 1px solid #ddd;
    &:last-child {
        padding-bottom: 0;
        margin-bottom: 0;
        border-bottom: 0;
    }
    .post {
        &-image {
            display: block;
            flex-shrink: 0;
            width: 180px;
            height: 130px;
            border-radius: 10px;
            overflow: hidden;
        }
        &-category {
            margin-bottom: 8px;
        }
        &-content {
            flex: 1;
        }
        &-title {
            margin-bottom: 8px;
        }
    }
    @media screen and (max-width: 1023.98px) {
        margin-bottom: 14px;
        padding-bottom: 14px;
        .post {
            &-image {
                width: 140px;
                height: 100px;
            }
        }
    }
`;

const PostNewestItem = ({ data }) => {
    if (!data.id) return null;
    const date = data?.createdAt?.seconds
        ? new Date(data?.createdAt?.seconds * 1000)
        : new Date();
    const formatDate = new Date(date).toLocaleDateString("vi-VI");
    return (
        <PostNewestItemStyles>
            <PostImage url={data?.imgUrl} to={data?.slug} alt="unsplash"></PostImage>
            <div className="post-content">
                <PostCategory to={data?.category?.slug} type="secondary">{data.category?.name}</PostCategory>
                <PostTitle to={data?.slug}>{data?.title}</PostTitle>
                <PostMeta
                    to={slugify(data?.user?.username || "", { lower: true })}
                    authorName={data?.user?.fullname}
                    date={formatDate}
                ></PostMeta>
            </div>
        </PostNewestItemStyles>
    );
};

export default PostNewestItem;
