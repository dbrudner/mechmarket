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

        console.log(this.props.logout())
        console.log(this.props.state.userInfo)
        axios.get('/logout')
            .then(response => {
                this.setState({
                    fireRedirect: true
                })
            }).catch(err => {
                console.log(err)
            })
    }
    
    render() {
        return <Redirect to={{ pathname: '/blah' }} />
    }  
}


function mapStateToProps(state) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({logout: logout}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)