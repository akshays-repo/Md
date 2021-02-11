import React from 'react';

export const Cancelled = ({ eventInfo }) => {
  return (
    <p
      style={{
        color: '#00b4cd',
        width: '100%',
        height: '100%',
        fontSize: 16,
        padding: 8,
        background:
          'linear-gradient(to left,rgba(0,203,230,.1),rgba(0,203,230,.1)),linear-gradient(to left,#fff,#fff)',
        margin: 0,
      }}
    >
      <b style={{ fontSize: 13 }}>{eventInfo.timeText}</b> &nbsp;{' '}
      <del>
        {eventInfo.event._def.extendedProps.name} &nbsp;{eventInfo.event.title}
      </del>
    </p>
  );
};
