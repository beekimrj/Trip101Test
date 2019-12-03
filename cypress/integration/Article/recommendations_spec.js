describe('Article', () => {
    before(() => {
        cy.visit('/article/what-to-buy-in-kathmandu')

    })


    it('checks for RECOMMENDED ARTICLES, Nearby Cities and MORE ARTICLES FROM THIS AUTHOR', () => {

        // here position is started from 3 because 1st and 2nd position have Let's connect and Travel Forum respectively
        const moreArticles = [
            { find: "Recommended Articles", position: "3" },
            { find: "Nearby cities", position: "4" },
            { find: "More Articles from this Author", position: "5" },
        ]

        cy.wrap(moreArticles).each((article) => {
            cy.get(`.large-12 > :nth-child(${article.position})`).as('location')
            cy.get('@location')
                .find('h4')
                .contains(`${article.find}`)

            cy.get('@location').find('ul.no-bullet > li').and('have.length.be.gt', 0)
        })

    });
})