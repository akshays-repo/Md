import { SummaryMessageState } from '../ComponentState/summary_message';
import _ from 'lodash';
/**
 * @param state
 * @param action
 */

export const SummaryMesssageReducer = (state = SummaryMessageState, action) => {
  let message;
  switch (action.type) {
    case 'SET_LATEST_MESSAGE_SUMMARY':
        const check = state.payload.filter(
          (result, i) => result.conversationId === action.payload.conversationId,
        ).length;
     if(check===0)
     {
         state.payload=[...state.payload,action.payload]
     }
      console.log('message summary payload', state.payload);
      message = state.payload.map((result, i) => {
        if (result.conversationId === action.payload.conversationId) {
          console.log("wewewewe")
          action.payload.receiverAvatar =result.receiverAvatar
          action.payload.receiverDisplayName =result.receiverDisplayName
          i=i+1;
          return action.payload;
        } else {
          return result;
        }
      });
   
      message.sort((a, b) => b.id - a.id);
      console.log('MEssage summary', message);
      return {
        ...state,
        error: action.error,
        payload: message,
        message: action.message,
        changed: true,
      };
    case 'SET_MESSAGE_SUMMARY':
      message = action.payload;
      message.sort((a, b) => b.id - a.id);

      return {
        ...state,
        error: action.error,
        payload: message,
        message: action.message,
        changed: true,
      };
    case 'SET_LATEST_INCOMING_MESSAGE_SUMMARY':
      console.log('message summary payload', state.payload);

      let checkConversation = state.payload.filter(
        (result, i) => result.conversationId === action.payload.conversationId,
      ).length;

      console.log('Incoming length', checkConversation);
      if (checkConversation > 0) {
        message = state.payload.map((result, i) => {
          if (result.conversationId === action.payload.conversationId) {
            return action.payload;
          } else {
            return result;
          }
        });
      } else {
        state.payload = [...state.payload, action.payload];
        message = state.payload.map((result, i) => {
          if (result.conversationId === action.payload.conversationId) {
            return action.payload;
          } else {
            return result;
          }
        });
      }

      message.sort((a, b) => b.id - a.id);

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
