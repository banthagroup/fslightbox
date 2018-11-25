module.exports = function (self) {

    //to these elements are added mouse events
    const elements = {
        "mediaHolder": self.data.mediaHolder.holder,
        "nav": self.data.nav
    };
    //sources are transformed
    const sources = self.data.stageSources;

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

                //update slide number
                if(self.data.slide === 1) {
                    self.data.updateSlideNumber(self.data.total_slides);
                } else {
                    self.data.updateSlideNumber(self.data.slide - 1);
                }

                self.data.xPosition = -0.1 * window.innerWidth;

                sources.previousSource.classList.add('fslightbox-transform-transition');
                sources.currentSource.classList.add('fslightbox-transform-transition');
                sources.nextSource.classList.add('fslightbox-transform-transition');

                for(let source in sources) {
                    sources[source].style.transform = 'translate(' + -0.1 * window.innerWidth + 'px,0)';
                }

                setTimeout(function () {
                    sources.previousSource.classList.remove('fslightbox-transform-transition');
                    sources.currentSource.classList.remove('fslightbox-transform-transition');
                    sources.nextSource.classList.remove('fslightbox-transform-transition');
                }, 366);
            }

            else if (difference < 0) {

                //update slide number
                if(self.data.slide === self.data.total_slides) {
                    self.data.updateSlideNumber(1);
                } else {
                    self.data.updateSlideNumber(self.data.slide + 1);
                }

                self.data.xPosition = -2.5 * window.innerWidth;
                self.loadsources('next');

                sources.previousSource.classList.add('fslightbox-transform-transition');
                sources.currentSource.classList.add('fslightbox-transform-transition');
                sources.nextSource.classList.add('fslightbox-transform-transition');

                for(let source in sources) {
                    sources[source].style.transform = 'translate(' + -2.5 * window.innerWidth + 'px,0)';
                }


                setTimeout(function () {
                    sources.previousSource.classList.remove('fslightbox-transform-transition');
                    sources.currentSource.classList.remove('fslightbox-transform-transition');
                    sources.nextSource.classList.remove('fslightbox-transform-transition');
                }, 366);
            }
        },


        mouseMoveEvent: function (e) {
            if (!is_dragging){
                return;
            }
            difference = e.clientX - mouseDownClientX;
            let to_transform = self.data.xPosition + difference;

            console.log(to_transform);
            for(let source in sources) {
                sources[source].style.transform = 'translate(' + to_transform + 'px,0)';
            }
        }
    };


    for(let elem in elements) {
        elements[elem].addEventListener('mousedown', eventListeners.mouseDownEvent);
    }
    window.addEventListener('mouseup', eventListeners.mouseUpEvent);
    window.addEventListener('mousemove', eventListeners.mouseMoveEvent);
};