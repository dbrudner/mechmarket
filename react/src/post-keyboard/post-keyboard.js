import React, {Component} from 'react'
import {connect} from 'react-redux'

import NoUserInfo from './no-user-info'
import Post from './post'

class PostKeyboard extends Component {

    render() {
        console.log()
        return (
            <div>
                {this.props.state.userInfo ? <Post showPreview={this.props.showPreview}/> : <NoUserInfo/>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {state}
}

export default connect(mapStateToProps)(PostKeyboard)