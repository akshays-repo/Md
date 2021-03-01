import React, { useEffect, useState } from 'react';
import { Col, Row, Collapse } from 'antd';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import mblSvg from './assets/smartphone-call.svg'

const { Panel } = Collapse;

const SmsEdit = (props) => {
    const [messageContent , SetMessageContent] =useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")
    const [messageLength , SetMessageLength] = useState(messageContent.length)
    const [ actionSmsEdit , setActionEdit] = useState({})
    const handleMessageText = (e) =>{
        SetMessageLength(e.target.value.length)
        SetMessageContent(e.target.value)
        setActionEdit({...actionSmsEdit, sms_content:messageContent  })
        
    }

    useEffect(() => {
        setActionEdit(props.actionSmsEdit)
        console.log("alskdjjgfhd",props.actionSmsEdit)

    }, [])

    const handleSmsEditSave = () =>{

        let contentType = 'JSON'
        const {number , unit , ...sentingData} = actionSmsEdit
        props.editTemplate(actionSmsEdit.id ,  JSON.stringify(sentingData ), contentType);
    }
  return (
    <div>
      <Row className="fullviewModal">
        <Col xs={24} lg={10} xl={10}>
          <div className="mobileBg">
          <div className="mobile-background" style={{ backgroundImage: `url(${mblSvg})` }}>
            <div className="textareaHight">

            <TextareaAutosize
              rowsMin={13}
              placeholder="Sms Content"
              defaultValue={actionSmsEdit.sms_content}
              maxLength={300}
              onChange={(e) =>handleMessageText(e) }/>
              </div>
                <p className="msgLength">{messageLength}/300</p>
          </div>
          </div>
        


        </Col>
        <Col xs={24} lg={14} xl={14}>
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
          <div className="mbltextBtn mt6">
            <button className="view-button mr3" onClick={handleSmsEditSave}>Save</button>
          <button className="edit-button">Cancel</button>
          </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SmsEdit;
