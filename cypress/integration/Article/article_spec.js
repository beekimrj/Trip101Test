describe('Article', () => {
    before(() => {
        cy.visit('/article/what-to-buy-in-kathmandu')
        // cy.visit('/nepal')
    });
    context('Breadcrumbs', () => {
        it('checks for breadcrumbs is available in article', () => {
            cy.get('.breadcrumbs').should('be.visible')
        });
    })
    
})