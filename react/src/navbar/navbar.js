import React, {Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Login, logout, postKeyboard } from '../actions';
import LoginOrRegister from './login-or-register'
import UserInfo from './user-info'
import {Link} from 'react-router-dom'

const NavbarContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 2rem;
`

const Brand = styled.div`
    display: inline-block;
    font-size: 4.6rem;
    margin-left: 5rem;
`

const NavLinks = styled.div`
    display: inline-block;
    color: white;
    margin-left: 2rem;
    margin-top: 2rem;
    margin-left: 10rem;
    ul {
        display: inline-block;
        margin: 0;
        padding: 0;
        letter-spacing: 2px;

        li {
            display: inline-block;
            cursor: pointer;
            border-radius: 5px;
            border: 2px solid;
            border-color: ${props => props.theme.color1};
            padding: 5px 10px;
            color: ${props => props.theme.color1};
            font-size: 1.6rem;
            font-weight: 700;
            text-transform: uppercase;
            text-decoration: none;
            margin-left: 2rem;

            &:hover {
                color: ${props => props.theme.color3};
                border-color: ${props => props.theme.color3};
            }
        }
    }
`

const UserContainer = styled.div`
    display: inline-block;
    margin-top: 1rem;

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
        axios.get('/test')
            .then(res => {
                if (res.data) {
                    this.props.Login({...res.data, _id: res.data._id})
                } else console.log('not logged in')
                this.setState({loginCheck: true})
            })
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
                    <i className="fas fa-keyboard"></i>
                </Brand>
                {!this.props.state.userInfo ? null :
                <NavLinks>
                    <ul>
                        <Link to='/keyboards'><li>View Keyboards</li></Link>
                        <li onClick={this.postKeyboard}>Post <i className="fas fa-share-square"></i></li>
                    </ul>
                </NavLinks>}
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