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
});