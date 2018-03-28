import React, {Component} from 'react'
import styled from 'styled-components'
import imagefail from '../images/imagefail.jpg'

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
        this.state = {
            imgLoad: true,
        }
    }

    componentDidMount() {
        console.log('hi')
        this.setState({imgLoad: true})
    }

    handleError = e => {
        this.setState({imgLoad: false})
        this.props.imgLoadSuccess(false)
        e.target.src=imagefail
    }

    render() {
        return (
            <ImgContainer>
                <img onLoad={this.props.imgLoadSuccess} onError={this.handleError} src={this.props.img} />
            </ImgContainer>
        )
        
    }


}