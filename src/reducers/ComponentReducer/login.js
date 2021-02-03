import { LoginState } from '../ComponentState/login';
import { message } from 'antd';

/**
 * @param state
 * @param action
 */

export const LoginReducer = (state = LoginState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      const user_data = action.payload.user;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('name', action.payload.user.user_type.name);
      localStorage.setItem('user_data', JSON.stringify(user_data));
      localStorage.setItem('hospital_id', action.payload.user.hospitalId);

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
      localStorage.removeItem('user_data');
      localStorage.removeItem('hospital_id');

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
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('user_data');
      localStorage.removeItem('hospital_id');
      return { error: action.error, payload: action.payload, isLogin: false };
    default:
      return state;
  }
};
