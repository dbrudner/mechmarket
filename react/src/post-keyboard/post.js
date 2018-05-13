import React, {Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Redirect } from 'react-router-dom';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {previewKeyboard, showPreviewKeyboard} from '../actions'
import Modal from 'react-responsive-modal'
import ReactTooltip from 'react-tooltip'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import {Tabs, Tab} from 'material-ui/Tabs';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {
    Step,
    Stepper,
    StepLabel,
  } from 'material-ui/Stepper';

import {sizes, layouts, conditions} from './select-arrays'
import {Help, Step1Header, PostContainer, Label, SubmitButton, Header, AddImageButton, ImageModal, ImagesContainer, Helper, TabHeader, KeyboardType} from './styles'

import ImgPreview from './img-preview'

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
            imgLoadSucess: null,
            step: 3,
            type: null
        }
    }

    componentDidMount() {
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

    handleChange = (id, value) => this.setState({keyboard: {...this.state.keyboard, [id]: value}})

    renderInput = (label, key, options, helper) => {
        return (
            <div>
                <TextField
                    hintText={`${label} ${helper}`}
                    floatingLabelText={label}
                    onChange={event => this.handleChange(key, event.target.value)}
                    value={this.state.keyboard[key]}
                    autoFocus
                    style={{textAlign: "center"}}
                />
            </div>
        )
    }

    moreInfo = key => {
        console.log(key);
    }

    renderTabList = (label, key, options) => {

        // <ReactTooltip place="bottom" id='step0help' globalEventOff='click'>
        //             <div>
        //                 <h3>
        //                     Click one of the two buttons to get started.
        //                 </h3>
        //                 <div>
        //                     A <strong>Custom</strong> keyboard has been soldered or assembled and put together by an individual.
        //                 </div>
        //                 <div>
        //                     A <strong>Pre-built</strong> keyboard is a keyboard originally made by a manufacturer.
        //                 </div>
        //             </div>
        //         </ReactTooltip>
        //     <Help data-tip data-for="step0help" data-event='click focus'>Help <i className="fas fa-question-circle"></i></Help>

        const renderHelper= () => {
            if (key === "size") {
                return (
                    <div onClick={() => this.moreInfo(key)} style={{marginLeft: "5px", color: "#01579B", cursor: "pointer"}}>
                        <span style={{fontSize: "2rem"}} data-tip data-for="size" data-event='click focus'><i className="fas fa-question-circle"></i></span>                    
                        <ReactTooltip id='size' place='bottom' className='whiteBackground' globalEventOff='click'>
                            <div>
                                <img style={{width: "60rem"}} src="https://www.qwerkeys.co.uk/wp-content/uploads/2013/11/keyboard_common-sizes1.jpg" />
                            </div>
                        </ReactTooltip>
                    </div>
                )
            } 
            
            if (key === "layout") {
                <span onClick={() => this.moreInfo(key)} style={{marginLeft: "5px", color: "#01579B", cursor: "pointer"}}>
                    <i className="fas fa-question-circle"></i>
                </span>
            }

            else return null;
        }
        

        return (
            <div style={{marginTop: "2.5rem"}}>
                <TabHeader>
                    <div><h3>{label}</h3></div>
                    {renderHelper()}
                </TabHeader>
                <RadioButtonGroup name={label} onChange={value => this.handleChange(key, value)}>
                    {options.map(option => <RadioButton key={option} value={option} label={option}></RadioButton>)}
                </RadioButtonGroup>
            </div>
        )
    }

    handleUpdateInput = (e, datasrc) => {
        this.setState({
            dataSources: {...this.state.dataSources, [datasrc]: e.target.value}
        });
    };


    renderDatalist = (label, key, options, helper) => {
        return (
            <div>
                <AutoComplete
                    hintText={helper}
                    dataSource={options}
                    onUpdateInput={value => this.setState({keyboard: {...this.state.keyboard, [key]: value}})}
                    floatingLabelText={label}
                    value={this.state.keyboard[key]}
                    style={{textAlign: "center"}}
                />
            </div>
        )
    }

    submitKeyboard = event => {

        // Keyboard object with all state input values and userid
        const {keyboard} = this.state

        // Closes Modal
        this.props.closeModal();

        // Puts keyboard into redux store
        this.props.previewKeyboard(keyboard);

        // Sets redux store boolean for preview keyboard to true. I think I can get rid of this
        this.props.showPreviewKeyboard(true);

        // Redirects to preview page
        this.setState({redirect: '/preview'});
    }

    imageModal = boolean => {
        this.setState({addImageModal: boolean});
    }

    addImageClick = event => {
        console.log('hi')
        this.imageModal(true);
    }

    addImage = () => {

        this.setState({
            keyboard: {
                ...this.state.keyboard,
                imgs: [...this.state.keyboard.imgs, this.state.imgUrl]
            },
            previewImg: '',
            addImageModal: false,
            imgUrl: ''
        });
    }

    showPreviewImg = event => {
        event.preventDefault();
        this.setState({previewImg: this.state.imgUrl});
    }

    // Renders a single image modal when keyboard preview image is clicked.
    renderSingleImgModal = () => {
        const keyboard = this.state.keyboard
        return (
            <Modal open={this.state.openSingleImageModal} onClose={() => this.openSingleImageModal(false)} >
                <img onError={e => e.target.src=imagefail} src={keyboard.imgs[this.state.showImage]} style={{width: '100%'}}/>
            </Modal>
        );
    }

    renderImageModal = () => {
        return (
            <Modal small open={this.state.addImageModal} onClose={() => this.imageModal(false)}>
                <ImageModal>
                    <h1>Add an Image</h1>
                    <form onSubmit={this.showPreviewImg} >'
                        <TextField
                            hintText="Add an image"
                            floatingLabelText="Add an image"
                            onChange={event => this.setState({imgUrl: event.target.value})}
                            value={this.state.imgUrl}
                            autoFocus
                        />
                        <RaisedButton primary type="submit" label="Preview image" />
                    </form>
                    {this.state.previewImg ? <ImgPreview img={this.state.previewImg} imgLoadSuccess={this.imgLoadSuccess}/> : null}
                    {this.state.previewImg && this.state.imgLoadSucess ? <AddImageButton onClick={this.addImage}>Add Image</AddImageButton> : null}
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

    nextStep = () => this.setState({step: this.state.step + 1})

    prevStep = () => this.setState({step: this.state.step - 1})

    getKeyboardType = type => {
        this.setState({
            keyboard: {...this.state.keyboard, type},
            step: this.state.step + 1
        }, () => {
            if (type === 'custom') {
                console.log('hi');
                this.setState({
                    keyboard: {...this.state.keyboard, name: 'Custom'}
                })
            }
        })
    }

    step0 = () => {
        return (
            <div>
                <Step1Header>
                    <hr/>
                    <Helper>What kind of keyboard are you posting?</Helper>
                </Step1Header>
                <div style={{marginTop: "3.5rem"}}>
                    <KeyboardType onClick={() => this.getKeyboardType("custom")}>Custom <i className="fas fa-angle-right"></i></KeyboardType>
                    <KeyboardType onClick={() => this.getKeyboardType("pre-built")}>Pre Built <i className="fas fa-angle-right"></i></KeyboardType>
                </div>
                <ReactTooltip place="bottom" id='step0help' globalEventOff='click'>
                    <div>
                        <h3>
                            Click one of the two buttons to get started.
                        </h3>
                        <div>
                            A <strong>Custom</strong> keyboard has been soldered or assembled and put together by an individual.
                        </div>
                        <div>
                            A <strong>Pre-built</strong> keyboard is a keyboard originally made by a manufacturer.
                        </div>
                    </div>
                </ReactTooltip>
                <Help data-tip data-for="step0help" data-event='click focus'>Help <i className="fas fa-question-circle"></i></Help>
            </div>
        )
    }

    step1 = () => {
        return (
            <form onSubmit={this.nextStep}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    {this.renderInput('Model', 'name', null, '(Poker 2, Ducky Mini, etc.)')}
                    <ReactTooltip place="bottom" id='model' globalEventOff='click'>
                    <h3>Add a generic model or name for your keyboard</h3>
                    <p>You'll be able to add a longer description later</p>
                    </ReactTooltip>                    
                    <Help data-tip data-for="model" data-event='click focus'><i className="fas fa-question-circle"></i></Help>
                </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    {this.renderDatalist('Switches', 'switches', this.state.switches, '(MX Cherry Blue, etc.)')}
                    <ReactTooltip place="bottom" id='switches' globalEventOff='click'>
                    <p>This form has autocomplete. You may find your <strong>switches</strong> when you begin typing.</p>
                    <p>If your switches need further explanation, please use the <strong>description field</strong> later on in the form.</p>
                    </ReactTooltip>                    
                    <Help data-tip data-for="switches" data-event='click focus'><i className="fas fa-question-circle"></i></Help>
                </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    {this.renderDatalist('Keycaps', 'keycaps', this.state.keycaps, "(Stock, DSA, PBT Blanks, etc.)")}
                    <ReactTooltip place="bottom" id='keycaps' globalEventOff='click'>
                    <p>This form has autocomplete. You may find your <strong>keycaps</strong> when you begin typing.</p>
                    </ReactTooltip>                    
                    <Help data-tip data-for="keycaps" data-event='click focus'><i className="fas fa-question-circle"></i></Help>
                </div>
                <div style={{display: "flex", justifyContent: "space-evenly", marginTop: "3rem"}}>
                    <SubmitButton halfWidth onClick={this.prevStep} type="submit"><i className="fas fa-angle-left"></i> </SubmitButton>
                    <SubmitButton halfWidth onClick={this.nextStep} type="submit"> <i className="fas fa-angle-right"></i></SubmitButton>
                </div>
            </form>
        )
    }

    step2 = () => {
        return (
            <form>
                <Helper>More information</Helper>
                {this.renderTabList('Size', 'size', sizes)}
                {this.renderTabList('Layout', 'layout', layouts)}
                {this.renderTabList('Condition', 'condition', conditions)}
                <div style={{display: "flex", justifyContent: "space-evenly", marginTop: "3rem"}}>
                    <SubmitButton halfWidth onClick={this.prevStep} type="submit"><i className="fas fa-angle-left"></i> </SubmitButton>
                    <SubmitButton halfWidth onClick={this.nextStep} type="submit"> <i className="fas fa-angle-right"></i></SubmitButton>
                </div>
            </form>
        )
    }

    step3 = () => {

        return (
            <div>
                <Helper>Almost done! Add images if you'd like.</Helper>
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
                        : null}
                </ImagesContainer>
                <div className="text-center">
                    <AddImageButton onClick={this.addImageClick}>{this.state.keyboard.imgs.length <= 0 ? 'Add Imasdfage' : 'Add Another Image'} <i className="fas fa-plus-circle"></i></AddImageButton>
                </div>
                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                    <SubmitButton halfWidth onClick={this.prevStep} type="submit"><i className="fas fa-angle-left"></i> </SubmitButton>
                    <SubmitButton halfWidth onClick={this.submitKeyboard} type="submit">Submit</SubmitButton>
                </div>
                <Help>Help <i className="fas fa-question-circle"></i></Help>
            </div>
        )
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect}} />
        }

        return (
            <PostContainer>
                <Stepper activeStep={this.state.step}>
                    <Step>
                        <StepLabel></StepLabel>
                    </Step>
                    <Step>
                        <StepLabel></StepLabel>
                    </Step>
                    <Step>
                        <StepLabel></StepLabel>
                    </Step>
                    <Step>
                        <StepLabel></StepLabel>
                    </Step>
                </Stepper>
                {this.renderImageModal()}
                {this.renderSingleImgModal()}
                <Header>
                    {this.state.step === 0 ? <h1>Share/Sell a keyboard <i style={{marginLeft: '5px'}} className="far fa-keyboard"></i></h1> : null}
                    {this.state.step === 1 ? <Helper>Basic Information</Helper> : null}
                </Header>
                    {this.state.step === 0 ? this.step0() : this.state.step === 1 ? this.step1() : this.state.step === 2 ? this.step2() : this.state.step === 3 ? this.step3() : null}
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