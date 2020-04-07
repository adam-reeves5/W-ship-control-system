import React from 'react';
import { Row, Col } from 'antd';
import {
  Nav_Light_Anchor,
  Nav_Light_Deck_Spot,
  Nav_Light_Side_Port,
  Nav_Light_Steaming,
  Light_Red_Nav_Galley,
  Binnacle_Lights,
  Light_Reading_Nav,
} from '../../../api/circuits';
import RenderCircuitByType from '../../widgets/RenderCircuitByType';

const NavigationLightsPage = () => (
  <Row>
    <Col xs={24} sm={8}>
      <RenderCircuitByType circuitName={Nav_Light_Side_Port} title="Running" />
    </Col>
    <Col xs={24} sm={8}>
      <RenderCircuitByType circuitName={Nav_Light_Steaming} title="Steaming" />
    </Col>
    <Col xs={24} sm={8}>
      <RenderCircuitByType circuitName={Nav_Light_Anchor} title="Anchor" />
    </Col>
    <Col xs={24} sm={12}>
      <RenderCircuitByType circuitName={Nav_Light_Deck_Spot} title="Deck Spot" />
    </Col>
    <Col xs={24} sm={12}>
      <RenderCircuitByType circuitName={Binnacle_Lights} title="Binnacle" />
    </Col>
    <Col xs={24} sm={12}>
      <RenderCircuitByType circuitName={Light_Red_Nav_Galley} title="Red Lights Galley / Nav" />
    </Col>
    <Col xs={24} sm={12}>
      <RenderCircuitByType circuitName={Light_Reading_Nav} title="Reading Light" />
    </Col>
  </Row>
);

export default NavigationLightsPage;
