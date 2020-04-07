import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

const { Paragraph } = Typography;

const SectionTitle = ({ title }) => (
  <Paragraph className="section-title">{title}</Paragraph>
);

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
export default SectionTitle;
