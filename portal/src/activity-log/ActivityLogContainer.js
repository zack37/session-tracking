import React, { Component } from 'react';

import ActivityLogComponent from './ActivityLogComponent';
import PropTypes from 'prop-types';
import { addPayment } from '../actions/payments';
import { addSession } from '../actions/sessions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ActivityLogContainer extends Component {
  handleAddPaymentClicked = () => {
    this.props.addPayment();
  };

  handleAddSessionClicked = () => {
    this.props.addSession();
  };

  render() {
    return (
      <ActivityLogComponent
        sessions={this.props.sessions}
        payments={this.props.payments}
        isLoading={this.props.isLoadingPayments || this.props.isLoadingSessions}
        isAddingPayment={this.props.isAddingPayment}
        onAddPaymentClicked={this.handleAddPaymentClicked}
        isAddingSession={this.props.isAddingSession}
        onAddSessionClicked={this.handleAddSessionClicked}
      />
    );
  }
}

ActivityLogContainer.propTypes = {
  sessions: PropTypes.array,
  payments: PropTypes.array,
  isLoadingSessions: PropTypes.bool.isRequired,
  isLoadingPayments: PropTypes.bool.isRequired,
  isAddingPayment: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const clientId = state.clients.getIn(['selectedClient', '_id']);
  const sessions = state.sessions.getIn(['sessionsByClient', clientId]);
  const payments = state.payments.getIn(['paymentsByClient', clientId]);

  return {
    sessions: sessions ? sessions.toJS() : [],
    payments: payments ? payments.toJS() : [],
    isLoadingSessions: state.sessions.get('isLoading'),
    isAddingSession: state.sessions.get('isAdding'),
    isLoadingPayments: state.payments.get('isLoading'),
    isAddingPayment: state.payments.get('isAdding'),
  };
};

const mapPropsToDispatch = dispatch => {
  const actions = {
    addPayment,
    addSession,
  };

  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapPropsToDispatch)(
  ActivityLogContainer
);
