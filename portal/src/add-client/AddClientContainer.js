import React, { Component } from 'react';

import AddClientComponent from './AddClientComponent';
import { connect } from 'react-redux';
import { createClient } from '../actions/clients';

class AddClientContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientName: '',
    };
  }

  handleClientNameChange = ({ target: { value } }) => {
    this.setState({
      clientName: value,
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const name = this.state.clientName;

    const client = { name };

    return this.props.dispatch(createClient(client));
  };

  render() {
    return (
      <AddClientComponent
        clientName={this.state.clientName}
        handleClientNameChange={this.handleClientNameChange}
        handleFormSubmit={this.handleFormSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(AddClientContainer);
