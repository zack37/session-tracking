import PropTypes from 'prop-types';
import React from 'react';

const AddClientComponent = ({
  clientName,
  handleClientNameChange,
  handleFormSubmit,
}) => {
  return (
    <div className="d-block mx-auto col-sm-5">
      <form className="form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="clientNameInput">Client Name</label>
          <input
            type="text"
            className="form-control"
            id="clientNameInput"
            value={clientName}
            onChange={handleClientNameChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary float-right">
          Add Client
        </button>
      </form>
    </div>
  );
};

AddClientComponent.propTypes = {
  clientName: PropTypes.string,
  handleClientNameChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
};

export default AddClientComponent;
