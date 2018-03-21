import React, {Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Login } from '../actions/index';
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
            username: '',
            password: '',
            loginCheck: null
        }
    }

    componentDidMount() {
        axios.get('/test')
            .then(res => {
                if (res.data) {
                    console.log('logged in')
                    this.props.Login({...res.data.local})
                } else console.log('fail')

                this.setState({loginCheck: true})
            })
    }

    renderInfoOrLogin = () => {

        if (!this.state.loginCheck) return null

        if (this.props.state.userInfo) {
            return  <UserInfo userInfo={{...this.props.state.userInfo}}/>
        } else {
            return <LoginOrRegister/>
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
                    {this.renderInfoOrLogin()}
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({Login: Login}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
