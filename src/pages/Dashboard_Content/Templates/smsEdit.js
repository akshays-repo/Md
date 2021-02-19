import React, { useEffect, useState } from 'react';
import { Col, Row, Collapse } from 'antd';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

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
      <Row>
        <Col xl={12}>
          <div className="mobile-backgrounf">
            <TextareaAutosize
              rowsMin={17}
              placeholder="Sms Content"
              defaultValue={actionSmsEdit.sms_content}
              maxLength={300}

              onChange={(e) =>handleMessageText(e) }/>
          </div>
          <span>{messageLength}/300</span>

          <button onClick={handleSmsEditSave}>Save</button>
          <button>Cancel</button>
        </Col>
        <Col xl={12}>
          <div>
            <h5>Pro Tips</h5>
            <p>
              Click on the items below to see smart commands. If you use any of the commands in the
              body of your email or text, we will automatically substitute the appropriate
              information
            </p>
          </div>
          <div>
            <Collapse accordion>
              <Panel header="Comapny" key="1">
                <p>ADDRESS DUMMYY</p>
                <p>ADDRESS DUMMYY</p>
                <p>ADDRESS DUMMYY</p>
                <p>ADDRESS DUMMYY</p>
                <p>ADDRESS DUMMYY</p>
              </Panel>
              <Panel header="Location" key="2">
                <p>LOCATION DUMMYY</p>
                <p>LOCATION DUMMYY</p>
                <p>LOCATION DUMMYY</p>
                <p>LOCATION DUMMYY</p>
              </Panel>
              <Panel header="Patient" key="3">
                <p>PATIENT DUMMYY</p>
                <p>PATIENT DUMMYY</p>
                <p>PATIENT DUMMYY</p>
                <p>PATIENT DUMMYY</p>
              </Panel>
            </Collapse>
            
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SmsEdit;
