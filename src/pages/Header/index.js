import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="dashboard__header">
      <Link to="/">{localStorage.getItem('name') || 'Login'}</Link>
    </div>
  );
};

export default Header;
