import { BranchState } from '../ComponentState/branch';
import { message } from 'antd';

/**
 * @param state
 * @param action
 */

export const BranchReducer = (state = BranchState, action) => {
  switch (action.type) {
    case 'OPEN_CREATE_BRANCH_MODAL':
      return { ...state, modal: true };
    case 'CLOSE_CREATE_BRANCH_MODAL':
      return { ...state, modal: false };
    case 'OPEN_EDIT_BRANCH_MODAL':
      return { ...state, modal1: true };
    case 'CLOSE_EDIT_BRANCH_MODAL':
      return { ...state, modal1: false };
    case 'CREATE_BRANCH':
      message.success('BRANCH CREATED SUCCESSFULLY');
      return { ...state, error: action.error, modal: false, message: action.message };
    case 'FETCH_BRANCH':
      return {
        ...state,
        error: action.error,
        payload: action.payload.users,
        message: action.message,
        deleted: false,
        edited: false,
      };
    case 'EDIT_BRANCH':
      message.success('BRANCH EDITED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal1: false,
        edited: true,
        message: action.message,
      };
    case 'FILTER_BRANCH':
      return {
        ...state,
        error: action.error,
        payload: action.payload.users,
        message: action.message,
        edited: false,
      };
    case 'DELETE_BRANCH':
      message.success('BRANCH DELETED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
        deleted: true,
      };
    case 'FETCH_ERROR':
      message.error(action.message);
      return { ...state };
    default:
      return state;
  }
};
