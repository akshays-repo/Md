import React from 'react';
import classNames from 'classnames';

const NotifyMsg = ({ message }) => {
  return <div className={classNames('field-notify', { hidden: !message })}>{message}</div>;
};

export default NotifyMsg;
