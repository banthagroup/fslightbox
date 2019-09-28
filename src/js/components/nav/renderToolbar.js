import { PREFIX } from "../../constants/classes-names";
import { renderFullscreenButton } from "./renderFullscreenButton";
import { renderCloseButton } from "./renderCloseButton";

export function renderToolbar(fsLightbox, parent) {
    const toolbar = document.createElement('div');
    toolbar.className = `${ PREFIX }toolbar`;

    parent.appendChild(toolbar);

    renderFullscreenButton(fsLightbox, toolbar);
    renderCloseButton(fsLightbox, toolbar);
}
