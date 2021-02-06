import React, {  useEffect, useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { ProviderCreationSchema } from '_utils/Schemas';
import { Button, Row, Select, Col } from 'antd';
import { Select as matSeclect } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import { generateForm } from '../../../_utils/formgenerator';
import {  getFormDataA } from '_utils';
import { store } from '../../../reducers/configureStore';

const { Option } = Select;

const ProviderCreationForm = props => {
  const [loadings, setLoadings] = useState(false);
  const innerForm = useRef();
  const [branchList, setBranchList] = useState([]);

  useEffect(() => {
    setBranchList(store.getState().Branch.payload);
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
            <Row>{generateForm(formField)}
            <Col xs={24} xl={12}>
            <Field as="select" name="branchId"   component={matSeclect}>
              {branchList?.map(branch => {
                return <MenuItem value={branch.id}>{branch.fullName}</MenuItem>;
              })}
            </Field>
            </Col>
            </Row>

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
