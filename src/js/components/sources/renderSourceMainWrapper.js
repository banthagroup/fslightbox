import {
    ABSOLUTED_CLASS_NAME,
    FLEX_CENTERED_CLASS_NAME,
    FULL_DIMENSION_CLASS_NAME,
} from "../../constants/classes-names";
import { renderSourceAnimationWrapper } from "./renderSourceAnimationWrapper";

export function renderSourceMainWrapper(fsLightbox, i) {
    const { elements: { sourceWrappersContainer, sourceMainWrappers } } = fsLightbox;

    sourceMainWrappers[i] = document.createElement('div');
    sourceMainWrappers[i].className = `${ABSOLUTED_CLASS_NAME} ${FULL_DIMENSION_CLASS_NAME} ${FLEX_CENTERED_CLASS_NAME}`;
    sourceMainWrappers[i].innerHTML = '<div class="fslightbox-loader"><div></div><div></div><div></div><div></div></div>';
    sourceWrappersContainer.appendChild(sourceMainWrappers[i]);

    renderSourceAnimationWrapper(fsLightbox, i);
}
