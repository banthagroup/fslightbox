import { renderCloseButton } from "./renderCloseButton";
import * as renderAndGetToolbarButtonObject from "./renderAndGetToolbarButton";

const fsLightbox = {
    core: { lightboxCloser: { close: jest.fn() } }
};

const closeButton = document.createElement('div');
renderAndGetToolbarButtonObject.renderAndGetToolbarButton = () => closeButton;

test('renderCloseButton', () => {
    renderCloseButton(fsLightbox, parent);
    closeButton.dispatchEvent(new Event('click'));
    expect(fsLightbox.core.lightboxCloser.close).toBeCalled();
});
