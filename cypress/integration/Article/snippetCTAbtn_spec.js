describe('Article',() => {
    context('Snippet/CTA button', () => {
        before( () => {
              cy.visit('/article/5-star-hotels-kathmandu')
        })
        
    it('paragraph has partner snippet/CTA button, its title should also be hyperlinked with the snippet', () => {

      
        cy.get('span.paragraphs-decription > section:nth-child(1) > h2')
        .should('have.descendants','a')
        cy.get('span.paragraphs-decription > section:nth-child(1) > div.one-hotel.landscape.row > .one-para > .hotelsnippet ')
       .should('exist')
    })


    it('the snippet contains the price, title should also contain the same price', () => {

        //getting location of price
        cy.get('span.paragraphs-decription > section:nth-child(1) > div.one-hotel.landscape.row > .one-para > .hotelsnippet  > div.snippet-cta.main_pic_cta.main_pic_cta_new.medium-8.large-5 > a:nth-child(2) > div > div.provider-price.small-4.columns > div > div.price ')
        .then(($price) => {
            const balance = $price.text();
            // alert(balance)

            cy.get('span.paragraphs-decription > section:nth-child(1) > h2 > a').should('contain',`${balance}`)

        })
    });
    })
})