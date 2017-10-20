import React, { Component } from 'react';

import ClientDetailComponent from './ClientDetailComponent';
import PropTypes from 'prop-types';

class ClientDetailContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <ClientDetailComponent client={this.props.client} />
    );
  }
}

ClientDetailContainer.propTypes = {
  client: PropTypes.object.isRequired,
};

export default ClientDetailContainer;
