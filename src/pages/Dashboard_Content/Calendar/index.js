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
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({});
  const [unavailableDetails, setUnavailableDetails] = useState({});

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
        setBookingDetails({ ...clickInfo.event._def.extendedProps, id: clickInfo.event.id });
        setBookingEditModal(true);
        break;
      case 'Unavailable':
        setUnavailableDetails({ ...clickInfo.event._def.extendedProps, id: clickInfo.event.id });
        setUnavailableModal(true);
        break;
      default:
        setBookingDetails({ ...clickInfo.event._def.extendedProps, id: clickInfo.event.id });
        setBookingEditModal(true);
    }
  };

  const handleEvents = events => {
    console.log('Events', events);
    // setcurrentEvents(events);
  };

  useEffect(() => {
    props.fetchHospitalProvider();
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
      default:
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
        <Col lg={24} style={{ height: 50 }}>
          <div className="filterButton">
          <FilterPopover from={from} to={to} {...props} provider={props.provider} />
          </div>
        </Col>
        <Col lg={24} xs={24} className="calenderBlock">
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
            // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            // initialEvents={props.appointment} // alternatively, use the `events` setting to fetch from a feed
            initialEvents={(fetchInfo, successCallback, failureCallback) => {
              setFrom(moment(fetchInfo.start).format('YYYY-MM-DD'));
              setTo(moment(fetchInfo.end).format('YYYY-MM-DD'));
              return [...props.appointment, ...props.unavailable];
            }}
            events={[...props.appointment, ...props.unavailable]}
            // eventSources={props.appointment}
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
          <BookingEdit
            {...props}
            modal={bookingEditModal}
            bookingDetails={bookingDetails}
            setBookingDetails={setBookingDetails}
            setModal={setBookingEditModal}
          />
          <UnavailableEdit
            modal={unavailableModal}
            setModal={setUnavailableModal}
            unavailableDetails={unavailableDetails}
            setUnavailableDetails={setUnavailableDetails}
            {...props}
          ></UnavailableEdit>
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

const mapStoreToProps = ({
  Provider,
  Patient,
  AppointmentType,
  Appointment,
  Branch,
  Unavailable,
}) => {
  console.log('Store CustomForm', Appointment);
  return {
    provider: Provider.payload,
    patient: Patient.payload,
    appointment_type: AppointmentType.payload,
    branch: Branch.payload,
    appointment: Appointment.payload,
    appointment_changed: Appointment.changed,
    unavailable_changed: Unavailable.changed,
    unavailable: Unavailable.payload,
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
  fetchProvider: () => dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_PROVIDER' })),
  fetchBranchProvider: id =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_BRANCH_PROVIDER', id })),
  fetchAppointmentBranchProvider: param =>
    dispatch(
      actionCreator({ method: 'GET', action_type: 'FETCH_BRANCH_APPOINTMENT_PROVIDER', param }),
    ),
  fetchHospitalProvider: () =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_PROVIDER' })),
  fetchBranch: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_BRANCH', param })),
  fetchPatient: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_PATIENT', param })),
  fetchAppointmentType: param =>
    dispatch(
      actionCreator({ method: 'GET', action_type: 'FETCH_HOSPITAL_APPOINTMENT_TYPE', param }),
    ),
  fetchAppointment: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FILTER_APPOINTMENT_CALENDAR', param })),
  fetchAppointmentWithCancelled: param =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'FILTER_APPOINTMENT_CALENDAR_WITH_CANCELLED',
        param,
      }),
    ),
  fetchUnavailable: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_UNAVAILABLE_PROVIDER', param })),
  createUnavailable: values =>
    dispatch(
      actionCreator({
        method: 'POST',
        contentType: 'JSON',
        action_type: 'CREATE_PROVIDER_UNAVAILABLE',
        values,
      }),
    ),
  editUnavailable: (id, values) =>
    dispatch(
      actionCreator({
        method: 'PUT',
        contentType: 'JSON',
        action_type: 'EDIT_PROVIDER_UNAVAILABLE',
        id,
        values,
      }),
    ),
  deleteUnavailable: id =>
    dispatch(
      actionCreator({
        method: 'DELETE',
        contentType: 'JSON',
        action_type: 'DELETE_PROVIDER_UNAVAILABLE',
        id,
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard_Calendar);
