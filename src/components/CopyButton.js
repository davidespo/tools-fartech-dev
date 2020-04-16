import React from 'react';
import copy from 'copy-to-clipboard';
import { NotificationManager } from 'react-notifications';

const CopyButton = ({
  children,
  value,
  size,
  color = 'btn-primary',
  className,
}) => {
  let btnClassName = 'CopyButton btn';
  if (size) {
    btnClassName += ` ${size}`;
  }
  if (color) {
    btnClassName += ` ${color}`;
  }
  if (className) {
    btnClassName += ` ${className}`;
  }
  return (
    <button
      className={btnClassName}
      onClick={() => {
        copy(value);
        let val = `${value}`;
        val = val.length <= 15 ? val : `${val.substring(0, 15)}...`;
        NotificationManager.success(`Copied "${val}"`);
      }}
    >
      {children}
    </button>
  );
};

export default CopyButton;
