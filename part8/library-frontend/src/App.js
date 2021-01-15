
import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';

const defaultPage = 'authors';

const App = () => {
  const [page, setPage] = useState(defaultPage);
  const [token, setToken] = useState(null);

  const client = useApolloClient();

  const onLogin = (token) => {
    localStorage.setItem('library-user-token', token);
    setPage(defaultPage);
    setToken(token);
  };

  const onLogout = () => {
    setPage(defaultPage);
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token && <button onClick={() => setPage('add')}>add book</button> }
        { token && <button onClick={() => setPage('recommendations')}>recommendations</button>}
        { !token && <button onClick={() => setPage('login')}>login</button> }
        { token && <button onClick={() => onLogout()}>logout</button> }
      </div>

      <Authors
        show={page === 'authors'}
        userLoggedIn={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        show={page==='recommendations'}
      />

      <LoginForm
        show={page === 'login'}
        onLogin={onLogin}
      />

    </div>
  );
};

export default App;
