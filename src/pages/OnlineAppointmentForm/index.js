import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { PatientCreationSchema } from '_utils/Schemas';
import { TextField } from 'formik-material-ui';
import { message, Button, Row, Col } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import callApi from '_utils/callApi';
const OnllineAppointmentForm = () => {
  const [loadings, setLoadings] = useState(false);
  const innerForm = useRef();
  const handleFormSubmission = async values => {
    try {
      const result = await callApi('', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.log(err);
      // message.error('Please try again');
    }
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          avatarlocation: '',
          phone: '',
          status: '',
          image: '',
          userTypeId: 3,
          package_id: '',
          hospital_id: '',
        }}
        validationSchema={PatientCreationSchema}
        onSubmit={handleFormSubmission}
        innerRef={innerForm}
      >
        {({ handleSubmit, touched, errors, isSubmitting }) => (
            <div className="online-appointment-form">
                <h2>Please enter your exact information</h2>
          <Form
            className="login__form"
            handleSubmit={handleSubmit}
          >
              <p>
                <label className="input-file mr-4">
                  Upload New picture
                  <input
                    type="file"
                    id="profileImage"
                    onChange={file => {
                      const result = URL.createObjectURL(file.currentTarget.files[0]);
                    }}
                  />
                </label>
              </p>
                {' '}
                <label>First Name</label>
                <p>
                  <Field component={TextField} name="firstName" placeholder="" type="text"></Field>
                  {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
                </p>{' '}
                {' '}
                <label>Last Name</label>
                <p>
                  <Field component={TextField} name="lastName" placeholder="" type="text"></Field>
                  {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
                </p>
                <label>Email</label>
                <p>
                  <Field component={TextField} name="email" placeholder="" type="text"></Field>
                  {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
                </p>{' '}
                {' '}
                <label>Phone</label>
                <p>
                  <Field component={TextField} name="phone" placeholder="" type="phone"></Field>
                  {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
                </p>{' '}
                {' '}
                <label>Address</label>
                <p>
                  <Field component={TextField} name="name" placeholder="" type="text"></Field>
                  {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
                </p>

            <Button
              className="mt-5"
              htmlType="submit"
              disabled={isSubmitting}
              loading={loadings}
              className="submitbutton"
            >
              Book Appointment
            </Button>
          </Form>
            </div>

        )}
      </Formik>
    </>
  );
};
export default OnllineAppointmentForm;
