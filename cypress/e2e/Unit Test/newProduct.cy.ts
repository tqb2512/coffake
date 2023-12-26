describe('Normal', () => {
    it('Product Created', () => {
        cy.request({
            method: 'POST',
            url: '/api/products',
            failOnStatusCode: false,
            body: {
                name: "Product Test",
                category: "Drink",
                imageUrl: "",
                sizeList: [
                    {
                        price: 100,
                        size: "M",
                        recipe: []
                    }
                ]
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.body.name).to.eq('Product Test')
        })
    })

    it('Missing name', () => {
        cy.request({
            method: 'POST',
            url: '/api/products',
            failOnStatusCode: false,
            body: {
                category: "Drink",
                imageUrl: "",
                sizeList: [
                    {
                        price: 100,
                        size: "M",
                        recipe: []
                    }
                ]
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(500)
        })
    })

    it('Missing category', () => {
        cy.request({
            method: 'POST',
            url: '/api/products',
            failOnStatusCode: false,
            body: {
                name: "Product Test",
                imageUrl: "",
                sizeList: [
                    {
                        price: 100,
                        size: "M",
                        recipe: []
                    }
                ]
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(500)
        }
        )
    })

    it('Missing imageUrl', () => {
        cy.request({
            method: 'POST',
            url: '/api/products',
            failOnStatusCode: false,
            body: {
                name: "Product Test",
                category: "Drink",
                sizeList: [
                    {
                        price: 100,
                        size: "M",
                        recipe: []
                    }
                ]
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(500)
        })
    })

    it('Missing price', () => {
        cy.request({
            method: 'POST',
            url: '/api/products',
            failOnStatusCode: false,
            body: {
                name: "Product Test",
                category: "Drink",
                imageUrl: "",
                sizeList: [
                    {
                        size: "M",
                        recipe: []
                    }
                ]
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(500)
        })
    })

    it('Missing size', () => {
        cy.request({
            method: 'POST',
            url: '/api/products',
            failOnStatusCode: false,
            body: {
                name: "Product Test",
                category: "Drink",
                imageUrl: "",
                sizeList: [
                    {
                        price: 100,
                        recipe: []
                    }
                ]
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(500)
        })
    })
})

describe('Boundary', () => {
    it('Price is <0', () => {
        cy.request({
            method: 'POST',
            url: '/api/products',
            failOnStatusCode: false,
            body: {
                name: "",
                category: "Drink",
                imageUrl: "",
                sizeList: [
                    {
                        price: -1,
                        size: "M",
                        recipe: []
                    }
                ]
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('Price is =0', () => {
        cy.request({
            method: 'POST',
            url: '/api/products',
            failOnStatusCode: false,
            body: {
                name: "",
                category: "Drink",
                imageUrl: "",
                sizeList: [
                    {
                        price: 0,
                        size: "M",
                        recipe: []
                    }
                ]
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(200)
        })
    })
})