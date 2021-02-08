import { AppointmentTypeState } from '../ComponentState/appointment_type';
import { message } from 'antd';

/**
 * @param state
 * @param action
 */

export const AppointmentTypeReducer = (state = AppointmentTypeState, action) => {
  switch (action.type) {
    case 'OPEN_APPOINTMENT_TYPE_MODAL':
      return { ...state, modal: true };
    case 'CLOSE_APPOINTMENT_TYPE_MODAL':
      return { ...state, modal: false };
    case 'OPEN_APPOINTMENT_TYPE_MODAL2':
      return { ...state, modal2: true };
    case 'CLOSE_APPOINTMENT_TYPE_MODAL2':
      return { ...state, modal2: false };

    case 'CREATE_APPOINTMENT_TYPE':
      message.success('APPOINTMENT TYPE CREATED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        changed: true,
        modal: false,
        message: action.message,
      };
    case 'FETCH_APPOINTMENT_TYPE':
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: false,
      };
    case 'EDIT_APPOINTMENT_TYPE':
      message.success('APPOINTMENT TYPE EDITED SUCCESSFULLY');

      return {
        ...state,
        error: action.error,
        modal: false,
        changed: true,
        message: action.message,
      };
    case 'FILTER_APPOINTMENT_TYPE':
      return { ...state, error: action.error, payload: action.payload, message: action.message };
    case 'DELETE_APPOINTMENT_TYPE':
      message.success('APPOINTMENT TYPE DELETED SUCCESSFULLY');
      return { ...state, error: action.error, message: action.message, changed: true };
    case 'FETCH_HOSPITAL_APPOINTMENT_TYPE':
      return { ...state, error: action.error, payload: action.payload, message: action.message };

    default:
      return state;
  }
};
