import { ProviderState } from '../ComponentState/provider';

/**
 * @param state
 * @param action
 */

export const ProviderReducer = (state = ProviderState, action) => {
  switch (action.type) {
    case 'CREATE_PROVIDER':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'FETCH_PROVIDER':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'EDIT_PROVIDER':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'FILTER_PROVIDER':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'DELETE_PROVIDER':
      return { error: action.error, payload: action.payload, message: action.message };
    default:
      return state;
  }
};
