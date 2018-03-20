import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import Container from './containers/container'

class App extends Component {
    render() {
		return (
            <div>
                App
                <Container/>
            </div>
		);
    }
}

export default App;
