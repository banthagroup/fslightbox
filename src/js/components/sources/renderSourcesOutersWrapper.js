import { renderSourceOuter } from "./renderSourceOuter";
import { ABSOLUTED_CLASS_NAME, FULL_DIMENSION_CLASS_NAME } from "../../constants/classes-names";

export function renderSourcesOutersWrapper(fsLightbox) {
    const { core: { slideSwipingDown }, elements, props: { sources } } = fsLightbox;

    elements.sourcesOutersWrapper = document.createElement('div');
    elements.sourcesOutersWrapper.className = `${ ABSOLUTED_CLASS_NAME } ${ FULL_DIMENSION_CLASS_NAME }`;
    elements.container.appendChild(elements.sourcesOutersWrapper);

    elements.sourcesOutersWrapper.addEventListener('mousedown', slideSwipingDown.listener);
    elements.sourcesOutersWrapper.addEventListener('touchstart', slideSwipingDown.listener, { passive: true });

    for (let i = 0; i < sources.length; i++) {
        renderSourceOuter(fsLightbox, i);
    }
}
