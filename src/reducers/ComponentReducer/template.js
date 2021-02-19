import { TemplateState } from '../ComponentState/template';
import { message } from 'antd';
/**
 * @param state
 * @param action
 */

export const TemplateReducer = (state = TemplateState, action) => {
  switch (action.type) {
    case 'CREATE_TEMPLATE':
        message.success('TEMPLATE CREATED SUCCESSFULLY');
      return { error: action.error, message: action.message ,modal:false , changed:true};
    case 'FETCH_TEMPLATE':
      return { error: action.error, payload: action.payload, message: action.message , changed:false};
      case 'FETCH_HOSPITAL_ACTION':
        return { error: action.error, templateActions: action.payload, message: action.message , changed:false};
    case 'EDIT_TEMPLATE':
      message.success('TEMPLATE EDITED SUCCESSFULLY');
      return { error: action.error, templateActions: action.payload, message: action.message, changed:true };
    case 'FILTER_TEMPLATE':
      return { error: action.error, payload: action.payload, message: action.message , };
    case 'DELETE_TEMPLATE':
        message.success('BRANCH DELETED SUCCESSFULLY');
      return { error: action.error, message: action.message ,changed:true };
      case 'OPEN_CREATE_TEMPLATE_MODAL':
        return { ...state, modal: true };
      case 'CLOSE_CREATE_TEMPLATE_MODAL':
        return { ...state, modal: false };
      case 'OPEN_EDIT_TEMPLATE_MODAL':
        return { ...state, modal1: true };
      case 'CLOSE_EDIT_TEMPLATE_MODAL':
        return { ...state, modal1: false };
    default:
      return state;
  }
};
