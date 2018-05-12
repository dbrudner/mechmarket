import React, {Component} from 'react'
import {connect} from 'react-redux'

import NoUserInfo from './no-user-info'
import Post from './post'

class PostKeyboard extends Component {

    render() {
        console.log()
        return (
            <div style={{height: "600px", width: "320px"}}>
                {this.props.state.userInfo ? <Post closeModal={this.props.closeModal}/> : <NoUserInfo/>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {state}
}

export default connect(mapStateToProps)(PostKeyboard)