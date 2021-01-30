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
      innerForm.current.setFieldValue('image', acceptedFiles);

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
      'image',
      innerForm.current.values.image.filter(result => result.name != name),
    );
  };
  const handleFormSubmission = async values => {
    console.log('Edit values', values);
    const { avatarLocation, avatarType, deletedAt, image, ...rest } = values;
    try {
      if (Array.isArray(image)) {
        values = await getFormDataA({
          ...rest,
          image,
          branchId: 3,
          hospitalId: localStorage.getItem('hospital_id'),
        });
      } else {
        values = await getFormDataA({
          ...rest,
          branchId: 3,
          hospitalId: localStorage.getItem('hospital_id'),
        });
      }

      if (props.id) {
        props.editPatient(props.id, values);
      } else {
        props.addPatient(values);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formField = [
    {
      label: 'Firstname',
      name: 'firstName',
      type: 'text',
    },
    {
      label: 'Lastname',
      name: 'lastName',
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
        initialValues={
          props.values || {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            avatarlocation: '',
            phone: '',
            image: '',
            userTypeId: 3,
            gender: 'male',
            status: 'active',
            patient_status: 'new',
            dob: '',
            zipcode: '',
          }
        }
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
                  {Array.isArray(values.image) ? (
                    values.image.map((result, i) => (
                      <Thumb onImageDelete={onImageDelete} file={result}></Thumb>
                    ))
                  ) : (
                    <img
                      style={{ width: 200, height: 200, borderRadius: 100 }}
                      src={
                        values.image ||
                        'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                      }
                    />
                  )}
                </div>
                {errors.image && <div className="errormsg">{errors.image}</div>}
              </p>
            </Row>

            <Button
              className="mt-5"
              htmlType="submit"
              disabled={isSubmitting}
              loading={loadings}
              className="submitbutton"
            >
              {props.id ? 'EDIT' : 'ADD'}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default PatientCreationForm;
