import React, { useState, useEffect, useRef } from 'react';
import { Col, Row, Select, Button, Input, Switch, Space } from 'antd';
import { Scheduling } from './schedulingSection';
import { Formik, FieldArray, Field, Form } from 'formik';
import { SchedulingSchema } from '../../../_utils/Schemas';
import { connect } from 'react-redux';
import { store } from '../../../reducers/configureStore';

import { actionCreator } from '../../../reducers/actionCreator';

const AddAppointmentTime = props => {
  const innerForm = useRef(null);

  useEffect(() => {
    props.fetchSchedule({ id: props.id });
  }, [props.changed]);

  const handleFormSubmission = async values => {
    try {
      const provider_id = values.provider_id;
      const formData = values.formData.map((result, i) => {
        if (result.type !== 'custom') {
          delete result.unit;
          delete result.frequency;
        }
        if (result.provider_id) {
          delete result.provider_id;
        }
        return result;
      });
      if (values.arrDelete.length > 0) {
        const arrDelete = values.arrDelete;
        values = JSON.stringify({ formData: formData, provider_id, arrDelete });
        props.addSchedule(values);
      } else {
        values = JSON.stringify({ formData: formData, provider_id });
        props.addSchedule(values);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const addAppointment = () => {
    innerForm.current.setFieldValue('formData', [
      ...innerForm.current.values.formData,
      { type: 'daily', FromTime: '09:00 AM', ToTime: '05:20 PM', frequency: null, unit: null },
    ]);
  };

  const deleteAppointment = index => {
    const getId = innerForm.current.values.formData.filter((val, i) => i == index);

    const getData = innerForm.current.values.formData.filter((val, i) => i != index);
    innerForm.current.setFieldValue('formData', getData);
    if (getId[0].id) {
      innerForm.current.setFieldValue('arrDelete', [
        ...innerForm.current.values.arrDelete,
        getId[0].id,
      ]);
    }
  };

  return (
    <div className="appointment-time">
      <div className="header">
        <button onClick={addAppointment}>Add New</button>
      </div>
      <Formik
        innerRef={innerForm}
        enableReinitialize={true}
        // onSubmit={values => alert(JSON.stringify(values, null, 2))}
        onSubmit={handleFormSubmission}
        initialValues={{
          provider_id: props.id,
          arrDelete: [],
          formData: props.schedule ? props.schedule : [],
        }}
        validationSchema={SchedulingSchema}
      >
        {({ values, handleSubmit, setValues, errors, touched, setFieldValue }) => {
          return (
            <Form onSubmit={handleSubmit}>
              {values.formData?.map((value, index) => (
                <Space>
                  <Scheduling
                    values={values.formData}
                    setFieldValue={setFieldValue}
                    setValues={setValues}
                    index={index}
                    errors={errors}
                    touched={touched}
                  />
                  <button
                    onClick={() => deleteAppointment(index)}
                    style={{
                      cursor: 'pointer',
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                    }}
                  >
                    <i className="fa fa-trash" style={{ color: 'red' }}></i>
                  </button>
                </Space>
              ))}
              <div style={{ textAlign: 'center', marginTop: 20 }}>
                <Space>
                  <Button htmlType="submit">Save</Button>
                  <Button type="default">Cancel</Button>
                </Space>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStoreToProps = ({ Schedule }) => {
  return {
    schedule: Schedule.payload,
    modal: Schedule.modal,
    changed: Schedule.changed,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchSchedule: id =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_SCHEDULE', ...id })),
  addSchedule: values =>
    dispatch(
      actionCreator({
        method: 'POST',
        contentType: 'JSON',
        action_type: 'CREATE_SCHEDULE',
        values,
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(AddAppointmentTime);
