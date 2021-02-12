import { SummaryMessageState } from '../ComponentState/summary_message';

/**
 * @param state
 * @param action
 */

export const SummaryMesssageReducer = (state = SummaryMessageState, action) => {
  switch (action.type) {
    case 'SET_LATEST_MESSAGE_SUMMARY':
      //   const message = state.payload.find(
      //     (result, i) => result.conversationId === action.payload.conversationId,
      //   );
      console.log('State payload', state.payload);
      const message = state.payload.map((result, i) => {
        if (result.conversationId === action.payload.conversationId) {
          return action.payload;
        } else {
          return result;
        }
      });
      console.log('MEssage summary', message);
      return {
        ...state,
        error: action.error,
        payload: message,
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
