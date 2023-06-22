import React from 'react'
import { useController } from 'react-hook-form';
import { styled } from 'styled-components';
import PropTypes from 'prop-types';

const InputStyles = styled.div`
    position: relative;
    width: 100%;
    input {
        width: 100%;
        padding: ${(props) =>
            props.$hasIcon ? "16px 60px 16px 20px" : "16px 20px"};
        background-color: ${props => props.theme.grayLight};
        border-radius: 6px;
        font-weight: 500;
        color: ${props => props.theme.blackColor};
        transition: all 0.2s linear;
        border: 1px solid transparent;
        font-size: 14px;
    }
    input:focus, input:hover {
        outline: none;
        background-color: white;
        border-color: ${props => props.theme.primaryColor};
        box-shadow: 0 0 0 4px rgb(35 236 142 / 10%);
    }
    input::-webkit-input-placeholder{
        color: #84878B;
    }
    input::-moz-input-placeholder{
        color: #84878B;
    }
    .input-icon {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
`;

const Input = ({ name = "", type = "text", children, control, ...props }) => {
    const { field } = useController({
        control,
        name,
        defaultValue: "",
    });
    return (
        <InputStyles $hasIcon={children ? true : false}>
            <input id={name} type={type} {...field} {...props} />
            {children ? <div className="input-icon">{children}</div> : null}
        </InputStyles>
    )
};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    children: PropTypes.any,
    control: PropTypes.any.isRequired,
}

export default Input;