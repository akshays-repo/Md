import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { actionCreator } from '../../../reducers/actionCreator';
import TextField from '@material-ui/core/TextField';
import Dashboard_Content from '..';
import Switch from '@material-ui/core/Switch';

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
  message,
} from 'antd';

import { store } from '../../../reducers/configureStore';
import { connect } from 'react-redux';
import SmsEdit from './smsEdit';
import EmailEdit from './emailEdit';
import Title from 'antd/lib/skeleton/Title';
import PatientAdd from './patientAdd';
const { TabPane } = Tabs;

const EditCampaign = props => {
  const [titile, setTitle] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [emailStatus, setemailStatus] = useState();
  const [patientList, setPatientList] = useState([]);
  const [apiResponse, setApiResponse] = useState([]);
  const [smsStatus, setSmsStatus] = useState();
  const [smsContent, setSmsContent] = useState('');
  const [currentTab, setCurrentTab] = useState('1');

  const [patientModal, setPatientModal] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    fetchById();
    props.fetchPatient();
  }, []);
  let response;
  const fetchById = async () => {
    response = await props.fetchCampaignbyId(id);
    setApiResponse(response);
    setTitle(response.payload.name);
    setEmailSubject(response.payload.email_sub);
    setEmailContent(response.payload.email_template);
    setemailStatus(response.payload.email_status);
    setSmsStatus(response.payload.sms_status);
    setSmsContent(response.payload.sms_template);
    setPatientList(response.payload.users);
  };

  const callback = key => {
    setCurrentTab(key);
  };

  const handleEmailEdit = e => {
    console.log('email', e);
    setEmailContent(e);
  };

  const handleEmailEditSubject = e => {
    console.log('email subject', e);
    setEmailSubject(e);
  };

  const handlEmailStatus = e => {
    console.log('email status', e.target.checked, emailStatus);
    if (e.target.checked === true) {
      setemailStatus('active');
      console.log('email status', e.target.checked, emailStatus);
    } else {
      setemailStatus('hold');
      console.log('email status', e.target.checked, emailStatus);
    }
  };
  const handleSmsEdit = e => {
    console.log('sms content', e);
    setSmsContent(e);
  };
  const handleSmsEditStatus = e => {
    console.log('sms status', e);
    if (e.target.checked === true) {
      setSmsStatus('active');
      console.log('sms status', e.target.checked, smsStatus);
    } else {
      setSmsStatus('hold');
      console.log('sms status', e.target.checked, smsStatus);
    }
  };

  const handleEditTitle = e => {
    console.log('email edit', e);
    setTitle(e);
  };

  const openPatientModal = () => {
    setPatientModal(true);
  };
  const closePatientModal = () => {
    setPatientModal(false);
  };
  const handlepatientList = e => {
    setPatientList(e);
  };
  const handleSaveEdit = async () => {
    let sendingData = {
      name: titile,
      users: patientList,
      sms_status: smsStatus,
      email_status: emailStatus,
    };
    if (emailStatus === 'active') {
      sendingData = { ...sendingData, email_template: emailContent, email_sub: emailSubject };
    }
    if (smsStatus === 'active') {
      sendingData = { ...sendingData, sms_template: smsContent };
    }
    let response = await props.editCamapign(id, JSON.stringify(sendingData));
    console.log('resoonse', response);
    if (response.error === '') {
      message.success('Campaign Saved');
      window.location.href = `/campaigns`;
    }
  };

  const editSection = () => {
    return (
      <div className="whiteBox campaignWrapper">
        <div className="headerTop">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} xl={10}>
              <TextField
                required
                label="Title"
                margin="normal"
                value={titile}
                onChange={e => handleEditTitle(e.target.value)}
              />
            </Col>

            <Col xs={12} xl={10}>
              <div>
                <button className="edit-button mt2" onClick={() => openPatientModal()}>
                  <i class="fas fa-users pr2 " />
                  Patients
                </button>
              </div>
            </Col>
            <Col xs={7} xl={4} className="rightPosition">
              <button
                className="view-button mt2"
                onClick={() => {
                  handleSaveEdit();
                }}
              >
                Save
              </button>
            </Col>
          </Row>
        </div>
        <div className="tabSection pb8">
          <Tabs defaultActiveKey="1" onChange={callback} className="tabBox">
            <TabPane tab="EMAIL" key="1" />
            <TabPane tab="SMS" key="2" />
          </Tabs>
        </div>
        {currentTab === '1' ? (
          <div>
            {/* <Switch
                  defaultChecked={apiResponse.payload?.email_status === 'hold' ? false :true}
                  onChange={e => handlEmailStatus(e)}
                /> */}
            <Switch
              checked={emailStatus === 'hold' ? false : true}
              onChange={handlEmailStatus}
              color="primary"
              name="checkedB"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <div className={emailStatus === "hold" ? "overlay" : ""}>
            <EmailEdit
              handleEmailEdit={handleEmailEdit}
              handleEmailEditSubject={handleEmailEditSubject}
              emailContent={emailContent}
              emailSubject={emailSubject}
              emailStatus={emailStatus === 'active' ? true : false}
              handlEmailStatus={handlEmailStatus}
            />
            </div>

          </div>
        ) : (
          <div>
            <Switch
              checked={smsStatus === 'hold' ? false : true}
              onChange={handleSmsEditStatus}
              color="primary"
              name="checkedB"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <div className={smsStatus === "hold" ? "overlay" : ""}>
            <SmsEdit
              handleSmsEdit={handleSmsEdit}
              smsContent={smsContent}
              smsStatus={smsStatus}
              handleSmsEditStatus={handleSmsEditStatus}
            />
  </div>
     
          </div>
        )}

        <Modal
          title="EDIT PATIENT LIST"
          onCancel={closePatientModal}
          visible={patientModal}
          footer={false}
          width={800}
        >
          <PatientAdd
            handlePatientEditClose={closePatientModal}
            handlePatientEditOpen={openPatientModal}
            patientList={patientList}
            editing={true}
            handlepatientList={handlepatientList}
            {...props}
          />
        </Modal>
      </div>
    );
  };
  return <Dashboard_Content content={editSection()} />;
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

  editCamapign: (id, values) =>
    dispatch(
      actionCreator({
        method: 'PUT',
        action_type: 'EDIT_CAMPAIGN',
        id,
        values,
        contentType: 'JSON',
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(EditCampaign);
