import React, { useEffect, useState } from 'react';
import { actionCreator } from '../../reducers/actionCreator';
import { store } from '../../reducers/configureStore';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { isMobile } from 'react-device-detect';

// import { Row, Col } from 'antd';

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
import moment from 'moment'
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
      name:values.name,
      form_id:parseInt(values.form_id),
      form_name:values.form_name,
      email:values.email,
      phone:values.phone,
      name:values.name,
      hospital_id:values.hospital_id

    }
   props.postForm(JSON.stringify(data) )
console.log("response", data ,values)
  };

  const handleChange = (e, index) => {
    let items = { ...formToFill };
    let item = items[index];
    item.answer = [e];
    items[index] = item;
  };
  const handleChangeDatePicker = (e, index) => {
    let items = { ...formToFill };
    let item = items[index];
    item.answer = [moment(e).format('MMM Do YY')];
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
    setHospitalDetails( props.formToFill.hospital);
    console.log('sjlhdasjdjkac b', hospitalDetails , props.formToFill.hospital);
  });

//   hospital:
// fullName: "Govind Hospital"
// logo: {name: "25.jpg", path: "uploads/users/1613645520687_25.jpg"}
  return (
    <div className="container direction">
  <Row className="header">
  <Col xs={12} xl={4}>
    <div className="logo"><img src = {`/${hospitalDetails?.logo.path}` }/></div>
    </Col>
    <Col xs={12} xl={20}>
      <h3> {hospitalDetails?.fullName}</h3>
      </Col>
      </Row>

      <h4 className="text-center">{props.formToFill.name}</h4>

<Row>
<Col xs={24} xl={12} offset={isMobile ? "": 6}>
    <div className="formBook" style={{boxShadow: "0 0 10px rgb(0 0 0 / 10%)"}}>
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
                  <div className="formChecklist">
                    {' '}
                    <p>
                      {forms.Key_name}
                      {forms.required ? ' * (required) ' : ''}
                    </p>
                    <Select
                      required={forms.required}
                      onChange={e => handleChange(e, index)}
                      style={{ width: 250 }}
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
                      onChange={e => handleChangeDatePicker(e, index)}
                      format={'YYYY-MM-DD HH:mm'}
                      style={{ width: 250 }}
                      
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
                      style={{ width: 250 }}
                    />
                    <p></p>
                  </div>
                ) : (
                  ''
                )}



              </div>
              
            ))}
            
<div className="w-100 footerButton">
            <button
              htmlType="submit"
            //  disabled={isSubmitting}
              //loading={loadings}
              className="button-square view-button mt5 text-center"
            >
              Submit
            </button>
            </div>
          </Form>
        )}
      </Formik>
      </div>
      </Col>
      </Row>
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

  postForm: (values, contentType ='JSON') =>
    dispatch(actionCreator({ method: 'POST', action_type: 'FILL_FORM', values, contentType })),
});

export default connect(mapStoreToProps, mapDispatchToProps)(FormsFillingSection);
