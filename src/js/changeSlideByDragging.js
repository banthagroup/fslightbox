module.exports = function (self) {

    //to these elements are added mouse events
    const elements = {
        "mediaHolder": self.data.mediaHolder.holder,
        "nav": self.data.nav
    };
    //sources are transformed
    const sources = self.data.sources;

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
            let sourcesIndexes = self.getSourcesIndexes(self.data.slide);

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
            sources[sourcesIndexes.previous].classList.add('fslightbox-transform-transition');
            sources[sourcesIndexes.current].classList.add('fslightbox-transform-transition');
            sources[sourcesIndexes.next].classList.add('fslightbox-transform-transition');


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

                for(let sourceIndex in sourcesIndexes) {
                    sources[sourceIndex].style.transform = 'translate(' + -0.1 * window.innerWidth + 'px,0)';
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
                let slideBackTransform = -self.data.slideDistance * window.innerWidth;

                sources[sourcesIndexes.current].style.transform = 'translate(' + slideBackTransform + 'px,0)';
                sources[sourcesIndexes.next].style.transform = 'translate(0,0)';

                self.loadsources('next', self.data.slide);
            }


            let slide = self.data.slide;

            /**
             *  After transition finish change stage sources after sliding to next source
             */
            setTimeout(function () {

                sources[sourcesIndexes.previous].classList.remove('fslightbox-transform-transition');
                sources[sourcesIndexes.current].classList.remove('fslightbox-transform-transition');
                sources[sourcesIndexes.next].classList.remove('fslightbox-transform-transition');

                // transition last 250ms so if image won't load till that
                // we will need to render it after it loads on nextAppend method at appendSource.js
                const slideLoad = self.data.slideLoad;
                slideaAble = true;
                if(slideLoad.loaded[slide] === false || typeof slideLoad.loaded[slide] === "undefined") {
                    slideLoad.isCallingAppend[slide] = true;
                    return;
                }

                slideLoad.loaded[slide] = false;
                slideLoad.isCallingAppend[slide] = false;

                if (difference > 0) {
                    self.appendMethods.previousSourceChangeStage(self, slide);
                } else if(difference < 0) {
                    self.appendMethods.nextSourceChangeStage(self, slide);
                }
            },250);
        },



        mouseMoveEvent: function (e) {
            if (!is_dragging || !slideaAble){
                return;
            }

            difference = e.clientX - mouseDownClientX;
            const previous = -self.data.slideDistance * window.innerWidth + difference;
            const next = self.data.slideDistance * window.innerWidth + difference;
            const sourcesIndexes = self.getSourcesIndexes(self.data.slide);

            // slide sources
            sources[sourcesIndexes.previous].style.transform = 'translate(' + previous + 'px,0)';
            sources[sourcesIndexes.current].style.transform = 'translate(' + difference + 'px,0)';
            sources[sourcesIndexes.next].style.transform = 'translate(' + next + 'px,0)';
        }
    };


    for(let elem in elements) {
        elements[elem].addEventListener('mousedown', eventListeners.mouseDownEvent);
    }
    window.addEventListener('mouseup', eventListeners.mouseUpEvent);
    window.addEventListener('mousemove', eventListeners.mouseMoveEvent);
};