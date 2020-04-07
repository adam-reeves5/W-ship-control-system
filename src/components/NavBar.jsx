import React, { useMemo } from 'react';
import {
  Menu, Icon, Row,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { TOGGLE_SIDEBAR } from '../actions/types';
import Logo from '../assets/logo.png';
import RoleChangeWidget from './widgets/RoleChangeWidget';
import NotificationCenter from './widgets/NotificationCenter';

function NavBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const connected = useSelector((state) => state.UI.connection.state);
  const title = useMemo(() => {
    switch (location.pathname) {
      case '/cabins/portGuest': {
        return 'Port Guest Cabin';
      }
      case '/cabins/stbdGuest': {
        return 'Stbd Guest Cabin';
      }
      case '/cabins/owners': {
        return "Owner's Cabin";
      }
      case '/cabins/crew': {
        return 'Crew Cabin';
      }
      case '/navAndGalley': {
        return 'Nav Station & Galley';
      }
      case '/saloon': {
        return 'Saloon';
      }
      case '/alarms': {
        return 'Alarms';
      }
      case '/domestic/water': {
        return 'Water';
      }
      case '/domestic/galley': {
        return 'Galley';
      }
      case '/domestic/usb': {
        return 'USB';
      }
      case '/navigation/lights': {
        return 'Navigation Lights';
      }
      case '/navigation/instruments': {
        return 'Instruments';
      }
      case '/lighting/indoorUtility': {
        return 'Indoor Utility Lighting';
      }
      case '/lighting/outdoorUtility': {
        return 'Outdoor Utility Lighting';
      }
      case '/lighting/presets': {
        return 'Presets';
      }
      case '/120V': {
        return '120V Power';
      }
      case '/about':
        return 'About';
      case '/bilges':
        return 'Bilges';
      case '/blowers':
        return 'Bilge Blowers';
      case '/batteries':
        return 'Batteries';
      case '/tanks':
        return 'Tanks';
      case '/engines':
        return 'Engines';
      case '/winches':
        return 'Winches';
      case '/rams':
        return 'Rams';
      case '/foils':
        return 'Foils';
      case '/system':
        return 'System';
      case '/enables':
        return 'Enables';
      case '/daggerboards':
        return 'Daggerboards';
      case '/rudders':
        return 'Rudders';
      case '/':
        return 'Home';
      default: {
        if (location.pathname.includes('/circuits/')) {
          const circuit = location.pathname.replace('/circuits/', '');
          return circuit.replace(/_/g, ' ');
        } if (location.pathname.includes('/tanks/')) {
          const tank = location.pathname.replace('/tanks/', '');
          return tank.replace(/_/g, ' ');
        } if (location.pathname.includes('/batteries/')) {
          const battery = location.pathname.replace('/batteries/', '');
          return battery.replace(/_/g, ' ');
        }
        if (location.pathname.includes('/actuators/')) {
          const ram = location.pathname.replace('/actuators/', '');
          return ram.replace(/_/g, ' ');
        }
        return 'Not Found';
      }
    }
  }, [location]);

  return (
    <div>
      <div className="nav-bar">
        <div className="logo-div">
          <Icon
            type="menu"
            theme="outlined"
            className="logo"
            onClick={() => dispatch({ type: TOGGLE_SIDEBAR })}
          />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="home" className="home-link" disabled={!connected}>
            <Link to="/">
              <img src={Logo} alt="HH66-04" />
            </Link>
          </Menu.Item>
          <Menu.Item key="user" className="user-div">
            <RoleChangeWidget />
          </Menu.Item>
          <Menu.Item key="notification" className="notification-div">
            {/* {connected && <NotificationCenter />} */}
          </Menu.Item>
        </Menu>

      </div>
      <Row type="flex" justify="center" align="middle">
        <div className="page-title-nav">
          <span>
            <Icon className="back-icon-page-title" type="arrow-left" onClick={() => connected && history.goBack()} />
            {title}
          </span>
        </div>
      </Row>
    </div>
  );
}

export default NavBar;
