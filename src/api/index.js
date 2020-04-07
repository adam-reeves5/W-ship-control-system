/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import ENDPOINT from './addresses';

const socketIOClient = require('socket.io-client');
const sailsIOClient = require('sails.io.js');

const io = sailsIOClient(socketIOClient);
io.sails.autoConnect = false;
let socket;

export const testConnection = () => new Promise((resolve) => {
  socket.post('/api/v1/echo', { timestamp: Date.now() }, (data, JSW) => {
    console.log(data, JSW);
    resolve(JSW);
  });
});

export const disconnectSocket = () => {
  if (socket._raw.connected) {
    socket.disconnect();
    return true;
  }
  return false;
};

export const storeSocketID = () => {
  if (socket) {
    if (socket._raw) {
      if (socket._raw.id) {
        return socket._raw.id;
      }
    }
  }
  return null;
};

export const NMEAListener = (listener) => {
  socket.on('signalk', listener);
};

export const DisconnectListener = (listener) => {
  socket.on('disconnect', listener);
};

export const EnablesListener = (listener) => {
  socket.on('enables:update', listener);
};

export const StatusListener = (listener) => {
  socket.on('status:update', listener);
};

export const CircuitListener = (listener) => {
  socket.on('state:update', listener);
};

export const FirmwareListener = (listener) => {
  socket.on('firmware', listener);
};

export const AlarmListener = (listener) => {
  socket.on('alarm:update', listener);
};

export const PersistenceListener = (listener) => {
  socket.on('persistence:update', listener);
};

export const getNmeaMap = () => new Promise((resolve) => {
  socket.get('/api/v1/signalk/mapping', (data) => {
    resolve(data);
  });
});

export const getAlarms = () => new Promise((resolve) => {
  socket.get('/api/v1/alarms', (data) => {
    resolve(data);
  });
});

export const getPersistentData = () => new Promise((resolve) => {
  socket.get('/api/v1/persistence', (data) => {
    resolve(data);
  });
});

export const getEnables = () => new Promise((resolve) => {
  socket.get('/api/v1/enables', (data) => {
    resolve(data);
  });
});

export const getCircuits = () => new Promise((resolve) => {
  socket.get('/api/v1/state', (data, JSW) => {
    if (JSW.statusCode === 200) {
      resolve(data);
    }
  });
});
export const getInitialNMEAState = (item) => new Promise((resolve) => {
  socket.get(`/api/v1/signalk/${item}`, (data) => {
    resolve(data);
  });
});
export const getNMEATransmittingStatus = () => new Promise((resolve) => {
  socket.get('/api/v1/signalk/transmitting', (data) => {
    resolve(data);
  });
});

// ROLES API

export const getRoleCookie = () => new Promise((resolve) => {
  socket.get(`/api/v1/role/permissions?sessionId=${localStorage.getItem('login_id')}`, (data) => {
    resolve(data);
  });
});

export const authenticateRole = (role, code) => new Promise((resolve) => {
  socket.post('/api/v1/role/authenticate', { role, password: code }, (data) => {
    if (data.id && localStorage.getItem('login_id')) {
      localStorage.removeItem('login_id');
      localStorage.setItem('login_id', data.id);
    } else if (data.id) {
      localStorage.setItem('login_id', data.id);
    }
    resolve(data);
  });
});

export const postRolePIN = (role, currentPassword, newPassword) => new Promise((resolve) => {
  socket.post('/api/v1/role/password/set', { role, current_password: currentPassword, new_password: newPassword }, (data) => {
    resolve(data);
  });
});

export const removeRolePIN = (role, currentPassword) => new Promise((resolve) => {
  socket.post('/api/v1/role/password/unset', { role, current_password: currentPassword }, (data) => {
    resolve(data);
  });
});
export const getRolePermissions = () => new Promise((resolve) => {
  socket.get('/api/v1/role/permissions', (data) => {
    resolve(data);
  });
});

