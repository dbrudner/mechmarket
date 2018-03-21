import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import Navbar from './navbar'
import Logout from './logout'
import PostKeyboard from './post-keyboard'
import SearchKeyboard from './search-keyboard'
import Home from './home'

class App extends Component {
    render() {
		return (
            <Router>
                <div>
                    <Navbar/>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/logout' component={Logout} />
                    <Route exact path='/new/keyboard' component={PostKeyboard} />     
                    <Route exact path='/keyboard/:param' component={SearchKeyboard} /> 
                </div>
            </Router>
		);
    }
}

export default App;