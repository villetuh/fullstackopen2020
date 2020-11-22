import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const linkStyle = {
    display: 'inline-block',
    marginRight: '5px'
  };
  return (
    <div style={{ display: 'inline-block' }}>
      <div style={linkStyle}>
        <Link to='/blogs'>Blogs</Link>
      </div>
      <div style={linkStyle}>
        <Link to='/users'>Users</Link>
      </div>
    </div>
  );
};

export default Navigation;
