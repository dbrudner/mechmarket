import React,{Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Login } from '../actions/index';

class LoginOrRegister extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }
      
    handleChange = (name, value) => {
        this.setState({[name]: value})
    }

    handleSubmit = event => {
        event.preventDefault();        
        this.props.Login()
        // const email = this.state.username.trim()
        // const password = this.state.password.trim()

        // axios.post('/login', {
        //     email, password
        // })
        // .then(res => {
        //     window.location.href = '/'
        // })
        // .catch(err => {
        //     window.location.href = '/'            
        // })
    }

    render() {
        console.log(this.props)
        console.log('hey')
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.username} type='text' onChange={event => {this.handleChange('username', event.target.value)}}/>
                    <input value={this.state.password} type='password' onChange={event => {this.handleChange('password', event.target.value)}}/>
                    <button type='submit'>Button</button>
                </form>
            </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(LoginOrRegister)