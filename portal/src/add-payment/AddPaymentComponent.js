import PropTypes from 'prop-types';
import React from 'react';

const AddPaymentComponent = ({
  onAddPaymentClicked,
  onAddPaymentSubmitted,
  date,
  onDateChanged,
  amount,
  onAmountChanged,
}) => {
  return (
    <form className="form col-md-6 mx-auto" onSubmit={onAddPaymentSubmitted}>
      <div className="form-group">
        <label htmlFor="date-input">Date</label>
        <input
          id="date-input"
          type="date"
          placeholder="Date"
          className="form-control"
          value={date}
          onChange={onDateChanged}
        />
      </div>
      <div className="form-group">
        <label htmlFor="amount-input">Amount</label>
        <div className="input-group">
          <span className="input-group-addon">$</span>
          <input
            id="amount-input"
            type="number"
            placeholder="Amount"
            className="form-control"
            value={amount}
            onChange={onAmountChanged}
          />
        </div>
      </div>
      <button className="btn btn-success">Add Payment</button>
    </form>
  );
};

AddPaymentComponent.propTypes = {};

export default AddPaymentComponent;
