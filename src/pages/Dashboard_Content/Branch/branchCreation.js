import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ContactSchema } from '_utils/Schemas';
import callApi from '_utils/callApi';
import { createBranch } from '_constants/api';
const BranchCreationForm = () => {
  const handleFormSubmission = async values => {
    try {
      const result = await callApi(createBranch, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.log(err);
      // message.error('Please try again');
    }
  };
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          avatarlocation: '',
          phone: '',
          password: '',
          status: '',
          image: '',
          userTypeId: '',
          package_id: '',
        }}
        validationSchema={ContactSchema}
        onSubmit={handleFormSubmission}
        innerRef={innerForm}
      >
        {({ handleSubmit, touched, errors, isSubmitting }) => (
          <Form className="login__form" handleSubmit={handleSubmit}>
            <label>Name</label>
            <p>
              <Field name="name" placeholder="Name/Business Name" type="text"></Field>
              {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
            </p>
            <Button
              className="mt-5"
              htmlType="submit"
              disabled={isSubmitting}
              loading={loadings}
              className="submitbutton"
            >
              Send a Message
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default BranchCreationForm;
