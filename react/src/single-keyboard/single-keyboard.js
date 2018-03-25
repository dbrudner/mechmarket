import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Modal from 'react-responsive-modal'

import {SingleKeyboardContainer} from './single-keyboard-container'


const imgs = [
    'https://geekhack.org/index.php?action=dlattach;topic=57723.0;attach=63093;image',
    'https://i.redd.it/1a1l70dgdq7z.jpg'
]

const InfoContainer = styled.div`
    margin: 0 auto;
    display: block;
    width: 30rem;
`

const Arrows = styled.div`

    margin: 1rem 2rem;
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
        margin-top: 0;

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
        if (this.state.showImage > this.state.keyboard.imgs.length - 1) {
            this.setState({
                showImage: this.state.showImage + 1
            })
        } else this.setState({showImage: 0})
    }

    render() {
        console.log(this.state.keyboard)
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
                    <img onClick={() => this.setState({open: true})} src={keyboard.imgs[0]} />
                    <Arrows>
                        <div>
                            <i className="icon fas fa-arrow-left"></i>
                        </div>
                        <div>                       
                            <i className="icon fas fa-arrow-right"></i>
                        </div>
                    </Arrows>
                    <div>Size: {keyboard.size}</div>
                    <div>Layout: {keyboard.layout}</div>
                    <div>Switches: {keyboard.switches}</div>
                    <div>Keycaps: {keyboard.keycaps}</div>
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