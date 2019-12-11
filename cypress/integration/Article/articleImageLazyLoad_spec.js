describe('Lazy Load in Article', () => {
    before(() => {
        cy.visit('/article/what-to-buy-in-kathmandu')

    });


    context.skip('Instagram', () => {
        it('checks is instagram does lazy load or not', () => {
            cy.get('span.paragraphs-decription > section:nth-child(2) ').as('insta')
            .should('have.descendants', 'blockquote')
            cy.get('@insta').scrollIntoView({duration: 2000})
            cy.wait(3000)
            cy.get('@insta').should('have.descendants', 'iframe')
        });
    })


    context('Single Image', () => {
        // singleImageLocation contains location of lazy image to check
        const singleImageLocation = ':nth-child(2) > img.lazy-blur';
        let firstsrc, lastsrc;
        it('lazyload Image is not loaded first', () => {
            cy.getLazySrc('data-src', singleImageLocation).then((abc) => {
                firstsrc = abc;
            });
            cy.getLazySrc('src', singleImageLocation).then((cba) => {
                lastsrc = cba;
            });
            cy.get(singleImageLocation).then(() => {
                (expect(firstsrc).to.not.equal(lastsrc))
            })
        });

        it('lazyimage is loaded', () => {
            cy.get(singleImageLocation).scrollIntoView();
            cy.wait(1000)
            cy.getLazySrc('data-src', singleImageLocation).then((abc) => {
                firstsrc = abc;
            });
            cy.getLazySrc('src', singleImageLocation).then((cba) => {
                lastsrc = cba;
            });
            cy.get(singleImageLocation).then(() => {
                (expect(firstsrc).to.eql(lastsrc))
            })
        });
    })


    context('Multiple Image Gallery', () => {
        it('checks for multiple image lazy load', () => {
            cy.visit('/article/things-to-do-in-kathmandu')
            cy.get('.final-tiles-gallery.caption-bottom.caption-bg ')
                .eq(2)
                .find('div.ftg-items > div').as('gallery').should('not.have.class', 'ftg-loaded')
            cy.get('@gallery').eq(2)
                .scrollIntoView({ duration: 200 }, { bottom: 300 })
            cy.get('@gallery').should('have.class', 'ftg-loaded')
        });

    })

})