import React, {Component} from 'react'
import styled from 'styled-components'

const ImgContainer = styled.div`
    position: relative;
    width: 30rem;
    height: 22rem;
    display: block;
    margin: auto;

    img {

        margin: 3rem auto;
        border: 1px solid #c7c4c4;
        padding: .3rem;
        cursor: pointer;
        width: 25rem;
        margin-left: 2rem;
    }
`

export default class ImgPreview extends Component {

    constructor(props) {
        super(props)
        this.state = {imgLoad: true}
    }

    handleError = () => {

        this.setState({imgLoad: false})

        this.props.imgLoadSuccess(false)
    }

    handleSuccess = () => {
        this.props.imgLoadSuccess(true)
    }

    render() {

        if (this.state.imgLoad) {
            return (
                <ImgContainer>
                    <img onLoad={this.handleSuccess} onError={this.handleError} src={this.props.img} />
                </ImgContainer>
            )
        } else {
            return <div>Image not found</div>
        }


    }


}