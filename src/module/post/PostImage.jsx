import React from 'react'
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const PostImageStyles = styled.div`
    /* &:hover img {
        transform: scale(1.1);
    } */
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.3s ease;
    }
`;

const PostImage = ({ className = "", url = "", alt = "", to = "" }) => {
    if (to) {
        return (
            <Link to={`/${to}`} style={{ display: block }}>
                <PostImageStyles className={`post-image ${className}`}>
                    <img src={url} alt={alt} loading='lazy'/>
                </PostImageStyles>
            </Link>
        )
    }
    return (
        <PostImageStyles className={`post-image ${className}`}>
            <img src={url} alt={alt} loading='lazy'/>
        </PostImageStyles>
    )
}

export default PostImage;