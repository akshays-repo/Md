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
<div className="loginWrapper">
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

          <Form  className="login__form" handleSubmit={handleSubmit}>
                      <h1 className="text-center">Log in to continue..</h1>
            {' '}
            <div className="loginInput">
              <Field label="Email" component={TextField} name="email" placeholder="" type="text"></Field>
              {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
            </div>{' '}
            <div className="loginInput">
              <Field label="Password" component={TextField} name="password" placeholder="" type="text"></Field>
              {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
            </div>
            <Button
              htmlType="submit"
              disabled={isSubmitting}
              loading={loadings}
              className="button-square edit-button"
            >
             Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
    </div>

  );
};
export default FossilMdLoginPage;
