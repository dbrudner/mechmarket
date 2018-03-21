import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import Navbar from './navbar'
import Logout from './logout'

class App extends Component {
    render() {
		return (
            <Router>
                <div>
                    <Navbar/>
                    <Route exact path='/logout' component={Logout} />
                </div>
            </Router>
		);
    }
}

export default App;