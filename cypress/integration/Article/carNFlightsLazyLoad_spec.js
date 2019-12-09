describe('Article', () => {
    before(() => {
       
        cy.visit('/article/what-to-buy-in-kathmandu')
    });
    it('Car Rental LazyLoad', () => {
        cy.get('div.combined-sbox > ul > li:nth-child(3) ')
        .click()
        cy.get('#rc-connect-container').should('not.have.descendants','iframe')
        cy.wait(1000)
        cy.get('#rc-connect-container').should('have.descendants','iframe')
    });


    it('Flight LazyLoad', () => {
        cy.get('div.combined-sbox > ul > li:nth-child(4) ')
        .click()
        cy.get('.SearchWidget__searchWidgetFieldsWrap___6HsSR ')
        .should('not.exist')
        cy.wait(1000)
        cy.get('.SearchWidget__searchWidgetFieldsWrap___6HsSR ')
        .should('exist')
    });
})




