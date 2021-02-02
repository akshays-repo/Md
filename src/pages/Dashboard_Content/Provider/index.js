import React, { useState , useReducer , useEffect } from 'react';
import { Col, Row, Form, Input, Button, Modal, Select, Space } from 'antd';
import Dashboard_Content from '..';
import { connect } from 'react-redux';
import FossilBreadCrumb from 'fossilmdComponents/FossilBreadCrumb';
import AppointmentTypes from './appointmentType';
import ProviderCreationForm from './providerCreationForm';
import ProviderTable from './providerTable';
import { actionCreator } from '../../../reducers/actionCreator';
import { store } from '../../../reducers/configureStore';
import CreateProviderType from './createProviderType';
import CustomFormField from './cutomFormField';


const Dashboard_Provider = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    props.fetchProvider({ branchId: 3, page: 1, limit: 60 });
    props.fetchBranch({ branchId: 3, page: 1, limit: 60 });
    console.log("prooo", props)
  }, [props.changed]);


  useEffect(() => {
    props.fetchCustomForm(parseInt(localStorage.getItem('hospital_id')));
  }, []);


  useEffect(() => {
       props.fetchBranch({ hospitalId: localStorage.getItem('hospital_id'), page: 1, limit: 50 });
  }, );


  const HeaderSection = () => {
    return (
      <div className="provider">
        <div className="header">
          <div>
          <Button type="primary" onClick={() => store.dispatch({ type: 'OPEN_CUSTOMFORM_CREATE_MODAL' })} className="button-square">
            Custom Form 
            </ Button>
          </div>

          <div>
            <Button type="primary" onClick={() => store.dispatch({ type: 'OPEN_PROVIDER_CREATE_MODAL' })} className="button-square">
              Create a New Provider
            </ Button>
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
  return (
    <div className="schedule-time">
      <Modal title="" 
      footer={false} 
      height="800" 
      visible={props.CustomFormmodal}  
      onCancel={() =>  store.dispatch({ type: 'CLOSE_CUSTOMFORM_CREATE_MODAL' })}
      destroyOnClose>
        <CustomFormField {...props}/>
      </Modal>

      <Modal title="" footer={false} visible={props.modal}  onCancel={() =>  store.dispatch({ type: 'CLOSE_PROVIDER_CREATE_MODAL' })}>
        <ProviderCreationForm {...props}/>
      </Modal>

      <FossilBreadCrumb currentUrl="/provider" currentPageName="Provider" />
      
      <Row>
        <Col xs={24} xl={8}>
          <div className="left-side">
            <AppointmentTypes  />
          </div>
        </Col>

        <Col xs={24} xl={15}>
          <div className="right-side">
            <div>{HeaderSection()}</div>
            <div>
              <ProviderTable  {...props} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
const mapStoreToProps = ({ Provider , CustomForm }) => {
  console.log('Store', Provider);
  console.log('Store CustomForm', CustomForm);
  return {
    provider: Provider.payload,
    error: Provider.error,
    message: Provider.message,
    modal: Provider.modal,
    modal1: Provider.modal1,
    changed:Provider.changed,

    CustomForm: CustomForm.payload,
    CustomFormerror: CustomForm.error,
    CustomFormmessage: CustomForm.message,
    CustomFormmodal: CustomForm.modal,
    CustomFormmodal1: CustomForm.modal1,
    CustomFormchanged:CustomForm.changed,
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

  fetchProvider: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_PROVIDER', param })),
  addProvider: values =>
    dispatch(actionCreator({ method: 'POST', action_type: 'CREATE_PROVIDER', values })),
  editProvider: (id , values) =>
    dispatch(actionCreator({ method: 'PUT', action_type: 'EDIT_PROVIDER',  id, values })),
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

    
});

export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard_Provider);
