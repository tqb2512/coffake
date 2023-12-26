// date,
//             total,
//             importList

describe('Normal', () => {
    it('Import Created', () => {
        cy.request({
            method: 'POST',
            url: '/api/invoices',
            failOnStatusCode: false,
            body: {
                date: "2021-05-16T17:00:00.000Z",
                total: 100,
                importList: [
                    {
                        ingredientId: "60a1c9f4a2c3a30015a9c9b3",
                        ingredientName: "Ingredient Test",
                        suppilerId: "60a1c9f4a2c3a30015a9c9b3",
                        supplierName: "Supplier Test",
                        quantity: 100,
                        unitPrice: 1,
                        note: ""
                    }
                ]
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(200)
        })  
    })

    it('Missing date', () => {
        cy.request({
            method: 'POST',
            url: '/api/invoices',
            failOnStatusCode: false,
            body: {
                total: 100,
                importList: [
                    {
                        ingredientId: "60a1c9f4a2c3a30015a9c9b3",
                        ingredientName: "Ingredient Test",
                        suppilerId: "60a1c9f4a2c3a30015a9c9b3",
                        supplierName: "Supplier Test",
                        quantity: 100,
                        unitPrice: 1,
                        note: ""
                    }
                ]
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(400)
        })  
    })

    it('Missing total', () => {
        cy.request({
            method: 'POST',
            url: '/api/invoices',
            failOnStatusCode: false,
            body: {
                date: "2021-05-16T17:00:00.000Z",
                importList: [
                    {
                        ingredientId: "60a1c9f4a2c3a30015a9c9b3",
                        ingredientName: "Ingredient Test",
                        suppilerId: "60a1c9f4a2c3a30015a9c9b3",
                        supplierName: "Supplier Test",
                        quantity: 100,
                        unitPrice: 1,
                        note: ""
                    }
                ]
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(400)
        })  
    })

    it('Missing importList', () => {
        cy.request({
            method: 'POST',
            url: '/api/invoices',
            failOnStatusCode: false,
            body: {
                date: "2021-05-16T17:00:00.000Z",
                total: 100,
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(400)
        })  
    })
})

describe('Boundary', () => {
    
    it('Total < 0', () => {
        cy.request({
            method: 'POST',
            url: '/api/invoices',
            failOnStatusCode: false,
            body: {
                date: "2021-05-16T17:00:00.000Z",
                total: -1,
                importList: [
                    {
                        ingredientId: "60a1c9f4a2c3a30015a9c9b3",
                        ingredientName: "Ingredient Test",
                        suppilerId: "60a1c9f4a2c3a30015a9c9b3",
                        supplierName: "Supplier Test",
                        quantity: 100,
                        unitPrice: 1,
                        note: ""
                    }
                ]
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(200)
        })  
    })

    it('Quantity < 0', () => {
        cy.request({
            method: 'POST',
            url: '/api/invoices',
            failOnStatusCode: false,
            body: {
                date: "2021-05-16T17:00:00.000Z",
                total: 100,
                importList: [
                    {
                        ingredientId: "60a1c9f4a2c3a30015a9c9b3",
                        ingredientName: "Ingredient Test",
                        suppilerId: "60a1c9f4a2c3a30015a9c9b3",
                        supplierName: "Supplier Test",
                        quantity: -1,
                        unitPrice: 1,
                        note: ""
                    }
                ]
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(200)
        })  
    })

    it('UnitPrice < 0', () => {
        cy.request({
            method: 'POST',
            url: '/api/invoices',
            failOnStatusCode: false,
            body: {
                date: "2021-05-16T17:00:00.000Z",
                total: 100,
                importList: [
                    {
                        ingredientId: "60a1c9f4a2c3a30015a9c9b3",
                        ingredientName: "Ingredient Test",
                        suppilerId: "60a1c9f4a2c3a30015a9c9b3",
                        supplierName: "Supplier Test",
                        quantity: 100,
                        unitPrice: -1,
                        note: ""
                    }
                ]
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(200)
        })  
    })
})

describe('Abnormal', () => {

    it('Missing fields in importList', () => {
        cy.request({
            method: 'POST',
            url: '/api/invoices',
            failOnStatusCode: false,
            body: {
                date: "2021-05-16T17:00:00.000Z",
                total: 100,
                importList: [
                    {
                        ingredientName: "Ingredient Test",
                        suppilerId: "60a1c9f4a2c3a30015a9c9b3",
                        supplierName: "Supplier Test",
                        quantity: 100,
                        unitPrice: 1,
                        note: ""
                    }
                ]
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(500)
        })
    })
})