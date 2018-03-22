import React, { Component } from 'react'
import Modal from 'react-responsive-modal'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { postKeyboard } from '../actions/index';

import PostKeyboard from './post-keyboard'

class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: true
        }
    }
    
    

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false }, () => {
            setTimeout(() => this.props.postKeyboard(false), 300)            
        }); 

    };

    render() {
        const { open } = this.state;
        return (
            <div>
                <Modal open={open} onClose={this.onCloseModal} little>
                    <PostKeyboard/>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({postKeyboard}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)