import React from "react";
import { styled } from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";

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

const PostFeatureItem = () => {
    return (
        <PostFeatureItemStyles>
            <PostImage url="https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="unsplash"></PostImage>
            <div className="post-overlay"></div>
            <div className="post-content">
                <div className="post-top">
                    <PostCategory>Knowledge</PostCategory>
                    <PostMeta></PostMeta>
                </div>
                <PostTitle size="big">How to create a blog with React and NodeJS</PostTitle>
            </div>
        </PostFeatureItemStyles>
    );
};

export default PostFeatureItem;
