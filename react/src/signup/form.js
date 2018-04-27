import React, {Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Login, openSignUp } from '../actions/index';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


const Error = styled.div`
    font-size: 1.4rem;
    font-weight: 700;
    color: red;
    text-align: center;
`

const FormContainer = styled.div`
    padding: 2rem;

    form {
        padding: 2rem;
    }

    h1 {
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 1rem;
        margin-top: 0;
    }

    p {
        font-size: 1.4rem;
        font-style: italic;
        text-align: center;
        margin-top: 3rem;
    }
`

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
                confirm_Password: '',

            },
            error: null,
            redirectTo: null
        }
    }

    renderInput = name => {
        let label = name.charAt(0).toUpperCase() + name.substr(1)
        label = label.replace('_', ' ')

        let type = 'username'

        if (name.toLowerCase().match('password')) {
            type = 'password'
        }

        return (
            <div>
                <TextField
                    hintText={label}
                    onChange={event => this.handleChange(name, event.target.value)}
                    type={type}
                />
            </div>
        )
    }

    renderAllInputs = () => {
        return Object.keys(this.state.user).map(item => {
            return (
                <div key={item}>
                    {this.renderInput(item)}
                </div>
            )
        })
    }

    handleChange = (name, value) => {this.setState({user: {...this.state.user, [name]: value}})}

    handleSubmit = event => {
        event.preventDefault()
        const user = this.state.user
        

        if (user.password !== user.confirm_Password) {
            return this.setState({error: "Passwords don't match"})
        }


        axios.post('/signup', user)
        .then(res => {
            axios.get('/test')
            .then(res => {
                this.props.Login(res.data)
                this.props.closeModal()
            })

        }).catch (err => {
            this.setState({
                error: 'Username taken'
            })
            throw err
        })
    }

    render() {
        return (
            <FormContainer>
                <h1>Sign Up <i className="fas fa-user-plus"></i></h1>
                <form onSubmit={this.handleSubmit}>
                    
                    {this.renderAllInputs()}
                    <div style={{textAlign: 'center', marginTop: '2rem'}}>
                    <Error>
                        {this.state.error || null}
                    </Error>
                    <RaisedButton
                        label="Sign Up"
                        primary
                        type='submit'
                    />
                    </div>
                    <p>Registered already? Click <a href="#">here</a> to sign in</p>
                </form>
            </FormContainer>
        )
    }
}


function mapStateToProps(state) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({Login, openSignUp}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)