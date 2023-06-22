import React from 'react'
import { styled } from 'styled-components'

const FieldStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 18px;
    &:last-child {
        margin-bottom: 0;
    }
`;

const Field = ({ children }) => {
    return (
        <FieldStyles>{children}</FieldStyles>
    )
};

export default Field;