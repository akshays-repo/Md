import { UnavailableState } from '../ComponentState/unavailable';
import { message } from 'antd';

/**
 * @param state
 * @param action
 */

export const UnavailableReducer = (state = UnavailableState, action) => {
  switch (action.type) {
    case 'CREATE_PROVIDER_UNAVAILABLE':
      message.success('UNAVAILABLE SLOT ADDED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal: false,
        message: action.message,
        changed: true,
      };
    case 'FETCH_BRANCH':
      return {
        ...state,
        error: action.error,
        payload: action.payload.users,
        message: action.message,
        changed: false,
      };
    case 'EDIT_PROVIDER_UNAVAILABLE':
      message.success('UNAVAILABLE SLOT EDITED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal1: false,
        changed: true,
        message: action.message,
      };

    case 'DELETE_PROVIDER_UNAVAILABLE':
      message.success('UNAVAILABLE SLOT DELETED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: true,
      };

    case 'EMPTY_BRANCH':
      return { ...state, payload: [] };
    default:
      return state;
  }
};
