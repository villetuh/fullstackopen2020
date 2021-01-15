import React from 'react';

import { useQuery } from '@apollo/client';

import { ALL_BOOKS, GET_USER_INFO } from '../queries';

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const user = useQuery(GET_USER_INFO);

  if (!props.show || result.loading) {
    return null;
  }

  const books = result.data.allBooks;
  
  const booksWithFavoriteGenre = books.filter(book => book.genres.includes(user.data.me.favoriteGenre));

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
          {booksWithFavoriteGenre.map(a =>
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
