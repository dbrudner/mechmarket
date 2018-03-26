import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Modal from 'react-responsive-modal'

import {SingleKeyboardContainer} from './single-keyboard-container'
import Images from './images'
import NoImages from './no-images'

import {SubmitButton, Info, Change, imgs, InfoContainer, Header} from './styled'
import {renderForSale} from './render-for-sale'


class SingleKeyboard extends Component {
    constructor(props) {
        super(props)

        if (this.props.match.params.param === 'preview') {
            this.state = {
                keyboard: {
                    name: 'keyboard',
                    size: '60%',
                    layout: 'ANSI',
                    condition: 'Used',
                    keycaps: 'None',
                    switches: 'MX Cherry Blue',
                    forSale: true,
                    imgs: imgs,
                    user: null
                },
                message: {
                    subject: '',
                    content: ''
                },
                openImageModal: false,
                openMessageModal: false,
                showImage: 0,
            }

        } else {
            this.state = {
                keyboard: {
                    name: '',
                    size: '',
                    layout: '',
                    condition: '',
                    keycaps: '',
                    switches: '',
                    forSale: null,
                    imgs: [],
                    user: {}
                },
                openImageModal: false,
                openMessageModal: false,
                showImage: 0
            }
        }
    }

    componentDidMount() {
        const keyboardId = this.props.match.params.param

        // If we're rendering a single component and not a preview for submission, make a request for a keyboard with id matching param
        if (keyboardId !== 'preview') {
            axios.get(`/keyboard/${keyboardId}`)
            .then(response => this.setState({keyboard: response.data, message: {...this.state.message, subject: response.data.name}}))
        } 
        
        if (this.props.state.userInfo) {
            console.log(this.props.state.userInfo)
            this.setState({
                keyboard: {...this.state.keyboard, user: this.props.state.userInfo}
            })
        }
    }

    submitKeyboard = () => {
        if (!this.props.state.userInfo._id) return

        // Create keyboard object for submission
        let keyboard = this.state.keyboard

        // Add user's ID to keyboard object
        keyboard.userId = this.props.state.userInfo._id

        // Posts keyboard to db
        axios.post('/api/new/keyboard', keyboard)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    modal = (modal, boolean) => this.setState({[modal]: boolean})
    

    showNextImage = () => {

        if (this.state.showImage < this.state.keyboard.imgs.length - 1) {
            this.setState({
                showImage: this.state.showImage + 1
            })
        } else this.setState({showImage: 0})
    }

    showPreviousImage = () => {
        if (this.state.showImage !== 0) {
            this.setState({
                showImage: this.state.showImage - 1
            })
        } else this.setState({showImage: this.state.keyboard.imgs.length - 1})
    }
    
    renderImages = () => {
        const keyboard = this.state.keyboard
        return (
            <Images
                showPreviousImage={this.showPreviousImage}
                showNextImage={this.showNextImage}
                imgs={keyboard.imgs}
                showImg={this.state.showImage}
                openModal={() => this.modal('openImageModal', true)}
                currentImage={this.state.showImage}
            />
        )
    }

    renderImgModal = () => {
        const keyboard = this.state.keyboard
        return (
            <Modal open={this.state.openImageModal} onClose={() => this.modal('openImageModal', false)} >
                <img src={keyboard.imgs[this.state.showImage]} style={{width: '100%'}}/>
            </Modal>
        )
    }

    renderMsgModal = () => {
        return (
            <Modal open={this.state.openMessageModal} onClose={() => this.modal('openMsgModal', false)} >
                <div>

                </div>
            </Modal>
        )
    }

    render() {

        const keyboard = this.state.keyboard
        const param = this.props.match.params.param

        console.log(keyboard)

        if (!keyboard.user) return null

        return (
            <div style={{textAlign: 'center', marginTop: '3rem'}}>
                <SingleKeyboardContainer>
                    {keyboard.imgs.length > 0 ? this.renderImgModal() : null}
                    {this.renderMsgModal()}
                    <InfoContainer>
                        <Header>
                            <h3>Keyboard Name</h3>
                            <h5><Link target='_blank' to={`/user/${keyboard.userId._id}`}>{keyboard.userId.username}</Link></h5>
                        </Header>
                        {keyboard.imgs.length > 0 ? this.renderImages() : <NoImages/>}
                        <Info>
                            {renderForSale(keyboard, param)}
                            <div>
                                <Change>(Change)</Change>
                                <strong>Size: </strong>{keyboard.size}
                            </div>
                            <div>
                                <Change>(Change)</Change>
                                <strong>Layout: </strong>{keyboard.layout}
                            </div>
                            <div>
                                <Change>(Change)</Change>
                                <strong>Switches: </strong>{keyboard.switches}
                            </div>
                            <div>
                                <Change>(Change)</Change>
                                <strong>Keycaps: </strong>{keyboard.keycaps}
                            </div>
                        </Info>
                        {param === 'preview' ? <SubmitButton onClick={this.submitKeyboard}>Submit</SubmitButton> : null}
                    </InfoContainer>
                </SingleKeyboardContainer>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(SingleKeyboard)