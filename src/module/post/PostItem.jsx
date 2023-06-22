import React from "react";
import { styled } from "styled-components";
import PostImage from "./PostImage";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";

const PostItemStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .post {
        &-image {
            height: 202px;
            margin-bottom: 20px;
            display: block;
            width: 100%;
            border-radius: 12px;
            overflow: hidden;
        }
        &-category {
            margin-bottom: 10px;
        }
        &-title {
            margin-bottom: 12px;
        }
    }
    @media screen and (max-width: 1023.98px) {
        .post {
            &-image {
                aspect-ratio: 16/9;
                height: auto;
            }
        }
    }
`;

const PostItem = () => {
    return (
        <PostItemStyles>
            <PostImage url="https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="unsplash"></PostImage>
            <PostCategory>Knowledge</PostCategory>
            <PostTitle>How to create a blog with React and NodeJS</PostTitle>
            <PostMeta></PostMeta>
        </PostItemStyles>
    );
};

export default PostItem;
