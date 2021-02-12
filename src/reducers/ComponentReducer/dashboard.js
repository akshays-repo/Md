import { DashboardState } from '../ComponentState/dashboard';
import { message } from 'antd';

/**
 * @param state
 * @param action
 */

export const DashboardReducer = (state = DashboardState, action) => {
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
