import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { postAlarmUpdate } from '../../../actions/actions';

const Enable = ({ name, enabled, size = 'large' }) => {
  const dispatch = useDispatch();
  const setAlarmEnable = () => {
    dispatch(postAlarmUpdate(name, { enabled: !enabled }));
  };
  return (
    <Button
      type={enabled ? 'primary' : 'default'}
      size={size}
      onClick={setAlarmEnable}
    >
      {enabled ? 'Disable' : 'Enable'}
    </Button>
  );
};
Enable.propTypes = {
  name: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  size: PropTypes.string,
};
export default Enable;
