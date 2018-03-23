import React, {Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Login, logout, postKeyboard } from '../actions/index';
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

        // I make this request because if a user navigates away from the site or reloads, app state is lost, but session is still in storage.
        // This makes it so a user doesn't have to re login after leaving or reloading site.
        // ****On navbar, so this request happens on everytime this component mounts. I don't know if this is good or bad. Sounds like overkill?
        // Commented out because this request invokes an error in jest
        // axios.get('/test')
        //     .then(res => {
        //         if (res.data) {
        //             this.props.Login({...res.data.local, _id: res.data._id})
        //         } else console.log('not logged in')

        //         this.setState({loginCheck: true})
        //     })
    }

    logout = () => {
        axios.get('/logout')
        .then(res => {
            console.log(res)
            this.props.logout();
        })
    }

    renderInfoOrLogin = () => {

        if (!this.state.loginCheck) return null

        if (this.props.state.userInfo) {
            return  <UserInfo logout={this.logout} userInfo={{...this.props.state.userInfo}}/>
        } else {
            return <LoginOrRegister/>
        }
    }

    postKeyboard = () => {
        this.props.postKeyboard(true)
    }

    render() {
        return (
            <NavbarContainer>
                <Brand>
                    Mechanical Keyboard Classifieds
                </Brand>
                <NavLinks>
                    <ul>
                        <li>Keyboards</li>
                        <li>Parts</li>
                        <li onClick={this.postKeyboard}>Post new keyboard</li>
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
    return bindActionCreators({Login, logout, postKeyboard}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)