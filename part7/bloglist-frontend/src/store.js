import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import notificationReducer from './reducers/notificationReducer';

const store = createStore(
  combineReducers({
    notification: notificationReducer
  }),
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;
