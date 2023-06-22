import React from 'react'
import { styled } from 'styled-components';
import Heading from '../../components/layouts/Heading';
import PostNewestLarge from '../post/PostNewestLarge';
import PostNewestItem from '../post/PostNewestItem';
import PostRelated from '../post/PostRelated';

const HomeNewestStyles = styled.div`
    .layout {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-gap: 40px;
        margin-bottom: 40px;
        align-items: start;
    }
    .sidebar {
        padding: 24px 20px;
        background-color: #f3edff;
        border-radius: 12px;
    }
    @media screen and (max-width: 1023.98px) {
        .layout {
            grid-template-columns: 100%;
        }
        .sidebar {
            padding: 14px 10px;
        }
    }
`;

const HomeNewest = () => {
    return (
        <HomeNewestStyles className="home-block">
            <div className="container">
                <Heading>Latest posts</Heading>
                <div className="layout">
                    <PostNewestLarge></PostNewestLarge>
                    <div className="sidebar">
                        <PostNewestItem></PostNewestItem>
                        <PostNewestItem></PostNewestItem>
                        <PostNewestItem></PostNewestItem>
                    </div>
                </div>
                <PostRelated></PostRelated>
            </div>
        </HomeNewestStyles>
    )
}

export default HomeNewest