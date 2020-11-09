import React from 'react';

import './Notification.css';

const Notification = ({ notification }) => {
  if (notification === null || notification === undefined || notification.text === '') {
    return null;
  }

  let className = 'Notification';
  if (notification.type === 'info') {
    className = 'Notification-Info';
  }
  else if (notification.type === 'error') {
    className = 'Notification-Error';
  }

  return (
    <div className={className}>
      <b>{notification.text}</b>
    </div>
  );
};

export default Notification;
