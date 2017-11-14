import React, { Component } from 'react';
import { addClient, getClients, selectClient } from '../actions/clients';

import ClientListComponent from './ClientListComponent';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fuzzysearch from 'fuzzysearch';

class ClientListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
    };
  }

  componentDidMount() {
    this.props.getClients();
  }

  handleClientClicked = client => {
    this.props.selectClient(client);
  };

  handleAddClientClicked = () => {
    this.props.addClient();
  };

  handleSearch = text => {
    this.setState({
      searchTerm: text.toLowerCase(),
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

const mapPropsToDispatch = dispatch => {
  const actions = {
    getClients,
    addClient,
    selectClient,
  };

  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapPropsToDispatch)(ClientListContainer);
