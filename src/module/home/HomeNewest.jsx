import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import Heading from '../../components/layouts/Heading';
import PostNewestLarge from '../post/PostNewestLarge';
import PostNewestItem from '../post/PostNewestItem';
import PostRelated from '../post/PostRelated';
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firsebase-config';
import { v4 } from 'uuid';

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
    const [posts, setPost] = useState([]);
    useEffect(() => {
        const colRef = collection(db, "posts");
        // Truy van posts noi bat
        const queries = query(colRef, where("status", "==", 1), where("hot", "==", false), limit(4));
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
    const [first, ...other] = posts;
    return (
        <HomeNewestStyles className="home-block">
            <div className="container">
                <Heading>Latest posts</Heading>
                <div className="layout">
                    <PostNewestLarge data={first}></PostNewestLarge>
                    <div className="sidebar">
                        {other.map(item => (
                            <PostNewestItem key={v4()} data={item}></PostNewestItem>
                        ))}
                    </div>
                </div>
                <PostRelated></PostRelated>
            </div>
        </HomeNewestStyles>
    )
}

export default HomeNewest