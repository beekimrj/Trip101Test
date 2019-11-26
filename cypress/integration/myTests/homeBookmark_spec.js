describe('After search is done', () => {
    before(() => {
        cy.visit('/')
    });

    it('pop up should appear on click on bookmarks', () => {
        cy.get('#socialLogin').should('not.be.visible')
        cy.get('.bookmark-btn').first().click()
        cy.get('#socialLogin').should('be.visible')
        cy.wait(2000)
        cy.get('.close-reveal-modal').click()
    });

});