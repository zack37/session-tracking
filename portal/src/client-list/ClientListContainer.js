import React, { Component } from 'react';
import { getClients, selectClient } from '../actions/clients';

import ClientListComponent from './ClientListComponent';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fuzzysearch from 'fuzzysearch';
import { getPayments } from '../actions/payments';
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

  onClientClicked = (client) => {
    this.props.dispatch(selectClient(client));
    this.props.dispatch(getSessions(client._id));
    this.props.dispatch(getPayments(client._id));
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
        onClientClicked={this.onClientClicked}
      />
    );
  }
}

ClientListContainer.propTypes = {
  clients: PropTypes.array.isRequired,
  selectedClient: PropTypes.object,
  onClientClicked: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  clients: state.clients.clients,
  selectedClient: state.clients.selectedClient,
});

export default connect(mapStateToProps)(ClientListContainer);
