import PropTypes from 'prop-types';
import React from 'react';

const AddClientComponent = ({
  clientName,
  onClientNameChanged,
  onFormSubmitted,
  onCancelClicked,
}) => {
  return (
    <div className="d-block mx-auto col-sm-5">
      <form className="form" onSubmit={onFormSubmitted}>
        <div className="form-group">
          <label htmlFor="clientNameInput">Client Name</label>
          <input
            type="text"
            className="form-control"
            id="clientNameInput"
            value={clientName}
            onChange={onClientNameChanged}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary float-right mx-2">
          Add Client
        </button>
        <input
          type="button"
          className="btn btn-light float-right mx-2"
          onClick={onCancelClicked}
          value="Cancel"
        />
      </form>
    </div>
  );
};

AddClientComponent.propTypes = {
  clientName: PropTypes.string,
  onClientNameChanged: PropTypes.func.isRequired,
  onFormSubmitted: PropTypes.func.isRequired,
  onCancelClicked: PropTypes.func.isRequired,
};

export default AddClientComponent;
