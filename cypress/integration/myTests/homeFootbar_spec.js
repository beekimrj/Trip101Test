describe('After search is done', () => {
    before(() => {
        cy.visit('/')
    });

   
    context('FootBar content', () => {
        const getintouch = [ "About us", "Our team", "Our partners", "Partner with us", "Contact Us", "Careers", "Advertise With Us", "Terms of Use", "Privacy Policy", "Use of Cookies",
        "Travel News"]

        it('5 social media or not in Follow Us', () => {
            cy.get('.social-follow > a').should('have.length',5)
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