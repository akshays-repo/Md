import { CustomFormState } from '../ComponentState/customForm';
import { message } from 'antd';

/**
 * @param state
 * @param action
 */

export const CustomFormReducer = (state = CustomFormState, action) => {
  switch (action.type) {
    case 'CREATE_CUSTOMFORM':
      message.success('CUSTOMFORM CREATED SUCCESSFULLY');
      return { error: action.error, payload: action.payload, message: action.message ,changed: true };
    case 'FETCH_CUSTOMFORM':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'EDIT_CUSTOMFORM':
      message.success('CUSTOMFORM EDITED SUCCESSFULLY');
      return { error: action.error, payload: action.payload, message: action.message, changed: true };
    case 'FILTER_CUSTOMFORM':
      return { error: action.error, payload: action.payload, message: action.message };
    case 'DELETE_CUSTOMFORM':
      return { error: action.error, payload: action.payload, message: action.message };
      case 'OPEN_CUSTOMFORM_CREATE_MODAL':
        return { ...state, modal: true };
      case 'CLOSE_CUSTOMFORM_CREATE_MODAL':
        return { ...state, modal: false };
        case 'OPEN_CUSTOMFORM_EDIT_MODAL':
        return { ...state, modal1: true };
      case 'CLOSE_CUSTOMFORM_EDIT_MODAL':
        return { ...state, modal1: false };
    default:
      return state;
  }
};
