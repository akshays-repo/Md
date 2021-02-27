import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Row, Col,} from 'antd';
import { DatePicker } from 'formik-antd';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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



  const handleFormSubmission = async values => {
     let contentType = 'JSON';
    await props.editAppointment(props.view.id , JSON.stringify(values),contentType)

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
          appointment_end: moment(props.view.appointment_end).format('YYYY-MM-DD hh:mm:ss'),
          appointment_for: props.view.appointment_for,
          appointment_start:moment(props.view.appointment_start).format('YYYY-MM-DD hh:mm:ss'),
          charge: props.view.charge,
          comment: props.view.comment,
          payment_status:paymentStatus,
          status:status,
          userTypeId:2,

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
                  style={{ width: '100%' }}
                  onChange={e => setPaymentStatus(e.target.value)}
                  className='matBorder select-underline' 
                >
                  <MenuItem className={'pending'} value="pending">
                    Pending
                  </MenuItem>
                  <MenuItem className={'failed'} value="failed">
                    Failed
                  </MenuItem>
                  <MenuItem className={'paid'} value="paid">
                    Paid
                  </MenuItem>
                  <MenuItem className={'requested'} value="requested">
                    Requested
                  </MenuItem>
                  <MenuItem className={'manually_paid'} value="manually_paid">
                    Manually Paid
                  </MenuItem>
                </Select>
              </Col>

              <Col xs={24} xl={12}>
                <p>Status</p>
                <Select 
                  defaultValue={props.view.status}
                  style={{ width: '100%' }}
                  className='matBorder select-underline' 
                  onChange={e => setStatus(e.target.value)}
                >
                  <MenuItem className={'pending'} value="pending">
                    Pending
                  </MenuItem>
                  <MenuItem className={'confirmed'} value="confirmed">
                    Confirmed
                  </MenuItem>
                  <MenuItem className={'cancelled'} value="cancelled">
                    Cancelled
                  </MenuItem>
                  <MenuItem className={'completed'} value="completed">
                    Completed
                  </MenuItem>
                </Select>
              </Col>

              <Col xs={24} xl={12}>
                <p>Appoinment Start</p>
                <DatePicker
                  style={{ width: '100%' }}
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
                  style={{ width: '100%' }}
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
              {' Edit an Appointment'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>

    // <div> <span style={{color:"red"}}> Sorry! </span> Currently, this feature is not available</div>
  );
};

export default AppointmentEdit;
