import React, {Component} from 'react'
import styled from 'styled-components'
import imagefail from '../images/imagefail.jpg'

const Arrows = styled.div`

    margin: 0 2rem 0 2.5rem;
    display: flex;
    justify-content: space-between;

    div {
        cursor: pointer;
    }
`

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
        margin: ${props => props.post ? 0 : "3rem auto"};
        border: 1px solid #c7c4c4;
        padding: ${props => props.post ? 0 : ".3rem"};
        cursor: pointer;
        width: ${props => props.post ? "22rem" : "25rem"};
        margin-left: ${props => props.left ? "1rem" : "2.6rem"};
    }
`
const ImagesContainer = styled.div`
    padding-top: 1rem;
    border-radius: 5px;
    margin-bottom: 2rem;
    text-align: left;
`
const Helper = styled.div`
    text-align: center;
    margin-bottom: 1rem;
    font-style: italic;
    color: #d4d4d4;
`

const Delete = styled.div`
    background-color: ${props => props.theme.color4};
    text-align: center;
    font-size: 1.2rem;
    margin: 1rem auto;
    display: inline-block;
    color: #8c8c8c;

    :hover {
        color: #9696ff;
        transition: all .2s;
        cursor: pointer;
    }

    span {
        margin-left: .5rem;
        font-size: 1.6rem;
    }
    

`

export default class Images extends Component {

    constructor(props) {
        super(props)
        this.state = {
            imgs: this.props.imgs,
            currentImage: this.props.currentImage
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            imgs: nextProps.imgs,
            currentImage: nextProps.currentImage
        })
    }

    handleClick = () => {
        if (this.props.noModal) return;
        this.props.openModal()
    }

    deleteImg = () => {
        if (this.state.imgs.length - 1 === this.state.currentImage) {
            this.props.showPreviousImage()
        }
        this.props.deleteImg()
    }

    render() {
        return (
            <ImagesContainer>
                <Arrows>
                    <div onClick={() => this.props.showPreviousImage()}>
                        <i className="icon fas fa-arrow-left"></i>
                    </div>
                    <div>
                        {this.state.currentImage + 1}/{this.state.imgs.length}
                    </div>
                    <div onClick={() => this.props.showNextImage()}>
                        <i className="icon fas fa-arrow-right"></i>
                    </div>
                </Arrows>

                <ImgContainer post={this.props.post}>
                    <img onError={e => e.target.src=imagefail} onClick={this.handleClick} src={this.props.imgs[this.props.currentImage]} />
                </ImgContainer>
            </ImagesContainer>
        )
    }



}