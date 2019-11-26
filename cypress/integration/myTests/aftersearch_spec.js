describe('After search is done', () => {
    before(() => {
        cy.visit('/')
    });
    const place="New Delhi"
    it('Verifies if search is complete', () => {
        
        cy.get('#s2id_autogen1').type(`${place}`)
         cy.get(".select2-results").should('be.visible')
         cy.get('#s2id_autogen1').type('{enter}')
         cy.get('h1 span').contains(`${place}`)
        });

    it('verifies there is dropdown according to the search', () => {
            cy.get('div .menu-item').get('span').contains('Menu').click()
            cy.get('.menu-item').contains(`${place}`).click()
            cy.get('ul .dropdown').find('[data-clicktype=menu]').should('have.length',7)
  
        })

});