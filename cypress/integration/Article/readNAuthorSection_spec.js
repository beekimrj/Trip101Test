
 describe('READ AND AUTHOR SECTION', () => {
    before(() => {
        cy.visit('/article/what-to-buy-in-kathmandu')
       
    });

    context('Sections', () => {

        it('Read section should appear with at least one article', () => {
            cy.get('div.block.related_articles > div.title').contains('Also Read')
            cy.get('div.block.related_articles > div.content > ul')
            .find('li').and('have.length.be.gt',0)
        });

        it('Author Section', () => {
            cy.get('section.author.widget').should('be.visible')
            cy.get('section.author.widget > div.about > div.author-name > h5').should('be.visible')
        });
    })

})