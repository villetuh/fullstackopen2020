const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server');
const { v1: uuid } = require('uuid');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'IMPOSSIBLE_TO_GUESS';

const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

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

  type User {
    username: String!,
    favoriteGenre: String!,
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!],
    allAuthors: [Author!],
    me: User
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
    ): Author,
    createUser(
      username: String!,
      favoriteGenre: String!
    ): User,
    login(
      username: String!,
      password: String!
    ): Token
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
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id });
      return books.length;
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      const book = new Book({ title: args.title, published: args.published, genres: args.genres });

      let author = await Author.findOne({ name: args.author });
      if (author === undefined || author === null) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          });
        }
      }

      book.author = author;
      try {
        const newBook = await book.save();
        Book.populate(newBook, { path: 'author'});
        return newBook;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }
      
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      const author = await Author.findOne({ name: args.name });
      if (author === undefined || author === null)
        return null;

      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }
      
      return author;
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre });

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'fullstack') {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser }
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
});
