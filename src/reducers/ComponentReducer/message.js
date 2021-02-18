import { MessageState } from '../ComponentState/message';

/**
 * @param state
 * @param action
 */

export const MesssageReducer = (state = MessageState, action) => {
  let checkConversationID;
  switch (action.type) {
    case 'CLEAR_MESSAGE':
      return { ...state, payload: [] };

      case 'INITIAL_MESSAGE_LOADED':
        return { ...state, initalLoading: false };
      case 'GOTO_DETAIL_PAGE':
        return {...state , mobileListScreen : false};
        case 'GOTO_LIST_PAGE':
          return {...state , mobileListScreen : true};
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
    case 'SET_INCOMING_MESSAGE':
      checkConversationID = state.payload.filter(
        result => result.conversationId === action.payload.conversationId,
      ).length;
      if (checkConversationID > 0) {
        let message =
          state.payload.length > 0 ? [...state.payload, action.payload] : action.payload;
        message.sort((a, b) => a.id - b.id);
        return {
          ...state,
          error: action.error,
          payload: message,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
