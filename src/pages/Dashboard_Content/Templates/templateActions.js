import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { actionCreator } from '../../../reducers/actionCreator';
import { store } from '../../../reducers/configureStore';
import { connect } from 'react-redux';
import { Timeline, Space, Card, Drawer, Row, Col, Modal } from 'antd';
import Dashboard_Content from '..';
import { TextField } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { isMobile } from 'react-device-detect';
import TemplateEmailEdit from './emailEdit';
import SmsEdit from './smsEdit';
import AddNewAction from './addNewActions';

import InputLabel from '@material-ui/core/InputLabel';

const TemplateActions = props => {
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const [actionsState, setActionsState] = useState([]);
  const [createNewAction, setCreateNewAction] = useState(false);
  const [toggleColor, setToggleColor] = useState(true);
  const [actionEdit, setActionEdit] = useState({
    template_id: '',
    id: '',
    number: '',
    unit: '',
  });

  const [actionEmailEdit, setActionEmailEdit] = useState({
    template_id: '',
    id: '',
    email_content: '',
    email_sub: '',
  });

  const [actionSmsEdit, setActionSmsEdit] = useState({
    template_id: '',
    id: '',
    sms_content: '',
  });

  useEffect(() => {
    fetchDetails();
    setActionsState(props.templateActions);
  }, []);

  const invokeActionType = action => {
    setActionEdit({ id: action.id, number: action.number, unit: action.unit, template_id: id });
    setVisible(true);
  };

  const invokeEmailEdit = action => {
    setActionEmailEdit({
      ...actionEdit,
      template_id: id,
      email_content: action.email_content,
      email_sub: action.email_content,
      id: action.id,
    });
    store.dispatch({ type: 'OPEN_CREATE_TEMPLATE_MODAL' });
  };
  const invokeSmsEdit = action => {
    setActionSmsEdit({
      ...actionEdit,
      template_id: id,
      sms_content: action.sms_content,
      id: action.id,
    });

    store.dispatch({ type: 'OPEN_SMS_EDIT_TEMPLATE_MODAL' });
  };

  useEffect(() => {
    console.log('asjdsdn', actionEmailEdit);
  });
  const fetchDetails = async () => {
    await props.fetchTemplateAction(id);
  };

  const handleActionEdit = e => {
    e.preventDefault();
    let contentType = 'JSON';
    props.editTemplate(actionEdit.id, JSON.stringify(actionEdit), contentType);
  };

  const handleToggleColor = () => {
    setToggleColor(!toggleColor);
    console.log('djsbdfbdfbdfdfskj', toggleColor);
  };
  const templateContent = () => {
    //This Color is for toggle the BACKGROUND
    let color = true
    return (
      <div className="template-action">
        <Row>
        <Col xs={24} lg={12} offset={isMobile ? '' : 6}>
          <div className="templateBox">
            <div className="header">
           {props.templateActions?.length  > 0 ? <h5>Reminders</h5> :  <h5>!! No Actions  Found for this Template </h5>  }
            </div>
        {props.templateActions?.map(action => {
          color = !color
          return (
            <div className="template-card">
              <Space className="sectionBox"
                style={
                  color === true ? { backgroundColor: '#e6edf3' } : { backgroundColor: '#eff5fa' }
                }
                direction="vertical"
              >
                <Card className="topCard" bordered={false} style={{ width: 350, boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"  }}> 
                  <div className="content">
                    <div className="iconBox">
                      <span><i class="far fa-stopwatch"></i></span>
                    </div>
                    <p className="title">Next Action</p>
                    <p>{action.number}
                  {action.unit} Remainder
                  </p>
                  </div>
                  <div className="cardFooter">
                  <span onClick={() => invokeActionType(action)}><i class="far fa-edit"></i></span>
                  <span><i class="far fa-trash-alt"></i></span>
                  </div>
                </Card>
                <Card className="subCard" bordered={false} style={{ width: 250,  boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}>
                <div className="content">
                <div className="iconBox">
                      <span><i class="fal fa-envelope-square"></i></span>
                    </div>
                <p className="title">Reminders Email
                </p>
                </div>
                <div className="cardFooter">
                  <span onClick={() => invokeEmailEdit(action)}><i class="far fa-edit"></i></span>
                  <span><i class="far fa-trash-alt"></i></span>
                  </div>
                </Card>
                <Card className="subCard" bordered={false} style={{ width: 250,  boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}>
                <div className="content">
                <div className="iconBox">
                      <span><i class="fas fa-mobile-android-alt"></i></span>
                    </div>
                <p className="title">Reminders Sms</p>
                  </div>
                  <div className="cardFooter">
                  <span onClick={() => invokeSmsEdit(action)}><i class="far fa-edit"></i></span>
                  <span><i class="far fa-trash-alt"></i></span>
                  </div>
                </Card>
                {/* <button>Add</button> */}
              </Space>
              <br />
            </div>
          );
        })}
        </div>
 </Col>
</Row>
      </div>
    );
  };

  return (
    <div>
      <Dashboard_Content content={templateContent()} />
      {/* THIS DRAWER IS FOR EDIT THE ACTION */}
      <Drawer
        title="Edit the Time"
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        width={400}
        footer={true}
      >
        <Row>
          <Col xl={12}>
          <InputLabel id="demo-simple-select-label">Enter the Unit</InputLabel>

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
             // label="Enter the Unit"
              onChange={e => setActionEdit({ ...actionEdit, number: e.target.value })}
            />
          </Col>

          <Col xl={12}>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={actionEdit.unit}
              required
              placeholder="Enter the Unit"

              onChange={e => setActionEdit({ ...actionEdit, unit: e.target.value })}

              //onChange={handleChange}
            >
              <MenuItem value={'week'}>Week</MenuItem>
              <MenuItem value={'hour'}>Hour</MenuItem>
              <MenuItem value={'minute'}>Minute</MenuItem>
              <MenuItem value={'month'}>Month</MenuItem>
            </Select>
          </Col>
        </Row>
        <div className="mt7">
        <button className="view-button mr3" onClick={e => handleActionEdit(e)}>Save</button>{' '}
        <button className="edit-button" onClick={() => setVisible(false)}>Cancel</button>
        </div>
      </Drawer>

      {/* THIS DRAWER FOR THE  CREATE NEW ACTION*/}

      <Drawer
        title="Add New Action"
        placement="right"
        closable={false}
        onClose={() => store.dispatch({ type: 'OPEN_ADD_ACTION_TEMPLATE_MODAL' })}
        visible={props.modal2}
        width={400}
        footer={true}
      >
        <AddNewAction />
        OPEN_ADD_ACTION_TEMPLATE_MODAL
      </Drawer>
      <Modal className="smsEditmodal"
        title="Email Remainder Edit"
        onCancel={() => store.dispatch({ type: 'CLOSE_CREATE_TEMPLATE_MODAL' })}
        visible={props.modal}
        footer={false}
        width={700}
      >
        <TemplateEmailEdit {...actionEmailEdit} {...props} />
      </Modal>

      <Modal className="smsEditmodal"
        title="SMS Remainder Edit"
        onCancel={() => store.dispatch({ type: 'CLOSE_SMS_EDIT_TEMPLATE_MODAL' })}
        visible={props.modal1}
        footer={false}
        width={800}
        destroyOnClose
      >
        <SmsEdit actionSmsEdit={actionSmsEdit} {...props} />
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
    modal2: Template.modal2,

    changed: Template.changed,
    templateActions: Template.templateActions,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchTemplate: () => dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_TEMPLATE' })),
  addTemplate: values =>
    dispatch(actionCreator({ method: 'POST', action_type: 'CREATE_USER', values })),
  editTemplate: (id, values, contentType) =>
    dispatch(
      actionCreator({ method: 'PUT', action_type: 'EDIT_TEMPLATE', id, values, contentType }),
    ),
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
