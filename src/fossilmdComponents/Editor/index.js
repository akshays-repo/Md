/* eslint-disable */
import React, { useEffect, useState } from 'react';
// import resizeImage from 'utils/resizeImage'
import { notification } from 'antd';
import './style.css';
import callApi from '_utils/callApi';

export default function Editor(props) {
  const { editorHtml, placeholder, onChange } = props;
  const [textarea, settextarea] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      settextarea(true);
      window.tinymce.init({
        selector: '.kt-tinymce-4',
        height: 200,
        theme: 'modern',
        menubar: 'file view insert format tools table tc help',
        toolbar: [
          'styleselect fontselect fontsizeselect',
          'undo redo | cut copy | bold italic | link image | alignleft aligncenter alignright alignjustify',
          'bullist numlist | outdent indent | blockquote subscript superscript | advlist | autolink | lists charmap | print preview |  code',
        ],
        plugins: 'paste advlist autolink link image lists charmap print preview code',
        automatic_uploads: true,
        file_picker_types: 'image',
        image_title: true,
        file_picker_callback: function(cb, value, meta) {
          var input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.onchange = async function() {
            var file = this.files[0];
            console.log('File insert', file);
            const url = '/api/backend/v1/uploadImage';
            const formData = new FormData();

            formData.append('image', file);
            const options = {
              method: 'POST',
              body: formData,
            };
            let Imageurl = null;
            try {
              const responseJSON = await callApi(url, options);
              console.log('responseKson', responseJSON);
              if (responseJSON && responseJSON.success) {
                Imageurl = responseJSON.data;
                cb(responseJSON.data, { title: file.name });
              }
            } catch (err) {
              console.log('error', err);
              notification.error({
                message: 'Error!',
              });
            }
          };
          console.log('document', document.querySelector('#mceu_122'));
          input.click();
        },
      });

      window.tinymce.activeEditor !== null &&
        window.tinymce.activeEditor.on('change', () => {
          onChange(window.tinymce.activeEditor.getContent());
        });
    }, 100);
  }, []);

  return (
    <div>
      <div>
        {textarea && (
          <textarea defaultValue={editorHtml} placeholder={placeholder} className="kt-tinymce-4" onChange={onChange}/>
    
        )}
      </div>
    </div>
  );
}

Editor.defaultProps = {
  placeholder: 'Write something...',
};
