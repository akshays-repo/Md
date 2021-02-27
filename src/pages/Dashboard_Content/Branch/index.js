import React, { useState, useEffect, useReducer } from 'react';
import Dashboard_Content from '..';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BranchCreationForm from './branchCreation';
import BranchListTable from './branchListTable';
import { actionCreator } from '../../../reducers/actionCreator';
import { store } from '../../../reducers/configureStore';
const Dashboard_Branch = props => {
  useEffect(() => {
    props.fetchBranch({ hospitalId: localStorage.getItem('hospital_id'), page: 1, limit: 50 });
  }, [props.changed]);

  const Branch = () => {
    return (
      <div>
            <div className="pageTitle">
          <h4>BRANCHES</h4>
        </div>
        <div className="header textRight">
          <button
            type="primary" className="view-button button-square"
            onClick={() => store.dispatch({ type: 'OPEN_CREATE_BRANCH_MODAL' })}
          >
Create Branch          </button>
          <Modal
            title="Create A Branch"
            visible={props.modal}
            onCancel={() => store.dispatch({ type: 'CLOSE_CREATE_BRANCH_MODAL' })}
            width={600}
            footer={null}
            destroyOnClose
          >
            <BranchCreationForm {...props} />
          </Modal>
        </div>
        <div className="table-content">
          <BranchListTable data={props.branch} {...props} />
        </div>
      </div>
    );
  };
  return <Dashboard_Content content={Branch()} />;
};

const mapStoreToProps = ({ Branch }) => {
  console.log('Store', Branch);
  return {
    branch: Branch.payload,
    error: Branch.error,
    message: Branch.message,
    modal: Branch.modal,
    modal1: Branch.modal1,
    changed: Branch.changed,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchBranch: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_BRANCH', param })),
  addBranch: values =>
    dispatch(actionCreator({ method: 'POST', action_type: 'CREATE_BRANCH', values })),
  editBranch: (id, values ,param) =>
    dispatch(actionCreator({ method: 'PUT', action_type: 'EDIT_BRANCH', id, values , param})),
  deleteBranch: id =>
    dispatch(actionCreator({ method: 'DELETE', action_type: 'DELETE_BRANCH', id })),
  filterBranch: param =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'FILTER_BRANCH',
        param,
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard_Branch);
