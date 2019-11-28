describe('Article', () => {
    before(() => {
        cy.visit('/article/what-to-buy-in-kathmandu')
        // cy.visit('/nepal')
    });

    context('It Checks NavBar', () => {

        // NOTE:: sometime this test is failed due to overlay saying to accept cookies. so refresh when it shows up.
        let location;
        it('checks if every Navbar option have dropdown menu starting with searched location', () => {
            // to get location name
            cy.get(`section.top-bar-section > ul.right > li:nth-child(1) > a > div`).as('navitem')
            cy.get('@navitem')
                .should('have.attr', 'title')
                .then((title) => {
                    location = title;
                    // alert(location)
                })
            // to check each navbar option's sub-item
            const numberOfNavItems = 4;
            let j;
            for (j = 1; j <= numberOfNavItems; j++) {
                //location of menu

                var baseLocation = `section.top-bar-section > ul.right > li:nth-child(${j})`
                // clicking option menu
                cy.get(`${baseLocation}`).click();
                //getting submenu of menu
                var place = `${baseLocation} > ul > li`
                cy.get(place)
                    .then(($lis) => { // here $lis will contain all "li" i.e. list of submenu
                        // alert($lis.length)
                        let i;
                        // expect($lis).to.have.length(9)
                        for (i = 2; i < $lis.length; i++) {
                            expect($lis.eq(i)).to.contain(`${location}`)

                        }
                    })
                    //going back to menu list by getting "Back" option. Below both method works, 
                    // in 1st one,we are providing exact location where "Back" lies, and in second, it search for "Back" option
                    // cy.get(`${place} > h5 > a`).click()
                    cy.get(`${place}`).contains('Back').click()
            }
        });
    })


});