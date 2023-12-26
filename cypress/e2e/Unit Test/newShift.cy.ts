// date,
//             employees: {
//                 employeeID: "60a1c9f4a2c3a30015a9c9b3",
//                 employeeName: "Employee Test",
//                 from: "2021-05-16T17:00:00.000Z",
//                 to: "2021-05-16T17:00:00.000Z",
//                 workHours: 8,
//             },
//             }

describe('Normal', () => {
    it('Shift Created', () => {
        cy.request({
            method: 'POST',
            url: '/api/shifts',
            failOnStatusCode: false,
            body: {
                date: "2021-05-16T17:00:00.000Z",
                employees: [
                    {
                        employeeID: "60a1c9f4a2c3a30015a9c9b3",
                        employeeName: "Employee Test",
                        from: "2021-05-16T17:00:00.000Z",
                        to: "2021-05-16T17:00:00.000Z",
                        workHours: 8,
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
            url: '/api/shifts',
            failOnStatusCode: false,
            body: {
                employees: [
                    {
                        employeeID: "60a1c9f4a2c3a30015a9c9b3",
                        employeeName: "Employee Test",
                        from: "2021-05-16T17:00:00.000Z",
                        to: "2021-05-16T17:00:00.000Z",
                        workHours: 8,
                    }
                ]
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(400)
        })  
    })

    it('Missing employeeID', () => {
        cy.request({
            method: 'POST',
            url: '/api/shifts',
            failOnStatusCode: false,
            body: {
                date: "2021-05-16T17:00:00.000Z",
                employees: [
                    {
                        employeeName: "Employee Test",
                        from: "2021-05-16T17:00:00.000Z",
                        to: "2021-05-16T17:00:00.000Z",
                        workHours: 8,
                    }
                ]
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(500)
        })
    })

    it('Missing employeeName', () => {
        cy.request({
            method: 'POST',
            url: '/api/shifts',
            failOnStatusCode: false,
            body: {
                date: "2021-05-16T17:00:00.000Z",
                employees: [
                    {
                        employeeID: "60a1c9f4a2c3a30015a9c9b3",
                        from: "2021-05-16T17:00:00.000Z",
                        to: "2021-05-16T17:00:00.000Z",
                        workHours: 8,
                    }
                ]
            }
        }).as('response')
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(500)
        })
    })
})