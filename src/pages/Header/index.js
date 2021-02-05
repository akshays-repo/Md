import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="dashboard__header">
      <h2><Link to="/">{localStorage.getItem('name') || 'Login'}</Link></h2>
    </div>
  );
};

export default Header;
