describe('Inventory', () => {
    beforeEach(() => {
        cy.login();
    })

    it('should list inventory', () => {
        cy.visit('/inventory');
        cy.get('table').should('be.visible');
    })
});

describe('New Inventory', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/inventory/add');
    })

    it('Name field exist', () => {
        cy.get('input[aria-label=Name]').should('be.visible');
    })

    it('Quantity field exist', () => {
        cy.get('input[aria-label=Stock]').should('be.visible');
    })

    it('Add button exist', () => {
        cy.get('button').should('be.visible');
    })
})
