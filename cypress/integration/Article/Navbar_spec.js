describe('Nav Bar', () => {
    before(() => {
        cy.visit('/article/what-to-buy-in-kathmandu')
        // cy.visit('/nepal')
    });

    context('It Checks NavBar', () => {
        let location;
        it('Navbar should have dropdown menu starting with searched location', () => {

            // to get location name, it searches title of 1st menu option
            cy.get(`body > header > div > div > nav > section > ul > li:nth-child(1) > a > div`).as('navitem')
            cy.get('@navitem')
                .should('have.attr', 'title')
                .then((title) => {
                    location = title;
                    // alert(location)
                })
            // to check each navbar option's sub-item
            const numberOfOptions = 4;
            let j;
            for (j = 1; j <= numberOfOptions; j++) {
                //location of menu
                var baseLocation = `body > header > div > div > nav > section > ul > li:nth-child(${j})`
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