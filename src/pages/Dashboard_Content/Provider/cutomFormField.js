import React, { useState, useRef, useEffect } from 'react';
import { Menu, Dropdown, Button, Switch } from 'antd';
import { DownOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import { actionCreator } from '../../../reducers/actionCreator';
import { indexOf } from 'lodash';

const CustomFormField = props => {
  const [field, setField] = useState();
  const [addNewField, setAddNewField] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const innerForm = useRef();
  const [listCustomField, setListCustomField] = useState([]);
  const [editIndex , setEditIndex] = useState('')
  const handleMenuClick = e => {
    let text = e.key;
    setAddNewField([...addNewField, text]);
  };

  useEffect(() =>{
    setListCustomField(props.CustomForm.custom_form)
    console.log('CUSTOFORM', props.CustomForm.custom_form)
  })


  const handleFormSubmission = async values => {
    let contentType = 'JSON';
    let data = listCustomField;
    data.push(values)
    let sendingData = {
      hospital_id: parseInt(localStorage.getItem('hospital_id')),
      formData:data
    }
    console.log("sendingData" , sendingData)
    await props.addCustomForm(JSON.stringify(sendingData), contentType);
  };

  const deleteItem = async (index) =>{
    let data = listCustomField;
    data.splice(index, 1);
    let contentType = 'JSON';
    let sendingData = {
      hospital_id: parseInt(localStorage.getItem('hospital_id')),
      formData:data
    }
    await props.addCustomForm(JSON.stringify(sendingData), contentType);
  }

  const handleEditItem = async(values) =>{
        console.log("handleEditItem", values)
        console.log("handleEditItem index",editIndex)
        let data = listCustomField;
        if (editIndex !== -1) {
          data[editIndex] = values;
      }
      let contentType = 'JSON';
      let sendingData = {
        hospital_id: parseInt(localStorage.getItem('hospital_id')),
        formData:data
      }
      await props.addCustomForm(JSON.stringify(sendingData), contentType);
      }



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
  return (
    <div style={{ minHeight: '500px' }}>
      CUSTOM FORM FIELD
      <div>
        <div>
          This is what FossilMd asks your patients by default. You can create additional questions
          and fields by clicking on the plus sign below.

          {listCustomField?.map((type , index)=> {
            return (
              <div>
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    custom_types: type.type,
                    required: true,
                    Key_name: type.Key_name,
                  }}
                  onSubmit={handleEditItem}
                  innerRef={innerForm}
                >
                  {({ handleSubmit }) => (
                    <Form className="login__form" handleSubmit={handleSubmit}>
                     <Field name="Key_name" type="text"/>
                      <Switch
                        checkedChildren="Required"
                        unCheckedChildren="Not Required"
                        name="required"
                        defaultChecked
                      />
                      <Button onClick={() => setEditIndex(index)} className="mt-5" htmlType="submit" className="submitbutton">
                        edit
                      </Button>
                      <Button onClick={() => deleteItem(index)}>Delete</Button>
                    </Form>
                  )}
                </Formik>
              </div>
            );
          })}




          {addNewField.map(type => {
            return (
              <div>
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                  custom_types: type,
                  required: true,
                  Key_name: '',
                  }}
                  onSubmit={handleFormSubmission}
                  innerRef={innerForm}
                >
                  {({ handleSubmit }) => (
                    <Form className="login__form" handleSubmit={handleSubmit}>
                      <Field type="text" name="Key_name"/>

                      <Switch
                        checkedChildren="Required"
                        unCheckedChildren="Not Required"
                        name="required"
                        defaultChecked
                      />
                      <Button className="mt-5" htmlType="submit" className="submitbutton">
                        submit
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            );
          })}
          <Dropdown trigger={['click']} overlay={menu}>
            <Button onClick={e => e.preventDefault()}>
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
