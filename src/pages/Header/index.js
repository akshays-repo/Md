import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="dashboard__header">
      <h3><Link to="/">{localStorage.getItem('name') || 'Login'}</Link></h3>
    </div>
  );
};

export default Header;
