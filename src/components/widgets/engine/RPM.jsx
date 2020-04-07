import React from 'react';
import PropTypes from 'prop-types';
import GaugeChart from 'react-gauge-chart';

const RPM = ({ rpm, name, engineOn }) => (
  <div className="engine-gauge">
    <GaugeChart
      id={name}
      arcsLength={[0.4, 0.3, 0.1, 0.2]}
      colors={['#3d3d3d', '#4d4d4d', '#DE8D05', '#A20021']}
      percent={rpm / 4000}
      animate={false}
      formatTextValue={() => `${rpm} ${engineOn ? rpm ? 'RPM' : 'Off' : 'No Data'}`}
      arcPadding={0.01}
      textColor="rgba(255, 255, 255, 0.90)"
      needleColor="rgba(255, 255, 255, 0.33)"
      needleBaseColor="#1d1d1d"
    />
  </div>
);

RPM.propTypes = {
  rpm: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default RPM;
