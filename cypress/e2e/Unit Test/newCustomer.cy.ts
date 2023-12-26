describe('Normal', () => {
    it('Customer Created', () => {
        cy.request({
            method: 'POST',
            url: '/api/customers',
            failOnStatusCode: false,
            body: {
                name: "Vo Thien Phuc",
                phone: "012345678",
                email: "sample@gm.com",
                loyaltyPoint: 20,
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('Missing name', () => {
        cy.request({
            method: 'POST',
            url: '/api/customers',
            failOnStatusCode: false,
            body: {
                phone: "012345678",
                email: "sample@gm.com",
                loyaltyPoint: 20,
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(500)
        })
    })

    it('Missing phone', () => {
        cy.request({
            method: 'POST',
            url: '/api/customers',
            failOnStatusCode: false,
            body: {
                name: "Vo Thien Phuc",
                email: "sample@gm.com",
                loyaltyPoint: 20,
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(500)
        })
    })

    it('Missing email', () => {
        cy.request({
            method: 'POST',
            url: '/api/customers',
            failOnStatusCode: false,
            body: {
                name: "Vo Thien Phuc",
                phone: "012345678",
                loyaltyPoint: 20,
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(500)
        })
    })

    it('Missing loyaltyPoint', () => {
        cy.request({
            method: 'POST',
            url: '/api/customers',
            failOnStatusCode: false,
            body: {
                name: "Vo Thien Phuc",
                phone: "012345678",
                email: "sample@gm.com",
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(200)
        })
    })
})

describe('Boundary', () => {
    it('Phone number length > 10', () => {
        cy.request({
            method: 'POST',
            url: '/api/customers',
            failOnStatusCode: false,
            body: {
                name: "Testing",
                phone: "012345678",
                email: "sample@gm.com",
                loyaltyPoint: 20,
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('Loyalty point < 0', () => {
        cy.request({
            method: 'POST',
            url: '/api/customers',
            failOnStatusCode: false,
            body: {
                name: "Testing",
                phone: "012345678",
                email: "sample@gm.com",
                loyaltyPoint: -1,
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(200)
        })
    })
})