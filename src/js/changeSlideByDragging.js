module.exports = function (self) {

    const elements = {
        "mediaHolder": self.data.mediaHolder.holder,
        "nav": self.data.nav
    };

    let is_dragging = false;
    let mouseDownClientX;
    let difference;

    let eventListeners = {

        mouseDownEvent: function (e) {
            e.preventDefault();

            mouseDownClientX = e.clientX;
            for(let elem in elements) {
                elements[elem].classList.add('fslightbox-cursor-grabbing');
            }
            is_dragging = true;
            difference = 0;
        },


        mouseUpEvent: function () {
            for(let elem in elements) {
                elements[elem].classList.remove('fslightbox-cursor-grabbing');
            }
            self.data.xPosition = self.data.xPosition + difference;
            is_dragging = false;

            if (difference > 0) {

            } else if (difference < 0) {

            }
            console.log(difference);
        },


        mouseMoveEvent: function (e) {
            if (!is_dragging){
                return;
            }
            const sourceElem = self.data.sources[self.data.slide - 1];
            difference = e.clientX - mouseDownClientX;
            let to_transform = self.data.xPosition + difference;
            elements.mediaHolder.style.transform = 'translate3d(' + to_transform + 'px,0,0)';
        }
    };


    for(let elem in elements) {
        elements[elem].addEventListener('mousedown', eventListeners.mouseDownEvent);
    }
    window.addEventListener('mouseup', eventListeners.mouseUpEvent);
    window.addEventListener('mousemove', eventListeners.mouseMoveEvent);
};