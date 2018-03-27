import React from 'react'
import styled from 'styled-components'

export default function AddImgButton(props) {

    const AddImgButton = styled.button`
        display: block;
        margin: 0 auto;
    `

    return (
        <AddImgButton onClick={props.addImg}>
            Add Image
        </AddImgButton>
    )
}