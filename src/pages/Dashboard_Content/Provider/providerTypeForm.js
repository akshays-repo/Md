import React, { useEffect, useState , useRef} from 'react';
import { store } from '../../../reducers/configureStore';
import { Formik, Form, Field } from 'formik';
import { Button, Row, Select, Col } from 'antd';
import { getFormDataA } from '_utils';
import { generateForm } from '_utils/formgenerator';
const ProviderTypeForm = props => {
  const [branchList, setBranchList] = useState([]);
  const innerForm = useRef();

  useEffect(() => {
    setBranchList(store.getState().Branch.payload);
  });

  const handleFormSubmission = async (values) =>{
    let contentType = 'JSON';
    await props.addProviderType(JSON.stringify(values), contentType);
    
  }

  const formField = [
    {
      label: 'NAME',
      name: 'name',
      type: 'text',
    },
    {
        label: 'Status',
        name: 'status',
        type: 'select',
        options: [
          { value: 'active', name: 'Active' },
          { value: 'hold', name: 'Hold' },
        ],
      },
  ];
  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={
          props.values || {
            name: '',
            status: 'active',
            hospitalId:  parseInt(localStorage.getItem('hospital_id')),
          }
        }
       // validationSchema={ProviderCreationSchema}
        onSubmit={handleFormSubmission}
        innerRef={innerForm}
      >
        {({ handleSubmit, touched, errors, isSubmitting }) => (
          <Form className="login__form" handleSubmit={handleSubmit}>
            <Row>{generateForm(formField)}</Row>

            <Button
              htmlType="submit"
              disabled={isSubmitting}
             // loading={loadings}
              className="view-button button-square mt-5"
            >
              {props.id ? ' Edit a Provider' : ' Create a New Provider'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProviderTypeForm;
