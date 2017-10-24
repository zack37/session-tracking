import React, { Component } from 'react';

import ActivityLogComponent from './ActivityLogComponent';
import PropTypes from 'prop-types';
import { addPayment } from '../actions/payments';
import { connect } from 'react-redux';

class ActivityLogContainer extends Component {

  handleAddPaymentClicked = () => {
    this.props.dispatch(addPayment());
  };

  render() {
    return (
      <ActivityLogComponent
        sessions={this.props.sessions}
        payments={this.props.payments}
        isLoading={this.props.isLoadingPayments || this.props.isLoadingSessions}
        isAddingPayment={this.props.isAddingPayment}
        onAddPaymentClicked={this.handleAddPaymentClicked}
      />
    );
  }
}

ActivityLogContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sessions: PropTypes.array,
  payments: PropTypes.array,
  isLoadingSessions: PropTypes.bool.isRequired,
  isLoadingPayments: PropTypes.bool.isRequired,
  isAddingPayment: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const clientId = state.clients.selectedClient._id;

  return {
    sessions: state.sessions.sessionsByClient[clientId] || [],
    payments: state.payments.paymentsByClient[clientId] || [],
    isLoadingSessions: state.sessions.isLoading,
    isLoadingPayments: state.payments.isLoading,
    isAddingPayment: state.payments.isAdding,
    isAddingSession: state.sessions.isAdding,
  };
};

export default connect(mapStateToProps)(ActivityLogContainer);
