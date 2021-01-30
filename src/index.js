import React, { Suspense, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './reducers/configureStore';
import './index.css';
import 'antd/dist/antd.css';
import './sass/main.scss';
import Router from 'navigation/Router';
import { ValidateToken } from './_utils/validatetoken';

if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

export const Foodcan = React.createContext();

const App = () => {
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const validate = async () => {
      try {
        const result = await ValidateToken();
        if (result[0]) {
          store.dispatch({ type: 'LOGIN_VERIFIED' });
          setloading(false);
        } else {
          store.dispatch({ type: 'LOGIN_EXPIRED' });
          setloading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    validate();
  }, []);

  if (loading) {
    return (
      <div className="loadingdiv">
        <i class="fa fa-spinner fa-spin"></i>
      </div>
    );
  }
  return (
    <Provider store={store}>
      <Suspense
        fallback={
          <div className="loadingdiv">
            <i className="fa fa-spinner fa-spin"></i>
          </div>
        }
      >
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Suspense>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
