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

            //we can slide only if previous animation has finished
            if(!slideaAble) {
                for(let source in sources) {
                    sources[source].style.transform = 'translate(' + -1.3 * window.innerWidth + 'px,0)';
                }
                return;
            }
            console.log(1);
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
                self.loadsources('previous');

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
                self.loadsources('next');

                for(let source in sources) {
                    sources[source].style.transform = 'translate(' + -2.5 * window.innerWidth + 'px,0)';
                }
            }



            /**
             *  After transition finish change stage sources after sliding to next source
             */
            setTimeout(function () {
                sources.previousSource.classList.remove('fslightbox-transform-transition');
                sources.currentSource.classList.remove('fslightbox-transform-transition');
                sources.nextSource.classList.remove('fslightbox-transform-transition');

                // transition last 366ms so if image won't load till that
                // we will need to render it after it loads on nextAppend method at appendSource.js
                const slideLoad = self.data.slideLoad;
                if(slideLoad.loaded === false) {
                    slideLoad.isCallingAppend = true;
                    return;
                }
                slideLoad.loaded = false;
                slideLoad.isCallingAppend = false;


                if (difference > 0) {
                    self.appendMethods.previousSourceChangeStage(self);
                } else if(difference < 0) {
                    self.appendMethods.nextSourceChangeStage(self);
                }

                slideaAble = true;
            }, 366);
        },



        mouseMoveEvent: function (e) {
            if (!is_dragging){
                return;
            }
            difference = e.clientX - mouseDownClientX;
            let to_transform = self.data.xPosition + difference;

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