import { MessageState } from '../ComponentState/message';

/**
 * @param state
 * @param action
 */

export const MesssageReducer = (state = MessageState, action) => {
  switch (action.type) {
    case 'CLEAR_MESSAGE':
      return { ...state, payload: [] };
    case 'SET_MESSAGE':
      const message =
        state.payload.length > 0 ? [...state.payload, action.payload] : action.payload;
      message.sort((a, b) => a.id - b.id);
      return {
        ...state,
        error: action.error,
        payload: message,
        message: action.message,
        changed: true,
      };
    default:
      return state;
  }
};
