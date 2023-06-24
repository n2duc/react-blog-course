import React from 'react'
import { css, styled } from 'styled-components';
import PropTypes from "prop-types";

const SpanSlider = styled.span`
    position: absolute;
    cursor: pointer;
    inset: 0;
    border: 2px solid #adb5bd;
    border-radius: 50px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &::before {
        position: absolute;
        content: "";
        height: 24px;
        width: 24px;
        left: 4px;
        bottom: 4px;
        background-color: ${props => props.theme.primaryColor};
        border-radius: inherit;
        transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
        ${props => props.checked && css`
            transform: translateX(24px);
        `};
    }
`;

const Toggle = (props) => {
    const { on, onClick, ...rest } = props;
    return (
        <label className="inline-block relative w-[60px] h-[34px]">
            <input type="checkbox" checked={on} className="hidden-input" onChange={() => {}} onClick={onClick} />
            <SpanSlider checked={on}></SpanSlider>
        </label>
    )
}

Toggle.propTypes = {
    on: PropTypes.bool,
    onClick: PropTypes.func,
}

export default Toggle;