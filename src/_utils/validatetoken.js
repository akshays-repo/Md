// import React from 'react';
import store from 'store';
import jwt_decode from 'jwt-decode';
import { message } from 'antd';
import callApi from './callApi';

export const ValidateToken = async () => {
  return new Promise(async (resolve, reject) => {
    var token = store.get('token');
    if (token) {
      var decoded = jwt_decode(token);

      console.log('***decided', decoded);
      if (Date.now() >= decoded.exp * 1000) {
        store.remove('token');
        message.warning('Token has been expired');
        window.location.href = '/login';
      } else {
        try {
          console.log('*****decided', decoded);
          resolve([true, decoded]);
        } catch (err) {
          resolve([false]);
        }
      }
    } else {
      resolve([false]);
    }
  });
};
