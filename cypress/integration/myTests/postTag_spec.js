
describe('After search is done', () => {
    before(() => {
        cy.visit('/')
    });
context("Feature article", () => {

    it("It's first article contains tags or not", () => {
           cy.get('body > section.main-section > div > section > div.row.collapse > section > section:nth-child(2) > div.custom-page.columns > ul > li:nth-child(1) > article > div.info > ul')
           .should('have.class','categories')
           .find('li').and('have.length.be.gt',0)
 
    });
  


})

})