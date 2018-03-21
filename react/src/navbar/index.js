import React, {Component} from 'react'
import styled from 'styled-components'

class Navbar extends Component {

    constructor(props) {
        super(props)

        this.state ={}
    }

    render() {

        const Navbar = styled.div`
            ul {
                
                
                li {
                    display: inline-block;
                    margin-left: 2rem;
                }
            }
        `

        return (
            <Navbar>
                <ul>
                    <li>Keyboards</li>
                    <li>Parts</li>
                    <li>Post new item</li>
                </ul>
                    
            </Navbar>
        )
    }
}


export default Navbar