import { combineReducers } from 'redux';
import loginOrLogout from './loginOrLogout'
import keyboards from './keyboards'
import openSignUp from './openSignUp'
import postKeyboard from './postKeyboard'

const rootReducer = combineReducers({
    userInfo: loginOrLogout,
    keyboards,
    openSignUp,
    postKeyboard
});

export default rootReducer;