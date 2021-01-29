import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { PatientCreationSchema } from '_utils/Schemas';
import { TextField } from 'formik-material-ui';
import { message, Button, Row, Col } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import callApi from '_utils/callApi';
const ProviderCreationForm = () => {
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
          <Form
            style={{ backgroundColor: '#f7f8f8' }}
            className="login__form"
            handleSubmit={handleSubmit}
          >
            <Row>
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
              <Col xs={24} xl={12}>
                {' '}
                <label>First Name</label>
                <p>
                  <Field component={TextField} name="firstName" placeholder="" type="text"></Field>
                  {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
                </p>{' '}
              </Col>
              <Col xs={24} xl={12}>
                {' '}
                <label>Last Name</label>
                <p>
                  <Field component={TextField} name="lastName" placeholder="" type="text"></Field>
                  {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
                </p>
              </Col>
              <Col xs={24} xl={12}>
                <label>Email</label>
                <p>
                  <Field component={TextField} name="email" placeholder="" type="text"></Field>
                  {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
                </p>{' '}
              </Col>
              <Col xs={24} xl={12}>
                {' '}
                <label>Phone</label>
                <p>
                  <Field component={TextField} name="phone" placeholder="" type="phone"></Field>
                  {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
                </p>{' '}
              </Col>
              <Col xs={24} xl={12}>
                {' '}
                <label>Address</label>
                <p>
                  <Field component={TextField} name="name" placeholder="" type="text"></Field>
                  {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
                </p>
              </Col>
            </Row>

            <Button
              className="mt-5"
              htmlType="submit"
              disabled={isSubmitting}
              loading={loadings}
              className="submitbutton"
            >
              Create a New Provider
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default ProviderCreationForm;
