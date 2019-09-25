import { setUpLightboxOpener } from "./main-component/opening/setUpLightboxOpener";
import { setUpLightboxOpenActioner } from "./main-component/opening/setUpLightboxOpenActioner";
import { setUpStageManager } from "./stage/setUpStageManager";
import { setUpClassFacade } from "./elements/setUpClassFacade";
import { setUpEventsDispatcher } from "./events/setUpEventsDispatcher";

export function setUpCore(fsLightbox) {
    setUpClassFacade(fsLightbox);
    setUpEventsDispatcher(fsLightbox);
    // setUpFullscreenToggler(fsLightbox);
    // setUpGlobalEventsController(fsLightbox);
    // setUpLightboxCloser(fsLightbox);
    setUpLightboxOpener(fsLightbox);
    setUpLightboxOpenActioner(fsLightbox);
    // setUpLightboxUpdater(fsLightbox);
    // setUpScrollbarRecompensor(fsLightbox);
    // setUpSlideChangeFacade(fsLightbox);
    // setUpSlideIndexChanger(fsLightbox);
    // setUpSlideSwipingDown(fsLightbox);
    setUpStageManager(fsLightbox);
    // setUpWindowResizeActioner(fsLightbox);
}

