import { combineReducers } from 'redux';
import loginOrLogout from './loginOrLogout'
import keyboards from './keyboards'

const rootReducer = combineReducers({
    userInfo: loginOrLogout,
    keyboards: keyboards
});

export default rootReducer;