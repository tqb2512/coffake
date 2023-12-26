describe('Invoices', () => {
    beforeEach(() => {
        cy.login();
    })

    it('should list invoices', () => {
        cy.visit('/invoices');
        cy.get('table').should('be.visible');
    })
});

describe('New Invoice', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/invoices/add');
    })

    it('Add ingredient button exist', () => {
        cy.get('button').should('be.visible');
    })

    it('Add ingredient fields exist', () => {
        cy.get('.App > .z-0').click();
        cy.get('#ingredientId').should('be.visible');
        cy.get('#quantity').should('be.visible');
        cy.get('#unitPrice').should('be.visible');
    })

    it('Add button exist', () => {
        cy.get('button').should('be.visible');
    })
})