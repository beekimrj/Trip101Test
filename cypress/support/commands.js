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

 Cypress.Commands.add('countOccurence', (location, find) => {
    var count
    cy.get(`${location}`)
    .find(`${find}`)     //this will return all blockquotes of first article i.e. all tips list
    .then((leng) => {
        // console.log(leng)
        count = leng.length
        console.log(count)
        return count
    })
 })

 Cypress.Commands.add('uploadImg', (inputBtnPath, fixturePath, filename, mimeType) => {

    // example:-
    // let inputBtnPath = `div.reveal-modal.open >  .uploader > input[type=file]#file`
    // let fixturePath = 'Images/matka.jpg';
    // let mimeType = 'image/jpg';
    // let filename = 'matka.jpg';

    cy.get(inputBtnPath)
    .eq(0)
    .then(subject => {
        cy.fixture(fixturePath, 'base64').then(front => {
            Cypress.Blob.base64StringToBlob(front, mimeType).then(function (blob) {
                var testfile = new File([blob], filename, { type: mimeType });
                var dataTransfer = new DataTransfer();
                var fileInput = subject[0];

                dataTransfer.items.add(testfile);
                fileInput.files = dataTransfer.files;
                cy.wrap(subject).trigger('change', { force: true });
            });
        });
    })
 })