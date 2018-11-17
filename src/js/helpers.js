/**
 *
 * @param tag
 * @param classNames Array
 * @returns {HTMLElement}
 */
function createElem(tag, classNames) {
    let elem = document.createElement(tag);
    for(let i in classNames) {
        elem.classList.add(classNames[i])
    }
    return elem;
}


/**
 * create svg icon
 * @param d
 * @returns {HTMLElement}
 */
function createSVGIcon(d) {
    let svg = document.createElementNS('http://www.w3.org/2000/svg',"svg");
    svg.setAttributeNS(null, 'viewBox', '0 0 20 20');

    let path = document.createElementNS('http://www.w3.org/2000/svg',"path");
    path.setAttributeNS(null, 'd', d);
    svg.appendChild(path);

    return svg;
}