import {
    FADE_IN_STRONG_CLASS_NAME,
    FULL_DIMENSION_CLASS_NAME,
    PREFIX
} from "../../../cn/classes-names";
import { createSources } from "../../sources/creating/createSources";
import { renderSourceWrappersContainer } from "../../../cm/sources/renderSourceWrappersContainer";
import { renderNav } from "../../../cm/nav/renderNav";
import { renderSlideButtons } from "../../../cm/renderSlideButtons";
import { renderSlideSwipingHoverer } from "../../../cm/renderSlideSwipingHoverer";
import { setUpCore } from "../../setUpCore";
import { gsw } from "../../scrollbar/gsw";

export function initializeLightbox(fsLightbox) {
    const { core: { eventsDispatcher }, data, elements, props: { sources } } = fsLightbox;

    data.isInitialized = true;
    data.scrollbarWidth = gsw(fsLightbox);

    setUpCore(fsLightbox);

    elements.container = document.createElement('div');
    elements.container.className = `${PREFIX}container ${FULL_DIMENSION_CLASS_NAME} ${FADE_IN_STRONG_CLASS_NAME}`;

    renderSlideSwipingHoverer(fsLightbox);
    renderNav(fsLightbox);
    renderSourceWrappersContainer(fsLightbox);
    if (sources.length > 1) {
        renderSlideButtons(fsLightbox);
    }

    createSources(fsLightbox);

    eventsDispatcher.dispatch('onInit');
}
