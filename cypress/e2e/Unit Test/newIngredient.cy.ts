
describe('Normal', () => {
    it('Ingredient Created', () => {
        cy.request({
            method: 'POST',
            url: '/api/inventory',
            failOnStatusCode: false,
            body: {
                name: "Ingredient Test",
                stock: 100,
                unit: "kg",
                unitPrice: 100
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('Missing name', () => {
        cy.request({
            method: 'POST',
            url: '/api/inventory',
            failOnStatusCode: false,
            body: {
                stock: 100,
                unit: "kg",
                unitPrice: 100
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(500)
        })
    })

    it('Missing stock', () => {
        cy.request({
            method: 'POST',
            url: '/api/inventory',
            failOnStatusCode: false,
            body: {
                name: "Ingredient Test",
                unit: "kg",
                unitPrice: 100
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(500)
        })
    })

    it('Missing unit', () => {
        cy.request({
            method: 'POST',
            url: '/api/inventory',
            failOnStatusCode: false,
            body: {
                name: "Ingredient Test",
                stock: 100,
                unitPrice: 100
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(500)
        })
    })

    it('Missing unitPrice', () => {
        cy.request({
            method: 'POST',
            url: '/api/inventory',
            failOnStatusCode: false,
            body: {
                name: "Ingredient Test",
                stock: 100,
                unit: "kg",
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(500)
        })
    })
})

describe('Boundary', () => {
    it('Stock < 0', () => {
        cy.request({
            method: 'POST',
            url: '/api/inventory',
            failOnStatusCode: false,
            body: {
                name: "Ingredient Test",
                stock: -1,
                unit: "kg",
                unitPrice: 100
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('UnitPrice < 0', () => {
        cy.request({
            method: 'POST',
            url: '/api/inventory',
            failOnStatusCode: false,
            body: {
                name: "Ingredient Test",
                stock: 100,
                unit: "kg",
                unitPrice: -1
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(200)
        })
    })
})