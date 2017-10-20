import ClientDetailContainer from '../client-detail/ClientDetailContainer';
import ClientListContainer from '../client-list/ClientListContainer';
import PropTypes from 'prop-types';
import React from 'react';

const ContainerComponent = ({
  clients,
  selectedClient,
  handleClientSelected,
  handleSessionLogged,
  handlePaymentReceived,
}) => {
  return (
    <div className="row">
      <ClientListContainer
        clients={clients}
        selectedClient={selectedClient}
        onClientClicked={handleClientSelected}
      />
      { selectedClient && <ClientDetailContainer client={selectedClient} /> }
    </div>
  );
};

ContainerComponent.propTypes = {
  clients: PropTypes.array.isRequired,
  selectedClient: PropTypes.object,
  handleClientSelected: PropTypes.func.isRequired,
  // handleSessionLogged: PropTypes.func.isRequired,
  // handlePaymentReceived: PropTypes.func.isRequired,
};

export default ContainerComponent;
