/* ==== Test Created with Cypress Studio ==== */
it('loaded page', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('http://localhost:4173');
  cy.get('[data-cy="header"]').should('be.visible');
  cy.get('[data-cy="input"]').should('be.visible');
  cy.get('[data-cy="marvel-logo"]').should('be.visible');
  cy.get('[data-cy="heading"]').should('be.visible');
  cy.get('[data-cy="heading"]').should('have.text', ' KNOW YOUR LEGENDS ');
  cy.get('[data-cy="container"]').should('be.visible');
  cy.get('[data-cy="previous"]').should('be.visible');
  cy.get('[data-cy="previous"]').should('have.text', 'Previous');
  cy.get('[data-cy="next"]').should('be.visible');
  cy.get('[data-cy="next"]').should('have.text', 'Next');
  /* ==== End Cypress Studio ==== */
});