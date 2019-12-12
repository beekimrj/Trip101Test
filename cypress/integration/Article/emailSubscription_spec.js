
describe('Article', () => {
    before(() => {
        cy.visit('/article/what-to-buy-in-kathmandu')
    });


    context('Email subscription', () => {

        function makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        let tempID = makeid(6);
        let fullID = `${tempID}@testing.com`

        it('Email Subscription should work', () => {

            // alert(fullID)
            cy.get('#subscriptionEmail').type(`${fullID}`);
            cy.get('.small-4 > input.button').click()
            cy.get('#formWrapper > div > h6').contains('Thank you for your subscription!')

        });

        it("Same Email can't be used for subscription", () => {
            cy.visit('/article/what-to-buy-in-kathmandu')
            cy.get('#subscriptionEmail').type(`${fullID}`);
            cy.get('.small-4 > input.button').click()
            cy.get('#flashNotification > h6').contains("You're already subscribed with us")
        });
    })
})