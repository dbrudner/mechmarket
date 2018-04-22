import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { openSignUp, getKeyboards } from './actions/index';

import Navbar from './navbar/navbar'
import PostKeyboardModal from './post-keyboard/post-keyboard-modal'
import SearchKeyboard from './search-keyboard/search-keyboard'
import Home from './home/home'
import Signup from './signup/signup'
import Login from './login/login'
import SingleKeyboard from './single-keyboard/single-keyboard'

class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // Gets all keyboards from database and stores them in app state
        this.props.keyboards()
    }

    closeSignupModal = () => {
        // Sets opensignup false in app state, closing the sign up modal
        this.props.openSignUp(false)
    }

    closeLoginModal = () => {
        this.props.openLogin(false)        
    }

    render() {

		return (
            <Router>
                <div>
                    <Navbar/>
                    {/* When signup is true in app state, shows sign up modal */}

                    {this.props.state.openSignUp ? <Signup closeModal={this.closeSignupModal}/> : null}
                    {this.props.state.openLogin ? <Login closeModal={this.closeLoginModal}/> : null}                    
                    {this.props.state.postKeyboard ? <PostKeyboardModal closeModal={this.closeSignupModal}/> : null}
                    {/* {this.props.state.showPreviewKeyboard ? <SingleKeyboard preview/> : null} */}
                    <Route exact path='/:param' component={SingleKeyboard} />
                    <Route exact path='/keyboards' component={SearchKeyboard} />
                    <Route exact path='/keyboard/:param' component={SingleKeyboard} />
                    <Route exact path='/' component={Home} />                    
                </div>
            </Router>
		);
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({openSignUp: openSignUp, keyboards: getKeyboards}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)