describe('Access Control', () => {

    const protectedRoutes = ['/dashboard', '/posts'];

    protectedRoutes.forEach((route) => {
      it(`should redirect unauthenticated users to login page when accessing ${route}`, () => {
        cy.visit(route);
        cy.url().should('include', '/sign-in');
      });
    });

    protectedRoutes.forEach((route) => {
      it(`should allow authenticated users to access ${route}`, () => {
        cy.login('test@example.com', 'password');
        cy.visit(route);
        cy.url().should('include', route);
      });
    });

    it('should redirect authenticated users from /sign-in to home page', () => {
      cy.login('test@example.com', 'password');
      cy.visit('/sign-in');
      cy.url().should('include', '/');
    });
  });

