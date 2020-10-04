describe('Blog app', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    cy.request('POST', 'http://localhost:3001/api/users/', {
      name: 'Test User',
      username: 'test_user',
      password: 'abba'
    });

    cy.visit('http://localhost:3000/');
  });

  it('Login form is shown', function () {
    cy.contains('Login').click();

    cy.contains('Log in to the application');
  });

  describe('Login', function () {
    beforeEach(function () {
      cy.contains('Login').click();
    });

    it('succeeds with correct credentials', function () {
      cy.contains('username').find('input').type('test_user');
      cy.contains('password').find('input').type('abba');
      cy.contains('login').click();
      cy.contains('User: Test User');
    });

    it('fails with incorrect credentials', function () {
      cy.contains('username').find('input').type('test_user2');
      cy.contains('password').find('input').type('abba2');
      cy.contains('login').click();
      cy.get('.Notification-Error').should('contain', 'wrong username or password').and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/login/', {
        username: 'test_user',
        password: 'abba'
      }).then(response => {
        localStorage.setItem('loggedInBloglistUser', JSON.stringify(response.body));
        cy.visit('http://localhost:3000/');
      });
    });

    it('A blog can be created', function () {
      cy.contains('add new blog').click();

      cy.contains('title').find('input').type('What a great test blog');
      cy.contains('author').find('input').type('Test User');
      cy.contains('url').find('input').type('https://blogs.test.com/what-a-great-test-blog');

      cy.get('.add-blog-form').contains('add').click();

      cy.get('.blog-title').contains('What a great test blog');
    });
  });

  describe('When blog list contains a blog', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/login/', {
        username: 'test_user',
        password: 'abba'
      }).then(response => {
        localStorage.setItem('loggedInBloglistUser', JSON.stringify(response.body));

        cy.request({
          method: 'POST',
          url: 'http://localhost:3001/api/blogs',
          body: {
            title: 'What a great test blog',
            author: 'Test User',
            url: 'https://blogs.test.com/what-a-great-test-blog'
          },
          headers: { Authorization: 'bearer ' + response.body.token }
        });

        cy.visit('http://localhost:3000');
      });
    });

    it('user can like a blog post', function () {
      cy.contains('What a great test blog').find('button').click();
      cy.contains('likes: 0');

      cy.contains('like').click();
      cy.contains('likes: 1');
    });
  });
});
