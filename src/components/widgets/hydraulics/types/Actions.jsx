import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import {
  DUMP, PUMP, EASE, COUNTER_CLOCKWISE, CLOCKWISE, TACK, PORT, STARBOARD, FORCE_STOP, MOVE,
} from '../../../../api/hydraulicActions';
import TouchButton from '../TouchButton';
import Parameter from '../Parameter';
import Sensor from '../Sensor';

const Actions = ({ type, actuator }) => {
  const renderByType = useMemo(() => {
    switch (type) {
      case 'Passive_Ram': {
        return (
          <Row type="flex" justify="space-around">
            <TouchButton name="Pump" action={PUMP} signalName={actuator} />
            <TouchButton name="Ease" action={EASE} signalName={actuator} />
          </Row>
        );
      }
      case 'Passive_Ram_with_Dump': {
        return (
          <Row type="flex" justify="space-around">
            <TouchButton name="Pump" action={PUMP} signalName={actuator} />
            <TouchButton name="Ease" action={EASE} signalName={actuator} />
            <TouchButton name="Dump" action={DUMP} signalName={actuator} />
          </Row>
        );
      }
      case 'Rotator_Ram': {
        return (
          <Row type="flex" justify="space-around">
            <TouchButton name="CW" action={CLOCKWISE} signalName={actuator} />
            <TouchButton name="CCW" action={COUNTER_CLOCKWISE} signalName={actuator} />
            <TouchButton name="Float" action={DUMP} signalName={actuator} />
            <TouchButton name="Tack" action={TACK} signalName={actuator} />
          </Row>
        );
      }
      case 'Linear_Absolute': {
        return (
          <Row type="flex" justify="space-around">
            <TouchButton name="Go" action={MOVE} signalName={actuator} />
            <TouchButton name="Stop" action={FORCE_STOP} signalName={actuator} />
          </Row>
        );
      }
      case 'Daggerboard_Ram': {
        return (
          <Row>
            <Row type="flex" justify="space-around">
              <TouchButton name="Go" action={MOVE} signalName={actuator} />
              <TouchButton name="Stop" action={FORCE_STOP} signalName={actuator} />
              <TouchButton name="Float" action={DUMP} signalName={actuator} />
            </Row>
            <Row type="flex" justify="space-around" align="middle">
              <Parameter
                name="Target Position"
                signalName={actuator}
                min={0}
                max={100}
                unit="%"
                parameter={4}
              />
              <Sensor
                label="Current Position"
                actuator={actuator}
                id={3}
                format="%"
                span={11}
              />
            </Row>
          </Row>

        );
      }
      case 'Brushed_DC_Motor': {
        return (
          <Row type="flex" justify="space-around">
            <TouchButton signalName={actuator} name="1/3" action={CLOCKWISE} />
            <TouchButton signalName={actuator} name="2" action={COUNTER_CLOCKWISE} />
          </Row>
        );
      }
      case 'Line_Driver': {
        return (
          <Row type="flex" justify="space-around">
            <TouchButton signalName={actuator} name="Port" action={PORT} />
            <TouchButton signalName={actuator} name="Stbd" action={STARBOARD} />
          </Row>
        );
      }
      default:
        return <div>Test</div>;
    }
  }, [type, actuator]);

  return (
    <div className="hydraulic-actions">
      {renderByType}
    </div>
  );
};

Actions.propTypes = {
  type: PropTypes.string.isRequired,
  actuator: PropTypes.string.isRequired,
};

export default Actions;
