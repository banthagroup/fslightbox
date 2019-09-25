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

    self.open = () => {
        stageManager.updateStageIndexes();
        document.documentElement.classList.add(OPEN_CLASS_NAME);
        // windowResizeActioner.runActions();
        // scrollbarRecompensor.addRecompense();
        // globalEventsController.attachListeners();
        // sourcesOutersTransformers[stageIndexes.current].zero();
        // eventsDispatcher.dispatch('onOpen');

        (data.isInitialized) ?
            eventsDispatcher.dispatch('onShow') :
            initializeLightbox(fsLightbox);
    };
}
