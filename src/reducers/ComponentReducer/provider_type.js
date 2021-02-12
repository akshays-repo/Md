import { ProviderTypeState } from '../ComponentState/provider_type';
import { message } from 'antd';

/**
 * @param state
 * @param action
 */

export const ProviderTypeReducer = (state = ProviderTypeState, action) => {
  switch (action.type) {
    case 'OPEN_PROVIDERTYPE_MODAL':
      return { ...state, modal: true };
    case 'CLOSE_PROVIDERTYPE_MODAL':
      return { ...state, modal: false };
    case 'OPEN_PROVIDERTYPE_MODAL1':
      return { ...state, modal1: true };
    case 'CLOSE_PROVIDERTYPE_MODAL1':
      return { ...state, modal1: false };
    case 'CREATE_PROVIDER_TYPE':
      message.success('PROVIDER TYPE CREATED SUCCESSFULLY');

      return { ...state, error: action.error, message: action.message,  changed: true };
    case 'FETCH_PROVIDER_TYPE':
      return {
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: false,
      };
    case 'EDIT_PROVIDER_TYPE':
      message.success('PROVIDER EDITED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        message: action.message,
        changed: true,
      };
    case 'FILTER_PROVIDER_TYPE':
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: true,
      };
    case 'DELETE_PROVIDER_TYPE':
      message.success('PROVIDER DELETED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        message: action.message,
        deleted:true
      };
    default:
      return state;
  }
};
