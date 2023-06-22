import React from "react";
import { styled } from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";

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

const PostNewestItem = () => {
    return (
        <PostNewestItemStyles>
            <PostImage url="https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="unsplash"></PostImage>
            <div className="post-content">
                <PostCategory type="secondary">Knowledge</PostCategory>
                <PostTitle>How to create a blog with React and NodeJS</PostTitle>
                <PostMeta></PostMeta>
            </div>
        </PostNewestItemStyles>
    );
};

export default PostNewestItem;
