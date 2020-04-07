import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import {
  Progress, Col, Typography, Button,
} from 'antd';
import { Link } from 'react-router-dom';

const { Paragraph, Text } = Typography;
const Tank = ({
  name,
  tank,
  type,
  tankName,
  showDetails = true,
  width = 160,
  connected,
}) => {
  const levelInLitres = useMemo(() => {
    if (connected.transmitting) {
      return (((tank.currentLevel.value * 100) * tank.capacity.value) / 100).toFixed(0);
    } return 0;
  }, [connected.transmitting, tank.currentLevel, tank.capacity]);
  const renderStrokeColor = useMemo(() => {
    if (type === 'Waste') {
      return 'gray';
    }
    if (type === 'Fuel') {
      return '#cab995';
    }
    return 'rgb(131, 185, 212)';
  }, [type]);

  return (
    <Col xs={24} sm={12}>
      <div className="tank-widget">
        <Paragraph className="tank-widget-title">
          {name}
        </Paragraph>
        <Paragraph className="tank-widget-capacity">
          {`${tank.capacity ? `Capacity: ${tank.capacity.value.toFixed(0)} L` : 'No Data'}`}
        </Paragraph>
        {!connected.transmitting ? (
          <Progress
            type="dashboard"
            percent={0}
            format={() => (
              <div className="tank-widget-progress-bar-div">
                --
                {showDetails && (
                <div className="tank-widget-progress-bar-details">
                  <Link to={`/tanks/${tankName}`}><Button type="link" icon="setting" /></Link>
                </div>
                )}
              </div>
            )}
            gapDegree={0}
            strokeColor={renderStrokeColor}
            strokeWidth={10}
            width={width}
          />
        )
          : (
            <Progress
              type="dashboard"
              percent={tank.currentLevel.value === 1.31068 ? 0 : tank.currentLevel.value * 100}
              format={() => (
                <div className="tank-widget-progress-bar-div">
                  <div className="tank-widget-progress-bar-percentage">
                    <Text>
                      {tank.currentLevel.value === 1.31068 ? '--' : `${(tank.currentLevel.value * 100).toFixed(0)}%`}
                    </Text>
                  </div>
                  <div className="tank-widget-progress-bar-capacity-remaining">
                    {tank.currentLevel.value === 1.31068
                      ? <Text>--</Text>
                      : (
                        <Text>
                          {`${levelInLitres} L`}
                        </Text>
                      )}
                  </div>
                  <div className="tank-widget-progress-bar-capacity-remaining-label">
                    <Text>
                      {type === 'Waste' ? 'Used...' : 'Remaining...'}
                    </Text>
                  </div>
                  {showDetails && (
                    <div className="tank-widget-progress-bar-details">
                      <Link to={`/tanks/${tankName}`}><Button type="link" icon="setting" /></Link>
                    </div>
                  )}
                </div>
              )}
              gapDegree={0}
              strokeColor={renderStrokeColor}
              strokeWidth={10}
              width={width}
            />
          )}
      </div>
    </Col>
  );
};

Tank.propTypes = {
  name: PropTypes.string.isRequired,
  tankName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  showDetails: PropTypes.bool,
  tank: PropTypes.instanceOf(Object).isRequired,
  connected: PropTypes.instanceOf(Object).isRequired,
  width: PropTypes.number,
};

export default Tank;
