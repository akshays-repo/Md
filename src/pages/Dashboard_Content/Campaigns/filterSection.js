import React, { useState } from 'react';
import { Space, Slider } from 'antd';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { set } from 'store';

const FilterSection = props => {
  const [ageRangeFrom, setAgeRangeFrom] = useState(20);
  const [ageRangeTo, setAgeRangeTo] = useState(80);

  const [lastSeenAfter, setLastSeenAfter] = useState('');
  const [lastSeenBefore, setLastSeenBefore] = useState('');

  const [appointmentStart, setAppointmentStart] = useState('');
  const [appointmentEnd, setAppointmentEnd] = useState('');

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
  };

  const onClickAllPatients = () => {
    setToggleState({ ...toggleState, allpatients: !toggleState.allpatients , age:false , lastseen:false , appointment:false , provider:false });
  };

  const onClickDivs = item => {
    console.log('item', item);

    setToggleState({ ...toggleState, [item]: !toggleState[item], allpatients: false });
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
          </div>
        </div>

        <div>
          <div
            onClick={() => onClickDivs('age')}
            style={{
              width: '130px',
              height: '200px',
              background: toggleState.age === true ? '#f2f7f7' : '#c9c9c9',
            }}
          >
            Age
            <p>
              Age range b/w {ageRangeFrom} and {ageRangeTo}
            </p>
            <Slider range step={1} defaultValue={[20, 50]} onChange={onChangeAge} />
          </div>
        </div>

        <div>
          <div
            onClick={() => onClickDivs('lastseen')}
            style={{
              width: '130px',
              height: '200px',
              background: toggleState.lastseen === true ? '#f2f7f7' : '#c9c9c9',
            }}
          >
            Last seen
            <TextField
              id="date"
              label="Last seen after date"
              type="date"
              defaultValue="2017-05-24"
              className={''}
              onChange={e => {
                setLastSeenAfter(e);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="date"
              label="Last seen before date"
              type="date"
              defaultValue="2017-05-24"
              className={''}
              onChange={e => {
                setLastSeenBefore(e);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>

        <div>
          <div
            onClick={() => onClickDivs('appointment')}
            style={{
              width: '130px',
              height: '200px',
              background: toggleState.appointment === true ? '#f2f7f7' : '#c9c9c9',
            }}
          >
            Appoinment
            <TextField
              id="date"
              label="Appointment Start Date"
              type="date"
              defaultValue="2017-05-24"
              className={''}
              onChange={e => setAppointmentStart(e)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="date"
              label="Appointment Start End"
              type="date"
              defaultValue="2017-05-24"
              className={''}
              onChange={e => setAppointmentEnd(e)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>

        <div>
          {' '}
          <div
            onClick={() => onClickDivs('provider')}
            style={{
              width: '130px',
              height: '200px',
              background: toggleState.provider === true ? '#f2f7f7' : '#c9c9c9',
            }}
          >
            Provider
            <InputLabel id="demo-simple-select-label">Provider</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={''}
              // onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
        </div>
      </Space>
      <div>
        <button>NEXT</button>
      </div>
    </div>
  );
};

export default FilterSection;
