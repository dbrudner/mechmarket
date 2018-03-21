import React, {Component} from 'react'
import styled from 'styled-components'

class Navbar extends Component {

    constructor(props) {
        super(props)

        this.state ={}
    }

    render() {

        const Navbar = styled.div`
            background-color: rgb(80%, 53.4%, 53.4%);
            width: 100%;
            display: flex;
            justify-content: space-between;
            font-size: 2rem;
            
        `

        const Brand = styled.div`
            display: inline-block;

        `

        const NavLinks = styled.div`
            display: inline-block;
            ul {
                display: inline-block;
                margin: 0; 
                padding: 0;

                li {
                    display: inline-block;
                    margin-left: 2rem;

                    &:first-child {
                        margin-left: 0;
                    }
                }
            }
        `

        const UserInfo = styled.div`

            display: inline-block;

            ul {
                margin: 0; 
                padding: 0;
                li {
                    display: inline-block;                    
                }
            }
            
        `

        return (
            <Navbar>
                <Brand>
                    Mechanical Keyboard Classifieds
                </Brand>
                <NavLinks>
                    <ul>
                        <li>Keyboards</li>
                        <li>Parts</li>
                        <li>Post new item</li>
                    </ul>
                </NavLinks>
                <UserInfo>
                    <ul>
                        <li>Sign in</li>
                        <li>Log in</li>
                    </ul>
                </UserInfo>
            </Navbar>
        )
    }
}


export default Navbar