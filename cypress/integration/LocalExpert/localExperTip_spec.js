describe('Article', () => {
    before(() => {
        cy.websiteUserLogin();
        cy.visit('https://staging.trip101.com/article/test-dhurba-1');
        cy.get('.cc-btn').click()
    });

    beforeEach(function () {
        Cypress.Cookies.preserveOnce('is_local_expert', 'website_user', '_trip101_session')
    })

    context('All about tips', () => {
        before(() => {
            //this will return all blockquotes of first article i.e. all tips list
            // below commented cypress code was used previous to count number of occurence before adding custom command count Occurence
            // cy.get(`${firstArticle}`)
            // .find('blockquote')
            cy.countOccurence(`${firstArticle}`, 'blockquote')
                .then((leng) => {
                    countTips = leng
                })
        });

        // NOTE:: this whole test works on the 1st article.
        // location of 1st article
        const firstArticle = "div[data-react-class=LocalExpertTips]:first > div"
        // waitTime is for setting waiting time and it is needed so that cypress can wait when we make/update tip to complete
        var countTips, waitTime = 1000;
        // NOTE:: image location is in cypress/fixtures/images
        let inputBtnPath = `div.reveal-modal.open >  .uploader > input[type=file]#file`
        let fixturePath = 'Images/matka.jpg';
        let mimeType = 'image/jpg';
        let filename = 'matka.jpg';

        // For editing tip image
        let editFixturePath = 'Images/matka2.jpg';
        let editFileName = 'matka2.jpg';

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
                .type("Tea is Love")
            cy.get('@submit')
                .should('not.have.attr', 'disabled')

            // imageUpload
            // custom command to add image, uploadImg and syntax is
            // cy.uploadImg(inputBtnPath, fixturePath, filename, mimeType)
            cy.uploadImg(inputBtnPath, fixturePath, filename, mimeType)
            cy.get('.flex-container > .image-container:nth-child(1) > div > input[name=caption]')
                // can also use cy.get('[name="caption"]') but above method is helpful when we have multiple image, just change value of nth-chlid
                .click()
                .type("Matka Tea")
            // // add second image
            // cy.uploadImg(inputBtnPath, 'Images/matka2.jpg', 'matka2.jpg', mimeType)
            // // // cy.get('.cc-btn')    // this is for clicking okay button in div stating to "Trip101 uses cookie....... and accept cookies"
            cy.get('@submit')
                .click()
            cy.wait(2 * waitTime)
            // update the number of articles
            cy.countOccurence(`${firstArticle}`, 'blockquote')
                .then((leng) => {
                    expect(leng).to.eql(countTips + 1)
                    countTips = leng
                })
        });

        // NOTE:: Edit and delete tip won't work if you have't added any tips
        context('Edit Tips', () => {
            it('Edit tips text', () => {
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
                    .type(" and is loved by almost everyone")
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

            it('Edit Image and Image caption', () => {
                cy.wait(waitTime)
                let captionBeforeEdit, captionAfterEdit;
                let imgSrcBeforeEdit, imgSrcAfterEdit;
                let image = `${firstArticle} > blockquote:nth-child(${countTips}) > div.text-center > img`
                cy.getLazySrc('src', image)
                    .then(sometext => {
                        // console.log(sometext)
                        imgSrcBeforeEdit = sometext;
                        console.log(imgSrcBeforeEdit)
                    });
                cy.get(`${firstArticle} > blockquote:nth-child(${countTips}) > .tip-ctrl > i.fa-edit`)
                    .click()
                cy.uploadImg(inputBtnPath, editFixturePath, editFileName, mimeType)
                cy.get('.flex-container > .image-container:nth-child(2) > div > input[name=caption]')
                    // can also use cy.get('[name="caption"]') but above method is helpful when we have multiple image, just change value of nth-chlid
                    .click()
                    .type("Matka Tea part 2")
                cy.get('.image-container > .button > .fa').first()
                    .click({ force: true })
                cy.wait(2 * waitTime)
                cy.get('div.reveal-modal.open > form > .modal-ctrl > .modal-buttons > button[type=submit]').as('submit')
                cy.get('@submit')
                    .click()
                cy.wait(waitTime)
                cy.getLazySrc('src', image)
                    .then(sometext => {
                        // console.log(sometext)
                        imgSrcAfterEdit = sometext;
                        expect(imgSrcAfterEdit).not.to.equal(imgSrcBeforeEdit)
                    });
            });
        })

        context('Delete Tip', () => {
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
            })
        });
    })
})