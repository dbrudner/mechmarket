import React,{Component} from 'react'
import axios from 'axios'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getKeyboards} from '../actions/index'
import { Login } from '../actions/index';

class Home extends Component {

    componentDidMount() {
        axios.get('/api/keyboards/all')
        .then(res => {
            console.log(res.data)
            this.props.keyboards(res.data)
        })
    }

    render() {
        console.log(this.props)
        return (
            <div>
                Home
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({keyboards: getKeyboards}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)