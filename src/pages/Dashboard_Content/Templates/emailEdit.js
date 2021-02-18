import React , {useEffect, useState} from 'react'
import templateActions from './templateActions'
import { TextField } from '@material-ui/core';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js'
import 'draft-js/dist/Draft.css';

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
   />;

        </div>
    </div>
)


}

export default TemplateEmailEdit

