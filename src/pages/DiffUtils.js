import React, { useState } from 'react';

import { withAppLayout } from '../hoc';

import ReactDiffViewer from 'react-diff-viewer';

const DiffUtils = () => {
  const [s1, setS1] = useState(
    'This is a test.\nHello, World!\nThis is only a test...',
  );
  const [s2, setS2] = useState(
    'This is a test.\nHello, David!\n\n\n\tThis is only a test...',
  );
  const [splitView, setSplitView] = useState(true);
  return (
    <div className="DiffUtils">
      <div className="row">
        <div className="col p-2">
          <p>Old Text</p>
          <textarea
            className="form-control"
            rows="3"
            value={s1}
            onChange={(e) => setS1(e.target.value)}
          ></textarea>
        </div>
        <div className="col p-2">
          <p>New Text</p>
          <textarea
            className="form-control"
            rows="3"
            value={s2}
            onChange={(e) => setS2(e.target.value)}
          ></textarea>
        </div>
      </div>
      <hr />
      <div className="my-3">
        <button
          className={`btn btn-small btn-${
            splitView ? '' : 'outline-'
          }secondary`}
          onClick={() => setSplitView(!splitView)}
        >
          <i className={`fa fa-toggle-${splitView ? 'on' : 'off'}`}></i> Split
          View
        </button>
      </div>
      <div className="border rounded">
        <ReactDiffViewer oldValue={s1} newValue={s2} splitView={splitView} />
      </div>
    </div>
  );
};

export default withAppLayout(DiffUtils);
