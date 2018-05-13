import styled from 'styled-components'

export const PostContainer = styled.div`
    padding: 0 2rem 2rem 2rem;
`

export const TabHeader = styled.div`
    display: flex;

    div {
        h3 {
            font-size: 1.6rem;
            margin: 5px 0;
            color: ${props => props.theme.grayText};
        }
    }
`

export const Helper = styled.p`
    font-style: italic;
    color: ${props => props.theme.grayText};
    font-size: 1.4rem;
    text-align: center;
    margin-top: 0;
    margin-bottom: 0;
`

export const Label = styled.span`
    margin-right: 3rem;
`

export const SubmitButton = styled.div`
    background-color: white;
    width: ${props => props.halfWidth ? "40%" : "50%"};
    display: "inline-block";
    margin-left: ${props => props.halfWidth ? 0 : "25%"};
    text-align: center;
    border-radius: 5px;
    color: #01579B;
    cursor: pointer;
    margin-top: ${props => props.topMrg ? "2.5rem" : "2rem"};
    text-transform: uppercase;
    font-size: 2rem;
    padding: 3px 0;
    border: 2px solid #01579B;

    :hover {
        background-color: #0071a2;
        color: white;
    }

`

export const Header = styled.div`

    h1 {
        text-transform: uppercase;
        text-align: center;
    }

    p {
        text-transform: none;
        font-size: 1.4rem;
        color: ${props => props.theme.grayText};
        text-align: center;
    }
`

export const AddImageButton = styled.div`
    background-color: ${props => props.theme.color3};
    text-align: center;
    color: white;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 10px 0;
    cursor: pointer;
    border: 1px solid ${props => props.theme.color3};
    font-size: 1.6rem;
    border-radius: 5px;

    :hover {
        color: ${props => props.theme.color3};
        background-color: white;
    }
`

export const ImageModal = styled.div`
    padding: 5rem;
`

export const ImagesContainer = styled.div`
    margin: 3rem 0;
`

export const KeyboardType = styled.div`
    text-transform: uppercase;
    border-radius: 5px;
    background-color: ${props => props.theme.color1}
    color: white;
    padding: 5px;
    text-align: center;
    cursor: pointer;
    font-size: 2.4rem;
    margin-top: 1.5rem;
    transition: all .2s;
    border: 1px solid ${props => props.theme.color1};

    :hover {
        background-color: white;
        color: ${props => props.theme.color1};
        transition: all .2s;
    }
`

export const Step1Header = styled.div`
    text-align: center;
    color: ${props => props.theme.grayText1};

    h1 {
        font-size: 2.4rem;
        margin-bottom: 3rem;
        font-style: italic;
    }

    h3 {
        color: ${props => props.theme.textPrimary};
        font-size: 1.6rem;
    }
`

export const Help = styled.h5`
    cursor: pointer;
    display: inline-block;
    font-size: 1.6rem;
    margin-top: 4rem;
    color: ${props => props.theme.color1};
    text-align: left;
`