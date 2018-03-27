import React from 'react'
import styled from 'styled-components'

export const Button = styled.div`
    color: white;
    border-radius: 5px;
    text-align: center;
    margin: 1rem 1.5rem 1rem 2.5rem;
    cursor: pointer;
    transition: all .2s;
    

    :hover {
        background-color: white;
        color: #61ccd2;
        transition: all .2s;
    }
`

export const SubmitButton = Button.extend`
    border: 2px solid #ff7272;;
    color: white;
    background-color: #ff7272;

    :hover {
        background-color: white;
        color: #61ccd2;
        transition: all .2s;
    }
`

export const ChangeButton = Button.extend`
    background-color: #61ccd2;
    border: 2px solid #61ccd2;
    color: white;

    :hover {
        background-color: white;
        color: #61ccd2;
        transition: all .2s;
    }

`

export const Info = styled.div`
    margin-left: 2.5rem;
`

export const imgs = [
    'https://geekhack.org/index.php?action=dlattach;topic=57723.0;attach=63093;image',
    'https://i.redd.it/1a1l70dgdq7z.jpg'
]

export const InfoContainer = styled.div`
    margin: 0 auto;
    display: block;
    width: 30rem;
    font-size: 1.6rem;
`



export const Header = styled.div`
    margin-bottom: 2rem;
    text-align: center;

    h3 {
        font-size: 3rem;
        margin: 0;
    }

    h5 {
        font-size: 1.8rem;
        margin: 0;

        a {
            text-decoration: none;
            color: rgb(34.4%, 33%, 83.9%)
        }
    }
`
