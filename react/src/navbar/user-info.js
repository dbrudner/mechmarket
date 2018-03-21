import React from 'react'
import styled from 'styled-components'

import {Link} from 'react-router-dom'

const UserInfoContainer = styled.div`
    ul li {
        margin-right: 1rem;
    }
`

export default function UserInfo(props) {
    console.log(props)
    return (
        <UserInfoContainer>
            <ul>
                <li>{props.userInfo.username}</li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </UserInfoContainer>
    )
}