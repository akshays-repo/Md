import { PatientState } from '../ComponentState/patient';
import { message } from 'antd';

/**
 * @param state
 * @param action
 */

export const PatientReducer = (state = PatientState, action) => {
  switch (action.type) {
    case 'CREATE_PATIENT':
      message.success('PATIENT CREATED SUCCESSFULLY');
      return { error: action.error, modal: false, message: action.message };
    case 'FETCH_PATIENT':
      return {
        error: action.error,
        payload: action.payload.rows,
        deleted: false,
        message: action.message,
      };
    case 'EDIT_PATIENT':
      message.success('PATIENT UPDATED SUCCESSFULLY');
      return { ...state, error: action.error, modal: false, message: action.message };
    case 'FILTER_PATIENT':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'DELETE_PATIENT':
      message.success('PATIENT DELETED SUCCESSFULLY');
      return { ...state, error: action.error, deleted: true, message: action.message };
    default:
      return state;
  }
};
