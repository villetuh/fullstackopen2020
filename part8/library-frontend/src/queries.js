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

export const ALL_BOOKS = gql`
  query {
    allBooks {
      id,
      title,
      author {
        name
      },
      published,
      genres
    }
  }
`;

export const ALL_BOOKS_OF_GENRE = gql`
  query AllBooksOfGenre ($genre: String!) {
    allBooks(
      genre: $genre
    ) {
      id,
      title,
      author {
        name
      },
      published
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id,
      title,
      author {
        name
      },
      published,
      genres
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
      id,
      title,
      author {
        name
      },
      published
      genres
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      value
    }
  }
`;

export const GET_USER_INFO = gql`
  query {
    me {
      username,
      favoriteGenre
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
