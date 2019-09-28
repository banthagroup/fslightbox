import * as renderAndGetSvgObject from "../helpers/renderSvg";
import { renderFullscreenButton } from "./renderFullscreenButton";
import * as  renderAndGetToolbarButtonObject from "./renderAndGetToolbarButton";

const fsLightbox = {
    componentsServices: { enterFullscreen: null, exitFullscreen: null },
    core: { fullscreenToggler: { enterFullscreen: jest.fn(), exitFullscreen: jest.fn() } },
    data: {}
};

const fullscreenButton = { key: 'fullscreen-button' };
renderAndGetToolbarButtonObject.renderAndGetToolbarButton = () => fullscreenButton;
const svg = { setAttributeNS: jest.fn(), firstChild: { setAttributeNS: jest.fn() } };

test('it should have default svg when fullscreen is not open', () => {
    const assertSvgIsExit = () => {
        expect(svg.setAttributeNS).toBeCalledWith(null, 'width', '24px');
        expect(svg.setAttributeNS).toBeCalledWith(null, 'height', '24px');
        expect(svg.setAttributeNS).toBeCalledWith(null, 'viewBox', '0 0 950 1024');
        expect(svg.firstChild.setAttributeNS).toBeCalledWith(null, 'd', 'M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z');
    };

    const assertSvgIsEnter = () => {
        expect(svg.setAttributeNS).toBeCalledWith(null, 'width', '20px');
        expect(svg.setAttributeNS).toBeCalledWith(null, 'height', '20px');
        expect(svg.setAttributeNS).toBeCalledWith(null, 'viewBox', '0 0 18 18');
        expect(svg.firstChild.setAttributeNS).toBeCalledWith(null, 'd', 'M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z');
    };

    renderAndGetSvgObject.renderAndGetSvg = jest.fn(() => svg);
    window.document.fullscreenElement = null;
    renderFullscreenButton(fsLightbox, parent);
    expect(renderAndGetSvgObject.renderAndGetSvg).toBeCalledWith(fullscreenButton, '20px', '0 0 18 18', 'M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z');
    expect(fsLightbox.data.isFullscreenOpen).toBe(false);

    fsLightbox.componentsServices.enterFullscreen();
    expect(fsLightbox.data.isFullscreenOpen).toBe(true);
    assertSvgIsExit();

    svg.setAttributeNS = jest.fn();
    svg.firstChild.setAttributeNS = jest.fn();
    fullscreenButton.onclick();
    expect(fsLightbox.data.isFullscreenOpen).toBe(false);
    assertSvgIsEnter();
    expect(fsLightbox.core.fullscreenToggler.enterFullscreen).not.toBeCalled();
    expect(fsLightbox.core.fullscreenToggler.exitFullscreen).toBeCalled();

    svg.setAttributeNS = jest.fn();
    svg.firstChild.setAttributeNS = jest.fn();
    fullscreenButton.onclick();
    expect(fsLightbox.data.isFullscreenOpen).toBe(true);
    assertSvgIsExit();

    renderAndGetSvgObject.renderAndGetSvg = jest.fn(() => svg);
    window.document.fullscreenElement = {};
    renderFullscreenButton(fsLightbox, parent);
    expect(renderAndGetSvgObject.renderAndGetSvg).toBeCalledWith(fullscreenButton, '24px', '0 0 950 1024', 'M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z');
});
