import React, { Component } from 'react';

import DashboardComponent from './DashboardComponent';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class DashboardContainer extends Component {
  render() {
    return <DashboardComponent isAddingClient={this.props.isAddingClient} />;
  }
}

DashboardContainer.propTypes = {
  isAddingClient: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAddingClient: state.clients.get('isAdding'),
});

export default connect(mapStateToProps)(DashboardContainer);
