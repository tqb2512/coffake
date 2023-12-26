describe('Products', () => {
    beforeEach(() => {
        cy.login();
    })

    it('should list products', () => {
        cy.visit('/products');
        cy.get('.grid').should('be.visible');
    })
});

describe('New Product', () => {
    
        beforeEach(() => {
            cy.login();
            cy.visit('/products/add');
        })
    
        it('Name field exist', () => {
            cy.get('input[aria-label=Name]').should('be.visible');
        })
    
        it('Add button exist', () => {
            cy.get('button').should('be.visible');
        })
})