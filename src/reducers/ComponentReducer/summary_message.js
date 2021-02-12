import { SummaryMessageState } from '../ComponentState/summary_message';
import { message } from 'antd';

/**
 * @param state
 * @param action
 */

export const SummaryMesssageReducer = (state = SummaryMessageState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE_SUMMARY':
      console.log('MEssage summary', action);

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
