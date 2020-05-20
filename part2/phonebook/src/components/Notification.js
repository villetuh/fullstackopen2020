import React from 'react';

import './Notification.css';

const Notification = ({ text }) => {
  if (text === null || text === undefined || text === '') {
    return null;
  }

  return (
    <div className='Notification'>
      <b>{text}</b>
    </div>
  );  
};

export default Notification;