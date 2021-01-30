import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Footer from 'pages/Footer';
import Header from 'pages/Header';
import { message, notification } from 'antd';

export const PrivateRoute = ({ authorized, component: Component, path, keys, exact, history }) => {
  const [scroll, setscroll] = useState(0);
  useEffect(() => {
    window.scrollTo({
      top: 80,
      left: 100,
      behavior: 'smooth',
    });
  }, [scroll]);
  //   alert(path);
  return (
    <Route
      path={path}
      key={keys}
      exact={exact}
      render={props => {
        //
        if (authorized) {
          return (
            <div
              className="main_container"
              style={{
                width: '100%',
                overflowX: 'hidden',
              }}
            >
              <Header {...props} />
              <div>
                <Component {...props} />
              </div>
              <Footer setscroll={setscroll} />
            </div>
          );
        } else {
          notification.error({
            message: 'Unauthorized Access',
            description: 'Please Login to Access the Page !',
          });
          history.push('/login');
          // window.location.href = '/';
        }
        // } else {
        //   //
        //   notification.error({
        //     message: 'Unauthorized Access',
        //     description: 'You have no rights to access this page!',
        //   });
        //   return <Redirect to='/' />;
        // }
        // return <Redirect to="/user/login" />
        // return <Redirect to='/' />;
      }}
    />
  );
};
