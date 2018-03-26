import React from 'react'
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
        margin-left: 2.5rem;
    }
`


export default function Images(props) {
    console.log(props)
    return (
        <div>
            <Arrows>
                <div onClick={() => props.showPreviousImage()}>
                    <i className="icon fas fa-arrow-left"></i>
                </div>
                <div onClick={() => props.showNextImage()}>
                    <i className="icon fas fa-arrow-right"></i>
                </div>
            </Arrows>
            <ImgContainer>
                <img onClick={() => props.openModal()} src={props.imgs[props.showImg]} />
            </ImgContainer>
        </div>
    )
    
}