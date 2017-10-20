import './activity-log.css';

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import startCase from 'lodash.startcase';

const ActivityLogComponent = ({ activity }) => {
  const rows = activity.map(({ type, log: { date, amount } }, i) => {
    const rowClass = classnames({
      'table-success': type === 'payment',
      'table-danger': type === 'session'
    });

    return (
      <tr key={i} className={rowClass}>
        <td>{startCase(type)}</td>
        <td>{moment(date).format('MMM DD, YYYY')}</td>
        <td>${amount}</td>
      </tr>
    );
  });

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

ActivityLogComponent.propTypes = {
  activity: PropTypes.array.isRequired,
};

export default ActivityLogComponent;
