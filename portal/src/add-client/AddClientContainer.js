import React, { Component } from 'react';
import { cancelAddClient, createClient } from '../actions/clients';

import AddClientComponent from './AddClientComponent';
import { connect } from 'react-redux';

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

  handleCancelClicked = () => {
    this.props.dispatch(cancelAddClient());
  }

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
        onClientNameChanged={this.handleClientNameChange}
        onFormSubmitted={this.handleFormSubmit}
        onCancelClicked={this.handleCancelClicked}
      />
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(AddClientContainer);
