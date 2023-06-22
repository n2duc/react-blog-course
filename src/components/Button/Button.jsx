import React from "react";
import { styled, css } from "styled-components";
import PropTypes from 'prop-types';
import LoadingSpinner from "../loading/LoadingSpinner";
import { NavLink } from "react-router-dom";

const ButtonStyles = styled.button`
    cursor: pointer;
    height: ${props => props.height || '50px'};
    padding: 0 20px;
    line-height: 1;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    user-select: none;
    ${props => props.kind === "secondary" && css`
        color: ${props => props.theme.primaryColor};
        background-color: white;
    `};
    ${props => props.kind === "primary" && css`
        color: white;
        background-image: linear-gradient(
            to right bottom,
            ${(props) => props.theme.primaryColor},
            ${(props) => props.theme.secondaryColor}
        );
    `};
    &:disabled {
        opacity: 0.5;
        pointer-events: none;
    }
`;

/**
 * @param {*} onClick Handler onClick
 * @requires
 * @param {string} type Type of button 'button' | 'submit'
 */

const Button = ({ children, type = "button", kind = "primary" , onClick = () => {}, ...props }) => {
    const { $isLoading, to } = props;
    const child = !!$isLoading ? <LoadingSpinner /> : children;
    if (to !== "" && typeof to === "string") {
        return (
            <NavLink to={to} className="inline-block">
                <ButtonStyles type={type} kind={kind} {...props} >{child}</ButtonStyles>
            </NavLink>
        )
    }
    return <ButtonStyles type={type} kind={kind} onClick={onClick} {...props} >{child}</ButtonStyles>;
};

Button.propTypes = {
    type: PropTypes.oneOf(["button", "submit"]),
    $isLoading: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
    kind: PropTypes.oneOf(["primary", "secondary"]),
}

export default Button;
