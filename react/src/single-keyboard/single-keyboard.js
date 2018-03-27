import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {postKeyboard} from '../actions'
import styled from 'styled-components'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Modal from 'react-responsive-modal'

import {SingleKeyboardContainer} from './single-keyboard-container'
import Images from './images'
import NoImages from './no-images'

import {SubmitButton, ChangeButton, Info, Change, imgs, InfoContainer, Header} from './styled'
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

    componentWillReceiveProps(nextProps, nextState) {
        console.log(nextProps)
        const keyboardId = this.props.match.params.param

        // If we're rendering a single component and not a preview for submission, make a request for a keyboard with id matching param
        if (keyboardId !== 'preview') {
            axios.get(`/keyboard/${keyboardId}`)
            .then(response => this.setState({keyboard: response.data, message: {...this.state.message, subject: response.data.name}}))
        } else {
            this.setState({
                keyboard: {...this.props.state.previewKeyboard, user: nextProps.state.userInfo}
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

    renderInfoItem = (label, key) => {
        const keyboard = this.state.keyboard

        return (
            <div>
                <strong>{label}: </strong>{keyboard[key] || 'None listed'}
            </div>
        )
    }

    changeKeyboard = () => {this.props.postKeyboard(true)}

    render() {
        
        const keyboard = this.state.keyboard
        const param = this.props.match.params.param

        if (!keyboard.user) return null
        
        return (
            <div style={{textAlign: 'center', marginTop: '3rem'}}>
                <SingleKeyboardContainer>
                    {keyboard.imgs.length > 0 ? this.renderImgModal() : null}
                    {this.renderMsgModal()}
                    <InfoContainer>
                        <Header>
                            <h3>{keyboard.name}</h3>
                            <h5><Link target='_blank' to={`/user/${keyboard.user._id}`}>{keyboard.user.username}</Link></h5>
                        </Header>
                        {keyboard.imgs.length > 0 ? this.renderImages() : <NoImages/>}
                        <Info>
                            {renderForSale(keyboard, param)}
                            {this.renderInfoItem('Size', 'size')}                            
                            {this.renderInfoItem('Layout', 'layout')}
                            {this.renderInfoItem('Switches', 'switches')}
                            {this.renderInfoItem('Keycaps', 'keycaps')}
                            {this.renderInfoItem('Condition', 'condition')}
                        </Info>
                        {param === 'preview' ? <ChangeButton submit onClick={this.changeKeyboard}>Change</ChangeButton> : null}                        
                        {param === 'preview' ? <SubmitButton change onClick={this.submitKeyboard}>Submit</SubmitButton> : null}
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({postKeyboard}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleKeyboard)