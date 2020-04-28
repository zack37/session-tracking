import React, { Component } from 'react';

import ClientDetailComponent from './ClientDetailComponent';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ClientDetailContainer extends Component {
  render() {
    if(this.props.client) {
      document.title = `Session Tracker - ${this.props.client.name}`;
    }

    return (
      this.props.client && <ClientDetailComponent client={this.props.client} />
    );
  }
}

ClientDetailContainer.propTypes = {
  client: PropTypes.object,
};

const mapStateToProps = state => {
  const selectedClient = state.clients.get('selectedClient');

  return {
    client: selectedClient && selectedClient.toJS(),
  };
};

export default connect(mapStateToProps)(ClientDetailContainer);
