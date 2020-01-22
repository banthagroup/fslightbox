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
            sourceDisplayFacade,
            stageManager,
            windowResizeActioner
        },
        data,
        elements,
        stageIndexes
    } = fsLightbox;

    self.open = (index = 0) => {
        stageIndexes.current = index;

        if (!data.isInitialized) {
            initializeLightbox(fsLightbox);
        } else {
            eventsDispatcher.dispatch('onShow');
        }

        stageManager.updateStageIndexes();
        sourceDisplayFacade.displaySourcesWhichShouldBeDisplayed();
        componentsServices.setSlideNumber(stageIndexes.current + 1);
        document.body.appendChild(elements.container);
        document.documentElement.classList.add(OPEN_CLASS_NAME);
        scrollbarRecompensor.addRecompense();
        globalEventsController.attachListeners();
        eventsDispatcher.dispatch('onOpen');
        sourcesOutersTransformers[stageIndexes.current].zero();
        windowResizeActioner.runActions();
    };
}
