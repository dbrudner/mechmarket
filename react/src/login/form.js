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
    h1 {
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 1rem;

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

            },
            error: null,
            redirectTo: null
        }
    }

    renderInput = name => {
        let label = name.charAt(0).toUpperCase() + name.substr(1)
        label = label.replace('_', ' ')

        return (
            <div>
                <TextField
                    hintText={label}
                    onChange={event => this.handleChange(name, event.target.value)}
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
            })
            throw err
        })
    }

    render() {
        return (
            <FormContainer>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderAllInputs()}
                    <div>
                        {this.state.error || null}
                    </div>
                    <div style={{textAlign: 'center', marginTop: '2rem'}}>
                        <RaisedButton
                            label="Submit"
                            primary
                            type='submit'
                        />
                    </div>
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