import React from 'react';

export const Head = ({ title, children, iconImg }) => {
  return (
    <div className="information-head-wrapper">
      <h4 className="information-head">
        {title}
        {iconImg && <img src={iconImg} className="lazy" alt="" />}
      </h4>

      {children}
    </div>
  );
};

const Info = ({ children, className, style }) => {
  return (
    <div className={`information-wrapper ${className}`} style={style}>
      {children}
    </div>
  );
};

Info.defaultProps = {
  className: '',
  style: {},
};

export default Info;
