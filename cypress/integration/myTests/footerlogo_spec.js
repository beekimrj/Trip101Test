describe('Homepage', () => {
    before(() => {
        cy.visit('/')
    });

    context('Bottom Bar',() => {
        const bottombar=[
            { SRC:"https://trip101.com/", index: 1},
            { SRC: "https://www.vrg.jp/",  index: 2},
            { SRC:"https://www.travel.co.jp/", index: 3},
        ]
        it('checks for trip101, venture republic and line', () => {
            cy.wrap(bottombar).each((item) => {
               cy.get(`body > footer > div:nth-child(2) > div.copyright.small-8.columns > p > a:nth-child(${item.index})`)
               .should('have.attr','href',`${item.SRC}`)

            })

        });
    })
})
