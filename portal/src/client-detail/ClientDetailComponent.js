import './client-detail.css';

import ActivityLogContainer from '../activity-log/ActivityLogContainer';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

function between(num, lower, upper) {
  return num >= lower && num <= upper;
}

function renderClient({ name, balance }) {
  const balanceClasses = classnames({
    'display-4': true,
    'text-success': balance > 30,
    'text-warning': between(balance, -30, 30),
    'text-danger': balance < -30,
  });

  return (
    <div className="col-sm-12 text-center">
      <div className="col-sm-12 display-3">{name}</div>
      <div className="col-sm-12">
        <span className={balanceClasses}>${balance}</span>
      </div>
    </div>
  );
}

const ClientDetailComponent = ({ client }) => {
  return (
    <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
      <div className="row p-4">{renderClient(client)}</div>

      <div className="row">
        <ActivityLogContainer client={client} />
      </div>
    </main>
  );
};

ClientDetailComponent.propTypes = {
  client: PropTypes.object.isRequired,
};

export default ClientDetailComponent;
