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

    <div className="remindersEmail">
 <Row gutter={[16, 16]}>
    <Col xs={24} lg={12}  >
        <div>
        <TextField
              type="text"
              required
             value={props.email_sub}
              label="Subject"
            //  onChange={(e) => setActionEdit({...actionEdit ,number:e.target.value})}
            />
        </div>

  <Editor editorState={content} 
  //onChange={setEditorState}
   />
</Col>

<Col xs={24} lg={12}>
<div>
<Collapse accordion>
              <Panel header="Comapny" key="1">
               <p>
               Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                <p>
                when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                 but also the leap into electronic typesetting</p>
              

              </Panel>
              <Panel header="Location" key="2">
              <p>remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages</p>
              </Panel>
              <Panel header="Patient" key="3">
              <p>
               Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                
              </Panel>
            </Collapse>
</div>
        
        </Col>
        </Row>
    </div>


)


}

export default TemplateEmailEdit

