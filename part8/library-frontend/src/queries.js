import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount
    }
  }
`;

export const ALL_BOOKS_WITHOUT_GENRE = gql`
  query {
    allBooks {
      title,
      author,
      published
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      author,
      published
      genres
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($author: String!, $setBornYear: Int!) {
    editAuthor(
      name: $author,
      setBornTo: $setBornYear
    ) {
      name,
      born,
      bookCount
    }
  }
`;
