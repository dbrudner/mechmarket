import React,{Component} from 'react'
import axios from 'axios'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

export default class Home extends Component {

    render() {
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



// export default connect(mapStateToProps, mapDispatchToProps)(Home)