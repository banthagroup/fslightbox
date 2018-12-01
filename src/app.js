(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {

    /**
     * Renders loader when loading fsLightbox initially
     * @param self
     * @param slide
     * @param DOMObject
     */
    renderHolderInitial: function (self, slide, DOMObject) {
        const holder = self.data.mediaHolder.holder;
        const sourcesIndexes = self.getSourcesIndexes.all(slide);
        const loader = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
        const totalSlides = self.data.total_slides;

        if (totalSlides >= 3) {
            let sourceHolderPrevious = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
            sourceHolderPrevious.style.transform = 'translate(' + -self.data.slideDistance * window.innerWidth + 'px,0)';
            sourceHolderPrevious.innerHTML = loader;
            self.data.sources[sourcesIndexes.previous] = sourceHolderPrevious;
            holder.appendChild(sourceHolderPrevious);
        }

        if (totalSlides >= 1) {
            let sourceHolderCurrent = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
            sourceHolderCurrent.innerHTML = loader;
            self.data.sources[sourcesIndexes.current] = sourceHolderCurrent;
            holder.appendChild(sourceHolderCurrent);
        }

        if (totalSlides >= 2) {
            let sourceHolderNext = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
            sourceHolderNext.style.transform = 'translate(' + self.data.slideDistance * window.innerWidth + 'px,0)';
            sourceHolderNext.innerHTML = loader;

            self.data.sources[sourcesIndexes.next] = sourceHolderNext;
            holder.appendChild(sourceHolderNext);
        }
    },


    /**
     * Renders loader when loading a previous source
     * @param self
     * @param slide
     * @param DOMObject
     */
    renderHolderPrevious: function (self, slide, DOMObject) {
        const holder = self.data.mediaHolder.holder;
        const previousSourceIndex = self.getSourcesIndexes.previous(slide);

        // create holder and add a proper transform
        let sourceHolder = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
        sourceHolder.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
        const transformPrevious = -self.data.slideDistance * window.innerWidth;
        sourceHolder.style.transform = 'translate(' + transformPrevious + 'px,0)';


        self.data.sources[previousSourceIndex] = sourceHolder;
        holder.insertAdjacentElement('afterbegin', sourceHolder);
    },


    /**
     * Renders loader when loading a next source
     * @param self
     * @param slide
     * @param DOMObject
     */
    renderHolderNext: function (self, slide, DOMObject) {
        const holder = self.data.mediaHolder.holder;
        const nextSourceIndex = self.getSourcesIndexes.next(slide);

        // create holder and add a proper transform
        let sourceHolder = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
        sourceHolder.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
        sourceHolder.style.transform = 'translate(' + self.data.slideDistance * window.innerWidth + 'px,0)';

        self.data.sources[nextSourceIndex] = sourceHolder;
        holder.appendChild(sourceHolder);
    },


    /**
     * Change slide to previous after clicking button
     * @param self
     * @param slide
     * @param DOMObject
     */
    previousSlideViaButton: function (self, previousSlide) {
        if (previousSlide === 1) {
            self.data.slide = self.data.total_slides;
        } else {
            self.data.slide -= 1;
        }

        self.stopVideos();
        self.data.updateSlideNumber(self.data.slide);
        const newSourcesIndexes = self.getSourcesIndexes.all(self.data.slide);

        if (typeof self.data.sources[newSourcesIndexes.previous] === "undefined") {
            self.loadsources('previous', self.data.slide);
        }

        const sources = self.data.sources;
        const currentSource = sources[newSourcesIndexes.current];
        const nextSource = sources[newSourcesIndexes.next];

        nextSource.classList.remove('fslightbox-transform-transition');
        currentSource.classList.remove('fslightbox-transform-transition');
        sources[newSourcesIndexes.previous].classList.remove('fslightbox-transform-transition');

        nextSource.classList.remove('fslightbox-fade-in-animation');
        void nextSource.offsetWidth;
        nextSource.classList.add('fslightbox-fade-in-animation');


        currentSource.classList.remove('fslightbox-fade-in-animation');
        void currentSource.offsetWidth;
        currentSource.classList.add('fslightbox-fade-in-animation');

        currentSource.style.transform = 'translate(0,0)';
        const plusTransform = self.data.slideDistance * window.innerWidth;
        nextSource.style.transform = 'translate(' + plusTransform + 'px,0)';
    },


    /**
     * Change slide to next after clicking button
     * @param self
     * @param previousSlide
     */
    nextSlideViaButton: function (self, previousSlide) {
        if (previousSlide === self.data.total_slides) {
            self.data.slide = 1;
        } else {
            self.data.slide += 1;
        }

        self.stopVideos();
        self.data.updateSlideNumber(self.data.slide);
        const newSourcesIndexes = self.getSourcesIndexes.all(self.data.slide);

        if (typeof self.data.sources[newSourcesIndexes.next] === "undefined") {
            self.loadsources('next', self.data.slide);
        }

        const sources = self.data.sources;
        const currentSource = sources[newSourcesIndexes.current];
        const previousSource = sources[newSourcesIndexes.previous];

        previousSource.classList.remove('fslightbox-transform-transition');
        currentSource.classList.remove('fslightbox-transform-transition');
        sources[newSourcesIndexes.next].classList.remove('fslightbox-transform-transition');

        previousSource.classList.remove('fslightbox-fade-in-animation');
        void previousSource.offsetWidth;
        previousSource.classList.add('fslightbox-fade-in-animation');


        currentSource.classList.remove('fslightbox-fade-in-animation');
        void currentSource.offsetWidth;
        currentSource.classList.add('fslightbox-fade-in-animation');


        currentSource.style.transform = 'translate(0,0)';
        const minusTransform = -self.data.slideDistance * window.innerWidth;
        previousSource.style.transform = 'translate(' + minusTransform + 'px,0)';
    }


};
},{}],2:[function(require,module,exports){
module.exports = function (self, DOMObject) {

    //to these elements are added mouse events
    const elements = {
        "mediaHolder": self.data.mediaHolder.holder,
        "nav": self.data.nav
    };
    //sources are transformed
    const sources = self.data.sources;
    const mediaHolder = self.data.mediaHolder.holder;

    //we will hover all windows with div with high z-index to be sure mouseup is triggered
    const invisibleHover = new DOMObject('div').addClassesAndCreate(['fslightbox-invisible-hover']);

    let is_dragging = false;
    let mouseDownClientX;
    let difference;
    let slideaAble = true;

    let eventListeners = {


        mouseDownEvent: function (e) {

            // tag can't be video cause it would be unclickable in microsoft browsers
            if(e.target.tagName !== 'VIDEO') {
                e.preventDefault();
            }

            for (let elem in elements) {
                elements[elem].classList.add('fslightbox-cursor-grabbing');
            }
            is_dragging = true;
            mouseDownClientX = e.clientX;
            difference = 0;
        },


        mouseUpEvent: function () {
            if(mediaHolder.contains(invisibleHover)) {
                mediaHolder.removeChild(invisibleHover);
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


                const slideNextTransform = self.data.slideDistance * window.innerWidth;
                sources[sourcesIndexes.current].style.transform = 'translate(' + slideNextTransform + 'px,0)';
                sources[sourcesIndexes.previous].style.transform = 'translate(0,0)';

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

                const slideBackTransform = -self.data.slideDistance * window.innerWidth;
                sources[sourcesIndexes.current].style.transform = 'translate(' + slideBackTransform + 'px,0)';
                sources[sourcesIndexes.next].style.transform = 'translate(0,0)';

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

            mediaHolder.appendChild(invisibleHover);

            difference = e.clientX - mouseDownClientX;
            const previous = -self.data.slideDistance * window.innerWidth + difference;
            const next = self.data.slideDistance * window.innerWidth + difference;
            const sourcesIndexes = self.getSourcesIndexes.all(self.data.slide);

            // slide sources
            sources[sourcesIndexes.previous].style.transform = 'translate(' + previous + 'px,0)';
            sources[sourcesIndexes.current].style.transform = 'translate(' + difference + 'px,0)';
            sources[sourcesIndexes.next].style.transform = 'translate(' + next + 'px,0)';
        }
    };


    for (let elem in elements) {
        elements[elem].addEventListener('mousedown', eventListeners.mouseDownEvent);
    }
    window.addEventListener('mouseup', eventListeners.mouseUpEvent);
    //we will hover all windows with div with high z-index to be sure mouseup is triggered
    invisibleHover.addEventListener('mouseup', eventListeners.mouseUpEvent);
    invisibleHover.addEventListener('mousedown', eventListeners.mouseUpEvent);
    window.addEventListener('mousemove', eventListeners.mouseMoveEvent);
};
},{}],3:[function(require,module,exports){
window.fsLightboxObject = function () {

    /**
     * @constructor
     */
    this.data = {
        slide: 1,
        total_slides: 6,
        slideDistance: 1.3,
        slideCounter: true,
        slideButtons: true,
        isFirstTimeLoad: false,
        moveSlidesViaDrag: true,
        isRenderingToolbarButtons: {
            "close": true
        },

        urls: [
            "images/1.jpeg",
            "images/2.jpg",
            //"images/3.jpeg",
            "films/film.mp4",
            "images/4.jpeg",
            "images/5.jpg",
            "https://www.youtube.com/watch?v=WlcO9d0flNY&t=1s",
            //"images/6.jpg",
        ],
        sources: [],
        sourcesLoaded: [],
        rememberedSourcesDimensions: [],
        videos: [],

        mediaHolder: {},
        nav: {},
        toolbar: {},
        slideCounterElem: {},

        onResizeEvent: '',
        updateSlideNumber: function () {
        }
    };


    /**
     * @type {Window}
     */
    let self = this;


    this.init = function () {
        self.data.onResizeEvent = new onResizeEvent();
        new self.dom();
        require('./changeSlideByDragging.js')(self, DOMObject);
    };


    /**
     * Render all library elements
     * @constructor
     */
    this.dom = function () {
        require('./renderDOM.js')(self, DOMObject);
    };


    this.clear = function () {
        document.getElementById('fslightbox-container').remove();
    };


    /**
     * Generate dom element with classes
     * @constructor
     */
    function DOMObject(tag) {
        this.elem = document.createElement(tag);

        this.addClassesAndCreate = function (classes) {
            for (let index in classes) {
                this.elem.classList.add(classes[index]);
            }
            return this.elem
        }
    }


    /**
     * Object that contains all actions that fslightbox is doing during running
     * @constructor
     */
    function onResizeEvent() {
        let _this = this;

        const sources = self.data.sources;
        const rememberedSourceDimension = self.data.rememberedSourcesDimensions;

        this.mediaHolderDimensions = function () {
            self.data.mediaHolder.holder.style.width = window.innerWidth + 'px';
            self.data.mediaHolder.holder.style.height = window.innerHeight + 'px';
        };

        this.sourcesDimensions = function () {

            const stageSourcesIndexes = self.getSourcesIndexes.all(self.data.slide);

            for (let sourceIndex in sources) {

                // add tranforms to stage sources
                const stageSourcePreviousTransform = -self.data.slideDistance * window.innerWidth;
                sources[stageSourcesIndexes.previous].style.transform = 'translate(' + stageSourcePreviousTransform + 'px,0)';
                sources[stageSourcesIndexes.current].style.transform = 'translate(0,0)';
                sources[stageSourcesIndexes.next].style.transform = 'translate(' + self.data.slideDistance * window.innerWidth + 'px,0)';

                const elem = sources[sourceIndex].firstChild;

                let sourceWidth = rememberedSourceDimension[sourceIndex].width;
                let sourceHeight = rememberedSourceDimension[sourceIndex].height;

                const coefficient = sourceWidth / sourceHeight;
                const deviceWidth = window.innerWidth;
                const deviceHeight = parseInt(self.data.mediaHolder.holder.style.height);
                let newHeight = deviceWidth / coefficient;
                if (newHeight < deviceHeight - 60) {
                    elem.style.height = newHeight + "px";
                    elem.style.width = deviceWidth + "px";
                } else {
                    newHeight = deviceHeight - 60;
                    elem.style.height = newHeight + "px";
                    elem.style.width = newHeight * coefficient + "px";
                }
            }
        };

        window.onresize = function () {
            _this.mediaHolderDimensions();
            _this.sourcesDimensions();
        };
    }


    /**
     * SVGIcon object with getSVGIcon method which return <svg> element with <path> child
     * @returns {Element}
     * @constructor
     */
    this.SVGIcon = function () {
        /**
         *  <svg> with added 'fslightbox-svg-icon' class
         */
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");

        /**
         * child of svg empty <path>
         */
        this.path = document.createElementNS('http://www.w3.org/2000/svg', "path");
        this.svg.setAttributeNS(null, 'class', 'fslightbox-svg-icon');
        this.svg.setAttributeNS(null, 'viewBox', '0 0 20 20');


        /**
         * Returns DOM <svg> icon containing <path> child with d attribute from parameter
         * @param d
         * @returns {*}
         */
        this.getSVGIcon = function (d) {
            this.path.setAttributeNS(null, 'd', d);
            this.svg.appendChild(this.path);
            return this.svg;
        }
    };


    /**
     * Slide counter object - upper left corner of fsLightbox
     * @constructor
     */
    this.slideCounterElem = function () {
        let numberContainer = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-number-container']);
        self.data.slideCounterElem = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-slide-number']);

        self.data.slideCounterElem.innerHTML = self.data.slide;
        self.data.slideCounterElem.id = 'current_slide';

        let space = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-slide-number', 'fslightbox-slash']);
        space.innerHTML = '/';

        let slides = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-slide-number']);
        slides.innerHTML = self.data.total_slides;

        numberContainer.appendChild(self.data.slideCounterElem);
        numberContainer.appendChild(space);
        numberContainer.appendChild(slides);

        // this method is called after switching slides
        self.data.updateSlideNumber = function (number) {
            self.data.slide = number;
            self.data.slideCounterElem.innerHTML = number;
        };

        this.renderSlideCounter = function (nav) {
            nav.appendChild(numberContainer);
        }
    };


    /**
     * Toolbar button
     * @constructor
     */
    this.toolbarButton = function () {
        this.button = new DOMObject('div').addClassesAndCreate(['fslightbox-toolbar-button', 'button-style']);

        this.addSVGIcon = function (d) {
            let SVGIcon = new self.SVGIcon().getSVGIcon(d);
            this.button.appendChild(
                SVGIcon
            )
        };

        this.remove = function () {
            console.log(this.button);
        }
    };


    /**
     * Toolbar object which contains toolbar buttons
     * @constructor
     */
    this.toolbar = function () {
        this.toolbarElem = new DOMObject('div').addClassesAndCreate(['fslightbox-toolbar']);

        this.renderDefaultButtons = function () {
            let shouldRenderButtons = self.data.isRenderingToolbarButtons;

            if (shouldRenderButtons.close === true) {
                let button = new DOMObject('div').addClassesAndCreate(['fslightbox-toolbar-button', 'button-style']);
                let svg = new self.SVGIcon().getSVGIcon('M 11.469 10 l 7.08 -7.08 c 0.406 -0.406 0.406 -1.064 0 -1.469 c -0.406 -0.406 -1.063 -0.406 -1.469 0 L 10 8.53 l -7.081 -7.08 c -0.406 -0.406 -1.064 -0.406 -1.469 0 c -0.406 0.406 -0.406 1.063 0 1.469 L 8.531 10 L 1.45 17.081 c -0.406 0.406 -0.406 1.064 0 1.469 c 0.203 0.203 0.469 0.304 0.735 0.304 c 0.266 0 0.531 -0.101 0.735 -0.304 L 10 11.469 l 7.08 7.081 c 0.203 0.203 0.469 0.304 0.735 0.304 c 0.267 0 0.532 -0.101 0.735 -0.304 c 0.406 -0.406 0.406 -1.064 0 -1.469 L 11.469 10 Z');
                button.appendChild(svg);
                this.toolbarElem.appendChild(button);
            }
        };

        this.renderToolbar = function (nav) {
            this.renderDefaultButtons();
            nav.appendChild(this.toolbarElem);
        };

        this.addButtonToToolbar = function () {
            let toolbarButton = new self.toolbarButton();
        };
    };


    /**
     * Div that holds source elem
     */
    this.mediaHolder = function () {
        this.holder = new DOMObject('div').addClassesAndCreate(['fslightbox-media-holder']);
        this.holder.style.width = window.innerWidth + 'px';
        this.holder.style.height = window.innerHeight + 'px';
        this.renderHolder = function (container) {
            container.appendChild(this.holder);
        };
    };


    /**
     * Return object with stage sources indexes depending on provided slide
     * @param slide
     * @returns {{previous: number, current: number, next: number}}
     */
    this.getSourcesIndexes = {

        previous: function (slide) {
            let previousSlideIndex;
            const arrayIndex = slide - 1;

            // previous
            if (arrayIndex === 0) {
                previousSlideIndex = self.data.total_slides - 1;
            } else {
                previousSlideIndex = arrayIndex - 1;
            }

            return previousSlideIndex;
        },


        next: function (slide) {

            let nextSlideIndex;
            const arrayIndex = slide - 1;

            //next
            if (slide === self.data.total_slides) {
                nextSlideIndex = 0;
            } else {
                nextSlideIndex = arrayIndex + 1;
            }

            return nextSlideIndex;
        },


        all: function (slide) {
            // sources are stored in array indexed from 0
            const arrayIndex = slide - 1;
            const sourcesIndexes = {
                previous: 0,
                current: 0,
                next: 0
            };

            // previous
            if (arrayIndex === 0) {
                sourcesIndexes.previous = self.data.total_slides - 1;
            } else {
                sourcesIndexes.previous = arrayIndex - 1;
            }

            // current
            sourcesIndexes.current = arrayIndex;

            //next
            if (slide === self.data.total_slides) {
                sourcesIndexes.next = 0;
            } else {
                sourcesIndexes.next = arrayIndex + 1;
            }

            return sourcesIndexes;
        },
    };


    this.stopVideos = function () {

        const videos = self.data.videos;

        // true is html5 video, false is youtube video
        for (let videoIndex in videos) {

            if (videos[videoIndex] === true) {
                if (typeof self.data.sources[videoIndex].firstChild.pause !== "undefined") {
                    self.data.sources[videoIndex].firstChild.pause();
                }
            }
            else {
                self.data.sources[videoIndex].firstChild.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
            }
        }
    };


    /**
     * Methods that appends sources to mediaHolder depending on action
     * @type {{initialAppend, previousAppend, nextAppend}|*}
     */
    this.appendMethods = require('./appendSource');


    /**
     * Display source (images, HTML5 video, YouTube video) depending on given url from user
     * Or if display is initial display 3 initial sources
     * If there are >= 3 initial sources there will be always 3 in stage
     * @param url
     * @param typeOfLoad
     * @returns {module.exports}
     */
    this.loadsources = function (typeOfLoad, slide) {
        const loadsourcemodule = require("./loadSource.js");
        return new loadsourcemodule(self, DOMObject, typeOfLoad, slide);
    };
}
;


!function () {
}(document, window);

},{"./appendSource":1,"./changeSlideByDragging.js":2,"./loadSource.js":4,"./renderDOM.js":5}],4:[function(require,module,exports){
module.exports = function (self, DOMObject, typeOfLoad, slide) {

    const _this = this;
    const sourcesIndexes = self.getSourcesIndexes.all(slide);
    const urls = self.data.urls;
    const sources = self.data.sources;
    let tempSources = {};

    let sourceDimensions = function (sourceElem, sourceWidth, sourceHeight) {

        const coefficient = sourceWidth / sourceHeight;
        const deviceWidth = window.innerWidth;
        const deviceHeight = parseInt(self.data.mediaHolder.holder.style.height);
        let newHeight = deviceWidth / coefficient;
        if (newHeight < deviceHeight - 60) {
            sourceElem.style.height = newHeight + "px";
            sourceElem.style.width = deviceWidth + "px";
        } else {
            newHeight = deviceHeight - 60;
            sourceElem.style.height = newHeight + "px";
            sourceElem.style.width = newHeight * coefficient + "px";
        }
    };


    /**
     * add fade in class and dimension function
     */
    let onloadListener = function (sourceElem, sourceWidth, sourceHeight, arrayIndex) {

        let sourceHolder = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);

        //normal source dimensions needs to be stored in array
        //it will be needed when resizing a source
        self.data.rememberedSourcesDimensions[arrayIndex] = {
            "width": sourceWidth,
            "height": sourceHeight
        };

        // set dimensions for the 1st time
        sourceDimensions(sourceElem, sourceWidth, sourceHeight);

        sourceHolder.appendChild(sourceElem);
        const previousSource = sources[sourcesIndexes.previous];
        const currentSource = sources[sourcesIndexes.current];
        const nextSource = sources[sourcesIndexes.next];

        switch (typeOfLoad) {
            case 'initial':
                // add to temp array because loading is asynchronous so we can't depend on load order
                tempSources[arrayIndex] = sourceHolder;

                if(urls.length >= 3) {
                    // append sources when all 3 are loaded
                    if(Object.keys(tempSources).length >= 3) {

                        previousSource.innerHTML = '';
                        previousSource.appendChild(tempSources[sourcesIndexes.previous].firstChild);
                        void currentSource.firstChild.offsetWidth;
                        previousSource.firstChild.classList.add('fslightbox-fade-in');

                        currentSource.innerHTML = '';
                        currentSource.appendChild(tempSources[sourcesIndexes.current].firstChild);
                        void currentSource.firstChild.offsetWidth;
                        currentSource.firstChild.classList.add('fslightbox-fade-in');

                        nextSource.innerHTML = '';
                        nextSource.appendChild(tempSources[sourcesIndexes.next].firstChild);
                        void currentSource.firstChild.offsetWidth;
                        nextSource.firstChild.classList.add('fslightbox-fade-in');
                    }
                }
                break;
            case 'next':
                // replace loader with loaded source
                nextSource.innerHTML = '';
                nextSource.appendChild(sourceElem);
                void currentSource.firstChild.offsetWidth;
                nextSource.firstChild.classList.add('fslightbox-fade-in');
                break;
            case 'previous':
                // replace loader with loaded source
                previousSource.innerHTML = '';
                previousSource.appendChild(sourceElem);
                void currentSource.firstChild.offsetWidth;
                previousSource.firstChild.classList.add('fslightbox-fade-in');
                break;
        }
    };


    this.loadYoutubevideo = function (videoId, arrayIndex) {
        let iframe = new DOMObject('iframe').addClassesAndCreate(['fslightbox-single-source']);
        iframe.src = '//www.youtube.com/embed/' + videoId + '?enablejsapi=1';
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('frameborder', '0');
        iframe.onmouseup = function () {
            console.log('japierdoel');
        };
        self.data.mediaHolder.holder.appendChild(iframe);
        onloadListener(iframe, 1920, 1080, arrayIndex);
    };


    this.imageLoad = function (src, arrayIndex) {
        let sourceElem = new DOMObject('img').addClassesAndCreate(['fslightbox-single-source']);
        sourceElem.src = src;
        sourceElem.addEventListener('load', function () {
            onloadListener(sourceElem, this.width, this.height, arrayIndex);
        });
    };


    this.videoLoad = function (src, arrayIndex) {
        let videoElem = new DOMObject('video').addClassesAndCreate(['fslightbox-single-source']);
        let source = new DOMObject('source').elem;
        source.src = src;
        videoElem.innerText = 'Sorry, your browser doesn\'t support embedded videos, <a\n' +
            '            href="http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4">download</a> and watch\n' +
            '        with your favorite video player!';

        videoElem.setAttribute('controls', '');
        videoElem.appendChild(source);
        videoElem.addEventListener('loadedmetadata', function () {
            onloadListener(videoElem, this.videoWidth, this.videoHeight, arrayIndex);
        });
    };

    this.invalidFile = function (arrayIndex) {
        let invalidFileWrapper = new DOMObject('div').addClassesAndCreate(['fslightbox-invalid-file-wrapper']);
        invalidFileWrapper.innerHTML = 'Invalid file';

        onloadListener(invalidFileWrapper, window.innerWidth, window.innerHeight, arrayIndex);
    };


    this.createSourceElem = function (sourceUrl) {
        const parser = document.createElement('a');
        const indexOfSource = self.data.urls.indexOf(sourceUrl);

        parser.href = sourceUrl;

        function getId(sourceUrl) {
            let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            let match = sourceUrl.match(regExp);

            if (match && match[2].length == 11) {
                return match[2];
            } else {
                return 'error';
            }
        }

        if (parser.hostname === 'www.youtube.com') {
            self.data.videos[indexOfSource] = false;
            this.loadYoutubevideo(getId(sourceUrl), indexOfSource);
        } else {
            const xhr = new XMLHttpRequest();
            xhr.onloadstart = function () {
                xhr.responseType = "blob";
            };

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {

                        //check what type of file provided from link
                        let responseType = xhr.response.type;
                        responseType.indexOf('/');
                        responseType = responseType.slice(0, responseType.indexOf('/'));

                        if (responseType === 'image') {
                            _this.imageLoad(URL.createObjectURL(xhr.response), indexOfSource);
                        }

                        else if (responseType === 'video') {
                            _this.videoLoad(URL.createObjectURL(xhr.response), indexOfSource);
                            self.data.videos[indexOfSource] = true;
                        }

                        else {
                            _this.invalidFile(indexOfSource);
                        }
                    }
                }
            };

            xhr.open('get', sourceUrl, true);
            xhr.send(null);
        }
    };


    switch (typeOfLoad) {
        case 'initial':
            //append loader when loading initially
            self.appendMethods.renderHolderInitial(self,slide,DOMObject);

            if(urls.length >= 3) {
                this.createSourceElem(urls[sourcesIndexes.previous]);
                this.createSourceElem(urls[sourcesIndexes.current]);
                this.createSourceElem(urls[sourcesIndexes.next]);
                break;
            }
            break;

        case 'previous':
            // append loader when loading a next source
            self.appendMethods.renderHolderPrevious(self, slide, DOMObject);

            // load previous source
            this.createSourceElem(urls[sourcesIndexes.previous]);
            break;

        case 'next':
            // append loader when loading a next source
            self.appendMethods.renderHolderNext(self, slide, DOMObject);

            //load next source
            this.createSourceElem(urls[sourcesIndexes.next]);
            break;
    }
};
},{}],5:[function(require,module,exports){
module.exports = function (self, DOMObject) {
    let privateMethods = {
        renderNav: function (container) {
            self.data.nav = new DOMObject('div').addClassesAndCreate(['fslightbox-nav']);
            new self.toolbar().renderToolbar(self.data.nav);

            if (self.data.slideCounter === true) {
                new self.slideCounterElem().renderSlideCounter(self.data.nav);
            }

            container.appendChild(self.data.nav);

        },
        renderSlideButtons: function (container) {
            if (self.data.slideButtons === false) {
                return false;
            }

            //render left btn
            let left_btn_container = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn-container']);
            let btn = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn', 'button-style']);
            btn.appendChild(
                new self.SVGIcon().getSVGIcon('M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z')
            );
            container.appendChild(left_btn_container);

            //go to previous slide onclick
            left_btn_container.onclick = function () {
                self.appendMethods.previousSlideViaButton(self,self.data.slide);
            };

            left_btn_container.appendChild(btn);
            let right_btn_container = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn-container', 'fslightbox-slide-btn-right-container']);
            btn = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn', 'button-style']);
            btn.appendChild(
                new self.SVGIcon().getSVGIcon('M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z')
            );

            //go to next slide onclick
            right_btn_container.onclick = function () {
                self.appendMethods.nextSlideViaButton(self,self.data.slide);
            };
            right_btn_container.appendChild(btn);
            container.appendChild(right_btn_container);
        }
    };

    //disable scrolling
    document.body.classList.add('fslightbox-open');

    //create container
    let container = new DOMObject('div').addClassesAndCreate(['fslightbox-container']);
    container.id = "fslightbox-container";
    document.body.appendChild(container);

    //render slide buttons and nav(toolbar)
    privateMethods.renderNav(container);
    privateMethods.renderSlideButtons(container);

    self.data.mediaHolder = new self.mediaHolder();
    self.data.mediaHolder.renderHolder(container);

    self.data.isfirstTimeLoad = true;
    self.loadsources('initial', self.data.slide);
};
},{}]},{},[3,5,4,1,2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwZW5kU291cmNlLmpzIiwic3JjL2pzL2NoYW5nZVNsaWRlQnlEcmFnZ2luZy5qcyIsInNyYy9qcy9pbmRleC5qcyIsInNyYy9qcy9sb2FkU291cmNlLmpzIiwic3JjL2pzL3JlbmRlckRPTS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1WEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgbG9hZGVyIHdoZW4gbG9hZGluZyBmc0xpZ2h0Ym94IGluaXRpYWxseVxyXG4gICAgICogQHBhcmFtIHNlbGZcclxuICAgICAqIEBwYXJhbSBzbGlkZVxyXG4gICAgICogQHBhcmFtIERPTU9iamVjdFxyXG4gICAgICovXHJcbiAgICByZW5kZXJIb2xkZXJJbml0aWFsOiBmdW5jdGlvbiAoc2VsZiwgc2xpZGUsIERPTU9iamVjdCkge1xyXG4gICAgICAgIGNvbnN0IGhvbGRlciA9IHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXI7XHJcbiAgICAgICAgY29uc3Qgc291cmNlc0luZGV4ZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzbGlkZSk7XHJcbiAgICAgICAgY29uc3QgbG9hZGVyID0gJzxkaXYgY2xhc3M9XCJsZHMtcmluZ1wiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+JztcclxuICAgICAgICBjb25zdCB0b3RhbFNsaWRlcyA9IHNlbGYuZGF0YS50b3RhbF9zbGlkZXM7XHJcblxyXG4gICAgICAgIGlmICh0b3RhbFNsaWRlcyA+PSAzKSB7XHJcbiAgICAgICAgICAgIGxldCBzb3VyY2VIb2xkZXJQcmV2aW91cyA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNvdXJjZS1ob2xkZXInXSk7XHJcbiAgICAgICAgICAgIHNvdXJjZUhvbGRlclByZXZpb3VzLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIC1zZWxmLmRhdGEuc2xpZGVEaXN0YW5jZSAqIHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4LDApJztcclxuICAgICAgICAgICAgc291cmNlSG9sZGVyUHJldmlvdXMuaW5uZXJIVE1MID0gbG9hZGVyO1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEuc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10gPSBzb3VyY2VIb2xkZXJQcmV2aW91cztcclxuICAgICAgICAgICAgaG9sZGVyLmFwcGVuZENoaWxkKHNvdXJjZUhvbGRlclByZXZpb3VzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0b3RhbFNsaWRlcyA+PSAxKSB7XHJcbiAgICAgICAgICAgIGxldCBzb3VyY2VIb2xkZXJDdXJyZW50ID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc291cmNlLWhvbGRlciddKTtcclxuICAgICAgICAgICAgc291cmNlSG9sZGVyQ3VycmVudC5pbm5lckhUTUwgPSBsb2FkZXI7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdID0gc291cmNlSG9sZGVyQ3VycmVudDtcclxuICAgICAgICAgICAgaG9sZGVyLmFwcGVuZENoaWxkKHNvdXJjZUhvbGRlckN1cnJlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRvdGFsU2xpZGVzID49IDIpIHtcclxuICAgICAgICAgICAgbGV0IHNvdXJjZUhvbGRlck5leHQgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zb3VyY2UtaG9sZGVyJ10pO1xyXG4gICAgICAgICAgICBzb3VyY2VIb2xkZXJOZXh0LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIHNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGggKyAncHgsMCknO1xyXG4gICAgICAgICAgICBzb3VyY2VIb2xkZXJOZXh0LmlubmVySFRNTCA9IGxvYWRlcjtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdID0gc291cmNlSG9sZGVyTmV4dDtcclxuICAgICAgICAgICAgaG9sZGVyLmFwcGVuZENoaWxkKHNvdXJjZUhvbGRlck5leHQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyBsb2FkZXIgd2hlbiBsb2FkaW5nIGEgcHJldmlvdXMgc291cmNlXHJcbiAgICAgKiBAcGFyYW0gc2VsZlxyXG4gICAgICogQHBhcmFtIHNsaWRlXHJcbiAgICAgKiBAcGFyYW0gRE9NT2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHJlbmRlckhvbGRlclByZXZpb3VzOiBmdW5jdGlvbiAoc2VsZiwgc2xpZGUsIERPTU9iamVjdCkge1xyXG4gICAgICAgIGNvbnN0IGhvbGRlciA9IHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXI7XHJcbiAgICAgICAgY29uc3QgcHJldmlvdXNTb3VyY2VJbmRleCA9IHNlbGYuZ2V0U291cmNlc0luZGV4ZXMucHJldmlvdXMoc2xpZGUpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgaG9sZGVyIGFuZCBhZGQgYSBwcm9wZXIgdHJhbnNmb3JtXHJcbiAgICAgICAgbGV0IHNvdXJjZUhvbGRlciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNvdXJjZS1ob2xkZXInXSk7XHJcbiAgICAgICAgc291cmNlSG9sZGVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwibGRzLXJpbmdcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtUHJldmlvdXMgPSAtc2VsZi5kYXRhLnNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICBzb3VyY2VIb2xkZXIuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgdHJhbnNmb3JtUHJldmlvdXMgKyAncHgsMCknO1xyXG5cclxuXHJcbiAgICAgICAgc2VsZi5kYXRhLnNvdXJjZXNbcHJldmlvdXNTb3VyY2VJbmRleF0gPSBzb3VyY2VIb2xkZXI7XHJcbiAgICAgICAgaG9sZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIHNvdXJjZUhvbGRlcik7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgbG9hZGVyIHdoZW4gbG9hZGluZyBhIG5leHQgc291cmNlXHJcbiAgICAgKiBAcGFyYW0gc2VsZlxyXG4gICAgICogQHBhcmFtIHNsaWRlXHJcbiAgICAgKiBAcGFyYW0gRE9NT2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHJlbmRlckhvbGRlck5leHQ6IGZ1bmN0aW9uIChzZWxmLCBzbGlkZSwgRE9NT2JqZWN0KSB7XHJcbiAgICAgICAgY29uc3QgaG9sZGVyID0gc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlcjtcclxuICAgICAgICBjb25zdCBuZXh0U291cmNlSW5kZXggPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLm5leHQoc2xpZGUpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgaG9sZGVyIGFuZCBhZGQgYSBwcm9wZXIgdHJhbnNmb3JtXHJcbiAgICAgICAgbGV0IHNvdXJjZUhvbGRlciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNvdXJjZS1ob2xkZXInXSk7XHJcbiAgICAgICAgc291cmNlSG9sZGVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwibGRzLXJpbmdcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgc291cmNlSG9sZGVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIHNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGggKyAncHgsMCknO1xyXG5cclxuICAgICAgICBzZWxmLmRhdGEuc291cmNlc1tuZXh0U291cmNlSW5kZXhdID0gc291cmNlSG9sZGVyO1xyXG4gICAgICAgIGhvbGRlci5hcHBlbmRDaGlsZChzb3VyY2VIb2xkZXIpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2Ugc2xpZGUgdG8gcHJldmlvdXMgYWZ0ZXIgY2xpY2tpbmcgYnV0dG9uXHJcbiAgICAgKiBAcGFyYW0gc2VsZlxyXG4gICAgICogQHBhcmFtIHNsaWRlXHJcbiAgICAgKiBAcGFyYW0gRE9NT2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHByZXZpb3VzU2xpZGVWaWFCdXR0b246IGZ1bmN0aW9uIChzZWxmLCBwcmV2aW91c1NsaWRlKSB7XHJcbiAgICAgICAgaWYgKHByZXZpb3VzU2xpZGUgPT09IDEpIHtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlID0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGUgLT0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYuc3RvcFZpZGVvcygpO1xyXG4gICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgIGNvbnN0IG5ld1NvdXJjZXNJbmRleGVzID0gc2VsZi5nZXRTb3VyY2VzSW5kZXhlcy5hbGwoc2VsZi5kYXRhLnNsaWRlKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxmLmRhdGEuc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5wcmV2aW91c10gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlcygncHJldmlvdXMnLCBzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IHNlbGYuZGF0YS5zb3VyY2VzO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTb3VyY2UgPSBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLmN1cnJlbnRdO1xyXG4gICAgICAgIGNvbnN0IG5leHRTb3VyY2UgPSBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLm5leHRdO1xyXG5cclxuICAgICAgICBuZXh0U291cmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcblxyXG4gICAgICAgIG5leHRTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1mYWRlLWluLWFuaW1hdGlvbicpO1xyXG4gICAgICAgIHZvaWQgbmV4dFNvdXJjZS5vZmZzZXRXaWR0aDtcclxuICAgICAgICBuZXh0U291cmNlLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbi1hbmltYXRpb24nKTtcclxuXHJcblxyXG4gICAgICAgIGN1cnJlbnRTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1mYWRlLWluLWFuaW1hdGlvbicpO1xyXG4gICAgICAgIHZvaWQgY3VycmVudFNvdXJjZS5vZmZzZXRXaWR0aDtcclxuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbi1hbmltYXRpb24nKTtcclxuXHJcbiAgICAgICAgY3VycmVudFNvdXJjZS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKDAsMCknO1xyXG4gICAgICAgIGNvbnN0IHBsdXNUcmFuc2Zvcm0gPSBzZWxmLmRhdGEuc2xpZGVEaXN0YW5jZSAqIHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIG5leHRTb3VyY2Uuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgcGx1c1RyYW5zZm9ybSArICdweCwwKSc7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoYW5nZSBzbGlkZSB0byBuZXh0IGFmdGVyIGNsaWNraW5nIGJ1dHRvblxyXG4gICAgICogQHBhcmFtIHNlbGZcclxuICAgICAqIEBwYXJhbSBwcmV2aW91c1NsaWRlXHJcbiAgICAgKi9cclxuICAgIG5leHRTbGlkZVZpYUJ1dHRvbjogZnVuY3Rpb24gKHNlbGYsIHByZXZpb3VzU2xpZGUpIHtcclxuICAgICAgICBpZiAocHJldmlvdXNTbGlkZSA9PT0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlcykge1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGUgPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zbGlkZSArPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5zdG9wVmlkZW9zKCk7XHJcbiAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKHNlbGYuZGF0YS5zbGlkZSk7XHJcbiAgICAgICAgY29uc3QgbmV3U291cmNlc0luZGV4ZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzZWxmLmRhdGEuc2xpZGUpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHNlbGYuZGF0YS5zb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLm5leHRdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHNlbGYubG9hZHNvdXJjZXMoJ25leHQnLCBzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IHNlbGYuZGF0YS5zb3VyY2VzO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTb3VyY2UgPSBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLmN1cnJlbnRdO1xyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzU291cmNlID0gc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5wcmV2aW91c107XHJcblxyXG4gICAgICAgIHByZXZpb3VzU291cmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLm5leHRdLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuXHJcbiAgICAgICAgcHJldmlvdXNTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1mYWRlLWluLWFuaW1hdGlvbicpO1xyXG4gICAgICAgIHZvaWQgcHJldmlvdXNTb3VyY2Uub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgcHJldmlvdXNTb3VyY2UuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1mYWRlLWluLWFuaW1hdGlvbicpO1xyXG5cclxuXHJcbiAgICAgICAgY3VycmVudFNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LWZhZGUtaW4tYW5pbWF0aW9uJyk7XHJcbiAgICAgICAgdm9pZCBjdXJyZW50U291cmNlLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIGN1cnJlbnRTb3VyY2UuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1mYWRlLWluLWFuaW1hdGlvbicpO1xyXG5cclxuXHJcbiAgICAgICAgY3VycmVudFNvdXJjZS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKDAsMCknO1xyXG4gICAgICAgIGNvbnN0IG1pbnVzVHJhbnNmb3JtID0gLXNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgcHJldmlvdXNTb3VyY2Uuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgbWludXNUcmFuc2Zvcm0gKyAncHgsMCknO1xyXG4gICAgfVxyXG5cclxuXHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZiwgRE9NT2JqZWN0KSB7XHJcblxyXG4gICAgLy90byB0aGVzZSBlbGVtZW50cyBhcmUgYWRkZWQgbW91c2UgZXZlbnRzXHJcbiAgICBjb25zdCBlbGVtZW50cyA9IHtcclxuICAgICAgICBcIm1lZGlhSG9sZGVyXCI6IHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIsXHJcbiAgICAgICAgXCJuYXZcIjogc2VsZi5kYXRhLm5hdlxyXG4gICAgfTtcclxuICAgIC8vc291cmNlcyBhcmUgdHJhbnNmb3JtZWRcclxuICAgIGNvbnN0IHNvdXJjZXMgPSBzZWxmLmRhdGEuc291cmNlcztcclxuICAgIGNvbnN0IG1lZGlhSG9sZGVyID0gc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlcjtcclxuXHJcbiAgICAvL3dlIHdpbGwgaG92ZXIgYWxsIHdpbmRvd3Mgd2l0aCBkaXYgd2l0aCBoaWdoIHotaW5kZXggdG8gYmUgc3VyZSBtb3VzZXVwIGlzIHRyaWdnZXJlZFxyXG4gICAgY29uc3QgaW52aXNpYmxlSG92ZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1pbnZpc2libGUtaG92ZXInXSk7XHJcblxyXG4gICAgbGV0IGlzX2RyYWdnaW5nID0gZmFsc2U7XHJcbiAgICBsZXQgbW91c2VEb3duQ2xpZW50WDtcclxuICAgIGxldCBkaWZmZXJlbmNlO1xyXG4gICAgbGV0IHNsaWRlYUFibGUgPSB0cnVlO1xyXG5cclxuICAgIGxldCBldmVudExpc3RlbmVycyA9IHtcclxuXHJcblxyXG4gICAgICAgIG1vdXNlRG93bkV2ZW50OiBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgLy8gdGFnIGNhbid0IGJlIHZpZGVvIGNhdXNlIGl0IHdvdWxkIGJlIHVuY2xpY2thYmxlIGluIG1pY3Jvc29mdCBicm93c2Vyc1xyXG4gICAgICAgICAgICBpZihlLnRhcmdldC50YWdOYW1lICE9PSAnVklERU8nKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGVsZW0gaW4gZWxlbWVudHMpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzW2VsZW1dLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtY3Vyc29yLWdyYWJiaW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaXNfZHJhZ2dpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBtb3VzZURvd25DbGllbnRYID0gZS5jbGllbnRYO1xyXG4gICAgICAgICAgICBkaWZmZXJlbmNlID0gMDtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgbW91c2VVcEV2ZW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmKG1lZGlhSG9sZGVyLmNvbnRhaW5zKGludmlzaWJsZUhvdmVyKSkge1xyXG4gICAgICAgICAgICAgICAgbWVkaWFIb2xkZXIucmVtb3ZlQ2hpbGQoaW52aXNpYmxlSG92ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzb3VyY2VzSW5kZXhlcyA9IHNlbGYuZ2V0U291cmNlc0luZGV4ZXMuYWxsKHNlbGYuZGF0YS5zbGlkZSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBlbGVtIGluIGVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50c1tlbGVtXS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LWN1cnNvci1ncmFiYmluZycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpc19kcmFnZ2luZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgdXNlciBkaWRuJ3Qgc2xpZGUgbm9uZSBhbmltYXRpb24gc2hvdWxkIHdvcmtcclxuICAgICAgICAgICAgaWYgKGRpZmZlcmVuY2UgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy93ZSBjYW4gc2xpZGUgb25seSBpZiBwcmV2aW91cyBhbmltYXRpb24gaGFzIGZpbmlzaGVkXHJcbiAgICAgICAgICAgIGlmICghc2xpZGVhQWJsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNsaWRlYUFibGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCB0cmFuc2l0aW9uIGlmIHVzZXIgc2xpZGUgdG8gc291cmNlXHJcbiAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0uY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIHNsaWRlIHByZXZpb3VzXHJcbiAgICAgICAgICAgIGlmIChkaWZmZXJlbmNlID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBzbGlkZSBudW1iZXJcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmRhdGEuc2xpZGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnRvdGFsX3NsaWRlcyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEuc2xpZGUgLSAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2xpZGVOZXh0VHJhbnNmb3JtID0gc2VsZi5kYXRhLnNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgc2xpZGVOZXh0VHJhbnNmb3JtICsgJ3B4LDApJztcclxuICAgICAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoMCwwKSc7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IG5ldyBpbmRleGVzXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzSW5kZXhlcyA9IHNlbGYuZ2V0U291cmNlc0luZGV4ZXMuYWxsKHNlbGYuZGF0YS5zbGlkZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9pZiBzb3VyY2UgaXNuJ3QgYWxyZWFkeSBpbiBtZW1vcnlcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZi5kYXRhLnNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlcygncHJldmlvdXMnLCBzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gc2xpZGUgbmV4dFxyXG4gICAgICAgICAgICBlbHNlIGlmIChkaWZmZXJlbmNlIDwgMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdXBkYXRlIHNsaWRlIG51bWJlclxyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZSA9PT0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlcigxKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKHNlbGYuZGF0YS5zbGlkZSArIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWRlQmFja1RyYW5zZm9ybSA9IC1zZWxmLmRhdGEuc2xpZGVEaXN0YW5jZSAqIHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgICAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyBzbGlkZUJhY2tUcmFuc2Zvcm0gKyAncHgsMCknO1xyXG4gICAgICAgICAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKDAsMCknO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGdldCBuZXcgaW5kZXhlc1xyXG4gICAgICAgICAgICAgICAgc291cmNlc0luZGV4ZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgICAgICAgICAgLy9pZiBzb3VyY2UgaXNuJ3QgYWxyZWFkeSBpbiBtZW1vcnlcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZi5kYXRhLnNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYWRzb3VyY2VzKCduZXh0Jywgc2VsZi5kYXRhLnNsaWRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGlmZmVyZW5jZSA9IDA7XHJcbiAgICAgICAgICAgIHNlbGYuc3RvcFZpZGVvcygpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRyYW5zaXRpb24gYmVjYXVzZSB3aXRoIGRyYWdnaW5nIGl0IGxvb2tzIGF3ZnVsXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHVzZXIgc2hvdWxkbid0IGJlIGFibGUgdG8gc2xpZGUgd2hlbiBhbmltYXRpb24gaXMgcnVubmluZ1xyXG4gICAgICAgICAgICAgICAgc2xpZGVhQWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0sIDI1MCk7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIG1vdXNlTW92ZUV2ZW50OiBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpc19kcmFnZ2luZyB8fCAhc2xpZGVhQWJsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtZWRpYUhvbGRlci5hcHBlbmRDaGlsZChpbnZpc2libGVIb3Zlcik7XHJcblxyXG4gICAgICAgICAgICBkaWZmZXJlbmNlID0gZS5jbGllbnRYIC0gbW91c2VEb3duQ2xpZW50WDtcclxuICAgICAgICAgICAgY29uc3QgcHJldmlvdXMgPSAtc2VsZi5kYXRhLnNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aCArIGRpZmZlcmVuY2U7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHQgPSBzZWxmLmRhdGEuc2xpZGVEaXN0YW5jZSAqIHdpbmRvdy5pbm5lcldpZHRoICsgZGlmZmVyZW5jZTtcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlc0luZGV4ZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzZWxmLmRhdGEuc2xpZGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2xpZGUgc291cmNlc1xyXG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyBwcmV2aW91cyArICdweCwwKSc7XHJcbiAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgZGlmZmVyZW5jZSArICdweCwwKSc7XHJcbiAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgbmV4dCArICdweCwwKSc7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgZm9yIChsZXQgZWxlbSBpbiBlbGVtZW50cykge1xyXG4gICAgICAgIGVsZW1lbnRzW2VsZW1dLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGV2ZW50TGlzdGVuZXJzLm1vdXNlRG93bkV2ZW50KTtcclxuICAgIH1cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZXZlbnRMaXN0ZW5lcnMubW91c2VVcEV2ZW50KTtcclxuICAgIC8vd2Ugd2lsbCBob3ZlciBhbGwgd2luZG93cyB3aXRoIGRpdiB3aXRoIGhpZ2ggei1pbmRleCB0byBiZSBzdXJlIG1vdXNldXAgaXMgdHJpZ2dlcmVkXHJcbiAgICBpbnZpc2libGVIb3Zlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZXZlbnRMaXN0ZW5lcnMubW91c2VVcEV2ZW50KTtcclxuICAgIGludmlzaWJsZUhvdmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGV2ZW50TGlzdGVuZXJzLm1vdXNlVXBFdmVudCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZXZlbnRMaXN0ZW5lcnMubW91c2VNb3ZlRXZlbnQpO1xyXG59OyIsIndpbmRvdy5mc0xpZ2h0Ym94T2JqZWN0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHRoaXMuZGF0YSA9IHtcclxuICAgICAgICBzbGlkZTogMSxcclxuICAgICAgICB0b3RhbF9zbGlkZXM6IDYsXHJcbiAgICAgICAgc2xpZGVEaXN0YW5jZTogMS4zLFxyXG4gICAgICAgIHNsaWRlQ291bnRlcjogdHJ1ZSxcclxuICAgICAgICBzbGlkZUJ1dHRvbnM6IHRydWUsXHJcbiAgICAgICAgaXNGaXJzdFRpbWVMb2FkOiBmYWxzZSxcclxuICAgICAgICBtb3ZlU2xpZGVzVmlhRHJhZzogdHJ1ZSxcclxuICAgICAgICBpc1JlbmRlcmluZ1Rvb2xiYXJCdXR0b25zOiB7XHJcbiAgICAgICAgICAgIFwiY2xvc2VcIjogdHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVybHM6IFtcclxuICAgICAgICAgICAgXCJpbWFnZXMvMS5qcGVnXCIsXHJcbiAgICAgICAgICAgIFwiaW1hZ2VzLzIuanBnXCIsXHJcbiAgICAgICAgICAgIC8vXCJpbWFnZXMvMy5qcGVnXCIsXHJcbiAgICAgICAgICAgIFwiZmlsbXMvZmlsbS5tcDRcIixcclxuICAgICAgICAgICAgXCJpbWFnZXMvNC5qcGVnXCIsXHJcbiAgICAgICAgICAgIFwiaW1hZ2VzLzUuanBnXCIsXHJcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1XbGNPOWQwZmxOWSZ0PTFzXCIsXHJcbiAgICAgICAgICAgIC8vXCJpbWFnZXMvNi5qcGdcIixcclxuICAgICAgICBdLFxyXG4gICAgICAgIHNvdXJjZXM6IFtdLFxyXG4gICAgICAgIHNvdXJjZXNMb2FkZWQ6IFtdLFxyXG4gICAgICAgIHJlbWVtYmVyZWRTb3VyY2VzRGltZW5zaW9uczogW10sXHJcbiAgICAgICAgdmlkZW9zOiBbXSxcclxuXHJcbiAgICAgICAgbWVkaWFIb2xkZXI6IHt9LFxyXG4gICAgICAgIG5hdjoge30sXHJcbiAgICAgICAgdG9vbGJhcjoge30sXHJcbiAgICAgICAgc2xpZGVDb3VudGVyRWxlbToge30sXHJcblxyXG4gICAgICAgIG9uUmVzaXplRXZlbnQ6ICcnLFxyXG4gICAgICAgIHVwZGF0ZVNsaWRlTnVtYmVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7V2luZG93fVxyXG4gICAgICovXHJcbiAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG5cclxuICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudCA9IG5ldyBvblJlc2l6ZUV2ZW50KCk7XHJcbiAgICAgICAgbmV3IHNlbGYuZG9tKCk7XHJcbiAgICAgICAgcmVxdWlyZSgnLi9jaGFuZ2VTbGlkZUJ5RHJhZ2dpbmcuanMnKShzZWxmLCBET01PYmplY3QpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgYWxsIGxpYnJhcnkgZWxlbWVudHNcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLmRvbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXF1aXJlKCcuL3JlbmRlckRPTS5qcycpKHNlbGYsIERPTU9iamVjdCk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGlzLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmc2xpZ2h0Ym94LWNvbnRhaW5lcicpLnJlbW92ZSgpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZSBkb20gZWxlbWVudCB3aXRoIGNsYXNzZXNcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBET01PYmplY3QodGFnKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZENsYXNzZXNBbmRDcmVhdGUgPSBmdW5jdGlvbiAoY2xhc3Nlcykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCBpbiBjbGFzc2VzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc2VzW2luZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYmplY3QgdGhhdCBjb250YWlucyBhbGwgYWN0aW9ucyB0aGF0IGZzbGlnaHRib3ggaXMgZG9pbmcgZHVyaW5nIHJ1bm5pbmdcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBvblJlc2l6ZUV2ZW50KCkge1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSBzZWxmLmRhdGEuc291cmNlcztcclxuICAgICAgICBjb25zdCByZW1lbWJlcmVkU291cmNlRGltZW5zaW9uID0gc2VsZi5kYXRhLnJlbWVtYmVyZWRTb3VyY2VzRGltZW5zaW9ucztcclxuXHJcbiAgICAgICAgdGhpcy5tZWRpYUhvbGRlckRpbWVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuc3R5bGUud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuc3R5bGUuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnNvdXJjZXNEaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3RhZ2VTb3VyY2VzSW5kZXhlcyA9IHNlbGYuZ2V0U291cmNlc0luZGV4ZXMuYWxsKHNlbGYuZGF0YS5zbGlkZSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBzb3VyY2VJbmRleCBpbiBzb3VyY2VzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRyYW5mb3JtcyB0byBzdGFnZSBzb3VyY2VzXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFnZVNvdXJjZVByZXZpb3VzVHJhbnNmb3JtID0gLXNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzW3N0YWdlU291cmNlc0luZGV4ZXMucHJldmlvdXNdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIHN0YWdlU291cmNlUHJldmlvdXNUcmFuc2Zvcm0gKyAncHgsMCknO1xyXG4gICAgICAgICAgICAgICAgc291cmNlc1tzdGFnZVNvdXJjZXNJbmRleGVzLmN1cnJlbnRdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoMCwwKSc7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzW3N0YWdlU291cmNlc0luZGV4ZXMubmV4dF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgc2VsZi5kYXRhLnNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aCArICdweCwwKSc7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbSA9IHNvdXJjZXNbc291cmNlSW5kZXhdLmZpcnN0Q2hpbGQ7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZVdpZHRoID0gcmVtZW1iZXJlZFNvdXJjZURpbWVuc2lvbltzb3VyY2VJbmRleF0ud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlSGVpZ2h0ID0gcmVtZW1iZXJlZFNvdXJjZURpbWVuc2lvbltzb3VyY2VJbmRleF0uaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvZWZmaWNpZW50ID0gc291cmNlV2lkdGggLyBzb3VyY2VIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXZpY2VXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGV2aWNlSGVpZ2h0ID0gcGFyc2VJbnQoc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5zdHlsZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0hlaWdodCA9IGRldmljZVdpZHRoIC8gY29lZmZpY2llbnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3SGVpZ2h0IDwgZGV2aWNlSGVpZ2h0IC0gNjApIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLndpZHRoID0gZGV2aWNlV2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0hlaWdodCA9IGRldmljZUhlaWdodCAtIDYwO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuaGVpZ2h0ID0gbmV3SGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUud2lkdGggPSBuZXdIZWlnaHQgKiBjb2VmZmljaWVudCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMubWVkaWFIb2xkZXJEaW1lbnNpb25zKCk7XHJcbiAgICAgICAgICAgIF90aGlzLnNvdXJjZXNEaW1lbnNpb25zKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTVkdJY29uIG9iamVjdCB3aXRoIGdldFNWR0ljb24gbWV0aG9kIHdoaWNoIHJldHVybiA8c3ZnPiBlbGVtZW50IHdpdGggPHBhdGg+IGNoaWxkXHJcbiAgICAgKiBAcmV0dXJucyB7RWxlbWVudH1cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLlNWR0ljb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIDxzdmc+IHdpdGggYWRkZWQgJ2ZzbGlnaHRib3gtc3ZnLWljb24nIGNsYXNzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgXCJzdmdcIik7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGNoaWxkIG9mIHN2ZyBlbXB0eSA8cGF0aD5cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgXCJwYXRoXCIpO1xyXG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICdjbGFzcycsICdmc2xpZ2h0Ym94LXN2Zy1pY29uJyk7XHJcbiAgICAgICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3ZpZXdCb3gnLCAnMCAwIDIwIDIwJyk7XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm5zIERPTSA8c3ZnPiBpY29uIGNvbnRhaW5pbmcgPHBhdGg+IGNoaWxkIHdpdGggZCBhdHRyaWJ1dGUgZnJvbSBwYXJhbWV0ZXJcclxuICAgICAgICAgKiBAcGFyYW0gZFxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZ2V0U1ZHSWNvbiA9IGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZCcsIGQpO1xyXG4gICAgICAgICAgICB0aGlzLnN2Zy5hcHBlbmRDaGlsZCh0aGlzLnBhdGgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdmc7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTbGlkZSBjb3VudGVyIG9iamVjdCAtIHVwcGVyIGxlZnQgY29ybmVyIG9mIGZzTGlnaHRib3hcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLnNsaWRlQ291bnRlckVsZW0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IG51bWJlckNvbnRhaW5lciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLW51bWJlci1jb250YWluZXInXSk7XHJcbiAgICAgICAgc2VsZi5kYXRhLnNsaWRlQ291bnRlckVsZW0gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1zbGlkZS1udW1iZXInXSk7XHJcblxyXG4gICAgICAgIHNlbGYuZGF0YS5zbGlkZUNvdW50ZXJFbGVtLmlubmVySFRNTCA9IHNlbGYuZGF0YS5zbGlkZTtcclxuICAgICAgICBzZWxmLmRhdGEuc2xpZGVDb3VudGVyRWxlbS5pZCA9ICdjdXJyZW50X3NsaWRlJztcclxuXHJcbiAgICAgICAgbGV0IHNwYWNlID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtc2xpZGUtbnVtYmVyJywgJ2ZzbGlnaHRib3gtc2xhc2gnXSk7XHJcbiAgICAgICAgc3BhY2UuaW5uZXJIVE1MID0gJy8nO1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVzID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtc2xpZGUtbnVtYmVyJ10pO1xyXG4gICAgICAgIHNsaWRlcy5pbm5lckhUTUwgPSBzZWxmLmRhdGEudG90YWxfc2xpZGVzO1xyXG5cclxuICAgICAgICBudW1iZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5kYXRhLnNsaWRlQ291bnRlckVsZW0pO1xyXG4gICAgICAgIG51bWJlckNvbnRhaW5lci5hcHBlbmRDaGlsZChzcGFjZSk7XHJcbiAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNsaWRlcyk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCBhZnRlciBzd2l0Y2hpbmcgc2xpZGVzXHJcbiAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyID0gZnVuY3Rpb24gKG51bWJlcikge1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGUgPSBudW1iZXI7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zbGlkZUNvdW50ZXJFbGVtLmlubmVySFRNTCA9IG51bWJlcjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlclNsaWRlQ291bnRlciA9IGZ1bmN0aW9uIChuYXYpIHtcclxuICAgICAgICAgICAgbmF2LmFwcGVuZENoaWxkKG51bWJlckNvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb29sYmFyIGJ1dHRvblxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHRoaXMudG9vbGJhckJ1dHRvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmJ1dHRvbiA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXRvb2xiYXItYnV0dG9uJywgJ2J1dHRvbi1zdHlsZSddKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRTVkdJY29uID0gZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgbGV0IFNWR0ljb24gPSBuZXcgc2VsZi5TVkdJY29uKCkuZ2V0U1ZHSWNvbihkKTtcclxuICAgICAgICAgICAgdGhpcy5idXR0b24uYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBTVkdJY29uXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5idXR0b24pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9vbGJhciBvYmplY3Qgd2hpY2ggY29udGFpbnMgdG9vbGJhciBidXR0b25zXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgdGhpcy50b29sYmFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMudG9vbGJhckVsZW0gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC10b29sYmFyJ10pO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlckRlZmF1bHRCdXR0b25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgc2hvdWxkUmVuZGVyQnV0dG9ucyA9IHNlbGYuZGF0YS5pc1JlbmRlcmluZ1Rvb2xiYXJCdXR0b25zO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNob3VsZFJlbmRlckJ1dHRvbnMuY2xvc2UgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBidXR0b24gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC10b29sYmFyLWJ1dHRvbicsICdidXR0b24tc3R5bGUnXSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3ZnID0gbmV3IHNlbGYuU1ZHSWNvbigpLmdldFNWR0ljb24oJ00gMTEuNDY5IDEwIGwgNy4wOCAtNy4wOCBjIDAuNDA2IC0wLjQwNiAwLjQwNiAtMS4wNjQgMCAtMS40NjkgYyAtMC40MDYgLTAuNDA2IC0xLjA2MyAtMC40MDYgLTEuNDY5IDAgTCAxMCA4LjUzIGwgLTcuMDgxIC03LjA4IGMgLTAuNDA2IC0wLjQwNiAtMS4wNjQgLTAuNDA2IC0xLjQ2OSAwIGMgLTAuNDA2IDAuNDA2IC0wLjQwNiAxLjA2MyAwIDEuNDY5IEwgOC41MzEgMTAgTCAxLjQ1IDE3LjA4MSBjIC0wLjQwNiAwLjQwNiAtMC40MDYgMS4wNjQgMCAxLjQ2OSBjIDAuMjAzIDAuMjAzIDAuNDY5IDAuMzA0IDAuNzM1IDAuMzA0IGMgMC4yNjYgMCAwLjUzMSAtMC4xMDEgMC43MzUgLTAuMzA0IEwgMTAgMTEuNDY5IGwgNy4wOCA3LjA4MSBjIDAuMjAzIDAuMjAzIDAuNDY5IDAuMzA0IDAuNzM1IDAuMzA0IGMgMC4yNjcgMCAwLjUzMiAtMC4xMDEgMC43MzUgLTAuMzA0IGMgMC40MDYgLTAuNDA2IDAuNDA2IC0xLjA2NCAwIC0xLjQ2OSBMIDExLjQ2OSAxMCBaJyk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoc3ZnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9vbGJhckVsZW0uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyVG9vbGJhciA9IGZ1bmN0aW9uIChuYXYpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJEZWZhdWx0QnV0dG9ucygpO1xyXG4gICAgICAgICAgICBuYXYuYXBwZW5kQ2hpbGQodGhpcy50b29sYmFyRWxlbSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRCdXR0b25Ub1Rvb2xiYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCB0b29sYmFyQnV0dG9uID0gbmV3IHNlbGYudG9vbGJhckJ1dHRvbigpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpdiB0aGF0IGhvbGRzIHNvdXJjZSBlbGVtXHJcbiAgICAgKi9cclxuICAgIHRoaXMubWVkaWFIb2xkZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5ob2xkZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1tZWRpYS1ob2xkZXInXSk7XHJcbiAgICAgICAgdGhpcy5ob2xkZXIuc3R5bGUud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCArICdweCc7XHJcbiAgICAgICAgdGhpcy5ob2xkZXIuc3R5bGUuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICB0aGlzLnJlbmRlckhvbGRlciA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuaG9sZGVyKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gb2JqZWN0IHdpdGggc3RhZ2Ugc291cmNlcyBpbmRleGVzIGRlcGVuZGluZyBvbiBwcm92aWRlZCBzbGlkZVxyXG4gICAgICogQHBhcmFtIHNsaWRlXHJcbiAgICAgKiBAcmV0dXJucyB7e3ByZXZpb3VzOiBudW1iZXIsIGN1cnJlbnQ6IG51bWJlciwgbmV4dDogbnVtYmVyfX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5nZXRTb3VyY2VzSW5kZXhlcyA9IHtcclxuXHJcbiAgICAgICAgcHJldmlvdXM6IGZ1bmN0aW9uIChzbGlkZSkge1xyXG4gICAgICAgICAgICBsZXQgcHJldmlvdXNTbGlkZUluZGV4O1xyXG4gICAgICAgICAgICBjb25zdCBhcnJheUluZGV4ID0gc2xpZGUgLSAxO1xyXG5cclxuICAgICAgICAgICAgLy8gcHJldmlvdXNcclxuICAgICAgICAgICAgaWYgKGFycmF5SW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzU2xpZGVJbmRleCA9IHNlbGYuZGF0YS50b3RhbF9zbGlkZXMgLSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNTbGlkZUluZGV4ID0gYXJyYXlJbmRleCAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1NsaWRlSW5kZXg7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uIChzbGlkZSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IG5leHRTbGlkZUluZGV4O1xyXG4gICAgICAgICAgICBjb25zdCBhcnJheUluZGV4ID0gc2xpZGUgLSAxO1xyXG5cclxuICAgICAgICAgICAgLy9uZXh0XHJcbiAgICAgICAgICAgIGlmIChzbGlkZSA9PT0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlcykge1xyXG4gICAgICAgICAgICAgICAgbmV4dFNsaWRlSW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV4dFNsaWRlSW5kZXggPSBhcnJheUluZGV4ICsgMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5leHRTbGlkZUluZGV4O1xyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICBhbGw6IGZ1bmN0aW9uIChzbGlkZSkge1xyXG4gICAgICAgICAgICAvLyBzb3VyY2VzIGFyZSBzdG9yZWQgaW4gYXJyYXkgaW5kZXhlZCBmcm9tIDBcclxuICAgICAgICAgICAgY29uc3QgYXJyYXlJbmRleCA9IHNsaWRlIC0gMTtcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlc0luZGV4ZXMgPSB7XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91czogMCxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IDAsXHJcbiAgICAgICAgICAgICAgICBuZXh0OiAwXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBwcmV2aW91c1xyXG4gICAgICAgICAgICBpZiAoYXJyYXlJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc291cmNlc0luZGV4ZXMucHJldmlvdXMgPSBzZWxmLmRhdGEudG90YWxfc2xpZGVzIC0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzLnByZXZpb3VzID0gYXJyYXlJbmRleCAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGN1cnJlbnRcclxuICAgICAgICAgICAgc291cmNlc0luZGV4ZXMuY3VycmVudCA9IGFycmF5SW5kZXg7XHJcblxyXG4gICAgICAgICAgICAvL25leHRcclxuICAgICAgICAgICAgaWYgKHNsaWRlID09PSBzZWxmLmRhdGEudG90YWxfc2xpZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzSW5kZXhlcy5uZXh0ID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzLm5leHQgPSBhcnJheUluZGV4ICsgMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZXNJbmRleGVzO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGlzLnN0b3BWaWRlb3MgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHZpZGVvcyA9IHNlbGYuZGF0YS52aWRlb3M7XHJcblxyXG4gICAgICAgIC8vIHRydWUgaXMgaHRtbDUgdmlkZW8sIGZhbHNlIGlzIHlvdXR1YmUgdmlkZW9cclxuICAgICAgICBmb3IgKGxldCB2aWRlb0luZGV4IGluIHZpZGVvcykge1xyXG5cclxuICAgICAgICAgICAgaWYgKHZpZGVvc1t2aWRlb0luZGV4XSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxmLmRhdGEuc291cmNlc1t2aWRlb0luZGV4XS5maXJzdENoaWxkLnBhdXNlICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhLnNvdXJjZXNbdmlkZW9JbmRleF0uZmlyc3RDaGlsZC5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnNvdXJjZXNbdmlkZW9JbmRleF0uZmlyc3RDaGlsZC5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKCd7XCJldmVudFwiOlwiY29tbWFuZFwiLFwiZnVuY1wiOlwic3RvcFZpZGVvXCIsXCJhcmdzXCI6XCJcIn0nLCAnKicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGhvZHMgdGhhdCBhcHBlbmRzIHNvdXJjZXMgdG8gbWVkaWFIb2xkZXIgZGVwZW5kaW5nIG9uIGFjdGlvblxyXG4gICAgICogQHR5cGUge3tpbml0aWFsQXBwZW5kLCBwcmV2aW91c0FwcGVuZCwgbmV4dEFwcGVuZH18Kn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5hcHBlbmRNZXRob2RzID0gcmVxdWlyZSgnLi9hcHBlbmRTb3VyY2UnKTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwbGF5IHNvdXJjZSAoaW1hZ2VzLCBIVE1MNSB2aWRlbywgWW91VHViZSB2aWRlbykgZGVwZW5kaW5nIG9uIGdpdmVuIHVybCBmcm9tIHVzZXJcclxuICAgICAqIE9yIGlmIGRpc3BsYXkgaXMgaW5pdGlhbCBkaXNwbGF5IDMgaW5pdGlhbCBzb3VyY2VzXHJcbiAgICAgKiBJZiB0aGVyZSBhcmUgPj0gMyBpbml0aWFsIHNvdXJjZXMgdGhlcmUgd2lsbCBiZSBhbHdheXMgMyBpbiBzdGFnZVxyXG4gICAgICogQHBhcmFtIHVybFxyXG4gICAgICogQHBhcmFtIHR5cGVPZkxvYWRcclxuICAgICAqIEByZXR1cm5zIHttb2R1bGUuZXhwb3J0c31cclxuICAgICAqL1xyXG4gICAgdGhpcy5sb2Fkc291cmNlcyA9IGZ1bmN0aW9uICh0eXBlT2ZMb2FkLCBzbGlkZSkge1xyXG4gICAgICAgIGNvbnN0IGxvYWRzb3VyY2Vtb2R1bGUgPSByZXF1aXJlKFwiLi9sb2FkU291cmNlLmpzXCIpO1xyXG4gICAgICAgIHJldHVybiBuZXcgbG9hZHNvdXJjZW1vZHVsZShzZWxmLCBET01PYmplY3QsIHR5cGVPZkxvYWQsIHNsaWRlKTtcclxuICAgIH07XHJcbn1cclxuO1xyXG5cclxuXHJcbiFmdW5jdGlvbiAoKSB7XHJcbn0oZG9jdW1lbnQsIHdpbmRvdyk7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlbGYsIERPTU9iamVjdCwgdHlwZU9mTG9hZCwgc2xpZGUpIHtcclxuXHJcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XHJcbiAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IHNlbGYuZ2V0U291cmNlc0luZGV4ZXMuYWxsKHNsaWRlKTtcclxuICAgIGNvbnN0IHVybHMgPSBzZWxmLmRhdGEudXJscztcclxuICAgIGNvbnN0IHNvdXJjZXMgPSBzZWxmLmRhdGEuc291cmNlcztcclxuICAgIGxldCB0ZW1wU291cmNlcyA9IHt9O1xyXG5cclxuICAgIGxldCBzb3VyY2VEaW1lbnNpb25zID0gZnVuY3Rpb24gKHNvdXJjZUVsZW0sIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQpIHtcclxuXHJcbiAgICAgICAgY29uc3QgY29lZmZpY2llbnQgPSBzb3VyY2VXaWR0aCAvIHNvdXJjZUhlaWdodDtcclxuICAgICAgICBjb25zdCBkZXZpY2VXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGNvbnN0IGRldmljZUhlaWdodCA9IHBhcnNlSW50KHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuc3R5bGUuaGVpZ2h0KTtcclxuICAgICAgICBsZXQgbmV3SGVpZ2h0ID0gZGV2aWNlV2lkdGggLyBjb2VmZmljaWVudDtcclxuICAgICAgICBpZiAobmV3SGVpZ2h0IDwgZGV2aWNlSGVpZ2h0IC0gNjApIHtcclxuICAgICAgICAgICAgc291cmNlRWxlbS5zdHlsZS5oZWlnaHQgPSBuZXdIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIHNvdXJjZUVsZW0uc3R5bGUud2lkdGggPSBkZXZpY2VXaWR0aCArIFwicHhcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdIZWlnaHQgPSBkZXZpY2VIZWlnaHQgLSA2MDtcclxuICAgICAgICAgICAgc291cmNlRWxlbS5zdHlsZS5oZWlnaHQgPSBuZXdIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIHNvdXJjZUVsZW0uc3R5bGUud2lkdGggPSBuZXdIZWlnaHQgKiBjb2VmZmljaWVudCArIFwicHhcIjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZCBmYWRlIGluIGNsYXNzIGFuZCBkaW1lbnNpb24gZnVuY3Rpb25cclxuICAgICAqL1xyXG4gICAgbGV0IG9ubG9hZExpc3RlbmVyID0gZnVuY3Rpb24gKHNvdXJjZUVsZW0sIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQsIGFycmF5SW5kZXgpIHtcclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZUhvbGRlciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNvdXJjZS1ob2xkZXInXSk7XHJcblxyXG4gICAgICAgIC8vbm9ybWFsIHNvdXJjZSBkaW1lbnNpb25zIG5lZWRzIHRvIGJlIHN0b3JlZCBpbiBhcnJheVxyXG4gICAgICAgIC8vaXQgd2lsbCBiZSBuZWVkZWQgd2hlbiByZXNpemluZyBhIHNvdXJjZVxyXG4gICAgICAgIHNlbGYuZGF0YS5yZW1lbWJlcmVkU291cmNlc0RpbWVuc2lvbnNbYXJyYXlJbmRleF0gPSB7XHJcbiAgICAgICAgICAgIFwid2lkdGhcIjogc291cmNlV2lkdGgsXHJcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IHNvdXJjZUhlaWdodFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIHNldCBkaW1lbnNpb25zIGZvciB0aGUgMXN0IHRpbWVcclxuICAgICAgICBzb3VyY2VEaW1lbnNpb25zKHNvdXJjZUVsZW0sIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQpO1xyXG5cclxuICAgICAgICBzb3VyY2VIb2xkZXIuYXBwZW5kQ2hpbGQoc291cmNlRWxlbSk7XHJcbiAgICAgICAgY29uc3QgcHJldmlvdXNTb3VyY2UgPSBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXTtcclxuICAgICAgICBjb25zdCBjdXJyZW50U291cmNlID0gc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XTtcclxuICAgICAgICBjb25zdCBuZXh0U291cmNlID0gc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XTtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0eXBlT2ZMb2FkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2luaXRpYWwnOlxyXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRvIHRlbXAgYXJyYXkgYmVjYXVzZSBsb2FkaW5nIGlzIGFzeW5jaHJvbm91cyBzbyB3ZSBjYW4ndCBkZXBlbmQgb24gbG9hZCBvcmRlclxyXG4gICAgICAgICAgICAgICAgdGVtcFNvdXJjZXNbYXJyYXlJbmRleF0gPSBzb3VyY2VIb2xkZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodXJscy5sZW5ndGggPj0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFwcGVuZCBzb3VyY2VzIHdoZW4gYWxsIDMgYXJlIGxvYWRlZFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKE9iamVjdC5rZXlzKHRlbXBTb3VyY2VzKS5sZW5ndGggPj0gMykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNTb3VyY2UuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzU291cmNlLmFwcGVuZENoaWxkKHRlbXBTb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCBjdXJyZW50U291cmNlLmZpcnN0Q2hpbGQub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzU291cmNlLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1mYWRlLWluJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlLmFwcGVuZENoaWxkKHRlbXBTb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2b2lkIGN1cnJlbnRTb3VyY2UuZmlyc3RDaGlsZC5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNvdXJjZS5maXJzdENoaWxkLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNvdXJjZS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNvdXJjZS5hcHBlbmRDaGlsZCh0ZW1wU291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XS5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCBjdXJyZW50U291cmNlLmZpcnN0Q2hpbGQub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTb3VyY2UuZmlyc3RDaGlsZC5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LWZhZGUtaW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbmV4dCc6XHJcbiAgICAgICAgICAgICAgICAvLyByZXBsYWNlIGxvYWRlciB3aXRoIGxvYWRlZCBzb3VyY2VcclxuICAgICAgICAgICAgICAgIG5leHRTb3VyY2UuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICBuZXh0U291cmNlLmFwcGVuZENoaWxkKHNvdXJjZUVsZW0pO1xyXG4gICAgICAgICAgICAgICAgdm9pZCBjdXJyZW50U291cmNlLmZpcnN0Q2hpbGQub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgICAgICBuZXh0U291cmNlLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1mYWRlLWluJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncHJldmlvdXMnOlxyXG4gICAgICAgICAgICAgICAgLy8gcmVwbGFjZSBsb2FkZXIgd2l0aCBsb2FkZWQgc291cmNlXHJcbiAgICAgICAgICAgICAgICBwcmV2aW91c1NvdXJjZS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzU291cmNlLmFwcGVuZENoaWxkKHNvdXJjZUVsZW0pO1xyXG4gICAgICAgICAgICAgICAgdm9pZCBjdXJyZW50U291cmNlLmZpcnN0Q2hpbGQub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91c1NvdXJjZS5maXJzdENoaWxkLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbicpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5sb2FkWW91dHViZXZpZGVvID0gZnVuY3Rpb24gKHZpZGVvSWQsIGFycmF5SW5kZXgpIHtcclxuICAgICAgICBsZXQgaWZyYW1lID0gbmV3IERPTU9iamVjdCgnaWZyYW1lJykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2luZ2xlLXNvdXJjZSddKTtcclxuICAgICAgICBpZnJhbWUuc3JjID0gJy8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLycgKyB2aWRlb0lkICsgJz9lbmFibGVqc2FwaT0xJztcclxuICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvd2Z1bGxzY3JlZW4nLCAnJyk7XHJcbiAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnZnJhbWVib3JkZXInLCAnMCcpO1xyXG4gICAgICAgIGlmcmFtZS5vbm1vdXNldXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdqYXBpZXJkb2VsJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLmFwcGVuZENoaWxkKGlmcmFtZSk7XHJcbiAgICAgICAgb25sb2FkTGlzdGVuZXIoaWZyYW1lLCAxOTIwLCAxMDgwLCBhcnJheUluZGV4KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuaW1hZ2VMb2FkID0gZnVuY3Rpb24gKHNyYywgYXJyYXlJbmRleCkge1xyXG4gICAgICAgIGxldCBzb3VyY2VFbGVtID0gbmV3IERPTU9iamVjdCgnaW1nJykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2luZ2xlLXNvdXJjZSddKTtcclxuICAgICAgICBzb3VyY2VFbGVtLnNyYyA9IHNyYztcclxuICAgICAgICBzb3VyY2VFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG9ubG9hZExpc3RlbmVyKHNvdXJjZUVsZW0sIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBhcnJheUluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMudmlkZW9Mb2FkID0gZnVuY3Rpb24gKHNyYywgYXJyYXlJbmRleCkge1xyXG4gICAgICAgIGxldCB2aWRlb0VsZW0gPSBuZXcgRE9NT2JqZWN0KCd2aWRlbycpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNpbmdsZS1zb3VyY2UnXSk7XHJcbiAgICAgICAgbGV0IHNvdXJjZSA9IG5ldyBET01PYmplY3QoJ3NvdXJjZScpLmVsZW07XHJcbiAgICAgICAgc291cmNlLnNyYyA9IHNyYztcclxuICAgICAgICB2aWRlb0VsZW0uaW5uZXJUZXh0ID0gJ1NvcnJ5LCB5b3VyIGJyb3dzZXIgZG9lc25cXCd0IHN1cHBvcnQgZW1iZWRkZWQgdmlkZW9zLCA8YVxcbicgK1xyXG4gICAgICAgICAgICAnICAgICAgICAgICAgaHJlZj1cImh0dHA6Ly9kb3dubG9hZC5ibGVuZGVyLm9yZy9wZWFjaC9iaWdidWNrYnVubnlfbW92aWVzL0JpZ0J1Y2tCdW5ueV8zMjB4MTgwLm1wNFwiPmRvd25sb2FkPC9hPiBhbmQgd2F0Y2hcXG4nICtcclxuICAgICAgICAgICAgJyAgICAgICAgd2l0aCB5b3VyIGZhdm9yaXRlIHZpZGVvIHBsYXllciEnO1xyXG5cclxuICAgICAgICB2aWRlb0VsZW0uc2V0QXR0cmlidXRlKCdjb250cm9scycsICcnKTtcclxuICAgICAgICB2aWRlb0VsZW0uYXBwZW5kQ2hpbGQoc291cmNlKTtcclxuICAgICAgICB2aWRlb0VsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG9ubG9hZExpc3RlbmVyKHZpZGVvRWxlbSwgdGhpcy52aWRlb1dpZHRoLCB0aGlzLnZpZGVvSGVpZ2h0LCBhcnJheUluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5pbnZhbGlkRmlsZSA9IGZ1bmN0aW9uIChhcnJheUluZGV4KSB7XHJcbiAgICAgICAgbGV0IGludmFsaWRGaWxlV3JhcHBlciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LWludmFsaWQtZmlsZS13cmFwcGVyJ10pO1xyXG4gICAgICAgIGludmFsaWRGaWxlV3JhcHBlci5pbm5lckhUTUwgPSAnSW52YWxpZCBmaWxlJztcclxuXHJcbiAgICAgICAgb25sb2FkTGlzdGVuZXIoaW52YWxpZEZpbGVXcmFwcGVyLCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0LCBhcnJheUluZGV4KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbSA9IGZ1bmN0aW9uIChzb3VyY2VVcmwpIHtcclxuICAgICAgICBjb25zdCBwYXJzZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgY29uc3QgaW5kZXhPZlNvdXJjZSA9IHNlbGYuZGF0YS51cmxzLmluZGV4T2Yoc291cmNlVXJsKTtcclxuXHJcbiAgICAgICAgcGFyc2VyLmhyZWYgPSBzb3VyY2VVcmw7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldElkKHNvdXJjZVVybCkge1xyXG4gICAgICAgICAgICBsZXQgcmVnRXhwID0gL14uKih5b3V0dS5iZVxcL3x2XFwvfHVcXC9cXHdcXC98ZW1iZWRcXC98d2F0Y2hcXD92PXxcXCZ2PSkoW14jXFwmXFw/XSopLiovO1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBzb3VyY2VVcmwubWF0Y2gocmVnRXhwKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaCAmJiBtYXRjaFsyXS5sZW5ndGggPT0gMTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaFsyXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnZXJyb3InO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyc2VyLmhvc3RuYW1lID09PSAnd3d3LnlvdXR1YmUuY29tJykge1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEudmlkZW9zW2luZGV4T2ZTb3VyY2VdID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFlvdXR1YmV2aWRlbyhnZXRJZChzb3VyY2VVcmwpLCBpbmRleE9mU291cmNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgeGhyLm9ubG9hZHN0YXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IFwiYmxvYlwiO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgd2hhdCB0eXBlIG9mIGZpbGUgcHJvdmlkZWQgZnJvbSBsaW5rXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXNwb25zZVR5cGUgPSB4aHIucmVzcG9uc2UudHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlLmluZGV4T2YoJy8nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlLnNsaWNlKDAsIHJlc3BvbnNlVHlwZS5pbmRleE9mKCcvJykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlVHlwZSA9PT0gJ2ltYWdlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW1hZ2VMb2FkKFVSTC5jcmVhdGVPYmplY3RVUkwoeGhyLnJlc3BvbnNlKSwgaW5kZXhPZlNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlVHlwZSA9PT0gJ3ZpZGVvJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudmlkZW9Mb2FkKFVSTC5jcmVhdGVPYmplY3RVUkwoeGhyLnJlc3BvbnNlKSwgaW5kZXhPZlNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEudmlkZW9zW2luZGV4T2ZTb3VyY2VdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbnZhbGlkRmlsZShpbmRleE9mU291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHhoci5vcGVuKCdnZXQnLCBzb3VyY2VVcmwsIHRydWUpO1xyXG4gICAgICAgICAgICB4aHIuc2VuZChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBzd2l0Y2ggKHR5cGVPZkxvYWQpIHtcclxuICAgICAgICBjYXNlICdpbml0aWFsJzpcclxuICAgICAgICAgICAgLy9hcHBlbmQgbG9hZGVyIHdoZW4gbG9hZGluZyBpbml0aWFsbHlcclxuICAgICAgICAgICAgc2VsZi5hcHBlbmRNZXRob2RzLnJlbmRlckhvbGRlckluaXRpYWwoc2VsZixzbGlkZSxET01PYmplY3QpO1xyXG5cclxuICAgICAgICAgICAgaWYodXJscy5sZW5ndGggPj0gMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHVybHNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbSh1cmxzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbSh1cmxzW3NvdXJjZXNJbmRleGVzLm5leHRdKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlICdwcmV2aW91cyc6XHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCBsb2FkZXIgd2hlbiBsb2FkaW5nIGEgbmV4dCBzb3VyY2VcclxuICAgICAgICAgICAgc2VsZi5hcHBlbmRNZXRob2RzLnJlbmRlckhvbGRlclByZXZpb3VzKHNlbGYsIHNsaWRlLCBET01PYmplY3QpO1xyXG5cclxuICAgICAgICAgICAgLy8gbG9hZCBwcmV2aW91cyBzb3VyY2VcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHVybHNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ25leHQnOlxyXG4gICAgICAgICAgICAvLyBhcHBlbmQgbG9hZGVyIHdoZW4gbG9hZGluZyBhIG5leHQgc291cmNlXHJcbiAgICAgICAgICAgIHNlbGYuYXBwZW5kTWV0aG9kcy5yZW5kZXJIb2xkZXJOZXh0KHNlbGYsIHNsaWRlLCBET01PYmplY3QpO1xyXG5cclxuICAgICAgICAgICAgLy9sb2FkIG5leHQgc291cmNlXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbSh1cmxzW3NvdXJjZXNJbmRleGVzLm5leHRdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZiwgRE9NT2JqZWN0KSB7XHJcbiAgICBsZXQgcHJpdmF0ZU1ldGhvZHMgPSB7XHJcbiAgICAgICAgcmVuZGVyTmF2OiBmdW5jdGlvbiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5uYXYgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1uYXYnXSk7XHJcbiAgICAgICAgICAgIG5ldyBzZWxmLnRvb2xiYXIoKS5yZW5kZXJUb29sYmFyKHNlbGYuZGF0YS5uYXYpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZUNvdW50ZXIgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIG5ldyBzZWxmLnNsaWRlQ291bnRlckVsZW0oKS5yZW5kZXJTbGlkZUNvdW50ZXIoc2VsZi5kYXRhLm5hdik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxmLmRhdGEubmF2KTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXJTbGlkZUJ1dHRvbnM6IGZ1bmN0aW9uIChjb250YWluZXIpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZUJ1dHRvbnMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vcmVuZGVyIGxlZnQgYnRuXHJcbiAgICAgICAgICAgIGxldCBsZWZ0X2J0bl9jb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4tY29udGFpbmVyJ10pO1xyXG4gICAgICAgICAgICBsZXQgYnRuID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtYnRuJywgJ2J1dHRvbi1zdHlsZSddKTtcclxuICAgICAgICAgICAgYnRuLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgbmV3IHNlbGYuU1ZHSWNvbigpLmdldFNWR0ljb24oJ004LjM4OCwxMC4wNDlsNC43Ni00Ljg3M2MwLjMwMy0wLjMxLDAuMjk3LTAuODA0LTAuMDEyLTEuMTA1Yy0wLjMwOS0wLjMwNC0wLjgwMy0wLjI5My0xLjEwNSwwLjAxMkw2LjcyNiw5LjUxNmMtMC4zMDMsMC4zMS0wLjI5NiwwLjgwNSwwLjAxMiwxLjEwNWw1LjQzMyw1LjMwN2MwLjE1MiwwLjE0OCwwLjM1LDAuMjIzLDAuNTQ3LDAuMjIzYzAuMjAzLDAsMC40MDYtMC4wOCwwLjU1OS0wLjIzNmMwLjMwMy0wLjMwOSwwLjI5NS0wLjgwMy0wLjAxMi0xLjEwNEw4LjM4OCwxMC4wNDl6JylcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxlZnRfYnRuX2NvbnRhaW5lcik7XHJcblxyXG4gICAgICAgICAgICAvL2dvIHRvIHByZXZpb3VzIHNsaWRlIG9uY2xpY2tcclxuICAgICAgICAgICAgbGVmdF9idG5fY29udGFpbmVyLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFwcGVuZE1ldGhvZHMucHJldmlvdXNTbGlkZVZpYUJ1dHRvbihzZWxmLHNlbGYuZGF0YS5zbGlkZSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZWZ0X2J0bl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYnRuKTtcclxuICAgICAgICAgICAgbGV0IHJpZ2h0X2J0bl9jb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4tY29udGFpbmVyJywgJ2ZzbGlnaHRib3gtc2xpZGUtYnRuLXJpZ2h0LWNvbnRhaW5lciddKTtcclxuICAgICAgICAgICAgYnRuID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtYnRuJywgJ2J1dHRvbi1zdHlsZSddKTtcclxuICAgICAgICAgICAgYnRuLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgbmV3IHNlbGYuU1ZHSWNvbigpLmdldFNWR0ljb24oJ00xMS42MTEsMTAuMDQ5bC00Ljc2LTQuODczYy0wLjMwMy0wLjMxLTAuMjk3LTAuODA0LDAuMDEyLTEuMTA1YzAuMzA5LTAuMzA0LDAuODAzLTAuMjkzLDEuMTA1LDAuMDEybDUuMzA2LDUuNDMzYzAuMzA0LDAuMzEsMC4yOTYsMC44MDUtMC4wMTIsMS4xMDVMNy44MywxNS45MjhjLTAuMTUyLDAuMTQ4LTAuMzUsMC4yMjMtMC41NDcsMC4yMjNjLTAuMjAzLDAtMC40MDYtMC4wOC0wLjU1OS0wLjIzNmMtMC4zMDMtMC4zMDktMC4yOTUtMC44MDMsMC4wMTItMS4xMDRMMTEuNjExLDEwLjA0OXonKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgLy9nbyB0byBuZXh0IHNsaWRlIG9uY2xpY2tcclxuICAgICAgICAgICAgcmlnaHRfYnRuX2NvbnRhaW5lci5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hcHBlbmRNZXRob2RzLm5leHRTbGlkZVZpYUJ1dHRvbihzZWxmLHNlbGYuZGF0YS5zbGlkZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJpZ2h0X2J0bl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYnRuKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJpZ2h0X2J0bl9jb250YWluZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9kaXNhYmxlIHNjcm9sbGluZ1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LW9wZW4nKTtcclxuXHJcbiAgICAvL2NyZWF0ZSBjb250YWluZXJcclxuICAgIGxldCBjb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1jb250YWluZXInXSk7XHJcbiAgICBjb250YWluZXIuaWQgPSBcImZzbGlnaHRib3gtY29udGFpbmVyXCI7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcblxyXG4gICAgLy9yZW5kZXIgc2xpZGUgYnV0dG9ucyBhbmQgbmF2KHRvb2xiYXIpXHJcbiAgICBwcml2YXRlTWV0aG9kcy5yZW5kZXJOYXYoY29udGFpbmVyKTtcclxuICAgIHByaXZhdGVNZXRob2RzLnJlbmRlclNsaWRlQnV0dG9ucyhjb250YWluZXIpO1xyXG5cclxuICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlciA9IG5ldyBzZWxmLm1lZGlhSG9sZGVyKCk7XHJcbiAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIucmVuZGVySG9sZGVyKGNvbnRhaW5lcik7XHJcblxyXG4gICAgc2VsZi5kYXRhLmlzZmlyc3RUaW1lTG9hZCA9IHRydWU7XHJcbiAgICBzZWxmLmxvYWRzb3VyY2VzKCdpbml0aWFsJywgc2VsZi5kYXRhLnNsaWRlKTtcclxufTsiXX0=
