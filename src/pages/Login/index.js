import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { PatientCreationSchema } from '_utils/Schemas';
import { TextField } from 'formik-material-ui';
import { message, Button, Row, Col } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

const FossilMdLoginPage = () => {
    const handleFormSubmission =() =>{
        //Handle submission goes here
    }
    const [loadings, setLoadings] = useState(false);
    const innerForm = useRef();
  return (
    <div className="login-page">
      <Formik
        enableReinitialize={true}
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={PatientCreationSchema}
        onSubmit={handleFormSubmission}
        innerRef={innerForm}
      >
        {({ handleSubmit, touched, errors, isSubmitting }) => (
          <Form className="login__form" handleSubmit={handleSubmit}>
            {' '}
            <label>Email</label>
            <p>
              <Field component={TextField} name="email" placeholder="" type="text"></Field>
              {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
            </p>{' '}
            <label>password</label>
            <p>
              <Field component={TextField} name="email" placeholder="" type="text"></Field>
              {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
            </p>
            <Button
              className="mt-5"
              htmlType="submit"
              disabled={isSubmitting}
              loading={loadings}
              className="submitbutton"
            >
             Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default FossilMdLoginPage;
