import './activity-log.css';

import { map, sortBy } from 'ramda';

import AddPaymentContainer from '../add-payment/AddPaymentContainer';
import AddSessionContainer from '../add-session/AddSessionContainer';
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
        <td>{moment(date).format('MMMM DD, YYYY')}</td>
        <td>${amount}</td>
      </tr>
    );
  }, activity);

  return (
    <div className="table-container">
      <table className="table table-bordered table-responsive-lg">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Date</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

const renderNoActivity = () => {
  return (
    <span className="display-4 text-muted d-block mx-auto text-center">
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
      className="d-flex mx-auto pl-5 loading"
    />
  );
};

const ActivityLogComponent = ({
  sessions,
  payments,
  isLoading,
  onAddPaymentClicked,
  isAddingPayment,
  isAddingSession,
  onAddSessionClicked,
}) => {
  const activity = combineActivity(sessions, payments);
  const hasActivity = !!activity.length;

  function detailsToRender() {
    if (isLoading) {
      return renderLoading();
    }

    if (hasActivity) {
      return createTable(activity);
    }

    return renderNoActivity();
  }

  function formToRender() {
    if (isAddingPayment) {
      return <AddPaymentContainer />;
    } else if (isAddingSession) {
      return <AddSessionContainer />;
    }
    return (
      <div>
        <button className="btn btn-primary mx-3" onClick={onAddPaymentClicked}>
          Add Payment
        </button>
        <button className="btn btn-primary mx-3" onClick={onAddSessionClicked}>
          Add Session
        </button>
      </div>
    );
  }

  return (
    <div className="col-md-10 mx-auto" style={{ maxHeight: '100%' }}>
      {detailsToRender()}
      <div className="col-md-12 mx-auto my-3 text-center">
        {formToRender()}
      </div>
    </div>
  );
};

ActivityLogComponent.propTypes = {
  sessions: PropTypes.array.isRequired,
  payments: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAddingPayment: PropTypes.bool.isRequired,
  onAddPaymentClicked: PropTypes.func.isRequired,
  isAddingSession: PropTypes.bool.isRequired,
  onAddSessionClicked: PropTypes.func.isRequired,
};

export default ActivityLogComponent;
