import { ProviderState } from '../ComponentState/provider';
import { message } from 'antd';

/**
 * @param state
 * @param action
 */

export const ProviderReducer = (state = ProviderState, action) => {
  switch (action.type) {
    case 'CREATE_PROVIDER':
      message.success('PROVIDER CREATED SUCCESSFULLY');
      return { error: action.error, message: action.message ,changed: true };
    case 'FETCH_PROVIDER':
      return { error: action.error, payload: action.payload.users, message: action.message };
    case 'EDIT_PROVIDER':
      message.success('PROVIDER EDITED SUCCESSFULLY');
      return { error: action.error, message: action.message, changed: true };
    case 'FILTER_PROVIDER':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'DELETE_PROVIDER':
      return { error: action.error, payload: action.payload, message: action.message };
      case 'OPEN_PROVIDER_CREATE_MODAL':
        return { ...state, modal: true };
      case 'CLOSE_PROVIDER_CREATE_MODAL':
        return { ...state, modal: false };
        case 'OPEN_PROVIDER_EDIT_MODAL':
        return { ...state, modal1: true };
      case 'CLOSE_PROVIDER_EDIT_MODAL':
        return { ...state, modal1: false };
    default:
      return state;
  }
};
