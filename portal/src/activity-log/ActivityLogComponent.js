import './activity-log.css';

import { map, sortBy } from 'ramda';

import PropTypes from 'prop-types';
import React from 'react';
import Spinner from 'react-spinkit';
import classnames from 'classnames';
import moment from 'moment';
import startCase from 'lodash.startcase';

const combineActivity = (sessions, payments) => {
  const rawActivity = [
    ...map(s => ({ type: 'session', log: s }), sessions),
    ...map(p => ({ type: 'payment', log: p }), payments),
  ];

  return sortBy(x => -moment(x.log.date).unix(), rawActivity);
};

const createTable = activity => {
  const rows = map(({ type, log: { date, amount } }) => {
    const rowClass = classnames({
      'table-success': type === 'payment',
      'table-danger': type === 'session',
    });

    const key = `${type}-${date}-${amount}`;

    return (
      <tr key={key} className={rowClass}>
        <td>{startCase(type)}</td>
        <td>{moment(date).format('MMM DD, YYYY HH:mm A')}</td>
        <td>${amount}</td>
      </tr>
    );
  }, activity);

  return (
    <table className="table table-bordered table-responsive">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Type</th>
          <th scope="col">Date</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

const renderNoActivity = () => {
  return (
    <span className="display-4 text-muted d-block text-center">
      No Activity
    </span>
  );
};

const renderLoading = () => {
  return (
    <Spinner
      name="ball-beat"
      fadeIn="none"
      color="#343a40"
      className="d-flex mx-auto loading"
    />
  );
};

const ActivityLogComponent = ({ sessions, payments, isLoading }) => {
  const activity = combineActivity(sessions, payments);
  const hasActivity = activity.length > 0;

  const elementToRender = isLoading
    ? renderLoading()
    : hasActivity ? createTable(activity) : renderNoActivity();

  return <div className="col-md-12">{elementToRender}</div>;
};

ActivityLogComponent.propTypes = {
  sessions: PropTypes.array.isRequired,
  payments: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ActivityLogComponent;
