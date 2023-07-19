import React from "react";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
const DashboardHeaderStyles = styled.div`
    background-color: white;
    padding: 16px 32px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    .logo {
        display: flex;
        align-items: center;
        gap: 20px;
        font-size: 18px;
        font-weight: 800;
        img {
            max-width: 40px;
        }
        .name-header {
            background-image: linear-gradient(
                to right bottom,
                ${(props) => props.theme.primaryColor},
                ${(props) => props.theme.secondaryColor}
            );
            color: transparent;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    }
    .header-avatar {
        width: 52px;
        height: 52px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100rem;
        }
    }
    .header-right {
        display: flex;
        align-items: center;
        gap: 20px;
    }
`;

const DashboardHeader = () => {
    const { userInfo } = useAuth();
    return (
        <DashboardHeaderStyles>
            <NavLink to="/" className="logo">
                <img srcSet="/LogoBlogDemo1.png" alt="n2d-blog" />
                <span className="hidden lg:inline-block name-header">N2D Manage</span>
            </NavLink>
            <div className="header-right">
                <Button to="/manage/add-post" className="header-button" height="52px">
                    Write new post
                </Button>
                <Link to="/profile" className="header-avatar">
                    <img
                        src={userInfo?.avatar}
                        alt=""
                    />
                </Link>
            </div>
        </DashboardHeaderStyles>
    );
};

export default DashboardHeader;
