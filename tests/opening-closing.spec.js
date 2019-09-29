import { renderAndGetLightbox } from "./__tests-services__/renderAndGetLightbox";

const assertion = () => {
    renderAndGetLightbox();

    require('../src');

    // const fsLightboxCloseButton = document.getElementsByClassName('fslightbox-toolbar-button')[1];
    // fsLightboxCloseButton.dispatchEvent(new Event('click'));
};

test('opening-closing', () => {
    expect(assertion).not.toThrowError();
});
