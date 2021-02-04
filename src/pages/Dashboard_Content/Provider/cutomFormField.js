import React, { useState, useRef, useEffect } from 'react';
import { Menu, Dropdown, Button, Input, Form as AntForm } from 'antd';
import { Switch } from 'formik-antd';
import { DownOutlined, UserOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField } from 'formik-material-ui';
import { connect } from 'react-redux';
import { actionCreator } from '../../../reducers/actionCreator';
import { customFormSchema } from '_utils/Schemas';
const CustomFormField = props => {
  const [field, setField] = useState();
  const [addNewField, setAddNewField] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const innerForm = useRef();
  const [listCustomField, setListCustomField] = useState([]);
  const [editIndex, setEditIndex] = useState('');
  const [optionValue, setOptionValues] =useState([]);
  
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  const handleMenuClick = e => {
    let text = e.key;
    setAddNewField([...addNewField, text]);
    console.log('NEWWWARRAY', addNewField);
  };

  const updateArrayForOptionField = index => {
    console.log('NEWWWARRAY: ' + index);
    let newArr = [...addNewField];
    let type = newArr[index];
    newArr[index] = { type, values: [''] };
    setAddNewField(newArr);
    console.log('NEWWWARRAY', newArr);
  };
  useEffect(() => {
    setListCustomField(props.CustomForm.custom_form);
    console.log('CUSTOFORM', props.CustomForm.custom_form);
  });

  const handleFormSubmission = async values => {
    let contentType = 'JSON';
    let data = listCustomField;
    data.push(values);
    let sendingData = {
      hospital_id: parseInt(localStorage.getItem('hospital_id')),
      formData: data,
    };
    console.log('sendingData', sendingData);
    await props.addCustomForm(JSON.stringify(sendingData), contentType);
  };

  const deleteItem = async index => {
    let data = listCustomField;
    data.splice(index, 1);
    let contentType = 'JSON';
    let sendingData = {
      hospital_id: parseInt(localStorage.getItem('hospital_id')),
      formData: data,
    };
    await props.addCustomForm(JSON.stringify(sendingData), contentType);
  };

  const handleEditItem = async values => {
    console.log('handleEditItem', values);
    console.log('handleEditItem index', editIndex);
    let data = listCustomField;
    if (editIndex !== -1) {
      data[editIndex] = values;
    }
    let contentType = 'JSON';
    let sendingData = {
      hospital_id: parseInt(localStorage.getItem('hospital_id')),
      formData: data,
    };
    await props.addCustomForm(JSON.stringify(sendingData), contentType);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="text" icon={<UserOutlined />}>
        Text
      </Menu.Item>

      <Menu.Item key="note" icon={<UserOutlined />}>
        Note
      </Menu.Item>

      <Menu.Item key="checkbox" icon={<UserOutlined />}>
        Check box
      </Menu.Item>

      <Menu.Item key="drop-down" icon={<UserOutlined />}>
        Drop Down
      </Menu.Item>

      <Menu.Item key="date" icon={<UserOutlined />}>
        Date
      </Menu.Item>

      <Menu.Item key="number" icon={<UserOutlined />}>
        Number
      </Menu.Item>
    </Menu>
  );


  const onFinish = values => {
    console.log('Received values of form:', values);
  };
  return (
    <div className="custom-field" style={{ minHeight: '500px' }}>
      CUSTOM FORM FIELD
      <div className="inner-box">
        <div>
          This is what FossilMd asks your patients by default. You can create additional questions
          and fields by clicking on the plus sign below.
          {listCustomField?.map((type, index) => {
            return (
              <div style={{ marginTop: '30px' }}>
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    custom_types: type.type,
                    required: type.required,
                    Key_name: type.Key_name,
                  }}
                  onSubmit={handleEditItem}
                  innerRef={innerForm}
                  validationSchema={customFormSchema}
                >
                  {({ handleSubmit }) => (
                    <Form className="login__form" handleSubmit={handleSubmit}>
                      <Field
                        style={{ width: '50%' }}
                        component={TextField}
                        name="Key_name"
                        type="text"
                      />
                      <Switch
                        checkedChildren="Required"
                        unCheckedChildren="Not Required"
                        name="required"
                        defaultChecked
                      />
                      <Button
                        onClick={() => setEditIndex(index)}
                        className="mt-5"
                        htmlType="submit"
                        className="submitbutton"
                      >
                        edit
                      </Button>
                      <Button onClick={() => deleteItem(index)}>Delete</Button>
                    </Form>
                  )}
                </Formik>
              </div>
            );
          })}
          {addNewField.map((item, index) => {
            return (
              <div>
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    custom_types: item.type,
                    required: true,
                    Key_name: '',
                    values: [],
                  }}
                  onSubmit={handleFormSubmission}
                  innerRef={innerForm}
                >
                  {({ handleSubmit, touched, errors, isSubmitting }) => (
                    <div style={{ marginTop: '30px' }}>
                      <Form className="login__form" handleSubmit={handleSubmit}>
                        <Field
                          style={{ width: '50%' }}
                          component={TextField}
                          placeholder={item}
                          type="text"
                          name="Key_name"
                        />
                        <span className="form-to">
                          <Switch
                            checkedChildren="Required"
                            unCheckedChildren="Not Required"
                            name="required"
                            defaultChecked
                          />
                        </span>

                        {item === 'checkbox' || item === 'drop-down' ? (
                          <div>
                            <AntForm
                              name="dynamic_form_item"
                              {...formItemLayoutWithOutLabel}
                              onFinish={onFinish}
                            >
                              <AntForm.List name="names">
                                {(fields, { add, remove }, { errors }) => (
                                  <>
                                    {fields.map((field, index) => (
                                      <AntForm.Item
                                        {...(index === 0
                                          ? formItemLayout
                                          : formItemLayoutWithOutLabel)}
                                        label={index === 0 ? 'Add Option' : ''}
                                        required={false}
                                        key={field.key}
                                      >
                                        <AntForm.Item
                                          {...field}
                                          validateTrigger={['onChange', 'onBlur']}
                                          rules={[
                                            {
                                              required: true,
                                              whitespace: true,
                                              message: 'Please input option or delete this field.',
                                            },
                                          ]}
                                          noStyle
                                        >
                                          <Input
                                            placeholder="Enter Option"
                                            style={{ width: '60%' }}
                                          />
                                        </AntForm.Item>
                                        {fields.length > 1 ? (
                                          <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                          />
                                        ) : null}
                                      </AntForm.Item>
                                    ))}
                                    <AntForm.Item>
                                      <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: '60%' }}
                                        icon={<PlusOutlined />}
                                      >
                                        Add Option
                                      </Button>
                                      <AntForm.ErrorList errors={errors} />
                                    </AntForm.Item>
                                  </>
                                )}
                              </AntForm.List>
                              <AntForm.Item>
                                <Button type="primary" htmlType="submit">
                                  Submit
                                </Button>
                              </AntForm.Item>
                            </AntForm>
                          </div>
                        ) : (
                          ''
                        )}
                        <Button
                          className="mt-5 button-square view-button"
                          htmlType="submit"
                          className="submitbutton"
                        >
                          Submit
                        </Button>
                      </Form>
                    </div>
                  )}
                </Formik>
              </div>
            );
          })}
          <Dropdown trigger={['click']} overlay={menu}>
            <Button className="mt-5 button-square edit-button" onClick={e => e.preventDefault()}>
              Add New Field <PlusOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

const mapStoreToProps = ({ CustomForm }) => {
  console.log('Store CustomForm', CustomForm);
  return {
    CustomForm: CustomForm.payload,
    CustomFormerror: CustomForm.error,
    CustomFormmessage: CustomForm.message,
    CustomFormmodal: CustomForm.modal,
    CustomFormmodal1: CustomForm.modal1,
    CustomFormchanged: CustomForm.changed,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCustomForm: id =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_CUSTOMFORM', id })),
  addCustomForm: (values, contentType) =>
    dispatch(
      actionCreator({ method: 'POST', action_type: 'CREATE_CUSTOMFORM', values, contentType }),
    ),
  editCustomForm: (id, values) =>
    dispatch(actionCreator({ method: 'PUT', action_type: 'EDIT_PROVIDER', id, values })),
  deleteCustomForm: id =>
    dispatch(actionCreator({ method: 'DELETE', action_type: 'DELETE_PROVIDER', id })),
  filterCustomForm: param =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'FILTER_PROVIDER',
        param,
      }),
    ),
});
export default connect(mapStoreToProps, mapDispatchToProps)(CustomFormField);
