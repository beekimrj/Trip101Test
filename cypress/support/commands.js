Cypress.Commands.add('getLazySrc', (checkattr,location) => {
    cy.get(location).should('have.attr',checkattr)
    .then((datasrc) =>{
        return datasrc;
    })         
    
})


 Cypress.Commands.add('websiteUserLogin', () => {
     var cookie;
     cy.getCookie('_trip101_session')
     .then( (cookie) => {
         if(!cookie)
         {
             cy.visit('https://staging.trip101.com/website_users/sign_in')
             cy.get('#website_user_email')
             .type(Cypress.env('username'))
             cy.get('#website_user_password')
             .type(Cypress.env('password'))
             cy.get('.actions > input')
             .click()
         }
     })
 })