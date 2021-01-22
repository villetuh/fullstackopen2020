
import React, { useState } from 'react';
import { useApolloClient, useSubscription } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';

import { ALL_BOOKS, BOOK_ADDED } from './queries';

const defaultPage = 'authors';

const App = () => {
  const [page, setPage] = useState(defaultPage);
  const [token, setToken] = useState(localStorage.getItem('library-user-token'));

  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      return set.map(p => p.id).includes(object.id);
    }

    const dataInStore = client.readQuery({ query: ALL_BOOKS });

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      updateCacheWith(addedBook);
    }
  })

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
