import { setUpLightboxOpenActioner } from "./setUpLightboxOpenActioner";
import * as initializeLightboxObject from "../initializing/initializeLightbox";
import { OPEN_CLASS_NAME } from "../../../constants/classes-names";

const fsLightbox = {
    collections: { sourcesOutersTransformers: [{ zero: jest.fn() }] },
    core: {
        eventsDispatcher: { dispatch: jest.fn(), },
        lightboxOpenActioner: {},
        globalEventsController: { attachListeners: jest.fn() },
        scrollbarRecompensor: { addRecompense: jest.fn() },
        stageManager: { updateStageIndexes: jest.fn() },
        windowResizeActioner: { runActions: jest.fn() }
    },
    data: { isInitialized: true },
    stageIndexes: { current: 0 }
};

const eventsDispatcher = fsLightbox.core.eventsDispatcher;
const scrollbarRecompensor = fsLightbox.core.scrollbarRecompensor;
const stageManager = fsLightbox.core.stageManager;
const windowResizeActioner = fsLightbox.core.windowResizeActioner;
initializeLightboxObject.initializeLightbox = jest.fn();

const lightboxOpenActioner = fsLightbox.core.lightboxOpenActioner;
setUpLightboxOpenActioner(fsLightbox);

document.documentElement.classList.add = jest.fn();

test('runActions', () => {
    lightboxOpenActioner.runActions();
    expect(stageManager.updateStageIndexes).toBeCalled();
    expect(document.documentElement.classList.add).toBeCalledWith(OPEN_CLASS_NAME);
    expect(windowResizeActioner.runActions).toBeCalled();
    expect(scrollbarRecompensor.addRecompense).toBeCalled();
    expect(fsLightbox.core.globalEventsController.attachListeners).toBeCalled();
    expect(fsLightbox.collections.sourcesOutersTransformers[0].zero).toBeCalled();
    expect(eventsDispatcher.dispatch).toBeCalledWith('onOpen');
    expect(eventsDispatcher.dispatch).toBeCalledWith('onShow');
    expect(initializeLightboxObject.initializeLightbox).not.toBeCalled();

    fsLightbox.data.isInitialized = false;
    lightboxOpenActioner.runActions();
    expect(eventsDispatcher.dispatch).toBeCalledTimes(3);
    expect(initializeLightboxObject.initializeLightbox).toBeCalled();
});
