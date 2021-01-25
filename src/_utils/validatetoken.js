// import React from 'react';
import store from 'store';
import jwt_decode from 'jwt-decode';
import { message } from 'antd';
import { axiosInstance } from './axiosInstance';
import axios from 'axios';
import callApi from './callApi';

export const ValidateToken = async () => {
  return new Promise(async (resolve, reject) => {
    var token = store.get('token');
    const url =
      process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_BASE_URL_PROD
        : process.env.REACT_APP_BASE_URL_DEV;
    console.log('hell');
    if (token) {
      var decoded = jwt_decode(token);

      console.log('***decided', decoded);
      if (Date.now() >= decoded.exp * 1000) {
        store.remove('token');
        message.warning('Token has been expired');
        window.location.href = '/';
      } else {
        try {
          callApi(`/api/backend/v1/get/user/${decoded.user_id}`)
            .then(result => {
              console.log(result);
              const {
                data: { username },
              } = result;
              decoded = { ...decoded, username };
              console.log('*****decided', decoded);
              resolve([true, decoded]);
            })
            .catch(err => {
              console.log(err);
            });
        } catch (err) {
          resolve([false]);
        }
      }
    } else {
      resolve([false]);
    }
  });
};

export const ValidateToken1 = token => {
  return new Promise((resolve, reject) => {
    const url =
      process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_BASE_URL_PROD
        : process.env.REACT_APP_BASE_URL_DEV;
    console.log('hell');
    if (token) {
      axios
        .get(`${url}/api/auth/decode`, {
          headers: {
            Authorization: token,
          },
        })
        .then(response => {
          console.log(response);
          if (response.data.data.isValid) {
            var decoded = jwt_decode(token);
            if (Date.now() >= decoded.exp * 1000) {
              resolve([false]);
            }
            resolve([true, decoded]);
          } else {
            store.remove('token');
            message.warning('Invalid token');
            // window.location.href = '/';
          }
        })
        .catch(err => {
          console.log(err);
          resolve([false]);
        });
    } else {
      resolve([false]);
    }
  });
};
