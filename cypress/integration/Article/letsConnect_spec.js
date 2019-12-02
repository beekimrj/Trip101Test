describe('Article', () => {
    before(() => {
        cy.visit('/article/what-to-buy-in-kathmandu')

    })
    it('check for lets connect in article page', () => {
       cy.get('article.sidebar.widget.text-center > h4').contains("Let's connect")
    });

})


