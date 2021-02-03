import React, { useState, useRef, useEffect } from 'react';
import { Menu, Dropdown, Button, Switch } from 'antd';
import { DownOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import { actionCreator } from '../../../reducers/actionCreator';

const CustomFormField = (props) => {
  const [field, setField] = useState();
  const [addNewField, setAddNewField] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const innerForm = useRef();

  useEffect(() => {
    let param = '3'
    props.fetchCustomForm(param);
    console.log(props.CustomForm)
  }, [])
  const handleMenuClick = e => {
    console.log('keyyykeyyy', e);
    let text = e.key;
    setAddNewField([...addNewField, text]);
    console.log('keyyykeyyy', addNewField);
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
      <Menu.Item key="dropdown" icon={<UserOutlined />}>
        Drop Down List
      </Menu.Item>
      <Menu.Item key="date" icon={<UserOutlined />}>
        Date
      </Menu.Item>
      <Menu.Item key="date" icon={<UserOutlined />}>
        Number
      </Menu.Item>
    </Menu>
  );

  const handleFormSubmission = async values => {
    console.log('valueee', values);
    console.log('valueee props', props);
    let contentType = 'JSON'
    await props.addCustomForm(JSON.stringify(values), contentType);
  };

  return (
    <div className="custom-field">
      <h3>CUSTOM FORM FIELD</h3>
      <div className="inner-box">
        <div>
          This is what FossilMd asks your patients by default. You can create additional questions
          and fields by clicking on the plus sign below.
          {addNewField.map(type => {
            return (
              <div>
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    hospital_id: parseInt(localStorage.getItem('hospital_id')),
                    formData: [
                      {
                        custom_types: type,
                        required: true,
                        Key_name: '',
                        
                      },
                    ],
                  }}
                  onSubmit={handleFormSubmission}
                  innerRef={innerForm}>
                  {({ handleSubmit ,  }) => (
                    <Form className="login__form" handleSubmit={handleSubmit}>
                        <Field type="text" name="formData[0].Key_name" placeholder={type} />
                        <span className="form-to"><Switch
                          checkedChildren="Required"
                          unCheckedChildren="Not Required"
                          name="required"
                          defaultChecked
                        /></span>
                      <Button
                        className="mt-5 button-square view-button"
                        htmlType="submit"
                        
                      >
                        submit
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            );
          })}
          <Dropdown overlay={menu}>
            <Button className="mt-5 button-square edit-button">
              Add New Field <PlusOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

const mapStoreToProps = ({  CustomForm }) => {
    console.log('Store CustomForm', CustomForm);
    return {
      CustomForm: CustomForm.payload,
      CustomFormerror: CustomForm.error,
      CustomFormmessage: CustomForm.message,
      CustomFormmodal: CustomForm.modal,
      CustomFormmodal1: CustomForm.modal1,
      CustomFormchanged:CustomForm.changed,
    };
  };


const mapDispatchToProps = dispatch => ({
  fetchCustomForm: id =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_CUSTOMFORM', id })),
  addCustomForm: (values, contentType) =>
    dispatch(actionCreator({ method: 'POST', action_type: 'CREATE_CUSTOMFORM', values , contentType })),
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
