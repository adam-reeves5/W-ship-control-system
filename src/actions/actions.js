/* eslint-disable import/prefer-default-export */
import { message } from 'antd';
import {
  getStartupData,
  CircuitListener,
  NMEAListener,
  StatusListener,
  EnablesListener,
  FirmwareListener,
  AlarmListener,
  PersistenceListener,
  updateAlarm,
  authenticateRole,
  postRolePIN,
  removeRolePIN,
  DisconnectListener,
} from '../api';
import {
  RECEIVE_NMEA_DATA,
  RECEIVE_SERVER_STATE,
  RECEIVE_ALARMS_DATA,
  RECEIVE_ENABLES_DATA,
  RECEIVE_CIRCUITS_DATA,
  RECEIVE_HYDRAULICS_DATA,
  UPDATE_ROLE,
  RECEIVE_NMEA_ENTITIES,
  RECEIVE_PERSISTENT_DATA,
  RECEIVE_CIRCUITS_UPDATE,
  RECEIVE_ACTUATOR_UPDATE,
  RECEIVE_NMEA_UPDATE,
  RECEIVE_STATUS_UPDATE,
  RECEIVE_STATUS_MESSAGE_UPDATE,
  SET_CONNECTION,
  SET_CONNECTING,
  DEACTIVATE_VISUAL_ALARM,
  ACTIVATE_VISUAL_ALARM,
  FUSE_RESET,
  FUSE_TRIPPED,
  RECEIVE_MESSAGE,
  RECEIVE_PERSISTENT_DATA_ITEM,
  RECEIVE_ALARM_UPDATE,
  RECEIVE_ENABLE_UPDATE,
  RESET_LAST_MESSAGE,
} from './types';
import store from '../store/store';

export function updateCircuitState(update) {
  return ((dispatch) => {
    if (update.name === 'Server_Running') {
      return null;
    }
    if (update.type === 'fuse') {
      dispatch({
        type: RECEIVE_CIRCUITS_UPDATE,
        payload: {
          type: `${update.type}s`,
          circuit: update.name,
          [update.name]: {
            ...update,
          },
        },
      });
      const fuse = update.name;
      if (update.tripped) {
        // NO IMPLEMENTATION HERE YET
        dispatch({
          type: FUSE_TRIPPED,
          fuse,
        });
      } else {
        // NO IMPLEMENTATION HERE YET
        dispatch({ type: FUSE_RESET, fuse });
      }
    } else if (update.name === 'Alarm_Visual') {
      if (update.state === 0) {
        // ALARMS WON'T REFRESH
        // loadAlarms();
        dispatch({ type: DEACTIVATE_VISUAL_ALARM });
      } else {
        // loadAlarms();
        // ALARMS WON'T REFRESH
        dispatch({ type: ACTIVATE_VISUAL_ALARM });
      }
    } else if (update.type === 'actuator') {
      dispatch({ type: RECEIVE_ACTUATOR_UPDATE, update });
    } else if (update.type === 'status_message') {
      dispatch({ type: RECEIVE_STATUS_MESSAGE_UPDATE, update });
    } else if (update.type === 'status') {
      dispatch({ type: RECEIVE_STATUS_UPDATE, update });
    } else if (update.type === 'value') {
      dispatch({
        type: RECEIVE_CIRCUITS_UPDATE,
        payload: {
          type: `${update.type}s`,
          circuit: update.name,
          [update.name]: {
            ...update,
          },
        },
      });
    } else {
      dispatch({
        type: RECEIVE_CIRCUITS_UPDATE,
        payload: {
          type: `${update.type}s`,
          circuit: update.name,
          [update.name]: {
            ...update,
          },
        },
      });
    }
    return null;
  });
}

export const updateRole = (role, pin) => (dispatch) => authenticateRole(role, pin)
  .then((res) => {
    if (res.authenticated) {
      dispatch({ type: UPDATE_ROLE, payload: res });
    }
    return res;
  });

export const updateRolePIN = (role, currentPin, newPin) => () => {
  if (newPin) {
    return postRolePIN(role, currentPin, newPin).then((res) => res);
  }
  return removeRolePIN(role, currentPin).then((res) => res);
};


export const receivePersistentData = (data) => (dispatch) => {
  // const topUpTankSetting = { name: 'default', value: -1, key: 'TOPUP_STORAGE_TANK' };
  // const topUpEnabled = { name: 'default', value: 0, key: 'TOPUP_ENABLED' };
  // const topUpStartThreshold = { name: 'default', value: 0, key: 'TOPUP_START_THRESHOLD' };
  // const topUpStopThreshold = { name: 'default', value: 0, key: 'TOPUP_STOP_THRESHOLD' };
  // const topUpCeaseThreshold = { name: 'default', value: 0, key: 'TOPUP_CEASE_THRESHOLD' };
  data.map((item) => {
    // if (item.key === 'TOPUP_STORAGE_TANK') {
    //   console.log(item);
    // } else if (item.key === 'TOPUP_ENABLED') {
    //   console.log(item);
    // } else if (item.key === 'TOPUP_START_THRESHOLD') {
    //   console.log(item);
    // } else if (item.key === 'TOPUP_STOP_THRESHOLD') {
    //   console.log(item);
    // } else if (item.key === 'TOPUP_CEASE_THRESHOLD') {
    //   console.log(item);
    // } else {
    dispatch({ type: RECEIVE_PERSISTENT_DATA_ITEM, payload: item });
    // }
    return null;
  });

  return {
    type: RECEIVE_PERSISTENT_DATA,
    data,
  };
};


