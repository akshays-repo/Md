import React, { useEffect, useState } from 'react';
import templateActions from './templateActions';
import { TextField } from '@material-ui/core';
import ReactDOM from 'react-dom';
import { Col, Row, Collapse } from 'antd';
import Editor from '../../../fossilmdComponents/Editor/index';
import { store } from '../../../reducers/configureStore';

const { Panel } = Collapse;

const TemplateEmailEdit = props => {
  const [subject, setSubject] = useState('');
  const [emailContent , setEmailContent] = useState('');
const [actionEmailEdit, setActionEmailEdit] = useState('')
useEffect(() =>{
  setEmailContent(props.actionEmailEdit.email_content)
  setSubject(props.actionEmailEdit.email_sub)
  setActionEmailEdit(props.actionEmailEdit)
  console.log("emailedit",props.actionEmailEdit.email_sub)
}, [])

const handleEditSubject = e =>{
  console.log('subject', e.target.value);
  setSubject(e.target.value)
  setActionEmailEdit({...actionEmailEdit, email_sub:subject  })
}

  const handleEditorChange = e => {
    console.log('content', e);
    setEmailContent(e)
    setActionEmailEdit({...actionEmailEdit, email_content:emailContent  })
  };
const handleEmailEditSave = () =>{
  console.log("oooo",emailContent , subject , actionEmailEdit)
  let sendingData = {
    template_id: props.actionEmailEdit.template_id,
    id: props.actionEmailEdit.id,
    email_content: emailContent,
    email_sub: subject,
  }
  let contentType = 'JSON'
       // const {number , unit , ...sentingData} = actionEmailEdit
        props.editTemplate(sendingData.id ,  JSON.stringify(sendingData ), contentType);
        store.dispatch({ type: 'CLOSE_CREATE_TEMPLATE_MODAL' })
}

  return (
    <div className="remindersEmail">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <div>
            <TextField
              type="text"
              required
              defaultValue={props.actionEmailEdit.email_content}
              label="Subject"
              onChange={ handleEditSubject}
            />
          </div>

          <Editor
            placeholder="Write something..."
            editorHtml={props.actionEmailEdit.email_content}
            onChange={handleEditorChange}
          />
        </Col>

        <Col xs={24} lg={12}>
          <div>
            <Collapse accordion>
              <Panel header="Comapny" key="1">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s
                </p>
                <p>
                  when an unknown printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but also the leap into
                  electronic typesetting
                </p>
              </Panel>
              <Panel header="Location" key="2">
                <p>
                  remaining essentially unchanged. It was popularised in the 1960s with the release
                  of Letraset sheets containing Lorem Ipsum passages
                </p>
              </Panel>
              <Panel header="Patient" key="3">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s
                </p>
              </Panel>
            </Collapse>
          </div>
        </Col>
        <div className="mbltextBtn mt6">
          <button className="view-button mr3" onClick={handleEmailEditSave}>Save</button>
          <button   onClick={() => store.dispatch({ type: 'CLOSE_CREATE_TEMPLATE_MODAL' })} className="edit-button">Cancel</button>
          </div>
      </Row>

    </div>
  );
};

export default TemplateEmailEdit;
