import React, { useRef, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { PatientCreationSchema } from '_utils/Schemas';
import { TextField, Select as MatSelect } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import { message, Button, Row, Col, Upload } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import callApi from '_utils/callApi';
import { generateForm } from '../../../_utils/formgenerator';
import { useDropzone } from 'react-dropzone';
import { Thumb } from './thumb';
import { getFormData, getFormDataA } from '../../../_utils';

const PatientCreationForm = props => {
  const [loadings, setLoadings] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState('');
  const innerForm = useRef();
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
      console.log(files);
      innerForm.current.setFieldValue('logo', acceptedFiles);

      console.log('****', innerForm.current.values);
    },
  });
  const uploadButton = (
    <div>
      <i className="fa fa-plus"></i>
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files],
  );
  const onImageDelete = name => {
    setFiles(prev => prev.filter(result => result.name != name));

    innerForm.current.setFieldValue(
      'logo',
      innerForm.current.values.logo.filter(result => result.name != name),
    );
  };
  const handleFormSubmission = async values => {
    try {
      values = await getFormDataA({ ...values, branchId: 3, hospitalId: 3 });
      if (editId) {
        props.editPatient(editId, values);
      } else {
        props.addPatient(values);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formField = [
    {
      label: 'Fullname',
      name: 'fullName',
      type: 'text',
    },

    {
      label: 'Email',
      name: 'email',
      type: 'text',
    },
    {
      label: 'Phone no.',
      name: 'phone',
      type: 'text',
    },
    {
      label: 'Address',
      name: 'address',
      type: 'text',
    },
    {
      label: 'Zipcode',
      name: 'zipcode',
      type: 'text',
    },
    {
      label: 'Date of Birth',
      name: 'dob',
      type: 'datepicker',
    },
    {
      label: 'Gender',
      name: 'gender',
      type: 'select',
      options: [
        { value: 'male', name: 'Male' },
        { value: 'female', name: 'Female' },
        { value: 'other', name: 'Other' },
      ],
    },
  ];

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          fullName: '',
          email: '',
          phone: '',
          address: '',
          avatarlocation: '',
          phone: '',
          logo: '',
          userTypeId: 3,
          gender: 'male',
          hospital_id: '',
          status: 'active',
        }}
        validationSchema={PatientCreationSchema}
        onSubmit={handleFormSubmission}
        innerRef={innerForm}
      >
        {({
          handleSubmit,
          initialValues,
          touched,
          errors,
          isSubmitting,
          values,
          setFieldValue,
        }) => (
          <Form
            style={{ backgroundColor: '#f7f8f8' }}
            className="login__form"
            handleSubmit={handleSubmit}
          >
            <Row>
              {generateForm(formField)}

              <p>
                <div
                  style={{
                    padding: 10,
                    borderRadius: 5,
                    width: '100%',
                  }}
                  {...getRootProps({ className: 'dropzone' })}
                >
                  <div className="title">
                    <span>Upload Patient Image</span>
                  </div>
                  <input {...getInputProps()} multiple={false} />

                  <div className="upload-btn-wrapper">
                    <button type="button" className="btn btn-primary font-size-md px-5">
                      Browse Image
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    flexWrap: 'wrap',
                  }}
                >
                  {values.logo.length > 0
                    ? values.logo.map((result, i) => (
                        <Thumb onImageDelete={onImageDelete} file={result}></Thumb>
                      ))
                    : ''}
                </div>
                {errors.logo && <div className="errormsg">{errors.logo}</div>}
              </p>
            </Row>

            <Button
              className="mt-5"
              htmlType="submit"
              disabled={isSubmitting}
              loading={loadings}
              className="submitbutton"
            >
              Create a New Patient
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default PatientCreationForm;
