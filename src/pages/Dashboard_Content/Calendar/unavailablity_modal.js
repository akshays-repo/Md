import React, { useState } from 'react';
import { Row, Col, Modal, Divider, Select, Button } from 'antd';
import { TextField } from '@material-ui/core';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { DatePicker } from 'formik-antd';
import moment from 'moment';
import { UnavailableSchema } from '_utils/Schemas';

export const UnavailableEdit = props => {
  const { modal, setModal } = props;
  const [initialValues, setinitialValues] = useState({
    appointment_start: moment().format('YYYY-MM-DD hh:mm a'),
    provider_id: '',
    appointment_end: moment().format('YYYY-MM-DD hh:mm a'),
    comment: '',
  });
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
        onSubmit={values => console.log('Form submission', JSON.stringify(values, null, 2))}
        validationSchema={UnavailableSchema}
      >
        {({ isValid, handleSubmit, values, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="calendar__newappointment">
              <Col span={24} style={{ height: 50 }}>
                <p className="newappointment__section1">Edit unavailability slot</p>
              </Col>
              <Divider />
              <Col span={24}>
                <div className="newappointment__section2">
                  <div>
                    <p>BRANCH</p>
                    <p>
                      <Select
                        mode="multiple"
                        showSearch
                        value={values.arrBranchId}
                        onChange={val => val && setFieldValue('arrBranchId', val)}
                        style={{ width: '90%' }}
                        bordered={false}
                        placeholder="Choose Branch"
                      >
                        {props.branch.map((result, i) => (
                          <Select.Option key={result.id} values={result.id}>
                            {result.fullName}
                          </Select.Option>
                        ))}
                      </Select>
                      <ErrorMessage
                        render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                        name="arrBranchId"
                      />
                    </p>
                  </div>
                  <div>
                    <p>PROVIDER</p>
                    <p>
                      <Select
                        showSearch
                        onChange={val => val && setFieldValue('provider_id', val)}
                        style={{ width: '90%' }}
                        bordered={false}
                        placeholder="Choose Provider"
                      >
                        {props.provider.map((result, i) => (
                          <Select.Option key={result.id} values={result.id}>
                            {result.fullName}
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
                          val &&
                          setFieldValue(
                            'appointment_start',
                            moment(val).format('YYYY-MM-DD hh:mm a'),
                          )
                        }
                        name="appointment_start"
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
                          val &&
                          setFieldValue('appointment_end', moment(val).format('YYYY-MM-DD hh:mm a'))
                        }
                        style={{ width: '60%' }}
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
              <Col span={14}>
                <Button
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
                  shape="round"
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
