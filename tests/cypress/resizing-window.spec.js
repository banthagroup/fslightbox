import { getComponentChain } from "../__tests-services__/cypress/helpers";

specify('resize sources without error', () => {
    getComponentChain()
        .window()
        .trigger('resize')
        .get('img')
        .should(img => {
            // 540 - screen height is 600 so 0.9 (UX coefficient) * 600 gives 540
            expect(img[0].style.height).equal('540px');
            // 1345x2048 - image dimensions
            expect(parseFloat(img[0].style.width)).closeTo(540 * (1345 / 2048), 0.001);
        })
        .get(`.fslightbox-youtube-iframe`)
        .should('not.exist')
        .get('.fslightbox-slide-btn-container')
        .eq(1)
        .click()
        .viewport(1000, 800)
        .get('img')
        .should(img => {
            expect(img[0].style.height).equal('720px');
            expect(parseFloat(img[0].style.width)).closeTo(720 * (1345 / 2048), 0.001);
        })
        .get(`.fslightbox-youtube-iframe`)
        .should(youtube => {
            expect(youtube[0].style.width).equal('900px');
            expect(parseFloat(youtube[0].style.height)).closeTo(900 / (1920 / 1080), 0.001);
        });
});