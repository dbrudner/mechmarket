import { combineReducers } from 'redux';
import loginOrLogout from './loginOrLogout'
import keyboards from './keyboards'
import openSignUp from './openSignUp'

const rootReducer = combineReducers({
    userInfo: loginOrLogout,
    keyboards: keyboards,
    openSignUp: openSignUp
});

export default rootReducer;