import React, {Component} from 'react'
import Routing from './routing'


import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise'

import reducers from './reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

class App extends Component {

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <Provider store={createStoreWithMiddleware(reducers)}>
                        <Routing/>
                    </Provider>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default App

