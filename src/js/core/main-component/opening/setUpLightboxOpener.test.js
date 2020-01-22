import { setUpLightboxOpener } from "./setUpLightboxOpener";
import * as initializeLightboxObject from "../initializing/initializeLightbox";
import { OPEN_CLASS_NAME } from "../../../constants/classes-names";

const fsLightbox = {
    collections: { sourcesOutersTransformers: [{ zero: jest.fn }, { zero: jest.fn() }] },
    componentsServices: { setSlideNumber: jest.fn() },
    core: {
        eventsDispatcher: { dispatch: jest.fn(), },
        lightboxOpener: {},
        globalEventsController: { attachListeners: jest.fn() },
        scrollbarRecompensor: { addRecompense: jest.fn() },
        stageManager: { updateStageIndexes: jest.fn() },
        sourceDisplayFacade: { displaySourcesWhichShouldBeDisplayed: jest.fn() },
        windowResizeActioner: { runActions: jest.fn() }
    },
    data: { isInitialized: true },
    elements: {},
    stageIndexes: {}
};

const eventsDispatcher = fsLightbox.core.eventsDispatcher;
const scrollbarRecompensor = fsLightbox.core.scrollbarRecompensor;
const stageManager = fsLightbox.core.stageManager;
const windowResizeActioner = fsLightbox.core.windowResizeActioner;
initializeLightboxObject.initializeLightbox = jest.fn();

const lightboxOpener = fsLightbox.core.lightboxOpener;
setUpLightboxOpener(fsLightbox);
fsLightbox.elements.container = 'container';

document.body.appendChild = jest.fn();
document.documentElement.classList.add = jest.fn();

test('open', () => {
    lightboxOpener.open(1);
    expect(fsLightbox.stageIndexes.current).toBe(1);
    expect(stageManager.updateStageIndexes).toBeCalled();
    expect(fsLightbox.core.sourceDisplayFacade.displaySourcesWhichShouldBeDisplayed).toBeCalled();
    expect(fsLightbox.componentsServices.setSlideNumber).toBeCalledWith(2);
    expect(document.body.appendChild).toBeCalledWith(fsLightbox.elements.container);
    expect(document.documentElement.classList.add).toBeCalledWith(OPEN_CLASS_NAME);
    expect(windowResizeActioner.runActions).toBeCalled();
    expect(scrollbarRecompensor.addRecompense).toBeCalled();
    expect(fsLightbox.core.globalEventsController.attachListeners).toBeCalled();
    expect(fsLightbox.collections.sourcesOutersTransformers[1].zero).toBeCalled();
    expect(eventsDispatcher.dispatch).toBeCalledWith('onOpen');
    expect(eventsDispatcher.dispatch).toBeCalledWith('onShow');
    expect(initializeLightboxObject.initializeLightbox).not.toBeCalled();

    fsLightbox.data.isInitialized = false;
    lightboxOpener.open();
    expect(fsLightbox.stageIndexes.current).toBe(0);
    expect(eventsDispatcher.dispatch).toBeCalledTimes(3);
    expect(initializeLightboxObject.initializeLightbox).toBeCalled();
});
