import React, { Component } from 'react';
import { cancelSession, createSession } from '../actions/sessions';

import AddSessionComponent from './AddSessionComponent';
import { connect } from 'react-redux';
import moment from 'moment';
import { subtractBalance } from '../actions/clients';

class AddSessionContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      amount: 0,
    };
  }

  handleAddSessionSubmitted = e => {
    e.preventDefault();

    const { date, amount } = this.state;

    const session = { date, amount };

    this.props.dispatch(createSession(session));
    this.props.dispatch(subtractBalance(amount));
  };

  handleCancelSession = () => {
    this.props.dispatch(cancelSession());
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
      <AddSessionComponent
        onAddSessionSubmitted={this.handleAddSessionSubmitted}
        date={this.state.date}
        onDateChanged={this.handleDateChanged}
        amount={this.state.amount}
        onAmountChanged={this.handleAmountChanged}
        onCancelClicked={this.handleCancelSession}
      />
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(AddSessionContainer);
