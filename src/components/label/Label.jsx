import React from 'react'
import { styled } from 'styled-components';

const LabelStyles = styled.label`
    color: ${props => props.theme.grayFont};
    font-weight: 600;
    cursor: pointer;
    font-size: 14px;
`;

const Label = ({ htmlFor = "", children, ...props }) => {
    return (
        <LabelStyles htmlFor={htmlFor} {...props}>
            {children}
        </LabelStyles>
    )
}

export default Label