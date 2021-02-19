import React , {useEffect, useState} from 'react'
import templateActions from './templateActions'
import { TextField } from '@material-ui/core';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js'
import { Col, Row, Collapse } from 'antd';
import 'draft-js/dist/Draft.css';

const { Panel } = Collapse;


const TemplateEmailEdit = (props) => {

    const [subject , setSubject] = useState('')
    const [content, setContent] = React.useState(
        () => EditorState.createEmpty(),
      );
// useEffect (() => {
//     console.log("ashdhsd", props)
//     setContent(props.email_content)
// }, [])
return(
    <div>

        <div>
        <TextField
              type="text"
              required
             value={props.email_sub}
              label="Subject"
            //  onChange={(e) => setActionEdit({...actionEdit ,number:e.target.value})}
            />
        </div>
        <div>
  <Editor editorState={content} 
  //onChange={setEditorState}
   />




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
        </div>
    </div>
)


}

export default TemplateEmailEdit

