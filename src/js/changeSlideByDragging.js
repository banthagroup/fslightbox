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
    let slideaAble = true;

    let eventListeners = {


        mouseDownEvent: function (e) {
            e.preventDefault();

            for(let elem in elements) {
                elements[elem].classList.add('fslightbox-cursor-grabbing');
            }
            is_dragging = true;
            mouseDownClientX = e.clientX;

            if(!slideaAble) {
                return;
            }
            difference = 0;
        },



        mouseUpEvent: function () {

            for(let elem in elements) {
                elements[elem].classList.remove('fslightbox-cursor-grabbing');
            }

            is_dragging = false;

            // if user didn't slide none animation should work
            if(difference == 0) {
                return;
            }

            //we can slide only if previous animation has finished
            if(!slideaAble) {
                return;
            }
            slideaAble = false;

            // add transition if user slide to source
            sources.previousSource.classList.add('fslightbox-transform-transition');
            sources.currentSource.classList.add('fslightbox-transform-transition');
            sources.nextSource.classList.add('fslightbox-transform-transition');


            // slide previous
            if (difference > 0) {

                // update slide number
                if(self.data.slide === 1) {
                    self.data.updateSlideNumber(self.data.total_slides);
                } else {
                    self.data.updateSlideNumber(self.data.slide - 1);
                }

                self.data.xPosition = -0.1 * window.innerWidth;
                self.loadsources('previous', self.data.slide);

                for(let source in sources) {
                    sources[source].style.transform = 'translate(' + -0.1 * window.innerWidth + 'px,0)';
                }
            }


            // slide next
            else if (difference < 0) {

                //update slide number
                if(self.data.slide === self.data.total_slides) {
                    self.data.updateSlideNumber(1);
                } else {
                    self.data.updateSlideNumber(self.data.slide + 1);
                }

                self.data.xPosition = -2.5 * window.innerWidth;
                let previous = -self.data.slideDistance * window.innerWidth + difference;
                sources.currentSource.style.transform = 'translate(' + previous + 'px,0)';
                sources.nextSource.style.transform = 'translate(0,0)';

                self.loadsources('next', self.data.slide);
            }

            let currentSlide = self.data.slide;

            /**
             *  After transition finish change stage sources after sliding to next source
             */
            setTimeout(function () {

                sources.previousSource.classList.remove('fslightbox-transform-transition');
                sources.currentSource.classList.remove('fslightbox-transform-transition');
                sources.nextSource.classList.remove('fslightbox-transform-transition');

                // transition last 250ms so if image won't load till that
                // we will need to render it after it loads on nextAppend method at appendSource.js
                const slideLoad = self.data.slideLoad;
                slideaAble = true;
                if(slideLoad.loaded[currentSlide] === false || typeof slideLoad.loaded[currentSlide] === "undefined") {
                    slideLoad.isCallingAppend[currentSlide] = true;
                    return;
                }

                slideLoad.loaded[currentSlide] = false;
                slideLoad.isCallingAppend[currentSlide] = false;

                if (difference > 0) {
                    self.appendMethods.previousSourceChangeStage(self, currentSlide);
                } else if(difference < 0) {
                    self.appendMethods.nextSourceChangeStage(self, currentSlide);
                }

            },250);
        },



        mouseMoveEvent: function (e) {
            if (!is_dragging || !slideaAble){
                return;
            }

            difference = e.clientX - mouseDownClientX;
            let previous = -self.data.slideDistance * window.innerWidth + difference;
            let next = self.data.slideDistance * window.innerWidth + difference;
            sources.previousSource.style.transform = 'translate(' + previous + 'px,0)';
            sources.currentSource.style.transform = 'translate(' + difference + 'px,0)';
            sources.nextSource.style.transform = 'translate(' + next + 'px,0)';
        }
    };


    for(let elem in elements) {
        elements[elem].addEventListener('mousedown', eventListeners.mouseDownEvent);
    }
    window.addEventListener('mouseup', eventListeners.mouseUpEvent);
    window.addEventListener('mousemove', eventListeners.mouseMoveEvent);
};