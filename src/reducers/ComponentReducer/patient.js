import { PatientState } from '../ComponentState/patient';

/**
 * @param state
 * @param action
 */

export const PatientReducer = (state = PatientState, action) => {
  switch (action.type) {
    case 'CREATE_PATIENT':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'FETCH_PATIENT':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'EDIT_PATIENT':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'FILTER_PATIENT':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'DELETE_PATIENT':
      return { error: action.error, payload: action.payload, message: action.message };
    default:
      return state;
  }
};
