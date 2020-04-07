import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Layout, Row, Spin,
} from 'antd';
import NavBar from './components/NavBar';
import SidebarContainer from './components/Sidebar';
import Home from './components/pages/Home';
import Galley from './components/pages/domestic/Galley';
import USB from './components/pages/domestic/USB';
import Water from './components/pages/domestic/Water';
import CrewCabin from './components/pages/cabins/CrewCabin';
import OwnersCabin from './components/pages/cabins/OwnersCabin';
import PortGuestCabin from './components/pages/cabins/PortGuestCabin';
import StbdGuestCabin from './components/pages/cabins/StbdGuestCabin';
import CircuitDetails from './components/pages/details/CircuitDetails';
import NavStationGalleyPage from './components/pages/NavStationAndGalley';
import SaloonPage from './components/pages/Saloon';
import Alarms from './components/pages/Alarms';
import NavigationLightsPage from './components/pages/navigation/Lights';
import NavigationInstrumentsPage from './components/pages/navigation/Instruments';
import Tanks from './components/pages/Tanks';
import TankDetails from './components/pages/details/TanksDetails';
import Batteries from './components/pages/Batteries';
import BatteryDetails from './components/pages/details/BatteryDetails';
import Bilges from './components/pages/Bilges';
import About from './components/pages/About';
import EnginesPage from './components/pages/Engines';
import IndoorUtilityLightingPage from './components/pages/lighting/Indoor';
import OutdoorUtilityLightingPage from './components/pages/lighting/Outdoor';
import ACPower from './components/pages/ACPower';
import Winches from './components/pages/hydraulics/Winches';
import BilgeBlowers from './components/pages/BilgeBlowers';
import Enables from './components/pages/hydraulics/Enables';
import System from './components/pages/hydraulics/System';
import Rams from './components/pages/hydraulics/Rams';
import ActuatorLayout from './components/widgets/hydraulics/types/ActuatorLayout';
import Daggerboards from './components/pages/hydraulics/Daggerboards';
import Rudders from './components/pages/hydraulics/Rudders';

const {
  Header, Content,
} = Layout;

function MainLayout() {
  const connected = useSelector((state) => state.UI.connection.state);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{
        position: 'fixed', zIndex: 2, width: '100%', padding: 0,
      }}
      >
        <NavBar />
      </Header>
      <SidebarContainer />
      <Content className="layout">
        <div>
          <Row type="flex" justify="center">
            <div style={{ maxWidth: 1200, width: '100%' }}>
              { connected
                ? (
                  <Switch>
                    <Route path="/cabins/portGuest" component={PortGuestCabin} />
                    <Route path="/cabins/stbdGuest" component={StbdGuestCabin} />
                    <Route path="/cabins/owners" component={OwnersCabin} />
                    <Route path="/cabins/crew" component={CrewCabin} />
                    <Route path="/navAndGalley" component={NavStationGalleyPage} />
                    <Route path="/saloon" component={SaloonPage} />
                    <Route path="/alarms" component={Alarms} />
                    <Route path="/bilges" component={Bilges} />
                    <Route path="/blowers" component={BilgeBlowers} />
                    <Route path="/120V" component={ACPower} />
                    <Route path="/engines" component={EnginesPage} />
                    <Route path="/domestic/water" component={Water} />
                    <Route path="/domestic/galley" component={Galley} />
                    <Route path="/domestic/usb" component={USB} />
                    <Route path="/navigation/lights" component={NavigationLightsPage} />
                    <Route path="/navigation/instruments" component={NavigationInstrumentsPage} />
                    <Route path="/lighting/indoorUtility" component={IndoorUtilityLightingPage} />
                    <Route path="/lighting/outdoorUtility" component={OutdoorUtilityLightingPage} />
                    <Route path="/winches" component={Winches} />
                    <Route path="/enables" component={Enables} />
                    <Route path="/system" component={System} />
                    <Route exact path="/rams" component={Rams} />
                    <Route exact path="/daggerboards" component={Daggerboards} />
                    <Route exact path="/rudders" component={Rudders} />
                    <Route path="/actuators/:id" component={ActuatorLayout} />
                    <Route path="/circuits/:id" component={CircuitDetails} />
                    <Route exact path="/tanks" component={Tanks} />
                    <Route path="/tanks/:id" component={TankDetails} />
                    <Route exact path="/batteries" component={Batteries} />
                    <Route path="/batteries/:id" component={BatteryDetails} />
                    <Route path="/about" component={About} />
                    <Route exact path="/" component={Home} />
                  </Switch>
                )
                : (
                  <Row type="flex" justify="center" align="middle" style={{ height: '75vh' }}>
                    <Spin size="large" tip="connecting" />
                  </Row>
                )}
            </div>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}

export default MainLayout;
