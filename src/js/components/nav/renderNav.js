import { renderToolbar } from "./renderToolbar";
import { renderSlideNumber } from "./renderSlideNumber";
import { PREFIX } from "../../constants/classes-names";

export function renderNav(fsLightbox) {
    const { props: { sources }, elements: { container } } = fsLightbox;

    const nav = document.createElement('div');
    nav.className = `${ PREFIX }nav`;
    container.appendChild(nav);

    renderToolbar(fsLightbox, nav);

    if (sources.length > 1) {
        renderSlideNumber(fsLightbox, nav);
    }
}
