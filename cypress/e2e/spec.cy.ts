describe('Check the Home', () => {
  it('Listado de Favoritos', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Favoritos').click()
    cy.url().should('include', '/favorites')
  })

  it('Click en un Pokemon', () => {
    cy.visit('http://localhost:3000/')
    cy.get('div[role=button]').first().click()
    cy.url().should('include', '/pokemon/bulbasaur')
  })

  it('Add and remove from favorites', () => {
    // Add to favorites
    cy.visit('http://localhost:3000/')
    cy.get('div[role=button]').first().click()
    cy.get('.nextui-button-text').click()
    cy.contains('Favoritos').click()
    cy.get('div[role=button]').first().click().should(() => {
      expect(localStorage.getItem('favorites')).to.eq('[1]')
    })

    // Remove to favorites
    cy.visit('http://localhost:3000/pokemon/bulbasaur')
    cy.get('.nextui-button-text').click().should(() => {
      expect(localStorage.getItem('favorites')).to.eq('[]')
    })
  })
})