import React , {useRef , useState ,useEffect} from 'react';
import { getFormDataA } from '_utils';
import { Thumb } from './thumb';
import { useDropzone } from 'react-dropzone';

import {
  Space,
  Select,
  Row,
  Col,
  Table,
  Tag,
  DatePicker,
  Input,
  Modal,
  Popconfirm,
  Button,
} from 'antd';
import { Formik, Form, Field } from 'formik';
import { generateForm } from '../../../_utils/formgenerator';
import { TextField, Select as MatSelect } from 'formik-material-ui';
import { hospitalUser ,hospitaEditlUser } from '_utils/Schemas';

const UserCreationForm = props => {


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

      innerForm.current.setFieldValue('profile_image', acceptedFiles);
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
      'profile_image',
      innerForm.current.values.profile_image.filter(result => result.name != name),
    );
  };



  const formField = [
    {
      label: 'Full Name',
      name: 'fullName',
      type: 'text',
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
    },
    {
      label: 'Phone no.',
      name: 'phone',
      type: 'text',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
    },
    {
      label: 'Confirm Password',
      name: 'c_password',
      type: 'password',
    },
    {
      label: 'Status',
      name: 'status',
      type: 'select',
      options: [
        { value: 'active', name: 'Active' },
        { value: 'hold', name: 'Hold' },
      ],
    },
  ];

  const handleFormSubmission = async(values) => {
    let data = await getFormDataA({ ...values});
    if(props.editId){
     const {userTypeId , isAdmin , ...rest} = values
     let editData = await getFormDataA({...rest})
        props.editUser({id:props.editId}, editData)
    }else{
        props.addUser(data)

  };}

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={
          props.editData|| {
            fullName:'',
            email: '',
            status: 'active',
            phone: '',
            password: '',
            c_password: '',
            profile_image:""
          }
        }
        validationSchema={props.editId ? hospitaEditlUser : hospitalUser}
        onSubmit={handleFormSubmission}
        innerRef={innerForm}

      >
        {({ handleSubmit, touched, errors, isSubmitting , values}) => (
          <Form className="login__form" handleSubmit={handleSubmit}>
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
                  <div className="title">
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}
                    >
                      {Array.isArray(values.profile_image) ? (
                        values.profile_image.map((result, i) => (
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
                            values.profile_image ||
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

                {errors.profile_image && <div className="errormsg">{errors.profile_image}</div>}
              </p>

            <Button
              htmlType="submit"
              disabled={isSubmitting}
              className="view-button button-square mt-5"
            >
              {props.editId ? ' Edit a User' : ' Create a New User'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default UserCreationForm;
