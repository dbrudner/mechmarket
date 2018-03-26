import React, {Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Redirect } from 'react-router-dom';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {previewKeyboard, showPreviewKeyboard} from '../actions'
import Modal from 'react-responsive-modal'

import {sizes, layouts, conditions} from './select-arrays'
import {PostContainer, Label, SubmitButton, Header, AddImageButton, ImageModal, ImagesContainer} from './styles'

import ImgPreview from './img-preview'
import AddImgButton from './add-img-button'
import ImgList from './img-list'

import Images from '../single-keyboard/images'
import NoImages from '../single-keyboard/no-images'

class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            keyboard: {
                name: '',
                size: '',
                layout: '',
                condition: '',
                keycaps: '',
                switches: '',
                imgs: [],
            },
            fireRedirect: null,
            switches: [],
            keycaps: [],
            addImageModal: false,
            imgUrl: '',
            previewImg: '',
            showImage: 0
        }
    }

    componentDidMount() {
        const keyboards = this.props.keyboards

        // Used to get all switches and caps in database to use for datalist autocomplete
        const keyboardReducer = (keyboards, part) => {
            const parts = Object.keys(keyboards).reduce((acc, key) => {
                if (keyboards[key][part] && !acc.includes(keyboards[key][part])) {
                    return [...acc, keyboards[key][part]]
                }
                return acc
            }, [])

            this.setState({[part]: parts})
        }

        const switches = keyboardReducer(keyboards, 'switches')
        const keycaps = keyboardReducer(keyboards, 'keycaps')

    }

    handleChange = (id, value) => {
        this.setState({keyboard: {...this.state.keyboard, [id]: value}})
    }

    renderInput = (label, key, options) => {
        return (
            <div>
                <Label>
                    {label}
                </Label>
                <input key={key} value={this.state.keyboard[key]} type='text' onChange={event => this.handleChange(key, event.target.value)} />
            </div>
        )
    }

    renderSelect = (label, key, options) => {

        const renderOptions = options => {
            return options.map(option => {
                return <option value={option} key={option}>{option}</option>
            })
        }
        return (
            <div>
                <Label>
                    {label}
                </Label>
                <select>
                    <option value={null}>{label}</option>
                    {renderOptions(options)}
                </select>
            </div>
        )
    }

    renderDatalist = (label, key, options) => {

        const renderOptions = options => {
            return options.map(option => {
                return <option value={option} key={option}/>
            })
        }

        return (
            <div>
                <Label>
                    {label}
                </Label>
                <input list={key} value={this.state.keyboard[key]} onChange={event => this.handleChange(key, event.target.value)} />
                <datalist id={key}>
                    {renderOptions(options)}
                </datalist>
            </div>
        )
    }

    renderAllInputs = () => {
        return Object.keys(this.state.keyboard).map(item => {
            return <div key={item}>{this.renderInput(item)}</div>
        })
    }

    handleClick = event => {

        // Keyboard object with all state input values and userid
        const keyboard = {...this.state.keyboard, userId: this.props.userInfo._id}

        // Closes Modal
        this.props.closeModal()

        // Puts keyboard into redux store
        this.props.previewKeyboard(keyboard)

        // Sets redux store boolean for preview keyboard to true. I think I can get rid of this
        this.props.showPreviewKeyboard(true)

        // Redirects to preview page
        this.setState({redirect: '/preview'})
    }

    imageModal = boolean => {
        this.setState({addImageModal: boolean})
    }

    addImageClick = event => {
        event.preventDefault()
        this.imageModal(true)
    }

    addImage = event => {

        // Function to check if input contains an image tag
        const checkURL = url => {return url.match(/\.(jpeg|jpg|gif|png)$/)};


        event.preventDefault()


        this.setState({
            keyboard: {
                ...this.state.keyboard,
                imgs: [...this.state.keyboard.imgs, this.state.imgUrl]
            },
            previewImg: '',
            addImageModal: false,
            imgUrl: ''
        })
    }

    showPreviewImg = event => {
        event.preventDefault()
        this.setState({previewImg: this.state.imgUrl})
    }

    renderImageModal = () => {
        return (
            <Modal small open={this.state.addImageModal} onClose={() => this.imageModal(false)}>
                <ImageModal>
                    <div>Add an Image</div>
                    <form onSubmit={this.showPreviewImg} >
                        <input value={this.state.imgUrl} onChange={event => this.setState({imgUrl: event.target.value})}/>
                        <button>Preview Image</button>
                    </form>
                    {this.state.previewImg ? <ImgPreview img={this.state.previewImg} /> : null}
                    {this.state.previewImg ? <AddImgButton addImg={this.addImage}/> : null}
                </ImageModal>
            </Modal>
        )
    }

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

    deleteImg = () => {
        const removeIndex = this.state.showImage
        const imgs = this.state.keyboard.imgs.filter((img, index) => {
            if (index !== removeIndex) {
                return img
            } else return
        })
        
        
        this.setState({
            showImg: 0,
            keyboard: {...this.state.keyboard, imgs}
        })
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect}} />
        }

        return (
            <PostContainer>
                {this.renderImageModal()}
                <Header>
                    Share/Sell a keyboard
                </Header>
                <form>
                    {this.renderInput('Name', 'name')}
                    {this.renderSelect('Size', 'size', sizes)}
                    {this.renderSelect('Layout', 'layout', layouts)}
                    {this.renderSelect('Condition', 'condition', conditions)}
                    {this.renderDatalist('Keycaps', 'keycaps', this.state.keycaps)}
                    {this.renderDatalist('Switches', 'switches', this.state.switches)}
                    <ImagesContainer>
                        {this.state.keyboard.imgs.length > 0 
                            ? <Images 
                                showPreviousImage={this.showPreviousImage}
                                showNextImage={this.showNextImage}
                                imgs={this.state.keyboard.imgs}
                                showImg={this.state.showImage}
                                currentImage={this.state.showImage}
                                noModal
                                deleteImg={this.deleteImg}
                            /> 
                            : <NoImages/>}
                    </ImagesContainer>
                    <AddImageButton onClick={this.addImageClick}>Add image</AddImageButton>
                    <SubmitButton onClick={this.handleClick}>
                        Preview Submission
                    </SubmitButton>
                </form>
            </PostContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.userInfo,
        previewKeyboard: state.previewKeyboard,
        showPreviewKeyboard: state.showPreviewKeyboard,
        keyboards: state.keyboards
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({previewKeyboard, showPreviewKeyboard}, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Post)