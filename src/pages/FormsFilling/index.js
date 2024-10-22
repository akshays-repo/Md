import React, { useEffect, useState, useRef } from 'react';
import { actionCreator } from '../../reducers/actionCreator';
import { Result, Modal } from 'antd';
import SignaturePad from 'react-signature-canvas';
import { store } from '../../reducers/configureStore';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { isMobile } from 'react-device-detect';
import { Row, Col, Checkbox, Select, DatePicker, InputNumber } from 'antd';
import TextField from '@material-ui/core/TextField';
import { TextField as MatText, Select as MatSelect } from 'formik-material-ui';
import moment from 'moment';
import { Formik, Form, Field } from 'formik';
import { onlineFormFilling } from '_utils/Schemas';
import { getImageUrl } from '_utils/getImageUrl';

const FormsFillingSection = props => {
  const [formToFill, setFormToFill] = useState(props.formToFill.custom_form);
  const [hospitalDetails, setHospitalDetails] = useState(props.hospital);

  const { id } = useParams();
  useEffect(() => {
    props.fetchFormToFill(id);
  }, []);

  const innerForm = useRef();
  const sigCanvas = useRef({});

  const handleFormSubmission = async values => {
    console.log('response', formToFill);
    let data = {
      response: formToFill,
      name: values.name,
      form_id: parseInt(values.form_id),
      form_name: values.form_name,
      email: values.email,
      phone: values.phone,
      name: values.name,
      hospital_id: values.hospital_id,
    };
    let respone = await props.postForm(JSON.stringify(data));
    console.log('response', respone);

    if (respone.error === '') {
      success();
      innerForm.current.reset();
      window.location.href = `/`;
    } else {
      console.log('Error');
    }
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
    setHospitalDetails(props.formToFill.hospital);
  });

  const onOkay = () => {
    window.location.href = window.location.pathname;
  };

  const resultSucess = (
    <Result status="success" title="Successfully Submitted the Form" subTitle="Thank you" />
  );
  const success = () => {
    Modal.success({
      content: resultSucess,
      onOk: onOkay,
    });
  };


  const clearSignature = () => sigCanvas.current.clear();
  const getSignature = async index => {
    let imageData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');

    let resp = await fetch(imageData)
      .then(res => res.blob())
      .then(console.log());
    let imageUrl = await getImageUrl(resp);
    console.log('omahe', imageUrl);
    handleChange(imageUrl, index)
  };


  return (
    <div className="container direction">
      {/* <Row className="header">
        <Col xs={12} xl={4}>
          <div className="logo"><img src = {hospitalDetails?.logo.path ? `/${hospitalDetails?.logo.path}`: '' }/></div>
        </Col>
        <Col xs={12} xl={20}>
          <div className="frmHeading pt3 pb3">
          <h3> {hospitalDetails?.fullName}</h3>
          </div>
        </Col>
      </Row> */}

    

      <Row>
        <Col xs={24} lg={12} xl={15} offset={isMobile ? '' : 4} className="hospitalForm">
        <div className="frmHeading text-center pt3 pb3">
          <h3> {hospitalDetails?.fullName}</h3>
          </div>
          <h4 className="text-center">{props.formToFill.name}</h4>
          <div className="formBook" style={{ boxShadow: '0 0 10px rgb(0 0 0 / 10%)', background: ' #f8f8f8' }}>
            <Formik
              enableReinitialize={true}
              initialValues={{
                name: '',
                email: '',
                phone: '',
                hospital_id: props.formToFill.hospital_id,
                form_id: id,
                form_name: props.formToFill.name,
              }}
              onSubmit={handleFormSubmission}
              innerRef={innerForm}
              validationSchema={onlineFormFilling}
            >
              {({ handleSubmit, values, touched, errors, isSubmitting }) => (
                <Form className="" handleSubmit={handleSubmit}>
                  <Field
                    id="standard-basic"
                    name="name"
                    label={'Full Name'}
                    required={true}
                    component={MatText}
                  />

                  <Field
                    id="standard-basic"
                    name="email"
                    label={'Email'}
                    component={MatText}
                    required={true}
                  />

                  <Field
                    id="standard-basic"
                    label={'Phone '}
                    name="phone"
                    component={MatText}
                    // required={forms.required}
                  />

                  {formToFill?.map((forms, index) => (
                    <div>
                      {forms.custom_types === 'text' ? (
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

{ forms.custom_types === 'note' ? (
                        <div>
                          {' '}
                          <p>NB:{forms.Key_name}</p>
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
                      {forms.custom_types === 'esign' ? (
                        <div>
                          {' '}
                          <p>
                            {forms.Key_name}
                            {forms.required ? ' * (required) ' : ''}
                          </p>
                          <div>
                            <SignaturePad
                              ref={sigCanvas}
                              canvasProps={{
                                width:250,
                                height: 100,
                                className: 'signaturepad',
                              }}
                            />
                             <p>*please save signature after you completed</p>
                            <div className="signature-buttons mt6">

                            <span className="edit-button mr2" onClick={clearSignature}>Clear</span>
                            <span className="view-button"
                              onClick={() => {
                                getSignature(index);
                              }}
                            >
                              Save Signature
                            </span>
                              </div>
               
                        
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  ))}

                  <div className="w-100 footerButton mt5">
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

  postForm: (values, contentType = 'JSON') =>
    dispatch(actionCreator({ method: 'POST', action_type: 'FILL_FORM', values, contentType })),
});

export default connect(mapStoreToProps, mapDispatchToProps)(FormsFillingSection);
