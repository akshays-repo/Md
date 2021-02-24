import React, { useEffect, useState } from 'react';

import {
  Tabs,
  Space,
  Select,
  Row,
  Col,
  Table,
  Tag,
  DatePicker,
  Result,
  Input,
  Modal,
  Popconfirm,
  Button,
  message,
} from 'antd';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { store } from '../../../reducers/configureStore';

const PatientAdd = props => {
  const [patientList, setPatientList] = useState([]);
  const [hospitalPatientList, setHospitalPatientList] = useState([]);
 const [campaignTitle , setCampaignTitle] = useState("")
  useEffect(() => {
    setPatientList(props.patientList?.rows);
    setHospitalPatientList(store.getState().Patient.payload);
  }, []);

  const deletePatientFromTable = record => {
    setPatientList(patientList.filter(patient => patient.id !== record.id));
  };

  const defaultProps = {
    options: hospitalPatientList,
    getOptionLabel: option => option.firstName,
  };

  const handleSave = async () => {

    let sendingData = {
        name:campaignTitle,
        users:patientList
    }
if(campaignTitle === ''){
    Modal.warning({
        content: <Result status="warning" title="Please Enter the Campaign Title" />,
      })}
      else{
console.log("sss")
      }


  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '',
      key: 'action',
      render: record => (
        <Space size="middle" className="edit-color icon-button">
          <span onClick={() => deletePatientFromTable(record)}>
            <i className="fa fa-trash"></i>
          </span>
        </Space>
      ),
    },
  ];
  const onChangePatientAuto = value => {
    if (patientList.some(patient => patient.id === value.id)) {
      message.info('patient already exists');
    } else {
      setPatientList([...patientList, value]);
      message.success('patient added');
    }

    console.log('aahbfdf', value);
  };

  return (
    <div>
      <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col xs={24} xl={12}>
            <TextField required label="Title" margin="normal"  onChange={(e)=> setCampaignTitle(e.target.value)}/>
          </Col>
          <Col xs={24} xl={12}>
            <Autocomplete
              {...defaultProps}
              id="auto-select"
              onChange={(event, newValue) => {
                onChangePatientAuto(newValue);
              }}
              autoSelect
              renderInput={params => <TextField {...params} label="Add Patients" margin="normal" />}
            />
          </Col>
        </Row>
      </div>
      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <Table
          pagination={{
            total: patientList.length,
            pageSize: patientList.length,
            hideOnSinglePage: true,
          }}
          size="small"
          columns={columns}
          dataSource={patientList}
          scroll={{ y: '100vw' }}
        />
      </div>

      <button onClick={handleSave} className="view-button mt6">
        Save
      </button>
    </div>
  );
};

export default PatientAdd;
