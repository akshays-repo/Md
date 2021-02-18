import React from 'react';
import { Col } from 'antd';

import { Field } from 'formik';
import { DatePicker} from 'formik-antd'
import { TextField, Select as MatSelect } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
export const generateForm = formField => {
  return formField.map((values, index) => {
    switch (values.type) {
      case 'text':
        return (
          <Col key={index} xs={24} xl={12}>
            <label>{values.label}</label>
            <p>
            {/* <Field  style={{ width: '90%' }} component={TextField} name={values.name} placeholder="" type="text"></Field> */}
              <Field  component={TextField} name={values.name} placeholder="" type="text"></Field>
            </p>
          </Col>
        );
        case 'email':
          return (
            <Col key={index} xs={24} xl={12}>
              <label>{values.label}</label>
              <p>
              {/* <Field  style={{ width: '90%' }} component={TextField} name={values.name} placeholder="" type="text"></Field> */}
                <Field  component={TextField} name={values.name} placeholder="" type="email"></Field>
              </p>
            </Col>
          );
        case 'password':
          return (
            <Col key={index} xs={24} xl={12}>
              <label>{values.label}</label>
              <p>
              {/* <Field  style={{ width: '90%' }} component={TextField} name={values.name} placeholder="" type="text"></Field> */}
                <Field  component={TextField} name={values.name} placeholder="" type="password"></Field>
              </p>
            </Col>
          );
      case 'select':
        return (
          <Col key={index} xs={24} xl={12}>
            <label>{values.label}</label>
            <p>
              <Field
                // style={{ width: '90%' }}
                component={MatSelect}
                name={values.name}
                placeholder=""
                type="text"
              >
                {values.options.map((result, i) => {
                  return (
                    <MenuItem  key={i} value={result.value}>
                      {result.name}
                    </MenuItem>
                  );
                })}
              </Field>
            </p>
          </Col>
        );
      case 'datepicker':
        return (
          <Col key={index} xs={24} xl={12}>
            <label>{values.label}</label>
            <p>
            <Field
                // style={{ width: '90%' }}
                component={TextField}
                name={values.name}
                placeholder=""
                type="date"
              ></Field>
            </p>
          </Col>
        );
    }
  });
};
