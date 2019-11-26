describe('After search is done', () => {
    before(() => {
        cy.visit('/')
    });

    context('It Checks NavBar', () => {
        const menus = ["Airbnb & Vacation Rentals", "Hotels", "Things to do"];
        it('checks whether the nav bar have "Airbnb & Vacation Rentals", "Hotels", "Things To Do"', () => {
            cy.wrap(menus).each((menu) => {
                cy.get('div .menu-item').contains(`${menu}`)
            })
        });
    })

    context('It Checks for Topics',() => {
        const topics=["Featured Article", "Destinations Near Me", "Top Destination Guides","Top Accommodation Reviews"];
        it('checks for Featured Article, Destination near me, Top Destination Guides and Top Accommodation Reviews ', () => {
            cy.wrap(topics).each((topic) => {
                cy.get('h3').contains(`${topic}`)
            })
        });
    })

    context('It Checks for Bookmarks', () => {

    it('pop up should appear on click on bookmarks', () => {
        cy.get('#socialLogin').should('not.be.visible')
        cy.get('.bookmark-btn').first().click()
        cy.get('#socialLogin').should('be.visible')
        cy.wait(2000)
        cy.get('.close-reveal-modal').click()
    });

    })

});