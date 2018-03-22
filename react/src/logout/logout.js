import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { logout } from '../actions/index';

class Logout extends React.Component {

    constructor(props) {
        super(props)

    }

    componentDidMount() {
        console.log(this.props)
        // Sends request to logout, if logout is succesful, redirects to index and sets app state to logged out.
        axios.get('/logout')
            .then(response => {
                console.log(response)
                this.props.logout()
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return null
    }
}

// Probably don't need this?
function mapStateToProps(state) {
    return {
        state
    }
}

// Lets app state know user is logged out
function mapDispatchToProps(dispatch) {
    return bindActionCreators({logout: logout}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)