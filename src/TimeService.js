import axios from 'axios';
import moment from 'moment';

const CACHE = {};
const UNITS = [
  'years',
  'months',
  'days',
  'hours',
  'minutes',
  'seconds',
  'milliseconds',
];

/**
 * https://worldtimeapi.org/
 */
class TimeService {
  constructor(restClient = axios) {
    this.restClient = restClient;
  }
  formatDuration(duration) {
    let mDuration;
    try {
      if (typeof duration === 'string') {
        duration = parseInt(duration);
      }
      mDuration = moment.duration(duration);
    } catch (err) {
      return '';
    }
    let details = '';
    const process = (num, unit) => {
      if (num) {
        if (num === 1) {
          unit = unit.substring(0, unit.length - 1);
        }
        let part = `${num} ${unit}`;
        if (details.length > 0) {
          return `${details}, ${part}`;
        }
        return part;
      }
      return details;
    };
    for (let i = 0; i < UNITS.length; i++) {
      const unit = UNITS[i];
      details = process(mDuration[unit](), unit);
    }
    const parts = details.split(',');
    if (parts.length > 1) {
      parts[parts.length - 1] = ` and${parts[parts.length - 1]}`;
      details = parts.join(',');
    }
    return {
      human: `about ${mDuration.humanize()}`,
      details,
    };
  }
  async getZones() {
    let zones = CACHE.zones;
    if (!zones) {
      const res = await axios('https://worldtimeapi.org/api/timezone');
      zones = res.data;
      CACHE.zones = zones;
    }
    return zones;
  }
  async getZone(zoneKey) {
    let zone = CACHE[zoneKey];
    if (!zone) {
      const res = await axios(
        `https://worldtimeapi.org/api/timezone/` + zoneKey,
      );
      const { utc_offset: offset, timezone: label, abbreviation } = res.data;

      zone = {
        offset,
        label,
        abbreviation,
      };
      CACHE[zoneKey] = zone;
    }
    return zone;
  }
}

export const timeService = new TimeService();

export default TimeService;
