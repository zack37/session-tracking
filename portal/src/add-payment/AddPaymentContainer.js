import React, { Component } from 'react';
import { cancelPayment, createPayment } from '../actions/payments';

import AddPaymentComponent from './AddPaymentComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

class AddPaymentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      amount: 0,
    };
  }

  handleAddPaymentSubmitted = e => {
    e.preventDefault();

    const { date, amount } = this.state;

    const payment = { date, amount };

    this.props.createPayment(payment);
  };

  handleCancelPayment = () => {
    this.props.cancelPayment();
  };

  handleDateChanged = ({ target: { value } }) => {
    this.setState({
      date: moment(value).format('YYYY-MM-DD'),
    });
  };

  handleAmountChanged = ({ target: { value } }) => {
    this.setState({
      amount: parseFloat(value || 0, 10),
    });
  };

  render() {
    return (
      <AddPaymentComponent
        onAddPaymentSubmitted={this.handleAddPaymentSubmitted}
        date={this.state.date}
        onDateChanged={this.handleDateChanged}
        amount={this.state.amount}
        onAmountChanged={this.handleAmountChanged}
        onCancelClicked={this.handleCancelPayment}
      />
    );
  }
}

AddPaymentContainer.propTypes = {};

const mapStateToProps = state => ({});
const mapPropsToDispatch = dispatch => {
  const actions = {
    createPayment,
    cancelPayment,
  };

  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapPropsToDispatch)(AddPaymentContainer);
