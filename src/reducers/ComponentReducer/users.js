import { UsersState } from '../ComponentState/users';
import { message } from 'antd';
/**
 * @param state
 * @param action
 */

export const UsersReducer = (state = UsersState, action) => {
  switch (action.type) {
    case 'CREATE_USER':
        message.success('BRANCH CREATED SUCCESSFULLY');
      return { error: action.error, message: action.message ,modal:false };
    case 'FETCH_USER':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'EDIT_USER':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'FILTER_USER':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'DELETE_USER':
      return { error: action.error, payload: action.payload, message: action.message };
      case 'OPEN_CREATE_USER_MODAL':
        return { ...state, modal: true };
      case 'CLOSE_CREATE_USER_MODAL':
        return { ...state, modal: false };
      case 'OPEN_EDIT_USER_MODAL':
        return { ...state, modal1: true };
      case 'CLOSE_EDIT_USER_MODAL':
        return { ...state, modal1: false };
    default:
      return state;
  }
};
