import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Modal from 'react-responsive-modal'

import {SingleKeyboardContainer} from './single-keyboard-container'

const ImgContainer = styled.div`
    position: relative;
    width: 30rem;
    height: 22rem;
    display: block;
    margin: auto;

    img {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        border: 1px solid #c7c4c4;
        padding: .3rem;
        cursor: pointer;
        width: 25rem;
        margin-left: 2.5rem;
    }
`

const imgs = [
    'https://geekhack.org/index.php?action=dlattach;topic=57723.0;attach=63093;image',
    'https://i.redd.it/1a1l70dgdq7z.jpg'
]

const InfoContainer = styled.div`
    margin: 0 auto;
    display: block;
    width: 30rem;
    font-size: 1.6rem;
`

const Arrows = styled.div`

    margin: 0 2rem 0 2.5rem;
    display: flex;
    justify-content: space-between;

    div {
        cursor: pointer;
    }
`

const Header = styled.div`
    margin-bottom: 2rem;
    text-align: center;

    h3 {
        font-size: 3rem;
        margin: 0;
    }

    h5 {
        font-size: 1.8rem;
        margin: 0;

        a {
            text-decoration: none;
            color: rgb(34.4%, 33%, 83.9%)
        }
    }
`

class SingleKeyboard extends Component {
    constructor(props) {
        super(props)

        // this.state = {
        //     user: this.props.state.userInfo,
        //     keyboard: this.props.state.previewKeyboard
        // }

        this.state ={
            keyboard: {
                name: 'keyboard',
                size: '60%',
                layout: 'ANSI',
                condition: 'Used',
                keycaps: 'None',
                switches: 'MX Cherry Blue',
                imgs: imgs
            },
            open: false,
            showImage: 0
        }
    }

    submitKeyboard = () => {
        const keyboard = this.state.keyboard
        // Posts keyboard to db
        axios.post('/api/new/keyboard', keyboard)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    closeModal = () => this.setState({open: false})

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

    render() {
        console.log(this.state.showImage)
        const keyboard = this.state.keyboard

        return (
            <SingleKeyboardContainer>
                <Modal open={this.state.open} onClose={this.closeModal} >
                    <img src={keyboard.imgs[this.state.showImage]} style={{width: '100%'}}/>
                </Modal>
                <InfoContainer>
                    <Header>
                        <h3>Keyboard Name</h3>
                        <h5><Link to='/user/id'>username</Link></h5>
                    </Header>
                    <Arrows>
                        <div onClick={() => this.showPreviousImage()}>
                            <i className="icon fas fa-arrow-left"></i>
                        </div>
                        <div onClick={() => this.showNextImage()}>
                            <i className="icon fas fa-arrow-right"></i>
                        </div>
                    </Arrows>
                    <ImgContainer>
                        <img onClick={() => this.setState({open: true})} src={keyboard.imgs[this.state.showImage]} />
                    </ImgContainer>
                    
                    <div><strong>Size: </strong>{keyboard.size}</div>
                    <div><strong>Layout: </strong>{keyboard.layout}</div>
                    <div><strong>Switches: </strong>{keyboard.switches}</div>
                    <div><strong>Keycaps: </strong>{keyboard.keycaps}</div>
                </InfoContainer>
            </SingleKeyboardContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(SingleKeyboard)