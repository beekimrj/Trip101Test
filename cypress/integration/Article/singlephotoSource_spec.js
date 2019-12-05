describe('Article Photo', () => {
    before(() => {
        cy.visit('/article/best-kept-secret-places-around-kathmandu-valley')
        // cy.visit('/nepal')
    });
        it('Searches for photo source', () => {
           cy.get('span.paragraphs-decription > section:nth-child(1) > div.credits').scrollIntoView({duration: 500})
           .contains("Source")
        });
})
