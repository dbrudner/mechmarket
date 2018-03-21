import React, {Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {connect} from 'react-redux'

import LoginOrRegister from './login-or-register'
import UserInfo from './user-info'


const NavbarContainer = styled.div`
    background-color: rgb(80%, 53.4%, 53.4%);
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 2rem;
`

const Brand = styled.div`
    display: inline-block;
`

const NavLinks = styled.div`
    display: inline-block;

    ul {
        display: inline-block;
        margin: 0; 
        padding: 0;

        li {
            display: inline-block;
            margin-left: 2rem;

            &:first-child {
                margin-left: 0;
            }
        }
}
`

const UserContainer = styled.div`
    display: inline-block;

    ul {
        margin: 0; 
        padding: 0;

        li {
            display: inline-block;                    
        }
}`

class Navbar extends Component {

    constructor(props) {
        super(props)

        this.state ={
            loggedIn: false,
            username: '',
            password: ''
        }
    }

    render() {
        console.log(this.props)
        return (
            <NavbarContainer>
                <Brand>
                    Mechanical Keyboard Classifieds
                </Brand>
                <NavLinks>
                    <ul>
                        <li>Keyboards</li>
                        <li>Parts</li>
                        <li>Post new item</li>
                    </ul>
                </NavLinks>
                <UserContainer>
                    {this.props.state.LoggedIn ? <UserInfo/> : <LoginOrRegister/>}
                </UserContainer>
            </NavbarContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(Navbar)