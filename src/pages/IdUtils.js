import React from 'react';
import copy from 'copy-to-clipboard';
import { NotificationManager } from 'react-notifications';

import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withAppLayout } from '../hoc';

const IdUtils = ({ onRegen, onTake, strategies, strategy, ids }) => (
  <div className="IdUtils">
    <div
      className="py-5"
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      {strategies.map((strat) => (
        <button
          className="btn btn-primary"
          onClick={() => onRegen(strat)}
          key={strat}
        >
          <i className="fa fa-refresh"></i> Generate New {strat}
        </button>
      ))}
    </div>
    <h1>{strategy}</h1>
    <div className="row py-3">
      {ids.map(({ id, taken }, i) => (
        <div className="col-4 mb-4 mono" key={id}>
          <button
            className={`wide py-2 btn btn-sm btn-${
              taken ? 'dark' : 'outline-secondary'
            }`}
            onClick={() => onTake(id)}
          >
            {id}
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default compose(
  withAppLayout,
  connect(
    ({ idUtil }) => ({ ...idUtil }),
    (dispatch) => ({
      onRegen: (strat) => dispatch.idUtil.regen(strat),
      onTake: (id) => {
        copy(id);
        NotificationManager.success('Copied ' + id);
        dispatch.idUtil.take(id);
      },
    }),
  ),
)(IdUtils);
