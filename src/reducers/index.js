import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducers } from './combineReducer';

export const createRootReducer = history =>
  combineReducers({
    ...reducers,
    router: connectRouter(history),
  });
