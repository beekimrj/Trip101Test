describe('Homepage', () => {
    before(() => {
        cy.visit('/')
    });

    context('It Checks NavBar', () => {
        const menus = ["Airbnb & Vacation Rentals", "Hotels", "Things to do"];
        it('checks whether the nav bar have "Airbnb & Vacation Rentals", "Hotels", "Things To Do"', () => {
            cy.wrap(menus).each((menu) => {
                cy.get('div .menu-item').contains(`${menu}`)
            })
        });
    })

    context('It Checks for Topics', () => {
        const topics = ["About Trip101", "Featured Article", "Destinations Near Me", "Top Destination Guides", "Top Accommodation Reviews", "Featured Writer"];
        it('checks for Featured Article, Destination near me, Top Destination Guides and Top Accommodation Reviews ', () => {
            cy.wrap(topics).each((topic) => {
                cy.get('h3').contains(`${topic}`)
            })
        });
    })

    context('It Checks for Bookmarks', () => {

        it('pop up should appear on click on bookmarks', () => {
            cy.get('#socialLogin').should('not.be.visible')
            cy.get('.bookmark-btn').first().click()
            cy.get('#socialLogin').should('be.visible')
            cy.wait(1000)
            cy.get('.close-reveal-modal').click()
            cy.wait(1000)
        });

    })


    context("Feature article", () => {

        it("It's first article contains tags", () => {
            cy.get('body > section.main-section > div > section > div.row.collapse > section > section:nth-child(2) > div.custom-page.columns > ul > li:nth-child(1) > article > div.info > ul')
                .should('have.class', 'categories')
                .find('li').and('have.length.be.gt', 0)
        });

    });

    context('FootBar content', () => {
        const getintouch = ["About us", "Our team", "Our partners", "Partner with us", "Contact Us", "Careers", "Advertise With Us", "Terms of Use", "Privacy Policy", "Use of Cookies",
            "Travel News"]

        it('5 social media or not in Follow Us', () => {
            cy.get('.social-follow > a').should('have.length', 5)
        });

        it('GET IN TOUCH column', () => {
            cy.wrap(getintouch).each((item) => {
                cy.get('footer > div:nth-child(1) > div:nth-child(3) > ul').contains(item)

            })
        })

        it('THINGS TO DO contains Nightlife at first', () => {
            cy.get('footer > div:nth-child(1) > div:nth-child(2) > ul').first().contains('Nightlife')

        });

        it('WHERE TO STAY contains Hostels & Guest Houses', () => {
            cy.get('footer > div:nth-child(1) > div:nth-child(1) > ul').contains('Hostels & Guest Houses')

        });

    });


    context('Bottom Bar', () => {
        const bottombar = [
            { SRC: "https://trip101.com/", index: 1 },
            { SRC: "https://www.vrg.jp/", index: 2 },
            { SRC: "https://www.travel.co.jp/", index: 3 },
        ]
        it('checks for trip101, venture republic and line', () => {
            cy.wrap(bottombar).each((item) => {
                cy.get(`body > footer > div:nth-child(2) > div.copyright.small-8.columns > p > a:nth-child(${item.index})`)
                    .should('have.attr', 'href', `${item.SRC}`)

            })

        });
    })
});