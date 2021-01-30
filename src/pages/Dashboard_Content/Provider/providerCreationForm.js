import React, { useDebugValue, useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ProviderCreationSchema } from '_utils/Schemas';
import { Button, Row, Col, message } from 'antd';
import { generateForm } from '../../../_utils/formgenerator';
import { getFormData , getFormDataA } from '_utils';
import { store } from '../../../reducers/configureStore';

const ProviderCreationForm = props => {
  const [loadings, setLoadings] = useState(false);
  const innerForm = useRef();

  const handleFormSubmission = async values => {
    let data = await getFormDataA({ ...values })
    try {
      if (props.id) {
        await props.editProvider(data);
      } else {
        await props.addProvider(data);
      }
      store.dispatch({ type: 'CLOSE_PROVIDER_CREATE_MODAL' });
    } catch (err) {
      console.log("edit error",err);
    }
  };

  useEffect(() => {
    console.log('POPOPOP', props);
  }, []);

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
        initialValues={
          props.values || {
            fullName: '',
            email: '',
            status: 'active',
            userTypeId: 4,
            branchId: 3,
            provider_typeId: 3,
            phone: '',
          }
        }
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
