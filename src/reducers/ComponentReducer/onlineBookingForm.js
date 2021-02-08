import { CustomFormState } from '../ComponentState/customForm';
import { message } from 'antd';

/**
 * @param state
 * @param action
 */

export const OnlineBookingFormReducer = (state = CustomFormState, action) => {
  switch (action.type) {
    case 'CREATE_ONLINE_APPOINTMENT':
      return { error: action.error, payload: action.payload, message: 'sucess' ,};
    default:
      return state;
  }
};
