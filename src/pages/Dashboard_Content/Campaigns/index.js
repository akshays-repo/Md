import React from 'react';
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

const { TabPane } = Tabs;

const Dashboard_Campaigns = (props) => {
  function callback(key) {
    console.log(key);
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Total Sent',
      dataIndex: 'totalsent',
      key: 'totalsent',
    },
    {
      title: 'Booking Date',
      dataIndex: 'bookingdate',
      key: 'bookingdate',
    },
    {
      title: 'Recipents',
      dataIndex: 'recipents',
      key: 'recipents',
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
      render: (text, record) => (
        <Space size="middle" className="edit-color icon-button">
          <i className="fa fa-edit"></i>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  const Campaigns = () => {
    return (
      <div className="mb5">
        <button className="view-button button-square" type="primary"
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
          <Table columns={columns} dataSource={data} />
        </div>


      <Modal
        title="CREATE A NEW  CAMPAIGN"
        onCancel={() => store.dispatch({ type: 'CLOSE_CREATE_CAMPAIGN_MODAL' })}
        visible={props.modal}
        footer={false}
        width={800}
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
    changed:Campaign.changed
  };
};
const mapDispatchToProps = dispatch => ({
  fetchPatients: (param) => dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_CAMPAIGN_PATIENTS'  , param})),
  addUser: values =>
    dispatch(actionCreator({ method: 'POST', action_type: 'CREATE_USER', values })),
  editUser: (param, values) =>
    dispatch(actionCreator({ method: 'POST', action_type: 'EDIT_USER', param, values, })),
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


