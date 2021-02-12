import React, { useEffect, useState } from 'react';

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
  return (
    <div className="appointment-view">
      <p>FIRST NAME : {details.firstName}</p>
      <p>LAST NAME : {details.lastName}</p>
      <p>EMAIL : {details.email}</p>
      <p>PHONE : {details.phone}</p>
      {/* <p>ADDRESS : {patientDetails.address}</p> */}
      <p>COMMENT : {details.comment}</p>
      <p>APPOINTMENT FOR : {details.appointment_for}</p>
      <p>APPOINTMENT TYPE : {appointmentType.name}</p>
      <p>APPOINTMENT CREATED : {details.appointment_created}</p>
      <p>APPOINTMENT START : {details.appointment_start}</p>
      <p>APPOINTMENT TIME SLOT: {appointmentType.time_slot} </p>
      <p>PAYMENT STATUS : {details.payment_status}</p>
      <p>STATUS : {details.status}</p>
      <p>BRANCH : {branchDetails.fullName}</p>
      <p>BRANCH EMAIL : {branchDetails.email}</p>
      <p>BRANCH ADDRESS : {branchDetails.address}</p>
      RESPONSE
      <div>
        {response.map(res => (
          <div>
            <p>{res.Key_name}</p>
            <p>
              {res.answer.map(answer => (
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

