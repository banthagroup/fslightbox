module.exports = function (self, DOMObject) {

    //we will hover all windows with div with high z-index to be sure mouseup is triggered
    const invisibleHover = new DOMObject('div').addClassesAndCreate(['fslightbox-invisible-hover']);

    //to these elements are added mouse events
    const elements = {
        "mediaHolder": self.data.mediaHolder.holder,
        "invisibleHover": invisibleHover,
        "holderWrapper": self.data.holderWrapper
    };
    //sources are transformed
    const sources = self.data.sources;

    // if there are only 2 or 1 urls transforms will be different
    const urlsLength = self.data.urls.length;

    let is_dragging = false;
    let mouseDownClientX;
    let difference;
    let slideaAble = true;

    let eventListeners = {


        mouseDownEvent: function (e) {

            // tag can't be video cause it would be unclickable in microsoft browsers
            if (e.target.tagName !== 'VIDEO' && !self.data.isMobile) {
                e.preventDefault();
            }
            for (let elem in elements) {
                elements[elem].classList.add('fslightbox-cursor-grabbing');
            }
            is_dragging = true;
            (self.data.isMobile) ?
                mouseDownClientX = e.touches[0].clientX :
                mouseDownClientX = e.clientX;
            difference = 0;
        },


        mouseUpEvent: function () {

            if (self.element.contains(invisibleHover)) {
                self.element.removeChild(invisibleHover);
            }
            let sourcesIndexes = self.getSourcesIndexes.all(self.data.slide);

            for (let elem in elements) {
                elements[elem].classList.remove('fslightbox-cursor-grabbing');
            }

            is_dragging = false;

            // if user didn't slide none animation should work
            if (difference === 0) {
                return;
            }

            //we can slide only if previous animation has finished
            if (!slideaAble) {
                return;
            }
            slideaAble = false;

            // add transition if user slide to source
            sources[sourcesIndexes.previous].classList.add('fslightbox-transform-transition');
            sources[sourcesIndexes.current].classList.add('fslightbox-transform-transition');
            sources[sourcesIndexes.next].classList.add('fslightbox-transform-transition');


            // slide previous
            if (difference > 0) {

                // update slide number
                if (self.data.slide === 1) {
                    self.data.updateSlideNumber(self.data.total_slides);
                } else {
                    self.data.updateSlideNumber(self.data.slide - 1);
                }

                if (urlsLength >= 2) {
                    self.transforms.transformPlus(sources[sourcesIndexes.current]);
                    self.transforms.transformNull(sources[sourcesIndexes.previous]);
                }
                else {
                  self.transforms.transformNull(sources[sourcesIndexes.current]);
                }

                // get new indexes
                sourcesIndexes = self.getSourcesIndexes.all(self.data.slide);

                //if source isn't already in memory
                if (typeof self.data.sources[sourcesIndexes.previous] === "undefined") {
                    self.loadsources('previous', self.data.slide);
                }
            }


            // slide next
            else if (difference < 0) {

                //update slide number
                if (self.data.slide === self.data.total_slides) {
                    self.data.updateSlideNumber(1);
                } else {
                    self.data.updateSlideNumber(self.data.slide + 1);
                }


                if (urlsLength > 1) {
                    self.transforms.transformMinus(sources[sourcesIndexes.current]);
                    self.transforms.transformNull(sources[sourcesIndexes.next]);
                } else {
                    self.transforms.transformNull(sources[sourcesIndexes.current]);
                }

                // get new indexes
                sourcesIndexes = self.getSourcesIndexes.all(self.data.slide);
                //if source isn't already in memory
                if (typeof self.data.sources[sourcesIndexes.next] === "undefined") {
                    self.loadsources('next', self.data.slide);
                }
            }

            difference = 0;
            self.stopVideos();

            setTimeout(function () {

                // remove transition because with dragging it looks awful
                sources[sourcesIndexes.previous].classList.remove('fslightbox-transform-transition');
                sources[sourcesIndexes.current].classList.remove('fslightbox-transform-transition');
                sources[sourcesIndexes.next].classList.remove('fslightbox-transform-transition');

                // user shouldn't be able to slide when animation is running
                slideaAble = true;
            }, 250);
        },


        mouseMoveEvent: function (e) {

            if (!is_dragging || !slideaAble) {
                return;
            }

            let clientX;
            (self.data.isMobile) ?
                clientX = e.touches[0].clientX :
                clientX = e.clientX;

            self.element.appendChild(invisibleHover);
            difference = clientX - mouseDownClientX;
            const sourcesIndexes = self.getSourcesIndexes.all(self.data.slide);

            if (urlsLength >= 3) {
                sources[sourcesIndexes.previous].style.transform = 'translate(' +
                    (-self.data.slideDistance * window.innerWidth + difference)
                    + 'px,0)';
            }

            if (urlsLength >= 1) {
                sources[sourcesIndexes.current].style.transform = 'translate(' + difference + 'px,0)';
            }

            if (urlsLength >= 2) {
                sources[sourcesIndexes.next].style.transform = 'translate('
                    + (self.data.slideDistance * window.innerWidth + difference)
                    + 'px,0)';
            }
        },

        preventDefaultEvent: function (e) {
            e.preventDefault();
        }
    };


    for (let elem in elements) {
        elements[elem].addEventListener('mousedown', eventListeners.mouseDownEvent);
        elements[elem].addEventListener('touchstart', eventListeners.mouseDownEvent, {passive: true});
    }
    window.addEventListener('mouseup', eventListeners.mouseUpEvent);
    window.addEventListener('touchend', eventListeners.mouseUpEvent);
    invisibleHover.addEventListener('mouseup', eventListeners.mouseUpEvent);
    invisibleHover.addEventListener('touchend', eventListeners.mouseUpEvent);
    window.addEventListener('mousemove', eventListeners.mouseMoveEvent);
    window.addEventListener('touchmove', eventListeners.mouseMoveEvent);
    self.data.nav.addEventListener('mousedown', eventListeners.preventDefaultEvent);
};