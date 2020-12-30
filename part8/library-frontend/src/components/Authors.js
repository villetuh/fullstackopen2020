import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries';

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [author, setAuthor] = useState('');
  const [bornYear, setBornYear] = useState('');

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log(error);
    }
  });

  if (!props.show || result.loading) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    updateAuthor({ variables: { author, setBornYear: parseInt(bornYear),}});

    setAuthor('');
    setBornYear('');
  };

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      { props.userLoggedIn &&
        <div>
          <h2>set birth year</h2>
          <form onSubmit={submit}>
            <div>
              <label>
                author:
                <select value={author} onChange={({target}) => setAuthor(target.value)}>
                  {
                    authors.map((author, key) => <option key={key} value={author.name}>{author.name}</option>)
                  }
                </select>
              </label>
            </div>
            <div>
              <label>
                born:
                <input
                  value={bornYear}
                  onChange={({ target }) => setBornYear(target.value)}
                />
              </label>
            </div>
            <button type='submit'>update</button>
          </form>
        </div>
      }
    </div>
  );
};

export default Authors;
