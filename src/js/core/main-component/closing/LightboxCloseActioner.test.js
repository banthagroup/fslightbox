import { LightboxCloseActioner } from "./LightboxCloseActioner";
import { FADE_OUT_STRONG_CLASS_NAME, OPEN_CLASS_NAME } from "../../../constants/classes-names";
import { ANIMATION_TIME } from "../../../constants/css-constants";

const fsLightbox = {
    componentsStates: { toolbarButtons: { fullscreen: { get: () => false } } },
    core: {
        eventsDispatcher: { dispatch: jest.fn() },
        fullscreenToggler: { enterFullscreen: jest.fn() },
        globalEventsController: { removeListeners: jest.fn() },
        scrollbarRecompensor: { removeRecompense: jest.fn() }
    },
    elements: { container: { current: { classList: { add: jest.fn(), remove: jest.fn() } } } },
    setMainComponentState: () => {},
    slideSwipingProps: {},
};
const isFullscreenOpenState = fsLightbox.componentsStates.toolbarButtons.fullscreen;
const fullscreenToggler = fsLightbox.core.fullscreenToggler;
const scrollbarRecompensor = fsLightbox.core.scrollbarRecompensor;

let setTimeoutParams;
let setMainComponentStateParams;
let lightboxCloseActions = new LightboxCloseActioner(fsLightbox);

test('isLightboxFadingOut', () => {
    expect(lightboxCloseActions.isLightboxFadingOut).toBe(false);
});

test('before fadeOut (instant actions)', () => {
    lightboxCloseActions.isLightboxFadingOut = undefined;
    lightboxCloseActions.runActions();

    expect(lightboxCloseActions.isLightboxFadingOut).toBe(true);
    expect(fsLightbox.elements.container.current.classList.add).toBeCalledWith(FADE_OUT_STRONG_CLASS_NAME);
    expect(fsLightbox.core.globalEventsController.removeListeners).toBeCalled();

    lightboxCloseActions.runActions();
    expect(fullscreenToggler.enterFullscreen).not.toBeCalled();

    isFullscreenOpenState.get = () => true;
    lightboxCloseActions.runActions();
    expect(fullscreenToggler.enterFullscreen).toBeCalled();
});

test('after fade out', () => {
    window.setTimeout = (...params) => { setTimeoutParams = params; };

    lightboxCloseActions.isLightboxFadingOut = undefined;
    document.documentElement.classList.remove = jest.fn();

    fsLightbox.setMainComponentState = (...params) => { setMainComponentStateParams = params; };

    lightboxCloseActions = new LightboxCloseActioner(fsLightbox);
    lightboxCloseActions.runActions();

    expect(setTimeoutParams[1]).toBe(ANIMATION_TIME - 30);

    setTimeoutParams[0]();

    expect(lightboxCloseActions.isLightboxFadingOut).toBe(false);
    expect(fsLightbox.slideSwipingProps.isSwiping).toBe(false);
    expect(fsLightbox.elements.container.current.classList.remove).toBeCalledWith(FADE_OUT_STRONG_CLASS_NAME);
    expect(document.documentElement.classList.remove).toBeCalledWith(OPEN_CLASS_NAME);
    expect(scrollbarRecompensor.removeRecompense).toBeCalled();

    expect(setMainComponentStateParams[0]).toEqual({ isOpen: false });
    setMainComponentStateParams[1]();
    expect(fsLightbox.core.eventsDispatcher.dispatch).toBeCalledWith('onClose');
});
