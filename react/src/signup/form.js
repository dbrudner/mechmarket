import React, {Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'

const FormContainer = styled.div``

const Label = styled.span`
    margin-right: 3rem;
`

const SubmitButton = styled.button``


class Form extends Component {   

    constructor(props) {
        super(props)

        this.state = {
            user: {
                username: '',
                password: '',
                email: '',
                password_confirm: '',
            },
            
            redirectTo: null            
        }            
    }

    renderInput = name => {
        let label = name.charAt(0).toUpperCase() + name.substr(1)
        label = label.replace('_', ' ')

        return (
            <div>
                <Label>
                    {label}
                </Label>
                <input key={name} value={this.state.user[name]} type='text' onChange={event => this.handleChange(name, event.target.value)} />            
            </div>
        )
    }

    renderAllInputs = () => {
        return Object.keys(this.state.user).map(item => {
            return <div key={item}>{this.renderInput(item)}</div>
        })
    }

    handleChange = (name, value) => {this.setState({user: {...this.state.user, [name]: value}})}

    handleSubmit = event => {
        event.preventDefault()
        const user = this.state.user
        const {email, password} = user
        axios.post('/signup', user)
        .then(res => {
            console.log('sign up success')
            axios.post('/login', {
                email, password
            })
        }).catch (err => {
            console.log('sign up fail')            
            axios.post('/login', {
                email, password
            })
        })
    }
    
    render() {
        return (
            <FormContainer>
                <form onSubmit={this.handleSubmit}>
                    {this.renderAllInputs()}
                    <SubmitButton>Submit</SubmitButton>
                </form>
            </FormContainer>
        )
    }
}


export default Form