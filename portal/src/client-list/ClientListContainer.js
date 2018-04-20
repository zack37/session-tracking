import React, { Component } from 'react';
import {
  addClient,
  getClients,
  searchClients,
  selectClient,
} from '../actions/clients';

import ClientListComponent from './ClientListComponent';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ClientListContainer extends Component {
  componentDidMount() {
    this.props.getClients();
  }

  handleClientClicked = client => {
    this.props.selectClient(client);
  };

  handleAddClientClicked = () => {
    this.props.addClient();
  };

  render() {
    return (
      <ClientListComponent
        isLoading={this.props.isLoading}
        clients={this.props.clients}
        selectedClient={this.props.selectedClient}
        onSearch={this.props.searchClients}
        onClientClicked={this.handleClientClicked}
        onAddClientClicked={this.handleAddClientClicked}
        isAdding={this.props.isAdding}
      />
    );
  }
}

ClientListContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  clients: PropTypes.array.isRequired,
  selectedClient: PropTypes.object,
  isAdding: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ clients }) => {
  const selectedClient = clients.get('selectedClient');

  return {
    isLoading: clients.get('isLoading'),
    clients: (
      clients.get('filteredClients') || clients.get('clients')
    ).toJS(),
    selectedClient: selectedClient && selectedClient.toJS(),
    isAdding: clients.get('isAdding'),
  };
};

const mapPropsToDispatch = dispatch => {
  const actions = {
    getClients,
    addClient,
    searchClients,
    selectClient,
  };

  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapPropsToDispatch)(
  ClientListContainer
);
