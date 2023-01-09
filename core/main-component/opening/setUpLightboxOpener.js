import { OPEN_CLASS_NAME } from "../../../constants/classes-names";
import { initializeLightbox } from "../initializing/initializeLightbox";

export function setUpLightboxOpener(fsLightbox) {
    const {
        collections: { sourceMainWrappersTransformers },
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

        (data.isInitialized) ?
            eventsDispatcher.dispatch('onShow') :
            initializeLightbox(fsLightbox);

        stageManager.updateStageIndexes();

        sourceDisplayFacade.displaySourcesWhichShouldBeDisplayed();

        componentsServices.setSlideNumber(index + 1);

        document.body.appendChild(elements.container);
        document.documentElement.classList.add(OPEN_CLASS_NAME);

        scrollbarRecompensor.addRecompense();

        globalEventsController.attachListeners();

        windowResizeActioner.runActions();
        sourceMainWrappersTransformers[stageIndexes.current].zero();

        eventsDispatcher.dispatch('onOpen');
    };
}
