import React, {Component} from 'react'
import Routing from './routing'


import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise'

import reducers from './reducers';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {muiCustomTheme} from './mui-theme'

import { ThemeProvider } from 'styled-components';
import {theme} from './theme'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

class App extends Component {


    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(muiCustomTheme)}>
                    <ThemeProvider theme={theme}>
                        <Provider store={createStoreWithMiddleware(reducers)}>
                            <Routing/>
                        </Provider>
                    </ThemeProvider>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default App

