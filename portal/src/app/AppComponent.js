import HeaderComponent from '../header/HeaderComponent';
import PropTypes from 'prop-types';
import React from 'react';

const AppComponent = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      <div className="container-fluid">{children}</div>
    </div>
  );
};

AppComponent.propTypes = {
  children: PropTypes.any,
};

export default AppComponent;
