import { FADE_IN_STRONG_CLASS_NAME, FULL_DIMENSION_CLASS_NAME, PREFIX } from "../../../constants/classes-names";
import { createSources } from "../../sources/creating/createSources";
import { renderSourcesOutersWrapper } from "../../../components/sources/renderSourcesOutersWrapper";
import { renderNav } from "../../../components/nav/renderNav";
import { fillSourcesOutersTransformersCollection } from "../../collections/fillSourcesOutersTransformersCollection";
import { renderSlideButtons } from "../../../components/renderSlideButtons";
import { renderSlideSwipingHoverer } from "../../../components/renderSlideSwipingHoverer";
import { setUpCore } from "../../setUpCore";

export function initializeLightbox(fsLightbox) {
    const { core: { eventsDispatcher }, data, elements, props: { sources } } = fsLightbox;

    data.isInitialized = true;

    fillSourcesOutersTransformersCollection(fsLightbox);

    setUpCore(fsLightbox);

    elements.container = document.createElement('div');
    elements.container.className = `${ PREFIX }container ${ FULL_DIMENSION_CLASS_NAME } ${ FADE_IN_STRONG_CLASS_NAME }`;

    renderSlideSwipingHoverer(fsLightbox);
    renderNav(fsLightbox);
    renderSourcesOutersWrapper(fsLightbox);
    if (sources.length > 1) {
        renderSlideButtons(fsLightbox);
    }

    createSources(fsLightbox);

    eventsDispatcher.dispatch('onInit');
}
