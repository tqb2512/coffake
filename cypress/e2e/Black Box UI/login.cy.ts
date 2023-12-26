describe('Login', () => {

    it('should invalidate username', () => {
        cy.visit('/login');
        cy.get('input[name="password"]').type('12345');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/login');
    })

    it('should invalidate password', () => {
        cy.visit('/login');
        cy.get('input[name="username"]').type('tqbaoo');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/login');
    })

    it('should fail login', () => {
        cy.visit('/login');
        cy.get('input[name="username"]').type('tqbaoo');
        cy.get('input[name="password"]').type('123456');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/login');
    })

    
    it('should login successfully', () => {
        cy.visit('/login');
        cy.get('input[name="username"]').type('tqbaoo');
        cy.get('input[name="password"]').type('12345');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
    })

})
