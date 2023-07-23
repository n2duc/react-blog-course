import { signOut } from 'firebase/auth'
import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firsebase-config'
import styled from 'styled-components'

const DropProfileStyle = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    top: 3.75rem;
    right: 0;
    background-color: #FFFFFF;
    padding: 12px;
    border-radius: 6px;
    li {
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;
        &:hover {
            background-color: ${props => props.theme.greenSmooth};
        }
    }
`;

const DropProfile = () => {
    return (
        <DropProfileStyle className="border border-slate-400">
            <ul className="flex flex-col gap-3">
                <li><Link to="/profile">Profile</Link></li>
                <li onClick={() => signOut(auth)}>Logout</li>
            </ul>
        </DropProfileStyle>
    )
}

export default DropProfile