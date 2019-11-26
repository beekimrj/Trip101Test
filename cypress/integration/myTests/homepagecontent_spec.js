describe('After search is done', () => {
    before(() => {
        cy.visit('/')
    });

    const topics=["About Trip101","Featured Article", "Destinations Near Me", "Top Destination Guides","Top Accommodation Reviews","Featured Writer"];
    it('checks for Featured Article, Destination near me, Top Destination Guides and Top Accommodation Reviews ', () => {
        cy.wrap(topics).each((topic) => {
            cy.get('h3').contains(`${topic}`)
        })
    });
    
    it.only('searches for Good things are meant to be shared!', () => {
        cy.get('body > section.section-social > div > div').contains('Good things are meant to be shared!')
   
   
    });

});