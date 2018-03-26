import React from 'react'
import styled from 'styled-components'

const ImgPreviewContainer = styled.div`
    img {
        width: 25rem;
        margin-top: 3rem;
        border: 1px solid #f3f3f3;
        border-radius: 5px;
        padding: 2rem;
    }
`

export default function ImgPreview(props) {
    return (
        <ImgPreviewContainer>
            <img src={props.img} />
        </ImgPreviewContainer>
    )
}