import { BranchState } from '../ComponentState/branch';
import { message } from 'antd';

/**
 * @param state
 * @param action
 */

export const AppointmentReducer = (state = BranchState, action) => {
  switch (action.type) {
    case 'OPEN_CREATE_APPOINTMENT_MODAL':
      return { ...state, modal: true };
    case 'CLOSE_CREATE_APPOINTMENT_MODAL':
      return { ...state, modal: false };
    case 'OPEN_EDIT_APPOINTMENT_MODAL':
      return { ...state, modal1: true };
    case 'CLOSE_EDIT_APPOINTMENT_MODAL':
      return { ...state, modal1: false };
      case 'OPEN_VIEW_APPOINTMENT_MODAL':
        return { ...state, modal2: true };
      case 'CLOSE_VIEW_APPOINTMENT_MODAL':
        return { ...state, modal2: false };

    case 'CREATE_APPOINTMENT':
      message.success('APPOINTMENT CREATED SUCCESSFULLY');
      return { ...state, error: action.error, modal: false, message: action.message };
    case 'FETCH_APPOINTMENT':
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: false,
      };
    case 'EDIT_APPOINTMENT':
      message.success('APPOINTMENT EDITED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal1: false,
        changed: true,
        message: action.message,
      };
    case 'FILTER_APPOINTMENT':
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: true,
      };
    case 'DELETE_APPOINTMENT':
      message.success('APPOINTMENT DELETED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: true,
      };
    case 'FETCH_ERROR':
      message.error(action.message);
      return { ...state };
    default:
      return state;
  }
};
