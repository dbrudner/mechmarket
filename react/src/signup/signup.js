import React, { Component } from 'react'
import Modal from 'react-responsive-modal'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import { openSignUp } from '../actions/index';

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
            setTimeout(() => this.props.openSignUp(false), 300)            
        }); 

    };

    render() {
        const { open } = this.state;
        return (
            <div>
                <Modal open={open} onClose={this.onCloseModal} little>
                    <h2>Simple centered modal</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                        pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                        hendrerit risus, sed porttitor quam.
                    </p>
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
    return bindActionCreators({openSignUp: openSignUp}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)