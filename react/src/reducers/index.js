import { combineReducers } from 'redux';
import loginOrLogout from './loginOrLogout'

const rootReducer = combineReducers({
    userInfo: loginOrLogout
});

export default rootReducer;