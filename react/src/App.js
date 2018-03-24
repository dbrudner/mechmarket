import React, {Component} from 'react'
import Routing from './routing'


import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise'

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

class App extends Component {

    render() {
        return (
            <div>
                <Provider store={createStoreWithMiddleware(reducers)}>
                    <Routing/>
                </Provider>
            </div>
        )
    }
}

export default App

