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

const Dashboard_Provider = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    props.fetchProvider({ branchId: 3, page: 1, limit: 20 });
  }, []);

  const HeaderSection = () => {
    const weekDays = [
      { key: 1, day: 'Sunday' },
      { key: 2, day: 'Monday' },
      { key: 3, day: 'Tuesday' },
      { key: 4, day: 'Wednesday' },
      { key: 5, day: 'Thursday' },
      { key: 6, day: 'Friday' },
      { key: 7, day: 'Saturday' },
    ];

    return (
      <div className="provider">
        <div className="header">
          <div>

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

      <Modal title="Basic Modal" footer={false} visible={props.modal}  onCancel={() =>  store.dispatch({ type: 'CLOSE_PROVIDER_CREATE_MODAL' })}>
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
const mapStoreToProps = ({ Provider }) => {
  console.log('Store', Provider);
  return {
    provider: Provider.payload,
    error: Provider.error,
    message: Provider.message,
    modal: Provider.modal,
    modal1: Provider.modal1,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchProvider: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_PROVIDER', param })),
  addProvider: values =>
    dispatch(actionCreator({ method: 'POST', action_type: 'CREATE_PROVIDER', values })),
  editProvider: (id, values) =>
    dispatch(actionCreator({ method: 'PUT', action_type: 'EDIT_PROVIDER',  values })),
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
