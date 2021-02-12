import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { BranchSchema } from '_utils/Schemas';
import { TextField } from 'formik-material-ui';
import { message, Button, Row, Col, Select } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { getFormData } from '_utils';
import { actionCreator } from 'reducers/actionCreator';
import { getPlaceList, getCoordinates, getCurrentLocation, getPincode } from '_utils/googleApi';

const BranchCreationForm = props => {
  const [loadings, setLoadings] = useState(false);
  const innerForm = useRef();
  const [result, setresult] = useState([]);
  const [search, setsearch] = useState(props.id ? props.values?.address : null);

  const handleFormSubmission = async values => {
    try {
      values = await getFormData({ ...values, userTypeId: 3 });
      if (props.id) {
        const response = await props.editBranch(props.id, values);
      } else {
        const response = await props.addBranch(values);
      }
    } catch (err) {
      console.log(err);

      // message.error(err);
    }
  };

  const handleChange1 = (param, setFieldValue) => {
    setsearch(param);

    getCoordinates(param)
      .then(result => {
        console.log(result);
        setFieldValue('address', param);
        setFieldValue('longitude', result.lng);
        setFieldValue('latitude', result.lat);

        // setcurrentCoordinates(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSearch = param => {
    getPlaceList(param)
      .then(res => {
        setsearch(param);
        console.log(res);
        setresult(res);
      })
      .catch(err => {
        console.log(err);
      });
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
      type: 'email',
    },
    {
      label: 'Phone no.',
      name: 'phone',
      type: 'text',
    },
    // {
    //   label: 'Address',
    //   name: 'address',
    //   type: 'text',
    // },
    // {
    //   label: 'Latoti',
    //   name: 'address',
    //   type: 'text',
    // },
  ];

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={
          props.values || {
            fullName: '',
            email: '',
            phone: '',
            address: '',
            hospitalId: 3,
            userTypeId: 3,
            status: 'active',
          }
        }
        validationSchema={BranchSchema}
        onSubmit={handleFormSubmission}
        innerRef={innerForm}
      >
        {({ handleSubmit, setFieldValue, values, touched, errors, isSubmitting }) => (
          <Form
            style={{ backgroundColor: '#f7f8f8' }}
            className="login__form"
            handleSubmit={handleSubmit}
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {formField.map((values, index) => {
                return (
                  <Col key={index} xs={24} xl={12}>
                    <label>{values.label}</label>
                    <p>
                      <Field
                        component={TextField}
                        name={values.name}
                        placeholder=""
                        type="text"
                      ></Field>
                    </p>
                  </Col>
                );
              })}

              <Col xs={24} xl={12}>
                <label>Address</label>
                <p>
                  <Select
                    bordered={false}
                    showSearch
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onChange={values => handleChange1(values, setFieldValue)}
                    onSearch={handleSearch}
                    notFoundContent={null}
                    defaultValue={values.address}
                    value={search}
                    className="branch_address"
                    // placeholder="Start typing and find your place in google map"
                    style={{
                      width: '90%',
                      backgroundColor: 'var(--primarys) !important',
                      // borderBottom: '2px solid #3f51b5',
                      borderBottom: errors.address
                        ? '2px solid red'
                        : '1px solid rgba(0, 0, 0, 0.42)',
                      outline: 0,
                    }}
                  >
                    {result.map((result, i) => (
                      <Select.Option value={result.description} key={i}>
                        {result.description}
                      </Select.Option>
                    ))}
                  </Select>
                  {errors.address && <div className="errormsg">{errors.address}</div>}
                  {/* <ErrorMessage
                    name="address"
                    render={msg => <div className="errormsg">{msg}</div>}
                  ></ErrorMessage> */}
                </p>
              </Col>
            </Row>

            <Button
              className="mt-5 edit-button button-square"
              htmlType="submit"
              disabled={isSubmitting}
              loading={loadings}
            >
              {props.id ? 'Edit Branch' : 'Add Branch'}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BranchCreationForm;
