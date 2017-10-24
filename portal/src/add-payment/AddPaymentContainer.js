import React, { Component } from 'react';
import { addPayment, cancelPayment, createPayment } from '../actions/payments';

import AddPaymentComponent from './AddPaymentComponent';
import PropTypes from 'prop-types';
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

  componentWillUnmount() {
    this.props.dispatch(cancelPayment());
  }

  handleAddPaymentSubmitted = (e) => {
    e.preventDefault();

    console.log('this.state', this.state);
  };

  handleDateChanged = ({ target: { value } }) => {
    // const [ y, m, d ] = value.split('-');
    this.setState({
      date: moment(value).format('YYYY-MM-DD')
    })
  };

  handleAmountChanged = ({ target: { value } }) => {
    // console.log('amount value', value);
    this.setState({
      amount: parseFloat(value, 10)
    })
  };

  render() {
    return (
      <AddPaymentComponent
        onAddPaymentClicked={this.handleAddPaymentClicked}
        onAddPaymentSubmitted={this.handleAddPaymentSubmitted}
        date={this.state.date}
        onDateChanged={this.handleDateChanged}
        amount={this.state.amount}
        onAmountChanged={this.handleAmountChanged}
      />
    );
  }
}

AddPaymentContainer.propTypes = {
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(AddPaymentContainer);
