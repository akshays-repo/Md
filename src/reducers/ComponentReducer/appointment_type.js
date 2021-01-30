import { AppointmentTypeState } from '../ComponentState/appointment_type';

/**
 * @param state
 * @param action
 */

export const AppointmentTypeReducer = (state = AppointmentTypeState, action) => {
  switch (action.type) {
    case 'CREATE_APPOINTMENT_TYPE':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'FETCH_APPOINTMENT_TYPE':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'EDIT_APPOINTMENT_TYPE':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'FILTER_APPOINTMENT_TYPE':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'DELETE_APPOINTMENT_TYPE':
      return { error: action.error, payload: action.payload, message: action.message };
    default:
      return state;
  }
};
