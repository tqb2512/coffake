describe('New user', () => {
  it('Missing name', () => {
    cy.request({
      method: 'POST',
      url: '/api/users',
      failOnStatusCode: false,
      body: {
        email: "21521867@gm.uit.edu.vn",
        position: "Manager",
        salary: 100,
        username: "tqbao",
        password: "test12345!",
        phone: "012345678",
        imageUrl: ""
      }
    }).as('response')
    cy.get('@response').then((response) => {
      expect(response.body.message).to.eq('Missing fields')
    })
  })

  it('Missing email', () => {
    cy.request({
      method: 'POST',
      url: '/api/users',
      failOnStatusCode: false,
      body: {
        name: "Trinh Quoc Bao",
        position: "Manager",
        salary: 100,
        username: "tqbao",
        password: "test12345!",
        phone: "012345678",
        imageUrl: ""
      }
    }).as('response')
    cy.get('@response').then((response) => {
      expect(response.body.message).to.eq('Missing fields')
    })
  })

  it('Missing salary', () => {
    cy.request({
      method: 'POST',
      url: '/api/users',
      failOnStatusCode: false,
      body: {
        name: "Trinh Quoc Bao",
        email: "21521867@gm.uit.edu.vn",
        salary: 100,
        username: "tqbao",
        password: "test12345!",
        phone: "012345678",
        imageUrl: ""
      }
    }).as('response')
    cy.get('@response').then((response) => {
      expect(response.body.message).to.eq('Missing fields')
    })
  })

  it('Missing username', () => {
    cy.request({
      method: 'POST',
      url: '/api/users',
      failOnStatusCode: false,
      body: {
        name: "Trinh Quoc Bao",
        email: "21521867@gm.uit.edu.vn",
        salary: 100,
        username: "tqbao",
        password: "test12345!",
        phone: "012345678",
        imageUrl: ""
      }
    }).as('response')
    cy.get('@response').then((response) => {
      expect(response.body.message).to.eq('Missing fields')
    })
  })

  it('Missing password', () => {
    cy.request({
      method: 'POST',
      url: '/api/users',
      failOnStatusCode: false,
      body: {
        name: "Trinh Quoc Bao",
        email: "21521867@gm.uit.edu.vn",
        salary: 100,
        username: "tqbao",
        password: "test12345!",
        phone: "012345678",
        imageUrl: ""
      }
    }).as('response')
    cy.get('@response').then((response) => {
      expect(response.body.message).to.eq('Missing fields')
    })
  })

  it('Missing phone number', () => {
    cy.request({
      method: 'POST',
      url: '/api/users',
      failOnStatusCode: false,
      body: {
        name: "Trinh Quoc Bao",
        email: "21521867@gm.uit.edu.vn",
        salary: 100,
        username: "tqbao",
        password: "test12345!",
        phone: "012345678",
        imageUrl: ""
      }
    }).as('response')
    cy.get('@response').then((response) => {
      expect(response.body.message).to.eq('Missing fields')
    })
  })
  
  it('Employee Created', () => {
    cy.request({
      method: 'POST',
      url: '/api/users',
      failOnStatusCode: false,
      body: {
        name: "Trinh Quoc Bao",
        email: "21521867@gm.uit.edu.vn",
        position: "Manager",
        salary: 100,
        username: "tqbao",
        password: "test12345!",
        phone: "012345678",
        imageUrl: ""
      }
    }).as('response')
    cy.get('@response').then((response) => {
      expect(response.body.message).to.eq('Employee created')
    })
  })
})
