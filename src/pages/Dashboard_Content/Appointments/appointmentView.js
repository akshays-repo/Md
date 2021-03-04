import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment'

const AppointmentView = props => {
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
  });
  //let email =details.email.toLowerCase()

  console.log("alskdjh",details.email?.toLowerCase())
  return (
    <div className="appointment-view">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="mt6">
        <Col xs={24} xl={12}>
          <p>First name</p> <p className="title"> {details.firstName}</p>
        </Col>
        <Col xs={24} xl={12}>
          <p>Last name </p> <p className="title">{details.lastName}</p>
        </Col>
        <Col xs={24} xl={12}>
          <p>Email </p>
          <p style={{ textTransform: 'lowercase' }}  className="title">{details.email}</p>
        </Col>
        <Col xs={24} xl={12}>
          <p>Phone </p> <p className="title"> {details.phone}</p>
        </Col>
        {/* <p>ADDRESS : {patientDetails.address}</p> */}

        <Col xs={24} xl={12}>
          <p>Appointment for </p> <p className="title"> {details.appointment_for}</p>
        </Col>
        <Col xs={24} xl={12}>
          <p>Appointment Type </p> <p className="title">{appointmentType?.name}</p>
        </Col>
        <Col xs={24} xl={12}>
          <p>Appointment Created</p> <p className="title">
         { moment(details.appointment_created).format('MMM Do YY, h:mm a')}</p>
        </Col>
        <Col xs={24} xl={12}>
          <p>Appointment Start </p> <p className="title"> {details.appointment_start}</p>
        </Col>
        <Col xs={24} xl={12}>
          <p>Appointment Time slot </p>
          <p className="title"> {appointmentType?.time_slot} minutes</p>
        </Col>
        <Col xs={24} xl={12}>
          <p>Payment Status </p> <p className="title">{details.payment_status}</p>
        </Col>
        <Col xs={24} xl={12}>
          <p>Status </p> <p className="title"> {details.status}</p>
        </Col>
        <Col xs={24} xl={12}>
          <p>Branch </p> <p className="title">{branchDetails.fullName}</p>
        </Col>
        <Col xs={24} xl={12}>
          <p>Branch Email </p> <p className="title"> {branchDetails.email?.toLowerCase()}</p>
        </Col>
        <Col xs={24} xl={12}>
          <p>Branch Address </p> <p className="title"> {branchDetails.address}</p>
        </Col>
        <Col xs={24} xl={24}>
          <p>Comment </p> <p className="title">{details.comment}</p>
        </Col>
      </Row>

      <div className="responseBox">
        <h5> Response</h5>
        {response?.map(res => (
          <div className="responseBg">
            <p className="question">{res.Key_name}</p>
            <p>
              {res?.answer?.map(answer => (
                <p>{answer}</p>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentView;
