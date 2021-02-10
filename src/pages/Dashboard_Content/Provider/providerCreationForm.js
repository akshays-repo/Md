import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { ProviderCreationSchema } from '_utils/Schemas';
import { Button, Row, Select, Col } from 'antd';
import { Select as matSeclect } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import { generateForm } from '../../../_utils/formgenerator';
import { getFormDataA } from '_utils';
import { store } from '../../../reducers/configureStore';

const { Option } = Select;
//deletedBranches
const ProviderCreationForm = props => {
  const [loadings, setLoadings] = useState(false);
  const innerForm = useRef();
  const [branchList, setBranchList] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState([]);

  useEffect(() => {
    setBranchList(store.getState().Branch.payload);
    console.log('asasasas use', props);
  });

  const handleFormSubmission = async values => {
    console.log('asasasas MAIN', props.id, values);
    let data = await getFormDataA({ ...values, userTypeId: 4,   branchId: 5, });
    selectedBranch.map((va, i) => data.append('arrBranches[]', va));

    if (props.id) {
      await props.editProvider(props.id, data);
      store.dispatch({ type: 'CLOSE_PROVIDER_EDIT_MODAL' });
    } else {
      await props.addProvider(data);
      store.dispatch({ type: 'CLOSE_PROVIDER_EDIT_MODAL' });
    }
  };

  const handleChange = value => {
    console.log('Selected Branch', value);
    setSelectedBranch(value);
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
            provider_typeId: '',
            phone: '',
           
          }
        }
        //  validationSchema={ProviderCreationSchema}
        onSubmit={handleFormSubmission}
        innerRef={innerForm}
      >
        {({ handleSubmit, touched, errors, isSubmitting }) => (
          <Form className="login__form" handleSubmit={handleSubmit}>
            <Row>
              {generateForm(formField)}
              <Col xs={24} xl={12}>
                <p>Please Select the Branch</p>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Please select the Branch"
                  onChange={handleChange}
                >
                  {branchList?.map(branch => {
                    return <Option value={branch.id} key={branch.id}>{branch.fullName}</Option>;
                  })}
                </Select>


              </Col>

              <Col xs={24} xl={12}>
              <Field
                  as="select"
                  name="provider_typeId"
                  style={{ width: '80%' }}
                  placeholder="Provider type"
                  component={matSeclect}
                >
                  {props.ProviderTypePayload?.map(branch => {
                    return <MenuItem value={branch.id}>{branch.name}</MenuItem>;
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
