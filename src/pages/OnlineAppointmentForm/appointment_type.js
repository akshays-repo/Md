import React, { useEffect, useState } from 'react';
import { actionCreator } from '../../reducers/actionCreator';
import { Form, Input, Select } from 'formik-antd';
import { connect } from 'react-redux';

export const AppointmentType = props => {
  return (
    <div>
      <p>What type of appointment would you like to schedule? </p>
      {props.appointment_type.map((result, i) => {
        return (
          <p className="typeAppointment"
            key={i}
            onClick={() => {
              props.setFieldValue('appointment_type_id', result.id);
              props.setFieldValue('appointment_type', result.name);
            }}
          
          >
            {result.name}
          </p>
        );
      })}
    </div>
  );
};
