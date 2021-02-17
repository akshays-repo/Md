import { UnavailableState } from '../ComponentState/unavailable';
import { message } from 'antd';
import moment from 'moment';
/**
 * @param state
 * @param action
 */

export const UnavailableReducer = (state = UnavailableState, action) => {
  switch (action.type) {
    case 'CREATE_PROVIDER_UNAVAILABLE':
      message.success('UNAVAILABLE SLOT ADDED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal: false,
        message: action.message,
        changed: true,
      };
    case 'FETCH_UNAVAILABLE_PROVIDER':
      action.payload = action.payload.map((result, i) => ({
        ...result,
        title: 'Unavailable',
        start: moment(result.appointment_start).format('YYYY-MM-DD HH:mm:ss'),
        end: moment(result.appointment_end).format('YYYY-MM-DD HH:mm:ss'),
        name: result.provider?.fullName || '',
        arrBranchId: result.unavailable_and_branches.map(re => re.branch_id),
      }));
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: false,
      };
    case 'EDIT_PROVIDER_UNAVAILABLE':
      message.success('UNAVAILABLE SLOT EDITED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal1: false,
        changed: true,
        message: action.message,
      };

    case 'DELETE_PROVIDER_UNAVAILABLE':
      message.success('UNAVAILABLE SLOT DELETED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        payload: [],
        message: action.message,
        changed: true,
      };
    default:
      return state;
  }
};
