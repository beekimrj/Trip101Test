describe('Article', () => {
    before(() => {
        cy.visit('/article/what-to-buy-in-kathmandu')
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

    context('Breadcrumbs', () => {
        it('checks for breadcrumbs is available in article', () => {
            cy.get('.breadcrumbs').should('be.visible')
        });
    })

    context('Explore Button', () => {
        it('Explore button should not appear at first', () => {
            cy.get("#fbbtn").should('not.be.visible')
        });

        it('Explore button should appear', () => {
            cy.scrollTo(0, 3000)
                .wait(500)
            cy.get("#fbbtn").should('be.visible')
        });
    })

    context('Lets Connect Occurance', () => {
        it('check for lets connect in article page', () => {
            cy.get('article.sidebar.widget.text-center > h4').contains("Let's connect")

            const socialmedia = [
                { SRC: "facebook", index: 1 },
                { SRC: "twitter", index: 2 },
                { SRC: "instagram", index: 3 },
                { SRC: "pinterest", index: 4 },
            ]

            cy.wrap(socialmedia).each((item) => {
                cy.get(`.social-follow > a:nth-child(${item.index})`)
                    .should('have.attr', 'href').and('contains', `${item.SRC}`)

            })
        });
    })

    context('RECOMMENDED ARTICLES, Nearby Cities and MORE ARTICLES FROM THIS AUTHOR', () => {
        it('checks for RECOMMENDED ARTICLES, Nearby Cities and MORE ARTICLES FROM THIS AUTHOR', () => {

            // here position is started from 3 because 1st and 2nd position have Let's connect and Travel Forum respectively
            const moreArticles = [
                { find: "Recommended Articles", position: "3" },
                { find: "Nearby cities", position: "4" },
                { find: "More Articles from this Author", position: "5" },
            ]

            cy.wrap(moreArticles).each((article) => {
                cy.get(`.large-12 > :nth-child(${article.position})`).as('location')
                cy.get('@location')
                    .find('h4')
                    .contains(`${article.find}`)

                cy.get('@location').find('ul.no-bullet > li').and('have.length.be.gt', 0)
            })

        });
    })


    context('Travel Forum', () => {
        it('Travel Forum should be visible', () => {
            cy.get('article.sidebar.widget.text-center > h4')
                .contains("Travel Forum")
                .get('article.sidebar.widget.text-center:nth-child(2) > a').should('have.attr', 'href', 'https://forum.trip101.com')


        })
    })

    context(' Also Read and Author Sections', () => {

        it('Read section should appear with at least one article', () => {
            cy.get('div.block.related_articles > div.title').contains('Also Read')
            cy.get('div.block.related_articles > div.content > ul')
                .find('li').and('have.length.be.gt', 0)
        });

        it('Author Section', () => {
            cy.get('section.author.widget').should('be.visible')
            cy.get('section.author.widget > div.about > div.author-name > h5').should('be.visible')
        });
    })

    context('Photo Credit', () => {
        // singleImageLocation contains location of lazy image to check
        it(' in Single Image ', () => {
            cy.get('div.credits')
                .first()                // if there is multiple single image, we will look in for 1st one
                .scrollIntoView({ duration: 500 })
                .contains("Source")
                .and('have.descendants', 'a') // to check if there is anchor tag or not
        });

    })


})