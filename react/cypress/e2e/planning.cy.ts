describe('Planning page', () => {
  it('successfully load', () => {
    cy.visit('/');
    cy.dataCy("navPlanning").click();
    cy.dataCy("pagePlanning").should('be.visible');
  })
})