import { combineReducers } from 'redux';
import loginOrLogout from './loginOrLogout'
import keyboards from './keyboards'
import openSignUp from './openSignUp'
import postKeyboard from './postKeyboard'
import previewKeyboard from './previewKeyboard'

const rootReducer = combineReducers({
    userInfo: loginOrLogout,
    keyboards,
    openSignUp,
    postKeyboard,
    previewKeyboard
});

export default rootReducer;