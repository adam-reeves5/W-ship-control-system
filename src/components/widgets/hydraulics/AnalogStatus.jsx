import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';

const AnalogStatus = ({
  value, name, span, status, format,
}) => (
  <Col xs={24} sm={12} md={span} lg={span} xl={span}>
    <Col span={24}>
      <h6 style={{ textAlign: 'center' }}>
        {`${name} ${format && <small>{format}</small>}`}
      </h6>
    </Col>
    <Col span={24}>
      {(value !== -1) ? <p className="battery-number">{status}</p> : <p className="battery-number">N/A</p>}
    </Col>
  </Col>
);

AnalogStatus.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  format: PropTypes.string,
  span: PropTypes.number,
};

export default AnalogStatus;
