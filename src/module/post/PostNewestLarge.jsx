import React from "react";
import { styled } from "styled-components";
import PostCategory from "./PostCategory";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import PostImage from "./PostImage";

const PostNewestLargeStyles = styled.div`
    .post {
        &-image {
            display: block;
            margin-bottom: 20px;
            height: 433px;
            border-radius: 12px;
            overflow: hidden;
        }
        &-category {
            margin-bottom: 10px;
        }
        &-title {
            margin-bottom: 10px;
        }
        @media screen and (max-width: 1023.98px) {
            &-image {
                height: 250px;
            }
        }
    }
`;

const PostNewestLarge = () => {
    return (
        <PostNewestLargeStyles>
            <PostImage url="https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="unsplash"></PostImage>
            <PostCategory>Knowledge</PostCategory>
            <PostTitle size="big">
                How to create a blog with React and NodeJS
            </PostTitle>
            <PostMeta></PostMeta>
        </PostNewestLargeStyles>
    );
};

export default PostNewestLarge;
