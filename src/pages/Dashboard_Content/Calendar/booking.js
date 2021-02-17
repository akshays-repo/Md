import React from 'react';

export const Booking = ({ eventInfo }) => {
  return (
    <p
      style={{
        color: '#6a6a6a',
        width: '100%',
        height: '100%',
        fontSize: 16,
        padding: 8,
        background: 'rgb(230, 241, 251)',
        margin: 0,
      }}
    >
      <b style={{ fontSize: 13 }}>{eventInfo.timeText}</b> &nbsp;
      {eventInfo.event._def.extendedProps.name} &nbsp; {eventInfo.event.title}
    </p>
  );
};
