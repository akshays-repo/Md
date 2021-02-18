import React, { useState } from 'react';
import { Row, Col, Modal, Divider, Select, Button } from 'antd';
import { TextField } from '@material-ui/core';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { DatePicker } from 'formik-antd';
import moment from 'moment';
// import { TextField } from 'formik-material-ui';
import { UnavailableSchema } from '_utils/Schemas';

export const UnavailableEdit = props => {
  const { modal, setModal, unavailableDetails } = props;
  const initialValues = {
    ...unavailableDetails,
    appointment_start: moment(unavailableDetails.appointment_start).format('YYYY-MM-DD hh:mm:ss'),
    appointment_end: moment(unavailableDetails.appointment_end).format('YYYY-MM-DD hh:mm:ss'),
    appointment_start_dummy: moment(unavailableDetails.appointment_start).format(
      'YYYY-MM-DD hh:mm a',
    ),
    appointment_end_dummy: moment(unavailableDetails.appointment_end).format('YYYY-MM-DD hh:mm a'),
  };
  const deleteUnavailable = async id => {
    alert(unavailableDetails.id);
    const response = await props.deleteUnavailable(unavailableDetails.id);
    if (response.type !== 'FETCH_ERROR') props.setModal(false);
  };

  const handleSubmit = async (
    {
      provider,
      unavailable_and_branches,
      name,
      appointment_start_dummy,
      appointment_end_dummy,
      ...values
    },
    { resetForm, setSubmitting },
  ) => {
    setSubmitting(true);
    const response = await props.editUnavailable(unavailableDetails.id, JSON.stringify(values));
    if (response.type === 'FETCH_ERROR') {
      setSubmitting(false);
      console.log('Error occured');
    } else {
      setSubmitting(false);
      props.setModal(false);
    }
  };
  return (
    <Modal
      className="calendar__modal"
      onCancel={() => setModal(false)}
      visible={modal}
      footer={false}
      //   width={600}
    >
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={UnavailableSchema}
      >
        {({ isValid, handleSubmit, values, isSubmitting, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="calendar__newappointment">
              <Col span={24} style={{ height: 50 }}>
                <p className="newappointment__section1">Edit unavailability slot</p>
              </Col>
              <Divider />
              <Col span={24}>
                <div className="newappointment__section2">
                  <div>
                    <p>PROVIDER</p>
                    <p>
                      <Select
                        showSearch
                        value={values.provider_id ? values.provider_id : null}
                        onChange={val => {
                          setFieldValue('arrBranchId', []);
                          val && setFieldValue('provider_id', val);
                        }}
                        style={{ width: '90%' }}
                        bordered={false}
                        placeholder="Choose Provider"
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
                    <p>BRANCH</p>
                    <p>
                      <Select
                        mode="multiple"
                        showSearch
                        value={values.arrBranchId}
                        onChange={val => {
                          val && setFieldValue('arrBranchId', val);
                        }}
                        style={{ width: '90%' }}
                        bordered={false}
                        placeholder="Choose Branch"
                      >
                        {values.provider_id &&
                          props.provider
                            .filter(re => re.id === values.provider_id)
                            .map(re =>
                              re.provider_and_branches.map((result, i) => (
                                <Select.Option key={result.id} value={result.id}>
                                  {result.branch.fullName}
                                </Select.Option>
                              )),
                            )}
                      </Select>
                      <ErrorMessage
                        render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                        name="arrBranchId"
                      />
                    </p>
                  </div>
                  <div>
                    <p>STARTS</p>
                    <p>
                      <DatePicker
                        onChange={val => {
                          console.log('Start date', val);
                          val
                            ? setFieldValue(
                                'appointment_start',
                                moment(val).format('YYYY-MM-DD hh:mm:ss'),
                              )
                            : setFieldValue('appointment_start', '');
                        }}
                        name="appointment_start_dummy"
                        format="YYYY-MM-DD hh:mm a"
                        style={{ width: '60%' }}
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
                        style={{ width: '60%' }}
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
                      <TextField
                        name="response"
                        placeholder="Enter a note or details about the appointment"
                        onChange={e =>
                          e.target.value
                            ? setFieldValue('note', e.target.value)
                            : setFieldValue('note', '')
                        }
                        value={values.note}
                        type="text"
                        style={{ fontSize: 12 }}
                      ></TextField>
                    </p>
                  </div>
                </div>
              </Col>
              <Divider />
              <Col span={14}>
                <Button
                  onClick={() => deleteUnavailable(unavailableDetails.id)}
                  htmlType="button"
                  shape="round"
                  style={{
                    backgroundColor: '#D7D9DC',
                    color: 'black',
                    padding: '10px 20px',
                    height: 40,
                  }}
                >
                  CANCEL UNAVAILABILITY
                </Button>
              </Col>
              <Col span={10}>
                <Button
                  htmlType="submit"
                  shape="round"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: '#FF596F',
                    height: 40,
                    padding: '10px 20px',
                    color: 'white',
                  }}
                >
                  UPDATE UNAVAILABILITY
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
