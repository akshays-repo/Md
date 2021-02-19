import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { actionCreator } from '../../../reducers/actionCreator';
import { store } from '../../../reducers/configureStore';
import { connect } from 'react-redux';
import { Timeline, Space, Card, Drawer, Row, Col , Modal } from 'antd';
import Dashboard_Content from '..';
import { TextField } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TemplateEmailEdit from './emailEdit'
import SmsEdit from './smsEdit';

const TemplateActions = props => {
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const [actionsState, setActionsState] = useState([]);
  const [actionEdit, setActionEdit] = useState({
    template_id:'',
    id: '',
    number: '',
    unit: '',
  });

  const [actionEmailEdit, setActionEmailEdit] = useState({
    template_id:'',
    id: '',
    email_content: '',
    email_sub: '',
  });



  useEffect(() => {
    fetchDetails();
    setActionsState(props.templateActions);
  }, []);

  const invokeActionType = (action) => {
    setActionEdit({  id: action.id, number:action.number, unit: action.unit  , template_id:id});
    setVisible(true)
  };

  const invokeEmailEdit = (action) => {

setActionEmailEdit({...actionEdit,   template_id:id , email_content:action.email_content ,  email_sub:action.email_content , id: action.id})
store.dispatch({ type: 'OPEN_CREATE_TEMPLATE_MODAL' })
  }
const invokeSmsEdit = action =>{
store.dispatch({ type: 'CLOSE_SMS_EDIT_TEMPLATE_MODAL' })
}

  useEffect(() =>{
    console.log('asjdsdn' , actionEmailEdit )
  })
  const fetchDetails = async () => {
    await props.fetchTemplateAction(id);
  };

  const handleActionEdit = (e) =>{
    e.preventDefault()
    let contentType = 'JSON'
    props.editTemplate(actionEdit.id ,  JSON.stringify(actionEdit ), contentType);
    console.log("daadadad", props.templateActions)
  }
  const templateContent = () => {
    return (
      <div>
        {props.templateActions?.map((action) => (
          <div>
            <Space direction="horizontal">
              <Card bordered={false} style={{ width: 200 }}>
                {action.number}
                {action.unit} Remainder
                <button onClick={() => invokeActionType(action)}>Edit</button>
              </Card>
              <Card bordered={false} style={{ width: 200 }}>
                Reminders Email
                <button onClick={() => invokeEmailEdit(action)} >Edit</button>
              </Card>
              <Card bordered={false} style={{ width: 200 }}>
                Reminders Sms
                <button onClick = {() => invokeSmsEdit(action)}>Edit</button>
              </Card>
            </Space>
            <br />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Dashboard_Content content={templateContent()} />

      <Drawer
        title="Edit the TIme"
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        width={400}
        footer={true}
      >
        <Row>
          <Col xl={12}>
            <TextField
              type="number"
              InputProps={{
                inputProps: {
                  max: 1000,
                  min: 0,
                },
              }}
              required
              value={actionEdit.number}
              label="Enter the Unit"
              onChange={(e) => setActionEdit({...actionEdit ,number:e.target.value})}
            />
          </Col>

          <Col xl={12}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={actionEdit.unit}
              required
              onChange={(e) => setActionEdit({...actionEdit ,unit:e.target.value})}

              //onChange={handleChange}
            >
              <MenuItem value={'week'}>Week</MenuItem>
              <MenuItem value={'hour'}>Hour</MenuItem>
              <MenuItem value={'minute'}>Minute</MenuItem>
              <MenuItem value={'month'}>Month</MenuItem>
            </Select>
          </Col>
        </Row>
        <button onClick={(e) => handleActionEdit(e)}>Save</button> <button onClick= {() => setVisible(false)}>Cancel</button>
      </Drawer>

      <Modal
        title="Email Remainder Edit"
        onCancel={() => store.dispatch({ type: 'CLOSE_CREATE_TEMPLATE_MODAL' })}
        visible={props.modal}
        footer={false}
        width={700}
      >
        <TemplateEmailEdit {...actionEmailEdit} {...props} />
      </Modal>

      <Modal
        title="Sms Remainder Edit"
        onCancel={() => store.dispatch({ type: 'CLOSE_SMS_EDIT_TEMPLATE_MODAL' })}
        visible={props.modal1}
        footer={false}
        width={700}
      >
        <SmsEdit {...actionEmailEdit} {...props} />
      </Modal>
    </div>
  );
};

const mapStoreToProps = ({ Template }) => {
  console.log('state', Template);
  return {
    payload: Template.payload,
    error: Template.error,
    message: Template.message,
    modal: Template.modal,
    modal1: Template.modal1,
    changed: Template.changed,
    templateActions: Template.templateActions,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchTemplate: () => dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_TEMPLATE' })),
  addTemplate: values =>
    dispatch(actionCreator({ method: 'POST', action_type: 'CREATE_USER', values })),
    editTemplate: ( id ,values , contentType) =>
    dispatch(actionCreator({ method: 'PUT', action_type: 'EDIT_TEMPLATE', id , values ,contentType })),
  fetchTemplateAction: id =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_HOSPITAL_ACTION', id })),
  deleteTemplate: id =>
    dispatch(actionCreator({ method: 'DELETE', action_type: 'DELETE_USER', id })),
  filterTemplate: param =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'FILTER_APPOINTMENT',
        param,
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(TemplateActions);
