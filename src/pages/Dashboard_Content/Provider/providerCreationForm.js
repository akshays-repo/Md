import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ProviderCreationSchema } from '_utils/Schemas';
import { TextField } from 'formik-material-ui';
import { message, Button, Row, Col } from 'antd';
import { generateForm } from '../../../_utils/formgenerator';
import { getFormData } from '_utils';
import { PoweroffOutlined } from '@ant-design/icons';
import callApi from '_utils/callApi';
const ProviderCreationForm = props => {
  const [loadings, setLoadings] = useState(false);
  const innerForm = useRef();

  const handleFormSubmission = async values => {
    console.log('DADADADAD', props.addProvider);
    try {
      const formData = getFormData({ ...values });
      props.addProvider(values);
    } catch (err) {
      console.log(err);
    }
  };

  const formField = [
    {
      label: 'Full Name',
      name: 'fullName',
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
  ];

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          fullname: '',
          email: '',
          status: 'active',
          userTypeId: 4,
          branchId: 3,
          provider_typeId: '',
          phone: '',
        }}
        validationSchema={ProviderCreationSchema}
        onSubmit={handleFormSubmission}
        innerRef={innerForm}
      >
        {({ handleSubmit, touched, errors, isSubmitting }) => (
          <Form
            style={{ backgroundColor: '#f7f8f8' }}
            className="login__form"
            handleSubmit={handleSubmit}
          >
            <Row>{generateForm(formField)}</Row>

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
