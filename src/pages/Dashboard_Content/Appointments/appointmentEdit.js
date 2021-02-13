import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { ProviderCreationSchema } from '_utils/Schemas';
import { Button, Row, Select, Col, DatePicker } from 'antd';
import MenuItem from '@material-ui/core/MenuItem';
import { generateForm } from '../../../_utils/formgenerator';
import { getFormDataA } from '_utils';
import { store } from '../../../reducers/configureStore';
// import {Select} from 'formik-antd'
import { TextField } from '@material-ui/core';
import moment from 'moment'
const { Option } = Select;
const AppointmentEdit = props => {
  const [details, setDetails] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [branchDetails, setBranchDetails] = useState('');
  const [patientDetails, setPatientDetails] = useState('');
  const [response, setResponse] = useState([]);

  useEffect(() => {
    setDetails(props.view);
    setAppointmentType(props.view.appointment_type);
    setBranchDetails(props.view.branch);
    setResponse(props.view.response);
    setPatientDetails(props.view.patiant);
  } , []);

  useEffect(() => {
    console.log('jcxcxkcxcj', props.view);
  });

  const handleFormSubmission = async values => {
    console.log('asdkjhf', values);
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
        initialValues={
          props.values || {
            appointment_end: '',
            appointment_for: '',
            appointment_start: '',
            charge: '',
            comment: '',
            payment_status: '',
            status: '',
          }
        }
        //validationSchema={ProviderCreationSchema}
        onSubmit={handleFormSubmission}
      >
        {({ handleSubmit, touched, errors, isSubmitting }) => (
          <Form className="login__form" handleSubmit={handleSubmit}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>


              <Col xs={24} xl={12}>
              <p>Payment Status</p>
              <Select
                // defaultValue={record.payment_status}
                style={{ width: 120 }}
                // onChange={e => handleChangePaymentStatus(record.id, e)}
                //className={record.payment_status}
              >
                <Option className={'pending'} value="pending">
                  Pending
                </Option>
                <Option className={'failed'} value="failed">
                  Failed
                </Option>
                <Option className={'paid'} value="paid">
                  Paid
                </Option>
                <Option className={'requested'} value="requested">
                  Requested
                </Option>
                <Option className={'manually_paid'} value="manually_paid">
                  Manually Paid
                </Option>
              </Select>

                </Col>


                <Col xs={24} xl={12}>
                <p>Status</p>
            <Select
                //defaultValue={record.status}
                style={{ width: 120 }}
                //className={record.status}
                //onChange={e => handleChangeStatus(record.id, e)}
              >
                <Option className={'pending'} value="pending">
                  Pending
                </Option>
                <Option className={'confirmed'} value="confirmed">
                  Confirmed
                </Option>
                <Option className={'cancelled'} value="cancelled">
                  Cancelled
                </Option>
                <Option className={'completed'} value="completed">
                  Completed
                </Option>
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
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                }}
              />
              </Col>
             

                <Col xs={24} xl={12}>
                <p>Appoinment End</p>
                <DatePicker
                showTime
                //onChange={onChange}
                //onOk={onOk}
                name="appointment_end"
                placeholder="End Date"
              />
              </Col>
              <Col xs={24} xl={12}>
                <p>Comment</p>
                <TextField/>
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
