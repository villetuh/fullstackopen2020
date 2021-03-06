const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

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
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = new User({
    username: 'testuser',
    name: 'Teemu Testaaja',
    passwordHash
  });

  await user.save();

  await Blog.deleteMany({});

  let blog = new Blog(initialBlogs[0]);
  blog.user = user._id;
  await blog.save();

  blog = new Blog(initialBlogs[1]);
  blog.user = user._id;
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

test('unique identified named as id', async () => {
  const response = await api.get('/api/blogs');

  const firstBlog = response.body[0];

  expect(firstBlog.id).toBeDefined();
});

test('new blog is added', async () => {
  const newBlog = {
    title: '10 potato recipes for the long summer nights',
    author: 'Pertti Peruna',
    url: 'https://blog.pottu.com/10-potato-recipes-for-the-long-summer-nights',
    likes: 4
  };

  const loginResponse = await api.post('/api/login')
    .send({ username: 'testuser', password: 'sekret' });

  await api.post('/api/blogs')
    .set('Authorization', 'Bearer ' + loginResponse.body.token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  const blogsWithoutId = response.body.map(blog => { 
    return { 
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes
    };
  });

  expect(blogsWithoutId).toHaveLength(initialBlogs.length + 1);
  expect(blogsWithoutId).toContainEqual(newBlog);
});

test('adding a new blog without token returns unauthorized response', async () => {
  const newBlog = {
    title: '10 potato recipes for the long summer nights',
    author: 'Pertti Peruna',
    url: 'https://blog.pottu.com/10-potato-recipes-for-the-long-summer-nights',
    likes: 4
  };

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/);
});

test('likes default to 0 for new blog', async () => {
  const newBlog = {
    title: '10 potato recipes for the long summer nights',
    author: 'Pertti Peruna',
    url: 'https://blog.pottu.com/10-potato-recipes-for-the-long-summer-nights'
  };

  const loginResponse = await api.post('/api/login')
    .send({ username: 'testuser', password: 'sekret' });

  const response = await api.post('/api/blogs')
    .set('Authorization', 'Bearer ' + loginResponse.body.token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(response.body.likes).toBeDefined();
  expect(response.body.likes).toBe(0);
});

test('adding new blog without title returns a bad request response', async () => {
  const newBlog = {
    author: 'Pertti Peruna',
    url: 'https://blog.pottu.com/10-potato-recipes-for-the-long-summer-nights'
  };

  const loginResponse = await api.post('/api/login')
    .send({ username: 'testuser', password: 'sekret' });

  await api.post('/api/blogs')
    .set('Authorization', 'Bearer ' + loginResponse.body.token)
    .send(newBlog)
    .expect(400);
});

test('adding new blog without url returns a bad request response', async () => {
  const newBlog = {
    author: 'Pertti Peruna',
    title: '10 potato recipes for the long summer nights',
  };

  const loginResponse = await api.post('/api/login')
    .send({ username: 'testuser', password: 'sekret' });

  await api.post('/api/blogs')
    .set('Authorization', 'Bearer ' + loginResponse.body.token)
    .send(newBlog)
    .expect(400);
});

test('deleting blog removes it from database', async () => {
  let response = await api.get('/api/blogs');
  const originalBlogs = response.body;

  const loginResponse = await api.post('/api/login')
    .send({ username: 'testuser', password: 'sekret' });

  await api.delete(`/api/blogs/${originalBlogs[0].id}`)
    .set('Authorization', 'Bearer ' + loginResponse.body.token);

  response = await api.get('/api/blogs');
  const blogsAfterRemove = response.body;

  expect(blogsAfterRemove).not.toContainEqual(originalBlogs[0]);
});

test('updating blog updates it to database', async () => {
  let response = await api.get('/api/blogs');
  const originalBlogs = response.body;

  await api
    .put(`/api/blogs/${originalBlogs[0].id}`)
    .send({ ...originalBlogs[0], likes: 10 })
    .expect(200);

  response = await api.get('/api/blogs');
  const updatedBlog = response.body.find(blog => blog.id === originalBlogs[0].id);

  expect(updatedBlog.likes).toBe(10);
});

afterAll(() => {
  mongoose.connection.close();
});