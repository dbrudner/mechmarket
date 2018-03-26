import React from 'react'
import styled from 'styled-components'

export default function ImgList(props) {

    const ImgList = styled.div`
        ul {
            margin: 0;
            li {
                font-size: 1.2rem;
                div {
                    span {
                        margin-left: .5rem;
                        font-style: italic;
                        color: #7b7bf3;
                    }
                }
            }
        }
    `

    const renderImageList = () => {
        return props.imgs.map(img => {
            return (
                <li>
                    <div>
                        {img}<span>(Remove)</span>
                    </div>
                </li>
            )
        })
    }

    return (
        <ImgList>
            Images
            <ul>
                {renderImageList()}
            </ul>
        </ImgList>
    )
}