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
            })     
        });
    })

})