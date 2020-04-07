import React from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'antd';
import Tank from '../widgets/TankWidget';

const Tanks = () => {
  const WaterPort = useSelector((state) => state.NMEA.Water_Port);
  const WaterPortConnected = useSelector((state) => state.ServerState.nmeaStatus.Water_Port);

  const WaterStbd = useSelector((state) => state.NMEA.Water_Stbd);
  const WaterStbdConnected = useSelector((state) => state.ServerState.nmeaStatus.Water_Stbd);

  const WastePort = useSelector((state) => state.NMEA.Waste_Port);
  const WastePortConnected = useSelector((state) => state.ServerState.nmeaStatus.Waste_Port);

  const WasteStbd = useSelector((state) => state.NMEA.Waste_Stbd);
  const WasteStbdConnected = useSelector((state) => state.ServerState.nmeaStatus.Waste_Stbd);

  const FuelPort = useSelector((state) => state.NMEA.Fuel_Port);
  const FuelPortConnected = useSelector((state) => state.ServerState.nmeaStatus.Fuel_Port);

  const FuelStbd = useSelector((state) => state.NMEA.Fuel_Stbd);
  const FuelStbdConnected = useSelector((state) => state.ServerState.nmeaStatus.Fuel_Stbd);


  return (
    <Row type="flex" justify="space-around">
      <Tank tankName="Fuel_Port" tank={FuelPort} connected={FuelPortConnected} type="Fuel" name="Fuel Port" />
      <Tank tankName="Fuel_Stbd" tank={FuelStbd} connected={FuelStbdConnected} type="Fuel" name="Fuel Stbd" />
      <Tank tankName="Water_Port" tank={WaterPort} connected={WaterPortConnected} type="Water" name="Water Port" />
      <Tank tankName="Water_Stbd" tank={WaterStbd} connected={WaterStbdConnected} type="Water" name="Water Stbd" />
      <Tank tankName="Waste_Port" tank={WastePort} connected={WastePortConnected} type="Waste" name="Waste Port" />
      <Tank tankName="Waste_Stbd" tank={WasteStbd} connected={WasteStbdConnected} type="Waste" name="Waste Stbd" />
    </Row>
  );
};

export default Tanks;
