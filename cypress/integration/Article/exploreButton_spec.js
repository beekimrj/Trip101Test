describe('Article', () => {
    before(() => {
        cy.visit('/article/what-to-buy-in-kathmandu')
        // cy.visit('/nepal')
    });
    context('Explore Button', () => {
        it('Explore button should not appear at first', () => {
           cy.get("#fbbtn").should('not.be.visible')
        });

        it('Explore button should appear', () => {
            cy.scrollTo(0, 3000)
            .wait(500) 
            cy.get("#fbbtn").should('be.visible')
        });
    })
    
})