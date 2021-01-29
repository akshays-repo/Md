import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { BranchSchema } from '_utils/Schemas';
import { TextField } from 'formik-material-ui';
import { message, Button, Row, Col } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { getFormData } from '_utils';
import { actionCreator } from 'reducers/actionCreator';

const BranchCreationForm = props => {
  const [loadings, setLoadings] = useState(false);
  const innerForm = useRef();
  const handleFormSubmission = async values => {
    try {
      values = await getFormData({ ...values, userTypeId: 3 });
      if (props.id) {
        props.editBranch(props.id, values);
      } else {
        props.addBranch(values);
      }
    } catch (err) {
      console.log(err);

      // message.error(err);
    }
  };

  const formField = [
    {
      label: 'Fullname',
      name: 'fullName',
      type: 'text',
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
    },
    {
      label: 'Phone no.',
      name: 'phone',
      type: 'text',
    },
    {
      label: 'Address',
      name: 'address',
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
            phone: '',
            address: '',
            hospitalId: 3,
            userTypeId: 3,
            status: 'active',
          }
        }
        validationSchema={BranchSchema}
        onSubmit={handleFormSubmission}
        innerRef={innerForm}
      >
        {({ handleSubmit, touched, errors, isSubmitting }) => (
          <Form
            style={{ backgroundColor: '#f7f8f8' }}
            className="login__form"
            handleSubmit={handleSubmit}
          >
            <Row>
              {formField.map((values, index) => {
                return (
                  <Col key={index} xs={24} xl={12}>
                    <label>{values.label}</label>

                    <Field
                      component={TextField}
                      name={values.name}
                      placeholder=""
                      type="text"
                    ></Field>
                  </Col>
                );
              })}
            </Row>

            <Button
              className="mt-5"
              htmlType="submit"
              disabled={isSubmitting}
              loading={loadings}
              className="submitbutton"
            >
              {props.id ? 'Edit Branch' : 'Add Branch'}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BranchCreationForm;
