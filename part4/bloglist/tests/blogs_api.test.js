const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'Best potatoes for cassaroles',
    author: 'Teppo Töppönen',
    url: 'https://blog.pottu.com/Best-potatoes-for-cassaroles',
    likes: 2
  },
  {
    title: 'French or Belgian fries?',
    author: 'Jorma Teräs',
    url: 'https://blog.pottu.com/french-or-belgian-fries',
    likes: 5
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blog = new Blog(initialBlogs[0]);
  await blog.save();

  blog = new Blog(initialBlogs[1]);
  await blog.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogs.length);
});

test('specific blog is returned', async () => {
  const response = await api.get('/api/blogs');

  let contents = response.body.map(r => r.title);

  expect(contents).toContain(initialBlogs[0].title);
});

afterAll(() => {
  mongoose.connection.close();
});