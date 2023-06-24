import React from "react";
import { useController } from "react-hook-form";
import { css, styled } from "styled-components";

const SpanCheckMark = styled.span`
    display: inline-block;
    position: relative;
    width: 28px;
    height: 28px;
    border: 2px solid #adb5bd;
    border-radius: 50%;
    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        ${props => props.checked && css`
            transform: translate(-50%, -50%) scale(1);
        `};
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: ${props => props.theme.primaryColor};
        transition: all 0.2s ease-in-out;
    }
`;

const Radio = ({ checked, children, control, name, ...rest }) => {
    const { field } = useController({
        control,
        name,
        defaultValue: "",
    });
    return (
        <label>
            <input
                onChange={() => {}}
                checked={checked}
                type="radio"
                className="hidden-input"
                {...field}
                {...rest}
            />
            <div className="flex items-center gap-x-3 font-medium cursor-pointer transition-all">
                <SpanCheckMark checked={checked}></SpanCheckMark>
                <span>{children}</span>
            </div>
        </label>
    );
};

export default Radio;
