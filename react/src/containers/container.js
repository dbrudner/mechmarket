import React, {Component} from 'react'
import {connect} from 'react-redux'

class Container extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <div> Container </div>
    }
}

function mapStateToProps(state) {
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(Container)
