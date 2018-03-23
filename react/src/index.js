import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import ReduxPromise from 'redux-promise'

import reducers from './reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
