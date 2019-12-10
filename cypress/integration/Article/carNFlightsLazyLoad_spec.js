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
        cy.get('div.LocationAutosuggest__container___31KAF > input')
        // .eq(1)       //this method also works but we need to repeat same code and place 2 in eq()
        // .should('not.have.value', '')
        .then( ($box) => {
                //From and To field should be autocomplete
            expect($box.eq(0)).not.to.have.value('')        // for From
            expect($box.eq(1)).not.to.have.value('')        // for To
        })
    });
})




