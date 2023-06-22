import React from 'react'
import { styled } from 'styled-components';
import Button from '../../components/Button/Button';

const HomeBannerStyles = styled.div`
    margin-top: 20px;
    .banner {
        min-height: 520px;
        padding: 0 40px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-image: linear-gradient(to right bottom, ${props => props.theme.primaryColor}, ${props => props.theme.secondaryColor});
        margin-bottom: 60px;
        &-content {
            max-width: 420px;
            color: white;
        }
        &-heading {
            font-size: 42px;
            font-weight: 700;
            margin-block: 20px;
        }
        &-desc {
            font-size: 14px;
            font-weight: 400;
            line-height: 1.75;
            margin-bottom: 40px;
        }
    }
`;

const HomeBanner = () => {
    return (
        <HomeBannerStyles>
            <div className="container">
                <div className="banner">
                    <div className="banner-content">
                        <h1 className="banner-heading">N2D Blogging</h1>
                        <p className="banner-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.</p>
                        <Button to="/sign-up" kind="secondary" style={{
                            maxWidth: '180px',
                            width: '100%',
                        }}>Get Started</Button>
                    </div>
                    <div className="banner-image">
                        <img src="/img-banner.png" alt="banner" />
                    </div>
                </div>
            </div>
        </HomeBannerStyles>
    )
}

export default HomeBanner