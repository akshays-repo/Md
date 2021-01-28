import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { PatientCreationSchema } from '_utils/Schemas';
import { message, Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import callApi from '_utils/callApi';
const PatientCreationForm = () => {
  const [loadings, setLoadings] = useState(false);
  const innerForm = useRef();
  const handleFormSubmission = async values => {
    try {
      const result = await callApi('', {
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
          status: '',
          image: '',
          userTypeId: 3,
          package_id: '',
          hospital_id:'',
        }}
        validationSchema={PatientCreationSchema}
        onSubmit={handleFormSubmission}
        innerRef={innerForm}
      >
        {({ handleSubmit, touched, errors, isSubmitting }) => (

          <Form style={{backgroundColor:"#f7f8f8"}} className="login__form" handleSubmit={handleSubmit}>
            <p>
            <label className="input-file mr-4">
                      Upload New picture
                      <input
                        type="file"
                        id="profileImage"
                        onChange={file => {
                          const result = URL.createObjectURL(file.currentTarget.files[0]);
                            }}
                      />
                    </label>
           
            </p>
            
            <label>First Name</label>
            <p>
              <Field name="name" placeholder="" type="text"></Field>
              {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
            </p>
            <label>Last Name</label>
            <p>
              <Field name="name" placeholder="" type="text"></Field>
              {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
            </p> 
            <label>Email</label>
            <p>
              <Field name="name" placeholder="" type="text"></Field>
              {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
            </p> 
            <label>Phone</label>
            <p>
              <Field name="name" placeholder="" type="text"></Field>
              {touched.name && errors.name ? <div className="errormsg">{errors.name}</div> : ''}
            </p> 
            <Button
              className="mt-5"
              htmlType="submit"
              disabled={isSubmitting}
              loading={loadings}
              className="submitbutton"
            >
             Create a New Patient
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default PatientCreationForm;
