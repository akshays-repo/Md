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
      type: 'text',
    },
    {
      label: 'Confirm Password',
      name: 'c_password',
      type: 'text',
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
    console.log("ssahdhkzchbcxzBM<",props.editId )
    if(props.editId){
        props.editUser(props.editId, data)
    }else{
        props.addUser(data)

    }


  };

  console.log(" props.editData ", props.editData )
  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={
          props.editData || {
            email: '',
            status: 'active',
            provider_typeId: '',
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
