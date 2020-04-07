import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Radio, Typography, Switch } from 'antd';
import { postCircuitStateUpdate } from '../../api';

const { Paragraph } = Typography;

const ACCircuitWidget = ({
  shore, inverter, circuit, name,
}) => {
  const shoreStatus = useSelector((state) => state.Circuits.loads[shore]);
  const inverterStatus = useSelector((state) => state.Circuits.loads[inverter]);
  const circuitStatus = useSelector((state) => state.Circuits.loads[circuit]);

  const selectValue = useMemo(() => {
    if (shoreStatus.actualState) {
      return 'Shore';
    }
    if (inverterStatus.actualState) {
      return 'On';
    }
    return 'Off';
  }, [shoreStatus, inverterStatus]);
  const [buttonState, setButtonState] = useState(selectValue);
  const handleChange = (e) => {
    if (e.target.value === 'Shore') {
      postCircuitStateUpdate({ ...shoreStatus, state: 1 }).then((res) => res.acknowledged && setButtonState('Shore'));
      postCircuitStateUpdate({ ...inverterStatus, state: 0 });
    }
    if (e.target.value === 'On') {
      postCircuitStateUpdate({ ...inverterStatus, state: 1 }).then((res) => res.acknowledged && setButtonState('On'));
      postCircuitStateUpdate({ ...shoreStatus, state: 0 });
    } if (e.target.value === 'Off') {
      postCircuitStateUpdate({ ...inverterStatus, state: 0 });
      postCircuitStateUpdate({ ...shoreStatus, state: 0 }).then((res) => res.acknowledged && setButtonState('Off'));
    }
  };
  return (
    <div className="ac-circuit">
      <Paragraph className="title">{name}</Paragraph>
      <div className="state-switch">
        <Switch disabled checked={circuitStatus.actualState === 1} />
      </div>
      <Radio.Group
        className="buttons"
        onChange={handleChange}
        defaultValue={selectValue}
        value={buttonState}
        buttonStyle="solid"
      >
        <Radio.Button value="Off">Off</Radio.Button>
        <Radio.Button value="Shore">Shore</Radio.Button>
        <Radio.Button value="On">On</Radio.Button>
      </Radio.Group>
    </div>
  );
};

ACCircuitWidget.propTypes = {
  shore: PropTypes.string.isRequired,
  inverter: PropTypes.string.isRequired,
  circuit: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ACCircuitWidget;
