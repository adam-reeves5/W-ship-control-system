import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Icon } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from 'react-sidebar';
import { TOGGLE_SIDEBAR } from '../actions/types';
import Logo from '../assets/logo.png';

const { SubMenu } = Menu;

const SidebarContainer = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const sidebarCollapsed = useSelector((state) => state.UI.sidebar.collapsed);
  // const sidebarWidth = useSelector((state) => state.UI.sidebar.width);
  const dispatch = useDispatch();
  const hydraulicsConnected = true;
  const location = useLocation();

  const menu = () => (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      style={{ paddingTop: 16, width: 250, height: '100%' }}
      openKeys={openKeys}
      onOpenChange={(e) => {
        if (e.length > 1) {
          setOpenKeys([e[1]]);
        } else {
          setOpenKeys([e[0]]);
        }
      }}
      onSelect={() => dispatch({ type: TOGGLE_SIDEBAR })}
    >
      <Menu.Item
        key="home"
        style={{
          cursor: 'auto', width: 250, padding: 16, height: 100,
        }}
      >
        <Link to="/" style={{ cursor: 'auto', textAlign: 'center' }}>
          <img src={Logo} alt="HH66-04" style={{ width: 150 }} />
        </Link>
      </Menu.Item>
      <SubMenu
        key="/lighting"
        title={(
          <span>
            <Icon type="bulb" />
            <span>Lighting</span>
          </span>
        )}
      >
        {/* <Menu.Item key="/lighting/all">
          <Link to="/lighting/all">
            <span>
              <Icon type="bulb" />
                All Lights
            </span>
          </Link>
        </Menu.Item> */}
        <Menu.Item key="/lighting/indoorUtility">
          <Link to="/lighting/indoorUtility">
            <span>
              <Icon type="tool" />
                Indoor Utility
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/lighting/outdoorUtility">
          <Link to="/lighting/outdoorUtility">
            <span>
              <Icon type="tool" />
                Outdoor Utility
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/lighting/presets" disabled>
          <Link to="/lighting/presets">
            <span>
              <Icon type="save" />
                Presets
            </span>
          </Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key="/location"
        title={(
          <span>
            <Icon type="home" />
            <span>Location</span>
          </span>
        )}
      >
        <Menu.Item key="/cabins/portGuest">
          <Link to="/cabins/portGuest">
            <span>
                Port Guest Cabin
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/cabins/stbdGuest">
          <Link to="/cabins/stbdGuest">
            <span>
                Stbd Guest Cabin
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/cabins/owners">
          <Link to="/cabins/owners">
            <span>
                Owner&apos;s Cabin
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/cabins/crew">
          <Link to="/cabins/crew">
            <span>
                Crew Cabin
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/saloon">
          <Link to="/saloon">
            <span>
               Saloon
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/navAndGalley">
          <Link to="/navAndGalley">
            <span>
                Nav Station / Galley
            </span>
          </Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key="/navigation"
        title={(
          <span>
            <Icon type="compass" />
            <span>Navigation</span>
          </span>
        )}
      >
        <Menu.Item key="/navigation/lights">
          <Link to="/navigation/lights">
            <span>
              <Icon type="bulb" />
                Lights
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/navigation/instruments">
          <Link to="/navigation/instruments">
            <span>
              <Icon type="global" />
                Instruments
            </span>
          </Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="/batteries">
        <Link to="/batteries">
          <span>
            <Icon type="plus-circle-o" />
            <span>Batteries</span>
          </span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/120V">
        <Link to="/120V">
          <span>
            <Icon type="poweroff" />
            <span>120V Power</span>
          </span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/tanks">
        <Link to="/tanks">
          <span>
            <Icon type="filter" />
            <span>Tanks</span>
          </span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/bilges">
        <Link to="/bilges">
          <span>
            <Icon type="safety" />
            <span>Bilges</span>
          </span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/alarms">
        <Link to="/alarms">
          <span>
            <Icon type="warning" />
            <span>Alarms</span>
          </span>
        </Link>
      </Menu.Item>
      <SubMenu
        key="/domestic"
        title={(
          <span>
            <Icon type="home" />
            <span>Domestic</span>
          </span>
)}
      >
        <Menu.Item key="/domestic/usb">
          <Link to="/domestic/usb">
            <span>
              <Icon type="usb" />
                USB
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/domestic/water">
          <Link to="/domestic/water">
            <span>
              <Icon type="environment-o" />
                Water
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/domestic/galley">
          <Link to="/domestic/galley">
            <span>
              <Icon type="coffee" />
                Galley
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/blowers">
          <Link to="/blowers">
            <span>
              <Icon type="safety" />
              <span>Bilge Blowers</span>
            </span>
          </Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="/engines">
        <Link to="/engines">
          <span>
            <Icon type="dashboard" />
            <span>Engines</span>
          </span>
        </Link>
      </Menu.Item>
      <SubMenu
        key="/hydraulics"
        title={(
          <span>
            <Icon type={!hydraulicsConnected ? 'disconnect' : 'setting'} />
            <span>Hydraulics</span>
          </span>
)}
      >
        <Menu.Item key="/system" disabled={!hydraulicsConnected}>
          <Link to="/system">
            <span>
              <Icon type="setting" />
                System
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/winches" disabled={!hydraulicsConnected}>
          <Link to="/winches">
            <span>
              <Icon type="setting" />
                Winches
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/rams" disabled={!hydraulicsConnected}>
          <Link to="/rams">
            <span>
              <Icon type="setting" />
                Rams
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/daggerboards" disabled={!hydraulicsConnected}>
          <Link to="/daggerboards">
            <span>
              <Icon type="setting" />
                Daggerboards
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/rudders" disabled={!hydraulicsConnected}>
          <Link to="/rudders">
            <span>
              <Icon type="setting" />
                Rudders
            </span>
          </Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="/about">
        <Link to="/about">
          <span>
            <Icon type="customer-service" />
            <span>About</span>
          </span>
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <Sidebar
      sidebar={menu()}
      open={!sidebarCollapsed}
      onSetOpen={() => dispatch({ type: TOGGLE_SIDEBAR })}
      sidebarClassName="sidebar-class"
      contentClassName="sidebar-content-class"
      rootClassName="sidebar-root-class"
      overlayClassName="sidebar-overlay-class"
    >
      <br />
    </Sidebar>
  );
};

export default SidebarContainer;
