import { AppointmentState } from '../ComponentState/appointment';
import { message } from 'antd';
import moment from 'moment';
/**
 * @param state
 * @param action
 */

const status_to_title = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
  completed: 'Completed',
};
export const AppointmentReducer = (state = AppointmentState, action) => {
  switch (action.type) {
    case 'OPEN_CREATE_APPOINTMENT_MODAL':
      return {
        ...state,
        modal: true,
      };
    case 'CLOSE_CREATE_APPOINTMENT_MODAL':
      return {
        ...state,
        modal: false,
      };

    case 'OPEN_EDIT_APPOINTMENT_MODAL':
      return {
        ...state,
        modal1: true,
      };
    case 'CLOSE_EDIT_APPOINTMENT_MODAL':
      return {
        ...state,
        modal1: false,
      };

    case 'OPEN_VIEW_APPOINTMENT_MODAL':
      return {
        ...state,
        modal2: true,
      };
    case 'CLOSE_VIEW_APPOINTMENT_MODAL':
      return {
        ...state,
        modal2: false,
      };

    case 'CREATE_APPOINTMENT':
      message.success('APPOINTMENT CREATED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal: false,
        message: action.message,
      };

    case 'VIEW_APPOINTMENT':
      return {
        ...state,
        error: action.error,
        modal: false,
        message: action.message,
        view: action.payload,
      };

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
      };
    case 'FILTER_APPOINTMENT_CALENDAR':
      action.payload = action.payload
        .filter(re => re.status !== 'cancelled')
        .map((result, i) => ({
          ...result,
          title: status_to_title[result.status],
          start: moment(result.appointment_start).format('YYYY-MM-DD HH:mm:ss'),
          end: moment(result.appointment_end).format('YYYY-MM-DD HH:mm:ss'),
          name: result.firstName + ' ' + result.lastName,
        }));
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
      };
    case 'FILTER_APPOINTMENT_CALENDAR_WITH_CANCELLED':
      return {
        ...state,
        error: action.error,
        payload: action.payload.map((result, i) => ({
          ...result,
          title: status_to_title[result.status],
          start: moment(result.appointment_start).format('YYYY-MM-DD HH:mm:ss'),
          end: moment(result.appointment_end).format('YYYY-MM-DD HH:mm:ss'),
          name: result.firstName + ' ' + result.lastName,
        })),
        message: action.message,
      };
    case 'DELETE_APPOINTMENT':
      message.success('APPOINTMENT DELETED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        message: action.message,
        changed: true,
      };

    case 'STATUS_CHANGE_APPOINTMENT':
      message.success('STATUS CHANGED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        message: action.message,
        changed: true,
      };

    case 'FETCH_ERROR':
      message.error(action.message);
      return {
        ...state,
      };
    default:
      return state;
  }
};
