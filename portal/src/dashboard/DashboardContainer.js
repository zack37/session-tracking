import React, { Component } from 'react';

import DashboardComponent from './DashboardComponent';
import config from '../config';
import createApi from '../api';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);

    this.api = createApi(config.api.url);
    this.state = {
      clients: [],
      selectedClient: null,
    };
  }

  refreshClients = () => {
    this.api
      .get('/clients')
      .subscribe(clients =>
        this.setState({ clients, selectedClient: clients[0] })
      );
  };

  componentDidMount() {
    this.refreshClients();
  }

  handleClientSelected = client => {
    this.setState({ selectedClient: client });
  };

  handleSessionLogged = (date, amount) => {
    console.log('session logged', date, amount);
  };

  handlePaymentReceived = (date, amount) => {
    console.log('payment received', date, amount);
  };

  render() {
    return (
      <DashboardComponent
        clients={this.state.clients}
        selectedClient={this.state.selectedClient}
        handleClientSelected={this.handleClientSelected}
        handleSessionLogged={this.handleSessionLogged}
        handlePaymentReceived={this.handlePaymentReceived}
      />
    );
  }
}

export default DashboardContainer;
