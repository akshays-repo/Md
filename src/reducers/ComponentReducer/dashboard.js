import { AppointmentTypeState } from '../ComponentState/appointment_type';
import { message } from 'antd';

/**
 * @param state
 * @param action
 */

export const DashboardReducer = (state = AppointmentTypeState, action) => {
  switch (action.type) {
    case 'FETCH_APPOINTMENT_HOME':
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
