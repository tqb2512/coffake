
describe('Normal', () => {
    it('Order Created', () => {
        cy.request({
            method: 'POST',
            url: '/api/orders',
            failOnStatusCode: false,
            body: {
                customerID: "60a1c9f4a2c3a30015a9c9b3",
                customerName: "Vo Thien Phuc",
                date: "2021-05-16T17:00:00.000Z",
                totalPrice: 100,
                status: "Pending",
                items: [
                    {
                        productID: "60a1c9f4a2c3a30015a9c9b3",
                        productName: "Product Test",
                        size: "M",
                        price: 100,
                        quantity: 1,
                        toppings: [],
                        note: ""
                    }
                ]
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.body.customerName).to.eq('Vo Thien Phuc')
        })
    })

    it('Missing customerID', () => {
        cy.request({
            method: 'POST',
            url: '/api/orders',
            failOnStatusCode: false,
            body: {
                customerName: "Vo Thien Phuc",
                date: "2021-05-16T17:00:00.000Z",
                totalPrice: 100,
                status: "Pending",
                items: [
                    {
                        productID: "60a1c9f4a2c3a30015a9c9b3",
                        productName: "Product Test",
                        size: "M",
                        price: 100,
                        quantity: 1,
                        toppings: [],
                        note: ""
                    }
                ]
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(500)
        })
    })

    it('Missing ProductID', () => {
        cy.request({
            method: 'POST',
            url: '/api/orders',
            failOnStatusCode: false,
            body: {
                customerID: "60a1c9f4a2c3a30015a9c9b3",
                customerName: "Vo Thien Phuc",
                date: "2021-05-16T17:00:00.000Z",
                totalPrice: 100,
                status: "Pending",
                items: [
                    {
                        productName: "Product Test",
                        size: "M",
                        price: 100,
                        quantity: 1,
                        toppings: [],
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
