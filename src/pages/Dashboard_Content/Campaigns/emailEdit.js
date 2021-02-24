import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import ReactDOM from 'react-dom';
import { Col, Row, Collapse } from 'antd';
import { Switch } from 'antd';

import Editor from '../../../fossilmdComponents/Editor/index';
const { Panel } = Collapse;

const EmailEdit = props => {
  const [subject, setSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  // useEffect (() => {
  //     console.log("ashdhsd", props)
  //     setContent(props.email_content)
  // }, [])

  const handleEditorChange = e => {
    setEmailContent(e);
    props.handleEmailEdit(e);
  };

  return (
    <div className="remindersEmail">
               <Switch
                  defaultChecked={props.smsStatus}
                  onChange={e => props.handleSmsEditStatus(e)}
                />
      <Row gutter={[16, 16]}  
      //style={{pointerEvents:"none" , opacity:"0.7"} }
      
      >
        <Col xs={24} lg={12}>
          <div>
 
                <TextField
                  type="text"
                  required
                  value={props.emailSubject}
                  label="Subject"
                  onChange={e => props.handleEmailEditSubject(e.target.value)}
                />

          </div>
          <div>
            <Editor
              placeholder="Write something..."
              editorHtml={props.emailContent || ''}
              onChange={handleEditorChange}
            />
          </div>
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
      </Row>
    </div>
  );
};

export default EmailEdit;
