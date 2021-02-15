import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Row, Select, Col,} from 'antd';
import { DatePicker } from 'formik-antd';

import moment from 'moment';
import { TextField } from 'formik-material-ui';
const { Option } = Select;
const AppointmentEdit = props => {
  const [details, setDetails] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [branchDetails, setBranchDetails] = useState('');
  const [patientDetails, setPatientDetails] = useState('');
  const [response, setResponse] = useState([]);

  const [paymentStatus, setPaymentStatus] = useState(props.view.payment_status);
  const [status, setStatus] = useState(props.view.status);

  useEffect(() => {
    setDetails(props.view);
    setAppointmentType(props.view.appointment_type);
    setBranchDetails(props.view.branch);
    setResponse(props.view.response);
    setPatientDetails(props.view.patiant);
  }, []);

  useEffect(() => {
    console.log('jcxcxkcxcj', props.view);
  });

  const handleFormSubmission = async values => {
    console.log('asdkjhf', values);
     let contentType = 'JSON';
    await props.editAppointment(props.view.id , JSON.stringify({ ...values , payment_status:paymentStatus ,status:paymentStatus , userTypeId:2 }))
    const response = await props.createOnlineForm(JSON.stringify({ ...values }), contentType);

  };

  return (
    <div className="appointment-view">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="mt6">
        <Col xs={24} xl={12}>
          <p>First name</p> <p className="title">{details.firstName}</p>
        </Col>
        <Col xs={24} xl={12}>
          <p>Last name </p> <p className="title">{details.lastName}</p>
        </Col>
        <Col xs={24} xl={12}>
          <p>Email </p>
          <p className="title">{details.email}</p>
        </Col>
        <Col xs={24} xl={12}>
          <p>Phone </p> <p className="title"> {details.phone}</p>
        </Col>
      </Row>

      <Formik
        enableReinitialize={true}
        initialValues={{
          appointment_end: moment(props.view.appointment_end).format('YYYY-MM-DD hh:mm a'),
          appointment_for: props.view.appointment_for,
          appointment_start:moment(props.view.appointment_start).format('YYYY-MM-DD hh:mm a'),
          charge: props.view.charge,
          comment: props.view.comment,

        }}
        //validationSchema={ProviderCreationSchema}
        onSubmit={handleFormSubmission}
      >
        {({ handleSubmit, touched, errors, isSubmitting }) => (
          <Form className="login__form" handleSubmit={handleSubmit}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xs={24} xl={12}>
                <p>Payment Status</p>
                <Select
                  defaultValue={props.view.payment_status}
                  style={{ width: 120 }}
                  onChange={e => setPaymentStatus(e)}
                  className={props.view.payment_status}
                >
                  <Select.Option className={'pending'} value="pending">
                    Pending
                  </Select.Option>
                  <Select.Option className={'failed'} value="failed">
                    Failed
                  </Select.Option>
                  <Select.Option className={'paid'} value="paid">
                    Paid
                  </Select.Option>
                  <Select.Option className={'requested'} value="requested">
                    Requested
                  </Select.Option>
                  <Select.Option className={'manually_paid'} value="manually_paid">
                    Manually Paid
                  </Select.Option>
                </Select>
              </Col>

              <Col xs={24} xl={12}>
                <p>Status</p>
                <Select
                  defaultValue={props.view.status}
                  style={{ width: 120 }}
                  className={props.view.status}
                  onChange={e => setStatus(e)}
                >
                  <Select.Option className={'pending'} value="pending">
                    Pending
                  </Select.Option>
                  <Select.Option className={'confirmed'} value="confirmed">
                    Confirmed
                  </Select.Option>
                  <Select.Option className={'cancelled'} value="cancelled">
                    Cancelled
                  </Select.Option>
                  <Select.Option className={'completed'} value="completed">
                    Completed
                  </Select.Option>
                </Select>
              </Col>

              <Col xs={24} xl={12}>
                <p>Appoinment Start</p>
                <DatePicker
                  showTime
                  //onChange={onChange}
                  //onOk={onOk}
                  name="appointment_start"
                  placeholder="Start Date"
                  format="YYYY-MM-DD hh:mm a"
                />
              </Col>

              <Col xs={24} xl={12}>
                <p>Appoinment End</p>
                <DatePicker
                  showTime
                  //onChange={onChange}
                  //onOk={onOk}
                  format="YYYY-MM-DD hh:mm a"
                  name="appointment_end"
                  placeholder="End Date"
                />
              </Col>
              <Col xs={24} xl={12}>
                <p>Charge</p>
               <Field
               component={TextField}
               name='charge'
               />
              </Col>
              <Col xs={24} xl={12}>
                <p>Comment</p>
               <Field
               component={TextField}
               name='comment'
               />
              </Col>
            </Row>

            <Button
              htmlType="submit"
              disabled={isSubmitting}
              className="view-button button-square mt-5"
            >
              {' Edit a Appointment'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>

    // <div> <span style={{color:"red"}}> Sorry! </span> Currently, this feature is not available</div>
  );
};

export default AppointmentEdit;
