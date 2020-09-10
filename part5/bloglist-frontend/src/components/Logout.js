import React from 'react';

const Logout = ({ name, handleLogout }) => (
  <div>
    User: {name}
    <button onClick={handleLogout}>
      Logout
    </button>
  </div>
);

export default Logout;
