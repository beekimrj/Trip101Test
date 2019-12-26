describe('Article', () => {
    before(() => {
        cy.websiteUserLogin('trip101');
        // cy.visit('/');
//         cy.get('.cc-btn').click()
    });

    beforeEach(function () {
        Cypress.Cookies.preserveOnce('is_local_expert', 'website_user', '_trip101_session')
    })

    context('Website User clicks bookmarks', () => {

        it('Bookmarks and undo it', () => {
            // cy.get('#socialLogin').should('not.be.visible')
            cy.get('.home-section > .custom-page') //we can remove it and repace below find with cy.get, but it will click bookmark which it finds first so we might not know where it is
            .find('.bookmark-btn > .fa-bookmark-o')
            .first()
            // .click()
            .then(($bookmark) => {
                expect($bookmark).to.have.class('fa-bookmark-o')
                cy.get($bookmark).click().wait(500)
                .then(() => {
                expect($bookmark).not.to.have.class('fa-bookmark-o')
            })
            cy.get($bookmark).click().wait(500)
            .then(() => {
            expect($bookmark).to.have.class('fa-bookmark-o')
        })
        })


        })
    })
})