import { FADE_IN_STRONG_CLASS_NAME, FULL_DIMENSION_CLASS_NAME, PREFIX } from "../../../constants/classes-names";
import { createSources } from "../../sources/creating/createSources";
import { renderSourcesOutersWrapper } from "../../../components/sources/renderSourcesOutersWrapper";

export function initializeLightbox(fsLightbox) {
    const { data, core: { eventsDispatcher }, elements } = fsLightbox;

    data.isInitialized = true;

    elements.container = document.createElement('div');
    elements.container.className = `${ PREFIX }container ${ FULL_DIMENSION_CLASS_NAME } ${ FADE_IN_STRONG_CLASS_NAME }`;
    document.body.appendChild(elements.container);

    renderSourcesOutersWrapper(fsLightbox);

    createSources(fsLightbox);

    eventsDispatcher.dispatch('onInit');
}
