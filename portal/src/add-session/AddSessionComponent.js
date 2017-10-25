import PropTypes from 'prop-types';
import React from 'react';

const AddSessionComponent = ({
  onAddSessionSubmitted,
  date,
  onDateChanged,
  amount,
  onAmountChanged,
  onCancelClicked,
}) => {
  return (
    <form className="form col-md-6 mx-auto" onSubmit={onAddSessionSubmitted}>
      <h3>Add new session</h3>
      <div className="form-group">
        <label htmlFor="date-input">Date</label>
        <input
          type="date"
          required
          className="form-control"
          id="date-input"
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
            min="0"
            className="form-control"
            value={amount}
            onChange={onAmountChanged}
          />
        </div>
      </div>
      <div className="my-2">
        <input
          type="button"
          className="btn btn-light mx-2"
          value="Cancel"
          onClick={onCancelClicked}
        />
        <button type="submit" className="btn btn-success mx-2">
          Add Session
        </button>
      </div>
    </form>
  );
};

AddSessionComponent.propTypes = {
  onAddSessionSubmitted: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  onDateChanged: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  onAmountChanged: PropTypes.func.isRequired,
  onCancelClicked: PropTypes.func.isRequired,
};

export default AddSessionComponent;
