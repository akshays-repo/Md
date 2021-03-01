import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { OnlineBookingSchema } from '_utils/Schemas';
import { useParams } from 'react-router';
import {
  message,
  Button,
  Row,
  Col,
  Checkbox,
  Select,
  DatePicker,
  Space,
  InputNumber,
  Divider,
} from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from '../../reducers/actionCreator';
import { generateForm } from '_utils/formgenerator';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import { store } from '../../reducers/configureStore';

import { Link } from 'react-router-dom';

export const PatientDetails = props => {
  const [customFormField, setCustomFormField] = useState([]);

  const resetOnlinBooking = () => {
    store.dispatch({ type: 'EMPTY_PROVIDER' });
    store.dispatch({ type: 'EMPTY_SCHEDULE' });
    props.resetForm();
  };

  const formField = [
    {
      label: 'Firstname *',
      name: 'firstName',
      type: 'text',
    },
    {
      label: 'Lastname *',
      name: 'lastName',
      type: 'text',
    },

    {
      label: 'Email *',
      name: 'email',
      type: 'text',
    },
    {
      label: 'Phone no. *',
      name: 'phone',
      type: 'text',
    },
    {
      label: 'Address *',
      name: 'address',
      type: 'text',
    },
    {
      label: 'Zipcode *',
      name: 'zipcode',
      type: 'text',
    },
    {
      label: 'Date of Birth *',
      name: 'dob',
      type: 'datepicker',
    },
    {
      label: 'Gender *',
      name: 'gender',
      type: 'select',
      options: [
        { value: 'male', name: 'Male' },
        { value: 'female', name: 'Female' },
        { value: 'other', name: 'Other' },
      ],
    },
    {
      label: 'Comments or Special Request (Optional)',
      name: 'comment',
      type: 'text',
    },
  ];

  const handleChange = (e, index) => {
    let items = { ...customFormField };
    let item = items[index];
    item.answer = [e];
    items[index] = item;

    props.setFieldValue(`response.${index}`, item);
  };

  const handleChangeText = (e, index) => {
    let items = { ...customFormField };
    let item = items[index];
    item.answer = [e.target.value];
    items[index] = item;
    props.setFieldValue(`response.${index}`, item);
  };

  useEffect(() => {
    const fetchForm = async () => {
      if (customFormField?.length === 0) {
        await props.fetchCustomForm(props.id);
        setCustomFormField(props.CustomForm.custom_form);
      }
    };
    fetchForm();
  }, []);
  return (
    <>
      {' '}
      <span
        onClick={resetOnlinBooking}
        style={{ padding: 5, cursor: 'pointer', display: 'inline-block' }}
      >
        <i className="fa fa-arrow-left"></i>&nbsp;Change your appointment details
      </span>
      <h3>Please enter your exact information</h3> <Divider />
      <div className="">
        <Row gutter={16} className="pt5"> {generateForm(formField)} </Row>
      </div>{' '}
      <Row>
      <Col xs={24} xl={12}>
      {customFormField?.map((forms, index) => (
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
            <div>
              {' '}
              <p>
                {forms.Key_name}
                {forms.required ? ' * (required) ' : ''}
              </p>
              <Select
                required={forms.required}
                onChange={e => handleChange(e, index)}
                style={{ width: 170 }}
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
                onChange={e => handleChange(e, index)}
                format={'YYYY/MM'}
                style={{ width: 170 }}
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
                style={{ width: 170 }}
              />
              <p></p>
            </div>
          ) : (
            ''
          )}

        </div>
                
      ))}
        </Col>
                  </Row>
    </>
  );
};
