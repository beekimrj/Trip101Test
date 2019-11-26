describe('After search is done', () => {
    before(() => {
        cy.visit('/')
    });

    const menus = ["Airbnb & Vacation Rentals", "Hotels", "Things to do"];
    it('checks whether the nav bar have "Airbnb & Vacation Rentals", "Hotels", "Things To Do"', () => {
       cy.wrap(menus).each((menu) => {
           cy.get('div .menu-item').contains(`${menu}`)
       })
        
    });



});