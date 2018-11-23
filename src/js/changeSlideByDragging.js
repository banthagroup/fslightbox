module.exports = function (self) {

    const elements = {
        "mediaHolder": self.data.mediaHolder.holder,
        "nav": self.data.nav
    };

    let eventListeners = {
        mouseDownEvent: function (e) {
            e.preventDefault();

            for(let elem in elements) {
                elements[elem].classList.add('fslightbox-cursor-grabbing');
            }
        },

        mouseUpEvent: function () {
            for(let elem in elements) {
                elements[elem].classList.remove('fslightbox-cursor-grabbing');
            }
        }
    };

    for(let elem in elements) {
        elements[elem].addEventListener('mousedown', eventListeners.mouseDownEvent);
        elements[elem].addEventListener('mouseup', eventListeners.mouseUpEvent);
    }
};