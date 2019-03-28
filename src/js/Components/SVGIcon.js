module.exports = function () {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
    this.path = document.createElementNS('http://www.w3.org/2000/svg', "path");
    this.path.classList.add('fslightbox-svg-path');
    this.svg.setAttributeNS(null, 'class', 'fslightbox-svg-icon');
    this.svg.setAttributeNS(null, 'viewBox', '0 0 15 15');

    this.getSVGIcon = function (viewBox, dimension, d) {
        this.path.setAttributeNS(null, 'd', d);
        this.svg.setAttributeNS(null, 'viewBox', viewBox);
        this.svg.setAttributeNS(null, 'width', dimension);
        this.svg.setAttributeNS(null, 'height', dimension);
        this.svg.appendChild(this.path);
        return this.svg;
    }
};