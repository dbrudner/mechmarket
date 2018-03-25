import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

const SingleKeyboardContainer = styled.div`
`

class SingleKeyboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: this.props.state.userInfo,
            keyboard: this.props.state.previewKeyboard
        }
    }


    render() {
        const keyboard = this.state.keyboard
        return (
            <SingleKeyboardContainer>
                <div>{keyboard.name}</div>
                <div>{this.state.user.username}</div>
            </SingleKeyboardContainer>
        )
    }   
}

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(SingleKeyboard)