import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { PatientCreationSchema } from '_utils/Schemas';
import { TextField } from 'formik-material-ui';
import { message, Button, Row, Col } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

const OnllineAppointmentForm = () => {
  const handleFormSubmission = () => {
    //Handle submission goes here
  };
  const [loadings, setLoadings] = useState(false);
  const innerForm = useRef();
  return (
    <div className="onlinebookWrapper">
      <div className="login-page">
        <Formik
          enableReinitialize={true}
          initialValues={{}}
          validationSchema={PatientCreationSchema}
          onSubmit={handleFormSubmission}
          innerRef={innerForm}
        >
          {({ handleSubmit, touched, errors, isSubmitting }) => (
            <Form className="login__form" handleSubmit={handleSubmit}>
              <h1 className="text-center">Fill the Form To Book A Appointment</h1>{' '}
              <div className="loginInput">
                <Field
                  label="Full Name"
                  component={TextField}
                  name="name"
                  placeholder=""
                  type="text"
                ></Field>
                {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
              </div>{' '}
              <div className="loginInput">
                <Field
                  label="Email"
                  component={TextField}
                  name="email"
                  placeholder=""
                  type="text"
                ></Field>
                {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
              </div>{' '}
              <div className="loginInput">
                <Field
                  label="Phone Number"
                  component={TextField}
                  name="phone"
                  placeholder=""
                  type="text"
                ></Field>
                {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
              </div>{' '}
              <div className="loginInput">
                <Field
                  label="Address"
                  component={TextField}
                  name="address"
                  placeholder=""
                  type="text"
                ></Field>
                {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
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
export default OnllineAppointmentForm;
