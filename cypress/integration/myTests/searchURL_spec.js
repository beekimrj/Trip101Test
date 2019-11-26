describe('It checks search url', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    context('when invalid keyword is searched', function(){
    it.only('when invalid keyword is searched', () => {
       const place="kaaaaaathmandu"
        cy.get('#s2id_autogen1').type(`${place}`)
        cy.get(".select2-results").should('not.be.visible')
        cy.get('#s2id_autogen1').type('{enter}')
        cy.url().should('contain',`search?q=${place}`)
        cy.get('h1.page-header').contains('Sorry, no articles found.')
    });
    });

    context('when valid keyword is searched', function(){
    it('shows the suggestion box', () => {
        const places=["Kathmandu", "New Delhi"];
        cy.wrap(places).each((place)=>{
         cy.get('#s2id_autogen1').clear().type(`${place}`)
         cy.get(".select2-results").should('be.visible')
        //  .type(`{enter}`)
        cy.get("span.search-section").contains('Suggested Locations')
        cy.get("a.search-section").contains(`Things To Do in ${place}, `)
        cy.get("a.search-section").contains(`Vacation Rentals in ${place}`)
        cy.get("a.search-section").contains(`Hotels in ${place}`)
        });
     });

    });
})