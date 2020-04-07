import {
  RECEIVE_CIRCUITS_DATA,
  RECEIVE_CIRCUITS_UPDATE,
  RECEIVE_PERSISTENT_DATA_ITEM,
} from '../actions/types';

export default function Circuits(state = null, action) {
  switch (action.type) {
    case RECEIVE_CIRCUITS_DATA:
      return action.payload;
    case RECEIVE_CIRCUITS_UPDATE:
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          [action.payload.circuit]: {
            ...state[action.payload.type][action.payload.circuit],
            ...action.payload[action.payload.circuit],
          },
        },
      };
    case RECEIVE_PERSISTENT_DATA_ITEM:
      return {
        ...state,
        loads: {
          ...state.loads,
          [action.payload.name]: {
            ...state.loads[action.payload.name],
            [action.payload.key]: {
              ...action.payload,
            },
          },
        },
      };
    default:
      return { ...state };
  }
}
