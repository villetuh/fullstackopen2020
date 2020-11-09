import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';

const store = createStore(
  combineReducers({
    blogs: blogReducer,
    currentUser: userReducer,
    notification: notificationReducer
  }),
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;
