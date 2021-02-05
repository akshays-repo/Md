import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { PatientCreationSchema } from '_utils/Schemas';
import { TextField } from 'formik-material-ui';
import { useParams } from 'react-router';
import { message, Button, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from '../../reducers/actionCreator';
import { PoweroffOutlined } from '@ant-design/icons';
import { generateForm } from '_utils/formgenerator';
import { set } from 'store';
const OnllineAppointmentForm = props => {
  const [customFormField, setCustomFormField] = useState([]);

  const handleFormSubmission = async values => {
    let contentType = 'JSON';
    await props.createOnlineForm(JSON.stringify(values), contentType);
  };

  useEffect(() => {
    const fetchForm = async () => {
      if (customFormField.length === 0) {
        await props.fetchCustomForm(id);
        setCustomFormField(props.CustomForm);
      }
    };
    fetchForm();
  });

  const [loadings, setLoadings] = useState(false);
  const innerForm = useRef();
  const { id } = useParams();

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
      label: 'Phone no.',
      name: 'phone',
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
    {
      label: 'Appointment For',
      name: 'appointment_for',
      type: 'select',
      options: [
        { value: 'me', name: 'Me' },
        { value: 'other', name: 'Other' },
      ],
    },
    {
      label: 'Comments or Special Request (Optional)',
      name: 'comment',
      type: 'text',
    },
  ];

  return (
    <div className="onlinebookWrapper">
      <div className="login-page">
        <Formik
          enableReinitialize={true}
          initialValues={{
            hospital_id: id,
            branch_id: 1,
            provider_id: 1,
            appointment_type_id: 1,
            appointment_for: '',
            appointment_start: '1998-09-10T09:12:31',
            charge: 9,
            firstName: '',
            lastName: '',
            email: '',
            patiantStatus: 'active',
            phone: '',
            zipcode: '',
            dob: '',
            gender: '',
            userTypeId: 5,
            address: '',
            comment: '',
            response: [
              {
                custom_types: 'note',
                required: false,
                key_name: 'your father name',
                answer: ['asfg'],
              },
              {
                custom_types: 'checkbox',
                required: true,
                key_name: 'select one',
                values: ['a', 'b'],
                answer: ['safg'],
              },
            ],
          }}
          onSubmit={handleFormSubmission}
          innerRef={innerForm}
        >
          {({ handleSubmit, touched, errors, isSubmitting }) => (
            <Form className="" handleSubmit={handleSubmit}>
              <h1 className="text-center">Fill the Form To Book A Appointment</h1>{' '}
              <div className="">
                <Row> {generateForm(formField)} </Row>
              </div>{' '}
              <Button
                htmlType="submit"
                disabled={isSubmitting}
                loading={loadings}
                className="button-square edit-button"
              >
                Book A Appointment
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
const mapStoreToProps = ({ OnlineBookingForm, CustomForm }) => {
  console.log('Store CustomForm', OnlineBookingForm);
  return {
    OnlineBookingForm: OnlineBookingForm.payload,
    OnlineBookingForm: OnlineBookingForm.error,
    OnlineBookingForm: OnlineBookingForm.message,

    CustomForm: CustomForm.payload,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchCustomForm: id =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_CUSTOMFORM', id })),

  createOnlineForm: (values, contentType) =>
    dispatch(
      actionCreator({
        method: 'POST',
        action_type: 'CREATE_ONLINE_APPOINTMENT',
        values,
        contentType,
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(OnllineAppointmentForm);
