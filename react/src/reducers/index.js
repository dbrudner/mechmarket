import { combineReducers } from 'redux';
import Books from './books'

const rootReducer = combineReducers({
  books: Books
});

export default rootReducer;