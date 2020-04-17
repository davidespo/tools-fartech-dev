import _ from 'lodash';
import { timeService } from '../../TimeService';

const DEFAULT_STATE = {
  loading: false,
  zones: [],
  dates: [{ offset: '-04:00', label: 'Atlanta' }],
};

export const timezones = {
  state: _.cloneDeep(DEFAULT_STATE),
  reducers: {
    setLoading(state, payload) {
      return {
        ...state,
        loading: payload,
      };
    },
    setZones(state, payload) {
      return {
        ...state,
        zones: payload,
      };
    },
    add(state, payload) {
      return {
        ...state,
        dates: [...state.dates, payload],
      };
    },
    removeIndex(state, payload) {
      return {
        ...state,
        dates: state.dates.filter((v, i) => i !== payload),
      };
    },
  },
  effects: (dispatch) => ({
    async refreshZones() {
      try {
        dispatch.timezones.setLoading(true);
        const zones = await timeService.getZones();
        dispatch.timezones.setZones(zones);
        dispatch.timezones.setLoading(false);
      } catch (error) {
        console.error(error);
      }
    },
    async addZone(payload) {
      try {
        dispatch.timezones.setLoading(true);
        const zone = await timeService.getZone(payload);
        dispatch.timezones.add(zone);
        dispatch.timezones.setLoading(false);
      } catch (error) {
        console.error(error);
      }
    },
  }),
};
