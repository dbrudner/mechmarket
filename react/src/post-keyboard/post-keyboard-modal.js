import React, { Component } from 'react'
import Modal from 'react-responsive-modal'
import styled from 'styled-components'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { postKeyboard } from '../actions/index';

import PostKeyboard from './post-keyboard'

import SingleKeyboard from '../single-keyboard/single-keyboard'


class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: true,
            showPreview: false
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

    showPreview = () => {
        this.setState({showPreview: true})
    }

    render() {
        const { open } = this.state;
        return (
            <Modal open={open} onClose={this.onCloseModal}>
                <PostKeyboard closeModal={this.onCloseModal}/>
            </Modal>
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