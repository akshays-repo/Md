import { ScheduleState } from '../ComponentState/schedule';
import { message } from 'antd';

/**
 * @param state
 * @param action
 */

export const ScheduleReducer = (state = ScheduleState, action) => {
  switch (action.type) {
    case 'OPEN_SCHEDULE_MODAL':
      return { ...state, modal: true };
    case 'CLOSE_SCHEDULE_MODAL':
      return { ...state, modal: false };
    case 'CREATE_SCHEDULE':
      message.success('SCHEDULE ADDED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        changed: true,
        modal: false,
        message: action.message,
      };
    case 'FETCH_SCHEDULE':
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: false,
      };
    case 'FETCH_PROVIDER_SCHEDULE':
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: false,
      };

    default:
      return state;
  }
};
