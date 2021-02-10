import React from 'react'
import { Formik, Form, Field } from 'formik';
import { ProviderCreationSchema } from '_utils/Schemas';
import { Button, Row, Select, Col } from 'antd';
import { Select as matSeclect } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import { generateForm } from '../../../_utils/formgenerator';
import { getFormDataA } from '_utils';
import { store } from '../../../reducers/configureStore';

const {Option} = Select

const AppointmentEdit = (props) =>{
    
const handleFormSubmission = () =>{
    
}

    return(
        <div>
        
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
        validationSchema={ProviderCreationSchema}
        onSubmit={handleFormSubmission}
      >
        {({ handleSubmit, touched, errors, isSubmitting }) => (
          <Form  className="login__form" handleSubmit={handleSubmit}>
            <Row>
              {/* {generateForm(formField)} */}
              <Col xs={24} xl={12}>
                <p>Please Select the Branch</p>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Please select the Branch"
                 // onChange={handleChange}
                >
  
                </Select>


              </Col>

              <Col xs={24} xl={12}>
              <p>Please Select the Provider Type</p>
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
              className="view-button button-square mt-5"
            >
              {props.id ? ' Edit a Provider' : ' Create a New Provider'}
            </Button>
          </Form>
        )}
      </Formik>
        </div>
    )
}

export default AppointmentEdit