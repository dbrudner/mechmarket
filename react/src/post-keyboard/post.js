import React, {Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Redirect } from 'react-router-dom';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {previewKeyboard, showPreviewKeyboard} from '../actions'
import Modal from 'react-responsive-modal'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import {sizes, layouts, conditions} from './select-arrays'
import {PostContainer, Label, SubmitButton, Header, AddImageButton, ImageModal, ImagesContainer} from './styles'

import ImgPreview from './img-preview'
import AddImgButton from './add-img-button'

import Images from '../single-keyboard/images'
import NoImages from '../single-keyboard/no-images'
import imagefail from '../images/imagefail.jpg'

const FormRow = styled.div`
    display: flex;
    justify-content: space-between;
`

class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            keyboard: {...this.props.state.previewKeyboard, ...this.props.state.userInfo},
            fireRedirect: null,
            switches: [],
            keycaps: [],
            addImageModal: false,
            openSingleImageModal: false,
            imgUrl: '',
            previewImg: '',
            showImage: 0,
            imgLoadSucess: null
        }
    }

    componentDidMount() {
        console.log(this.state.keyboard)
        const keyboards = this.props.state.keyboards

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
                <TextField
                    hintText={label}
                    floatingLabelText={label}
                    onChange={event => this.handleChange(key, event.target.value)}
                    value={this.state.keyboard[key]}
                />
            </div>
        )
    }

    renderSelect = (label, key, options) => {

        const renderMenuItems = options => {
            return options.map(option => {
                return <MenuItem value={option} key={option} primaryText={option} />
            })
        }

        return (
                <SelectField
                    floatingLabelText="Frequency"
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    {renderMenuItems(options)}
                </SelectField>
        )
    }

    handleUpdateInput = (value) => {
        this.setState({
            dataSource: [
                value,
                value + value,
                value + value + value,
            ],
        });
    };


    renderDatalist = (label, key, options) => {

        return (
            <div>
                <AutoComplete
                    hintText={label}
                    dataSource={options}
                    onUpdateInput={this.handleUpdateInput}
                    floatingLabelText={label}
                    onUpdateInput={this.handleUpdateInput}
                    value={this.state.keyboard[key]}
                />
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
        const keyboard = {...this.state.keyboard}

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

    // Renders a single image modal when keyboard preview image is clicked.
    renderSingleImgModal = () => {
        const keyboard = this.state.keyboard
        return (
            <Modal open={this.state.openSingleImageModal} onClose={() => this.openSingleImageModal(false)} >
                <img onError={e => e.target.src=imagefail} src={keyboard.imgs[this.state.showImage]} style={{width: '100%'}}/>
            </Modal>
        )
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
                    {this.state.previewImg ? <ImgPreview img={this.state.previewImg} imgLoadSuccess={this.imgLoadSuccess}/> : null}
                    {this.state.previewImg && this.state.imgLoadSucess ? <AddImgButton addImg={this.addImage}/> : null}
                </ImageModal>
            </Modal>
        )
    }

    openSingleImageModal = boolean => this.setState({openSingleImageModal: boolean})

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
        let imgs = this.state.keyboard.imgs

        if (removeIndex === imgs.length - 1) {
            imgs = this.state.keyboard.imgs.slice(0, imgs.length - 1)
            return this.setState({
                keyboard: {...this.state.keyboard, imgs}
            })
        }

        imgs = this.state.keyboard.imgs.filter((img, index) => {
            if (index !== removeIndex) {
                return img
            } else return
        })


        this.setState({
            showImg: 0,
            keyboard: {...this.state.keyboard, imgs}
        })
    }

    imgLoadSuccess = boolean => {
        if (!boolean) return this.setState({imgLoadSucess: boolean, imgUrl: ''})
        else this.setState({imgLoadSucess: boolean})
    }

    render() {

        console.log(this.props.state);

        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect}} />
        }

        return (
            <PostContainer>
                {this.renderImageModal()}
                {this.renderSingleImgModal()}

                <Header>
                    Share/Sell a keyboard
                </Header>
                <form>
                    <FormRow>
                        {this.renderInput('Name', 'name')}
                        {this.renderDatalist('Keycaps', 'keycaps', this.state.keycaps)}
                        {this.renderDatalist('Switches', 'switches', this.state.switches)}
                    </FormRow>
                    <FormRow>
                        {this.renderSelect('Size', 'size', sizes)}
                        {this.renderSelect('Layout', 'layout', layouts)}
                        {this.renderSelect('Condition', 'condition', conditions)}
                    </FormRow>
                    <ImagesContainer>
                        {this.state.keyboard.imgs.length > 0
                            ? <Images
                                showPreviousImage={this.showPreviousImage}
                                showNextImage={this.showNextImage}
                                imgs={this.state.keyboard.imgs}
                                showImg={this.state.showImage}
                                currentImage={this.state.showImage}
                                deleteImg={this.deleteImg}
                                openModal={() => this.openSingleImageModal(true)}
                                post
                            />
                            : <NoImages/>}
                    </ImagesContainer>
                    <AddImageButton onClick={this.addImageClick}> {!this.state.keyboard.imgs.length ? 'Add Image' : 'Add Another Image'} </AddImageButton>
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
        state
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({previewKeyboard, showPreviewKeyboard}, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Post)