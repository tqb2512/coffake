describe('Suppliers', () => {
    beforeEach(() => {
        cy.login();
    })

    it('should list suppliers', () => {
        cy.visit('/suppliers');
        cy.get('table').should('be.visible');
    })
});

describe('New Supplier', () => {
    
    beforeEach(() => {
      cy.login();
      cy.visit('/suppliers/add');
    })
  
    it('Name field exist', () => {
      cy.get('input[aria-label=Name]').should('be.visible');
    })

    it('Email field exist', () => {
        cy.get('input[aria-label=Email]').should('be.visible');
    })

    it('Add button exist', () => {
        cy.get('button').should('be.visible');
    })
})