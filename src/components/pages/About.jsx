import React from 'react';
import { Row, Card, Typography } from 'antd';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import KineticLogo from '../../assets/kinetic-scientific-about.png';

const { Meta } = Card;
const { Text, Paragraph } = Typography;

const About = () => {
  const version = useSelector((state) => state.ServerState.version);
  // const role = useSelector((state) => state.UI.role)
  return (
    <Row type="flex" justify="center" align="middle">
      <div className="about-page">
        <Card
          className="about-card"
          bordered={false}
          cover={<img alt="Kinetic Scientific" src={KineticLogo} />}
        >
          <Meta
            description={(
              <Row>
                <Paragraph className="label">
                  Server:
                  <Text className="version-number">{version}</Text>
                </Paragraph>
                <Paragraph className="label">
                    User Interface:
                  <Text className="version-number">{process.env.REACT_APP_VERSION}</Text>
                </Paragraph>
                <Paragraph className="label">
                  {`© 2018 - ${new Date().getFullYear()} Kinetic Scientific`}
                </Paragraph>
                <Paragraph className="label">+1 415 218 8103 | support@kineticscientific.com</Paragraph>
                {/* {role === 'Technical' ? <Link to="/debug" style={{ color: '#d9d9d9', textDecoration: 'none' }}><h6><small>Debug Mode</small></h6></Link> : null } */}
              </Row>
  )}
          />
        </Card>
      </div>
    </Row>
  );
};

export default About;
