import React, {Component} from 'react'
import {connect} from 'react-redux'

class SearchKeyboard extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        console.log(this.props)
        return (
            <div>
                keyboards
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(SearchKeyboard)