import React from 'react';

import LoginControl from './LoginControl';
import Navigation from './Navigation';

const Header = () => {
  const headerStyle = {
    backgroundColor: 'lightgrey',
    padding: '10px'
  };
  return (
    <div style={headerStyle} >
      <div style={{ display: 'inline-block' }} >
        <Navigation />
      </div>
      <div style={{ display: 'inline-block', float: 'right' }} >
        <LoginControl />
      </div>
    </div>
  );
};

export default Header;
