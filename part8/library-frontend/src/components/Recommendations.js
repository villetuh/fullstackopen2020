import React, { useEffect, useState } from 'react';

import { useLazyQuery, useQuery } from '@apollo/client';

import { ALL_BOOKS_OF_GENRE, GET_USER_INFO } from '../queries';

const Books = (props) => {
  const user = useQuery(GET_USER_INFO);
  const [getAllBooksOfGenre, result] = useLazyQuery(ALL_BOOKS_OF_GENRE);
  const [favoriteGenre, setFavoriteGenre] = useState('');

  useEffect(() => {
    if (favoriteGenre === '') {
      return;
    }

    getAllBooksOfGenre({
      variables: { genre: favoriteGenre }
    });
  }, [favoriteGenre, getAllBooksOfGenre]);

  if (!props.show || user.loading) {
    return null;
  }

  if (favoriteGenre !== user.data.me.favoriteGenre) {
    setFavoriteGenre(user.data.me.favoriteGenre);
    return null;
  }

  if (!result.called || result.loading) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {result.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
