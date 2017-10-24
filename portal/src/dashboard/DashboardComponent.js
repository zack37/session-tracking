import AddClientContainer from '../add-client/AddClientContainer';
import ClientDetailContainer from '../client-detail/ClientDetailContainer';
import ClientListContainer from '../client-list/ClientListContainer';
import PropTypes from 'prop-types';
import React from 'react';

const ContainerComponent = ({ isAddingClient }) => {
  return (
    <div className="row">
      <ClientListContainer />
      <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
        {isAddingClient ? <AddClientContainer /> : <ClientDetailContainer />}
      </main>
    </div>
  );
};

ContainerComponent.propTypes = {
  isAddingClient: PropTypes.bool.isRequired,
};

export default ContainerComponent;
