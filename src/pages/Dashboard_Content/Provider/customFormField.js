import React, { useState, useRef, useEffect } from 'react';
import { Menu, Dropdown, Button, Input, Form, Space, Modal, Switch } from 'antd';
import { DownOutlined, UserOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { actionCreator } from '../../../reducers/actionCreator';
import { customFormSchema } from '_utils/Schemas';
import CustomFormReview from './customFormPreview';
import HardCoreForm from './customFormhardCore';
import TextField from '@material-ui/core/TextField';

const CustomFormField = props => {
  const [field, setField] = useState();
  const [addNewField, setAddNewField] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const innerForm = useRef();
  const [listCustomField, setListCustomField] = useState([]);
  const [editIndex, setEditIndex] = useState('');
  const [optionValue, setOptionValues] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  //THIS WILL ADD NEW OBJECT TO ARRAY
  const handleMenuClick = e => {
    let text = e.key;
    let values = [];
    if (text === 'checkbox' || text === 'drop-down') {
      values = [null];
    }
    setListCustomField([
      ...listCustomField,
      { custom_types: text, required: '', Key_name: '', values },
    ]);
  };

  useEffect(() => {
    setListCustomField(props.CustomForm.custom_form);
  }, []);

  useEffect(() => {
    console.log('****!!*** state', listCustomField);
  }, [listCustomField]);

  const handleFormSubmission = async values => {
    let contentType = 'JSON';
    let data = listCustomField;
    // if (values.custom_types === 'checkbox' || values.custom_types === 'drop-down') {
    //   values.values = optionValue.names;
    // }
    // data.push(values);
    let sendingData = {
      hospital_id: parseInt(localStorage.getItem('hospital_id')),
      formData: data,
    };
    await props.addCustomForm(JSON.stringify(sendingData), contentType);
  };

  const handleEditItem = async values => {
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

  // THIS IS THE MENU OF DROPDOWN
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="text">Text</Menu.Item>

      <Menu.Item key="note">Note</Menu.Item>

      <Menu.Item key="checkbox">Check box</Menu.Item>

      <Menu.Item key="drop-down">Drop Down</Menu.Item>

      <Menu.Item key="date">Date</Menu.Item>

      <Menu.Item key="number">Number</Menu.Item>
    </Menu>
  );

  //THIS WILL EDIT OR ADD Key_Name
  const editOrAddKeyName = (e, index) => {
    console.log('shhdashgd', index);
    let items = [...listCustomField];
    let item = { ...items[index] };
    item.Key_name = e.target.value;
    items[index] = item;
    setListCustomField(items);
  };

  // THIS WILL INSERT VALLUE
  const insertValue = (indexParent, indexChild) => {
    let items = [...listCustomField];
    let item = { ...items[indexParent] };
    let values = item.values;
    values.push(null);
    item.values = values;
    items[indexParent] = item;
    setListCustomField(items);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // THIS WILL HANDLE REQUIRED BUTTON
  const requiredOrNot = (e, index) => {
    let items = [...listCustomField];
    let item = { ...items[index] };
    item.required = e;
    items[index] = item;
    setListCustomField(items);
  };

  // THIS WILL HANDLE EDIT VALUE
  const editValue = (indexParent, indexChild, e) => {
    let items = [...listCustomField];
    let item = { ...items[indexParent] };
    let values = item.values;
    values[indexChild] = e.target.value;
    item.values = values;
    items[indexParent] = item;
    setListCustomField(items);
  };

  //THIS WILL DELETE THE VALUE ARRAYS
  const deleteValue = (indexParent, indexChild) => {
    let items = [...listCustomField];
    let item = { ...items[indexParent] };
    let values = item.values;

    values = values.filter((item, i) => i !== indexChild);
    console.log('****!!***', values);
    item.values = values;
    console.log('****!!***', item);
    items[indexParent] = item;
    console.log('****!!***', items);
    setListCustomField(items);
    console.log('****!!***', listCustomField);
  };

  //THIS WILL DELETE FORM
  const deleteItem = async index => {
    let items = [...listCustomField];
    items.splice(index, 1);
    setListCustomField(items);
  };

  return (
    <div className="custom-field" style={{ minHeight: '500px' }}>
      <div className="d-flex mb4">
        <h3>CUSTOM FORM FIELD </h3>
        <Button className="edit-button" onClick={() => setIsModalVisible(true)}>
          {' '}
          PREVIEW{' '}
        </Button>
      </div>
      <div className="inner-box">
        <div>
          <p>
            This is what FossilMd asks your patients by default. You can create additional questions
            and fields by clicking on the plus sign below.
          </p>

          <Modal
            title="PREVIEW CUTOM FORM"
            visible={isModalVisible}
            footer={false}
            onCancel={handleCancel}
          >
            <CustomFormReview {...props} />
          </Modal>

          <HardCoreForm />
          <form>
           
              {listCustomField?.map((type, index) => {
                return (
                  <div style={{ marginTop: '30px'}} >
                    <TextField
                      required={true}
                      label="Please enter this field is required"
                      value={type.Key_name}
                      onChange={e => editOrAddKeyName(e, index)}
                    />
                    required{' '}
                    <Switch
                      checked={type.required}
                      onChange={e => requiredOrNot(e, index)}
                      size="small"
                    />
                    <Button onClick={() => deleteItem(index)}>Delete</Button>
                    {type.values?.map((value, i) => (
                      <div>
                        <Input
                          required={true}
                          placeholder="Options "
                          style={{ width: '60%' }}
                          defaultValue={value}
                          onChange={e => editValue(index, i, e)}
                        />
                        <Button onClick={e => deleteValue(index, i)}>Delete</Button>
                      </div>
                    ))}
                    {type.values?.length > 0 && (
                      <Button onClick={() => insertValue(index)}> Add New Option</Button>
                    )}
                  </div>
                );
              })}
              {listCustomField?.length > 0 && <Button onClick={handleFormSubmission}>SAVE</Button>}
          
          </form>
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
