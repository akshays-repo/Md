import React, { useEffect, useState } from 'react';
import { Space, Slider } from 'antd';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { store } from 'reducers/configureStore';
import { Result, Modal } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import PatientAdd from './patientAdd';

const FilterSection = props => {
  const [ageRangeFrom, setAgeRangeFrom] = useState(20);
  const [ageRangeTo, setAgeRangeTo] = useState(80);

  const [lastSeenAfter, setLastSeenAfter] = useState('');
  const [lastSeenBefore, setLastSeenBefore] = useState('');

  const [appointmentStart, setAppointmentStart] = useState('');
  const [appointmentEnd, setAppointmentEnd] = useState('');

  const [providerId, setProvider] = useState('');
  const [providerList, setProviderList] = useState([]);

  const [patientAddVisible , setPatientAddVisible] =useState(false)

  const [patientList , setPatientList] = useState([])
  const [toggleState, setToggleState] = useState({
    allpatients: false,
    age: false,
    lastseen: false,
    appointment: false,
    provider: false,
  });
  //THIS WILL SET THE AGE RANGE
  const onChangeAge = ageRange => {
    setAgeRangeFrom(ageRange[0]);
    setAgeRangeTo(ageRange[1]);
    setToggleState({ ...toggleState, age: true, allpatients: false });
  };

  useEffect(() => {
    setProviderList(store.getState().Provider.payload);
    console.log('storestore', store.getState().Provider.payload);
  }, []);

  const onClickAllPatients = () => {
    setToggleState({
      ...toggleState,
      allpatients: !toggleState.allpatients,
      age: false,
      lastseen: false,
      appointment: false,
      provider: false,
    });
  };

  const onClickDivs = item => {
    setToggleState({ ...toggleState, [item]: !toggleState[item], allpatients: false });
  };

  //THIS WILL VAILADATE THE WHOLE FILTER SECTION
  const checkValidation = e => {
    e.preventDefault();
    let notSelected = _.every(_.values(toggleState), function(v) {
      return !v;
    });

    if (notSelected) {
      warning();
    } else if (toggleState.provider && providerId === '') {
      Modal.warning({
        content: <Result status="warning" title="Please Select the Provider " />,
        onOk: onOkay,
      });
    } else if (toggleState.lastseen && (lastSeenBefore === '' || lastSeenAfter === '')) {
      Modal.warning({
        content: <Result status="warning" title="Please Select the Last seen before and after  " />,
        onOk: onOkay,
      });
    } else if (toggleState.appointment && (appointmentEnd === '' || appointmentStart === '')) {
      Modal.warning({
        content: (
          <Result status="warning" title="Please Select the Appointment start and end date " />
        ),
        onOk: onOkay,
      });
    } else if (toggleState.age && ageRangeFrom === '' && ageRangeTo === '') {
      Modal.warning({
        content: (
          <Result status="warning" title="Please Select the Appointment start and end date " />
        ),
        onOk: onOkay,
      });
    } else {
      filterSubmission();
    }
  };
  const filterSubmission = async() => {
    if (toggleState.allpatients) {
    let response=  await props.fetchPatients();
    console.log("prprprprp", props.payload , response)
    if(response.error === '') {
        setPatientList(response.payload)
        handlePatientEditOpen()
    }
    } else {
        let response=  await props.fetchPatients({ fromAge: ageRangeFrom, appointment_startDate: appointmentStart });
        if(response.error === '') {
            setPatientList(response.payload)
            handlePatientEditOpen()
        }
    }
  };

  const resultSucess = (
    <Result status="warning" title="Please select at least one option before proceeding" />
  );

  const onOkay = () => {
    // window.location.href = window.location.pathname;
  };

  const handlePatientEditClose = () =>{
      setPatientAddVisible(false)
  }

  const handlePatientEditOpen= () =>{
    setPatientAddVisible(true)
}

  const warning = () => {
    Modal.warning({
      content: resultSucess,
      onOk: onOkay,
    });
  };

  return (
    <div>
      Please choose who you'd like to send this to
      <Space direction="horizontal">
        <div>
          <div
            onClick={onClickAllPatients}
            style={{
              width: '130px',
              height: '200px',
              background: toggleState.allpatients === true ? '#f2f7f7' : '#c9c9c9',
            }}
          >
            All active patient
            <button onClick={() => onClickAllPatients()}>
              {toggleState.allpatients ? (
                <i class="far fa-check-circle" />
              ) : (
                <i class="far fa-times-circle" />
              )}
            </button>
          </div>
        </div>

        <div>
          <div
            style={{
              width: '130px',
              height: '200px',
              background: toggleState.age === true ? '#f2f7f7' : '#c9c9c9',
            }}
          >
            Age
            <button onClick={() => onClickDivs('age')}>
              {toggleState.age ? (
                <i class="far fa-check-circle" />
              ) : (
                <i class="far fa-times-circle" />
              )}
            </button>
            <p>
              Age range b/w {ageRangeFrom} and {ageRangeTo}
            </p>
            <Slider range step={1} defaultValue={[20, 50]} onChange={onChangeAge} />
          </div>
        </div>

        <div>
          <div
            style={{
              width: '130px',
              height: '200px',
              background: toggleState.lastseen === true ? '#f2f7f7' : '#c9c9c9',
            }}
          >
            Last seen
            <button onClick={() => onClickDivs('lastseen')}>
              {toggleState.lastseen ? (
                <i class="far fa-check-circle" />
              ) : (
                <i class="far fa-times-circle" />
              )}
            </button>
            <TextField
              id="date"
              label="Last seen after date"
              type="date"
              //   defaultValue="2017-05-24"
              className={''}
              onChange={e => {
                setLastSeenAfter(moment(e).format('YYYY-MM-DD'));

                setToggleState({ ...toggleState, lastseen: true, allpatients: false });
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="date"
              label="Last seen before date"
              type="date"
              //defaultValue="2017-05-24"
              className={''}
              onChange={e => {
                setLastSeenBefore(moment(e).format('YYYY-MM-DD'));
                setToggleState({ ...toggleState, lastseen: true, allpatients: false });
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>

        <div>
          <div
            style={{
              width: '130px',
              height: '200px',
              background: toggleState.appointment === true ? '#f2f7f7' : '#c9c9c9',
            }}
          >
            Appoinment
            <button onClick={() => onClickDivs('appointment')}>
              {toggleState.appointment ? (
                <i class="far fa-check-circle" />
              ) : (
                <i class="far fa-times-circle" />
              )}
            </button>
            <TextField
              id="date"
              label="Appointment Start Date"
              type="date"
              //   defaultValue="2017-05-24"
              className={''}
              onChange={e => {
                setAppointmentStart(moment(e).format('YYYY-MM-DD'));
                setToggleState({ ...toggleState, appointment: true, allpatients: false });
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="date"
              label="Appointment Start End"
              type="date"
              //     defaultValue="2017-05-24"
              className={''}
              onChange={e => {
                setAppointmentEnd(moment(e).format('YYYY-MM-DD'));
                setToggleState({ ...toggleState, appointment: true, allpatients: false });
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>

        <div>
          {' '}
          <div
            style={{
              width: '130px',
              height: '200px',
              background: toggleState.provider === true ? '#f2f7f7' : '#c9c9c9',
            }}
          >
            Provider{' '}
            <button onClick={() => onClickDivs('provider')}>
              {toggleState.provider ? (
                <i class="far fa-check-circle" />
              ) : (
                <i class="far fa-times-circle" />
              )}
            </button>
            <InputLabel id="demo-simple-select-label">Provider</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={''}
              onChange={e => {
                setProvider(e);
                setToggleState({ ...toggleState, provider: true, allpatients: false });
              }}
            >
              {providerList.map(provider => (
                <MenuItem value={provider.id}>{provider.fullName}</MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </Space>
      <div>
        <button onClick={e => checkValidation(e)}>NEXT</button>
      </div>



      <Modal
        title="CREATE A NEW  CAMPAIGN"
        onCancel={handlePatientEditClose}
        visible={patientAddVisible}
        footer={false}
        width={800}
      >
        <PatientAdd handlePatientEditClose={handlePatientEditClose} handlePatientEditOpen={handlePatientEditOpen} patientList={patientList} {...props} />
      </Modal>
    </div>
  );
};

export default FilterSection;
