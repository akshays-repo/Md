import React, { useState, useReducer, useEffect } from 'react';
import { Col, Row, Form, Input, Button, Modal, Select, Space } from 'antd';
import Dashboard_Content from '..';
import { connect } from 'react-redux';
import AppointmentTypes from './appointmentType';
import ProviderCreationForm from './providerCreationForm';
import ProviderTable from './providerTable';
import { actionCreator } from '../../../reducers/actionCreator';
import { store } from '../../../reducers/configureStore';
import CustomFormField from './customFormField';
import ProviderType from './providerType';
const Dashboard_Provider = props => {
  useEffect(() => {
    props.fetchProvider();
    props.fetchBranch({ hospitalId: localStorage.getItem('hospital_id'), page: 1, limit: 60 });
    console.log('prooo', props);
  }, [props.changed]);

  useEffect(() => {
    props.fetchCustomForm(parseInt(localStorage.getItem('hospital_id')));
  }, []);

  useEffect(() => {
    props.fetchBranch({ hospitalId: localStorage.getItem('hospital_id'), page: 1, limit: 50 });
    props.fetchAppointmentType({ branchId: 3 });
  });

  const HeaderSection = () => {
    return (
      <div className="provider">
        <div className="header mb10">
          <div className="provider-head mr2">
            <Button
              type="primary"
              onClick={() => store.dispatch({ type: 'OPEN_CUSTOMFORM_CREATE_MODAL' })}
              className="button-square"
            >
              Custom Form
            </Button>
          </div>
          <div className="provider-head mr2">
            <Button
              type="primary"
              onClick={() => store.dispatch({ type: 'OPEN_APPOINTMENT_TYPE_MODAL2' })}
              className="button-square"
            >
              Appointment types
            </Button>
          </div>
          <div className="provider-head mr2">
            <Button
              type="primary"
              onClick={() => store.dispatch({ type: 'OPEN_PROVIDERTYPE_MODAL' })}
              className="button-square"
            >
              Provider types
            </Button>
          </div>

          <div className="provider-head">
            <Button
              type="primary"
              onClick={() => store.dispatch({ type: 'OPEN_PROVIDER_CREATE_MODAL' })}
              className="button-square"
            >
              Create a New Provider
            </Button>
          </div>
        </div>

        {/* <div>
              <Space direction="horizontal">
                {weekDays.map(item => (
                  <button key={item.key}>{item.day}</button>
                ))}
              </Space>
            </div> */}
      </div>
    );
  };
  const Provider_Content = () => {
    return (
      <div className="schedule-time">
        <Modal
          title="CUSTOM FORM FIELD"
          footer={false}
          visible={props.CustomFormmodal}
          onCancel={() => store.dispatch({ type: 'CLOSE_CUSTOMFORM_CREATE_MODAL' })}
          destroyOnClose
        >
          <CustomFormField {...props} />
        </Modal>

        <Modal
          title=""
          footer={false}
          visible={props.AppointmentTypeModal2}
          onCancel={() => store.dispatch({ type: 'CLOSE_APPOINTMENT_TYPE_MODAL2' })}
        >
          <AppointmentTypes />
        </Modal>

        <Modal
          title="PROVIDER"
          footer={false}
          visible={props.modal}
          onCancel={() => store.dispatch({ type: 'CLOSE_PROVIDER_CREATE_MODAL' })}
          destroyOnClose
        >
          <ProviderCreationForm {...props} />
        </Modal>

        <Modal
          title=""
          footer={false}
          visible={props.ProviderTypemodal}
          onCancel={() => store.dispatch({ type: 'CLOSE_PROVIDERTYPE_MODAL' })}
          destroyOnClose
        >
          <ProviderType {...props} />
        </Modal>

        <div>{HeaderSection()}</div>
        <div className="full-width-table">
          <ProviderTable {...props} />
        </div>
      </div>
    );
  };
  return (
    <div>
      <Dashboard_Content content={Provider_Content()} />
    </div>
  );
};
const mapStoreToProps = ({ Provider, CustomForm, AppointmentType, ProviderType }) => {
  console.log('Store', Provider);
  console.log('Store CustomForm', CustomForm);
  return {
    provider: Provider.payload,
    error: Provider.error,
    message: Provider.message,
    modal: Provider.modal,
    modal1: Provider.modal1,
    changed: Provider.changed,

    CustomForm: CustomForm.payload,
    CustomFormerror: CustomForm.error,
    CustomFormmessage: CustomForm.message,
    CustomFormmodal: CustomForm.modal,
    CustomFormmodal1: CustomForm.modal1,
    CustomFormchanged: CustomForm.changed,

    AppointmentTypeModal2: AppointmentType.modal2,

    ProviderTypemodal: ProviderType.modal,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchBranch: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_BRANCH', param })),
  fetchCustomForm: id =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_CUSTOMFORM', id })),
  addCustomForm: (values, contentType) =>
    dispatch(
      actionCreator({ method: 'POST', action_type: 'CREATE_CUSTOMFORM', values, contentType }),
    ),

  fetchProvider: id =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_PROVIDER_HOSPITAL', id })),
  addProvider: values =>
    dispatch(actionCreator({ method: 'POST', action_type: 'CREATE_PROVIDER', values })),
  editProvider: (id, values) =>
    dispatch(actionCreator({ method: 'PUT', action_type: 'EDIT_PROVIDER', id, values })),
  deleteProvider: id =>
    dispatch(actionCreator({ method: 'DELETE', action_type: 'DELETE_PROVIDER', id })),
  filterProvider: param =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'FILTER_PROVIDER',
        param,
      }),
    ),

  fetchAppointmentType: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_APPOINTMENT_TYPE', param })),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard_Provider);
