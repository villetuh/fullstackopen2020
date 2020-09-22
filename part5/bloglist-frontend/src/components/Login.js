import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({ loginUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    await loginUser(username, password);
  }

  return (
    <div>
      <h2>Log in to the application</h2>
      <form onSubmit={handleLoginFormSubmit}>
        <div>
          username:
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password:
        <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired
};

export default Login;
