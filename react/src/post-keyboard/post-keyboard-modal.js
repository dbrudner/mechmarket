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
        console.log("CLO")
        // this.setState({ open: false }
        // , () => {
        //     console.log(this.state);
        //     setTimeout(() => this.props.postKeyboard(false), 300)            
        // });
        this.props.postKeyboard(false) 
    };

    showPreview = () => {
        this.setState({showPreview: true})
    }

    render() {
        const { open } = this.state;

        if (open) {
            return (
                <Modal open={open} showCloseIcon={false} onClose={this.onCloseModal}>
                    <PostKeyboard closeModal={this.onCloseModal}/>
                </Modal>
            );
        }
        
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