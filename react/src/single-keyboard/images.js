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

export default function Images(props) {
    return (
        <ImagesContainer>
            <Arrows>
                <div onClick={() => props.showPreviousImage()}>
                    <i className="icon fas fa-arrow-left"></i>
                </div>
                <div>
                    {props.currentImage + 1}/{props.imgs.length}
                </div>
                <div onClick={() => props.showNextImage()}>
                    <i className="icon fas fa-arrow-right"></i>
                </div>
            </Arrows>
            
            <ImgContainer>
                <img onClick={() => props.openModal()} src={props.imgs[props.showImg]} />
            </ImgContainer>
            <Helper>
                Click image to enlarge
            </Helper>
        </ImagesContainer>
    )
    
}