import React, {Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import TextField from 'material-ui/TextField'


import {connect} from 'react-redux'

const PostContainer = styled.div`
    font-size: 2rem;
    padding: 3rem 10rem;
`

const Label = styled.span`
    margin-right: 3rem;
`

const SubmitButton = styled.div`
    background-color: gray;
    width: 100%;
    text-align: center;
    border-radius: 5px;
    color: #f3f3f3;
    cursor: pointer;
    margin-top: 2rem;
`

const Header = styled.div`
    text-transform: uppercase;
    text-align: center;
`

class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            keyboard: {
                name: '',
                size: '',
                layout: '',
                condition: '',
                keycaps: '',
                switches: '',
                imgUrl: ''
            }
            
        }
    }

    handleChange = (id, value) => {
        this.setState({keyboard: {...this.state.keyboard, [id]: value}})
    }

    renderInput = name => {
        return (
            <div>
                <Label>
                    {name.charAt(0).toUpperCase() + name.substr(1)}
                </Label>
                <input key={name} value={this.state.keyboard[name]} type='text' onChange={event => this.handleChange(name, event.target.value)} />            
            </div>
        )
    }

    renderAllInputs = () => {
        return Object.keys(this.state.keyboard).map(item => {
            return <div key={item}>{this.renderInput(item)}</div>
        })
    }


    handleSubmit = event => {
        event.preventDefault();

        // Keyboard object with all state input values and userid
        
        const keyboard = {...this.state.keyboard, userId: this.props.userInfo._id}
        
        axios.post('/api/new/keyboard', keyboard)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        console.log(this.state)
        return (
            <PostContainer>
                <Header>
                    Share/Sell a keyboard
                </Header>
                <form onSubmit={this.handleSubmit}>
                    {this.renderAllInputs()}
                    <SubmitButton>
                        Submit Keyboard
                    </SubmitButton>
                </form>         
            </PostContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.userInfo
    }
}
export default connect(mapStateToProps)(Post)