import React, { useState } from 'react';
import copy from 'copy-to-clipboard';
import { NotificationManager } from 'react-notifications';

import { withAppLayout } from '../hoc';

import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-plain_text';
import 'ace-builds/src-noconflict/theme-github';

const FormGroup = ({ onCopy, onUpdate, title, value }) => (
  <>
    <h1>{title}</h1>
    <p>
      <button className="btn btn-sm btn-primary mr-2" onClick={onCopy}>
        <i className="fa fa-copy"></i> Copy
      </button>
      <button
        className="btn btn-sm btn-danger mr-2"
        onClick={() => onUpdate('')}
      >
        <i className="fa fa-trash"></i> Clear
      </button>
    </p>
    <div className="border rounded">
      <AceEditor
        mode="plain_text"
        theme="github"
        value={value}
        style={{ width: '100%' }}
        onChange={onUpdate}
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  </>
);

const Base64Utils = () => {
  const [text, setText] = useState('Hello, World!');
  const [encoded, setEncoded] = useState('SGVsbG8sIFdvcmxkIQ==');
  const [error, setError] = useState(null);
  const updateText = (value) => {
    setText(value);
    setEncoded(btoa(value));
    setError(null);
  };
  const updateEncoded = (value) => {
    setEncoded(value);
    try {
      setText(atob(value));
      setError(null);
    } catch (err) {
      setText('');
      setError(err.message);
    }
  };
  const buildOnCopy = (value) => () => {
    copy(value);
    const notifValue =
      value.length <= 15 ? value : `${value.substring(0, 15)}...`;
    NotificationManager.success(`Copied "${notifValue}"`);
  };
  return (
    <div className="Base64Utils">
      <div className={`alert alert-${!!error ? 'danger' : 'success'} mono`}>
        {error || 'Success.'}
      </div>
      <div className="row">
        <div className="col p-2">
          <FormGroup
            onCopy={buildOnCopy(text)}
            value={text}
            title="Plaintext"
            onUpdate={updateText}
          />
        </div>
        <div className="col p-2">
          <FormGroup
            onCopy={buildOnCopy(encoded)}
            value={encoded}
            title="Encoded"
            onUpdate={updateEncoded}
          />
        </div>
      </div>
    </div>
  );
};

export default withAppLayout(Base64Utils);
