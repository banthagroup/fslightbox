import { renderSourceMainWrapper } from "./renderSourceMainWrapper";
import { ABSOLUTED_CLASS_NAME, FULL_DIMENSION_CLASS_NAME } from "../../constants/classes-names";

export function renderSourceWrappersContainer(fsLightbox) {
    const { core: { slideSwipingDown }, elements, props: { sources } } = fsLightbox;

    elements.sourceWrappersContainer = document.createElement('div');
    elements.sourceWrappersContainer.className = `${ABSOLUTED_CLASS_NAME} ${FULL_DIMENSION_CLASS_NAME}`;
    elements.container.appendChild(elements.sourceWrappersContainer);

    elements.sourceWrappersContainer.addEventListener('mousedown', slideSwipingDown.listener);
    elements.sourceWrappersContainer.addEventListener('touchstart', slideSwipingDown.listener, { passive: true });

    for (let i = 0; i < sources.length; i++) {
        renderSourceMainWrapper(fsLightbox, i);
    }
}
