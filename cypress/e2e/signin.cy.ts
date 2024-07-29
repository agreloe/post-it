describe('Sign-In Process', () => {
    beforeEach(() => {
      cy.visit('/sign-in');
    });

    it('should display the sign-in form', () => {
      cy.get('form[data-testid="login-form"]').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('contain', 'Sign In');
    });

    it('should sign in successfully with valid credentials', () => {
      cy.login('test@example.com', 'password');


      cy.visit('/');

      cy.get('nav').should('contain', 'Dashboard');
      cy.get('nav').should('contain', 'Posts');
    });

    it('should show an error message with invalid credentials', () => {
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('invalidpassword');
      cy.get('button[type="submit"]').click();

      cy.get('.text-red-500').should('contain', 'Invalid credentials. Please try again.');
    });
  });
