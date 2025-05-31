import { PREFIX } from "../cn/classes-names";

export function svg(parent, viewBox, d) {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),C=`${PREFIX}svg`;
	s.setAttributeNS(null, 'class', `${C}`);
    s.setAttributeNS(null, 'viewBox', viewBox);

    var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttributeNS(null, 'class', `${C}p`);
    p.setAttributeNS(null, 'd', d);

    s.appendChild(p);
    parent.appendChild(s);

    return s;
}
