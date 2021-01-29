import { ProviderTypeState } from '../ComponentState/provider_type';

/**
 * @param state
 * @param action
 */

export const ProviderTypeReducer = (state = ProviderTypeState, action) => {
  switch (action.type) {
    case 'OPEN_CREATE_BRANCH_MODAL':
      return { ...state, modal: true };
    case 'CLOSE_CREATE_BRANCH_MODAL':
      return { ...state, modal: false };
    case 'OPEN_EDIT_BRANCH_MODAL':
      return { ...state, modal1: true };
    case 'CLOSE_EDIT_BRANCH_MODAL':
      return { ...state, modal1: false };
    case 'CREATE_PROVIDER_TYPE':
      return { ...state, error: action.error, message: action.message };
    case 'FETCH_PROVIDER_TYPE':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'EDIT_PROVIDER_TYPE':
      return { ...state, error: action.error, payload: action.payload, message: action.message };
    case 'FILTER_PROVIDER_TYPE':
      return { ...state, error: action.error, payload: action.payload, message: action.message };
    case 'DELETE_PROVIDER_TYPE':
      return { ...state, error: action.error, payload: action.payload, message: action.message };
    default:
      return state;
  }
};
