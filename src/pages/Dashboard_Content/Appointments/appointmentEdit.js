import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { ProviderCreationSchema } from '_utils/Schemas';
import { Button, Row, Select, Col, DatePicker } from 'antd';
import { Select as matSeclect } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import { generateForm } from '../../../_utils/formgenerator';
import { getFormDataA } from '_utils';
import { store } from '../../../reducers/configureStore';

const { Option } = Select;

const AppointmentEdit = props => {
  useEffect(() => {
    console.log('jcxcxkcxcj', props.view);
  });

  const handleFormSubmission = async (values) => {

    console.log("asdkjhf",values)
  };

  const formField = [
    {
      label: 'Firstname',
      name: 'firstName',
      type: 'text',
    },
    {
      label: 'Lastname',
      name: 'lastName',
      type: 'text',
    },

    {
      label: 'Email',
      name: 'email',
      type: 'text',
    },
    {
      label: 'Address',
      name: 'address',
      type: 'text',
    },
    {
      label: 'Zipcode',
      name: 'zipcode',
      type: 'text',
    },
    {
      label: 'Date of Birth',
      name: 'dob',
      type: 'datepicker',
    },
    {
      label: 'Gender',
      name: 'gender',
      type: 'select',
      options: [
        { value: 'male', name: 'Male' },
        { value: 'female', name: 'Female' },
        { value: 'other', name: 'Other' },
      ],
    },
  ];

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={
          props.values || {
            appointment_end: '',
            appointment_for: '',
            appointment_start: '',
            charge: '',
            comment: '',
            payment_status: '',
            status: '',
          }
        }
        //validationSchema={ProviderCreationSchema}
        onSubmit={handleFormSubmission}
      >
        {({ handleSubmit, touched, errors, isSubmitting }) => (
          <Form className="login__form" handleSubmit={handleSubmit}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <DatePicker
                showTime
                //onChange={onChange}
                //onOk={onOk}
                name="appointment_start"
                placeholder="Start Date"
              />
              <DatePicker
                showTime
                //onChange={onChange}
                //onOk={onOk}
                name="appointment_end"
                placeholder="End Date"
              />
            </Row>

            <Button
              htmlType="submit"
              disabled={isSubmitting}
              className="view-button button-square mt-5"
            >
              {' Edit a Appointment'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>

    // <div> <span style={{color:"red"}}> Sorry! </span> Currently, this feature is not available</div>
  );
};

export default AppointmentEdit;
