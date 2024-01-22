/* ==== Test Created with Cypress Studio ==== */
it('page load', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('http://localhost:4173/');
  cy.get('[data-cy="input"]').should('be.visible');
  cy.get('[data-cy="marvel-logo"]').should('be.visible');
  cy.get('[data-cy="heading"]').should('be.visible');
  cy.get('.grid-style').should('be.visible');
  cy.get('[data-cy="previous"]').should('be.visible');
  cy.get('[data-cy="next"]').should('be.visible');
  /* ==== End Cypress Studio ==== */
});