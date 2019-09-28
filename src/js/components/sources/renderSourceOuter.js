import {
    ABSOLUTED_CLASS_NAME, FLEX_CENTERED_CLASS_NAME,
    FULL_DIMENSION_CLASS_NAME,
    SOURCE_OUTER_CLASS_NAME
} from "../../constants/classes-names";
import { renderSourceInner } from "./renderSourceInner";

export function renderSourceOuter(fsLightbox, i) {
    const { elements: { sourcesOutersWrapper, sourcesOuters } } = fsLightbox;

    sourcesOuters[i] = document.createElement('div');
    sourcesOuters[i].className = `${ SOURCE_OUTER_CLASS_NAME } ${ ABSOLUTED_CLASS_NAME } ${ FULL_DIMENSION_CLASS_NAME } ${ FLEX_CENTERED_CLASS_NAME }`;
    sourcesOuters[i].innerHTML = '<div class="fslightbox-loader"><div></div><div></div><div></div><div></div></div>';
    sourcesOutersWrapper.appendChild(sourcesOuters[i]);

    renderSourceInner(fsLightbox, i);
}
