import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Divider, Select, Button } from 'antd';
// import { TextField } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

import { Field, Form, Formik, ErrorMessage } from 'formik';
import { DatePicker } from 'formik-antd';
import moment from 'moment';
import { UnavailableSchema } from '_utils/Schemas';

export const UnavailableSlot = props => {
  const { starttime, endtime } = props;
  const [initialValues, setinitialValues] = useState({
    appointment_start: moment(starttime).format('YYYY-MM-DD hh:mm:ss'),
    provider_id: null,
    appointment_end: moment(endtime).format('YYYY-MM-DD hh:mm:ss'),
    note: null,
    arrBranchId: [],
    appointment_start_dummy: moment(starttime).format('YYYY-MM-DD hh:mm a'),
    appointment_end_dummy: moment(endtime).format('YYYY-MM-DD hh:mm a'),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    const response = await props.createUnavailable(JSON.stringify(values));
    if (response.type === 'FETCH_ERROR') {
      setSubmitting(false);
      console.log('Error occured');
    } else {
      setSubmitting(false);
      resetForm();
      props.setModal(false);
    }
  };

  useEffect(() => {
    props.fetchProvider();
  }, []);
  return (
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
                      {props.provider
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
                      name="note"
                      placeholder="Enter a note or details about the appointment"
                      type="text"
                      style={{ fontSize: 12 }}
                    ></Field>
                  </p>
                </div>
              </div>
            </Col>
            <Divider />
            <Col span={24} offset={20}>
              <Button
                htmlType="submit"
                shape="round"
                disabled={isSubmitting}
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
