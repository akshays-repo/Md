import React, { useState, useEffect } from 'react';
import Dashboard_Content from '..';
import FullCalendar, { formatDate, createPlugin } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { CalendarModal } from './calendar_modal';
import FilterPlugin from './filter_plugin';
import { Row, Col } from 'antd';
import { FilterPopover } from './filter_popover';
import { connect } from 'react-redux';
import { actionCreator } from '../../../reducers/actionCreator';
import { Booking } from './booking';
import { Unavailable } from './unavailable';
import { Cancelled } from './cancelled';
import { BookingEdit } from './bookingedit_modal';
import { UnavailableEdit } from './unavailablity_modal';
import moment from 'moment';
const Dashboard_Calendar = props => {
  const [weekendsVisible, setweekendsVisible] = useState(true);
  const [currentEvents, setcurrentEvents] = useState([]);
  const [addmodal, setAddModal] = useState(false);
  const [unavailableModal, setUnavailableModal] = useState(false);
  const [bookingEditModal, setBookingEditModal] = useState(false);
  const [starttime, setstarttime] = useState(moment());
  const [endtime, setendtime] = useState(moment());
  const handleWeekendsToggle = () => {
    setweekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = selectInfo => {
    console.log('Select info', selectInfo);
    setstarttime(selectInfo.startStr);
    setendtime(selectInfo.endStr);
    setAddModal(true);
    // let title = prompt('Please enter a new title for your event');
    // let calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
  };

  const handleEventClick = clickInfo => {
    console.log('Event info', clickInfo);

    switch (clickInfo.event.title) {
      case 'Booking':
        setBookingEditModal(true);
        break;
      case 'Unavailable':
        setUnavailableModal(true);
        break;
    }
    // if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }
  };

  const handleEvents = events => {
    setcurrentEvents(events);
  };

  useEffect(() => {
    props.fetchProvider();
    props.fetchBranch();
    props.fetchPatient();
    props.fetchAppointmentType({ hospitalId: localStorage.getItem('hospital_id') });
  }, []);

  function renderEventContent(eventInfo) {
    console.log('Eventinfo', eventInfo);
    switch (eventInfo.event.title) {
      case 'Cancelled':
        return <Cancelled eventInfo={eventInfo}></Cancelled>;
      case 'Unavailable':
        return (
          <Unavailable
            modal={unavailableModal}
            setModal={setUnavailableModal}
            eventInfo={eventInfo}
          ></Unavailable>
        );
      case 'Booking':
        return (
          <Booking modal={bookingEditModal} setModal={setBookingEditModal} eventInfo={eventInfo} />
        );
    }

    // return (
    //   <>
    //     <b>{eventInfo.timeText}</b>
    //     <i>{eventInfo.event.title}</i>
    //   </>
    // );
  }

  const Calendar = () => {
    return (
      <Row className="calendarSection">
        {' '}
        <Col span={22}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            // customButtons={{
            //   calendarFilter: {
            //     text: `FILTER`,
            //     click: function() {
            //       alert('clicked the custom button!');
            //     },
            //   },
            // }}
            titleFormat={{ year: 'numeric', month: 'short', day: 'numeric' }}
            headerToolbar={{
              center: 'prev,today,next',
              right: 'title',
              left: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
    eventAdd={function(){}}
    eventChange={function(){}}
    eventRemove={function(){}}
    */
          />
          <CalendarModal
            {...props}
            provider={props.provider}
            patient={props.patient}
            modal={addmodal}
            setModal={setAddModal}
            starttime={starttime}
            endtime={endtime}
          />
          <BookingEdit {...props} modal={bookingEditModal} setModal={setBookingEditModal} />
          <UnavailableEdit
            modal={unavailableModal}
            setModal={setUnavailableModal}
            {...props}
          ></UnavailableEdit>
        </Col>
        <Col span={2} style={{ marginLeft: -80, height: 50 }}>
          <FilterPopover {...props} provider={props.provider} />
        </Col>
      </Row>
    );
  };
  return <Dashboard_Content content={Calendar()} />;
};

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  );
}

const mapStoreToProps = ({ Provider, Patient, AppointmentType, Branch }) => {
  console.log('Store CustomForm', Provider, Patient);
  return {
    provider: Provider.payload,
    patient: Patient.payload,
    appointment_type: AppointmentType.payload,
    branch: Branch.payload,
  };
};

const mapDispatchToProps = dispatch => ({
  createAppointment: values =>
    dispatch(
      actionCreator({
        method: 'POST',
        action_type: 'CREATE_ONLINE_APPOINTMENT',
        contentType: 'JSON',
        values,
      }),
    ),
  editAppointment: (id, values) =>
    dispatch(
      actionCreator({
        method: 'PUT',
        action_type: 'EDIT_APPOINTMENT',
        contentType: 'JSON',
        id,
        values,
      }),
    ),
  fetchProvider: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_PROVIDER', param })),
  fetchBranch: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_BRANCH', param })),
  fetchPatient: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_PATIENT', param })),
  fetchAppointmentType: param =>
    dispatch(
      actionCreator({ method: 'GET', action_type: 'FETCH_HOSPITAL_APPOINTMENT_TYPE', param }),
    ),
  fetchUnavailable: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_PROVIDER_UNAVAILABLE', param })),
  createUnavailable: values =>
    dispatch(
      actionCreator({
        method: 'POST',
        contentType: 'JSON',
        action_type: 'CREATE_PROVIDER_UNAVAILABLE',
        values,
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard_Calendar);
