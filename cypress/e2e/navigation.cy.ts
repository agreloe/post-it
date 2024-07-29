describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display sign-in link when user is not logged in', () => {
    cy.get('nav').should('contain', 'Sign in');
  });

  it('should display Dashboard and Posts links when user is logged in', () => {
    cy.login('test@example.com', 'password');

    cy.visit('/');
    cy.get('nav').should('contain', 'Dashboard');
    cy.get('nav').should('contain', 'Posts');
  });

  it('should log out the user', () => {
    cy.login('test@example.com', 'password');

    cy.visit('/');
    cy.get('button[aria-label="Log out your account"]').click();
    cy.get('nav').should('contain', 'Sign in');
  });

  it('should toggle theme', () => {
    cy.get('button[aria-label="Switch to light mode"]').click();
    cy.get('html').should('not.have.class', 'dark');
  });
});