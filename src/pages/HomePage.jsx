import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase/firsebase-config";
import { styled } from "styled-components";
import HomeBanner from "../module/home/HomeBanner";
import Layout from "../components/layouts/Layout";
import HomeFeature from "../module/home/HomeFeature";
import HomeNewest from "../module/home/HomeNewest";

const HomePageStyles = styled.div`
    
`;

const HomePage = () => {
    const handleSignOut = () => {
        signOut(auth);
    };
    return (
        <HomePageStyles>
            <Layout>
                <HomeBanner></HomeBanner>
                <HomeFeature></HomeFeature>
                <HomeNewest></HomeNewest>
            </Layout>
            <button onClick={handleSignOut}>Sign Out</button>
        </HomePageStyles>
    );
};

export default HomePage;
