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

        margin: ${props => props.post ? 0 : "3rem auto"};
        border: 1px solid #c7c4c4;
        padding: ${props => props.post ? 0 : ".3rem"};
        cursor: pointer;
        width: ${props => props.post ? "22rem" : "25rem"};
        margin-left: 1rem;
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
        console.log(this.props.post);

        return (
            <ImgContainer post={this.props.post}>
                <img onLoad={() => this.props.imgLoadSuccess(true)} onError={this.handleError} src={this.props.img} />
            </ImgContainer>
        )
    }
}