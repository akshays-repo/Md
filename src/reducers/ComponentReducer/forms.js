import { FormsState } from '../ComponentState/forms';
import { message } from 'antd';
/**
 * @param state
 * @param action
 */

export const FormsReducer = (state = FormsState, action) => {
  switch (action.type) {
    case 'CREATE_FORM':
        message.success('FORM CREATED SUCCESSFULLY');
      return { error: action.error, message: action.message ,modal:false , changed:true};
    case 'FETCH_FORM':
      return { error: action.error, payload: action.payload.rows, message: action.message , changed:false};
    case 'EDIT_FORM':
      return { error: action.error, payload: action.payload, message: action.message, changed:true };
   
    case 'FILTER_FORM':
      return { error: action.error, payload: action.payload, message: action.message , };
    case 'DELETE_FORM':
        message.success('FORM DELETED SUCCESSFULLY');
      return { error: action.error, message: action.message ,changed:true };
      case 'OPEN_CREATE_FORM_MODAL':
        return { ...state, modal: true };
      case 'CLOSE_CREATE_FORM_MODAL':
        return { ...state, modal: false };
      case 'OPEN_EDIT_FORM_MODAL':
        return { ...state, modal1: true };
      case 'CLOSE_EDIT_FORM_MODAL':
        return { ...state, modal1: false };
        case 'OPEN_EDIT1_FORM_MODAL':
            return { ...state, modal2: true };
          case 'CLOSE_EDIT1_FORM_MODAL':
            return { ...state, modal2: false };
            case 'FETCH_FORM_FOR_FILLING':
              return { ...state, formToFill: action.payload };
              default:
      return state;
  }
};
