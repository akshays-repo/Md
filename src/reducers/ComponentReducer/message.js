import { MessageState } from '../ComponentState/message';
import { message } from 'antd';

/**
 * @param state
 * @param action
 */

export const MesssageReducer = (state = MessageState, action) => {
  switch (action.type) {
    case 'CLEAR_MESSAGE':
      return { ...state, payload: [] };
    case 'SET_MESSAGE':
      return {
        ...state,
        error: action.error,
        payload: state.payload.length > 0 ? [...state.payload, action.payload] : action.payload,
        message: action.message,
        changed: true,
      };
    default:
      return state;
  }
};
