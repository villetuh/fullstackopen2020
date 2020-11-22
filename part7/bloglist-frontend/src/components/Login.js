import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({ loginUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    await loginUser(username, password);
  };

  const loginControlDivStyle = {
    display: 'inline-block',
    marginRight: '5px'
  };

  return (
    <div>
      <form onSubmit={handleLoginFormSubmit} >
        <div style={loginControlDivStyle}>
          username:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            style={{ width: '80px' }} />
        </div>
        <div style={loginControlDivStyle}>
          password:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            style={{ width: '80px' }} />
        </div>
        <button type="submit" style={loginControlDivStyle}>login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired
};

export default Login;
