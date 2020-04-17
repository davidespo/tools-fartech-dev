import React, { useEffect, useState } from 'react';
import moment from 'moment';

import CopyButton from '../../components/CopyButton';
import { timeService } from '../../TimeService';

const UTC_MILLIS = 'UTC Millis';
const DATE = 'yyyy-mm-dd';
const ISO8601 = 'ISO 8601';

const toF = (label, format, secondaryFormat) => ({
  label,
  format,
  secondaryFormat,
});
const FORMATS = [
  toF('Unix Millisecond Timestamp', 'x'),
  toF('Unix Timestamp', 'X'),
  toF('Time', 'LT'),
  toF('Time with seconds', 'LTS'),
  toF('Month, day, year', 'L', 'l'),
  toF('Month name, day, year', 'LL', 'll'),
  toF('Month name, day, year, time', 'LLL', 'lll'),
  toF('Month name, day, weekday, year, time', 'LLLL', 'llll'),
];

function formatDate(format, date) {
  switch (format) {
    case DATE: {
      return date.getTime();
    }
    case ISO8601: {
      return date.toISOString();
    }
    case UTC_MILLIS:
    default: {
      return date.getTime();
    }
  }
}

function buildCopyButton(format, date, label) {
  const formatted = formatDate(format, date);
  return (
    <CopyButton
      className="wide mb-3"
      value={formatted}
      size="btn-sm"
      key={label}
    >
      {label} <span className="mono">{formatted}</span>
    </CopyButton>
  );
}

const toCopyButton = (value) => (
  <CopyButton className="wide mb-3" value={value} size="btn-sm" key={value}>
    <span className="mono">{value}</span>
  </CopyButton>
);

const DateTimeHome = () => {
  const [now, setNow] = useState(new Date());
  const [inputMs, setInputMs] = useState(`${Date.now()}`);
  let mInputDate = null;
  let duration = null;
  try {
    const ms = parseInt(inputMs);
    mInputDate = moment(ms);
    duration = timeService.formatDuration(now - ms);
  } catch (error) {}
  useEffect(() => {
    const handle = setInterval(() => setNow(new Date()), 200);
    return () => clearInterval(handle);
  }, []);
  const constDates = [
    { date: now, label: 'Now' },
    { date: new Date('2012-06-15T00:00:00'), label: "Bash's BDay" },
    { date: new Date('2012-08-31T00:00:00'), label: "Etc's BDay" },
    { date: new Date('2013-12-11T00:00:00'), label: "Ele's BDay" },
  ];

  return (
    <div className="DateTimeHome">
      <div className="row">
        <div className="col-lg-4 p-2">
          <div className="card">
            <div className="card-header">
              <h3>Constants</h3>
            </div>
            <div className="card-body">
              {constDates.map(({ date, label }) =>
                buildCopyButton(UTC_MILLIS, date, label),
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-8 p-2">
          <div className="card">
            <div className="card-header">
              <h3>From timestamp</h3>
            </div>
            <div className="card-body">
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={inputMs}
                  onChange={(e) => setInputMs(e.target.value)}
                  placeholder="UTC millisecond timestamp"
                />
              </div>
              <style jsx>{`
                td,
                th {
                  width: 30%;
                }
              `}</style>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Alternate Format</th>
                  </tr>
                </thead>
                {mInputDate && (
                  <tbody>
                    <tr>
                      <td>Relative</td>
                      <td>{toCopyButton(mInputDate.fromNow())}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Duration</td>
                      <td>{toCopyButton(duration.human)}</td>
                      <td>{toCopyButton(duration.details)}</td>
                    </tr>
                    {FORMATS.map(({ label, format, secondaryFormat }) => (
                      <tr key={label}>
                        <td>{label}</td>
                        <td>{toCopyButton(mInputDate.format(format))}</td>
                        <td>
                          {!secondaryFormat
                            ? ''
                            : toCopyButton(mInputDate.format(secondaryFormat))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimeHome;
