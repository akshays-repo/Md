import React, { useEffect, useState } from 'react';
import { Space, Slider } from 'antd';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { store } from 'reducers/configureStore';
import { Result, Modal } from 'antd';
import _ from 'lodash';
import Provider from '../Provider';
const FilterSection = props => {
  const [ageRangeFrom, setAgeRangeFrom] = useState(20);
  const [ageRangeTo, setAgeRangeTo] = useState(80);

  const [lastSeenAfter, setLastSeenAfter] = useState('');
  const [lastSeenBefore, setLastSeenBefore] = useState('');

  const [appointmentStart, setAppointmentStart] = useState('');
  const [appointmentEnd, setAppointmentEnd] = useState('');

  const [providerId, setProvider] = useState('');
  const [providerList, setProviderList] = useState([]);

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
    }else{
        filterSubmission()
    }
  };

  const filterSubmission = () => {
if (toggleState.allpatients) {
      props.fetchPatients();
    }
  };


  const resultSucess = (
    <Result
      status="warning"
      title="Please select at least one option before proceeding"
    />
  );

  const onOkay = () => {
    // window.location.href = window.location.pathname;
  };

  const warning = () => {
    Modal.warning({
      content: resultSucess,
      onOk: onOkay,
    });
  };

  return (
    <div className="newCampaign">
      <p className="lead text-center"> Please choose who you'd like to send this to</p>
      <Space direction="horizontal">
        <div className="boxWrapper">
        <div className="box">
          <div className="boxInner"
            onClick={onClickAllPatients}
            style={{
              background: toggleState.allpatients === true ? '#f2f7f7' : 'rgb(181 181 181)',
            }}
          >
                         <span className="tickIcon" onClick={() => onClickAllPatients()}>
              {toggleState.allpatients ? (
                <i class="far fa-check-circle fa-lg activeClr" />
              ) : (
                <i class="far fa-times-circle fa-lg white" />
              )}
            </span>
            <div className="text-center">
              <div className="iconRound">

              </div>
            <p>
            All active patient</p>
            </div>
          </div>
        </div>

        <div className="box">
        <div className="boxInner"
            style={{
              background: toggleState.age === true ? '#f2f7f7' : 'rgb(181 181 181)',
            }}
          >
                        <span className="tickIcon" onClick={() => onClickDivs('age')}>
              {toggleState.age ? (
                <i class="far fa-check-circle fa-lg activeClr" />
              ) : (
                <i class="far fa-times-circle fa-lg white" />
              )}
            </span>
            <div className="text-center">
            <div className="iconRound">
                
                </div>
            <p className="bold">Age</p>

            <p style={{fontSize: '12px', height: '50px'}}>
              Age range b/w {ageRangeFrom} and {ageRangeTo}
            </p>
            <Slider range step={1} defaultValue={[20, 50]} onChange={onChangeAge} />
            </div>
          </div>
        </div>

        <div className="box">
        <div className="boxInner"
            style={{
              background: toggleState.lastseen === true ? '#f2f7f7' : 'rgb(181 181 181)',
            }}
          >
                         <span className="tickIcon" onClick={() => onClickDivs('lastseen')}>
              {toggleState.lastseen ? (
                <i class="far fa-check-circle fa-lg activeClr" />
              ) : (
                <i class="far fa-times-circle fa-lg white" />
              )}
            </span>
            <div className="text-center">
            <div className="iconRound">
                
                </div>
            <p className="bold">Last seen</p>

            <TextField
              id="date"
              label="Last seen after date"
              type="date"
              //   defaultValue="2017-05-24"
              className={''}
              onChange={e => {
                setLastSeenAfter(e);

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
                setLastSeenBefore(e);
                setToggleState({ ...toggleState, lastseen: true, allpatients: false });
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          </div>
        </div>

        <div className="box">
        <div className="boxInner"
            style={{
              background: toggleState.appointment === true ? '#f2f7f7' : 'rgb(181 181 181)',
            }}
          >
                        <span className="tickIcon" onClick={() => onClickDivs('appointment')}>
              {toggleState.appointment ? (
                <i class="far fa-check-circle fa-lg activeClr" />
              ) : (
                <i class="far fa-times-circle fa-lg white" />
              )}
            </span>
            <div className="text-center">
            <div className="iconRound">
                
                </div>
            <p className="bold">Appoinment</p>

            <TextField
              id="date"
              label="Appointment Start Date"
              type="date"
              //    defaultValue="2017-05-24"
              className={''}
              onChange={e => {
                setAppointmentStart(e);
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
                setAppointmentEnd(e);
                setToggleState({ ...toggleState, appointment: true, allpatients: false });
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          </div>
        </div>

        <div className="box">
          {' '}
          <div className="boxInner"
            style={{
              // width: '130px',
              // height: '200px',
              background: toggleState.provider === true ? '#f2f7f7' : 'rgb(181 181 181)',
            }}
          >
                        <span className="tickIcon" onClick={() => onClickDivs('provider')}>
              {toggleState.provider ? (
                <i class="far fa-check-circle fa-lg activeClr" />
              ) : (
                <i class="far fa-times-circle fa-lg white" />
              )}
            </span>
            <div className="text-center">
            <div className="iconRound">
                
                </div>
            <p className="bold">Provider{' '}</p>

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
        </div>
        </div>
      </Space>
      <div className="text-center">
        <button className="view-button mt8" onClick={e => checkValidation(e)}>NEXT</button>
      </div>
    </div>
  );
};

export default FilterSection;
