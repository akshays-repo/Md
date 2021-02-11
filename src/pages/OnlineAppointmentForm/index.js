import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { OnlineBookingSchema } from '_utils/Schemas';
import { useParams, Redirect } from 'react-router';
import { message, Button, Row, Col, Checkbox, Select, DatePicker, Space, InputNumber } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from '../../reducers/actionCreator';
import { generateForm } from '_utils/formgenerator';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import { Result, Modal } from 'antd';
import { AppointmentType } from './appointment_type';
import BranchProvider from './branch_provider';
import { AppointmentFor } from './appointment_for';
import { PatientDetails } from './patient_details';

const OnllineAppointmentForm = props => {
  const [customFormField, setCustomFormField] = useState([]);
  const [hospitalExist, setHospitalExist] = useState(false);
  const [loading, setloading] = useState(true);

  console.log('Props', props);
  const handleFormSubmission = async values => {
    let contentType = 'JSON';
    const response = await props.createOnlineForm(JSON.stringify({ ...values }), contentType);
    console.log('MessageResponse', response);
    if (response.error === '') {
      success();
      innerForm.current.reset();
    } else {
      console.log('Error');
    }
  };

  useEffect(() => {
    const fetchForm = async () => {
      if (customFormField?.length === 0) {
        await props.fetchCustomForm(props.match.params.id);
        setCustomFormField(props.CustomForm.custom_form);
      }
    };
    fetchForm();
  }, []);

  useEffect(() => {
    props.fetchAppointmentType({ hospitalId: props.match.params.id });
  }, []);

  useEffect(() => {
    props.fetchHospital({ userTypeId: 2, page: 1, limit: 200 });
  }, []);

  useEffect(() => {
    props.fetchBranch({ hospitalId: props.match.params.id, page: 1, limit: 50 });
  }, []);

  useEffect(() => {
    console.log('HS', props.hospital);
    if (props.hospital.count > 0) {
      if (
        props.hospital.users.filter(result => result.hospitalId == props.match.params.id).length > 0
      ) {
        console.log('Exist');
        setloading(false);
        setHospitalExist(true);
      } else {
        console.log('Doesnot Exist');
        setloading(false);
        setHospitalExist(false);
      }
    }
  }, [props.hospital]);
  const [loadings, setLoadings] = useState(false);
  const innerForm = useRef();
  const { id } = useParams();

  const resultSucess = (
    <Result status="success" title="Successfully Booked the Appoinment" subTitle="Thank you" />
  );

  const onOkay = () => {
    window.location.href = window.location.pathname;
  };

  const success = () => {
    Modal.success({
      content: resultSucess,
      onOk: onOkay,
    });
  };
  // if (props.hospital.filter(res => res.hospitalId == props.match.params.id).length === 0) {
  //   return <Redirect to="/404"></Redirect>;
  // }
  if (!loading && !hospitalExist) {
    return <Redirect to="/404"></Redirect>;
  }
  return (
    hospitalExist && (
      <div className="onlinebookWrapper">
        <div className="login-page">
          <Formik
            enableReinitialize={true}
            initialValues={{
              hospital_id: id,
              branch_id: '',
              provider_id: '',
              appointment_type_id: '',
              appointment_for: '',
              appointment_start: '',
              charge: 0,
              firstName: '',
              lastName: '',
              email: '',
              patiantStatus: 'active',
              phone: '',
              zipcode: '',
              dob: '',
              gender: '',
              userTypeId: 5,
              address: '',
              comment: '',
              response: props.CustomForm.custom_form.length > 0 ? props.CustomForm.custom_form : [],
            }}
            onSubmit={handleFormSubmission}
            innerRef={innerForm}
            validationSchema={OnlineBookingSchema}
          >
            {({
              handleSubmit,
              values,
              setFieldValue,
              touched,
              errors,
              isSubmitting,
              resetForm,
            }) => (
              <Form className="" handleSubmit={handleSubmit}>
                {!values.appointment_type_id && (
                  <AppointmentType
                    setFieldValue={setFieldValue}
                    appointment_type={props.appointment_type}
                  />
                )}

                {/* {JSON.stringify(values, null, 2)} */}
                {values.appointment_type_id &&
                  (!values.branch_id || !values.provider_id || !values.appointment_start) && (
                    <BranchProvider
                      values={values}
                      setFieldValue={setFieldValue}
                      appointment_type={props.appointment_type}
                      branch={props.branch}
                    />
                  )}
                {values.appointment_type_id &&
                  values.branch_id &&
                  values.provider_id &&
                  values.appointment_start &&
                  !values.appointment_for && (
                    <AppointmentFor values={values} setFieldValue={setFieldValue} />
                  )}
                {values.appointment_type_id &&
                  values.branch_id &&
                  values.provider_id &&
                  values.appointment_start &&
                  values.appointment_for && (
                    <PatientDetails
                      values={values}
                      resetForm={resetForm}
                      setFieldValue={setFieldValue}
                      id={props.match.params.id}
                      {...props}
                    />
                  )}
                {values.appointment_type_id &&
                  values.branch_id &&
                  values.provider_id &&
                  values.appointment_start &&
                  values.appointment_for && (
                    <Button
                      htmlType="submit"
                      disabled={isSubmitting}
                      loading={loadings}
                      className="button-square edit-button"
                    >
                      Book A Appointment
                    </Button>
                  )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  );
};
const mapStoreToProps = ({
  OnlineBookingForm,
  CustomForm,
  AppointmentType,
  Branch,
  Provider,
  Hospital,
}) => {
  console.log('Store CustomForm', OnlineBookingForm);
  return {
    OnlineBookingFormPayload: OnlineBookingForm.payload,
    OnlineBookingFormError: OnlineBookingForm.error,
    OnlineBookingFormMessage: OnlineBookingForm.message,
    CustomForm: CustomForm.payload,
    appointment_type: AppointmentType.payload,
    branch: Branch.payload,
    provider: Provider.payload,
    hospital: Hospital.payload,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchCustomForm: id =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_CUSTOMFORM', id })),

  createOnlineForm: (values, contentType) =>
    dispatch(
      actionCreator({
        method: 'POST',
        action_type: 'CREATE_ONLINE_APPOINTMENT',
        values,
        contentType,
      }),
    ),
  fetchAppointmentType: param =>
    dispatch(
      actionCreator({ method: 'GET', action_type: 'FETCH_HOSPITAL_APPOINTMENT_TYPE', param }),
    ),
  fetchBranch: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_BRANCH', param })),
  fetchProvider: param =>
    dispatch(
      actionCreator({ method: 'GET', action_type: 'FETCH_BRANCH_APPOINTMENT_PROVIDER', param }),
    ),
  fetchHospital: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'CHECK_HOSPITAL', param })),
});

export default connect(mapStoreToProps, mapDispatchToProps)(OnllineAppointmentForm);
