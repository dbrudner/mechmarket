import React, {Component} from 'react'
import {connect} from 'react-redux'
import KeyboardList from './keyboard-list'

class SearchKeyboard extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        if (this.props.state.keyboards) {
            return (
                <div>
                    <KeyboardList keyboards={this.props.state.keyboards} />
                </div>
            )
        } else {
            return <div></div>
        }
        
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(SearchKeyboard)