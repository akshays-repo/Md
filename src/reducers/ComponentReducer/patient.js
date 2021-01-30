import { PatientState } from '../ComponentState/patient';
import { message } from 'antd';

/**
 * @param state
 * @param action
 */

export const PatientReducer = (state = PatientState, action) => {
  switch (action.type) {
    case 'OPEN_PATIENT_MODAL':
      return { ...state, modal: true };
    case 'CLOSE_PATIENT_MODAL':
      return { ...state, modal: false };
    case 'CREATE_PATIENT':
      message.success('PATIENT CREATED SUCCESSFULLY');
      return { error: action.error, modal: false, changed: true, message: action.message };
    case 'FETCH_PATIENT':
      return {
        error: action.error,
        payload: action.payload.rows,
        changed: false,
        message: action.message,
      };
    case 'EDIT_PATIENT':
      message.success('PATIENT UPDATED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        changed: true,
        modal: false,
        message: action.message,
      };
    case 'FILTER_PATIENT':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'DELETE_PATIENT':
      message.success('PATIENT DELETED SUCCESSFULLY');
      return { ...state, error: action.error, changed: true, message: action.message };
    default:
      return state;
  }
};
