import React ,{useEffect, useState} from 'react'
import { actionCreator } from '../../reducers/actionCreator';
import { store } from '../../reducers/configureStore';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import {
    message,
    Button,
    Row,
    Col,
    Checkbox,
    Select,
    DatePicker,
    Space,
    InputNumber,
    Divider,
  } from 'antd';
import TextField from '@material-ui/core/TextField';
import { Formik , Form } from 'formik';
const FormsFillingSection = (props) => {


    const [formToFill , setFormToFill] = useState(props.formToFill.custom_form)
    const [hospitalDetails , setHospitalDetails] =useState(props.hospital)

    const {id} = useParams();
    useEffect(() =>{
    props.fetchFormToFill(id)

    }, [])
 
const handleFormSubmission = () =>{

}

    const handleChange = (e, index) => {
        let items = { ...formToFill };
        let item = items[index];
        item.answer = [e];
        items[index] = item;

    
      };
    
      const handleChangeText = (e, index) => {
        let items = { ...formToFill };
        let item = items[index];
        item.answer = [e.target.value];
        items[index] = item;
      };

    useEffect(() => {
        setFormToFill(props.formToFill.custom_form)
        setHospitalDetails(props.hospital)
        console.log("sjlhdasjdjkac b", formToFill)
    },)
    return(
        <div>

<h1>{props.formToFill.name}</h1>
<Formik
  enableReinitialize={true}
  initialValues={{  }}
  onSubmit={handleFormSubmission}
 // innerRef={innerForm}
  //validationSchema={OnlineBookingSchema}
>
  {({
    handleSubmit,
    values,
    touched,
    errors,
    isSubmitting,
  }) => (
    <Form className="" handleSubmit={handleSubmit}>
     {formToFill?.map((forms, index) => (
        <div>
                      <TextField
                onChange={e => handleChangeText(e, index)}
                id="standard-basic"
                label={'Full Name'}
                required={true}
              />          
              <TextField
              onChange={e => handleChangeText(e, index)}
              id="standard-basic"
              label={"Email"}
              required={true}
            />        
              <TextField
            onChange={e => handleChangeText(e, index)}
            id="standard-basic"
            label={"Phone "}
           // required={forms.required}
          />
          {forms.custom_types === 'text' || forms.custom_types === 'note' ? (
            <div>
              {' '}
              <p></p>
              {/* <Field name={response[index].answer}>
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
                }) => (
                  <div>
                    <TextField label={forms.Key_name} type="text" placeholder="Email" {...field} />
                    {/* {meta.touched && meta.error && <div className="error">{meta.error}</div>} */}
              {/* </div>
                )} */}
              {/* </Field> */}
              <TextField
                onChange={e => handleChangeText(e, index)}
                id="standard-basic"
                label={forms.Key_name}
                required={forms.required}
              />
              <p></p>
            </div>
          ) : (
            ''
          )}
          {forms.custom_types === 'checkbox' ? (
            <div>
              {' '}
              <p>
                {forms.Key_name}
                {forms.required ? ' * (required) ' : ''}
              </p>
              <Checkbox.Group
                required={forms.required}
                onChange={e => handleChange(e, index)}
                options={forms.values}
              />
              <p></p>
            </div>
          ) : (
            ''
          )}

          {forms.custom_types === 'drop-down' ? (
            <div>
              {' '}
              <p>
                {forms.Key_name}
                {forms.required ? ' * (required) ' : ''}
              </p>
              <Select
                required={forms.required}
                onChange={e => handleChange(e, index)}
                style={{ width: 120 }}
              >
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
              <p>
                {forms.Key_name}
                {forms.required ? ' * (required) ' : ''}
              </p>
              <DatePicker
                required={forms.required}
                onChange={e => handleChange(e, index)}
                format={'YYYY/MM'}
              />
              <p></p>
            </div>
          ) : (
            ''
          )}

          {forms.custom_types === 'number' ? (
            <div>
              {' '}
              <p>
                {forms.Key_name}
                {forms.required ? ' * (required) ' : ''}
              </p>
              <InputNumber
                required={forms.required}
                onChange={e => handleChange(e, index)}
                min={1}
                max={100}
              />
              <p></p>
            </div>
          ) : (
            ''
          )}
        </div>
      ))}

          <Button
            htmlType="submit"
            disabled={isSubmitting}
            //loading={loadings}
            className="button-square edit-button"
          >
            Book A Appointment
          </Button>
    </Form>
  )}
</Formik>




        </div>
    )
}


const mapStoreToProps = ({ Forms }) => {
    console.log('state', Forms);
    return {
      error: Forms.error,
      message: Forms.message,
      formToFill:Forms.formToFill
    };
  };
  const mapDispatchToProps = dispatch => ({
    fetchFormToFill: (id) => dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_FORM_FOR_FILLING'  , id})),
    addForms: (values, contentType) =>
      dispatch(actionCreator({ method: 'POST', action_type: 'CREATE_FORM', values, contentType })),
    editForms: (id, values ,contentType) =>
      dispatch(actionCreator({ method: 'PUT', action_type: 'EDIT_FORM', id, values ,contentType})),
    deleteForms: id => dispatch(actionCreator({ method: 'DELETE', action_type: 'DELETE_FORM', id })),
    filterForms: param =>
      dispatch(
        actionCreator({
          method: 'GET',
          action_type: 'FILTER_APPOINTMENT',
          param,
        }),
      ),
  });
  
  export default connect(mapStoreToProps, mapDispatchToProps)(FormsFillingSection);
  
