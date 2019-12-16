// NOTE:: this whole test works on the 1st article.
// location of 1st article
const firstArticle = "div[data-react-class=LocalExpertTips]:first > div"
var countTips, waitTime = 1000;


describe('Article', () => {
    before(() => {
        //     cy.visit('/article/what-to-buy-in-kathmandu')
        cy.websiteUserLogin();
        cy.visit('https://staging.trip101.com/article/test-dhurba-1');
        //this will return all blockquotes of first article i.e. all tips list
        // below commented cypress code was used previous to count number of occurence before adding custom command count Occurence
        // cy.get(`${firstArticle}`)
        // .find('blockquote')
        cy.countOccurence(`${firstArticle}`, 'blockquote')
            .then((leng) => {
                countTips = leng
            })
    });

    beforeEach(function () {
        Cypress.Cookies.preserveOnce('is_local_expert', 'website_user', '_trip101_session')
    })

    context('All about tips', () => {
        it('Add tip', () => {
            // cy.get('#add-tip').first()  //can be replaced for below one
            cy.get(`${firstArticle} > .le-tips > div > button`)
                .scrollIntoView()
                .click()

            cy.get('div.reveal-modal.open > form > .modal-ctrl > .modal-buttons > button[type=submit]').as('submit')
            cy.get('@submit')
                .should('be.disabled')
            //    .should('have.attr','disabled')   //this can also be used for above line

            cy.get('div.reveal-modal.open > .medium-editor-element').as('textbox')
                .type("testing2")
            cy.get('@submit')
                .should('not.have.attr', 'disabled')
            // cy.get('.cc-btn')    // this is for clicking okay button in div stating to "Trip101 uses cookie....... and accept cookies"
            cy.get('@submit')
                .click()
            cy.wait(waitTime)
            // update the number of articles
            cy.countOccurence(`${firstArticle}`, 'blockquote')
                .then((leng) => {
                    expect(leng).to.eql(countTips + 1)
                    countTips = leng
                })

        });

        // NOTE:: Edit and delete tip won't work if you have't added any tips
        it('Edit Tips', () => {
            cy.wait(waitTime)
            let textBeforeEdit, textAfterEdit;
            cy.get(`${firstArticle} > blockquote:nth-child(${countTips}) > div.comment-quote > p`).as('comment')
            cy.get('@comment')
            .invoke('text')
            .then(sometext => {
                // console.log(sometext)
                textBeforeEdit = sometext;
            });
            cy.get(`${firstArticle} > blockquote:nth-child(${countTips}) > .tip-ctrl > i.fa-edit`)
                .click()
            cy.get('div.reveal-modal.open > .medium-editor-element').as('textbox')
            cy.get('@textbox')
                .click()
                .type(" is now edited")
                cy.get('div.reveal-modal.open > form > .modal-ctrl > .modal-buttons > button[type=submit]').as('submit')
                cy.get('@submit')
                .click()
                cy.wait(waitTime)
            cy.get('@comment')
                .invoke('text')
                .then(sometext => {
                    // console.log(sometext)
                    textAfterEdit = sometext;
                    expect(textAfterEdit).not.to.equal(textBeforeEdit)
                });
            
                
        });

        it('Delete Tip', () => {
            // cy.get(`${firstArticle} > blockquote:last > .tip-ctrl > i.fa-trash`)         //this can also be used, but not using it so that i could check if item is deleted or not by counting blockquotes
            cy.get(`${firstArticle} > blockquote:nth-child(${countTips}) > .tip-ctrl > i.fa-trash`)
                .click()
                .wait(waitTime)
            // update number of countTips
            cy.countOccurence(`${firstArticle}`, 'blockquote')
                .then((leng) => {
                    // console.log(leng)
                    expect(leng).to.eql(countTips - 1)
                    countTips = leng
                })

        });


    })

})