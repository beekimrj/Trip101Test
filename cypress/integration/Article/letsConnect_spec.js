describe('Article', () => {
    before(() => {
        cy.visit('/article/what-to-buy-in-kathmandu')

    })
    it('check for lets connect in article page', () => {
       cy.get('article.sidebar.widget.text-center > h4').contains("Let's connect")

       const socialmedia = [
        { SRC: "facebook", index: 1 },
        { SRC: "twitter", index: 2 },
        { SRC: "instagram", index: 3 },
        { SRC: "pinterest", index: 4 },
    ]

    cy.wrap(socialmedia).each((item) => {
        cy.get(`.social-follow > a:nth-child(${item.index})`)
            .should('have.attr', 'href').and('contains', `${item.SRC}`)

    })
    });

})


