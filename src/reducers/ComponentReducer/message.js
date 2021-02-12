import { AppointmentTypeState } from '../ComponentState/appointment_type';
import { message } from 'antd';

/**
 * @param state
 * @param action
 */

export const MesssageReducer = (state = AppointmentTypeState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE_SUMMARY':
        return {
            ...state,
            error: action.error,
            payload: action.payload,
            message: action.message,
            changed: true,
          };
    case 'SET_MESSAGE_SUMMARY':
            return {
                ...state,
                error: action.error,
                payload: action.payload,
                message: action.message,
                changed: true,
              }; 
    default:
      return state;
  }
};
