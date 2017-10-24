import './client-list.css';

import { compose, map, prop, sortBy } from 'ramda';

import PropTypes from 'prop-types';
import React from 'react';
import Spinner from 'react-spinkit';
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

const renderLoading = () => {
  return (
    <Spinner
      name="ball-beat"
      fadeIn="none"
      color="#343a40"
      className="d-flex mx-auto pl-5 loading"
    />
  );
};

const ClientListComponent = ({
  isLoading,
  clients,
  selectedClient,
  onClientClicked,
  onSearch,
  onAddClientClicked,
  isAdding,
}) => {
  const clientListItems = compose(
    map(createClientListItem(onClientClicked, selectedClient)),
    sortBy(prop('name'))
  )(clients);

  const elementToRender = isLoading ? renderLoading() : clientListItems;

  return (
    <nav
      className="col-sm-3 col-md-2 d-sm-block bg-light sidebar"
      style={{ height: `${0.95 * window.innerHeight}px` }}
    >
      <div className="mt-2 mb-2 mt-md-0">
        <button
          id="add-client-button"
          className="btn btn-success d-block mx-auto px-3"
          onClick={onAddClientClicked}
          disabled={isAdding}
        >
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
      <ul className="nav nav-pills flex-column">{elementToRender}</ul>
    </nav>
  );
};

ClientListComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  clients: PropTypes.array.isRequired,
  selectedClient: PropTypes.object,
  onClientClicked: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onAddClientClicked: PropTypes.func.isRequired,
  isAdding: PropTypes.bool.isRequired,
};

export default ClientListComponent;
