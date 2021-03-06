const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);

describe('when there is initially one user in database', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({
      username: 'testuser',
      name: 'Teemu Testaaja',
      passwordHash
    });

    await user.save();
  });

  test('adding a new user with unique username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'testuser2',
      name: 'Tiina Testaaja',
      password: 'abbaabc'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('adding a new user with existing username fails', async () => {
    const newUser = {
      username: 'testuser',
      name: 'Tiina Testaaja',
      password: 'abbaabc'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('requesting users returns the user initially added to database', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const expectedUser = {
      username: 'testuser',
      name: 'Teemu Testaaja',
    };
    const results = response.body.map(user => ({ username: user.username, name: user.name }));
    expect(results).toContainEqual(expectedUser);
  });
});

describe('when adding a new user', () => {
  test('if username isn\'t given response with status code bad request is returned', async () => {
    const newUser = {
      name: 'Tiina Testaaja',
      password: 'abbaabc'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('if username is shorter than 3 character response with status code bad request is returned', async () => {
    const newUser = {
      username: 'ab',
      name: 'Tiina Testaaja',
      password: 'abbaabc'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });


  test('if password isn\'t given response with status code bad request is returned', async () => {
    const newUser = {
      username: 'testuser',
      name: 'Tiina Testaaja'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('if password is shorter than 3 character response with status code bad request is returned', async () => {
    const newUser = {
      username: 'testuser',
      name: 'Tiina Testaaja',
      password: 'ab'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});



afterAll(async () => {
  mongoose.connection.close();
});
