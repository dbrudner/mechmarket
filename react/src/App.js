import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import Container from './containers/container'
import Navbar from './navbar'

class App extends Component {
    render() {
		return (
            <div>
                <Navbar/>
                <Container/>
            </div>
		);
    }
}

export default App;
