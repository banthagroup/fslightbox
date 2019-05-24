module.exports = function (self) {
    //we will hover all windows with div with high z-index to be sure mouseup is triggered
    const invisibleHover = new (require('../Components/DOMObject'))('div').addClassesAndCreate(['fslightbox-invisible-hover']);
    const CURSOR_GRABBING_CLASS_NAME = 'fslightbox-cursor-grabbing';
    const TRANSFORM_TRANSITION_CLASS_NAME = 'fslightbox-transform-transition';

    //to these elements are added mouse events
    const elements = {
        mediaHolder: self.mediaHolder,
        invisibleHover: invisibleHover,
        downEventDetector: self.data.downEventDetector
    };
    //sources are transformed
    const sources = self.data.sources;

    // if there are only 2 or 1 urls slideTransformer will be different
    const urlsLength = self.data.urls.length;

    let is_dragging = false;
    let mouseDownClientX;
    let isSourceDownEventTarget;
    let difference;
    let slideAble = true;


    const mouseDownEvent = function (e) {
        // tag can't be video cause it would be unclickable in microsoft browsers
        if (e.target.tagName !== 'VIDEO' && !e.touches) {
            e.preventDefault();
        }
        if (e.target.classList.contains('fslightbox-source')) {
            isSourceDownEventTarget = true;
        }
        is_dragging = true;
        difference = 0;

        if (self.data.totalSlides === 1) {
            return;
        }

        (e.touches) ?
            mouseDownClientX = e.touches[0].clientX :
            mouseDownClientX = e.clientX;
    };


    const mouseUpEvent = function () {
        if (!is_dragging) {
            return;
        }
        is_dragging = false;

        if (self.element.contains(invisibleHover)) {
            self.element.removeChild(invisibleHover);
        }

        if (self.element.classList.contains(CURSOR_GRABBING_CLASS_NAME)) {
            self.element.classList.remove(CURSOR_GRABBING_CLASS_NAME);
        }

        if (difference === 0) {
            if (!isSourceDownEventTarget) {
                self.hide();
            }
            isSourceDownEventTarget = false;
            return;
        }
        isSourceDownEventTarget = false;

        if (!slideAble) {
            return;
        }
        slideAble = false;

        let sourcesIndexes = self.stageSourceIndexes.all(self.data.slide);

        // add transition if user slide to source
        sources[sourcesIndexes.previous].classList.add(TRANSFORM_TRANSITION_CLASS_NAME);
        sources[sourcesIndexes.current].classList.add(TRANSFORM_TRANSITION_CLASS_NAME);
        sources[sourcesIndexes.next].classList.add(TRANSFORM_TRANSITION_CLASS_NAME);


        // slide previous
        if (difference > 0) {

            // update slide number
            if (self.data.slide === 1) {
                self.updateSlideNumber(self.data.totalSlides);
            } else {
                self.updateSlideNumber(self.data.slide - 1);
            }

            if (urlsLength >= 2) {
                self.slideTransformer.plus(sources[sourcesIndexes.current]);
                self.slideTransformer.zero(sources[sourcesIndexes.previous]);
            } else {
                self.slideTransformer.zero(sources[sourcesIndexes.current]);
            }

            // get new indexes
            sourcesIndexes = self.stageSourceIndexes.all(self.data.slide);

            //if source isn't already in memory
            if (typeof self.data.sources[sourcesIndexes.previous] === "undefined") {
                self.loadsources('previous', self.data.slide);
            }
        }


        // slide next
        else if (difference < 0) {

            //update slide number
            if (self.data.slide === self.data.totalSlides) {
                self.updateSlideNumber(1);
            } else {
                self.updateSlideNumber(self.data.slide + 1);
            }


            if (urlsLength > 1) {
                self.slideTransformer.minus(sources[sourcesIndexes.current]);
                self.slideTransformer.zero(sources[sourcesIndexes.next]);
            } else {
                self.slideTransformer.zero(sources[sourcesIndexes.current]);
            }

            // get new indexes
            sourcesIndexes = self.stageSourceIndexes.all(self.data.slide);
            //if source isn't already in memory
            if (typeof self.data.sources[sourcesIndexes.next] === "undefined") {
                self.loadsources('next', self.data.slide);
            }
        }

        difference = 0;
        self.stopVideos();

        setTimeout(function () {
            // remove transition because with dragging it looks awful
            sources[sourcesIndexes.previous].classList.remove(TRANSFORM_TRANSITION_CLASS_NAME);
            sources[sourcesIndexes.current].classList.remove(TRANSFORM_TRANSITION_CLASS_NAME);
            sources[sourcesIndexes.next].classList.remove(TRANSFORM_TRANSITION_CLASS_NAME);

            // user shouldn't be able to slide when animation is running
            slideAble = true;
        }, 250);
    };


    const mouseMoveEvent = function (e) {
        if (!is_dragging || !slideAble) {
            return;
        }
        let clientX;
        (e.touches) ?
            clientX = e.touches[0].clientX :
            clientX = e.clientX;

        difference = clientX - mouseDownClientX;
        // if user swiped but there is only one slide we dont want further code to execute but we want to prevent lightbox
        // from closing so we set difference to 1
        if (difference !== 0 && self.data.totalSlides === 1) {
            difference = 1;
            return;
        }

        if (!self.element.classList.contains(CURSOR_GRABBING_CLASS_NAME))
            self.element.classList.add(CURSOR_GRABBING_CLASS_NAME);

        if (!self.element.contains(invisibleHover)) {
            self.element.appendChild(invisibleHover);
        }
        const sourcesIndexes = self.stageSourceIndexes.all(self.data.slide);

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
    };

    const preventDefaultEvent = function (e) {
        e.preventDefault();
    };


    for (let elem in elements) {
        elements[elem].addEventListener('mousedown', mouseDownEvent);
        elements[elem].addEventListener('touchstart', mouseDownEvent, { passive: true });
    }

    this.addWindowEvents = function () {
        window.addEventListener('mouseup', mouseUpEvent);
        window.addEventListener('touchend', mouseUpEvent);
        window.addEventListener('mousemove', mouseMoveEvent);
        window.addEventListener('touchmove', mouseMoveEvent, { passive: true });
    };

    this.removeWindowEvents = function () {
        window.removeEventListener('mouseup', mouseUpEvent);
        window.removeEventListener('touchend', mouseUpEvent);
        window.removeEventListener('mousemove', mouseMoveEvent);
        window.removeEventListener('touchmove', mouseMoveEvent);
    };

    invisibleHover.addEventListener('mouseup', mouseUpEvent);
    invisibleHover.addEventListener('touchend', mouseUpEvent, { passive: true });
    self.data.nav.addEventListener('mousedown', preventDefaultEvent);
};
