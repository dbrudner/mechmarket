import React from 'react'
import styled from 'styled-components'


export default function ImgPreview(props) {
    return (
        <div>
            <img src={props.img} />
        </div>
    )
}