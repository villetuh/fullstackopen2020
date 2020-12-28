const { ApolloServer, gql } = require('apollo-server');
const { v1: uuid } = require('uuid');
require('dotenv').config();

const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');

console.log('connecting to', process.env.DB_URI);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!,
    born: Int,
    id: ID!,
    bookCount: Int!
  }

  type Book {
    title: String!,
    author: Author!,
    published: Int!,
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!],
    allAuthors: [Author!]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!,
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (args.genre === undefined && args.author === undefined)
        return Book.find({}).populate('author');
      else if (args.genre)
        return Book.find({ genres: args.genre }).populate('author');
      return [];
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id });
      return books.length;
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ title: args.title, published: args.published, genres: args.genres });

      let author = await Author.findOne({ name: args.author });
      if (author === undefined || author === null) {
        author = new Author({ name: args.author });
        await author.save();
      }

      book.author = author;

      const newBook = await book.save();
      Book.populate(newBook, { path: 'author'});
      return newBook;
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      if (author === undefined || author === null)
        return null;

      author.born = args.setBornTo;
      await author.save();
      return author;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
});
