
import React from 'react';
import PropTypes from 'prop-types';
import InactiveSwitch from '../../../assets/bilge/White Inactive Switch.svg';
import ActiveSwitch from '../../../assets/bilge/White Active Switch.svg';

const BilgeSwitch = ({ status }) => (
  <div style={{ marginTop: '10px' }}>
    {status.actualState
      ? <img src={ActiveSwitch} width="75px" alt="Active" style={{ borderRadius: '25%', border: '2px solid #de8d05', padding: '5px' }} />
      : <img src={InactiveSwitch} width="75px" alt="Inactive" style={{ borderRadius: '25%', border: '2px solid rgb(111, 146, 162)', padding: '5px' }} />}
  </div>
);

BilgeSwitch.propTypes = {
  status: PropTypes.instanceOf(Object).isRequired,
};

export default BilgeSwitch;
