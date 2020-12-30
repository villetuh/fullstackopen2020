import React, { useState } from 'react';

import { useQuery } from '@apollo/client';

import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [ genre, setGenre ] = useState('all');
  const result = useQuery(ALL_BOOKS);

  if (!props.show || result.loading) {
    return null;
  }

  const books = result.data.allBooks;
  const genres = books.reduce((acc, cur,) => {
    if (!cur.genres)
      return acc;

    cur.genres.forEach(genre => {
      if (!acc.includes(genre))
        acc.push(genre);
    });
    return acc;
  }, []);

  genres.push('all');

  const booksWithSelectedGenre = genre === 'all'
                                  ? books
                                  : books.filter(book => book.genres.includes(genre));

  return (
    <div>
      <h2>books</h2>

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
          {booksWithSelectedGenre.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(genre => <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>)}
      </div>
    </div>
  );
};

export default Books;
