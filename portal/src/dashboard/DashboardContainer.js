import React, { Component } from 'react';

import DashboardComponent from './DashboardComponent';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddingClient: false,
    };
  }

  render() {
    return <DashboardComponent isAddingClient={this.props.isAddingClient} />;
  }
}

DashboardContainer.propTypes = {
  isAddingClient: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAddingClient: state.clients.isAdding,
});

export default connect(mapStateToProps)(DashboardContainer);
