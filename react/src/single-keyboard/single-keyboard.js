import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Modal from 'react-responsive-modal'

import {SingleKeyboardContainer} from './single-keyboard-container'
import Images from './images'

const SubmitButton = styled.div`
    background-color: #61ccd2;
    color: white;
    border-radius: 5px;
    text-align: center;
    margin: 1rem 1.5rem 1rem 2.5rem;
    cursor: pointer;
    color: gray;
    border: 2px solid #61ccd2;
    color: white;
    transition: all .2s;
    
    :hover {
        background-color: white;
        color: #61ccd2;
        transition: all .2s;
    }
`

const Info = styled.div`
    margin-left: 2.5rem;
`

const Change = styled.div`
    font-size: 1.2rem;
    color: rgb(34.4%, 33%, 83.9%);
    display: inline;
    margin-right: 1rem;
    cursor: pointer;
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

        console.log(this.props.state.previewKeyboard)

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
                    imgs: imgs
                },
                open: false,
                showImage: 0
            }
            
        } else {
            this.state = {
                keyboard: this.props.state.previewKeyboard,
                open: false,
                showImage: 0
            }
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

    modal = boolean => this.setState({open: boolean})

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

        const keyboard = this.state.keyboard

        return (
            <SingleKeyboardContainer>
                <Modal open={this.state.open} onClose={() => this.modal(false)} >
                    <img src={keyboard.imgs[this.state.showImage]} style={{width: '100%'}}/>
                </Modal>
                <InfoContainer>
                    <Header>
                        <h3>Keyboard Name</h3>
                        <h5><Link to='/user/id'>username</Link></h5>
                    </Header>
                    <Images
                        showPreviousImage={this.showPreviousImage}
                        showNextImage={this.showNextImage}
                        imgs={keyboard.imgs}
                        showImg={this.state.showImage}
                        openModal={() => this.modal(true)}
                    />
                    <Info>
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
                    <SubmitButton onClick={this.submitKeyboard}>Submit</SubmitButton>
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