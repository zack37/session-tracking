import React, { Component } from 'react';

import ClientListComponent from './ClientListComponent';
import PropTypes from 'prop-types';
import fuzzysearch from 'fuzzysearch';

class ClientListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
    };
  }

  handleSearch = text => {
    this.setState({
      searchTerm: text.toLowerCase()
    });
  };

  render() {
    const filteredClients = this.state.searchTerm
      ? this.props.clients.filter(x =>
          fuzzysearch(this.state.searchTerm, x.name.toLowerCase())
        )
      : this.props.clients;

    return (
      <ClientListComponent
        clients={filteredClients}
        selectedClient={this.props.selectedClient}
        onSearch={this.handleSearch}
        onClientClicked={this.props.onClientClicked}
      />
    );
  }
}

ClientListContainer.propTypes = {
  clients: PropTypes.array.isRequired,
  selectedClient: PropTypes.object,
  onClientClicked: PropTypes.func.isRequired,
};

export default ClientListContainer;
