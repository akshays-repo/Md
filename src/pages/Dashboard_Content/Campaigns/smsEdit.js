import React, { useEffect, useState } from 'react';
import { Col, Row, Collapse } from 'antd';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import mblSvg from './assets/smartphone-call.svg'
import { Switch } from 'antd';

const { Panel } = Collapse;

const SmsEdit = (props) => {
    useEffect(() => {
        props.handleSmsEdit("e")
    })
  return (
    <div className="smsEditmodalCampaign">
                   <Switch
                  defaultChecked={props.emailStatus}
                  onChange={e => props.handlEmailStatus(e)}
                />
      <Row className="fullviewModal">
        <Col xl={10}>
          <div className="mobileBg">
          <div className="mobile-background" style={{ backgroundImage: `url(${mblSvg})` }}>
            <div className="textareaHight">

            <TextareaAutosize
              rowsMin={13}
              placeholder="Sms Content"
              defaultValue={props.smsContent}
              maxLength={300}
              onChange={(e) =>props.handleSmsEdit(e.target.value) }/>
              </div>
                <p className="msgLength">{props.smsContent.length}/300</p>
          </div>
          </div>
        


        </Col>
        <Col xl={14}>
          <div className="modalRight">
          <div>
            <h5>Pro Tips</h5>
            <p>
              Click on the items below to see smart commands. If you use any of the commands in the
              body of your email or text, we will automatically substitute the appropriate
              information
            </p>
          </div>
          <div className="collapseContent">
            <Collapse accordion>
              <Panel header="Comapny" key="1">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend faucibus nisi, non lacinia elit pharetra ut. 
              </p>
                <p>Integer iaculis interdum enim, sit amet egestas massa accumsan vitae.</p>
              </Panel>
              <Panel header="Location" key="2">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend faucibus nisi, non lacinia elit pharetra ut. 
              </p>
                <p>Integer iaculis interdum enim, sit amet egestas massa accumsan vitae.</p>
              </Panel>
              <Panel header="Patient" key="3">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend faucibus nisi, non lacinia elit pharetra ut. 
              </p>
                <p>Integer iaculis interdum enim, sit amet egestas massa accumsan vitae.</p>
              </Panel>
            </Collapse>
            
          </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SmsEdit;
