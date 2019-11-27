describe('After search is done', () => {
    before(() => {
        cy.visit('/')
    });

   
    context('FootBar content', () => {
        const getintouch = [ "About us", "Our team", "Our partners", "Partner with us", "Contact Us", "Careers", "Advertise With Us", "Terms of Use", "Privacy Policy", "Use of Cookies",
        "Travel News"]

        it.only('5 social media or not in Follow Us', () => {
            // cy.get('.social-follow > a').should('have.length',5)

            const socialmedia = [
                { SRC: "facebook", index: 1 },
                { SRC: "twitter", index: 2 },
                { SRC: "instagram", index: 3 },
                { SRC: "pinterest", index: 4 },
                { SRC: "tripadvisor", index: 5 },
            ]
           
                cy.wrap(socialmedia).each((item) => {
                    cy.get(`.social-follow > a:nth-child(${item.index})`)
                        .should('have.attr', 'href').and('contains',`${item.SRC}`)
    
                })
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

       


    })


});