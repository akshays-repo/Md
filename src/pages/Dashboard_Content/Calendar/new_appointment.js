import React, { useState } from 'react';
import { Row, Col, Divider, Select, DatePicker as D, Button, message } from 'antd';
// import { TextField } from '@material-ui/core';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { DatePicker } from 'formik-antd';
import { TextField } from 'formik-material-ui';

import moment from 'moment';
import { NewAppointmentSchema } from '_utils/Schemas';
export const NewAppointment = props => {
  const { starttime, endtime } = props;
  const initialValues = {
    appointment_start: moment(starttime).format('YYYY-MM-DD hh:mm:ss'),
    appointment_type_id: null,
    provider_id: null,
    appointment_end: moment(endtime).format('YYYY-MM-DD hh:mm:ss'),
    comment: null,
    patiant_id: null,
    branch_id: null,
    hospital_id: Number(localStorage.getItem('hospital_id')),
    appointment_start_dummy: moment(starttime).format('YYYY-MM-DD hh:mm a'),
    appointment_end_dummy: moment(endtime).format('YYYY-MM-DD hh:mm a'),
    appointment_for: 'me',
    charge: 0,
    response: [],
    patiantStatus: 'active',
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    const getPatientDetails = props.patient.filter(result => result.id == values.patiant_id);
    const { id, createdAt, updatedAt, deletedAt, ...rest } = getPatientDetails[0];
    const response = await props.createAppointment(JSON.stringify({ ...values, ...rest }));
    if (response.type === 'FETCH_ERROR') {
      setSubmitting(false);
    } else {
      setSubmitting(false);
      message.success('Appointment created successfully');
      resetForm();
      props.setModal(false);
    }
  };
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={NewAppointmentSchema}
    >
      {({ isValid, handleSubmit, values, setFieldValue, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Row className="calendar__newappointment">
            <Col span={24} style={{ height: 50 }}>
              <p className="newappointment__section1">New Appointment</p>
            </Col>
            <Divider />
            <Col span={24}>
              <div className="newappointment__section2">
                <div>
                  <p>APPOINTMENT TYPE</p>
                  <p>
                    <Select
                      showSearch
                      value={values.appointment_type_id}
                      onChange={val => {
                        setFieldValue('branch_id', null);
                        setFieldValue('provider_id', null);
                        props.fetchBranch();
                        val && setFieldValue('appointment_type_id', val);
                      }}
                      style={{ width: '90%' }}
                      bordered={false}
                      placeholder="Please select appointment type"
                    >
                      {props.appointment_type.map((result, i) => (
                        <Select.Option key={result.id} value={result.id}>
                          {result.name}
                        </Select.Option>
                      ))}
                    </Select>
                    <ErrorMessage
                      render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                      name="appointment_type_id"
                    />
                  </p>
                </div>
                <div>
                  <p>BRANCH</p>
                  <p>
                    <Select
                      showSearch
                      value={values.branch_id}
                      onChange={val => {
                        setFieldValue('provider_id', null);
                        props.fetchAppointmentBranchProvider({
                          type_id: values.appointment_type_id,
                          branch_id: val,
                        });
                        val && setFieldValue('branch_id', val);
                      }}
                      style={{ width: '90%' }}
                      bordered={false}
                      placeholder="Please select branch"
                    >
                      {props.branch.map((result, i) => (
                        <Select.Option key={result.id} value={result.id}>
                          {result.fullName}
                        </Select.Option>
                      ))}
                    </Select>
                    <ErrorMessage
                      render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                      name="branch_id"
                    />
                  </p>
                </div>

                <div>
                  <p>PROVIDER</p>
                  <p>
                    <Select
                      value={values.provider_id}
                      showSearch
                      onChange={val => {
                        setFieldValue('provider_id', val);
                      }}
                      style={{ width: '90%' }}
                      bordered={false}
                      placeholder="Please select provider"
                    >
                      {props.provider.map((result, i) => (
                        <Select.Option key={result.id} value={result.id}>
                          {result.fullName || result.provider?.fullName || 'Name not found'}
                        </Select.Option>
                      ))}
                    </Select>
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
                        val
                          ? setFieldValue(
                              'appointment_start',
                              moment(val).format('YYYY-MM-DD hh:mm:ss'),
                            )
                          : setFieldValue('appointment_start', '')
                      }
                      name="appointment_start_dummy"
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
                        val
                          ? setFieldValue(
                              'appointment_end',
                              moment(val).format('YYYY-MM-DD hh:mm:ss'),
                            )
                          : setFieldValue('appointment_end', '')
                      }
                      style={{ width: '50%' }}
                      name="appointment_end_dummy"
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
                    <Field
                      disabled={false}
                      component={TextField}
                      name="comment"
                      placeholder="Enter a note or details about the appointment"
                      type="text"
                      style={{ fontSize: 12 }}
                    ></Field>
                  </p>
                </div>
              </div>
            </Col>
            <Divider />
            <Col span={24}>
              <div className="newappointment__section3">
                <div>
                  <p>CHOOSE PATIENT</p>
                  <p>
                    <p>
                      <Select
                        bordered="false"
                        style={{ width: '100%' }}
                        placeholder="Type Patient name"
                        showSearch
                        value={values.patiant_id}
                        showArrow={false}
                        onChange={val => {
                          setFieldValue('patiant_id', val);
                        }}
                      >
                        {props.patient.map((result, i) => (
                          <Select.Option key={result.id} value={result.id}>
                            {result.firstName + ' ' + result.lastName}
                          </Select.Option>
                        ))}
                      </Select>
                    </p>
                    <ErrorMessage
                      render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                      name="patiant_id"
                    />
                  </p>
                </div>
              </div>
            </Col>
            <Col span={24} offset={20}>
              <Button className="view-button"
                htmlType="submit"
                disabled={isSubmitting}
                shape="round"
                style={{ backgroundColor: '#FF596F', color: 'white' }}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};
