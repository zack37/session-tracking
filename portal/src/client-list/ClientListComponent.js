import './client-list.css';

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

// eslint-disable-next-line react/display-name
const createClientListItem = (onClientClicked, selectedClient) => client => (
  <li
    key={client._id}
    className={classnames('nav-item', 'client-select', {
      active: selectedClient === client,
    })}
    onClick={() => onClientClicked(client)}
  >
    <h4 className="nav-link pt-3">{client.name}</h4>
  </li>
);

const ClientListComponent = ({
  clients,
  selectedClient,
  onClientClicked,
  onSearch,
}) => {
  const clientListItems = clients.map(
    createClientListItem(onClientClicked, selectedClient)
  );

  return (
    <nav className="col-sm-3 col-md-2 d-sm-block bg-light sidebar">
      <div className="mt-2 mb-2 mt-md-0">
        <button id="add-client-button" className="btn btn-success d-block mx-auto px-3" disabled>
          Add Client
        </button>
        <br />
        <input
          className="form-control mr-sm-2"
          placeholder="Search..."
          type="text"
          onChange={e => onSearch(e.target.value)}
        />
      </div>
      <ul className="nav nav-pills flex-column">{clientListItems}</ul>
    </nav>
  );
};

ClientListComponent.propTypes = {
  clients: PropTypes.array.isRequired,
  selectedClient: PropTypes.object,
  onClientClicked: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default ClientListComponent;
