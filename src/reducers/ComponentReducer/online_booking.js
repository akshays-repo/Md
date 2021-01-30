import { OnlineBookingState } from '../ComponentState/online_booking';

/**
 * @param state
 * @param action
 */

export const OnlineBookingReducer = (state = OnlineBookingState, action) => {
  switch (action.type) {
    case 'CREATE_ONLINE_BOOKING':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'FETCH_ONLINE_BOOKING':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'EDIT_ONLINE_BOOKING':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'FILTER_ONLINE_BOOKING':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'DELETE_ONLINE_BOOKING':
      return { error: action.error, payload: action.payload, message: action.message };
    default:
      return state;
  }
};
