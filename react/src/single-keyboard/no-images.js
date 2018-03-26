import React from 'react'
import styled from 'styled-components'

export default function NoImages() {

    const NoImages = styled.div`
        text-align: center;
        text-transform: uppercase;
        margin-bottom: 4rem;
        font-size: 1.6rem;
        font-weight: 700;
    `

    return (
        <NoImages>
            No images uploaded
        </NoImages>
    )
}