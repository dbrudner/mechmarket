import React, {Component} from 'react'
import styled from 'styled-components'

const PostContainer = styled.div``

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

    handleChange = (name, value) => {
        this.setState({keyboard: {...this.state.keyboard, [name]: value}})
    }

    renderInput = name => {
        return (
            <input key={name} value={this.state.keyboard[name]} type='text' onChange={event => this.handleChange(name, event.target.value)} />            
        )
    }

    renderAllInputs = () => {
        return Object.keys(this.state.keyboard).map((item, i) => {
            return this.renderInput(item)
        })
    }

    render() {
        console.log(this.state.keyboard)
        return (
            <PostContainer>
                <form>
                    {this.renderAllInputs()}
                </form>         
            </PostContainer>
        )
    }
}

export default Post