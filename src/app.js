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
            console.log(1);
            self.data.slide = self.data.total_slides;
        } else {
            self.data.slide -= 1;
        }
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

            for (let elem in elements) {
                elements[elem].classList.add('fslightbox-cursor-grabbing');
            }
            is_dragging = true;
            mouseDownClientX = e.clientX;

            // if (!slideaAble) {
            //     return;
            // }
            difference = 0;
        },


        mouseUpEvent: function () {
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
        xPosition: -1.3 * window.innerWidth,
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
            "https://www.youtube.com/watch?v=AS5CxLCWq-Q",
            "images/6.jpg",
        ],
        sources: [],
        sourcesLoaded: [],
        rememberedSourcesDimensions: [],

        mediaHolder: {},
        nav: {},
        toolbar: {},
        sourceElem: {},
        slideCounterElem: {},

        onResizeEvent: new onResizeEvent(),
        updateSlideNumber: function () {
        }
    };


    /**
     * @type {Window}
     */
    let self = this;


    this.init = function () {
        new self.dom();
        require('./changeSlideByDragging.js')(self);
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

        this.rememberdWidth = 0;
        this.rememberdHeight = 0;

        this.mediaHolderDimensions = function () {
        };
        this.sourceDimensions = function () {
        };

        window.onresize = function () {
            _this.mediaHolderDimensions();
            _this.sourceDimensions();
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
        self.data.onResizeEvent.mediaHolderDimensions = function () {
            self.data.mediaHolder.holder.style.width = 3 * window.innerWidth + 'px';
        };
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

        previous: function(slide) {
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


        next: function(slide) {

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
};


!function () {
}(document, window);

},{"./appendSource":1,"./changeSlideByDragging.js":2,"./loadSource.js":4,"./renderDOM.js":5}],4:[function(require,module,exports){
module.exports = function (self, DOMObject, typeOfLoad, slide) {

    const _this = this;
    const sourcesIndexes = self.getSourcesIndexes.all(slide);
    const urls = self.data.urls;
    const sources = self.data.sources;
    let tempSources = {};
    let sourceCounter = 0;

    let sourceDimensions = function (sourceElem, sourceWidth, sourceHeight) {
        if (typeof  sourceWidth === "undefined") {
            sourceWidth = self.data.onResizeEvent.rememberdWidth;
            sourceHeight = self.data.onResizeEvent.rememberdHeight;
        }

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

        sourceCounter++;

        let sourceHolder = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);

        //normal source dimensions needs to be stored in array
        //it will be needed when loading source from memory
        self.data.rememberedSourcesDimensions[arrayIndex] = {
            "width": sourceWidth,
            "height": sourceHeight
        };

        //add method that changes source dimension on window resize
        self.data.onResizeEvent.sourceDimensions = function () {
            sourceDimensions(sourceElem, sourceWidth, sourceHeight);
        };

        //set dimension for the first time
        self.data.onResizeEvent.sourceDimensions(sourceWidth, sourceHeight);

        // dimensions will be given only one time so we will need to remember it
        // for next onresize event calls
        self.data.onResizeEvent.rememberdWidth = sourceWidth;
        self.data.onResizeEvent.rememberdHeight = sourceHeight;
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
        iframe.src = '//www.youtube.com/embed/' + videoId;
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('frameborder', '0');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwZW5kU291cmNlLmpzIiwic3JjL2pzL2NoYW5nZVNsaWRlQnlEcmFnZ2luZy5qcyIsInNyYy9qcy9pbmRleC5qcyIsInNyYy9qcy9sb2FkU291cmNlLmpzIiwic3JjL2pzL3JlbmRlckRPTS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgbG9hZGVyIHdoZW4gbG9hZGluZyBmc0xpZ2h0Ym94IGluaXRpYWxseVxyXG4gICAgICogQHBhcmFtIHNlbGZcclxuICAgICAqIEBwYXJhbSBzbGlkZVxyXG4gICAgICogQHBhcmFtIERPTU9iamVjdFxyXG4gICAgICovXHJcbiAgICByZW5kZXJIb2xkZXJJbml0aWFsOiBmdW5jdGlvbiAoc2VsZiwgc2xpZGUsIERPTU9iamVjdCkge1xyXG4gICAgICAgIGNvbnN0IGhvbGRlciA9IHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXI7XHJcbiAgICAgICAgY29uc3Qgc291cmNlc0luZGV4ZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzbGlkZSk7XHJcbiAgICAgICAgY29uc3QgbG9hZGVyID0gJzxkaXYgY2xhc3M9XCJsZHMtcmluZ1wiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+JztcclxuICAgICAgICBjb25zdCB0b3RhbFNsaWRlcyA9IHNlbGYuZGF0YS50b3RhbF9zbGlkZXM7XHJcblxyXG4gICAgICAgIGlmICh0b3RhbFNsaWRlcyA+PSAzKSB7XHJcbiAgICAgICAgICAgIGxldCBzb3VyY2VIb2xkZXJQcmV2aW91cyA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNvdXJjZS1ob2xkZXInXSk7XHJcbiAgICAgICAgICAgIHNvdXJjZUhvbGRlclByZXZpb3VzLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIC1zZWxmLmRhdGEuc2xpZGVEaXN0YW5jZSAqIHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4LDApJztcclxuICAgICAgICAgICAgc291cmNlSG9sZGVyUHJldmlvdXMuaW5uZXJIVE1MID0gbG9hZGVyO1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEuc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10gPSBzb3VyY2VIb2xkZXJQcmV2aW91cztcclxuICAgICAgICAgICAgaG9sZGVyLmFwcGVuZENoaWxkKHNvdXJjZUhvbGRlclByZXZpb3VzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0b3RhbFNsaWRlcyA+PSAxKSB7XHJcbiAgICAgICAgICAgIGxldCBzb3VyY2VIb2xkZXJDdXJyZW50ID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc291cmNlLWhvbGRlciddKTtcclxuICAgICAgICAgICAgc291cmNlSG9sZGVyQ3VycmVudC5pbm5lckhUTUwgPSBsb2FkZXI7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdID0gc291cmNlSG9sZGVyQ3VycmVudDtcclxuICAgICAgICAgICAgaG9sZGVyLmFwcGVuZENoaWxkKHNvdXJjZUhvbGRlckN1cnJlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRvdGFsU2xpZGVzID49IDIpIHtcclxuICAgICAgICAgICAgbGV0IHNvdXJjZUhvbGRlck5leHQgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zb3VyY2UtaG9sZGVyJ10pO1xyXG4gICAgICAgICAgICBzb3VyY2VIb2xkZXJOZXh0LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIHNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGggKyAncHgsMCknO1xyXG4gICAgICAgICAgICBzb3VyY2VIb2xkZXJOZXh0LmlubmVySFRNTCA9IGxvYWRlcjtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdID0gc291cmNlSG9sZGVyTmV4dDtcclxuICAgICAgICAgICAgaG9sZGVyLmFwcGVuZENoaWxkKHNvdXJjZUhvbGRlck5leHQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyBsb2FkZXIgd2hlbiBsb2FkaW5nIGEgcHJldmlvdXMgc291cmNlXHJcbiAgICAgKiBAcGFyYW0gc2VsZlxyXG4gICAgICogQHBhcmFtIHNsaWRlXHJcbiAgICAgKiBAcGFyYW0gRE9NT2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHJlbmRlckhvbGRlclByZXZpb3VzOiBmdW5jdGlvbiAoc2VsZiwgc2xpZGUsIERPTU9iamVjdCkge1xyXG4gICAgICAgIGNvbnN0IGhvbGRlciA9IHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXI7XHJcbiAgICAgICAgY29uc3QgcHJldmlvdXNTb3VyY2VJbmRleCA9IHNlbGYuZ2V0U291cmNlc0luZGV4ZXMucHJldmlvdXMoc2xpZGUpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgaG9sZGVyIGFuZCBhZGQgYSBwcm9wZXIgdHJhbnNmb3JtXHJcbiAgICAgICAgbGV0IHNvdXJjZUhvbGRlciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNvdXJjZS1ob2xkZXInXSk7XHJcbiAgICAgICAgc291cmNlSG9sZGVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwibGRzLXJpbmdcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtUHJldmlvdXMgPSAtc2VsZi5kYXRhLnNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICBzb3VyY2VIb2xkZXIuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgdHJhbnNmb3JtUHJldmlvdXMgKyAncHgsMCknO1xyXG5cclxuXHJcbiAgICAgICAgc2VsZi5kYXRhLnNvdXJjZXNbcHJldmlvdXNTb3VyY2VJbmRleF0gPSBzb3VyY2VIb2xkZXI7XHJcbiAgICAgICAgaG9sZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIHNvdXJjZUhvbGRlcik7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgbG9hZGVyIHdoZW4gbG9hZGluZyBhIG5leHQgc291cmNlXHJcbiAgICAgKiBAcGFyYW0gc2VsZlxyXG4gICAgICogQHBhcmFtIHNsaWRlXHJcbiAgICAgKiBAcGFyYW0gRE9NT2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHJlbmRlckhvbGRlck5leHQ6IGZ1bmN0aW9uIChzZWxmLCBzbGlkZSwgRE9NT2JqZWN0KSB7XHJcbiAgICAgICAgY29uc3QgaG9sZGVyID0gc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlcjtcclxuICAgICAgICBjb25zdCBuZXh0U291cmNlSW5kZXggPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLm5leHQoc2xpZGUpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgaG9sZGVyIGFuZCBhZGQgYSBwcm9wZXIgdHJhbnNmb3JtXHJcbiAgICAgICAgbGV0IHNvdXJjZUhvbGRlciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNvdXJjZS1ob2xkZXInXSk7XHJcbiAgICAgICAgc291cmNlSG9sZGVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwibGRzLXJpbmdcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgc291cmNlSG9sZGVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIHNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGggKyAncHgsMCknO1xyXG5cclxuICAgICAgICBzZWxmLmRhdGEuc291cmNlc1tuZXh0U291cmNlSW5kZXhdID0gc291cmNlSG9sZGVyO1xyXG4gICAgICAgIGhvbGRlci5hcHBlbmRDaGlsZChzb3VyY2VIb2xkZXIpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2Ugc2xpZGUgdG8gcHJldmlvdXMgYWZ0ZXIgY2xpY2tpbmcgYnV0dG9uXHJcbiAgICAgKiBAcGFyYW0gc2VsZlxyXG4gICAgICogQHBhcmFtIHNsaWRlXHJcbiAgICAgKiBAcGFyYW0gRE9NT2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHByZXZpb3VzU2xpZGVWaWFCdXR0b246IGZ1bmN0aW9uIChzZWxmLCBwcmV2aW91c1NsaWRlKSB7XHJcbiAgICAgICAgaWYgKHByZXZpb3VzU2xpZGUgPT09IDEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coMSk7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zbGlkZSA9IHNlbGYuZGF0YS50b3RhbF9zbGlkZXM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlIC09IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgIGNvbnN0IG5ld1NvdXJjZXNJbmRleGVzID0gc2VsZi5nZXRTb3VyY2VzSW5kZXhlcy5hbGwoc2VsZi5kYXRhLnNsaWRlKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxmLmRhdGEuc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5wcmV2aW91c10gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlcygncHJldmlvdXMnLCBzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IHNlbGYuZGF0YS5zb3VyY2VzO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTb3VyY2UgPSBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLmN1cnJlbnRdO1xyXG4gICAgICAgIGNvbnN0IG5leHRTb3VyY2UgPSBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLm5leHRdO1xyXG5cclxuICAgICAgICBuZXh0U291cmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcblxyXG4gICAgICAgIG5leHRTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1mYWRlLWluLWFuaW1hdGlvbicpO1xyXG4gICAgICAgIHZvaWQgbmV4dFNvdXJjZS5vZmZzZXRXaWR0aDtcclxuICAgICAgICBuZXh0U291cmNlLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbi1hbmltYXRpb24nKTtcclxuXHJcblxyXG4gICAgICAgIGN1cnJlbnRTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1mYWRlLWluLWFuaW1hdGlvbicpO1xyXG4gICAgICAgIHZvaWQgY3VycmVudFNvdXJjZS5vZmZzZXRXaWR0aDtcclxuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbi1hbmltYXRpb24nKTtcclxuXHJcbiAgICAgICAgY3VycmVudFNvdXJjZS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKDAsMCknO1xyXG4gICAgICAgIGNvbnN0IHBsdXNUcmFuc2Zvcm0gPSBzZWxmLmRhdGEuc2xpZGVEaXN0YW5jZSAqIHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIG5leHRTb3VyY2Uuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgcGx1c1RyYW5zZm9ybSArICdweCwwKSc7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoYW5nZSBzbGlkZSB0byBuZXh0IGFmdGVyIGNsaWNraW5nIGJ1dHRvblxyXG4gICAgICogQHBhcmFtIHNlbGZcclxuICAgICAqIEBwYXJhbSBwcmV2aW91c1NsaWRlXHJcbiAgICAgKi9cclxuICAgIG5leHRTbGlkZVZpYUJ1dHRvbjogZnVuY3Rpb24gKHNlbGYsIHByZXZpb3VzU2xpZGUpIHtcclxuICAgICAgICBpZiAocHJldmlvdXNTbGlkZSA9PT0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlcykge1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGUgPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zbGlkZSArPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLmRhdGEudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnNsaWRlKTtcclxuICAgICAgICBjb25zdCBuZXdTb3VyY2VzSW5kZXhlcyA9IHNlbGYuZ2V0U291cmNlc0luZGV4ZXMuYWxsKHNlbGYuZGF0YS5zbGlkZSk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZi5kYXRhLnNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMubmV4dF0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlcygnbmV4dCcsIHNlbGYuZGF0YS5zbGlkZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gc2VsZi5kYXRhLnNvdXJjZXM7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFNvdXJjZSA9IHNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMuY3VycmVudF07XHJcbiAgICAgICAgY29uc3QgcHJldmlvdXNTb3VyY2UgPSBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLnByZXZpb3VzXTtcclxuXHJcbiAgICAgICAgcHJldmlvdXNTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG4gICAgICAgIGN1cnJlbnRTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG4gICAgICAgIHNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMubmV4dF0uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG5cclxuICAgICAgICBwcmV2aW91c1NvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LWZhZGUtaW4tYW5pbWF0aW9uJyk7XHJcbiAgICAgICAgdm9pZCBwcmV2aW91c1NvdXJjZS5vZmZzZXRXaWR0aDtcclxuICAgICAgICBwcmV2aW91c1NvdXJjZS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LWZhZGUtaW4tYW5pbWF0aW9uJyk7XHJcblxyXG5cclxuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtZmFkZS1pbi1hbmltYXRpb24nKTtcclxuICAgICAgICB2b2lkIGN1cnJlbnRTb3VyY2Uub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgY3VycmVudFNvdXJjZS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LWZhZGUtaW4tYW5pbWF0aW9uJyk7XHJcblxyXG5cclxuICAgICAgICBjdXJyZW50U291cmNlLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoMCwwKSc7XHJcbiAgICAgICAgY29uc3QgbWludXNUcmFuc2Zvcm0gPSAtc2VsZi5kYXRhLnNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICBwcmV2aW91c1NvdXJjZS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyBtaW51c1RyYW5zZm9ybSArICdweCwwKSc7XHJcbiAgICB9XHJcblxyXG5cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWxmKSB7XHJcblxyXG4gICAgLy90byB0aGVzZSBlbGVtZW50cyBhcmUgYWRkZWQgbW91c2UgZXZlbnRzXHJcbiAgICBjb25zdCBlbGVtZW50cyA9IHtcclxuICAgICAgICBcIm1lZGlhSG9sZGVyXCI6IHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIsXHJcbiAgICAgICAgXCJuYXZcIjogc2VsZi5kYXRhLm5hdlxyXG4gICAgfTtcclxuICAgIC8vc291cmNlcyBhcmUgdHJhbnNmb3JtZWRcclxuICAgIGNvbnN0IHNvdXJjZXMgPSBzZWxmLmRhdGEuc291cmNlcztcclxuXHJcbiAgICBsZXQgaXNfZHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgIGxldCBtb3VzZURvd25DbGllbnRYO1xyXG4gICAgbGV0IGRpZmZlcmVuY2U7XHJcbiAgICBsZXQgc2xpZGVhQWJsZSA9IHRydWU7XHJcblxyXG4gICAgbGV0IGV2ZW50TGlzdGVuZXJzID0ge1xyXG5cclxuXHJcbiAgICAgICAgbW91c2VEb3duRXZlbnQ6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGVsZW0gaW4gZWxlbWVudHMpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzW2VsZW1dLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtY3Vyc29yLWdyYWJiaW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaXNfZHJhZ2dpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBtb3VzZURvd25DbGllbnRYID0gZS5jbGllbnRYO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgKCFzbGlkZWFBYmxlKSB7XHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgZGlmZmVyZW5jZSA9IDA7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIG1vdXNlVXBFdmVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgc291cmNlc0luZGV4ZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzZWxmLmRhdGEuc2xpZGUpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgZWxlbSBpbiBlbGVtZW50cykge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHNbZWxlbV0uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1jdXJzb3ItZ3JhYmJpbmcnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaXNfZHJhZ2dpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmIHVzZXIgZGlkbid0IHNsaWRlIG5vbmUgYW5pbWF0aW9uIHNob3VsZCB3b3JrXHJcbiAgICAgICAgICAgIGlmIChkaWZmZXJlbmNlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vd2UgY2FuIHNsaWRlIG9ubHkgaWYgcHJldmlvdXMgYW5pbWF0aW9uIGhhcyBmaW5pc2hlZFxyXG4gICAgICAgICAgICBpZiAoIXNsaWRlYUFibGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzbGlkZWFBYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgdHJhbnNpdGlvbiBpZiB1c2VyIHNsaWRlIHRvIHNvdXJjZVxyXG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0uY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBzbGlkZSBwcmV2aW91c1xyXG4gICAgICAgICAgICBpZiAoZGlmZmVyZW5jZSA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgc2xpZGUgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5kYXRhLnNsaWRlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKHNlbGYuZGF0YS50b3RhbF9zbGlkZXMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnNsaWRlIC0gMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWRlTmV4dFRyYW5zZm9ybSA9IHNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIHNsaWRlTmV4dFRyYW5zZm9ybSArICdweCwwKSc7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKDAsMCknO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGdldCBuZXcgaW5kZXhlc1xyXG4gICAgICAgICAgICAgICAgc291cmNlc0luZGV4ZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzZWxmLmRhdGEuc2xpZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vaWYgc291cmNlIGlzbid0IGFscmVhZHkgaW4gbWVtb3J5XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNlbGYuZGF0YS5zb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9hZHNvdXJjZXMoJ3ByZXZpb3VzJywgc2VsZi5kYXRhLnNsaWRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIHNsaWRlIG5leHRcclxuICAgICAgICAgICAgZWxzZSBpZiAoZGlmZmVyZW5jZSA8IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3VwZGF0ZSBzbGlkZSBudW1iZXJcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmRhdGEuc2xpZGUgPT09IHNlbGYuZGF0YS50b3RhbF9zbGlkZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEudXBkYXRlU2xpZGVOdW1iZXIoMSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEuc2xpZGUgKyAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzbGlkZUJhY2tUcmFuc2Zvcm0gPSAtc2VsZi5kYXRhLnNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgc2xpZGVCYWNrVHJhbnNmb3JtICsgJ3B4LDApJztcclxuICAgICAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgwLDApJztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgbmV3IGluZGV4ZXNcclxuICAgICAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzID0gc2VsZi5nZXRTb3VyY2VzSW5kZXhlcy5hbGwoc2VsZi5kYXRhLnNsaWRlKTtcclxuICAgICAgICAgICAgICAgIC8vaWYgc291cmNlIGlzbid0IGFscmVhZHkgaW4gbWVtb3J5XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNlbGYuZGF0YS5zb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlcygnbmV4dCcsIHNlbGYuZGF0YS5zbGlkZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRpZmZlcmVuY2UgPSAwO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRyYW5zaXRpb24gYmVjYXVzZSB3aXRoIGRyYWdnaW5nIGl0IGxvb2tzIGF3ZnVsXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHVzZXIgc2hvdWxkbid0IGJlIGFibGUgdG8gc2xpZGUgd2hlbiBhbmltYXRpb24gaXMgcnVubmluZ1xyXG4gICAgICAgICAgICAgICAgc2xpZGVhQWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0sIDI1MCk7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIG1vdXNlTW92ZUV2ZW50OiBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpc19kcmFnZ2luZyB8fCAhc2xpZGVhQWJsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkaWZmZXJlbmNlID0gZS5jbGllbnRYIC0gbW91c2VEb3duQ2xpZW50WDtcclxuICAgICAgICAgICAgY29uc3QgcHJldmlvdXMgPSAtc2VsZi5kYXRhLnNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aCArIGRpZmZlcmVuY2U7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHQgPSBzZWxmLmRhdGEuc2xpZGVEaXN0YW5jZSAqIHdpbmRvdy5pbm5lcldpZHRoICsgZGlmZmVyZW5jZTtcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlc0luZGV4ZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzZWxmLmRhdGEuc2xpZGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2xpZGUgc291cmNlc1xyXG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyBwcmV2aW91cyArICdweCwwKSc7XHJcbiAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgZGlmZmVyZW5jZSArICdweCwwKSc7XHJcbiAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgbmV4dCArICdweCwwKSc7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgZm9yIChsZXQgZWxlbSBpbiBlbGVtZW50cykge1xyXG4gICAgICAgIGVsZW1lbnRzW2VsZW1dLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGV2ZW50TGlzdGVuZXJzLm1vdXNlRG93bkV2ZW50KTtcclxuICAgIH1cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZXZlbnRMaXN0ZW5lcnMubW91c2VVcEV2ZW50KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBldmVudExpc3RlbmVycy5tb3VzZU1vdmVFdmVudCk7XHJcbn07Iiwid2luZG93LmZzTGlnaHRib3hPYmplY3QgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgdGhpcy5kYXRhID0ge1xyXG4gICAgICAgIHNsaWRlOiAxLFxyXG4gICAgICAgIHRvdGFsX3NsaWRlczogNixcclxuICAgICAgICB4UG9zaXRpb246IC0xLjMgKiB3aW5kb3cuaW5uZXJXaWR0aCxcclxuICAgICAgICBzbGlkZURpc3RhbmNlOiAxLjMsXHJcblxyXG4gICAgICAgIHNsaWRlQ291bnRlcjogdHJ1ZSxcclxuICAgICAgICBzbGlkZUJ1dHRvbnM6IHRydWUsXHJcbiAgICAgICAgaXNGaXJzdFRpbWVMb2FkOiBmYWxzZSxcclxuICAgICAgICBtb3ZlU2xpZGVzVmlhRHJhZzogdHJ1ZSxcclxuICAgICAgICBpc1JlbmRlcmluZ1Rvb2xiYXJCdXR0b25zOiB7XHJcbiAgICAgICAgICAgIFwiY2xvc2VcIjogdHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVybHM6IFtcclxuICAgICAgICAgICAgXCJpbWFnZXMvMS5qcGVnXCIsXHJcbiAgICAgICAgICAgIFwiaW1hZ2VzLzIuanBnXCIsXHJcbiAgICAgICAgICAgIC8vXCJpbWFnZXMvMy5qcGVnXCIsXHJcbiAgICAgICAgICAgIFwiZmlsbXMvZmlsbS5tcDRcIixcclxuICAgICAgICAgICAgXCJpbWFnZXMvNC5qcGVnXCIsXHJcbiAgICAgICAgICAgIFwiaW1hZ2VzLzUuanBnXCIsXHJcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1BUzVDeExDV3EtUVwiLFxyXG4gICAgICAgICAgICBcImltYWdlcy82LmpwZ1wiLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc291cmNlczogW10sXHJcbiAgICAgICAgc291cmNlc0xvYWRlZDogW10sXHJcbiAgICAgICAgcmVtZW1iZXJlZFNvdXJjZXNEaW1lbnNpb25zOiBbXSxcclxuXHJcbiAgICAgICAgbWVkaWFIb2xkZXI6IHt9LFxyXG4gICAgICAgIG5hdjoge30sXHJcbiAgICAgICAgdG9vbGJhcjoge30sXHJcbiAgICAgICAgc291cmNlRWxlbToge30sXHJcbiAgICAgICAgc2xpZGVDb3VudGVyRWxlbToge30sXHJcblxyXG4gICAgICAgIG9uUmVzaXplRXZlbnQ6IG5ldyBvblJlc2l6ZUV2ZW50KCksXHJcbiAgICAgICAgdXBkYXRlU2xpZGVOdW1iZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHtXaW5kb3d9XHJcbiAgICAgKi9cclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcblxyXG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG5ldyBzZWxmLmRvbSgpO1xyXG4gICAgICAgIHJlcXVpcmUoJy4vY2hhbmdlU2xpZGVCeURyYWdnaW5nLmpzJykoc2VsZik7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciBhbGwgbGlicmFyeSBlbGVtZW50c1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHRoaXMuZG9tID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJlcXVpcmUoJy4vcmVuZGVyRE9NLmpzJykoc2VsZiwgRE9NT2JqZWN0KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZzbGlnaHRib3gtY29udGFpbmVyJykucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlIGRvbSBlbGVtZW50IHdpdGggY2xhc3Nlc1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIERPTU9iamVjdCh0YWcpIHtcclxuICAgICAgICB0aGlzLmVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ2xhc3Nlc0FuZENyZWF0ZSA9IGZ1bmN0aW9uIChjbGFzc2VzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4IGluIGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzZXNbaW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9iamVjdCB0aGF0IGNvbnRhaW5zIGFsbCBhY3Rpb25zIHRoYXQgZnNsaWdodGJveCBpcyBkb2luZyBkdXJpbmcgcnVubmluZ1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIG9uUmVzaXplRXZlbnQoKSB7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5yZW1lbWJlcmRXaWR0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5yZW1lbWJlcmRIZWlnaHQgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhSG9sZGVyRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc291cmNlRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLm1lZGlhSG9sZGVyRGltZW5zaW9ucygpO1xyXG4gICAgICAgICAgICBfdGhpcy5zb3VyY2VEaW1lbnNpb25zKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTVkdJY29uIG9iamVjdCB3aXRoIGdldFNWR0ljb24gbWV0aG9kIHdoaWNoIHJldHVybiA8c3ZnPiBlbGVtZW50IHdpdGggPHBhdGg+IGNoaWxkXHJcbiAgICAgKiBAcmV0dXJucyB7RWxlbWVudH1cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLlNWR0ljb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIDxzdmc+IHdpdGggYWRkZWQgJ2ZzbGlnaHRib3gtc3ZnLWljb24nIGNsYXNzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgXCJzdmdcIik7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGNoaWxkIG9mIHN2ZyBlbXB0eSA8cGF0aD5cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgXCJwYXRoXCIpO1xyXG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICdjbGFzcycsICdmc2xpZ2h0Ym94LXN2Zy1pY29uJyk7XHJcbiAgICAgICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3ZpZXdCb3gnLCAnMCAwIDIwIDIwJyk7XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm5zIERPTSA8c3ZnPiBpY29uIGNvbnRhaW5pbmcgPHBhdGg+IGNoaWxkIHdpdGggZCBhdHRyaWJ1dGUgZnJvbSBwYXJhbWV0ZXJcclxuICAgICAgICAgKiBAcGFyYW0gZFxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZ2V0U1ZHSWNvbiA9IGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZCcsIGQpO1xyXG4gICAgICAgICAgICB0aGlzLnN2Zy5hcHBlbmRDaGlsZCh0aGlzLnBhdGgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdmc7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTbGlkZSBjb3VudGVyIG9iamVjdCAtIHVwcGVyIGxlZnQgY29ybmVyIG9mIGZzTGlnaHRib3hcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLnNsaWRlQ291bnRlckVsZW0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IG51bWJlckNvbnRhaW5lciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLW51bWJlci1jb250YWluZXInXSk7XHJcbiAgICAgICAgc2VsZi5kYXRhLnNsaWRlQ291bnRlckVsZW0gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1zbGlkZS1udW1iZXInXSk7XHJcblxyXG4gICAgICAgIHNlbGYuZGF0YS5zbGlkZUNvdW50ZXJFbGVtLmlubmVySFRNTCA9IHNlbGYuZGF0YS5zbGlkZTtcclxuICAgICAgICBzZWxmLmRhdGEuc2xpZGVDb3VudGVyRWxlbS5pZCA9ICdjdXJyZW50X3NsaWRlJztcclxuXHJcbiAgICAgICAgbGV0IHNwYWNlID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtc2xpZGUtbnVtYmVyJywgJ2ZzbGlnaHRib3gtc2xhc2gnXSk7XHJcbiAgICAgICAgc3BhY2UuaW5uZXJIVE1MID0gJy8nO1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVzID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtc2xpZGUtbnVtYmVyJ10pO1xyXG4gICAgICAgIHNsaWRlcy5pbm5lckhUTUwgPSBzZWxmLmRhdGEudG90YWxfc2xpZGVzO1xyXG5cclxuICAgICAgICBudW1iZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5kYXRhLnNsaWRlQ291bnRlckVsZW0pO1xyXG4gICAgICAgIG51bWJlckNvbnRhaW5lci5hcHBlbmRDaGlsZChzcGFjZSk7XHJcbiAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNsaWRlcyk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCBhZnRlciBzd2l0Y2hpbmcgc2xpZGVzXHJcbiAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyID0gZnVuY3Rpb24gKG51bWJlcikge1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGUgPSBudW1iZXI7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zbGlkZUNvdW50ZXJFbGVtLmlubmVySFRNTCA9IG51bWJlcjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlclNsaWRlQ291bnRlciA9IGZ1bmN0aW9uIChuYXYpIHtcclxuICAgICAgICAgICAgbmF2LmFwcGVuZENoaWxkKG51bWJlckNvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb29sYmFyIGJ1dHRvblxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHRoaXMudG9vbGJhckJ1dHRvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmJ1dHRvbiA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXRvb2xiYXItYnV0dG9uJywgJ2J1dHRvbi1zdHlsZSddKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRTVkdJY29uID0gZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgbGV0IFNWR0ljb24gPSBuZXcgc2VsZi5TVkdJY29uKCkuZ2V0U1ZHSWNvbihkKTtcclxuICAgICAgICAgICAgdGhpcy5idXR0b24uYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBTVkdJY29uXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5idXR0b24pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9vbGJhciBvYmplY3Qgd2hpY2ggY29udGFpbnMgdG9vbGJhciBidXR0b25zXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgdGhpcy50b29sYmFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMudG9vbGJhckVsZW0gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC10b29sYmFyJ10pO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlckRlZmF1bHRCdXR0b25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgc2hvdWxkUmVuZGVyQnV0dG9ucyA9IHNlbGYuZGF0YS5pc1JlbmRlcmluZ1Rvb2xiYXJCdXR0b25zO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNob3VsZFJlbmRlckJ1dHRvbnMuY2xvc2UgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBidXR0b24gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC10b29sYmFyLWJ1dHRvbicsICdidXR0b24tc3R5bGUnXSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3ZnID0gbmV3IHNlbGYuU1ZHSWNvbigpLmdldFNWR0ljb24oJ00gMTEuNDY5IDEwIGwgNy4wOCAtNy4wOCBjIDAuNDA2IC0wLjQwNiAwLjQwNiAtMS4wNjQgMCAtMS40NjkgYyAtMC40MDYgLTAuNDA2IC0xLjA2MyAtMC40MDYgLTEuNDY5IDAgTCAxMCA4LjUzIGwgLTcuMDgxIC03LjA4IGMgLTAuNDA2IC0wLjQwNiAtMS4wNjQgLTAuNDA2IC0xLjQ2OSAwIGMgLTAuNDA2IDAuNDA2IC0wLjQwNiAxLjA2MyAwIDEuNDY5IEwgOC41MzEgMTAgTCAxLjQ1IDE3LjA4MSBjIC0wLjQwNiAwLjQwNiAtMC40MDYgMS4wNjQgMCAxLjQ2OSBjIDAuMjAzIDAuMjAzIDAuNDY5IDAuMzA0IDAuNzM1IDAuMzA0IGMgMC4yNjYgMCAwLjUzMSAtMC4xMDEgMC43MzUgLTAuMzA0IEwgMTAgMTEuNDY5IGwgNy4wOCA3LjA4MSBjIDAuMjAzIDAuMjAzIDAuNDY5IDAuMzA0IDAuNzM1IDAuMzA0IGMgMC4yNjcgMCAwLjUzMiAtMC4xMDEgMC43MzUgLTAuMzA0IGMgMC40MDYgLTAuNDA2IDAuNDA2IC0xLjA2NCAwIC0xLjQ2OSBMIDExLjQ2OSAxMCBaJyk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoc3ZnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9vbGJhckVsZW0uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyVG9vbGJhciA9IGZ1bmN0aW9uIChuYXYpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJEZWZhdWx0QnV0dG9ucygpO1xyXG4gICAgICAgICAgICBuYXYuYXBwZW5kQ2hpbGQodGhpcy50b29sYmFyRWxlbSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRCdXR0b25Ub1Rvb2xiYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCB0b29sYmFyQnV0dG9uID0gbmV3IHNlbGYudG9vbGJhckJ1dHRvbigpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpdiB0aGF0IGhvbGRzIHNvdXJjZSBlbGVtXHJcbiAgICAgKi9cclxuICAgIHRoaXMubWVkaWFIb2xkZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5ob2xkZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1tZWRpYS1ob2xkZXInXSk7XHJcbiAgICAgICAgdGhpcy5ob2xkZXIuc3R5bGUud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCArICdweCc7XHJcbiAgICAgICAgdGhpcy5ob2xkZXIuc3R5bGUuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudC5tZWRpYUhvbGRlckRpbWVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuc3R5bGUud2lkdGggPSAzICogd2luZG93LmlubmVyV2lkdGggKyAncHgnO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5yZW5kZXJIb2xkZXIgPSBmdW5jdGlvbiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmhvbGRlcik7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIG9iamVjdCB3aXRoIHN0YWdlIHNvdXJjZXMgaW5kZXhlcyBkZXBlbmRpbmcgb24gcHJvdmlkZWQgc2xpZGVcclxuICAgICAqIEBwYXJhbSBzbGlkZVxyXG4gICAgICogQHJldHVybnMge3twcmV2aW91czogbnVtYmVyLCBjdXJyZW50OiBudW1iZXIsIG5leHQ6IG51bWJlcn19XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZ2V0U291cmNlc0luZGV4ZXMgPSB7XHJcblxyXG4gICAgICAgIHByZXZpb3VzOiBmdW5jdGlvbihzbGlkZSkge1xyXG4gICAgICAgICAgICBsZXQgcHJldmlvdXNTbGlkZUluZGV4O1xyXG4gICAgICAgICAgICBjb25zdCBhcnJheUluZGV4ID0gc2xpZGUgLSAxO1xyXG5cclxuICAgICAgICAgICAgLy8gcHJldmlvdXNcclxuICAgICAgICAgICAgaWYgKGFycmF5SW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzU2xpZGVJbmRleCA9IHNlbGYuZGF0YS50b3RhbF9zbGlkZXMgLSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNTbGlkZUluZGV4ID0gYXJyYXlJbmRleCAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1NsaWRlSW5kZXg7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uKHNsaWRlKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV4dFNsaWRlSW5kZXg7XHJcbiAgICAgICAgICAgIGNvbnN0IGFycmF5SW5kZXggPSBzbGlkZSAtIDE7XHJcblxyXG4gICAgICAgICAgICAvL25leHRcclxuICAgICAgICAgICAgaWYgKHNsaWRlID09PSBzZWxmLmRhdGEudG90YWxfc2xpZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGVJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGVJbmRleCA9IGFycmF5SW5kZXggKyAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV4dFNsaWRlSW5kZXg7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIGFsbDogZnVuY3Rpb24gKHNsaWRlKSB7XHJcbiAgICAgICAgICAgIC8vIHNvdXJjZXMgYXJlIHN0b3JlZCBpbiBhcnJheSBpbmRleGVkIGZyb20gMFxyXG4gICAgICAgICAgICBjb25zdCBhcnJheUluZGV4ID0gc2xpZGUgLSAxO1xyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IHtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzOiAwLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudDogMCxcclxuICAgICAgICAgICAgICAgIG5leHQ6IDBcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIHByZXZpb3VzXHJcbiAgICAgICAgICAgIGlmIChhcnJheUluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzSW5kZXhlcy5wcmV2aW91cyA9IHNlbGYuZGF0YS50b3RhbF9zbGlkZXMgLSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc291cmNlc0luZGV4ZXMucHJldmlvdXMgPSBhcnJheUluZGV4IC0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gY3VycmVudFxyXG4gICAgICAgICAgICBzb3VyY2VzSW5kZXhlcy5jdXJyZW50ID0gYXJyYXlJbmRleDtcclxuXHJcbiAgICAgICAgICAgIC8vbmV4dFxyXG4gICAgICAgICAgICBpZiAoc2xpZGUgPT09IHNlbGYuZGF0YS50b3RhbF9zbGlkZXMpIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzLm5leHQgPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc291cmNlc0luZGV4ZXMubmV4dCA9IGFycmF5SW5kZXggKyAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc291cmNlc0luZGV4ZXM7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWV0aG9kcyB0aGF0IGFwcGVuZHMgc291cmNlcyB0byBtZWRpYUhvbGRlciBkZXBlbmRpbmcgb24gYWN0aW9uXHJcbiAgICAgKiBAdHlwZSB7e2luaXRpYWxBcHBlbmQsIHByZXZpb3VzQXBwZW5kLCBuZXh0QXBwZW5kfXwqfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmFwcGVuZE1ldGhvZHMgPSByZXF1aXJlKCcuL2FwcGVuZFNvdXJjZScpO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3BsYXkgc291cmNlIChpbWFnZXMsIEhUTUw1IHZpZGVvLCBZb3VUdWJlIHZpZGVvKSBkZXBlbmRpbmcgb24gZ2l2ZW4gdXJsIGZyb20gdXNlclxyXG4gICAgICogT3IgaWYgZGlzcGxheSBpcyBpbml0aWFsIGRpc3BsYXkgMyBpbml0aWFsIHNvdXJjZXNcclxuICAgICAqIElmIHRoZXJlIGFyZSA+PSAzIGluaXRpYWwgc291cmNlcyB0aGVyZSB3aWxsIGJlIGFsd2F5cyAzIGluIHN0YWdlXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKiBAcGFyYW0gdHlwZU9mTG9hZFxyXG4gICAgICogQHJldHVybnMge21vZHVsZS5leHBvcnRzfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmxvYWRzb3VyY2VzID0gZnVuY3Rpb24gKHR5cGVPZkxvYWQsIHNsaWRlKSB7XHJcbiAgICAgICAgY29uc3QgbG9hZHNvdXJjZW1vZHVsZSA9IHJlcXVpcmUoXCIuL2xvYWRTb3VyY2UuanNcIik7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBsb2Fkc291cmNlbW9kdWxlKHNlbGYsIERPTU9iamVjdCwgdHlwZU9mTG9hZCwgc2xpZGUpO1xyXG4gICAgfTtcclxufTtcclxuXHJcblxyXG4hZnVuY3Rpb24gKCkge1xyXG59KGRvY3VtZW50LCB3aW5kb3cpO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWxmLCBET01PYmplY3QsIHR5cGVPZkxvYWQsIHNsaWRlKSB7XHJcblxyXG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xyXG4gICAgY29uc3Qgc291cmNlc0luZGV4ZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzbGlkZSk7XHJcbiAgICBjb25zdCB1cmxzID0gc2VsZi5kYXRhLnVybHM7XHJcbiAgICBjb25zdCBzb3VyY2VzID0gc2VsZi5kYXRhLnNvdXJjZXM7XHJcbiAgICBsZXQgdGVtcFNvdXJjZXMgPSB7fTtcclxuICAgIGxldCBzb3VyY2VDb3VudGVyID0gMDtcclxuXHJcbiAgICBsZXQgc291cmNlRGltZW5zaW9ucyA9IGZ1bmN0aW9uIChzb3VyY2VFbGVtLCBzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAgc291cmNlV2lkdGggPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgc291cmNlV2lkdGggPSBzZWxmLmRhdGEub25SZXNpemVFdmVudC5yZW1lbWJlcmRXaWR0aDtcclxuICAgICAgICAgICAgc291cmNlSGVpZ2h0ID0gc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQucmVtZW1iZXJkSGVpZ2h0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY29lZmZpY2llbnQgPSBzb3VyY2VXaWR0aCAvIHNvdXJjZUhlaWdodDtcclxuICAgICAgICBjb25zdCBkZXZpY2VXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGNvbnN0IGRldmljZUhlaWdodCA9IHBhcnNlSW50KHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuc3R5bGUuaGVpZ2h0KTtcclxuICAgICAgICBsZXQgbmV3SGVpZ2h0ID0gZGV2aWNlV2lkdGggLyBjb2VmZmljaWVudDtcclxuICAgICAgICBpZiAobmV3SGVpZ2h0IDwgZGV2aWNlSGVpZ2h0IC0gNjApIHtcclxuICAgICAgICAgICAgc291cmNlRWxlbS5zdHlsZS5oZWlnaHQgPSBuZXdIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIHNvdXJjZUVsZW0uc3R5bGUud2lkdGggPSBkZXZpY2VXaWR0aCArIFwicHhcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdIZWlnaHQgPSBkZXZpY2VIZWlnaHQgLSA2MDtcclxuICAgICAgICAgICAgc291cmNlRWxlbS5zdHlsZS5oZWlnaHQgPSBuZXdIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIHNvdXJjZUVsZW0uc3R5bGUud2lkdGggPSBuZXdIZWlnaHQgKiBjb2VmZmljaWVudCArIFwicHhcIjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZCBmYWRlIGluIGNsYXNzIGFuZCBkaW1lbnNpb24gZnVuY3Rpb25cclxuICAgICAqL1xyXG4gICAgbGV0IG9ubG9hZExpc3RlbmVyID0gZnVuY3Rpb24gKHNvdXJjZUVsZW0sIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQsIGFycmF5SW5kZXgpIHtcclxuXHJcbiAgICAgICAgc291cmNlQ291bnRlcisrO1xyXG5cclxuICAgICAgICBsZXQgc291cmNlSG9sZGVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc291cmNlLWhvbGRlciddKTtcclxuXHJcbiAgICAgICAgLy9ub3JtYWwgc291cmNlIGRpbWVuc2lvbnMgbmVlZHMgdG8gYmUgc3RvcmVkIGluIGFycmF5XHJcbiAgICAgICAgLy9pdCB3aWxsIGJlIG5lZWRlZCB3aGVuIGxvYWRpbmcgc291cmNlIGZyb20gbWVtb3J5XHJcbiAgICAgICAgc2VsZi5kYXRhLnJlbWVtYmVyZWRTb3VyY2VzRGltZW5zaW9uc1thcnJheUluZGV4XSA9IHtcclxuICAgICAgICAgICAgXCJ3aWR0aFwiOiBzb3VyY2VXaWR0aCxcclxuICAgICAgICAgICAgXCJoZWlnaHRcIjogc291cmNlSGVpZ2h0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9hZGQgbWV0aG9kIHRoYXQgY2hhbmdlcyBzb3VyY2UgZGltZW5zaW9uIG9uIHdpbmRvdyByZXNpemVcclxuICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudC5zb3VyY2VEaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzb3VyY2VEaW1lbnNpb25zKHNvdXJjZUVsZW0sIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vc2V0IGRpbWVuc2lvbiBmb3IgdGhlIGZpcnN0IHRpbWVcclxuICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudC5zb3VyY2VEaW1lbnNpb25zKHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQpO1xyXG5cclxuICAgICAgICAvLyBkaW1lbnNpb25zIHdpbGwgYmUgZ2l2ZW4gb25seSBvbmUgdGltZSBzbyB3ZSB3aWxsIG5lZWQgdG8gcmVtZW1iZXIgaXRcclxuICAgICAgICAvLyBmb3IgbmV4dCBvbnJlc2l6ZSBldmVudCBjYWxsc1xyXG4gICAgICAgIHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50LnJlbWVtYmVyZFdpZHRoID0gc291cmNlV2lkdGg7XHJcbiAgICAgICAgc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQucmVtZW1iZXJkSGVpZ2h0ID0gc291cmNlSGVpZ2h0O1xyXG4gICAgICAgIHNvdXJjZUhvbGRlci5hcHBlbmRDaGlsZChzb3VyY2VFbGVtKTtcclxuXHJcbiAgICAgICAgY29uc3QgcHJldmlvdXNTb3VyY2UgPSBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXTtcclxuICAgICAgICBjb25zdCBjdXJyZW50U291cmNlID0gc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XTtcclxuICAgICAgICBjb25zdCBuZXh0U291cmNlID0gc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XTtcclxuXHJcblxyXG4gICAgICAgIHN3aXRjaCAodHlwZU9mTG9hZCkge1xyXG4gICAgICAgICAgICBjYXNlICdpbml0aWFsJzpcclxuICAgICAgICAgICAgICAgIC8vIGFkZCB0byB0ZW1wIGFycmF5IGJlY2F1c2UgbG9hZGluZyBpcyBhc3luY2hyb25vdXMgc28gd2UgY2FuJ3QgZGVwZW5kIG9uIGxvYWQgb3JkZXJcclxuICAgICAgICAgICAgICAgIHRlbXBTb3VyY2VzW2FycmF5SW5kZXhdID0gc291cmNlSG9sZGVyO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHVybHMubGVuZ3RoID49IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhcHBlbmQgc291cmNlcyB3aGVuIGFsbCAzIGFyZSBsb2FkZWRcclxuICAgICAgICAgICAgICAgICAgICBpZihPYmplY3Qua2V5cyh0ZW1wU291cmNlcykubGVuZ3RoID49IDMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzU291cmNlLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1NvdXJjZS5hcHBlbmRDaGlsZCh0ZW1wU291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10uZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZvaWQgY3VycmVudFNvdXJjZS5maXJzdENoaWxkLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1NvdXJjZS5maXJzdENoaWxkLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNvdXJjZS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNvdXJjZS5hcHBlbmRDaGlsZCh0ZW1wU291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XS5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCBjdXJyZW50U291cmNlLmZpcnN0Q2hpbGQub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2UuZmlyc3RDaGlsZC5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LWZhZGUtaW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTb3VyY2UuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTb3VyY2UuYXBwZW5kQ2hpbGQodGVtcFNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0uZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZvaWQgY3VycmVudFNvdXJjZS5maXJzdENoaWxkLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0U291cmNlLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1mYWRlLWluJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ25leHQnOlxyXG4gICAgICAgICAgICAgICAgLy8gcmVwbGFjZSBsb2FkZXIgd2l0aCBsb2FkZWQgc291cmNlXHJcbiAgICAgICAgICAgICAgICBuZXh0U291cmNlLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgbmV4dFNvdXJjZS5hcHBlbmRDaGlsZChzb3VyY2VFbGVtKTtcclxuICAgICAgICAgICAgICAgIHZvaWQgY3VycmVudFNvdXJjZS5maXJzdENoaWxkLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgbmV4dFNvdXJjZS5maXJzdENoaWxkLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbicpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3ByZXZpb3VzJzpcclxuICAgICAgICAgICAgICAgIC8vIHJlcGxhY2UgbG9hZGVyIHdpdGggbG9hZGVkIHNvdXJjZVxyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNTb3VyY2UuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91c1NvdXJjZS5hcHBlbmRDaGlsZChzb3VyY2VFbGVtKTtcclxuICAgICAgICAgICAgICAgIHZvaWQgY3VycmVudFNvdXJjZS5maXJzdENoaWxkLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNTb3VyY2UuZmlyc3RDaGlsZC5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LWZhZGUtaW4nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMubG9hZFlvdXR1YmV2aWRlbyA9IGZ1bmN0aW9uICh2aWRlb0lkLCBhcnJheUluZGV4KSB7XHJcbiAgICAgICAgbGV0IGlmcmFtZSA9IG5ldyBET01PYmplY3QoJ2lmcmFtZScpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNpbmdsZS1zb3VyY2UnXSk7XHJcbiAgICAgICAgaWZyYW1lLnNyYyA9ICcvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8nICsgdmlkZW9JZDtcclxuICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvd2Z1bGxzY3JlZW4nLCAnJyk7XHJcbiAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnZnJhbWVib3JkZXInLCAnMCcpO1xyXG4gICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcclxuICAgICAgICBvbmxvYWRMaXN0ZW5lcihpZnJhbWUsIDE5MjAsIDEwODAsIGFycmF5SW5kZXgpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5pbWFnZUxvYWQgPSBmdW5jdGlvbiAoc3JjLCBhcnJheUluZGV4KSB7XHJcbiAgICAgICAgbGV0IHNvdXJjZUVsZW0gPSBuZXcgRE9NT2JqZWN0KCdpbWcnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zaW5nbGUtc291cmNlJ10pO1xyXG4gICAgICAgIHNvdXJjZUVsZW0uc3JjID0gc3JjO1xyXG4gICAgICAgIHNvdXJjZUVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb25sb2FkTGlzdGVuZXIoc291cmNlRWxlbSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIGFycmF5SW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy52aWRlb0xvYWQgPSBmdW5jdGlvbiAoc3JjLCBhcnJheUluZGV4KSB7XHJcbiAgICAgICAgbGV0IHZpZGVvRWxlbSA9IG5ldyBET01PYmplY3QoJ3ZpZGVvJykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2luZ2xlLXNvdXJjZSddKTtcclxuICAgICAgICBsZXQgc291cmNlID0gbmV3IERPTU9iamVjdCgnc291cmNlJykuZWxlbTtcclxuICAgICAgICBzb3VyY2Uuc3JjID0gc3JjO1xyXG4gICAgICAgIHZpZGVvRWxlbS5pbm5lclRleHQgPSAnU29ycnksIHlvdXIgYnJvd3NlciBkb2VzblxcJ3Qgc3VwcG9ydCBlbWJlZGRlZCB2aWRlb3MsIDxhXFxuJyArXHJcbiAgICAgICAgICAgICcgICAgICAgICAgICBocmVmPVwiaHR0cDovL2Rvd25sb2FkLmJsZW5kZXIub3JnL3BlYWNoL2JpZ2J1Y2tidW5ueV9tb3ZpZXMvQmlnQnVja0J1bm55XzMyMHgxODAubXA0XCI+ZG93bmxvYWQ8L2E+IGFuZCB3YXRjaFxcbicgK1xyXG4gICAgICAgICAgICAnICAgICAgICB3aXRoIHlvdXIgZmF2b3JpdGUgdmlkZW8gcGxheWVyISc7XHJcblxyXG4gICAgICAgIHZpZGVvRWxlbS5zZXRBdHRyaWJ1dGUoJ2NvbnRyb2xzJywgJycpO1xyXG4gICAgICAgIHZpZGVvRWxlbS5hcHBlbmRDaGlsZChzb3VyY2UpO1xyXG4gICAgICAgIHZpZGVvRWxlbS5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb25sb2FkTGlzdGVuZXIodmlkZW9FbGVtLCB0aGlzLnZpZGVvV2lkdGgsIHRoaXMudmlkZW9IZWlnaHQsIGFycmF5SW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmludmFsaWRGaWxlID0gZnVuY3Rpb24gKGFycmF5SW5kZXgpIHtcclxuICAgICAgICBsZXQgaW52YWxpZEZpbGVXcmFwcGVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtaW52YWxpZC1maWxlLXdyYXBwZXInXSk7XHJcbiAgICAgICAgaW52YWxpZEZpbGVXcmFwcGVyLmlubmVySFRNTCA9ICdJbnZhbGlkIGZpbGUnO1xyXG5cclxuICAgICAgICBvbmxvYWRMaXN0ZW5lcihpbnZhbGlkRmlsZVdyYXBwZXIsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQsIGFycmF5SW5kZXgpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtID0gZnVuY3Rpb24gKHNvdXJjZVVybCkge1xyXG4gICAgICAgIGNvbnN0IHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICBjb25zdCBpbmRleE9mU291cmNlID0gc2VsZi5kYXRhLnVybHMuaW5kZXhPZihzb3VyY2VVcmwpO1xyXG5cclxuICAgICAgICBwYXJzZXIuaHJlZiA9IHNvdXJjZVVybDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0SWQoc291cmNlVXJsKSB7XHJcbiAgICAgICAgICAgIGxldCByZWdFeHAgPSAvXi4qKHlvdXR1LmJlXFwvfHZcXC98dVxcL1xcd1xcL3xlbWJlZFxcL3x3YXRjaFxcP3Y9fFxcJnY9KShbXiNcXCZcXD9dKikuKi87XHJcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IHNvdXJjZVVybC5tYXRjaChyZWdFeHApO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1hdGNoICYmIG1hdGNoWzJdLmxlbmd0aCA9PSAxMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoWzJdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdlcnJvcic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXJzZXIuaG9zdG5hbWUgPT09ICd3d3cueW91dHViZS5jb20nKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFlvdXR1YmV2aWRlbyhnZXRJZChzb3VyY2VVcmwpLCBpbmRleE9mU291cmNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgeGhyLm9ubG9hZHN0YXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IFwiYmxvYlwiO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgd2hhdCB0eXBlIG9mIGZpbGUgcHJvdmlkZWQgZnJvbSBsaW5rXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXNwb25zZVR5cGUgPSB4aHIucmVzcG9uc2UudHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlLmluZGV4T2YoJy8nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlLnNsaWNlKDAsIHJlc3BvbnNlVHlwZS5pbmRleE9mKCcvJykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlVHlwZSA9PT0gJ2ltYWdlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW1hZ2VMb2FkKFVSTC5jcmVhdGVPYmplY3RVUkwoeGhyLnJlc3BvbnNlKSwgaW5kZXhPZlNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlVHlwZSA9PT0gJ3ZpZGVvJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudmlkZW9Mb2FkKFVSTC5jcmVhdGVPYmplY3RVUkwoeGhyLnJlc3BvbnNlKSwgaW5kZXhPZlNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW52YWxpZEZpbGUoaW5kZXhPZlNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB4aHIub3BlbignZ2V0Jywgc291cmNlVXJsLCB0cnVlKTtcclxuICAgICAgICAgICAgeGhyLnNlbmQobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgc3dpdGNoICh0eXBlT2ZMb2FkKSB7XHJcbiAgICAgICAgY2FzZSAnaW5pdGlhbCc6XHJcbiAgICAgICAgICAgIC8vYXBwZW5kIGxvYWRlciB3aGVuIGxvYWRpbmcgaW5pdGlhbGx5XHJcbiAgICAgICAgICAgIHNlbGYuYXBwZW5kTWV0aG9kcy5yZW5kZXJIb2xkZXJJbml0aWFsKHNlbGYsc2xpZGUsRE9NT2JqZWN0KTtcclxuXHJcbiAgICAgICAgICAgIGlmKHVybHMubGVuZ3RoID49IDMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbSh1cmxzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0odXJsc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0odXJsc1tzb3VyY2VzSW5kZXhlcy5uZXh0XSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAncHJldmlvdXMnOlxyXG4gICAgICAgICAgICAvLyBhcHBlbmQgbG9hZGVyIHdoZW4gbG9hZGluZyBhIG5leHQgc291cmNlXHJcbiAgICAgICAgICAgIHNlbGYuYXBwZW5kTWV0aG9kcy5yZW5kZXJIb2xkZXJQcmV2aW91cyhzZWxmLCBzbGlkZSwgRE9NT2JqZWN0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGxvYWQgcHJldmlvdXMgc291cmNlXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbSh1cmxzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlICduZXh0JzpcclxuICAgICAgICAgICAgLy8gYXBwZW5kIGxvYWRlciB3aGVuIGxvYWRpbmcgYSBuZXh0IHNvdXJjZVxyXG4gICAgICAgICAgICBzZWxmLmFwcGVuZE1ldGhvZHMucmVuZGVySG9sZGVyTmV4dChzZWxmLCBzbGlkZSwgRE9NT2JqZWN0KTtcclxuXHJcbiAgICAgICAgICAgIC8vbG9hZCBuZXh0IHNvdXJjZVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0odXJsc1tzb3VyY2VzSW5kZXhlcy5uZXh0XSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlbGYsIERPTU9iamVjdCkge1xyXG4gICAgbGV0IHByaXZhdGVNZXRob2RzID0ge1xyXG4gICAgICAgIHJlbmRlck5hdjogZnVuY3Rpb24gKGNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEubmF2ID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtbmF2J10pO1xyXG4gICAgICAgICAgICBuZXcgc2VsZi50b29sYmFyKCkucmVuZGVyVG9vbGJhcihzZWxmLmRhdGEubmF2KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxmLmRhdGEuc2xpZGVDb3VudGVyID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBuZXcgc2VsZi5zbGlkZUNvdW50ZXJFbGVtKCkucmVuZGVyU2xpZGVDb3VudGVyKHNlbGYuZGF0YS5uYXYpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5kYXRhLm5hdik7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyU2xpZGVCdXR0b25zOiBmdW5jdGlvbiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmRhdGEuc2xpZGVCdXR0b25zID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3JlbmRlciBsZWZ0IGJ0blxyXG4gICAgICAgICAgICBsZXQgbGVmdF9idG5fY29udGFpbmVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtYnRuLWNvbnRhaW5lciddKTtcclxuICAgICAgICAgICAgbGV0IGJ0biA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLWJ0bicsICdidXR0b24tc3R5bGUnXSk7XHJcbiAgICAgICAgICAgIGJ0bi5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgIG5ldyBzZWxmLlNWR0ljb24oKS5nZXRTVkdJY29uKCdNOC4zODgsMTAuMDQ5bDQuNzYtNC44NzNjMC4zMDMtMC4zMSwwLjI5Ny0wLjgwNC0wLjAxMi0xLjEwNWMtMC4zMDktMC4zMDQtMC44MDMtMC4yOTMtMS4xMDUsMC4wMTJMNi43MjYsOS41MTZjLTAuMzAzLDAuMzEtMC4yOTYsMC44MDUsMC4wMTIsMS4xMDVsNS40MzMsNS4zMDdjMC4xNTIsMC4xNDgsMC4zNSwwLjIyMywwLjU0NywwLjIyM2MwLjIwMywwLDAuNDA2LTAuMDgsMC41NTktMC4yMzZjMC4zMDMtMC4zMDksMC4yOTUtMC44MDMtMC4wMTItMS4xMDRMOC4zODgsMTAuMDQ5eicpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsZWZ0X2J0bl9jb250YWluZXIpO1xyXG5cclxuICAgICAgICAgICAgLy9nbyB0byBwcmV2aW91cyBzbGlkZSBvbmNsaWNrXHJcbiAgICAgICAgICAgIGxlZnRfYnRuX2NvbnRhaW5lci5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hcHBlbmRNZXRob2RzLnByZXZpb3VzU2xpZGVWaWFCdXR0b24oc2VsZixzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGVmdF9idG5fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ0bik7XHJcbiAgICAgICAgICAgIGxldCByaWdodF9idG5fY29udGFpbmVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtYnRuLWNvbnRhaW5lcicsICdmc2xpZ2h0Ym94LXNsaWRlLWJ0bi1yaWdodC1jb250YWluZXInXSk7XHJcbiAgICAgICAgICAgIGJ0biA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLWJ0bicsICdidXR0b24tc3R5bGUnXSk7XHJcbiAgICAgICAgICAgIGJ0bi5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgIG5ldyBzZWxmLlNWR0ljb24oKS5nZXRTVkdJY29uKCdNMTEuNjExLDEwLjA0OWwtNC43Ni00Ljg3M2MtMC4zMDMtMC4zMS0wLjI5Ny0wLjgwNCwwLjAxMi0xLjEwNWMwLjMwOS0wLjMwNCwwLjgwMy0wLjI5MywxLjEwNSwwLjAxMmw1LjMwNiw1LjQzM2MwLjMwNCwwLjMxLDAuMjk2LDAuODA1LTAuMDEyLDEuMTA1TDcuODMsMTUuOTI4Yy0wLjE1MiwwLjE0OC0wLjM1LDAuMjIzLTAuNTQ3LDAuMjIzYy0wLjIwMywwLTAuNDA2LTAuMDgtMC41NTktMC4yMzZjLTAuMzAzLTAuMzA5LTAuMjk1LTAuODAzLDAuMDEyLTEuMTA0TDExLjYxMSwxMC4wNDl6JylcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIC8vZ28gdG8gbmV4dCBzbGlkZSBvbmNsaWNrXHJcbiAgICAgICAgICAgIHJpZ2h0X2J0bl9jb250YWluZXIub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuYXBwZW5kTWV0aG9kcy5uZXh0U2xpZGVWaWFCdXR0b24oc2VsZixzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByaWdodF9idG5fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ0bik7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyaWdodF9idG5fY29udGFpbmVyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vZGlzYWJsZSBzY3JvbGxpbmdcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1vcGVuJyk7XHJcblxyXG4gICAgLy9jcmVhdGUgY29udGFpbmVyXHJcbiAgICBsZXQgY29udGFpbmVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtY29udGFpbmVyJ10pO1xyXG4gICAgY29udGFpbmVyLmlkID0gXCJmc2xpZ2h0Ym94LWNvbnRhaW5lclwiO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG5cclxuICAgIC8vcmVuZGVyIHNsaWRlIGJ1dHRvbnMgYW5kIG5hdih0b29sYmFyKVxyXG4gICAgcHJpdmF0ZU1ldGhvZHMucmVuZGVyTmF2KGNvbnRhaW5lcik7XHJcbiAgICBwcml2YXRlTWV0aG9kcy5yZW5kZXJTbGlkZUJ1dHRvbnMoY29udGFpbmVyKTtcclxuXHJcbiAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIgPSBuZXcgc2VsZi5tZWRpYUhvbGRlcigpO1xyXG4gICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLnJlbmRlckhvbGRlcihjb250YWluZXIpO1xyXG5cclxuICAgIHNlbGYuZGF0YS5pc2ZpcnN0VGltZUxvYWQgPSB0cnVlO1xyXG4gICAgc2VsZi5sb2Fkc291cmNlcygnaW5pdGlhbCcsIHNlbGYuZGF0YS5zbGlkZSk7XHJcbn07Il19
