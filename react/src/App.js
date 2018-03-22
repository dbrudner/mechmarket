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
import Logout from './logout/logout'
import PostKeyboard from './post-keyboard/post-keyboard'
import SearchKeyboard from './search-keyboard/search-keyboard'
import Home from './home/home'
import Signup from './signup/signup'


class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.keyboards()
    }

    closeModal = () => {
        console.log('close modal')
        this.props.openSignUp(false)
    }

    render() {
        console.log(this.props)                
		return (
            <Router>
                <div>
                    <Navbar/>
                    {this.props.state.openSignUp ? <Signup closeModal={this.closeModal}/> : null}
                    <Route exact path='/' component={Home} />
                    <Route exact path='/logout' component={Logout} />
                    <Route exact path='/new/keyboard' component={PostKeyboard} />     
                    <Route exact path='/keyboard/:param' component={SearchKeyboard} /> 
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