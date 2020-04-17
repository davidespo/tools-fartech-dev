import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import { connect } from 'react-redux';

import Select from 'react-select';

// TODO: https://timezonedb.com/
//
const NOW = moment().hour(0).minute(0).second(0).millisecond(0);

const d = (mBase, offset, label) => ({
  offset,
  m: mBase.clone().utcOffset(offset),
  label,
});

function timeStyle(mDate) {
  let style, score, icon;
  const hour = mDate.hour();
  if (hour < 7 || hour > 20) {
    style = 'bg-night';
    score = -1;
    icon = 'fa fa-moon-o';
  } else if (hour < 9 || hour > 17) {
    style = 'bg-twilight';
    score = 0;
    icon = hour < 9 ? 'fa fa-car' : 'fa fa-cutlery';
  } else {
    style = 'bg-day';
    score = 1;
    icon = 'fa fa-sun-o';
  }
  return {
    style,
    score,
    icon,
  };
}

function buildTimeTable(dates) {
  let table = [];
  _.range(0, 24).forEach((i) => {
    const row = [];
    table.push(row);
    dates.forEach((date) => {
      const { m } = date;
      const mDate = m.clone().add(i, 'h');
      row.push({
        ...timeStyle(mDate),
        m: mDate,
        text: mDate.format('l LT'),
      });
    });
  });
  return table;
}

const Timezones = ({ dates, loading, onAddZone, onRemoveZone, zones }) => {
  // const [dates, setDates] = useState([d(NOW, '-04:00', 'Atlanta')]);
  // const [zones, setZones] = useState(null);
  // const onAddDate = (offset, label) =>
  //   setDates([...dates, d(NOW, offset, label)]);
  // const onRemoveDate = (index) => setDates(dates.filter((v, i) => i !== index));
  dates = dates.map(({ label, offset, abbreviation }) => ({
    abbreviation,
    offset,
    m: NOW.clone().utcOffset(offset),
    label,
  }));
  const timeTable = buildTimeTable(dates);
  const zoneOptions = !zones
    ? []
    : zones.map((value) => ({ label: value, value }));
  return (
    <div className="Timezones">
      <h1>Timezones</h1>
      <div className="my-3">
        {!zones ? (
          'Loading...'
        ) : (
          <Select
            options={zoneOptions}
            onChange={({ value }) => onAddZone(value)}
          />
        )}
      </div>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            {dates.map(({ offset, label }, i) => (
              <th key={offset} className="text-center">
                {i > 0 && (
                  <div className="pull-right">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onRemoveZone(i)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                )}
                <h4>{offset}</h4>
                {label && label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeTable.map((row, i) => (
            <tr key={i}>
              {row.map(({ style, text, icon }) => (
                <td className={style} key={text}>
                  <i className={icon}></i> {text}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .bg-night {
          background-color: #000369;
          color: #ffffff;
        }
        .bg-twilight {
          background-color: #ffda96;
        }
        .bg-day {
          background-color: #b9ffa8;
        }
      `}</style>
    </div>
  );
};

export default connect(
  ({ timezones }) => ({ ...timezones }),
  (dispatch) => ({
    onAddZone: (zoneKey) => dispatch.timezones.addZone(zoneKey),
    onRemoveZone: (dateIndex) => dispatch.timezones.removeIndex(dateIndex),
  }),
)(Timezones);
