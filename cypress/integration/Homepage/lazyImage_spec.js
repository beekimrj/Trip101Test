describe('Homepage', () => {
    before(() => {
        cy.visit('/')
    });

    context('lazyload Image', () => {
        // lazyimg contains location of lazy image to check
        const lazyimg = 'body > section.main-section > div > section > div.row.collapse > section > section:nth-child(5) > div.custom-page.columns > ul > li:nth-child(12) > article > a > img';
        let firstsrc, lastsrc;
        it('lazyload Image is not loaded first', () => {
            cy.getLazySrc('data-src',lazyimg).then((abc) => {
                firstsrc = abc;
            });
            cy.getLazySrc('src',lazyimg).then((cba) => {
                lastsrc = cba;
            });
            cy.get(lazyimg).then(() => {
                (expect(firstsrc).to.not.equal(lastsrc))
            })
        });

        it('lazyimage is loaded', () => {
            cy.get(lazyimg).scrollIntoView();
            cy.wait(1000)
            cy.getLazySrc('data-src',lazyimg).then((abc) => {
                firstsrc = abc;
            });
            cy.getLazySrc('src',lazyimg).then((cba) => {
                lastsrc = cba;
            });
            cy.get(lazyimg).then(() => {
                (expect(firstsrc).to.eql(lastsrc))
            })
        });
    })

})