import React, {Component} from 'react'
import KeyboardListItem from './keyboard-list-item'
import styled from 'styled-components'
import {GridList, GridTile} from 'material-ui/GridList';

import Modal from 'react-responsive-modal'
import {Carousel} from 'react-responsive-carousel'

const KeyboardListContainer = styled.div`
    diplsay: flex;
    flexWrap: 'wrap';
    justifyContent: 'space-around';
`


export default class KeyboardList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            openModal: false,
            previewKeyboard: {
                imgs: []
            },
            imgPreview: 0
        }
    }

    openKeyboard = keyboard => {
        this.setState({
            openModal: true,
            previewKeyboard: keyboard,
            imgPreview: 0
        })
    }

    nextImg = () => {

        if (this.state.imgPreview + 1 >= this.state.previewKeyboard.imgs.length) {
            this.setState({imgPreview: 0})
        } else {
            this.setState({
                imgPreview: this.state.imgPreview + 1
            })
        }
    }

    prevImg = () => {

        if (this.state.imgPreview - 1 < 0) {
            this.setState({imgPreview: this.state.previewKeyboard.imgs.length - 1})
        } else {
            this.setState({
                imgPreview: this.state.imgPreview - 1
            })
        }
    }

    render() {
        const renderKeyboardList = keyboards => {
            return Object.keys(keyboards).map((keyboard) => {
                return (
                    <GridTile
                        onClick={() => this.openKeyboard(keyboards[keyboard])}
                        key={keyboards[keyboard]._id}
                        title={keyboards[keyboard].name}
                        style={{cursor: 'pointer'}}
                    >
                        <img src={keyboards[keyboard].imgs[0]} />
                    </GridTile>
                )
            })
        }

        return (
            <KeyboardListContainer>

                <Modal
                    open={this.state.openModal}
                    onClose={() => this.setState({openModal: false})}
                >
                    <div>
                        {this.state.previewKeyboard.imgs.length ?
                        <div>
                            <img style={{width: '350px'}} src={this.state.previewKeyboard.imgs[this.state.imgPreview]} />
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div onClick={this.prevImg}>Prev</div>
                                <div>{this.state.imgPreview + 1}/{this.state.previewKeyboard.imgs.length}</div>
                                <div onClick={this.nextImg}>Next</div>
                            </div>
                        </div>

                        : <div>No images</div>}
                    </div>
                </Modal>
                <GridList
                    cellHeight={180}
                    style={{
                        width: 500,
                        height: 450,
                        overflowY: 'auto'
                    }}
                >
                    {renderKeyboardList(this.props.keyboards)}
                </GridList>
            </KeyboardListContainer>
        )
    }
}