export const setupListeners = () => (dispatch) => {
  CircuitListener((info) => {
    if (info.updates[0].name === 'Server_Running') {
      if (Date.now() - store.getState().UI.connection.lastMessage > 1500) {
        dispatch({ type: RECEIVE_MESSAGE });
      }
    }
    info.updates.forEach((update) => {
      dispatch(updateCircuitState(update));
    });
  });
  NMEAListener((info) => {
    info.updates.forEach((update) => {
      const structuredUpdate = {};
      update.values.map((value) => {
        structuredUpdate[value.path.match(/[^.]+$/)[0]] = { value: value.value };
        return null;
      });
      dispatch({
        type: RECEIVE_NMEA_UPDATE,
        payload: {
          entity: update.values[0].name,
          update: structuredUpdate,
        },
      });
    });
  });
  EnablesListener((info) => {
    info.updates.forEach((update) => {
      dispatch({ type: RECEIVE_ENABLE_UPDATE, payload: update });
    });
  });
  StatusListener(() => {
    // dispatch({ type: RECEIVE_MESSAGE });
    // console.log(info);
  });
  FirmwareListener(() => {
    // dispatch({ type: RECEIVE_MESSAGE });
    // console.log(info);
  });
  DisconnectListener(() => {
    console.log('socket has been disconnected');
    dispatch({ type: RESET_LAST_MESSAGE });
    dispatch({ type: SET_CONNECTION, payload: false });
  });
  AlarmListener((info) => {
    if (info.name !== 'Summary' && info.active) {
      message.destroy();
      message.warning(`${info.name.replace(/_/g, ' ')} is active`);
    }
    dispatch({ type: RECEIVE_ALARM_UPDATE, payload: info });
  });
  PersistenceListener((info) => {
    dispatch(receivePersistentData(info.results));
  });
};

export const initiateData = () => (dispatch) => {
  dispatch({ type: SET_CONNECTING, payload: true });
  getStartupData().then((data) => {
    dispatch({
      type: RECEIVE_SERVER_STATE,
      payload: {
        ...data.circuits.status,
        reports: data.circuits.reports,
        statusMessages: data.circuits.statusMessages,
      },
    });
    dispatch({ type: RECEIVE_NMEA_ENTITIES, payload: data.nmeaStatus });
    dispatch({ type: RECEIVE_NMEA_DATA, payload: data.nmeaInitialState });
    dispatch({ type: RECEIVE_HYDRAULICS_DATA, payload: data.circuits.actuators });
    dispatch({ type: RECEIVE_ALARMS_DATA, payload: data.alarms });
    Object.keys(data.circuits.fuses).forEach((fuse) => {
      if (data.circuits.fuses[fuse].tripped) {
        dispatch({ type: FUSE_TRIPPED, fuse });
      }
    });
    dispatch({
      type: RECEIVE_CIRCUITS_DATA,
      payload: {
        loads: data.circuits.loads,
        // switches: data.circuits.switches,
        fuses: data.circuits.fuses,
        values: data.circuits.values,
      },
    });
    if (data.role.status !== 403) {
      dispatch({ type: UPDATE_ROLE, payload: data.role });
    }
    const Group_0 = data.enables.filter((item) => item.group_id === 0)
      .sort((a, b) => a.enable_id - b.enable_id);
    const Group_1 = data.enables.filter((item) => item.group_id === 1)
      .sort((a, b) => a.enable_id - b.enable_id);
    const Group_2 = data.enables.filter((item) => item.group_id === 2)
      .sort((a, b) => a.enable_id - b.enable_id);
    const Group_3 = data.enables.filter((item) => item.group_id === 3)
      .sort((a, b) => a.enable_id - b.enable_id);
    const Group_4 = data.enables.filter((item) => item.group_id === 4)
      .sort((a, b) => a.enable_id - b.enable_id);
    const Group_5 = data.enables.filter((item) => item.group_id === 5)
      .sort((a, b) => a.enable_id - b.enable_id);
    const Group_6 = data.enables.filter((item) => item.group_id === 6)
      .sort((a, b) => a.enable_id - b.enable_id);
    const Group_7 = data.enables.filter((item) => item.group_id === 7)
      .sort((a, b) => a.enable_id - b.enable_id);
    dispatch({
      type: RECEIVE_ENABLES_DATA,
      payload: {
        0: Group_0,
        1: Group_1,
        2: Group_2,
        3: Group_3,
        4: Group_4,
        5: Group_5,
        6: Group_6,
        7: Group_7,
      },
    });
    dispatch({ type: SET_CONNECTION, payload: true });
    dispatch({ type: SET_CONNECTING, payload: false });
    dispatch(receivePersistentData(data.persistentData));
  }).then(() => dispatch(setupListeners()));
};

export const postAlarmUpdate = (name, update) => (dispatch) => {
  updateAlarm(name, update).then((res) => {
    dispatch({ type: RECEIVE_ALARM_UPDATE, payload: res });
    return res;
  });
};

// export function removePersistence(name, id) {
//   return (dispatch => circuitSocket.removePersistentData(name, id).then(() => {
//     dispatch(getPersistence());
//   }).catch((err) => {
//     console.error('Failed to remove data', err);
//   }));
// }

// export function updatePersistence(name, key, value, id) {
//   return (dispatch => circuitSocket.updatePersistentData(name, key, value, id)
//     .then(() => {
//       dispatch(getPersistence());
//     }).catch((err) => {
//       console.error('Failed to update data', err);
//     }));
// }
