import callApi from '_utils/callApi';
import { backend_api } from '../_constants/api';
import { message } from 'antd';

/**
 * Async action creator for hospital. All the action to roledef reducer are dispatch from this.
 * @param action
 */
export const actionCreator = result => {
  return async dispatch => {
    let url = backend_api[result.action_type];
    if (result.id) {
      url = `${url}/${result.id}`;
    }
    let query = '';
    if (result.param) {
      if (Array.isArray(result.param.provider_id)) {
        const { provider_id, ...rest } = result.param;
        const checkParam = Object.keys(provider_id).map(
          k => encodeURIComponent('provider_id') + '=' + encodeURIComponent(provider_id[k]),
        );
        if (checkParam.length > 0) {
          query += checkParam.join('&') + '&';
        }
        query += Object.keys(rest)
          .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(result.param[k]))
          .join('&');
      } else {
        query += Object.keys(result.param)
          .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(result.param[k]))
          .join('&');
      }
    }
    console.log('Query', result);
    if (query) {
      url = `${url}?${query}`;
    }
    try {
      const config = {
        method: result.method || 'GET',
        body: result.values,
        headers:
          result.contentType === 'JSON'
            ? {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token'),
              }
            : {},
      };
      const response = await callApi(url, config);
      if (response.success) {
        if (result.action_type === 'USER_LOGIN') {
          if (response.user.userTypeId == 2) {
            return dispatch({
              type: result.action_type,
              payload: { user: response.user, token: response.token },
              error: '',
            });
          } else {
            return dispatch({
              type: 'FETCH_ERROR',
              error: true,
              message: 'This is the login portal of hospital',
            });
          }
        } else {
          return dispatch({
            type: result.action_type,
            payload: response.data || response.DATA || response,
            error: '',
          });
        }
      } else {
        return dispatch({ type: 'FETCH_ERROR', error: true, message: response.error });
      }
    } catch (err) {
      return dispatch({ type: 'FETCH_ERROR', payload: [], error: true, message: err.message });
    }
  };
};
