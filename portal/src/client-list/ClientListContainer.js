import React, { Component } from 'react';
import { addClient, getClients, selectClient } from '../actions/clients';
import { cancelPayment, getPayments } from '../actions/payments';

import ClientListComponent from './ClientListComponent';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fuzzysearch from 'fuzzysearch';
import { getSessions } from '../actions/sessions';

class ClientListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(getClients());
  }

  handleClientClicked = (client) => {
    this.props.dispatch(selectClient(client));
    this.props.dispatch(getSessions(client._id));
    this.props.dispatch(getPayments(client._id));

    // cancel open forms
    this.props.dispatch(cancelPayment());
  }

  handleAddClientClicked = () => {
    this.props.dispatch(addClient());
    this.props.dispatch(cancelPayment());
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
        isLoading={this.props.isLoading}
        clients={filteredClients}
        selectedClient={this.props.selectedClient}
        onSearch={this.handleSearch}
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

const mapStateToProps = state => ({
  isLoading: state.clients.isLoading,
  clients: state.clients.clients,
  selectedClient: state.clients.selectedClient,
  isAdding: state.clients.isAdding,
});

export default connect(mapStateToProps)(ClientListContainer);
