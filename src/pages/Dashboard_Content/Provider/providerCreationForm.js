import React, { useDebugValue, useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';
import { ProviderCreationSchema } from '_utils/Schemas';
import { Button, Row, Col, message, Select } from 'antd';
import { generateForm } from '../../../_utils/formgenerator';
import { getFormData, getFormDataA } from '_utils';
import { store } from '../../../reducers/configureStore';
import { listenerCount } from 'superagent';
const { Option } = Select;

const ProviderCreationForm = props => {
  const [loadings, setLoadings] = useState(false);
  const innerForm = useRef();
  const [branchList, setBranchList] = useState([]);

  useEffect(() => {
    setBranchList(store.getState().Branch.payload);
    console.log('ASASASASA', branchList);
  });

  const handleFormSubmission = async values => {
    let data = await getFormDataA({ ...values, userTypeId: 4 });
    try {
      if (props.id) {
        await props.editProvider(props.id, data);
        store.dispatch({ type: 'CLOSE_PROVIDER_EDIT_MODAL' });
      } else {
        await props.addProvider(data);
        store.dispatch({ type: 'CLOSE_PROVIDER_CREATE_MODAL' });
      }
    } catch (err) {
      console.log('edit error', err);
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
        initialValues={
          props.values || {
            fullName: '',
            email: '',
            status: 'active',
            userTypeId: 4,
            branchId: '',
            provider_typeId: 3,
            phone: '',
          }
        }
        validationSchema={ProviderCreationSchema}
        onSubmit={handleFormSubmission}
        innerRef={innerForm}
      >
        {({ handleSubmit, touched, errors, isSubmitting }) => (
          <Form className="login__form" handleSubmit={handleSubmit}>
            <Row>{generateForm(formField)}</Row>

            <Field as="select" style={{ width: 120 }} name="branchId">
              {branchList?.map(branch => {
                return <option value={branch.id}>{branch.fullName}</option>;
              })}
            </Field>
            <Button

              htmlType="submit"
              disabled={isSubmitting}
              loading={loadings}
              className="view-button button-square mt-5"
            >
              {props.id ? ' Edit a Provider' : ' Create a New Provider'}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default ProviderCreationForm;
