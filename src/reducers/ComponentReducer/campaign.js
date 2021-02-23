import { CampaignState } from '../ComponentState/campaign';
import { message } from 'antd';
/**
 * @param state
 * @param action
 */

export const CampaignReducer = (state = CampaignState, action) => {
  switch (action.type) {
    case 'CREATE_CAMPAIGN':
      message.success('CAMPAIGN CREATED SUCCESSFULLY');
      return { error: action.error, message: action.message, modal: false, changed: true };
    case 'FETCH_CAMPAIGN_PATIENTS':
      return {
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: false,
      };
    case 'EDIT_CAMPAIGN':
      return {
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: true,
      };
    case 'FILTER_CAMPAIGN':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'DELETE_CAMPAIGN':
      message.success('BRANCH DELETED SUCCESSFULLY');
      return { error: action.error, message: action.message, changed: true };
    case 'OPEN_CREATE_CAMPAIGN_MODAL':
      return { ...state, modal: true };
    case 'CLOSE_CREATE_CAMPAIGN_MODAL':
      return { ...state, modal: false };
    case 'OPEN_EDIT_CAMPAIGN_MODAL':
      return { ...state, modal1: true };
    case 'CLOSE_EDIT_CAMPAIGN_MODAL':
      return { ...state, modal1: false };
    default:
      return state;
  }
};
