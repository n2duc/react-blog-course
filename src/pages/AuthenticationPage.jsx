import React from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

const AuthenticationPageStyles = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 40px;
    .logo {
        margin: 0 auto 10px;
        width: 84px;
    }
    .heading {
        text-align: center;
        background-image: linear-gradient(
            to right bottom,
            ${(props) => props.theme.primaryColor},
            ${(props) => props.theme.secondaryColor}
        );
        color: transparent;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: bold;
        font-size: 32px;
        margin-bottom: 32px;
    }
    .form {
        max-width: 500px;
        margin: 0 auto;
    }
    .sign-in-text {
        display: flex;
        justify-content: space-between;
        .forget-password {
            font-size: 14px;
            margin-bottom: 20px;
            color: ${props => props.theme.primaryColor};
            font-weight: 500;
        }
    }
    .have-account {
        margin-bottom: 20px;
        font-size: 14px;
        a {
            display: inline-block;
            color: ${props => props.theme.primaryColor};
            font-weight: 500;
        }
    }
`;

const AuthenticationPage = ({ children }) => {
    return (
        <AuthenticationPageStyles>
            <div className="container">
                <NavLink to="/">
                    <img srcSet="/LogoBlogDemo1.png" alt="n2d-logo" className="logo" />
                </NavLink>
                <h1 className="heading">N2D Blogging</h1>
                {children}
            </div>
        </AuthenticationPageStyles>
    )
};

export default AuthenticationPage;