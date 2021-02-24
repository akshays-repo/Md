import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { actionCreator } from '../../../reducers/actionCreator';
import TextField from '@material-ui/core/TextField';

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

import { store } from '../../../reducers/configureStore';
import { connect } from 'react-redux';
import SmsEdit from './smsEdit';
import EmailEdit from './emailEdit';
const { TabPane } = Tabs;

const EditCampaign = props => {
  const [titile, setTitle] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [emailStatus, setemailStatus] = useState('');
  const [patientList, setPatientList] = useState([]);

  const [smsStatus, setSmsStatus] = useState('');
  const [smsContent, setSmsContent] = useState('');

  const { id } = useParams();
  useEffect(() => {
    fetchById();
  }, []);

  // clicked: null
  // createdAt: "2021-02-24T12:34:33.000Z"
  // email_status: null
  // email_sub: null
  // email_template: null
  // hospitalId: 43
  // id: 12
  // name: "cam 7"
  // open_rate: 0
  // recipients: 0
  // sms_status: null
  // sms_template: null
  // status: "sent"
  // total_sent: 0
  // updatedAt: "2021-02-24T12:34:33.000Z"
  // users

  const fetchById = async () => {
    let response = await props.fetchCampaignbyId(id);

    console.log('repso', response);
    setTitle(response.payload.name);
    setEmailSubject(response.payload.email_sub);
    setEmailContent(response.payload.email_template);
    setemailStatus(response.payload.email_status);
    setSmsStatus(response.payload.sms_status);
    setSmsContent(response.payload.sms_template);
  };

  const [currentTab, setCurrentTab] = useState('1');
  const callback = key => {
    setCurrentTab(key);
  };

  const handleEmailEdit = e => {};

  const handleSmsEdit = e => {};

  return (
    <div className="">
      <div style={{ paddingTop: '97px' }}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col xs={10} xl={10}>
            <TextField
              required
              label="Title"
              margin="normal"
              // onChange={e => setCampaignTitle(e.target.value)}
            />
          </Col>

          <Col xs={10} xl={10}>
            number of patients
          </Col>
          <Col xs={2} xl={2}>
            Save
          </Col>
        </Row>

        <div></div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="EMAIL" key="1" />
          <TabPane tab="SMS" key="2" />
        </Tabs>
        {currentTab === '1' ? (
          <EmailEdit handleEmailEdit={handleEmailEdit} />
        ) : (
          <SmsEdit handleSmsEdit={handleSmsEdit} />
        )}
      </div>
    </div>
  );
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

  fetchCampaignbyId: id =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_CAMPAIGN_ID', id })),

  editUser: (param, values) =>
    dispatch(actionCreator({ method: 'POST', action_type: 'EDIT_USER', param, values })),
});

export default connect(mapStoreToProps, mapDispatchToProps)(EditCampaign);
