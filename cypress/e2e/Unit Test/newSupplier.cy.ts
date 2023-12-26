describe('New supplier', () => {
    it('Supplier Created', () => {
        cy.request({
            method: 'POST',
            url: '/api/suppliers',
            failOnStatusCode: false,
            body: {
                name: "Vo Thien Phuc",
                company: "UIT",
                phone: "012345678",
                email: "test@gmail.com"
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.body.message).to.eq('Supplier created')
        })
    })

    it('Missing name', () => {
        cy.request({
            method: 'POST',
            url: '/api/suppliers',
            failOnStatusCode: false,
            body: {
                company: "UIT",
                phone: "012345678",
                email: "test@gmail.com"
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.body.message).to.eq('Missing fields')
        })
    })

    it('Missing company', () => {
        cy.request({
            method: 'POST',
            url: '/api/suppliers',
            failOnStatusCode: false,
            body: {
                name: "Vo Thien Phuc",
                phone: "012345678",
                email: "test@gmail.com"
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.body.message).to.eq('Missing fields')
        }
        )
    })

    it('Missing phone', () => {
        cy.request({
            method: 'POST',
            url: '/api/suppliers',
            failOnStatusCode: false,
            body: {
                name: "Vo Thien Phuc",
                company: "UIT",
                email: "test@gmail.com"
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.body.message).to.eq('Missing fields')
        })

        it('Missing email', () => {
            cy.request({
                method: 'POST',
                url: '/api/suppliers',
                failOnStatusCode: false,
                body: {
                    name: "Vo Thien Phuc",
                    company: "UIT",
                    phone: "012345678",
                }
            }).as('response')
            cy.get('@response').then((response) => {
                expect(response.body.message).to.eq('Missing fields')
            })
        })
    })
})
