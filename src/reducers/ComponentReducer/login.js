import { LoginState } from '../ComponentState/login';
import { message } from 'antd';

/**
 * @param state
 * @param action
 */

export const LoginReducer = (state = LoginState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('name', action.payload.user_type.name);
      message.success('LOGGED IN SUCCESSFULLY');
      return {
        error: action.error,
        payload: action.payload,
        isLogin: true,
        message: action.message,
      };
    case 'USER_LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      message.success('LOGGED OUT SUCCESSFULLY');
      return {
        error: action.error,
        isLogin: false,
        payload: action.payload,
        message: action.message,
      };
    case 'LOGIN_VERIFIED':
      return { error: action.error, payload: action.payload, isLogin: true };
    case 'LOGIN_EXPIRED':
      return { error: action.error, payload: action.payload, isLogin: false };
    default:
      return state;
  }
};
