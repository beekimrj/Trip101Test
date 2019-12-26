describe('Article',() => {
    context('Snippet/CTA button', () => {
        before( () => {
            cy.visit(`/article/5-star-hotels-kathmandu`)

        })
        
        //NOTE:: If inserting paragraph doesn't work, there might be other div sections which might be hidden 
        const paragraph_with_snippet = 2;
        
    it('paragraph has partner snippet/CTA button, its title should also be hyperlinked with the snippet', () => {
        cy.get(`span.paragraphs-decription > section:nth-child(${paragraph_with_snippet}) > h2`)
        .should('have.descendants','a')
    cy.get(`span.paragraphs-decription > section:nth-child(${paragraph_with_snippet})`)
    .should('have.descendants','.snippet-cta')
   .should('exist')
    })


    it('the snippet contains the price, title should also contain the same price', () => {

        //getting location of price
        cy.get(`span.paragraphs-decription > section:nth-child(${paragraph_with_snippet})`)
        .find('.price')
        .then(($price) => {
            const balance = $price.text().trim(); // trim is to remove space before and after the price
            // alert(balance)

            cy.get(`span.paragraphs-decription > section:nth-child(${paragraph_with_snippet}) > h2 > a`).should('contain',`${balance}`)

        })
    });
    })
})