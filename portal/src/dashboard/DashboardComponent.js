import ClientDetailContainer from '../client-detail/ClientDetailContainer';
import ClientListContainer from '../client-list/ClientListContainer';
import PropTypes from 'prop-types';
import React from 'react';

const ContainerComponent = ({
  handleClientSelected,
}) => {
  return (
    <div className="row">
      <ClientListContainer onClientClicked={handleClientSelected} />
      <ClientDetailContainer />
    </div>
  );
};

ContainerComponent.propTypes = {
  handleClientSelected: PropTypes.func.isRequired,
};

export default ContainerComponent;
