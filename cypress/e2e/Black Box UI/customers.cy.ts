describe('Customers', () => {
    beforeEach(() => {
        cy.login();
    })

    it('should list customers', () => {
        cy.visit('/customers');
        cy.get('table').should('be.visible');
    })
});

describe('New Customer', () => {
    
    beforeEach(() => {
      cy.login();
      cy.visit('/customers/add');
    })
  
    it('Name field exist', () => {
      cy.get('input[aria-label=Name]').should('be.visible');
    })

    it('Email field exist', () => {
        cy.get('input[aria-label=Email]').should('be.visible');
    })

    it('Phone field exist', () => {
        cy.get('input[aria-label=Phone]').should('be.visible');
    })

    it('Add button exist', () => {
        cy.get('button').should('be.visible');
    })
})