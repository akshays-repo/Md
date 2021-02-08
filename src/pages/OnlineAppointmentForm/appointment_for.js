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
      >
        Scheduling for Someone Else
      </p>
    </div>
  );
};
