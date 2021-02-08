import React, { useEffect, useState } from 'react';

export const AppointmentFor = props => {
  return (
    <div>
      <p>Are you scheduling this appointment for you, or someone else? </p>
      <p
        style={{
          backgroundColor: '#EDEEEE',
          fontWeight: 500,
          color: 'black',
          padding: '7px 10px',
          borderRadius: 5,
          cursor: 'pointer',
        }}
        onClick={() => {
          props.setFieldValue('appointment_for', 'me');
        }}
      >
        Scheduling for me
      </p>
      <p
        style={{
          backgroundColor: '#EDEEEE',
          fontWeight: 500,
          color: 'black',
          padding: '7px 10px',
          borderRadius: 5,
          cursor: 'pointer',
        }}
        onClick={() => {
          props.setFieldValue('appointment_type', 'other');
        }}
      >
        Scheduling for Someone Else
      </p>
    </div>
  );
};
