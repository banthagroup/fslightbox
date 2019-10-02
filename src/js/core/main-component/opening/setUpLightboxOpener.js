import { OPEN_CLASS_NAME } from "../../../constants/classes-names";
import { initializeLightbox } from "../initializing/initializeLightbox";

export function setUpLightboxOpener(fsLightbox) {
    const {
        collections: { sourcesOutersTransformers },
        componentsServices,
        core: {
            eventsDispatcher,
            lightboxOpener: self,
            globalEventsController,
            scrollbarRecompensor,
            stageManager,
            windowResizeActioner
        },
        data,
        elements,
        stageIndexes
    } = fsLightbox;

    self.open = (index = 0) => {
        stageIndexes.current = index;

        (data.isInitialized) ?
            eventsDispatcher.dispatch('onShow') :
            initializeLightbox(fsLightbox);

        componentsServices.setSlideNumber(stageIndexes.current + 1);
        document.body.appendChild(elements.container);
        stageManager.updateStageIndexes();
        document.documentElement.classList.add(OPEN_CLASS_NAME);
        scrollbarRecompensor.addRecompense();
        globalEventsController.attachListeners();
        eventsDispatcher.dispatch('onOpen');

        sourcesOutersTransformers[stageIndexes.current].zero();
        windowResizeActioner.runActions();
    };
}
