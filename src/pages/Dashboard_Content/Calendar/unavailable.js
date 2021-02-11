import React from 'react';

export const Unavailable = ({ eventInfo }) => {
  return (
    <p
      style={{
        color: '#6b88d9',
        width: '100%',
        height: '100%',
        padding: 8,
        fontSize: 16,
        backgroundColor: '#ECF0FA',
        margin: 0,
      }}
    >
      <b style={{ fontSize: 13 }}>{eventInfo.timeText}</b> &nbsp;{' '}
      {eventInfo.event._def.extendedProps.name} &nbsp; {eventInfo.event.title}
    </p>
  );
};
