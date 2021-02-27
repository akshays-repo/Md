import React, { useEffect } from 'react';
import Dashboard_Content from '..';
import { actionCreator } from '../../../reducers/actionCreator';
import { store } from '../../../reducers/configureStore';
import { connect } from 'react-redux';
import FilterSection from './filterSection';
import {
  Tabs,
  Space,
  Select,
  Row,
  Col,
  Table,
  Tag,
  DatePicker,
  Input,
  Modal,
  Popconfirm,
  Button,
} from 'antd';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;

const Dashboard_Campaigns = props => {
  function callback(key) {
    console.log(key);
  }
  useEffect(() => {
    props.fetchProvider();
    props.fetchPatient({ page: 1, limit: 10000 });
  }, []);

  useEffect(() => {
    props.fetchCampaigns();
  }, [props.changed]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Total Sent',
      dataIndex: 'total_sent',
      key: 'total_sent',
    },
    {
      title: 'Recipents',
      dataIndex: 'recipients',
      key: 'recipients',
    },
    {
      title: 'Open rate',
      dataIndex: 'openrate',
      key: 'openrate',
    },
    {
      title: 'status',
      key: 'status',
      dataIndex: 'status',
      render: status => (
        <Tag color={status == 'confirm' ? 'green' : 'red'} key={status}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Last updated',
      dataIndex: 'lastupdated',
      key: 'lastupdated',
    },
    {
      title: '',
      key: 'action',
      render: (record) => (
        <Space size="middle" className="edit-color icon-button">
          <i onClick={() =>  window.location.href = `/campaign/${record.id}`} className="fa fa-edit"></i>
       
        </Space>
      ),
    },
  ];



  const Campaigns = () => {
    return (
      <div className="mb5">
                    <div className="pageTitle">
          <h4>CAMPAIGNS</h4>
        </div>
        <button
          className="view-button button-square"
          type="primary"
          onClick={() => store.dispatch({ type: 'OPEN_CREATE_CAMPAIGN_MODAL' })}
        >
          NEW CAMPAIGN
        </button>

        <div>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="All" key="1" />
            <TabPane tab="Sent" key="2" />
            <TabPane tab="Sheduled" key="3" />
            <TabPane tab="Draft" key="4" />
            <TabPane tab="Archived" key="5" />
            <TabPane tab="Reuse" key="6" />
          </Tabs>
        </div>

        <div>


          <Table
            columns={columns}
            dataSource={props.payload}
          />
        </div>

        <Modal
          title="CREATE A NEW  CAMPAIGN"
          onCancel={() => store.dispatch({ type: 'CLOSE_CREATE_CAMPAIGN_MODAL' })}
          visible={props.modal}
          footer={false}
          width={930}
        >
          <FilterSection {...props} />
        </Modal>
      </div>
    );
  };
  return <Dashboard_Content content={Campaigns()} />;
};

const mapStoreToProps = ({ Campaign }) => {
  console.log('state', Campaign);
  return {
    payload: Campaign.payload,
    error: Campaign.error,
    message: Campaign.message,
    modal: Campaign.modal,
    modal1: Campaign.modal1,
    changed: Campaign.changed,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchProvider: () => dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_PROVIDER' })),

  fetchCampaigns: () => dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_CAMPAIGN' })),

  fetchPatients: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_CAMPAIGN_PATIENTS', param })),

  fetchPatient: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_PATIENT', param })),

  createCampaign: values =>
    dispatch(
      actionCreator({
        method: 'POST',
        action_type: 'CREATE_CAMPAIGN',
        values,
        contentType: 'JSON',
      }),
    ),

  editUser: (param, values) =>
    dispatch(actionCreator({ method: 'POST', action_type: 'EDIT_USER', param, values })),
  deleteUser: id => dispatch(actionCreator({ method: 'DELETE', action_type: 'DELETE_USER', id })),
  filterUser: param =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'FILTER_APPOINTMENT',
        param,
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard_Campaigns);
