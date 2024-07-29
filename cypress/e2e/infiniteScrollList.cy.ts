describe('InfiniteScrollList', () => {

    beforeEach(() => {
      cy.login('test@example.com', 'password');
      cy.intercept('GET', 'https://dummyjson.com/posts?skip=0&limit=10', {
        statusCode: 200
      }).as('initialPosts');

      cy.intercept('GET', 'https://dummyjson.com/posts?skip=10&limit=10', {
        statusCode: 200
      }).as('newPosts');
    });

    it('should render the initial posts', () => {
      cy.visit('/posts');

      cy.request('https://dummyjson.com/posts?skip=0&limit=10').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.posts.length).to.eq(10);
      });
    });

    it('should load more posts when scrolling to the bottom', () => {
      cy.visit('/posts');

      cy.request('https://dummyjson.com/posts?skip=0&limit=10').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.posts.length).to.eq(10);
      });

      cy.scrollTo('bottom');
      cy.request('https://dummyjson.com/posts?skip=10&limit=10').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.posts.length).to.eq(10);

        cy.get('.post').should('have.length', 20);
      });
    });

    it('should scroll to the top when the ScrollToTopButton is clicked', () => {
      cy.visit('/posts');

      cy.request('https://dummyjson.com/posts?skip=0&limit=10').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.posts.length).to.eq(10);
      });

      cy.scrollTo('bottom');
      cy.request('https://dummyjson.com/posts?skip=10&limit=10').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.posts.length).to.eq(10);

        cy.get('.post').should('have.length', 20);
      });

      cy.scrollTo('bottom');

      cy.get('button[aria-label="Scroll to the top of the page"]').click();

      cy.window().its('scrollY').should('eq', 0);
    });
  });
