import { NavLink } from 'react-router-dom';
import React from 'react';

const HeaderComponent = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <NavLink to="/" className="navbar-brand" >Session Tracker</NavLink>
      <div id="navbar-nav-items" className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto"></ul>
      </div>
    </nav>
  );
};

export default HeaderComponent;
