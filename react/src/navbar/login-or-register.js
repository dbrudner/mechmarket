import React,{Component} from 'react'
import styled from 'styled-components'

export default class LoginOrRegister extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }
      
    handleChange = (name, value) => {
        this.setState({[name]: value}, () => {
            console.log(this.state)
        })
    }

    render() {

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