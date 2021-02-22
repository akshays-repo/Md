import React, { useEffect, useState } from 'react';
import { actionCreator } from '../../reducers/actionCreator';
import { store } from '../../reducers/configureStore';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import {
  message,
  Button,
  Row,
  Col,
  Checkbox,
  Select,
  DatePicker,
  Space,
  InputNumber,
  Divider,
} from 'antd';
import TextField from '@material-ui/core/TextField';
import { TextField as MatText, Select as MatSelect } from 'formik-material-ui';

import { Formik, Form, Field } from 'formik';
const FormsFillingSection = props => {
  const [formToFill, setFormToFill] = useState(props.formToFill.custom_form);
  const [hospitalDetails, setHospitalDetails] = useState(props.hospital);

  const { id } = useParams();
  useEffect(() => {
    props.fetchFormToFill(id);
  }, []);

  const handleFormSubmission = (values) => {
    console.log("response" , formToFill)
    let data = {
      response:formToFill,
      values
    }
console.log("response", data ,values)
  };

  const handleChange = (e, index) => {
    let items = { ...formToFill };
    let item = items[index];
    item.answer = [e];
    items[index] = item;
  };

  const handleChangeText = (e, index) => {
    let items = { ...formToFill };
    let item = items[index];
    item.answer = [e.target.value];
    items[index] = item;
  };

  useEffect(() => {
    setFormToFill(props.formToFill.custom_form);
    setHospitalDetails(props.hospital);
    console.log('sjlhdasjdjkac b', formToFill , props.formToFill);
  });

//   hospital:
// fullName: "Govind Hospital"
// logo: {name: "25.jpg", path: "uploads/users/1613645520687_25.jpg"}
  return (
    <div>
  {/* <div>
    <span><img src = {props.formToFill.hospital.logo.path}/></span>
      <h2> {props.formToFill.hospital.fullName}</h2>  
      </div> */}

      <h1>{props.formToFill.name}</h1>
    
      <Formik
        enableReinitialize={true}
        initialValues={{
          name:"",
          email:"",
          phone:"",
          hospital_id: props.formToFill.hospital_id,
          form_id:id,
          form_name:props.formToFill.name

        }}
        onSubmit={handleFormSubmission}
        // innerRef={innerForm}
        //validationSchema={OnlineBookingSchema}
      >
        {({ handleSubmit, values, touched, errors, isSubmitting }) => (
          <Form className="" handleSubmit={handleSubmit}>
            <Field id="standard-basic" name="name"  label={'Full Name'} 
            required={true} component={MatText} />
            <Field id="standard-basic"name="email"  label={'Email'} 
            component={MatText} 
             required={true} />
            <Field
              id="standard-basic"
              label={'Phone '}
              name="phone"
              component={MatText} 
              // required={forms.required}
            />
            {formToFill?.map((forms, index) => (
              <div>
                {forms.custom_types === 'text' || forms.custom_types === 'note' ? (
                  <div>
                    {' '}
                    <p></p>
                    {/* <Field name={response[index].answer}>
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
                }) => (
                  <div>
                    <TextField label={forms.Key_name} type="text" placeholder="Email" {...field} />
                    {/* {meta.touched && meta.error && <div className="error">{meta.error}</div>} */}
                    {/* </div>
                )} */}
                    {/* </Field> */}
                    <TextField
                      onChange={e => handleChangeText(e, index)}
                      id="standard-basic"
                      label={forms.Key_name}
                      required={forms.required}
                    />
                    <p></p>
                  </div>
                ) : (
                  ''
                )}
                {forms.custom_types === 'checkbox' ? (
                  <div>
                    {' '}
                    <p>
                      {forms.Key_name}
                      {forms.required ? ' * (required) ' : ''}
                    </p>
                    <Checkbox.Group
                      required={forms.required}
                      onChange={e => handleChange(e, index)}
                      options={forms.values}
                    />
                    <p></p>
                  </div>
                ) : (
                  ''
                )}

                {forms.custom_types === 'drop-down' ? (
                  <div>
                    {' '}
                    <p>
                      {forms.Key_name}
                      {forms.required ? ' * (required) ' : ''}
                    </p>
                    <Select
                      required={forms.required}
                      onChange={e => handleChange(e, index)}
                      style={{ width: 120 }}
                    >
                      {forms.values.map(option => (
                        <Select.Option value={option}>{option}</Select.Option>
                      ))}
                    </Select>
                    <p></p>
                  </div>
                ) : (
                  ''
                )}

                {forms.custom_types === 'date' ? (
                  <div>
                    {' '}
                    <p>
                      {forms.Key_name}
                      {forms.required ? ' * (required) ' : ''}
                    </p>
                    <DatePicker
                      required={forms.required}
                      onChange={e => handleChange(e, index)}
                      format={'YYYY/MM'}
                    />
                    <p></p>
                  </div>
                ) : (
                  ''
                )}

                {forms.custom_types === 'number' ? (
                  <div>
                    {' '}
                    <p>
                      {forms.Key_name}
                      {forms.required ? ' * (required) ' : ''}
                    </p>
                    <InputNumber
                      required={forms.required}
                      onChange={e => handleChange(e, index)}
                      min={1}
                      max={100}
                    />
                    <p></p>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ))}

            <Button
              htmlType="submit"
            //  disabled={isSubmitting}
              //loading={loadings}
              className="button-square edit-button"
            >
              Book A Appointment
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStoreToProps = ({ Forms }) => {
  console.log('state', Forms);
  return {
    error: Forms.error,
    message: Forms.message,
    formToFill: Forms.formToFill,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchFormToFill: id =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_FORM_FOR_FILLING', id })),
  addForms: (values, contentType) =>
    dispatch(actionCreator({ method: 'POST', action_type: 'CREATE_FORM', values, contentType })),
  editForms: (id, values, contentType) =>
    dispatch(actionCreator({ method: 'PUT', action_type: 'EDIT_FORM', id, values, contentType })),
  deleteForms: id => dispatch(actionCreator({ method: 'DELETE', action_type: 'DELETE_FORM', id })),
  filterForms: param =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'FILTER_APPOINTMENT',
        param,
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(FormsFillingSection);
