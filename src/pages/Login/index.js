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
  const handleFormSubmission = values => {
    //Handle submission goes here
    props.userLogin(JSON.stringify(values));
  };
  const [loadings, setLoadings] = useState(false);
  const innerForm = useRef();

  if (props.isLogin) {
    return <Redirect to="/"></Redirect>;
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
            {({ handleSubmit, touched, errors, isSubmitting }) => (
              <Form className="login__form" autoComplete={'off'} handleSubmit={handleSubmit}>
                <h1 className="text-center">Log in to continue..</h1>{' '}
                <div className="loginInput">
                  <Field
                    label="Email"
                    component={TextField}
                    name="email"
                    placeholder=""
                    type="text"
                  ></Field>
                </div>{' '}
                <div className="loginInput">
                  <Field
                    label="Password"
                    component={TextField}
                    name="password"
                    placeholder=""
                    type="text"
                  ></Field>
                </div>
                <Button
                  htmlType="submit"
                  // disabled={isSubmitting}
                  // loading={loadings}
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
