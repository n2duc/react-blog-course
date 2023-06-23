import React from 'react'
import { css, styled } from 'styled-components'

const SpinnerStyles = styled.div`
    width: ${props => props.size};
    height: ${props => props.size};
    border: ${props => props.$borderSize} solid white;
    ${props => props.kind === "green" && css`
        border: ${props => props.$borderSize} solid ${props => props.theme.green};
    `};
    border-top: ${props => props.$borderSize} solid transparent;
    border-bottom: ${props => props.$borderSize} solid transparent;
    border-radius: 100rem;
    display: inline-block;
    animation: spin 1s linear infinite;
    @keyframes spin {
        100% {
            transform: rotate(360deg)
        }
    }
`;

const LoadingSpinner = ({ size = "30px", borderSize = "5px", kind = "" }) => {
    return (
        <SpinnerStyles size={size} $borderSize={borderSize} kind={kind}></SpinnerStyles>
    )
};

export default LoadingSpinner;