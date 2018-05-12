import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'



const UserInfoContainer = styled.div`

    margin-top: .5rem;
    margin-right: 2rem;

`

const Logout = styled.li`

    a {
        margin-right: 3.5rem;
        color: ${props => props.theme.color1};
        font-weight: bold;
        display: inline-block;
        text-decoration: none;
        padding: 5px 10px;
    }

    a:hover {
        color: ${props => props.theme.color3};
    }
    
`

const Username = styled.li`
    a {
        margin-right: 2rem;
        text-decoration: none;
        color: ${props => props.theme.color1};
    }
    a:hover {
        color: ${props => props.theme.color3};        
    }
`

export default function UserInfo(props) {
    return (
        <UserInfoContainer>
            <ul>
                <Username>
                    <a href="#">{props.userInfo.username}
                        <span style={{ marginLeft: '10px' }}><i className="fas fa-user-circle"></i></span>
                    </a>
                </Username>
                <Logout onClick={props.logout}>
                    <a href="#">
                    Log out 
                    <span style={{marginLeft: '10px'}}>
                        <i className="fas fa-sign-out-alt"></i>
                    </span>
                    </a>
                </Logout>
            </ul>
        </UserInfoContainer>
    )
}