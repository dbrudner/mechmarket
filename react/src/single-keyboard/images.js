import React, {Component} from 'react'
import styled from 'styled-components'

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
        margin: auto;
        border: 1px solid #c7c4c4;
        padding: .3rem;
        cursor: pointer;
        width: 25rem;
        margin-left: 2rem;
    }
`
const ImagesContainer = styled.div`
    padding-top: 1rem;
    border: 2px solid #f3f3f3
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
    text-align: center;

    div {
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
        this.setState({currentImage: 0})        
    }

    render() {
        console.log(this.state.currentImage)
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
    
                <ImgContainer>
                    <img onClick={this.handleClick} src={this.state.imgs[this.state.currentImage]} />
                </ImgContainer>
                {this.props.post
                ?
                <Delete>
                    <div onClick={this.deleteImg}>
                        Delete Picture
                        <span><i className="fas fa-trash-alt"></i></span>
                    </div>
                </Delete>
                : <Helper>Click to Enlarge</Helper>
    
            }
    
            </ImagesContainer>
        )
    }

    

}