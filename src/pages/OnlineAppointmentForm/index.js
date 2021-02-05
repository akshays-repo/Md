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
import { Result,Modal  } from 'antd';

const OnllineAppointmentForm = props => {
  const [customFormField, setCustomFormField] = useState([]);

  const handleFormSubmission = async values => {
    let contentType = 'JSON';
   const response =  await props.createOnlineForm(JSON.stringify({...values, response:customFormField}), contentType);
    console.log("MessageResponse",response)
    if(response.error === ''){
       success()
       innerForm.current.reset()
    }
  };

  const handleChange = (e, index) => {
    let items = { ...customFormField };
    let item = items[index];
    item.answer = [e];
    items[index] = item;
  };

  const handleChangeText  = (e , index) =>{
    let items = {...customFormField}
    let item = items[index]
    item.answer = [e.target.value]
    items[index] = item


  }
  useEffect(() => {
    const fetchForm = async () => {
      if (customFormField?.length === 0) {
        await props.fetchCustomForm(id);
        setCustomFormField(props.CustomForm.custom_form);
      }
    };
    fetchForm();
  });

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

  const resultSucess = <Result
  status="success"
  title="Successfully Booked the Appoinment"
  subTitle="Thank you"/>

    const onOkay =() => {
      window.location.href = window.location.pathname
    }

  const  success = () => {
    Modal.success({
      content: resultSucess,
      onOk :onOkay
    });
  }
  
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
          }}
          onSubmit={handleFormSubmission}
          innerRef={innerForm}
          validationSchema={OnlineBookingSchema}
        >
          {({ handleSubmit, touched, errors, isSubmitting }) => (
            <Form className="" handleSubmit={handleSubmit}>
              <h1 className="text-center">Fill the Form To Book A Appointment</h1>{' '}
              <div className="">
                <Row> {generateForm(formField)} </Row>
              </div>{' '}
              {customFormField?.map((forms, index) => (
                <div>
                  {forms.custom_types === 'text' || forms.custom_types === 'note' ? (
                    <div>
                      {' '}
                      <p></p>
                      <TextField
                        onChange={e => handleChangeText(e, index)}
                        id="standard-basic"
                        label={forms.Key_name}
                        required={forms.required}
                      />
                      <p></p>
                    </div>
                  ) : (
                    ''
                  )}
                  {forms.custom_types === 'checkbox' ? (
                    <div>
                      {' '}
                      <p>{forms.Key_name}{forms.required ? ' * (required) ':'' }</p>
                      <Checkbox.Group
                      required={forms.required}
                        onChange={e => handleChange(e, index)}
                        options={forms.values}
                      />
                      <p></p>
                    </div>
                  ) : (
                    ''
                  )}

                  {forms.custom_types === 'drop-down' ? (
                    <div>
                      {' '}
                      <p>{forms.Key_name}{forms.required ? ' * (required) ' :'' }</p>
                      <Select required={forms.required} onChange={e => handleChange(e, index)} style={{ width: 120 }}>
                        {forms.values.map(option => (
                          <Select.Option value={option}>{option}</Select.Option>
                        ))}
                      </Select>
                      <p></p>
                    </div>
                  ) : (
                    ''
                  )}

                  {forms.custom_types === 'date' ? (
                    <div>
                      {' '}
                      <p>{forms.Key_name}{forms.required ?' * (required) ' :'' }</p>
                      <DatePicker
                      required={forms.required}
                        onChange={e => handleChange(e, index)}
                        format={'YYYY/MM'}
                      />
                      <p></p>
                    </div>
                  ) : (
                    ''
                  )}

                  {forms.custom_types === 'number' ? (
                    <div>
                      {' '}
                      <p>{forms.Key_name}{forms.required ?' * (required) ' :'' }</p>
                      <InputNumber
                      required={forms.required}
                        onChange={e => handleChange(e, index)}
                        min={1}
                        max={100}
                      />
                      <p></p>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              ))}
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
    OnlineBookingFormPayload: OnlineBookingForm.payload,
    OnlineBookingFormError: OnlineBookingForm.error,
    OnlineBookingFormMessage: OnlineBookingForm.message,

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
