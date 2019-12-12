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










// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
