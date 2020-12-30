import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client';

import { ALL_AUTHORS, ALL_BOOKS_WITHOUT_GENRE, LOGIN } from '../queries';

const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [ login, result ] = useMutation(LOGIN, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS_WITHOUT_GENRE }],
    onError: (error) => {
      console.log(error.graphQLErrors);
    }
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      props.onLogin(token);
    }
  }, [result.data]); // eslint-disable-line

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password }});

    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            type='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  );
};

export default LoginForm;
