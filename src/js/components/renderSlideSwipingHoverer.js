import { ABSOLUTED_CLASS_NAME, FULL_DIMENSION_CLASS_NAME, PREFIX } from "../constants/classes-names";

export function renderSlideSwipingHoverer({ elements }) {
    elements.slideSwipingHoverer = document.createElement('div');
    elements.slideSwipingHoverer.className = `${ PREFIX }slide-swiping-hoverer ${ FULL_DIMENSION_CLASS_NAME } ${ ABSOLUTED_CLASS_NAME }`;
}
