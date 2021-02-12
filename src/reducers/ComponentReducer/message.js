import { MessageState } from '../ComponentState/message';
import { message } from 'antd';

/**
 * @param state
 * @param action
 */

export const MesssageReducer = (state = MessageState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
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
