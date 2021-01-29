import { HospitalState } from '../ComponentState/hospital';

/**
 * @param state
 * @param action
 */

export const HospitalReducer = (state = HospitalState, action) => {
  switch (action.type) {
    case 'CREATE_HOSPITAL':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'FETCH_HOSPITAL':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'EDIT_HOSPITAL':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'FILTER_HOSPITAL':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'DELETE_HOSPITAL':
      return { error: action.error, payload: action.payload, message: action.message };
    default:
      return state;
  }
};