export async function getStartupData() {
  const nmeaInitialState = {};
  const [
    role,
    nmeaMap,
    persistentData,
    alarms,
    enables,
    circuits,
    nmeaStatus,
  ] = await Promise.all([
    getRoleCookie(),
    getNmeaMap(),
    getPersistentData(),
    getAlarms(),
    getEnables(),
    getCircuits(),
    getNMEATransmittingStatus(),
  ]);
  // Create Object of NMEA entities with their initial state.
  // State will update with every message received using the RECEIVE_NMEA_UPDATE action.
  const promises = Object.keys(nmeaMap).map(async (entity) => {
    const entityIS = await getInitialNMEAState(entity);
    nmeaInitialState[entity] = entityIS;
    return nmeaInitialState;
  });
  await Promise.all(promises);
  return {
    role,
    persistentData,
    alarms,
    enables,
    circuits,
    nmeaStatus,
    nmeaInitialState,
  };
}

export const setupSocket = (endpoint = ENDPOINT, header = null) => {
  socket = io.sails.connect(endpoint);
  return new Promise((resolve) => {
    if (header !== null) {
      io.sails.headers = header;
    }
    socket.on('connect', () => {
      resolve(true);
    });
    socket.on('disconnect', () => {
      resolve(true);
    });
  }).catch((err) => console.log(err));
};

export const postCircuitStateUpdate = (circuit) => new Promise((resolve) => {
  socket.post('/api/v1/state', {
    name: circuit.name, type: 'switch', state: circuit.state, source: 'ui',
  }, (data) => {
    resolve(data);
  });
});


export const postCircuitDimmingLevelUpdate = (circuit) => new Promise((resolve) => {
  socket.post('/api/v1/state', {
    name: circuit.name, type: 'switch', dimmingLevel: circuit.dimmingLevel, source: 'ui',
  }, (data) => {
    resolve(data);
  });
});

export const postValueUpdate = ({ name, value }) => new Promise((resolve) => {
  socket.post(`/api/v1/state/value/${name}`, { value }, (data) => {
    resolve(data);
  });
});

export const postPersistentData = ({ name, key, value }) => new Promise((resolve) => {
  socket.post(`/api/v1/persistence/${name}`, { key, value }, (data) => {
    resolve(data);
  });
});

export const updatePersistentData = ({
  name, key, value, id,
}) => new Promise((resolve) => {
  socket.put(`/api/v1/persistence/${name}/${id}`, { name, key, value }, (data) => {
    resolve(data);
  });
});

export const removePersistentData = ({ name, id }) => new Promise((resolve) => {
  socket.delete(`/api/v1/persistence/${name}/${id}`, (data) => {
    resolve(data);
  });
});

export const unAcknowledgeAll = () => new Promise((resolve) => {
  socket.put('/api/v1/alarm/all/unacknowledge', (data) => {
    resolve(data);
  });
});

// ALARMS

export const updateAlarm = (name, update) => new Promise((resolve) => {
  socket.put(`/api/v1/alarm/${name}`, update, (data) => {
    resolve(data);
  });
});

// HYDRAULICS

export const postHydraulicAction = (actuatorName, action) => new Promise((resolve) => {
  socket.get(`/api/v1/actuators/action/${actuatorName}/${action}`, (data) => {
    resolve(data);
  });
});

export const postHydraulicParam = (signalName, parameter, value) => new Promise((resolve) => {
  socket.put(`/api/v1/actuator/${signalName}`, { [`parameter_${parameter}`]: value }, (data) => {
    resolve(data);
  });
});

export const commitHydraulicParams = (actuatorName) => new Promise((resolve) => {
  socket.get(`/api/v1/actuator/${actuatorName}/commit`, (data) => {
    resolve(data);
  });
});

export const getEnablesData = () => new Promise((resolve) => {
  socket.get('/api/v1/enables', (data) => {
    resolve(data);
  });
});

export const sendEnableUpdate = ({ group_id, enable_id, enabled }) => new Promise((resolve) => {
  socket.put(`/api/v1/enables/${group_id}/${enable_id}`, { enabled }, (data) => {
    resolve(data);
  });
});
