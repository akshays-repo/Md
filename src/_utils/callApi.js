import fetch from 'isomorphic-unfetch';
import store from 'store';
// import to from 'await-to-js';
// import { store as reduxStore } from 'storeConfig';

// import toaster from 'toasted-notes';
/**
 *
 * @param {string} url
 * @param {object} options
 */
export default async function callApi(url, options = {}) {
  try {
    let apiUrl = url;
    // const controller = new AbortController();
    // const { signal } = controller;

    // const baseURL = process.env.REACT_APP_BASE_URL
    // console.log('baseURL', baseURL)
    const token = store.get('token');
    if (url.startsWith('/')) {
      // if relative url
      if (typeof options.headers === 'undefined') options = { ...options, headers: {} };
      // apiUrl = baseURL + url
      apiUrl = url;
      // options.headers.Authorization = `${localStorage.getItem('token')}`
      options.headers.Authorization = token;
    }
    console.log('0000000000000', options);
    const promise = fetch(apiUrl, options);
    const response = await promise;
    //    promise.cancel = controller.abort;
    if (token && response.status === 401) {
      // Unauthorized
      // reduxStore.dispatch({
      //   type: 'user/LOGOUT',
      // });
      return null;
    }
    if (response.ok) {
      const a = await response.json();
      console.log(a);
      return a;
    }
    if (!response.ok && response.status !== 401) {
      console.log(response.status);
      const a = await response.json().catch(() => {
        throw new Error('Internal server error. Please try again later');
        // toaster.notify('Internal Server Error. Please try again later');
      });
      if (a && a.error) {
        // const err = new Error(a.error ? a.error : response.statusText);
        // err.status = response.status;
        // throw err;
        // return null
        // toaster.notify(`Error! ${a.error}`)
        throw new Error(a.error);
      }
    }
    return null;
  } catch (err) {
    console.log('catch block', err.message);
    throw err;
  }
}
