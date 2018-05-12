import React,{Component} from 'react'
import axios from 'axios'
import styled from 'styled-components'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const HomeContainer = styled.div`

    text-align: center;

    h1 {
        text-transform: uppercase;
        font-size: 3.6rem;
    }

    p {
        font-size: 1.4rem;       
    }
`

export default class Home extends Component {

    render() {
        return (
            <div>
                <HomeContainer>
                    <h1>
                        Welcome to Mechanical Keyboard Classifieds
                    </h1>
                    <p>
                        This page was built so people could share, sell, and buy mechanical keyboards and their constituent parts
                    </p>
                    <p>
                        To post a keyboard, login or sign up
                    </p>
                </HomeContainer>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}



// export default connect(mapStateToProps, mapDispatchToProps)(Home)