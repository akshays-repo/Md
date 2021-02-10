import React, { useState } from 'react';
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

const Dashboard_Calendar = () => {
  const [weekendsVisible, setweekendsVisible] = useState(true);
  const [currentEvents, setcurrentEvents] = useState([]);
  const [modal, setModal] = useState(false);

  const handleWeekendsToggle = () => {
    setweekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = selectInfo => {
    setModal(true);
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
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = events => {
    setcurrentEvents(events);
  };

  const Calendar = () => {
    return (
      <Row className="calendarSection">
        {' '}
        <Col span={22}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            customButtons={{
              calendarFilter: {
                text: `FILTER`,
                click: function() {
                  alert('clicked the custom button!');
                },
              },
            }}
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
          <CalendarModal modal={modal} setModal={setModal} />
        </Col>
        <Col span={2} style={{ marginLeft: -80 }}>
          <FilterPopover />
        </Col>
      </Row>
    );
  };
  return <Dashboard_Content content={Calendar()} />;
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  );
}

export default Dashboard_Calendar;
