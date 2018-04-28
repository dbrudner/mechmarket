import React, {Component} from 'react'
import Routing from './routing'


import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise'

import reducers from './reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { ThemeProvider } from 'styled-components';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

class App extends Component {

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    {/* <ThemeProvider> */}
                        <Provider store={createStoreWithMiddleware(reducers)}>
                            <Routing/>
                        </Provider>
                    {/* </ThemeProvider>                     */}
                </MuiThemeProvider>
            </div>
        )
    }
}

export default App

