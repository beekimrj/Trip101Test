describe('It checks search url', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('#s2id_autogen1').clear().type(`${place}`)
        cy.get(".select2-results").should('be.visible')
    })

    const place="Kathmandu";
    const options = [
        {opt: "Things To Do in", inUrl: "things-to-do"},
        {opt: "Vacation Rentals in", inUrl: "airbnb-vacation-rentals"},
        {opt: "Hotels in", inUrl: "hotels"},
        
    ]
    it.only('checks for whether the options have respective href url', () => {
       cy.get("span.search-section").contains('Suggested Locations')
       cy.wrap(options).each((option) => {
        cy.get("a.search-section").contains(`${option.opt} ${place}, `)
            // .click()
            .should('have.attr','href').and('contains',`${option.inUrl}`)
            // cy.url().should('contain',`${option.inUrl}`)
       }) 
    });


});