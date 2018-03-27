import React, {Component} from 'react'
import styled from 'styled-components'


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
                <div>
                    <img onLoad={this.handleSuccess} onError={this.handleError} src={this.props.img} />
                </div>
            )
        } else {
            return <div>Image not found</div>
        }


    }


}