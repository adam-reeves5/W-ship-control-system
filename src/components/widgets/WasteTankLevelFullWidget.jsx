import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Slider, Typography, Col,
} from 'antd';
import BinaryCircuit from './BinaryCircuit';
import { postValueUpdate } from '../../api';

const { Paragraph } = Typography;

const WasteTankLevelFullWidget = () => {
  const wasteTankLevel = useSelector((state) => state.Circuits.values.Waste_Tank_Level_Full);
  const circuit = useSelector((state) => state.Circuits.loads.Waste_Tank_Level_Enable);
  const fuse = useSelector((state) => state.Circuits.fuses.Waste_Tank_Level_Enable);
  // const [changing, setChanging] = useState(false);
  const [value, setValue] = useState(wasteTankLevel.value);
  // useEffect(() => {
  //   if (!changing) {
  //     if (value !== wasteTankLevel.value) {
  //       setValue(wasteTankLevel.value);
  //     }
  //   }
  // }, [wasteTankLevel.value, value, changing]);
  return (
    <Col span={24}>
      <div className="circuit-container">
        <div className="dimmable-circuit">
          <Paragraph style={{ fontSize: 18 }}>Waste Tank Level Full</Paragraph>
          <BinaryCircuit circuit={circuit} fuse={fuse} />
          { !!circuit.state && (
          <Slider
            step={1}
            value={value}
            max={100}
            min={0}
            onChange={(e) => {
              setValue(e);
            }}
            onAfterChange={(e) => {
              postValueUpdate({ name: wasteTankLevel.name, value: e });
            }}
            tipFormatter={(e) => `${e}%`}
          />
          )}
        </div>
      </div>
    </Col>

  );
};

export default WasteTankLevelFullWidget;
