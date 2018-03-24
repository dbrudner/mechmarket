import { combineReducers } from 'redux';
import loginOrLogout from './loginOrLogout'
import keyboards from './keyboards'
import openSignUp from './openSignUp'
import postKeyboard from './postKeyboard'
import previewKeyboard from './previewKeyboard'
import showPreviewKeyboard from './showPreviewKeyboard'

const rootReducer = combineReducers({
    userInfo: loginOrLogout,
    keyboards,
    openSignUp,
    postKeyboard,
    previewKeyboard,
    showPreviewKeyboard
});

export default rootReducer;