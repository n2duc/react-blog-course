import React from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

const NotFoundPageStyles = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #151723;
    user-select: none;
    .notfound {
        position: relative;
        padding-left: 180px;
        max-width: 580px;
        width: 100%;
        h1 {
            font-size: 80px;
            font-style: italic;
            line-height: 1;
            font-weight: 700;
            margin-top: 0px;
            margin-bottom: 10px;
            color: #aef9fc;
            text-transform: uppercase;
            text-shadow: 0 0 0 transparent,
                        0 0 10px #2EBAC1,
                        0 0 20px rgba(0, 187, 255, 0.5),
                        0 0 40px #2EBAC1,
                        0 0 100px #2EBAC1,
                        0 0 200px #2EBAC1,
                        0 0 300px #2EBAC1,
                        0 0 500px #2EBAC1,
                        0 0 1000px #2EBAC1
            ;
            animation: flickerAnimation 3s linear infinite;
        }
        h2 {
            font-size: 21px;
            font-weight: 600;
            margin: 10px 0;
            text-transform: uppercase;
            color: white;
        }
        p {
            font-size: 14px;
            color: #999fa5;
            font-weight: 400;
            margin-bottom: 20px;
        }
    }
    .notfound-404 {
        position: absolute;
        left: -20px;
        top: 20px;
        display: inline-block;
        width: 160px;
        height: 160px;
        background-image: url('/LogoBlogDemo1.png');
        background-repeat: no-repeat;
        background-size: 160px 160px;
        background-color: #151723;
        background-blend-mode: luminosity;
        filter: blur(1px);
        -webkit-filter: blur(1px);
    }
    .back-home {
        display: inline-block;
        background-color: ${props => props.theme.primaryColor};
        padding: 10px 20px;
        color: #151723;
        border-radius: 6px;
        font-weight: 600;
    }
    @keyframes flickerAnimation {
        30%  { opacity:1; }
        32%  { opacity:0.8; }
        33% { opacity:1; }
        35% { opacity:0.3; }
        36% { opacity:1; }
    }
`;

const NotFoundPage = () => {
    return (
        <NotFoundPageStyles>
            <div className="notfound">
                <div className="notfound-404"></div>
                <h1>404!</h1>
                <h2>Oops! Page Not Be Found</h2>
                <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable!</p>
                <NavLink to="/" className={"back-home"}>Back to homepage</NavLink>
            </div>
        </NotFoundPageStyles>
    )
};

export default NotFoundPage;