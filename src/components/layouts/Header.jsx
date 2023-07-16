import React from "react";
import { styled } from "styled-components";
import Button from "../Button/Button";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import useShortName from "../../hooks/useShortName";

const MenuLink = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "Blog",
        path: "/blog",
    },
    {
        title: "About",
        path: "/about",
    },
];

const HeaderStyles = styled.div`
    padding: 20px 0;
    .header-main {
        display: flex;
        align-items: center;
    }
    .logo {
        display: block;
        max-width: 40px;
    }
    .menu {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-left: 40px;
        list-style: none;
        font-weight: 500;
        .menu-link {
            position: relative;
            padding: 8px 20px;
            background-color: transparent;
            border-radius: 4px;
        }
        .menu-link {
            &.active,
            &:hover {
                background-color: ${props => props.theme.greenSmooth};
                &:before {
                    position: absolute;
                    content: "";
                    top: 4px;
                    right: 4px;
                    width: 6px;
                    height: 6px;
                    border-radius: 100px;
                    background-color: ${props => props.theme.primaryColor};
                }
            }
        }
    }
    .search {
        position: relative;
        margin-left: auto;
        padding: 10px 15px;
        border: 1px solid #ccc;
        border-radius: 8px;
        width: 100%;
        max-width: 300px;
        display: flex;
        align-items: center;
        transition: all 0.2s linear;
        margin-right: 20px;
    }
    .search-input {
        flex: 1;
        padding-right: 30px;
        font-size: 14px;
    }
    .search:focus-within,
    .search:hover {
        outline: none;
        background-color: white;
        border-color: ${(props) => props.theme.primaryColor};
        box-shadow: 0 0 0 4px rgb(35 236 142 / 10%);
    }
    .search-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 15px;
    }
`;

const Header = () => {
    const { userInfo } = useAuth();
    const userName = useShortName(userInfo?.displayName);
    return (
        <HeaderStyles>
            <div className="container">
                <div className="header-main">
                    <NavLink to="/">
                        <img
                            src="/LogoBlogDemo1.png"
                            alt="n2d-logo"
                            className="logo"
                        />
                    </NavLink>
                    <ul className="menu">
                        {MenuLink.map((item) => (
                            <li className="menu-item" key={item.title}>
                                <NavLink to={item.path} className="menu-link">
                                    {item.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="search">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search post..."
                        />
                        <span className="search-icon">
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.49463 13.5166C2.90748 13.5166 -0.000488281 10.6086 -0.000488281 7.02149C-0.000488281 3.43433 2.90748 0.526367 6.49463 0.526367C10.0818 0.526367 12.9898 3.43433 12.9898 7.02149C12.9898 8.52262 12.4805 9.9048 11.6254 11.0047L15.9988 15.3782L14.8506 16.5264L10.4771 12.1528C9.3773 13.0076 7.99541 13.5166 6.49463 13.5166ZM11.3652 7.02271C11.3652 9.71308 9.18427 11.894 6.4939 11.894C3.80353 11.894 1.62256 9.71308 1.62256 7.02271C1.62256 4.33234 3.80353 2.15137 6.4939 2.15137C9.18427 2.15137 11.3652 4.33234 11.3652 7.02271Z" fill="#B1B5C4"/>
                            </svg>
                        </span>
                    </div>
                    {!userInfo ? (
                        <Button
                            type="button"
                            style={{
                                fontSize: "14px",
                                width: "100px"
                            }}
                            className="header-button"
                            height="43px"
                            to="/sign-in"
                        >
                            Sign In
                        </Button>
                    ) : (
                        <div className="header-auth">
                            <span>Hi, </span>
                            <strong className="text-primary">{userName}</strong>
                        </div>
                    )}
                </div>
            </div>
        </HeaderStyles>
    );
};

export default Header;
