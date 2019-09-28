import { OPEN_CLASS_NAME } from "../../../constants/classes-names";
import { initializeLightbox } from "../initializing/initializeLightbox";

export function setUpLightboxOpener(fsLightbox) {
    const {
        collections: { sourcesOutersTransformers },
        core: {
            eventsDispatcher,
            lightboxOpener: self,
            globalEventsController,
            scrollbarRecompensor,
            stageManager,
            windowResizeActioner
        },
        data,
        stageIndexes
    } = fsLightbox;

    self.open = (index = 0) => {
        stageIndexes.current = index;

        (data.isInitialized) ?
            eventsDispatcher.dispatch('onShow') :
            initializeLightbox(fsLightbox);

        stageManager.updateStageIndexes();
        document.documentElement.classList.add(OPEN_CLASS_NAME);
        scrollbarRecompensor.addRecompense();
        // globalEventsController.attachListeners();
        eventsDispatcher.dispatch('onOpen');

        sourcesOutersTransformers[stageIndexes.current].zero();
        windowResizeActioner.runActions();
    };
}
