import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createRootReducer } from 'reducers';

export const history = createBrowserHistory();

export const store = createStore(
  createRootReducer(history),
  compose(applyMiddleware(routerMiddleware(history), thunkMiddleWare)),
);

// store.subscribe(() => console.log(store.getState()));
