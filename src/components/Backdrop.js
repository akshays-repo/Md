import React from 'react';
import classNames from 'classnames';

const Backdrop = ({ children, active }) => {
  if (children) return <div className={classNames('backdrop', { 'active': active })}>{children}</div>;
  return <div className={classNames('backdrop', { 'active': active })} />;
};

export default Backdrop;
