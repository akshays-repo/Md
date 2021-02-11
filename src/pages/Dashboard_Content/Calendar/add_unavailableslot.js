import React, { useState } from 'react';
import { Row, Col, Divider, Select, Button } from 'antd';
import { TextField } from '@material-ui/core';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { DatePicker } from 'formik-antd';
import moment from 'moment';
import { UnavailableSchema } from '_utils/Schemas';

export const UnavailableSlot = props => {
  const [initialValues, setinitialValues] = useState({
    appointment_start: moment().format('YYYY-MM-DD hh:mm a'),
    provider_id: '',
    appointment_end: moment().format('YYYY-MM-DD hh:mm a'),
    comment: '',
  });
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={values => console.log('Form submission', JSON.stringify(values, null, 2))}
      validationSchema={UnavailableSchema}
    >
      {({ isValid, handleSubmit, values, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Row className="calendar__newappointment">
            <Col span={24} style={{ height: 50 }}>
              <p className="newappointment__section1">Add temporary unavailability slot</p>
            </Col>
            <Divider />
            <Col span={24}>
              <div className="newappointment__section2">
                <div>
                  <p>PROVIDER</p>
                  <p>
                    <Select
                      showSearch
                      onChange={val => val && setFieldValue('provider_id', val)}
                      style={{ width: '90%' }}
                      bordered={false}
                      placeholder="Choose Provider"
                    ></Select>
                    <ErrorMessage
                      render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                      name="provider_id"
                    />
                  </p>
                </div>
                <div>
                  <p>STARTS</p>
                  <p>
                    <DatePicker
                      onChange={val =>
                        val &&
                        setFieldValue('appointment_start', moment(val).format('YYYY-MM-DD hh:mm a'))
                      }
                      name="appointment_start"
                      format="YYYY-MM-DD hh:mm a"
                      style={{ width: '50%' }}
                      showTime
                    />
                    <ErrorMessage
                      render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                      name="appointment_start"
                    />
                  </p>
                </div>
                <div>
                  <p>ENDS</p>
                  <p>
                    <DatePicker
                      onChange={val =>
                        val &&
                        setFieldValue('appointment_end', moment(val).format('YYYY-MM-DD hh:mm a'))
                      }
                      style={{ width: '50%' }}
                      name="appointment_end"
                      format="YYYY-MM-DD hh:mm a"
                      showTime
                    />
                    <ErrorMessage
                      render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                      name="appointment_end"
                    />
                  </p>
                </div>
                <div>
                  <p>NOTES</p>
                  <p>
                    <TextField
                      name="custom"
                      placeholder="Enter a note or details about the appointment"
                      style={{ fontSize: 12 }}
                    ></TextField>
                  </p>
                </div>
              </div>
            </Col>
            <Divider />
            <Col span={24} offset={20}>
              <Button shape="round" style={{ backgroundColor: '#FF596F', color: 'white' }}>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};
