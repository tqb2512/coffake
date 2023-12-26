describe('Users', () => {

  beforeEach(() => {
    cy.login();
  })

  it('should list users', () => {
    cy.visit('/users');
    cy.get('table').should('be.visible');
  })
});

describe('New User', () => {
  
    beforeEach(() => {
      cy.login();
      cy.visit('/users/add');
    })
  
    it('Name field exist', () => {
      cy.get('input[aria-label=Name]').should('be.visible');
    })

    it('Username field exist', () => {
        cy.get('input[aria-label=Username]').should('be.visible');
    })

    it('Password field exist', () => {
        cy.get('input[aria-label=Password]').should('be.visible');
    })

    it('Salary field exist', () => {
        cy.get('input[aria-label=Salary]').should('be.visible');
    })

    it('Add button exist', () => {
        cy.get('button').should('be.visible');
    })
})