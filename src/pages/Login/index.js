import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { PatientCreationSchema } from '_utils/Schemas';
import { TextField } from 'formik-material-ui';
import { message, Button, Row, Col } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { LoginSchema } from '../../_utils/Schemas';
import { store } from '../../reducers/configureStore';

import { connect } from 'react-redux';
import { actionCreator } from '../../reducers/actionCreator';
import { Redirect } from 'react-router';
const FossilMdLoginPage = props => {
  const [loadings, setLoadings] = useState(false);

  const handleFormSubmission = async (values, { setSubmitting }) => {
    //Handle submission goes here
    setSubmitting(true);
    setLoadings(true)
    await props.userLogin(JSON.stringify(values));
    setSubmitting(false);
    setLoadings(false)
  };
  const innerForm = useRef();

  if (props.isLogin) {
    return <Redirect to="/dashboard"></Redirect>;
  } else {
    return (
      <div className="loginWrapper">
        <div className="login-page">
          <Formik
            enableReinitialize={true}
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={handleFormSubmission}
            innerRef={innerForm}
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form className="login__form" onSubmit={handleSubmit}>
                <h2 className="text-center">Log in to continue..</h2>
                <div className="loginInput">
                  <Field
                    label="Email"
                    disabled={false}
                    component={TextField}
                    name="email"
                    placeholder=""
                    type="text"
                  ></Field>
                </div>

                <Field style={{width: '100%'}}
                  label="Password"
                  component={TextField}
                  name="password"
                  placeholder=""
                  type="password"
                  disabled={false}
                ></Field>
<div className="text-center">
                <button
                  htmlType="submit"
                  //disabled={isSubmitting}
                  loading={loadings}
                  className="view-button button-square mt8"
                >
                  Login
                </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
};

const mapStoreToProps = store => {
  return {
    isLogin: store.Login.isLogin,
  };
};

const mapDispatchToProps = dispatch => ({
  userLogin: values =>
    dispatch(
      actionCreator({ method: 'POST', contentType: 'JSON', action_type: 'USER_LOGIN', values }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(FossilMdLoginPage);
