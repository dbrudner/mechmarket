import React, {Component} from 'react'
import Routing from './routing'


import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import ReduxPromise from 'redux-promise'

import reducers from './reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

class App extends Component {

    render() {
        return (
            <div>
                <Provider store={createStoreWithMiddleware(reducers)}>
                    <MuiThemeProvider>
                        <Routing/>
                    </MuiThemeProvider>
                </Provider>
            </div>
        )
    }
}

export default App

