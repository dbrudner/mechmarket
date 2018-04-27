import React from 'react'
import styled from 'styled-components'

import {Link} from 'react-router-dom'

import RaisedButton from 'material-ui/RaisedButton';


const UserInfoContainer = styled.div`

    margin-top: 1rem;
    margin-right: 2rem;

    a {
        margin-right: 3.5rem;
        color: white;
        font-weight: bold;
        transition: all .3s;        
        display: inline-block;

        a:hover {
            transform: translateY(-1rem);
            transition: all .3s;
        }
    }
`

export default function UserInfo(props) {
    return (
        <UserInfoContainer>
            <a href="#">{props.userInfo.username}</a>
            <RaisedButton
                label="Log Out"
                primary
                onClick={props.logout}
            />
        </UserInfoContainer>
    )
}