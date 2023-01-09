import { setUpLightboxOpener } from "./main-component/opening/setUpLightboxOpener";
import { setUpClassFacade } from "./elements/setUpClassFacade";
import { setUpEventsDispatcher } from "./events/setUpEventsDispatcher";
import { setUpFullscreenToggler } from "./fullscreen/setUpFullscreenToggler";
import { setUpLightboxCloser } from "./main-component/closing/setUpLightboxCloser";
import { setUpWindowResizeActioner } from "./sizes/setUpWindowResizeActioner";
import { setUpScrollbarRecompensor } from "./scrollbar/setUpScrollbarRecompensor";
import { setUpSlideIndexChanger } from "./slide/setUpSlideIndexChanger";
import { setUpGlobalEventsController } from "./events/setUpGlobalEventsController";
import { setUpSlideChangeFacade } from "./slide/setUpSlideChangeFacade";
import { setUpSourceDisplayFacade } from "./sources/setUpSourceDisplayFacade";
import { setUpStageManager } from "./stage/setUpStageManager";
import { setUpSourcesPointerDown } from "./sources/pointering/down/setUpSourcesPointerDown";

export function setUpCore(fsLightbox) {
    setUpClassFacade(fsLightbox);
    setUpEventsDispatcher(fsLightbox);
    setUpFullscreenToggler(fsLightbox);
    setUpGlobalEventsController(fsLightbox);
    setUpLightboxCloser(fsLightbox);
    setUpLightboxOpener(fsLightbox);
    setUpScrollbarRecompensor(fsLightbox);
    setUpSlideChangeFacade(fsLightbox);
    setUpSlideIndexChanger(fsLightbox);
    setUpSourcesPointerDown(fsLightbox);
    setUpSourceDisplayFacade(fsLightbox);
    setUpStageManager(fsLightbox);
    setUpWindowResizeActioner(fsLightbox);
}

