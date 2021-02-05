import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Row} from 'antd'
import { generateForm } from '_utils/formgenerator';


const HardCoreForm = () =>{
    const formField = [
        {
          label: 'Firstname',
          name: 'firstName',
          type: 'text',
        },
        {
          label: 'Lastname',
          name: 'lastName',
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
        {
          label: 'Address',
          name: 'address',
          type: 'text',
        },
        {
          label: 'Zipcode',
          name: 'zipcode',
          type: 'text',
        },
        {
          label: 'Date of Birth',
          name: 'dob',
          type: 'datepicker',
        },
        {
          label: 'Gender',
          name: 'gender',
          type: 'select',
          options: [
            { value: 'male', name: 'Male' },
            { value: 'female', name: 'Female' },
            { value: 'other', name: 'Other' },
          ],
        },
        {
          label: 'Appointment For',
          name: 'appointment_for',
          type: 'select',
          options: [
            { value: 'me', name: 'Me' },
            { value: 'other', name: 'Other' },
          ],
        },
        {
          label: 'Comments or Special Request (Optional)',
          name: 'comment',
          type: 'text',
        },
      ];
    
    return(
        <div>
  <Formik
          enableReinitialize={true}
          initialValues={{
          
          }}
        >
          {({ handleSubmit, touched, errors, isSubmitting }) => (
            <Form className="" handleSubmit={handleSubmit}>
              <h1 className="text-center">Fill the Form To Book A Appointment</h1>{' '}
              <div className="">
                <Row> {generateForm(formField)} </Row>
              </div>{' '}

            </Form>
          )}
        </Formik>
        </div>
    )
}

export default HardCoreForm;