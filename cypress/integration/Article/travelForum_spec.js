describe('Article', () => {
    before(() => {
        cy.visit('/article/what-to-buy-in-kathmandu')

    })
    it('check for lets connect in article page', () => {
       cy.get('article.sidebar.widget.text-center > h4')
       .contains("Travel Forum")
       .get('article.sidebar.widget.text-center:nth-child(2) > a').should('have.attr','href','https://forum.trip101.com')


    })
})