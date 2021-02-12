import React, { useRef, useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { PatientCreationSchema } from '_utils/Schemas';
import { Button, Row } from 'antd';
import { generateForm } from '../../../_utils/formgenerator';
import { useDropzone } from 'react-dropzone';
import { Thumb } from './thumb';
import { getFormDataA } from '../../../_utils';

const PatientCreationForm = props => {
  const [loadings, setLoadings] = useState(false);
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

      innerForm.current.setFieldValue('image', acceptedFiles);
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
            userTypeId: 5,
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
                    // padding: 10,
                    // borderRadius: 5,
                    width: '100%',
                  }}
                  {...getRootProps({ className: 'dropzone' })}
                >
                  <div className="title">
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}
                    >
                      {Array.isArray(values.image) ? (
                        values.image.map((result, i) => (
                          <Thumb onImageDelete={onImageDelete} file={result}></Thumb>
                        ))
                      ) : (
                        <img
                          style={{
                            width: 90,
                            height: 90,
                            borderRadius: 100,
                            marginRight: 10,
                            objectFit: 'cover',
                          }}
                          src={
                            values.image ||
                            'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                          }
                        />
                      )}
                    </div>
                    <input {...getInputProps()} multiple={false} />
                    <div className="upload-btn-wrapper">
                      <button type="button" className="view-button button-square font-size-md px-5">
                        Browse Image
                      </button>
                    </div>
                    {/* <span>Upload Patient Image</span> */}
                  </div>
                </div>

                {errors.image && <div className="errormsg">{errors.image}</div>}
              </p>
            </Row>
            <div className="fullwidth-right">
              <Button
                htmlType="submit"
                disabled={isSubmitting}
                loading={loadings}
                className="submitbutton edit-button button-square"
              >
                {props.id ? 'EDIT' : 'ADD'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default PatientCreationForm;
