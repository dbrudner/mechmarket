import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import Navbar from './navbar/navbar'
import Logout from './logout/logout'
import PostKeyboard from './post-keyboard/post-keyboard'
import SearchKeyboard from './search-keyboard/search-keyboard'
import Home from './home/home'

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