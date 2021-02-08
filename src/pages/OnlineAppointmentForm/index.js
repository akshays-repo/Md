import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { OnlineBookingSchema } from '_utils/Schemas';
import { useParams } from 'react-router';
import { message, Button, Row, Col, Checkbox, Select, DatePicker, Space, InputNumber } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from '../../reducers/actionCreator';
import { generateForm } from '_utils/formgenerator';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import { Result, Modal } from 'antd';
import { AppointmentType } from './appointment_type';
import BranchProvider from './branch_provider';
import { AppointmentFor } from './appointment_for';
import { PatientDetails } from './patient_details';

const OnllineAppointmentForm = props => {
  const [customFormField, setCustomFormField] = useState([]);

  const handleFormSubmission = async values => {
    let contentType = 'JSON';
    const response = await props.createOnlineForm(
      JSON.stringify({ ...values, response: customFormField }),
      contentType,
    );
    console.log('MessageResponse', response);
    if (response.error === '') {
      success();
      innerForm.current.reset();
    }
  };

  const handleChange = (e, index) => {
    let items = { ...customFormField };
    let item = items[index];
    item.answer = [e];
    items[index] = item;
  };

  const handleChangeText = (e, index) => {
    let items = { ...customFormField };
    let item = items[index];
    item.answer = [e.target.value];
    items[index] = item;
  };
  useEffect(() => {
    const fetchForm = async () => {
      if (customFormField?.length === 0) {
        await props.fetchCustomForm(id);
        setCustomFormField(props.CustomForm.custom_form);
      }
    };
    fetchForm();
  }, []);

  useEffect(() => {
    props.fetchAppointmentType({ hospitalId: 1 });
  }, []);
  useEffect(() => {
    props.fetchProvider({ id: 2 });
  }, []);

  useEffect(() => {
    props.fetchBranch({ hospitalId: localStorage.getItem('hospital_id'), page: 1, limit: 50 });
  }, []);

  const [loadings, setLoadings] = useState(false);
  const innerForm = useRef();
  const { id } = useParams();

  const formField = [
    {
      label: 'Firstname *',
      name: 'firstName',
      type: 'text',
    },
    {
      label: 'Lastname *',
      name: 'lastName',
      type: 'text',
    },

    {
      label: 'Email *',
      name: 'email',
      type: 'text',
    },
    {
      label: 'Phone no. *',
      name: 'phone',
      type: 'text',
    },
    {
      label: 'Address *',
      name: 'address',
      type: 'text',
    },
    {
      label: 'Zipcode *',
      name: 'zipcode',
      type: 'text',
    },
    {
      label: 'Date of Birth *',
      name: 'dob',
      type: 'datepicker',
    },
    {
      label: 'Gender *',
      name: 'gender',
      type: 'select',
      options: [
        { value: 'male', name: 'Male' },
        { value: 'female', name: 'Female' },
        { value: 'other', name: 'Other' },
      ],
    },
    {
      label: 'Appointment For *',
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

  const resultSucess = (
    <Result status="success" title="Successfully Booked the Appoinment" subTitle="Thank you" />
  );

  const onOkay = () => {
    window.location.href = window.location.pathname;
  };

  const success = () => {
    Modal.success({
      content: resultSucess,
      onOk: onOkay,
    });
  };

  return (
    <div className="onlinebookWrapper">
      <div className="login-page">
        <Formik
          enableReinitialize={true}
          initialValues={{
            hospital_id: id,
            branch_id: '',
            provider_id: '',
            appointment_type_id: '',
            appointment_for: '',
            appointment_start: '',
            charge: 0,
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
          }}
          onSubmit={handleFormSubmission}
          innerRef={innerForm}
          validationSchema={OnlineBookingSchema}
        >
          {({ handleSubmit, values, setFieldValue, touched, errors, isSubmitting }) => (
            <Form className="" handleSubmit={handleSubmit}>
              {!values.appointment_type_id && (
                <AppointmentType
                  setFieldValue={setFieldValue}
                  appointment_type={props.appointment_type}
                />
              )}
              {values.appointment_type_id &&
                (!values.branch_id || !values.provider_id || !values.appointment_start) && (
                  <BranchProvider
                    values={values}
                    setFieldValue={setFieldValue}
                    appointment_type={props.appointment_type}
                    branch={props.branch}
                  />
                )}
              {values.appointment_type_id &&
                values.branch_id &&
                values.provider_id &&
                values.appointment_start &&
                !values.appointment_for && <AppointmentFor />}
              {values.appointment_type_id &&
                values.branch_id &&
                values.provider_id &&
                values.appointment_start &&
                values.appointment_for && <PatientDetails /> && (
                  <Button
                    htmlType="submit"
                    disabled={isSubmitting}
                    loading={loadings}
                    className="button-square edit-button"
                  >
                    Book A Appointment
                  </Button>
                )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
const mapStoreToProps = ({ OnlineBookingForm, CustomForm, AppointmentType, Branch, Provider }) => {
  console.log('Store CustomForm', OnlineBookingForm);
  return {
    OnlineBookingFormPayload: OnlineBookingForm.payload,
    OnlineBookingFormError: OnlineBookingForm.error,
    OnlineBookingFormMessage: OnlineBookingForm.message,

    CustomForm: CustomForm.payload,
    appointment_type: AppointmentType.payload,
    branch: Branch.payload,
    provider: Provider.payload,
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
  fetchAppointmentType: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_APPOINTMENT_TYPE', param })),
  fetchBranch: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_BRANCH', param })),
  fetchProvider: id =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_PROVIDER', id })),
});

export default connect(mapStoreToProps, mapDispatchToProps)(OnllineAppointmentForm);
