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
  const [emailStatus , setEmailStatus] = useState(props.emailStatus === 'active' ? true : false)
  const handleEditorChange = e => {
    setEmailContent(e);
    props.handleEmailEdit(e);
  };

  useEffect(() => {
    setEmailContent(props.emailContent);
    console.log("asdasd", props.emailStatus)
    // if(props.emailStatus === 'active' ){
    //   setEmailStatus(true)
    // console.log("asdasd hai" , emailStatus)

    // }

  },);
  return (
    <div className="remindersEmail">
      <Row gutter={[16, 16]}>
      <Col xs={24} lg={12}  className="switchCampain">
      <Switch
        defaultChecked={emailStatus}
        onChange={e => props.handlEmailStatus(e)}
      />
      </Col>
      </Row>
      <Row gutter={[16, 16]}>
      <Col xs={24} lg={12}>
      <div className="emailEditor mb8">
            <TextField
              type="text"
              required
              value={props.emailSubject}
              label="Subject"
              onChange={e => props.handleEmailEditSubject(e.target.value)}
            />
          </div>
          </Col>
      </Row>
      <Row
        gutter={[16, 16]}
        //style={{pointerEvents:"none" , opacity:"0.7"} }
      >
        <Col xs={24} lg={12}>

          <div className="editorPanel">
            <Editor
              placeholder="Write something..."
              editorHtml={emailContent}
              onChange={handleEditorChange}
            />
          </div>
        </Col>

        <Col xs={24} lg={12}>
          <div className="smsEditmodalCampaign campaignAccordion" style={{borderTop: '1px solid #eaeaea'}}>
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
