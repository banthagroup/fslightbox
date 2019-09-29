import { KeyboardController } from "./KeyboardController";

const fsLightbox = {
    componentsServices: { enterFullscreen: jest.fn() },
    core: {
        lightboxCloser: { closeLightbox: jest.fn() },
        fullscreenToggler: { enterFullscreen: jest.fn() },
        slideChangeFacade: { changeToPrevious: jest.fn(), changeToNext: jest.fn() },
    }
};
const slideChangeFacade = fsLightbox.core.slideChangeFacade;
const keyboardController = new KeyboardController(fsLightbox);

fsLightbox.core.lightboxCloser.closeLightbox = jest.fn();
slideChangeFacade.changeToNext = jest.fn();
slideChangeFacade.changeToPrevious = jest.fn();

let e;
const getEventForKeyCode = (keyCode) => {
    e = { preventDefault: jest.fn(), keyCode: keyCode };
    return e;
};

test('listener', () => {
    keyboardController.listener(getEventForKeyCode(27));
    expect(fsLightbox.core.lightboxCloser.closeLightbox).toBeCalled();
    expect(slideChangeFacade.changeToPrevious).not.toBeCalled();
    expect(slideChangeFacade.changeToNext).not.toBeCalled();
    expect(e.preventDefault).not.toBeCalled();
    expect(fsLightbox.componentsServices.enterFullscreen).not.toBeCalled();
    expect(fsLightbox.core.fullscreenToggler.enterFullscreen).not.toBeCalled();

    keyboardController.listener(getEventForKeyCode(37));
    expect(fsLightbox.core.lightboxCloser.closeLightbox).toBeCalledTimes(1);
    expect(slideChangeFacade.changeToPrevious).toBeCalled();
    expect(slideChangeFacade.changeToNext).not.toBeCalled();
    expect(e.preventDefault).not.toBeCalled();
    expect(fsLightbox.componentsServices.enterFullscreen).not.toBeCalled();
    expect(fsLightbox.core.fullscreenToggler.enterFullscreen).not.toBeCalled();

    keyboardController.listener(getEventForKeyCode(39));
    expect(fsLightbox.core.lightboxCloser.closeLightbox).toBeCalledTimes(1);
    expect(slideChangeFacade.changeToPrevious).toBeCalledTimes(1);
    expect(slideChangeFacade.changeToNext).toBeCalled();
    expect(e.preventDefault).not.toBeCalled();
    expect(fsLightbox.componentsServices.enterFullscreen).not.toBeCalled();
    expect(fsLightbox.core.fullscreenToggler.enterFullscreen).not.toBeCalled();

    keyboardController.listener(getEventForKeyCode(122));
    expect(fsLightbox.core.lightboxCloser.closeLightbox).toBeCalledTimes(1);
    expect(slideChangeFacade.changeToPrevious).toBeCalledTimes(1);
    expect(slideChangeFacade.changeToNext).toBeCalled();
    expect(e.preventDefault).toBeCalled();
    expect(fsLightbox.componentsServices.enterFullscreen).toBeCalled();
    expect(fsLightbox.core.fullscreenToggler.enterFullscreen).toBeCalled();
});
