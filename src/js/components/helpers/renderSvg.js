import { PREFIX } from "../../constants/classes-names";

export function renderAndGetSvg(parent, size, viewBox, d) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttributeNS(null, 'width', size);
    svg.setAttributeNS(null, 'height', size);
    svg.setAttributeNS(null, 'viewBox', viewBox);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttributeNS(null, 'class', `${ PREFIX }svg-path`);
    path.setAttributeNS(null, 'd', d);

    svg.appendChild(path);
    parent.appendChild(svg);

    return svg;
}
