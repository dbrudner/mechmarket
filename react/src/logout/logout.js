import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { logout } from '../actions/index';

class Logout extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            fireRedirect: null
        }
    }

    componentWillMount() {
        // sets app state to logged out. Outside of axios because it doesn't fire inside request. I think component redirects before state is changed when I do that, but not sure.
        this.props.logout()
        // Sends request to logout, if logout is succesful, redirects to index.
        axios.get('/logout')
            .then(response => {
                
                this.setState({
                    fireRedirect: true
                })
            }).catch(err => {
                this.props.logout()
                console.log(err)
            })
    }

    render() {
        return <Redirect to={{ pathname: '/' }} />
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