import React, { useState } from 'react';
import { Row, Col, Divider, Select, DatePicker as D, Button, Modal } from 'antd';
import { TextField } from '@material-ui/core';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { DatePicker } from 'formik-antd';
import moment from 'moment';
import { NewAppointmentSchema } from '_utils/Schemas';
import Avatar from 'antd/lib/avatar/avatar';
export const BookingEdit = props => {
  const { modal, setModal } = props;

  const [activeStatus, setActiveStatus] = useState('');
  const status = [
    { label: 'Cancelled', icon: 'fa fa-times', value: 'cancelled', backgroundColor: '#FFC76A' },
    { label: 'Pending', icon: 'fa fa-history', value: 'pending', backgroundColor: '#858A8E' },
    { label: 'Checked in', icon: 'fa fa-check', value: 'completed', backgroundColor: '#00CBE6' },
    { label: 'Paid', icon: 'fa fa-credit-card', value: 'paid', backgroundColor: '#00CBE6' },
  ];

  const [initialValues, setinitialValues] = useState({
    appointment_start: moment().format('YYYY-MM-DD hh:mm a'),
    provider_id: '',
    appointment_end: moment().format('YYYY-MM-DD hh:mm a'),
    comment: '',
    patient_id: '',
  });
  return (
    <Modal
      className="calendar__modal"
      onCancel={() => setModal(false)}
      visible={modal}
      footer={false}
      width={600}
    >
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={values => console.log('Form submission', JSON.stringify(values, null, 2))}
        validationSchema={NewAppointmentSchema}
      >
        {({ isValid, handleSubmit, values, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            {/* {JSON.stringify(values, null, 2)} */}
            <Row className="calendar__newappointment">
              <Col span={24} style={{ height: 100 }}>
                <Row align={'middle'}>
                  <Col span={5} offset={2}>
                    <Avatar
                      style={{ width: 80, height: 80 }}
                      shape="circle"
                      src={'https://storage.googleapis.com/nexassets/app/img/icon/avatar.svg'}
                    ></Avatar>
                  </Col>
                  <Col style={{ fontSize: 18 }} span={14}>
                    <b>Patients name</b>
                    's Appointment
                  </Col>
                </Row>
              </Col>

              <Col span={24}>
                <div className="newappointment__section2">
                  <div>
                    <p>PATIENT</p>
                    <p>NEW</p>
                  </div>
                  <div>
                    <p>BIRTHDAY</p>
                    <p>{moment().format('mm/dd/yy')}</p>
                  </div>
                  <div>
                    <p>EMAIL</p>
                    <p>shaileshkandel123@gmail.com</p>
                  </div>
                  <div>
                    <p>PHONE</p>
                    <p>9867784128</p>
                  </div>
                </div>
              </Col>
              <Divider style={{ margin: 10 }} />

              <Col span={24}>
                <div className="newappointment__section2">
                  <div>
                    <p>STATUS</p>
                    <p>
                      <Row justify="space-between">
                        {status.map((result, i) => {
                          return (
                            <Col>
                              <p
                                style={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: 35,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundColor:
                                    result.value === activeStatus
                                      ? result.backgroundColor
                                      : '#e0e2e2',
                                  color: '#858A8E',
                                  cursor: 'pointer',
                                }}
                              >
                                <i style={{ transform: 'scale(2)' }} className={result.icon}></i>
                              </p>
                              <label
                                style={{
                                  display: 'inline-block',
                                  width: '100%',
                                  textAlign: 'center',
                                }}
                              >
                                {result.label}
                              </label>
                            </Col>
                          );
                        })}
                      </Row>
                    </p>
                  </div>
                </div>
              </Col>
              <Divider style={{ margin: 10 }} />
              <Col span={24}>
                <div className="newappointment__section2">
                  <div>
                    <p>PROVIDER</p>
                    <p>Shailesh Kandel</p>
                  </div>
                  <div>
                    <p>STARTS</p>
                    <p>
                      <DatePicker
                        onChange={val =>
                          val &&
                          setFieldValue(
                            'appointment_start',
                            moment(val).format('YYYY-MM-DD hh:mm a'),
                          )
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
                  <div>
                    <p>LOCATION</p>
                    <p>BRANCH NAME</p>
                  </div>
                </div>
              </Col>
              <Divider />
              <Col span={24} offset={16}>
                <Button
                  htmlType="submit"
                  disabled={!isValid}
                  shape="round"
                  style={{ backgroundColor: '#FF596F', color: 'white' }}
                >
                  UPDATE APPOINTMENT
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
