import { setUpLightboxOpener } from "./main-component/opening/setUpLightboxOpener";
import { setUpClassFacade } from "./elements/setUpClassFacade";
import { setUpEventsDispatcher } from "./events/setUpEventsDispatcher";
import { setUpFullscreenToggler } from "./fullscreen/setUpFullscreenToggler";
import { setUpLightboxCloser } from "./main-component/closing/setUpLightboxCloser";
import { setUpWindowResizeActioner } from "./sizes/setUpWindowResizeActioner";
import { setUpScrollbarRecompensor } from "./scrollbar/setUpScrollbarRecompensor";
import { setUpSlideIndexChanger } from "./slide/setUpSlideIndexChanger";
import { setUpSlideSwipingDown } from "./slide/swiping/down/setUpSlideSwipingDown";

export function setUpCore(fsLightbox) {
    setUpClassFacade(fsLightbox);
    setUpEventsDispatcher(fsLightbox);
    setUpFullscreenToggler(fsLightbox);
    setUpLightboxCloser(fsLightbox);
    setUpLightboxOpener(fsLightbox);
    setUpScrollbarRecompensor(fsLightbox);
    setUpSlideIndexChanger(fsLightbox);
    setUpSlideSwipingDown(fsLightbox);
    setUpWindowResizeActioner(fsLightbox);
}

