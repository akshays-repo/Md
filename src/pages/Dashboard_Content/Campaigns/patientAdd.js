import React , {useEffect, useState} from 'react';
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
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const PatientAdd = props => {

const [patientList , setPatientList] = useState("");


    useEffect(() => {
console.log("sdsabdb", props)
setPatientList(props.patientList?.rows)
    }, [])


// email: "hospital1@gmail.com"
// firstName: "karrthik"
// gender: "male"
// hospitalId: 43
// id: 64
// image: null
// lastName:

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
      render: (text, record) => (
        <Space size="middle" className="edit-color icon-button">
          <i className="fa fa-trash"></i>
        </Space>
      ),
    },
  ];

  return (
    <div>
        <div>

        {/* <Autocomplete
        {...defaultProps}
        id="auto-select"
        autoSelect
        renderInput={(params) => <TextField {...params} label="autoSelect" margin="normal" />}
      /> */}
            </div>
      <Table
        columns={columns}
        dataSource={patientList} 
      />

      <button className="view-button mt6">Save</button>
    </div>
  );
};

export default PatientAdd;
