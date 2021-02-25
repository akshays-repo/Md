import React from 'react';
import { getFormDataA } from '_utils';
import {
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
import { Formik, Form, Field } from 'formik';
import { generateForm } from '../../../_utils/formgenerator';
import { TextField, Select as MatSelect } from 'formik-material-ui';
import { hospitalUser ,hospitaEditlUser } from '_utils/Schemas';

const UserCreationForm = props => {
  const formField = [
    // {
    //   label: 'Full Name',
    //   name: 'fullName',
    //   type: 'text',
    // },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
    },
    {
      label: 'Phone no.',
      name: 'phone',
      type: 'text',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
    },
    {
      label: 'Confirm Password',
      name: 'c_password',
      type: 'password',
    },
    {
      label: 'Status',
      name: 'status',
      type: 'select',
      options: [
        { value: 'active', name: 'Active' },
        { value: 'hold', name: 'Hold' },
      ],
    },
  ];

  const handleFormSubmission = async(values) => {
    let data = await getFormDataA({ ...values});
    if(props.editId){
     const {userTypeId , isAdmin , ...rest} = values
     let editData = await getFormDataA({...rest})
        props.editUser({id:props.editId}, editData)
    }else{
        props.addUser(data)

    }


  };

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={
          props.editData || {
            // fullName:'',
            email: '',
            status: 'active',
            phone: '',
            password: '',
            c_password: '',
          }
        }
        validationSchema={props.editId ? hospitaEditlUser : hospitalUser}
        onSubmit={handleFormSubmission}
      >
        {({ handleSubmit, touched, errors, isSubmitting }) => (
          <Form className="login__form" handleSubmit={handleSubmit}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>{generateForm(formField)}</Row>
            <Button
              htmlType="submit"
              disabled={isSubmitting}
              className="view-button button-square mt-5"
            >
              {props.editId ? ' Edit a User' : ' Create a New User'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default UserCreationForm;
