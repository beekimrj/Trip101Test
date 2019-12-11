describe('Article', () => {
 
    context('Search Box',() => {
        // when we visit particular article, search box should appear  according to article
        // so below is the JSON articles which contain site to visit and  tab to be active when we visit there
        const articles = [
            {site: "/article/top-airbnbs-in-kathmandu-nepal", boxToBeSelected: "Vacation Rentals"},
            {site: "/article/what-to-buy-in-kathmandu", boxToBeSelected: "Hotels"},
        ];
        it('box selected to respective site', () => {
            cy.wrap(articles).each((article) => {
                cy.visit(`${article.site}`)
                cy.get('div.combined-sbox > ul')
                .children('.active')
                .contains(`${article.boxToBeSelected}`)

                //Destination text box should not be empty
                cy.get('#destination').should('not.have.value', '')
        
            })     
        });
    })


    context('Car Rentals and Flight lazyload' , () => {
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

})