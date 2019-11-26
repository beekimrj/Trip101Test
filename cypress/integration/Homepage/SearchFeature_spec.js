describe('Homepage Search Feature', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    context('when invalid keyword is searched', function () {
        it('when invalid keyword is searched', () => {
            const place = "kaaaaaathmandu"
            cy.get('#s2id_autogen1').type(`${place}`)
            cy.get(".select2-results").should('not.be.visible')
            cy.get('#s2id_autogen1').type('{enter}')
            cy.url().should('contain', `search?q=${place}`)
            cy.get('h1.page-header').contains('Sorry, no articles found.')
        });
    });

    const options = [
        { opt: "Things To Do in", inUrl: "things-to-do" },
        { opt: "Vacation Rentals in", inUrl: "airbnb-vacation-rentals" },
        { opt: "Hotels in", inUrl: "hotels" },

    ]

    context('when valid keyword is searched', function () {
        it('shows the suggestion box', () => {
            const place = "Kathmandu";
            cy.get('#s2id_autogen1').clear().type(`${place}`)
            cy.wrap(options).each((option) => {
                cy.get(".select2-results").should('be.visible')
                cy.get("span.search-section").contains('Suggested Locations')
                cy.get("a.search-section").contains(`${option.opt} ${place}, `)
                    // .click()
                    .should('have.attr', 'href').and('contains', `${option.inUrl}`)
            });


        });
    });
})