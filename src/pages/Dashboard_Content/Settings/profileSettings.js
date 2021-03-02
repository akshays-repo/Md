import React, { useRef, useState, useEffect } from 'react';
import { generateForm } from '../../../_utils/formgenerator';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getFormDataA } from '_utils';
import { Thumb } from './thumb';
import { useDropzone } from 'react-dropzone';
import { Row, Button } from 'antd';

const ProfileSettings = props => {
  const [fullName, setFullName] = useState('');
  const [logo, setLogo] = useState('');

  useEffect(() => {
    let hospital = JSON.parse(localStorage.getItem('user_data'));
    setFullName(hospital.hospital.fullName ? hospital.hospital.fullName : '' );
    setLogo(hospital.hospital.logo ? hospital.hospital.logo : '');
    console.log("hospital", hospital)
  }, []);
  const formField = [
    {
      label: 'Hospital Name',
      name: 'fullName',
      type: 'text',
    },
    // {
    //   label: 'Phone no.',
    //   name: 'phone',
    //   type: 'phone',
    // },
    {
      label: 'New Password',
      name: 'password',
      type: 'password',
    },
    {
      label: 'Confirm New Password',
      name: 'c_password',
      type: 'password',
    },
  ];

  const [files, setFiles] = useState([]);
  const innerForm = useRef();

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

      innerForm.current.setFieldValue('logo', acceptedFiles);
    },
  });

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
  const handleFormSubmission = () => {};

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          fullName: fullName,
          password: '',
          c_password: '',
          logo: logo,
        }}
        //  validationSchema={props.editId ? hospitaEditlUser : hospitalUser}
        onSubmit={handleFormSubmission}
        innerRef={innerForm}
      >
        {({ handleSubmit, touched, errors, isSubmitting, values }) => (
          <Form className="login__form mt8" handleSubmit={handleSubmit}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>{generateForm(formField)}</Row>

            <p>
              <div
                style={{
                  // padding: 10,
                  // borderRadius: 5,
                  width: '100%',
                }}
                {...getRootProps({ className: 'dropzone' })}
              >
                <div className="title mt6">
                  <div className="settingThumb mb4"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}
                  >
                    {Array.isArray(values.logo) ? (
                      values.logo.map((result, i) => (
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
                          values.logo ||
                          'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                        }
                      />
                    )}

<input {...getInputProps()} multiple={false} />
                  <div className="upload-btn-wrapper mt6">
                    <button type="button" className="view-button button-square font-size-md px-5">
                      Browse Image
                    </button>
                  </div>
                  </div>
           
                  {/* <span>Upload Patient Image</span> */}
                </div>
              </div>

              {errors.logo && <div className="errormsg">{errors.logo}</div>}
            </p>
<div className="settingBottom mt8">
            <button
              htmlType="submit"
              disabled={isSubmitting}
              className="view-button button-square mt-5"
            >
              {' Save Changes'}
            </button>
            </div>
          </Form>
        )}
      </Formik>{' '}
    </div>
  );
};

export default ProfileSettings;
