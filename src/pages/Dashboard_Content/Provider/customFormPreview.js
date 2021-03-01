import React, { useEffect, useState } from 'react';
import { Checkbox, Select, DatePicker, Space, InputNumber, Row } from 'antd';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import HardCoreForm from './customFormhardCore';

const CustomFormReview = props => {
  const [customForms, setCustomForm] = useState([]);

  useEffect(() => {
    setCustomForm(props.CustomForm.custom_form);
  });

  return (
    <div>
      <HardCoreForm />
      {customForms?.map(forms => (
        <div>
          {forms.custom_types === 'text' ? (
            <div>
              {' '}
              <p></p>
              <TextField id="standard-basic" label={forms.Key_name} />
              <p></p>
            </div>
          ) : (
            ''
          )}
{ forms.custom_types === 'note' ? (
                        <div>
                          {' '}
                          <p>NB:{forms.Key_name}</p>
                          <p></p>
                        </div>
                      ) : (
                        ''
                      )}

          {forms.custom_types === 'checkbox' ? (
            <div>
              {' '}
              <p>{forms.Key_name}</p>
              <Checkbox.Group options={forms.values !== null ? forms.values: '' } />
              <p></p>
            </div>
          ) : (
            ''
          )}

          {forms.custom_types === 'drop-down' ? (
            <div>
              {' '}
              <p className="mb0">{forms.Key_name}</p>
              <Select
               style={{ width:150 }}>
                {forms.values.map(option => (
                  <Select.Option value={option}>{option}</Select.Option>
                ))}
              </Select>
              <p></p>
            </div>
          ) : (
            ''
          )}

          {forms.custom_types === 'date' ? (
            <div>
              {' '}
              <p className="mb0">{forms.Key_name}</p>
              <DatePicker
              style={{ width:150 }}
               defaultValue={moment('2015/01/01', 'YYYY/MM')} format={'YYYY/MM'} />
              <p></p>
            </div>
          ) : (
            ''
          )}

          {forms.custom_types === 'number' ? (
            <div>
              {' '}
              <p className="mb0">{forms.Key_name}</p>
              <InputNumber min={1} max={10} defaultValue={3} 
              style={{ width:150 }}
              />
              <p></p>
            </div>
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomFormReview;
