import './client-detail.css';

import ActivityLogContainer from '../activity-log/ActivityLogContainer';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

function between(num, lower, upper) {
  return num >= lower && num <= upper;
}

const ClientDetailComponent = ({ client }) => {
    const balanceClasses = classnames('display-3', {
      'text-success': client.balance > 30,
      'text-warning': between(client.balance, -30, 30),
      'text-danger': client.balance < -30,
    });

    return (
      <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
        <h1>Details</h1>
        <div className="row">
          <div className="col-md-8">
            <span className="display-3">{client.name}</span>
          </div>
          <div className="col-md-4">
            <span className={balanceClasses}>${client.balance}</span>
          </div>
        </div>
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
