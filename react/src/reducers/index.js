import { combineReducers } from 'redux';
import Books from './books'
import Login from './login'

const rootReducer = combineReducers({
  books: Books,
  userInfo: Login
});

export default rootReducer;