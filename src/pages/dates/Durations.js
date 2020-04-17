import React, { useState } from 'react';
import { timeService } from '../../TimeService';

const NOW = Date.now();

const DurationDisplay = ({ duration }) => {
  const { human, details } = timeService.formatDuration(duration);
  return (
    <>
      <p className="mono">{human}</p>
      <p>- Or -</p>
      <p className="mono">{details}</p>
    </>
  );
};

const Durations = () => {
  const [duration, setDuration] = useState(123456);
  const [startTime, setStartTime] = useState(1000);
  const [endTime, setEndTime] = useState(NOW);
  return (
    <div className="Durations">
      <div className="row">
        <div className="col p-3">
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label>Duration</label>
                <input
                  type="number"
                  className="form-control"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder={NOW}
                />
              </div>
              <DurationDisplay duration={duration} />
            </div>
          </div>
        </div>
        <div className="col p-3">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label>Unix MS Start Time</label>
                    <input
                      type="number"
                      className="form-control"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      placeholder={NOW}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label>Unix MS End Time</label>
                    <input
                      type="number"
                      className="form-control"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      placeholder={NOW}
                    />
                  </div>
                </div>
              </div>
              <DurationDisplay duration={endTime - startTime} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Durations;
