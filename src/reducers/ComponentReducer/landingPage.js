import { LandingPageState } from '../ComponentState/landingPage';
import { message } from 'antd';
/**
 * @param state
 * @param action
 */

export const LandingPageReducer = (state = LandingPageState, action) => {
  switch (action.type) {
    case 'CREATE_LANDING_PAGE':
        message.success('LANDING_PAGE CREATED SUCCESSFULLY');
      return { error: action.error, message: action.message ,modal:false , changed:true};
    case 'LANDING_PAGE_PACKAGES':
      return { error: action.error, packages: action.payload, message: action.message , changed:false};
    case 'EDIT_LANDING_PAGE':
      return { error: action.error, payload: action.payload, message: action.message, changed:true };
    case 'FILTER_LANDING_PAGE':
      return { error: action.error, payload: action.payload, message: action.message , };
    case 'DELETE_LANDING_PAGE':
        message.success('BRANCH DELETED SUCCESSFULLY');
      return { error: action.error, message: action.message ,changed:true };
    default:
      return state;
  }
};
