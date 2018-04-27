import React, {Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Login, openSignUp } from '../actions/index';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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

const Error = styled.div`
    font-size: 1.4rem;
    font-weight: 700;
    color: red;
    text-align: center;
`

class Form extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {
                username: '',
                password: '',

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
                    floatingLabelText={label}                    
                    onChange={event => this.handleChange(name, event.target.value)}
                    type={type}
                    ref={type}
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

        axios.post('/login', user)
        .then(res => {
            axios.get('/test')
            .then(res => {
                this.props.Login(res.data)
                this.props.closeModal()
            })

        }).catch (err => {
            this.setState({
                error: 'Wrong username or password'
            }, () => {
                console.log(this.refs.username);
            })
            throw err
        })
    }

    render() {
        return (
            <FormContainer>
                <form onSubmit={this.handleSubmit}>
                    <h1>Login <i className="fas fa-sign-in-alt"></i></h1>                                                                     
                    {this.renderAllInputs()}
                    <Error>
                        {this.state.error || null}
                    </Error>
                    <div style={{textAlign: 'center', marginTop: '2rem'}}>
                        <RaisedButton
                            label="Log In"
                            primary
                            type='submit'
                        />
                    </div>
                    <p>Not registered? Click <a href="#">here</a> to sign up</p>                    
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