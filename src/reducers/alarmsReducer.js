import {
  RECEIVE_ALARMS_DATA,
  TOGGLE_ENABLE_SUCCESS,
  SET_THRESHOLD_SUCCESS,
  SEND_ACKNOWLEDGE_SUCCESS,
  RECEIVE_ALARM_UPDATE,
} from '../actions/types';

export default function Alarms(state = [], action) {
  switch (action.type) {
    case RECEIVE_ALARMS_DATA:
      return action.payload;
    case RECEIVE_ALARM_UPDATE:
      return state.map((item) => {
        if (item.name !== action.payload.name) {
          return item;
        }
        return { ...item, ...action.payload };
      });
    case TOGGLE_ENABLE_SUCCESS:
      return state.map((item) => {
        if (item.name !== action.update.name) {
          return item;
        }
        return { ...item, ...action.update };
      });
    case SET_THRESHOLD_SUCCESS:
      return state.map((item) => {
        if (item.name !== action.update.name) {
          return item;
        }
        return { ...item, ...action.update };
      });
    case SEND_ACKNOWLEDGE_SUCCESS:
      return state.map((item) => {
        if (item.name !== action.update.name) {
          return item;
        }
        return { ...item, ...action.update };
      });

    default:
      return state;
  }
}
