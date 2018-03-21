import { combineReducers } from 'redux';
import Books from './books'
import LoggedIn from './loggedIn'

const rootReducer = combineReducers({
  books: Books,
  LoggedIn
});

export default rootReducer;