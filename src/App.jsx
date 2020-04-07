/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router, Route,
} from 'react-router-dom';
import MainLayout from './Layout';
import {
  disconnectSocket, setupSocket, getNMEATransmittingStatus,
} from './api';
import { initiateData } from './actions/actions';
import { RESET_LAST_MESSAGE, SET_CONNECTION, RECEIVE_NMEA_ENTITIES } from './actions/types';
import useInterval from './customHooks/useInterval';
import './App.less';

function App() {
  const connectedToServer = useSelector((state) => state.UI.connection.state);
  const lastMessage = useSelector((state) => state.UI.connection.lastMessage);
  const dispatch = useDispatch();

  useInterval(() => {
    if (!connectedToServer) {
      setupSocket().then(() => dispatch(initiateData()));
    }
    if (connectedToServer && (lastMessage - Date.now() > 3000)) {
      dispatch({ type: RESET_LAST_MESSAGE });
      dispatch({ type: SET_CONNECTION, payload: false });
      disconnectSocket();
    }
  }, 3000);
  useInterval(() => {
    getNMEATransmittingStatus()
      .then((res) => dispatch({ type: RECEIVE_NMEA_ENTITIES, payload: res }));
  }, 5000);

  return (
    <Router>
      <Route path="/" render={(props) => <MainLayout {...props} />} />
    </Router>

  );
}

export default App;
