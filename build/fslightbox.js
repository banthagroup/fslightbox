(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {

    loader: '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>',
    DOMObject: '',
    transition: 'fslightbox-transform-transition',
    fadeIn: 'fslightbox-fade-in-animation',
    fadeOut: 'fslightbox-fade-out-animation',

    createHolder: function (self, index) {
        let sourceHolder = new this.DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
        sourceHolder.innerHTML = this.loader;
        self.data.sources[index] = sourceHolder;
        return sourceHolder;
    },

    runFadeOutAnimationOnSlide(self, elem) {
        elem.classList.remove(this.fadeOut);
        void elem.offsetWidth;
        elem.classList.add(this.fadeOut);
    },


    /**
     * Renders loader when loading fsLightbox initially
     * @param slide
     * @param DOMObject
     */
    renderHolderInitial: function (self, slide, DOMObject) {
        this.DOMObject = DOMObject;
        const sourcesIndexes = self.getSourcesIndexes.all(slide);
        const totalSlides = self.data.total_slides;

        if (totalSlides >= 3) {
            const prev = this.createHolder(self, sourcesIndexes.previous);
            self.transforms.transformMinus(prev);
            self.data.mediaHolder.holder.appendChild(prev);
        }
        if (totalSlides >= 1) {
            const curr = this.createHolder(self, sourcesIndexes.current);
            self.data.mediaHolder.holder.appendChild(curr);
        }
        if (totalSlides >= 2) {
            const next = this.createHolder(self, sourcesIndexes.next);
            self.transforms.transformPlus(next);
            self.data.mediaHolder.holder.appendChild(next);
        }
    },

    renderHolder: function (self, slide, type) {
        switch (type) {
            case 'previous':
                this.renderHolderPrevious(self, slide);
                break;
            case 'current':
                this.renderHolderCurrent(self, slide);
                break;
            case 'next':
                this.renderHolderNext(self, slide);
                break;
        }
    },

    /**
     * Renders loader when loading a previous source
     * @param self
     * @param slide
     */
    renderHolderPrevious: function (self, slide) {
        const previousSourceIndex = self.getSourcesIndexes.previous(slide);
        const prev = this.createHolder(self, previousSourceIndex);
        self.transforms.transformMinus(prev);
        self.data.mediaHolder.holder.insertAdjacentElement('afterbegin', prev);
    },


    /**
     * Renders loader when loading a next source
     * @param self
     * @param slide
     */
    renderHolderNext: function (self, slide) {
        const nextSourceIndex = self.getSourcesIndexes.next(slide);
        const next = this.createHolder(self, nextSourceIndex);
        self.transforms.transformPlus(next);
        self.data.mediaHolder.holder.appendChild(next);
    },


    /**
     * Renders loader when loading a previous source
     * @param self
     * @param slide
     */
    renderHolderCurrent: function (self, slide) {
        const sourcesIndexes = self.getSourcesIndexes.all(slide);
        const curr = this.createHolder(self, sourcesIndexes.current);
        self.transforms.transformNull(curr);
        self.data.mediaHolder.holder.insertBefore(curr, self.data.sources[sourcesIndexes.next]);
    },


    /**
     * Change slide to previous after clicking button
     * @param self
     * @param previousSlide
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

        nextSource.classList.remove(this.transition);
        currentSource.classList.remove(this.transition);
        sources[newSourcesIndexes.previous].classList.remove(this.transition);

        this.runFadeOutAnimationOnSlide(self, nextSource);

        currentSource.classList.remove(this.fadeOut);
        void currentSource.offsetWidth;
        currentSource.classList.add(this.fadeIn);

        self.transforms.transformNull(currentSource);
        setTimeout(function () {
            self.transforms.transformPlus(nextSource);
        }, 230);
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

        previousSource.classList.remove(this.transition);
        currentSource.classList.remove(this.transition);
        sources[newSourcesIndexes.next].classList.remove(this.transition);

        currentSource.classList.remove(this.fadeOut);
        void currentSource.offsetWidth;
        currentSource.classList.add(this.fadeIn);

        this.runFadeOutAnimationOnSlide(self, previousSource);


        self.transforms.transformNull(currentSource);
        setTimeout(function () {
            self.transforms.transformMinus(previousSource);
        }, 230);
    }
};
},{}],2:[function(require,module,exports){
module.exports = function (self, DOMObject) {

    //we will hover all windows with div with high z-index to be sure mouseup is triggered
    const invisibleHover = new DOMObject('div').addClassesAndCreate(['fslightbox-invisible-hover']);
    const transformTransition = 'fslightbox-transform-transition';

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


    const mouseDownEvent = function (e) {

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
    };


    const mouseUpEvent = function () {

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
        sources[sourcesIndexes.previous].classList.add(transformTransition);
        sources[sourcesIndexes.current].classList.add(transformTransition);
        sources[sourcesIndexes.next].classList.add(transformTransition);


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
            } else {
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
            sources[sourcesIndexes.previous].classList.remove(transformTransition);
            sources[sourcesIndexes.current].classList.remove(transformTransition);
            sources[sourcesIndexes.next].classList.remove(transformTransition);

            // user shouldn't be able to slide when animation is running
            slideaAble = true;
        }, 300);
    };


    const mouseMoveEvent = function (e) {

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
    };

    const preventDefaultEvent = function (e) {
        e.preventDefault();
    };


    for (let elem in elements) {
        elements[elem].addEventListener('mousedown', mouseDownEvent);
        elements[elem].addEventListener('touchstart', mouseDownEvent, {passive: true});
    }
    window.addEventListener('mouseup', mouseUpEvent);
    window.addEventListener('touchend', mouseUpEvent);
    invisibleHover.addEventListener('mouseup', mouseUpEvent);
    invisibleHover.addEventListener('touchend', mouseUpEvent);
    window.addEventListener('mousemove', mouseMoveEvent);
    window.addEventListener('touchmove', mouseMoveEvent);
    self.data.nav.addEventListener('mousedown', preventDefaultEvent);
};
},{}],3:[function(require,module,exports){
window.fsLightboxObject = function () {

    this.element = new DOMObject('div').addClassesAndCreate(['fslightbox-container']);

    this.data = {
        slide: 1,
        total_slides: 1,
        slideDistance: 1.3,
        slideCounter: true,
        slideButtons: true,
        isFirstTimeLoad: false,
        moveSlidesViaDrag: true,
        toolbarButtons: {
            "close": true,
            "fullscreen": true
        },

        name: '',

        isMobile: false,

        urls: [],
        sources: [],
        sourcesLoaded: [],
        rememberedSourcesDimensions: [],
        videos: [],
        videosPosters: [],

        holderWrapper: {},
        mediaHolder: {},
        nav: {},
        toolbar: {},
        slideCounterElem: {},

        initiated: false,
        fullscreen: false,
        fadingOut: false,

        onResizeEvent: {},
        updateSlideNumber: function () {
        },
    };


    const self = this;


    /**
     * Init a new fsLightbox instance
     */
    this.init = function (initHref) {

        if (self.data.initiated) {
            self.initSetSlide(initHref);
            self.show();
            return;
        }

        self.checkIfMobile();
        self.data.onResizeEvent = new onResizeEvent();
        let gallery = self.data.name;

        let urls = [];
        const a = fsLightboxHelpers.a;
        for (let i = 0; i < a.length; i++) {
            if (!a[i].hasAttribute('fslightbox-gallery'))
                continue;

            if (a[i].getAttribute('fslightbox-gallery') === gallery) {
                let urlsLength = urls.push(a[i].getAttribute('href'));
                if (a[i].hasAttribute('fslightbox-video-poster'))
                    self.data.videosPosters[urlsLength - 1] = a[i].getAttribute('fslightbox-video-poster');
            }
        }
        self.data.urls = urls;
        self.data.total_slides = urls.length;
        new self.dom();
        self.throwEvent('init');
        self.throwEvent('open');
        require('./changeSlideByDragging.js')(self, DOMObject);

        self.initSetSlide(initHref);
        self.data.initiated = true;
    };


    /**
     * Init can have multiple type of slides
     * @param slide
     */
    this.initSetSlide = function (slide) {

        const type = typeof slide;

        switch (type) {
            case "string":
                self.setSlide(self.data.urls.indexOf(slide) + 1);
                break;
            case "number":
                self.setSlide(slide);
                break;
            case "undefined":
                self.setSlide(1);
                break;
        }
    };


    /**
     * Show dom of fsLightbox instance if exists
     */
    this.show = function () {
        const elem = self.element;
        self.scrollbar.showScrollbar();
        elem.classList.remove('fslightbox-container-fadeout');
        document.body.appendChild(elem);
        self.throwEvent('show');
        self.throwEvent('open');
        elem.classList.remove(['fslightbox-fade-in-window']);
        elem.classList.add(['fslightbox-fade-in-window']);
    };


    /**
     * Hide dom of existing fsLightbox instance
     */
    this.hide = function () {
        if (self.data.fullscreen) self.toolbar.closeFullscreen();
        self.element.classList.add('fslightbox-container-fadeout');
        self.data.fadingOut = true;
        self.throwEvent('close');
        setTimeout(function () {
            self.scrollbar.hideScrollbar();
            self.data.fadingOut = false;
            document.body.removeChild(self.element);
        }, 250);
    };

    /**
     * Render all library elements
     * @constructor
     */
    this.dom = function () {
        require('./renderDOM.js')(self, DOMObject);
    };


    /**
     * Create event and dispatch it to self.element
     */
    this.throwEvent = function (eventName) {
        let event;
        if (typeof (Event) === 'function') {
            event = new Event(eventName);
        } else {
            event = document.createEvent('Event');
            event.initEvent(eventName, true, true);
        }
        self.element.dispatchEvent(event);
    };


    this.checkIfMobile = function () {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            self.data.isMobile = true;
        } else {
            self.data.isMobile = false;
        }
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

        const transforms = function () {

            const sources = self.data.sources;
            const stageSources = self.getSourcesIndexes.all(self.data.slide);

            for (let sourceIndex in sources) {
                if (parseInt(sourceIndex) === stageSources.previous
                    || parseInt(sourceIndex) === stageSources.current
                    || parseInt(sourceIndex) === stageSources.next) {
                    continue;
                }
                sources[sourceIndex].classList.remove('fslightbox-transform-transition');
                self.transforms.transformMinus(sources[sourceIndex]);
            }
        };


        this.mediaHolderDimensions = function () {
            const mediaHolderStyle= self.data.mediaHolder.holder.style;
            if (window.innerWidth > 1000) {
                mediaHolderStyle.width = (window.innerWidth - 0.1 * window.innerWidth) + 'px';
                mediaHolderStyle.height = (window.innerHeight - 0.1 * window.innerHeight) + 'px';
            } else {
                mediaHolderStyle.width = window.innerWidth + 'px';
                mediaHolderStyle.height = window.innerHeight + 'px';
            }
        };

        const sourcesDimensions = function () {

            const stageSourcesIndexes = self.getSourcesIndexes.all(self.data.slide);
            const rememberedSourceDimension = self.data.rememberedSourcesDimensions;


            for (let sourceIndex in sources) {

                // add tranforms to stage sources
                if (self.data.urls.length > 2) {
                    self.transforms.transformMinus(sources[stageSourcesIndexes.previous]);
                }
                self.transforms.transformNull(sources[stageSourcesIndexes.current]);
                if (self.data.urls.length > 1) {
                    self.transforms.transformPlus(sources[stageSourcesIndexes.next]);
                }

                const elem = sources[sourceIndex].firstChild;


                let sourceWidth = rememberedSourceDimension[sourceIndex].width;
                let sourceHeight = rememberedSourceDimension[sourceIndex].height;

                const coefficient = sourceWidth / sourceHeight;
                const deviceWidth = parseInt(self.data.mediaHolder.holder.style.width);
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

        window.addEventListener('resize', function () {
            self.checkIfMobile();
            _this.mediaHolderDimensions();
            sourcesDimensions();
            transforms();
        });
    }


    /**
     * Contains methods that takes care of scrollbar
     * @type {{hideScrollbar: Window.scrollbar.hideScrollbar, showScrollbar: Window.scrollbar.showScrollbar}}
     */
    this.scrollbar = {

        hideScrollbar: function () {
            if (document.documentElement.classList.contains('fslightbox-scrollbarfix')) {
                let recompense = document.querySelector('.recompense-for-scrollbar');
                if (recompense) {
                    recompense.style.paddingRight = '0';
                }
                document.documentElement.classList.remove('fslightbox-scrollbarfix');
            }
            document.documentElement.classList.remove('fslightbox-open');
        },

        showScrollbar: function () {
            if (!self.data.isMobile && document.documentElement.offsetHeight >= window.innerHeight) {
                let recompense = document.querySelector('.recompense-for-scrollbar');
                if (recompense) {
                    recompense.style.paddingRight = '17px';
                }
                document.documentElement.classList.add('fslightbox-scrollbarfix');
            }
            document.documentElement.classList.add('fslightbox-open');
        }
    };


    /**
     * SVGIcon object with getSVGIcon method which return <svg> element with <path> child
     * @returns {Element}
     * @constructor
     */
    this.SVGIcon = function () {
        //  <svg> with added 'fslightbox-svg-icon' class
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");

        // child of svg empty <path>
        this.path = document.createElementNS('http://www.w3.org/2000/svg', "path");
        this.svg.setAttributeNS(null, 'class', 'fslightbox-svg-icon');
        this.svg.setAttributeNS(null, 'viewBox', '0 0 15 15');

        /**
         * Returns DOM <svg> icon containing <path> child with d attribute from parameter
         * @param d
         * @returns {*}
         */
        this.getSVGIcon = function (viewBox, dimension, d) {
            this.path.setAttributeNS(null, 'd', d);
            this.svg.setAttributeNS(null, 'viewBox', viewBox);
            this.svg.setAttributeNS(null, 'width', dimension);
            this.svg.setAttributeNS(null, 'height', dimension);
            this.svg.appendChild(this.path);
            return this.svg;
        }
    };

    /**
     * Toolbar object which contains toolbar buttons
     * @constructor
     */
    let toolbarModule = require('./toolbar');
    this.toolbar = new toolbarModule(self, DOMObject);


    /**
     * Div that holds source elem
     */
    this.mediaHolder = function () {
        this.holder = new DOMObject('div').addClassesAndCreate(['fslightbox-media-holder']);

        if (window.innerWidth > 1000) {
            this.holder.style.width = (window.innerWidth - 0.1 * window.innerWidth) + 'px';
            this.holder.style.height = (window.innerHeight - 0.1 * window.innerHeight) + 'px';
        } else {
            this.holder.style.width = window.innerWidth + 'px';
            this.holder.style.height = window.innerHeight + 'px';
        }

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


    this.transforms = {

        transformMinus: function (elem) {
            elem.style.transform = 'translate(' + (-self.data.slideDistance * window.innerWidth) + 'px,0)';
        },

        transformNull: function (elem) {
            elem.style.transform = 'translate(0,0)';
        },

        transformPlus: function (elem) {
            elem.style.transform = 'translate(' + self.data.slideDistance * window.innerWidth + 'px,0)';
        }
    };


    /**
     * Stop videos after changing slide
     */
    this.stopVideos = function () {

        const videos = self.data.videos;
        const sources = self.data.sources;

        // true is html5 video, false is youtube video
        for (let videoIndex in videos) {

            if (videos[videoIndex] === true) {
                if (typeof sources[videoIndex].firstChild.pause !== "undefined") {
                    sources[videoIndex].firstChild.pause();
                }
            } else {
                sources[videoIndex].firstChild.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
            }
        }
    };


    this.setSlide = function (slide) {

        self.data.slide = slide;
        self.data.updateSlideNumber(slide);
        const sourcesIndexes = self.getSourcesIndexes.all(slide);
        const sources = self.data.sources;

        if (sources.length === 0) {
            self.loadsources('initial', slide);
        } else {
            if (typeof sources[sourcesIndexes.previous] === "undefined")
                self.loadsources('previous', slide);


            if (typeof sources[sourcesIndexes.current] === "undefined")
                self.loadsources('current', slide);


            if (typeof sources[sourcesIndexes.next] === "undefined")
                self.loadsources('next', slide);
        }

        for (let sourceIndex in sources) {
            sources[sourceIndex].classList.remove('fslightbox-transform-transition');

            // sources length needs to be higher than 1 because if there is only 1 slide
            // sourcesIndexes.previous will be 0 so it would return a bad transition
            if (sourceIndex == sourcesIndexes.previous && sources.length > 1) {
                self.transforms.transformMinus(sources[sourcesIndexes.previous]);
                continue;
            }
            if (sourceIndex == sourcesIndexes.current) {
                self.transforms.transformNull(sources[sourcesIndexes.current]);
                continue;
            }
            if (sourceIndex == sourcesIndexes.next) {
                self.transforms.transformPlus(sources[sourcesIndexes.next]);
                continue;
            }

            self.transforms.transformMinus(sources[sourceIndex]);
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
     * @param typeOfLoad
     * @param slide
     * @returns {module.exports}
     */
    this.loadsources = function (typeOfLoad, slide) {
        const loadsourcemodule = require("./loadSource.js");
        return new loadsourcemodule(self, DOMObject, typeOfLoad, slide);
    };
};


!function () {
    window.fsLightboxInstances = [];
    window.fsLightboxHelpers = {
        "a": document.getElementsByTagName('a')
    };

    let a = fsLightboxHelpers.a;

    for (let i = 0; i < a.length; i++) {

        if (!a[i].hasAttribute('fslightbox-gallery')) {
            continue;
        }

        const boxName = a[i].getAttribute('fslightbox-gallery');
        if (typeof fsLightboxInstances[boxName] === "undefined") {
            fsLightbox = new fsLightboxObject();
            fsLightbox.data.name = boxName;
            fsLightboxInstances[boxName] = fsLightbox;
        }

        a[i].addEventListener('click', function (e) {
            e.preventDefault();
            let gallery = this.getAttribute('fslightbox-gallery');
            if (fsLightboxInstances[gallery].data.initiated) {
                fsLightboxInstances[gallery].setSlide(
                    fsLightboxInstances[gallery].data.urls.indexOf(this.getAttribute('href')) + 1
                );
                fsLightboxInstances[gallery].show();
                return;
            }
            fsLightboxInstances[gallery].init(this.getAttribute('href'));
        });
    }
}(document, window);

},{"./appendSource":1,"./changeSlideByDragging.js":2,"./loadSource.js":4,"./renderDOM.js":5,"./toolbar":6}],4:[function(require,module,exports){
module.exports = function (self, DOMObject, typeOfLoad, slide) {

    const sourcesIndexes = self.getSourcesIndexes.all(slide);
    const urls = self.data.urls;
    const sources = self.data.sources;

    let sourceDimensions = function (sourceElem, sourceWidth, sourceHeight) {

        const coefficient = sourceWidth / sourceHeight;
        const deviceWidth = parseInt(self.data.mediaHolder.holder.style.width);
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


    let load = function (sourceHolder, sourceElem) {
        sourceHolder.innerHTML = '';
        sourceHolder.appendChild(sourceElem);
        void sourceHolder.firstChild.offsetWidth;
        sourceHolder.firstChild.classList.add('fslightbox-fade-in-animation');
    };

    let appendInitial = function (sourceHolder, sourceElem) {
        sourceHolder.innerHTML = '';
        sourceHolder.appendChild(sourceElem);
        sourceHolder.firstChild.classList.add('fslightbox-fade-in-animation');
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

        if(typeOfLoad === 'initial') {
            appendInitial(sources[arrayIndex], sourceElem);
        } else {
            load(sources[arrayIndex], sourceElem);
        }
    };


    const loadYoutubevideo = function (videoId, arrayIndex) {
        let iframe = new DOMObject('iframe').addClassesAndCreate(['fslightbox-single-source']);
        iframe.src = '//www.youtube.com/embed/' + videoId + '?enablejsapi=1';
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('frameborder', '0');
        self.data.mediaHolder.holder.appendChild(iframe);
        onloadListener(iframe, 1920, 1080, arrayIndex);
    };


    const imageLoad = function (src, arrayIndex) {
        let sourceElem = new DOMObject('img').addClassesAndCreate(['fslightbox-single-source']);
        sourceElem.src = src;
        sourceElem.addEventListener('load', function () {
            onloadListener(sourceElem, this.width, this.height, arrayIndex);
        });
    };


    const videoLoad = function (src, arrayIndex, type) {
        let videoLoaded = false;
        let videoElem = new DOMObject('video').addClassesAndCreate(['fslightbox-single-source']);
        let source = new DOMObject('source').elem;
        if(self.data.videosPosters[arrayIndex]) {
            videoElem.poster = self.data.videosPosters[arrayIndex];
            videoElem.style.objectFit = 'cover';
        }
        source.src = src;
        source.type = type;
        videoElem.appendChild(source);
        let width;
        let height;
        videoElem.onloadedmetadata = function () {
            if (videoLoaded) {
                return;
            }
            // if browser don't support videoWidth and videoHeight we need to add default ones
            if (!this.videoWidth || this.videoWidth === 0) {
                width = 1920;
                height = 1080;
            } else {
                width = this.videoWidth;
                height = this.videoHeight;
            }
            videoLoaded = true;
            onloadListener(videoElem, width, height, arrayIndex);
        };

        // if browser don't supprt both onloadmetadata or .videoWidth we will load it after 3000ms
        let counter = 0;

        // ON IE on load event dont work so we need to wait for dimensions with setTimeouts
        let IEFix = setInterval(function () {

            if(videoLoaded) {
                clearInterval(IEFix);
                return;
            }
            if (!videoElem.videoWidth || videoElem .videoWidth === 0) {
                if(counter < 31) {
                    counter++;
                    return;
                } else {
                    width = 1920;
                    height = 1080;
                }
            } else {
                width = videoElem.videoWidth;
                height = videoElem.videoHeight;
            }

            videoLoaded = true;
            onloadListener(videoElem, width, height, arrayIndex);
            clearInterval(IEFix);
        }, 100);

        videoElem.setAttribute('controls', '');
    };

    const invalidFile = function (arrayIndex) {
        let invalidFileWrapper = new DOMObject('div').addClassesAndCreate(['fslightbox-invalid-file-wrapper']);
        invalidFileWrapper.innerHTML = 'Invalid file';

        onloadListener(invalidFileWrapper, window.innerWidth, window.innerHeight, arrayIndex);
    };


    this.createSourceElem = function (urlIndex) {
        const parser = document.createElement('a');
        const sourceUrl = self.data.urls[urlIndex];

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
            self.data.videos[urlIndex] = false;
            loadYoutubevideo(getId(sourceUrl), urlIndex);
        } else {
            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 2) {
                    if (xhr.status === 200 || xhr.status === 206) {
                        //check what type of file provided from link
                        const responseType = xhr.getResponseHeader('content-type');
                        const dataType = responseType.slice(0, responseType.indexOf('/'));

                        if (dataType === 'image') {
                            imageLoad(urls[urlIndex], urlIndex);
                        }

                        else if (dataType === 'video') {
                            videoLoad(urls[urlIndex], urlIndex, responseType);
                            self.data.videos[urlIndex] = true;
                        }

                        else {
                            invalidFile(urlIndex);
                        }
                    }
                    else {
                        invalidFile(urlIndex);
                    }
                    xhr.abort();
                }
            };

            xhr.open('get', sourceUrl, true);
            xhr.send(null);
        }
    };


    if (typeOfLoad === 'initial') {
        //append loader when loading initially
        self.appendMethods.renderHolderInitial(self, slide, DOMObject);

        if (urls.length >= 1) {
            this.createSourceElem(sourcesIndexes.current);
        }

        if (urls.length >= 2) {
            this.createSourceElem(sourcesIndexes.next);
        }

        if (urls.length >= 3) {
            this.createSourceElem(sourcesIndexes.previous);
        }
    } else {
        // append loader when loading a next source
        self.appendMethods.renderHolder(self, slide, typeOfLoad);

        switch (typeOfLoad) {
            case 'previous':
                this.createSourceElem(sourcesIndexes.previous);
                break;
            case 'current':
                this.createSourceElem(sourcesIndexes.current);
                break;
            case 'next':
                this.createSourceElem(sourcesIndexes.next);
                break;
        }
    }
};
},{}],5:[function(require,module,exports){
module.exports = function (self, DOMObject) {


    /**
     * Slide counter object - upper left corner of fsLightbox
     * @constructor
     */
    const slideCounter = function () {
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
            if (self.data.slideCounter)
                nav.appendChild(numberContainer);
        }
    };


    const renderNav = function (container) {
        self.data.nav = new DOMObject('div').addClassesAndCreate(['fslightbox-nav']);
        self.toolbar.renderToolbar(self.data.nav);

        const counter = new slideCounter();
        counter.renderSlideCounter(self.data.nav);
        container.appendChild(self.data.nav);

    };

    const createBTN = function (buttonContainer, container, d) {
        let btn = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn', 'button-style']);
        btn.appendChild(
            new self.SVGIcon().getSVGIcon('0 0 20 20', '1em', d)
        );
        buttonContainer.appendChild(btn);
        container.appendChild(buttonContainer);
    };

    const renderSlideButtons = function (container) {
        if (self.data.slideButtons === false) {
            return false;
        }
        //render left btn
        let left_btn_container = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn-container', 'fslightbox-slide-btn-left-container']);
        createBTN(left_btn_container, container, 'M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z');

        //go to previous slide onclick
        left_btn_container.onclick = function () {
            self.appendMethods.previousSlideViaButton(self, self.data.slide);
        };

        let right_btn_container = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn-container', 'fslightbox-slide-btn-right-container']);
        createBTN(right_btn_container, container, 'M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z');
        // go to next slide on click
        right_btn_container.onclick = function () {
            self.appendMethods.nextSlideViaButton(self, self.data.slide);
        };
    };

    //disable scrolling and add fix for jumping site if not mobile
    self.scrollbar.showScrollbar();
    self.element.id = "fslightbox-container";
    document.body.appendChild(self.element);

    //render slide buttons and nav(toolbar)
    renderNav(self.element);

    if (self.data.total_slides > 1) {
        renderSlideButtons(self.element);
    }

    self.data.holderWrapper = new DOMObject('div').addClassesAndCreate(['fslightbox-holder-wrapper']);
    self.element.appendChild(self.data.holderWrapper);
    self.data.mediaHolder = new self.mediaHolder();
    self.data.mediaHolder.renderHolder(self.data.holderWrapper);
    self.element.classList.add(['fslightbox-fade-in-animation']);
    self.data.isfirstTimeLoad = true;
};
},{}],6:[function(require,module,exports){
module.exports = function (self, DOMObject) {

    this.toolbarElem = new DOMObject('div').addClassesAndCreate(['fslightbox-toolbar']);
    const _this = this;

    this.renderDefaultButtons = function () {
        let shouldRenderButtons = self.data.toolbarButtons;

        if (shouldRenderButtons.fullscreen === true) {
            let button = new DOMObject('div').addClassesAndCreate(['fslightbox-toolbar-button', 'button-style']);
            let svg = new self.SVGIcon().getSVGIcon('0 0 17.5 17.5', '1.25em', 'M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z');
            button.appendChild(svg);
            button.onclick = function () {
                (self.data.fullscreen) ?
                    _this.closeFullscreen():
                    _this.openFullscreen();

            };
            this.toolbarElem.appendChild(button);
        }

        if (shouldRenderButtons.close === true) {
            let button = new DOMObject('div').addClassesAndCreate(['fslightbox-toolbar-button', 'button-style']);
            let svg = new self.SVGIcon().getSVGIcon('0 0 20 20', '1em', 'M 11.469 10 l 7.08 -7.08 c 0.406 -0.406 0.406 -1.064 0 -1.469 c -0.406 -0.406 -1.063 -0.406 -1.469 0 L 10 8.53 l -7.081 -7.08 c -0.406 -0.406 -1.064 -0.406 -1.469 0 c -0.406 0.406 -0.406 1.063 0 1.469 L 8.531 10 L 1.45 17.081 c -0.406 0.406 -0.406 1.064 0 1.469 c 0.203 0.203 0.469 0.304 0.735 0.304 c 0.266 0 0.531 -0.101 0.735 -0.304 L 10 11.469 l 7.08 7.081 c 0.203 0.203 0.469 0.304 0.735 0.304 c 0.267 0 0.532 -0.101 0.735 -0.304 c 0.406 -0.406 0.406 -1.064 0 -1.469 L 11.469 10 Z');
            button.appendChild(svg);
            button.onclick = function () {
                if(!self.data.fadingOut) self.hide();
            };
            this.toolbarElem.appendChild(button);
        }
    };


    this.openFullscreen = function () {
        self.data.fullscreen = true;
        let elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    };

    this.closeFullscreen = function () {
        self.data.fullscreen = false;
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    };

    this.renderToolbar = function (nav) {
        this.renderDefaultButtons();
        nav.appendChild(this.toolbarElem);
    };
};
},{}]},{},[3,5,4,1,2,6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwZW5kU291cmNlLmpzIiwic3JjL2pzL2NoYW5nZVNsaWRlQnlEcmFnZ2luZy5qcyIsInNyYy9qcy9pbmRleC5qcyIsInNyYy9qcy9sb2FkU291cmNlLmpzIiwic3JjL2pzL3JlbmRlckRPTS5qcyIsInNyYy9qcy90b29sYmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJtb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIGxvYWRlcjogJzxkaXYgY2xhc3M9XCJsZHMtcmluZ1wiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+JyxcbiAgICBET01PYmplY3Q6ICcnLFxuICAgIHRyYW5zaXRpb246ICdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyxcbiAgICBmYWRlSW46ICdmc2xpZ2h0Ym94LWZhZGUtaW4tYW5pbWF0aW9uJyxcbiAgICBmYWRlT3V0OiAnZnNsaWdodGJveC1mYWRlLW91dC1hbmltYXRpb24nLFxuXG4gICAgY3JlYXRlSG9sZGVyOiBmdW5jdGlvbiAoc2VsZiwgaW5kZXgpIHtcbiAgICAgICAgbGV0IHNvdXJjZUhvbGRlciA9IG5ldyB0aGlzLkRPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc291cmNlLWhvbGRlciddKTtcbiAgICAgICAgc291cmNlSG9sZGVyLmlubmVySFRNTCA9IHRoaXMubG9hZGVyO1xuICAgICAgICBzZWxmLmRhdGEuc291cmNlc1tpbmRleF0gPSBzb3VyY2VIb2xkZXI7XG4gICAgICAgIHJldHVybiBzb3VyY2VIb2xkZXI7XG4gICAgfSxcblxuICAgIHJ1bkZhZGVPdXRBbmltYXRpb25PblNsaWRlKHNlbGYsIGVsZW0pIHtcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZmFkZU91dCk7XG4gICAgICAgIHZvaWQgZWxlbS5vZmZzZXRXaWR0aDtcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKHRoaXMuZmFkZU91dCk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBsb2FkZXIgd2hlbiBsb2FkaW5nIGZzTGlnaHRib3ggaW5pdGlhbGx5XG4gICAgICogQHBhcmFtIHNsaWRlXG4gICAgICogQHBhcmFtIERPTU9iamVjdFxuICAgICAqL1xuICAgIHJlbmRlckhvbGRlckluaXRpYWw6IGZ1bmN0aW9uIChzZWxmLCBzbGlkZSwgRE9NT2JqZWN0KSB7XG4gICAgICAgIHRoaXMuRE9NT2JqZWN0ID0gRE9NT2JqZWN0O1xuICAgICAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IHNlbGYuZ2V0U291cmNlc0luZGV4ZXMuYWxsKHNsaWRlKTtcbiAgICAgICAgY29uc3QgdG90YWxTbGlkZXMgPSBzZWxmLmRhdGEudG90YWxfc2xpZGVzO1xuXG4gICAgICAgIGlmICh0b3RhbFNsaWRlcyA+PSAzKSB7XG4gICAgICAgICAgICBjb25zdCBwcmV2ID0gdGhpcy5jcmVhdGVIb2xkZXIoc2VsZiwgc291cmNlc0luZGV4ZXMucHJldmlvdXMpO1xuICAgICAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybU1pbnVzKHByZXYpO1xuICAgICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5hcHBlbmRDaGlsZChwcmV2KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG90YWxTbGlkZXMgPj0gMSkge1xuICAgICAgICAgICAgY29uc3QgY3VyciA9IHRoaXMuY3JlYXRlSG9sZGVyKHNlbGYsIHNvdXJjZXNJbmRleGVzLmN1cnJlbnQpO1xuICAgICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5hcHBlbmRDaGlsZChjdXJyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG90YWxTbGlkZXMgPj0gMikge1xuICAgICAgICAgICAgY29uc3QgbmV4dCA9IHRoaXMuY3JlYXRlSG9sZGVyKHNlbGYsIHNvdXJjZXNJbmRleGVzLm5leHQpO1xuICAgICAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybVBsdXMobmV4dCk7XG4gICAgICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLmFwcGVuZENoaWxkKG5leHQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbmRlckhvbGRlcjogZnVuY3Rpb24gKHNlbGYsIHNsaWRlLCB0eXBlKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAncHJldmlvdXMnOlxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVySG9sZGVyUHJldmlvdXMoc2VsZiwgc2xpZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY3VycmVudCc6XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJIb2xkZXJDdXJyZW50KHNlbGYsIHNsaWRlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ25leHQnOlxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVySG9sZGVyTmV4dChzZWxmLCBzbGlkZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBsb2FkZXIgd2hlbiBsb2FkaW5nIGEgcHJldmlvdXMgc291cmNlXG4gICAgICogQHBhcmFtIHNlbGZcbiAgICAgKiBAcGFyYW0gc2xpZGVcbiAgICAgKi9cbiAgICByZW5kZXJIb2xkZXJQcmV2aW91czogZnVuY3Rpb24gKHNlbGYsIHNsaWRlKSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzU291cmNlSW5kZXggPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLnByZXZpb3VzKHNsaWRlKTtcbiAgICAgICAgY29uc3QgcHJldiA9IHRoaXMuY3JlYXRlSG9sZGVyKHNlbGYsIHByZXZpb3VzU291cmNlSW5kZXgpO1xuICAgICAgICBzZWxmLnRyYW5zZm9ybXMudHJhbnNmb3JtTWludXMocHJldik7XG4gICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgcHJldik7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBsb2FkZXIgd2hlbiBsb2FkaW5nIGEgbmV4dCBzb3VyY2VcbiAgICAgKiBAcGFyYW0gc2VsZlxuICAgICAqIEBwYXJhbSBzbGlkZVxuICAgICAqL1xuICAgIHJlbmRlckhvbGRlck5leHQ6IGZ1bmN0aW9uIChzZWxmLCBzbGlkZSkge1xuICAgICAgICBjb25zdCBuZXh0U291cmNlSW5kZXggPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLm5leHQoc2xpZGUpO1xuICAgICAgICBjb25zdCBuZXh0ID0gdGhpcy5jcmVhdGVIb2xkZXIoc2VsZiwgbmV4dFNvdXJjZUluZGV4KTtcbiAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybVBsdXMobmV4dCk7XG4gICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuYXBwZW5kQ2hpbGQobmV4dCk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBsb2FkZXIgd2hlbiBsb2FkaW5nIGEgcHJldmlvdXMgc291cmNlXG4gICAgICogQHBhcmFtIHNlbGZcbiAgICAgKiBAcGFyYW0gc2xpZGVcbiAgICAgKi9cbiAgICByZW5kZXJIb2xkZXJDdXJyZW50OiBmdW5jdGlvbiAoc2VsZiwgc2xpZGUpIHtcbiAgICAgICAgY29uc3Qgc291cmNlc0luZGV4ZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzbGlkZSk7XG4gICAgICAgIGNvbnN0IGN1cnIgPSB0aGlzLmNyZWF0ZUhvbGRlcihzZWxmLCBzb3VyY2VzSW5kZXhlcy5jdXJyZW50KTtcbiAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybU51bGwoY3Vycik7XG4gICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuaW5zZXJ0QmVmb3JlKGN1cnIsIHNlbGYuZGF0YS5zb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBDaGFuZ2Ugc2xpZGUgdG8gcHJldmlvdXMgYWZ0ZXIgY2xpY2tpbmcgYnV0dG9uXG4gICAgICogQHBhcmFtIHNlbGZcbiAgICAgKiBAcGFyYW0gcHJldmlvdXNTbGlkZVxuICAgICAqL1xuICAgIHByZXZpb3VzU2xpZGVWaWFCdXR0b246IGZ1bmN0aW9uIChzZWxmLCBwcmV2aW91c1NsaWRlKSB7XG4gICAgICAgIGlmIChwcmV2aW91c1NsaWRlID09PSAxKSB7XG4gICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGUgPSBzZWxmLmRhdGEudG90YWxfc2xpZGVzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlIC09IDE7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnN0b3BWaWRlb3MoKTtcbiAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKHNlbGYuZGF0YS5zbGlkZSk7XG4gICAgICAgIGNvbnN0IG5ld1NvdXJjZXNJbmRleGVzID0gc2VsZi5nZXRTb3VyY2VzSW5kZXhlcy5hbGwoc2VsZi5kYXRhLnNsaWRlKTtcblxuICAgICAgICBpZiAodHlwZW9mIHNlbGYuZGF0YS5zb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLnByZXZpb3VzXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlcygncHJldmlvdXMnLCBzZWxmLmRhdGEuc2xpZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc291cmNlcyA9IHNlbGYuZGF0YS5zb3VyY2VzO1xuICAgICAgICBjb25zdCBjdXJyZW50U291cmNlID0gc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5jdXJyZW50XTtcbiAgICAgICAgY29uc3QgbmV4dFNvdXJjZSA9IHNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMubmV4dF07XG5cbiAgICAgICAgbmV4dFNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMudHJhbnNpdGlvbik7XG4gICAgICAgIGN1cnJlbnRTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnRyYW5zaXRpb24pO1xuICAgICAgICBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMudHJhbnNpdGlvbik7XG5cbiAgICAgICAgdGhpcy5ydW5GYWRlT3V0QW5pbWF0aW9uT25TbGlkZShzZWxmLCBuZXh0U291cmNlKTtcblxuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5mYWRlT3V0KTtcbiAgICAgICAgdm9pZCBjdXJyZW50U291cmNlLm9mZnNldFdpZHRoO1xuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5hZGQodGhpcy5mYWRlSW4pO1xuXG4gICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1OdWxsKGN1cnJlbnRTb3VyY2UpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1QbHVzKG5leHRTb3VyY2UpO1xuICAgICAgICB9LCAyMzApO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIENoYW5nZSBzbGlkZSB0byBuZXh0IGFmdGVyIGNsaWNraW5nIGJ1dHRvblxuICAgICAqIEBwYXJhbSBzZWxmXG4gICAgICogQHBhcmFtIHByZXZpb3VzU2xpZGVcbiAgICAgKi9cbiAgICBuZXh0U2xpZGVWaWFCdXR0b246IGZ1bmN0aW9uIChzZWxmLCBwcmV2aW91c1NsaWRlKSB7XG4gICAgICAgIGlmIChwcmV2aW91c1NsaWRlID09PSBzZWxmLmRhdGEudG90YWxfc2xpZGVzKSB7XG4gICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGUgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnN0b3BWaWRlb3MoKTtcbiAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKHNlbGYuZGF0YS5zbGlkZSk7XG4gICAgICAgIGNvbnN0IG5ld1NvdXJjZXNJbmRleGVzID0gc2VsZi5nZXRTb3VyY2VzSW5kZXhlcy5hbGwoc2VsZi5kYXRhLnNsaWRlKTtcblxuICAgICAgICBpZiAodHlwZW9mIHNlbGYuZGF0YS5zb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLm5leHRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBzZWxmLmxvYWRzb3VyY2VzKCduZXh0Jywgc2VsZi5kYXRhLnNsaWRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSBzZWxmLmRhdGEuc291cmNlcztcbiAgICAgICAgY29uc3QgY3VycmVudFNvdXJjZSA9IHNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMuY3VycmVudF07XG4gICAgICAgIGNvbnN0IHByZXZpb3VzU291cmNlID0gc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5wcmV2aW91c107XG5cbiAgICAgICAgcHJldmlvdXNTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnRyYW5zaXRpb24pO1xuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy50cmFuc2l0aW9uKTtcbiAgICAgICAgc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5uZXh0XS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMudHJhbnNpdGlvbik7XG5cbiAgICAgICAgY3VycmVudFNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZmFkZU91dCk7XG4gICAgICAgIHZvaWQgY3VycmVudFNvdXJjZS5vZmZzZXRXaWR0aDtcbiAgICAgICAgY3VycmVudFNvdXJjZS5jbGFzc0xpc3QuYWRkKHRoaXMuZmFkZUluKTtcblxuICAgICAgICB0aGlzLnJ1bkZhZGVPdXRBbmltYXRpb25PblNsaWRlKHNlbGYsIHByZXZpb3VzU291cmNlKTtcblxuXG4gICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1OdWxsKGN1cnJlbnRTb3VyY2UpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1NaW51cyhwcmV2aW91c1NvdXJjZSk7XG4gICAgICAgIH0sIDIzMCk7XG4gICAgfVxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWxmLCBET01PYmplY3QpIHtcblxuICAgIC8vd2Ugd2lsbCBob3ZlciBhbGwgd2luZG93cyB3aXRoIGRpdiB3aXRoIGhpZ2ggei1pbmRleCB0byBiZSBzdXJlIG1vdXNldXAgaXMgdHJpZ2dlcmVkXG4gICAgY29uc3QgaW52aXNpYmxlSG92ZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1pbnZpc2libGUtaG92ZXInXSk7XG4gICAgY29uc3QgdHJhbnNmb3JtVHJhbnNpdGlvbiA9ICdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJztcblxuICAgIC8vdG8gdGhlc2UgZWxlbWVudHMgYXJlIGFkZGVkIG1vdXNlIGV2ZW50c1xuICAgIGNvbnN0IGVsZW1lbnRzID0ge1xuICAgICAgICBcIm1lZGlhSG9sZGVyXCI6IHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIsXG4gICAgICAgIFwiaW52aXNpYmxlSG92ZXJcIjogaW52aXNpYmxlSG92ZXIsXG4gICAgICAgIFwiaG9sZGVyV3JhcHBlclwiOiBzZWxmLmRhdGEuaG9sZGVyV3JhcHBlclxuICAgIH07XG4gICAgLy9zb3VyY2VzIGFyZSB0cmFuc2Zvcm1lZFxuICAgIGNvbnN0IHNvdXJjZXMgPSBzZWxmLmRhdGEuc291cmNlcztcblxuICAgIC8vIGlmIHRoZXJlIGFyZSBvbmx5IDIgb3IgMSB1cmxzIHRyYW5zZm9ybXMgd2lsbCBiZSBkaWZmZXJlbnRcbiAgICBjb25zdCB1cmxzTGVuZ3RoID0gc2VsZi5kYXRhLnVybHMubGVuZ3RoO1xuXG4gICAgbGV0IGlzX2RyYWdnaW5nID0gZmFsc2U7XG4gICAgbGV0IG1vdXNlRG93bkNsaWVudFg7XG4gICAgbGV0IGRpZmZlcmVuY2U7XG4gICAgbGV0IHNsaWRlYUFibGUgPSB0cnVlO1xuXG5cbiAgICBjb25zdCBtb3VzZURvd25FdmVudCA9IGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgLy8gdGFnIGNhbid0IGJlIHZpZGVvIGNhdXNlIGl0IHdvdWxkIGJlIHVuY2xpY2thYmxlIGluIG1pY3Jvc29mdCBicm93c2Vyc1xuICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSAhPT0gJ1ZJREVPJyAmJiAhc2VsZi5kYXRhLmlzTW9iaWxlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgZWxlbSBpbiBlbGVtZW50cykge1xuICAgICAgICAgICAgZWxlbWVudHNbZWxlbV0uY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1jdXJzb3ItZ3JhYmJpbmcnKTtcbiAgICAgICAgfVxuICAgICAgICBpc19kcmFnZ2luZyA9IHRydWU7XG4gICAgICAgIChzZWxmLmRhdGEuaXNNb2JpbGUpID9cbiAgICAgICAgICAgIG1vdXNlRG93bkNsaWVudFggPSBlLnRvdWNoZXNbMF0uY2xpZW50WCA6XG4gICAgICAgICAgICBtb3VzZURvd25DbGllbnRYID0gZS5jbGllbnRYO1xuICAgICAgICBkaWZmZXJlbmNlID0gMDtcbiAgICB9O1xuXG5cbiAgICBjb25zdCBtb3VzZVVwRXZlbnQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKHNlbGYuZWxlbWVudC5jb250YWlucyhpbnZpc2libGVIb3ZlcikpIHtcbiAgICAgICAgICAgIHNlbGYuZWxlbWVudC5yZW1vdmVDaGlsZChpbnZpc2libGVIb3Zlcik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNvdXJjZXNJbmRleGVzID0gc2VsZi5nZXRTb3VyY2VzSW5kZXhlcy5hbGwoc2VsZi5kYXRhLnNsaWRlKTtcblxuICAgICAgICBmb3IgKGxldCBlbGVtIGluIGVsZW1lbnRzKSB7XG4gICAgICAgICAgICBlbGVtZW50c1tlbGVtXS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LWN1cnNvci1ncmFiYmluZycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXNfZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgICAvLyBpZiB1c2VyIGRpZG4ndCBzbGlkZSBub25lIGFuaW1hdGlvbiBzaG91bGQgd29ya1xuICAgICAgICBpZiAoZGlmZmVyZW5jZSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy93ZSBjYW4gc2xpZGUgb25seSBpZiBwcmV2aW91cyBhbmltYXRpb24gaGFzIGZpbmlzaGVkXG4gICAgICAgIGlmICghc2xpZGVhQWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNsaWRlYUFibGUgPSBmYWxzZTtcblxuICAgICAgICAvLyBhZGQgdHJhbnNpdGlvbiBpZiB1c2VyIHNsaWRlIHRvIHNvdXJjZVxuICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5jbGFzc0xpc3QuYWRkKHRyYW5zZm9ybVRyYW5zaXRpb24pO1xuICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdLmNsYXNzTGlzdC5hZGQodHJhbnNmb3JtVHJhbnNpdGlvbik7XG4gICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0uY2xhc3NMaXN0LmFkZCh0cmFuc2Zvcm1UcmFuc2l0aW9uKTtcblxuXG4gICAgICAgIC8vIHNsaWRlIHByZXZpb3VzXG4gICAgICAgIGlmIChkaWZmZXJlbmNlID4gMCkge1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgc2xpZGUgbnVtYmVyXG4gICAgICAgICAgICBpZiAoc2VsZi5kYXRhLnNsaWRlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKHNlbGYuZGF0YS50b3RhbF9zbGlkZXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnNsaWRlIC0gMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh1cmxzTGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRyYW5zZm9ybXMudHJhbnNmb3JtUGx1cyhzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdKTtcbiAgICAgICAgICAgICAgICBzZWxmLnRyYW5zZm9ybXMudHJhbnNmb3JtTnVsbChzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1OdWxsKHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBnZXQgbmV3IGluZGV4ZXNcbiAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzID0gc2VsZi5nZXRTb3VyY2VzSW5kZXhlcy5hbGwoc2VsZi5kYXRhLnNsaWRlKTtcblxuICAgICAgICAgICAgLy9pZiBzb3VyY2UgaXNuJ3QgYWxyZWFkeSBpbiBtZW1vcnlcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZi5kYXRhLnNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlcygncHJldmlvdXMnLCBzZWxmLmRhdGEuc2xpZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvLyBzbGlkZSBuZXh0XG4gICAgICAgIGVsc2UgaWYgKGRpZmZlcmVuY2UgPCAwKSB7XG5cbiAgICAgICAgICAgIC8vdXBkYXRlIHNsaWRlIG51bWJlclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZSA9PT0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlcykge1xuICAgICAgICAgICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlcigxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKHNlbGYuZGF0YS5zbGlkZSArIDEpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmICh1cmxzTGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1NaW51cyhzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdKTtcbiAgICAgICAgICAgICAgICBzZWxmLnRyYW5zZm9ybXMudHJhbnNmb3JtTnVsbChzb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybU51bGwoc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGdldCBuZXcgaW5kZXhlc1xuICAgICAgICAgICAgc291cmNlc0luZGV4ZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzZWxmLmRhdGEuc2xpZGUpO1xuICAgICAgICAgICAgLy9pZiBzb3VyY2UgaXNuJ3QgYWxyZWFkeSBpbiBtZW1vcnlcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZi5kYXRhLnNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRzb3VyY2VzKCduZXh0Jywgc2VsZi5kYXRhLnNsaWRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGRpZmZlcmVuY2UgPSAwO1xuICAgICAgICBzZWxmLnN0b3BWaWRlb3MoKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRyYW5zaXRpb24gYmVjYXVzZSB3aXRoIGRyYWdnaW5nIGl0IGxvb2tzIGF3ZnVsXG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5jbGFzc0xpc3QucmVtb3ZlKHRyYW5zZm9ybVRyYW5zaXRpb24pO1xuICAgICAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XS5jbGFzc0xpc3QucmVtb3ZlKHRyYW5zZm9ybVRyYW5zaXRpb24pO1xuICAgICAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XS5jbGFzc0xpc3QucmVtb3ZlKHRyYW5zZm9ybVRyYW5zaXRpb24pO1xuXG4gICAgICAgICAgICAvLyB1c2VyIHNob3VsZG4ndCBiZSBhYmxlIHRvIHNsaWRlIHdoZW4gYW5pbWF0aW9uIGlzIHJ1bm5pbmdcbiAgICAgICAgICAgIHNsaWRlYUFibGUgPSB0cnVlO1xuICAgICAgICB9LCAzMDApO1xuICAgIH07XG5cblxuICAgIGNvbnN0IG1vdXNlTW92ZUV2ZW50ID0gZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICBpZiAoIWlzX2RyYWdnaW5nIHx8ICFzbGlkZWFBYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY2xpZW50WDtcbiAgICAgICAgKHNlbGYuZGF0YS5pc01vYmlsZSkgP1xuICAgICAgICAgICAgY2xpZW50WCA9IGUudG91Y2hlc1swXS5jbGllbnRYIDpcbiAgICAgICAgICAgIGNsaWVudFggPSBlLmNsaWVudFg7XG5cbiAgICAgICAgc2VsZi5lbGVtZW50LmFwcGVuZENoaWxkKGludmlzaWJsZUhvdmVyKTtcbiAgICAgICAgZGlmZmVyZW5jZSA9IGNsaWVudFggLSBtb3VzZURvd25DbGllbnRYO1xuICAgICAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IHNlbGYuZ2V0U291cmNlc0luZGV4ZXMuYWxsKHNlbGYuZGF0YS5zbGlkZSk7XG5cbiAgICAgICAgaWYgKHVybHNMZW5ndGggPj0gMykge1xuICAgICAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICtcbiAgICAgICAgICAgICAgICAoLXNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGggKyBkaWZmZXJlbmNlKVxuICAgICAgICAgICAgICAgICsgJ3B4LDApJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1cmxzTGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgZGlmZmVyZW5jZSArICdweCwwKSc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXJsc0xlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJ1xuICAgICAgICAgICAgICAgICsgKHNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGggKyBkaWZmZXJlbmNlKVxuICAgICAgICAgICAgICAgICsgJ3B4LDApJztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBwcmV2ZW50RGVmYXVsdEV2ZW50ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG5cblxuICAgIGZvciAobGV0IGVsZW0gaW4gZWxlbWVudHMpIHtcbiAgICAgICAgZWxlbWVudHNbZWxlbV0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2VEb3duRXZlbnQpO1xuICAgICAgICBlbGVtZW50c1tlbGVtXS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgbW91c2VEb3duRXZlbnQsIHtwYXNzaXZlOiB0cnVlfSk7XG4gICAgfVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcEV2ZW50KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBtb3VzZVVwRXZlbnQpO1xuICAgIGludmlzaWJsZUhvdmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwRXZlbnQpO1xuICAgIGludmlzaWJsZUhvdmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgbW91c2VVcEV2ZW50KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlRXZlbnQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBtb3VzZU1vdmVFdmVudCk7XG4gICAgc2VsZi5kYXRhLm5hdi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBwcmV2ZW50RGVmYXVsdEV2ZW50KTtcbn07Iiwid2luZG93LmZzTGlnaHRib3hPYmplY3QgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1jb250YWluZXInXSk7XG5cbiAgICB0aGlzLmRhdGEgPSB7XG4gICAgICAgIHNsaWRlOiAxLFxuICAgICAgICB0b3RhbF9zbGlkZXM6IDEsXG4gICAgICAgIHNsaWRlRGlzdGFuY2U6IDEuMyxcbiAgICAgICAgc2xpZGVDb3VudGVyOiB0cnVlLFxuICAgICAgICBzbGlkZUJ1dHRvbnM6IHRydWUsXG4gICAgICAgIGlzRmlyc3RUaW1lTG9hZDogZmFsc2UsXG4gICAgICAgIG1vdmVTbGlkZXNWaWFEcmFnOiB0cnVlLFxuICAgICAgICB0b29sYmFyQnV0dG9uczoge1xuICAgICAgICAgICAgXCJjbG9zZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJmdWxsc2NyZWVuXCI6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICBuYW1lOiAnJyxcblxuICAgICAgICBpc01vYmlsZTogZmFsc2UsXG5cbiAgICAgICAgdXJsczogW10sXG4gICAgICAgIHNvdXJjZXM6IFtdLFxuICAgICAgICBzb3VyY2VzTG9hZGVkOiBbXSxcbiAgICAgICAgcmVtZW1iZXJlZFNvdXJjZXNEaW1lbnNpb25zOiBbXSxcbiAgICAgICAgdmlkZW9zOiBbXSxcbiAgICAgICAgdmlkZW9zUG9zdGVyczogW10sXG5cbiAgICAgICAgaG9sZGVyV3JhcHBlcjoge30sXG4gICAgICAgIG1lZGlhSG9sZGVyOiB7fSxcbiAgICAgICAgbmF2OiB7fSxcbiAgICAgICAgdG9vbGJhcjoge30sXG4gICAgICAgIHNsaWRlQ291bnRlckVsZW06IHt9LFxuXG4gICAgICAgIGluaXRpYXRlZDogZmFsc2UsXG4gICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgICBmYWRpbmdPdXQ6IGZhbHNlLFxuXG4gICAgICAgIG9uUmVzaXplRXZlbnQ6IHt9LFxuICAgICAgICB1cGRhdGVTbGlkZU51bWJlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB9LFxuICAgIH07XG5cblxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cbiAgICAvKipcbiAgICAgKiBJbml0IGEgbmV3IGZzTGlnaHRib3ggaW5zdGFuY2VcbiAgICAgKi9cbiAgICB0aGlzLmluaXQgPSBmdW5jdGlvbiAoaW5pdEhyZWYpIHtcblxuICAgICAgICBpZiAoc2VsZi5kYXRhLmluaXRpYXRlZCkge1xuICAgICAgICAgICAgc2VsZi5pbml0U2V0U2xpZGUoaW5pdEhyZWYpO1xuICAgICAgICAgICAgc2VsZi5zaG93KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLmNoZWNrSWZNb2JpbGUoKTtcbiAgICAgICAgc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQgPSBuZXcgb25SZXNpemVFdmVudCgpO1xuICAgICAgICBsZXQgZ2FsbGVyeSA9IHNlbGYuZGF0YS5uYW1lO1xuXG4gICAgICAgIGxldCB1cmxzID0gW107XG4gICAgICAgIGNvbnN0IGEgPSBmc0xpZ2h0Ym94SGVscGVycy5hO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghYVtpXS5oYXNBdHRyaWJ1dGUoJ2ZzbGlnaHRib3gtZ2FsbGVyeScpKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBpZiAoYVtpXS5nZXRBdHRyaWJ1dGUoJ2ZzbGlnaHRib3gtZ2FsbGVyeScpID09PSBnYWxsZXJ5KSB7XG4gICAgICAgICAgICAgICAgbGV0IHVybHNMZW5ndGggPSB1cmxzLnB1c2goYVtpXS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XG4gICAgICAgICAgICAgICAgaWYgKGFbaV0uaGFzQXR0cmlidXRlKCdmc2xpZ2h0Ym94LXZpZGVvLXBvc3RlcicpKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEudmlkZW9zUG9zdGVyc1t1cmxzTGVuZ3RoIC0gMV0gPSBhW2ldLmdldEF0dHJpYnV0ZSgnZnNsaWdodGJveC12aWRlby1wb3N0ZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZWxmLmRhdGEudXJscyA9IHVybHM7XG4gICAgICAgIHNlbGYuZGF0YS50b3RhbF9zbGlkZXMgPSB1cmxzLmxlbmd0aDtcbiAgICAgICAgbmV3IHNlbGYuZG9tKCk7XG4gICAgICAgIHNlbGYudGhyb3dFdmVudCgnaW5pdCcpO1xuICAgICAgICBzZWxmLnRocm93RXZlbnQoJ29wZW4nKTtcbiAgICAgICAgcmVxdWlyZSgnLi9jaGFuZ2VTbGlkZUJ5RHJhZ2dpbmcuanMnKShzZWxmLCBET01PYmplY3QpO1xuXG4gICAgICAgIHNlbGYuaW5pdFNldFNsaWRlKGluaXRIcmVmKTtcbiAgICAgICAgc2VsZi5kYXRhLmluaXRpYXRlZCA9IHRydWU7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogSW5pdCBjYW4gaGF2ZSBtdWx0aXBsZSB0eXBlIG9mIHNsaWRlc1xuICAgICAqIEBwYXJhbSBzbGlkZVxuICAgICAqL1xuICAgIHRoaXMuaW5pdFNldFNsaWRlID0gZnVuY3Rpb24gKHNsaWRlKSB7XG5cbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBzbGlkZTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICAgICAgICBzZWxmLnNldFNsaWRlKHNlbGYuZGF0YS51cmxzLmluZGV4T2Yoc2xpZGUpICsgMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTbGlkZShzbGlkZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTbGlkZSgxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFNob3cgZG9tIG9mIGZzTGlnaHRib3ggaW5zdGFuY2UgaWYgZXhpc3RzXG4gICAgICovXG4gICAgdGhpcy5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBlbGVtID0gc2VsZi5lbGVtZW50O1xuICAgICAgICBzZWxmLnNjcm9sbGJhci5zaG93U2Nyb2xsYmFyKCk7XG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1jb250YWluZXItZmFkZW91dCcpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW0pO1xuICAgICAgICBzZWxmLnRocm93RXZlbnQoJ3Nob3cnKTtcbiAgICAgICAgc2VsZi50aHJvd0V2ZW50KCdvcGVuJyk7XG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZShbJ2ZzbGlnaHRib3gtZmFkZS1pbi13aW5kb3cnXSk7XG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZChbJ2ZzbGlnaHRib3gtZmFkZS1pbi13aW5kb3cnXSk7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogSGlkZSBkb20gb2YgZXhpc3RpbmcgZnNMaWdodGJveCBpbnN0YW5jZVxuICAgICAqL1xuICAgIHRoaXMuaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHNlbGYuZGF0YS5mdWxsc2NyZWVuKSBzZWxmLnRvb2xiYXIuY2xvc2VGdWxsc2NyZWVuKCk7XG4gICAgICAgIHNlbGYuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LWNvbnRhaW5lci1mYWRlb3V0Jyk7XG4gICAgICAgIHNlbGYuZGF0YS5mYWRpbmdPdXQgPSB0cnVlO1xuICAgICAgICBzZWxmLnRocm93RXZlbnQoJ2Nsb3NlJyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5zY3JvbGxiYXIuaGlkZVNjcm9sbGJhcigpO1xuICAgICAgICAgICAgc2VsZi5kYXRhLmZhZGluZ091dCA9IGZhbHNlO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzZWxmLmVsZW1lbnQpO1xuICAgICAgICB9LCAyNTApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgYWxsIGxpYnJhcnkgZWxlbWVudHNcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICB0aGlzLmRvbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVxdWlyZSgnLi9yZW5kZXJET00uanMnKShzZWxmLCBET01PYmplY3QpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBldmVudCBhbmQgZGlzcGF0Y2ggaXQgdG8gc2VsZi5lbGVtZW50XG4gICAgICovXG4gICAgdGhpcy50aHJvd0V2ZW50ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICBsZXQgZXZlbnQ7XG4gICAgICAgIGlmICh0eXBlb2YgKEV2ZW50KSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoZXZlbnROYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICAgICAgICBldmVudC5pbml0RXZlbnQoZXZlbnROYW1lLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfTtcblxuXG4gICAgdGhpcy5jaGVja0lmTW9iaWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAgICAgICBzZWxmLmRhdGEuaXNNb2JpbGUgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5kYXRhLmlzTW9iaWxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSBkb20gZWxlbWVudCB3aXRoIGNsYXNzZXNcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBET01PYmplY3QodGFnKSB7XG4gICAgICAgIHRoaXMuZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcblxuICAgICAgICB0aGlzLmFkZENsYXNzZXNBbmRDcmVhdGUgPSBmdW5jdGlvbiAoY2xhc3Nlcykge1xuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggaW4gY2xhc3Nlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzZXNbaW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsZW1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogT2JqZWN0IHRoYXQgY29udGFpbnMgYWxsIGFjdGlvbnMgdGhhdCBmc2xpZ2h0Ym94IGlzIGRvaW5nIGR1cmluZyBydW5uaW5nXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgZnVuY3Rpb24gb25SZXNpemVFdmVudCgpIHtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcblxuICAgICAgICBjb25zdCBzb3VyY2VzID0gc2VsZi5kYXRhLnNvdXJjZXM7XG5cbiAgICAgICAgY29uc3QgdHJhbnNmb3JtcyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgY29uc3Qgc291cmNlcyA9IHNlbGYuZGF0YS5zb3VyY2VzO1xuICAgICAgICAgICAgY29uc3Qgc3RhZ2VTb3VyY2VzID0gc2VsZi5nZXRTb3VyY2VzSW5kZXhlcy5hbGwoc2VsZi5kYXRhLnNsaWRlKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgc291cmNlSW5kZXggaW4gc291cmNlcykge1xuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChzb3VyY2VJbmRleCkgPT09IHN0YWdlU291cmNlcy5wcmV2aW91c1xuICAgICAgICAgICAgICAgICAgICB8fCBwYXJzZUludChzb3VyY2VJbmRleCkgPT09IHN0YWdlU291cmNlcy5jdXJyZW50XG4gICAgICAgICAgICAgICAgICAgIHx8IHBhcnNlSW50KHNvdXJjZUluZGV4KSA9PT0gc3RhZ2VTb3VyY2VzLm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNvdXJjZXNbc291cmNlSW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcbiAgICAgICAgICAgICAgICBzZWxmLnRyYW5zZm9ybXMudHJhbnNmb3JtTWludXMoc291cmNlc1tzb3VyY2VJbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG5cbiAgICAgICAgdGhpcy5tZWRpYUhvbGRlckRpbWVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBtZWRpYUhvbGRlclN0eWxlPSBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLnN0eWxlO1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gMTAwMCkge1xuICAgICAgICAgICAgICAgIG1lZGlhSG9sZGVyU3R5bGUud2lkdGggPSAod2luZG93LmlubmVyV2lkdGggLSAwLjEgKiB3aW5kb3cuaW5uZXJXaWR0aCkgKyAncHgnO1xuICAgICAgICAgICAgICAgIG1lZGlhSG9sZGVyU3R5bGUuaGVpZ2h0ID0gKHdpbmRvdy5pbm5lckhlaWdodCAtIDAuMSAqIHdpbmRvdy5pbm5lckhlaWdodCkgKyAncHgnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZWRpYUhvbGRlclN0eWxlLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgIG1lZGlhSG9sZGVyU3R5bGUuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBzb3VyY2VzRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgY29uc3Qgc3RhZ2VTb3VyY2VzSW5kZXhlcyA9IHNlbGYuZ2V0U291cmNlc0luZGV4ZXMuYWxsKHNlbGYuZGF0YS5zbGlkZSk7XG4gICAgICAgICAgICBjb25zdCByZW1lbWJlcmVkU291cmNlRGltZW5zaW9uID0gc2VsZi5kYXRhLnJlbWVtYmVyZWRTb3VyY2VzRGltZW5zaW9ucztcblxuXG4gICAgICAgICAgICBmb3IgKGxldCBzb3VyY2VJbmRleCBpbiBzb3VyY2VzKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgdHJhbmZvcm1zIHRvIHN0YWdlIHNvdXJjZXNcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5kYXRhLnVybHMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRyYW5zZm9ybXMudHJhbnNmb3JtTWludXMoc291cmNlc1tzdGFnZVNvdXJjZXNJbmRleGVzLnByZXZpb3VzXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1OdWxsKHNvdXJjZXNbc3RhZ2VTb3VyY2VzSW5kZXhlcy5jdXJyZW50XSk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS51cmxzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybVBsdXMoc291cmNlc1tzdGFnZVNvdXJjZXNJbmRleGVzLm5leHRdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtID0gc291cmNlc1tzb3VyY2VJbmRleF0uZmlyc3RDaGlsZDtcblxuXG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZVdpZHRoID0gcmVtZW1iZXJlZFNvdXJjZURpbWVuc2lvbltzb3VyY2VJbmRleF0ud2lkdGg7XG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZUhlaWdodCA9IHJlbWVtYmVyZWRTb3VyY2VEaW1lbnNpb25bc291cmNlSW5kZXhdLmhlaWdodDtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNvZWZmaWNpZW50ID0gc291cmNlV2lkdGggLyBzb3VyY2VIZWlnaHQ7XG4gICAgICAgICAgICAgICAgY29uc3QgZGV2aWNlV2lkdGggPSBwYXJzZUludChzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLnN0eWxlLndpZHRoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkZXZpY2VIZWlnaHQgPSBwYXJzZUludChzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLnN0eWxlLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0hlaWdodCA9IGRldmljZVdpZHRoIC8gY29lZmZpY2llbnQ7XG4gICAgICAgICAgICAgICAgaWYgKG5ld0hlaWdodCA8IGRldmljZUhlaWdodCAtIDYwKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuaGVpZ2h0ID0gbmV3SGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLndpZHRoID0gZGV2aWNlV2lkdGggKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3SGVpZ2h0ID0gZGV2aWNlSGVpZ2h0IC0gNjA7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuaGVpZ2h0ID0gbmV3SGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLndpZHRoID0gbmV3SGVpZ2h0ICogY29lZmZpY2llbnQgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLmNoZWNrSWZNb2JpbGUoKTtcbiAgICAgICAgICAgIF90aGlzLm1lZGlhSG9sZGVyRGltZW5zaW9ucygpO1xuICAgICAgICAgICAgc291cmNlc0RpbWVuc2lvbnMoKTtcbiAgICAgICAgICAgIHRyYW5zZm9ybXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDb250YWlucyBtZXRob2RzIHRoYXQgdGFrZXMgY2FyZSBvZiBzY3JvbGxiYXJcbiAgICAgKiBAdHlwZSB7e2hpZGVTY3JvbGxiYXI6IFdpbmRvdy5zY3JvbGxiYXIuaGlkZVNjcm9sbGJhciwgc2hvd1Njcm9sbGJhcjogV2luZG93LnNjcm9sbGJhci5zaG93U2Nyb2xsYmFyfX1cbiAgICAgKi9cbiAgICB0aGlzLnNjcm9sbGJhciA9IHtcblxuICAgICAgICBoaWRlU2Nyb2xsYmFyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZnNsaWdodGJveC1zY3JvbGxiYXJmaXgnKSkge1xuICAgICAgICAgICAgICAgIGxldCByZWNvbXBlbnNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlY29tcGVuc2UtZm9yLXNjcm9sbGJhcicpO1xuICAgICAgICAgICAgICAgIGlmIChyZWNvbXBlbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlY29tcGVuc2Uuc3R5bGUucGFkZGluZ1JpZ2h0ID0gJzAnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1zY3JvbGxiYXJmaXgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LW9wZW4nKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzaG93U2Nyb2xsYmFyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXNlbGYuZGF0YS5pc01vYmlsZSAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0ID49IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICAgICAgICAgIGxldCByZWNvbXBlbnNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlY29tcGVuc2UtZm9yLXNjcm9sbGJhcicpO1xuICAgICAgICAgICAgICAgIGlmIChyZWNvbXBlbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlY29tcGVuc2Uuc3R5bGUucGFkZGluZ1JpZ2h0ID0gJzE3cHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1zY3JvbGxiYXJmaXgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LW9wZW4nKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFNWR0ljb24gb2JqZWN0IHdpdGggZ2V0U1ZHSWNvbiBtZXRob2Qgd2hpY2ggcmV0dXJuIDxzdmc+IGVsZW1lbnQgd2l0aCA8cGF0aD4gY2hpbGRcbiAgICAgKiBAcmV0dXJucyB7RWxlbWVudH1cbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICB0aGlzLlNWR0ljb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vICA8c3ZnPiB3aXRoIGFkZGVkICdmc2xpZ2h0Ym94LXN2Zy1pY29uJyBjbGFzc1xuICAgICAgICB0aGlzLnN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBcInN2Z1wiKTtcblxuICAgICAgICAvLyBjaGlsZCBvZiBzdmcgZW1wdHkgPHBhdGg+XG4gICAgICAgIHRoaXMucGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBcInBhdGhcIik7XG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICdjbGFzcycsICdmc2xpZ2h0Ym94LXN2Zy1pY29uJyk7XG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICd2aWV3Qm94JywgJzAgMCAxNSAxNScpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIERPTSA8c3ZnPiBpY29uIGNvbnRhaW5pbmcgPHBhdGg+IGNoaWxkIHdpdGggZCBhdHRyaWJ1dGUgZnJvbSBwYXJhbWV0ZXJcbiAgICAgICAgICogQHBhcmFtIGRcbiAgICAgICAgICogQHJldHVybnMgeyp9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmdldFNWR0ljb24gPSBmdW5jdGlvbiAodmlld0JveCwgZGltZW5zaW9uLCBkKSB7XG4gICAgICAgICAgICB0aGlzLnBhdGguc2V0QXR0cmlidXRlTlMobnVsbCwgJ2QnLCBkKTtcbiAgICAgICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICd2aWV3Qm94Jywgdmlld0JveCk7XG4gICAgICAgICAgICB0aGlzLnN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnd2lkdGgnLCBkaW1lbnNpb24pO1xuICAgICAgICAgICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2hlaWdodCcsIGRpbWVuc2lvbik7XG4gICAgICAgICAgICB0aGlzLnN2Zy5hcHBlbmRDaGlsZCh0aGlzLnBhdGgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3ZnO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRvb2xiYXIgb2JqZWN0IHdoaWNoIGNvbnRhaW5zIHRvb2xiYXIgYnV0dG9uc1xuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGxldCB0b29sYmFyTW9kdWxlID0gcmVxdWlyZSgnLi90b29sYmFyJyk7XG4gICAgdGhpcy50b29sYmFyID0gbmV3IHRvb2xiYXJNb2R1bGUoc2VsZiwgRE9NT2JqZWN0KTtcblxuXG4gICAgLyoqXG4gICAgICogRGl2IHRoYXQgaG9sZHMgc291cmNlIGVsZW1cbiAgICAgKi9cbiAgICB0aGlzLm1lZGlhSG9sZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmhvbGRlciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LW1lZGlhLWhvbGRlciddKTtcblxuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiAxMDAwKSB7XG4gICAgICAgICAgICB0aGlzLmhvbGRlci5zdHlsZS53aWR0aCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAtIDAuMSAqIHdpbmRvdy5pbm5lcldpZHRoKSArICdweCc7XG4gICAgICAgICAgICB0aGlzLmhvbGRlci5zdHlsZS5oZWlnaHQgPSAod2luZG93LmlubmVySGVpZ2h0IC0gMC4xICogd2luZG93LmlubmVySGVpZ2h0KSArICdweCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhvbGRlci5zdHlsZS53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuaG9sZGVyLnN0eWxlLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCArICdweCc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbmRlckhvbGRlciA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmhvbGRlcik7XG4gICAgICAgIH07XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIG9iamVjdCB3aXRoIHN0YWdlIHNvdXJjZXMgaW5kZXhlcyBkZXBlbmRpbmcgb24gcHJvdmlkZWQgc2xpZGVcbiAgICAgKiBAcGFyYW0gc2xpZGVcbiAgICAgKiBAcmV0dXJucyB7e3ByZXZpb3VzOiBudW1iZXIsIGN1cnJlbnQ6IG51bWJlciwgbmV4dDogbnVtYmVyfX1cbiAgICAgKi9cbiAgICB0aGlzLmdldFNvdXJjZXNJbmRleGVzID0ge1xuXG4gICAgICAgIHByZXZpb3VzOiBmdW5jdGlvbiAoc2xpZGUpIHtcbiAgICAgICAgICAgIGxldCBwcmV2aW91c1NsaWRlSW5kZXg7XG4gICAgICAgICAgICBjb25zdCBhcnJheUluZGV4ID0gc2xpZGUgLSAxO1xuXG4gICAgICAgICAgICAvLyBwcmV2aW91c1xuICAgICAgICAgICAgaWYgKGFycmF5SW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcmV2aW91c1NsaWRlSW5kZXggPSBzZWxmLmRhdGEudG90YWxfc2xpZGVzIC0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNTbGlkZUluZGV4ID0gYXJyYXlJbmRleCAtIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1NsaWRlSW5kZXg7XG4gICAgICAgIH0sXG5cblxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoc2xpZGUpIHtcblxuICAgICAgICAgICAgbGV0IG5leHRTbGlkZUluZGV4O1xuICAgICAgICAgICAgY29uc3QgYXJyYXlJbmRleCA9IHNsaWRlIC0gMTtcblxuICAgICAgICAgICAgLy9uZXh0XG4gICAgICAgICAgICBpZiAoc2xpZGUgPT09IHNlbGYuZGF0YS50b3RhbF9zbGlkZXMpIHtcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGVJbmRleCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5leHRTbGlkZUluZGV4ID0gYXJyYXlJbmRleCArIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXh0U2xpZGVJbmRleDtcbiAgICAgICAgfSxcblxuXG4gICAgICAgIGFsbDogZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICAgICAgICAvLyBzb3VyY2VzIGFyZSBzdG9yZWQgaW4gYXJyYXkgaW5kZXhlZCBmcm9tIDBcbiAgICAgICAgICAgIGNvbnN0IGFycmF5SW5kZXggPSBzbGlkZSAtIDE7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IHtcbiAgICAgICAgICAgICAgICBwcmV2aW91czogMCxcbiAgICAgICAgICAgICAgICBjdXJyZW50OiAwLFxuICAgICAgICAgICAgICAgIG5leHQ6IDBcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHByZXZpb3VzXG4gICAgICAgICAgICBpZiAoYXJyYXlJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzLnByZXZpb3VzID0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlcyAtIDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzLnByZXZpb3VzID0gYXJyYXlJbmRleCAtIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGN1cnJlbnRcbiAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzLmN1cnJlbnQgPSBhcnJheUluZGV4O1xuXG4gICAgICAgICAgICAvL25leHRcbiAgICAgICAgICAgIGlmIChzbGlkZSA9PT0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlcykge1xuICAgICAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzLm5leHQgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzb3VyY2VzSW5kZXhlcy5uZXh0ID0gYXJyYXlJbmRleCArIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzb3VyY2VzSW5kZXhlcztcbiAgICAgICAgfSxcbiAgICB9O1xuXG5cbiAgICB0aGlzLnRyYW5zZm9ybXMgPSB7XG5cbiAgICAgICAgdHJhbnNmb3JtTWludXM6IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgICAgICBlbGVtLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArICgtc2VsZi5kYXRhLnNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aCkgKyAncHgsMCknO1xuICAgICAgICB9LFxuXG4gICAgICAgIHRyYW5zZm9ybU51bGw6IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgICAgICBlbGVtLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoMCwwKSc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdHJhbnNmb3JtUGx1czogZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgICAgIGVsZW0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgc2VsZi5kYXRhLnNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aCArICdweCwwKSc7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBTdG9wIHZpZGVvcyBhZnRlciBjaGFuZ2luZyBzbGlkZVxuICAgICAqL1xuICAgIHRoaXMuc3RvcFZpZGVvcyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCB2aWRlb3MgPSBzZWxmLmRhdGEudmlkZW9zO1xuICAgICAgICBjb25zdCBzb3VyY2VzID0gc2VsZi5kYXRhLnNvdXJjZXM7XG5cbiAgICAgICAgLy8gdHJ1ZSBpcyBodG1sNSB2aWRlbywgZmFsc2UgaXMgeW91dHViZSB2aWRlb1xuICAgICAgICBmb3IgKGxldCB2aWRlb0luZGV4IGluIHZpZGVvcykge1xuXG4gICAgICAgICAgICBpZiAodmlkZW9zW3ZpZGVvSW5kZXhdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VzW3ZpZGVvSW5kZXhdLmZpcnN0Q2hpbGQucGF1c2UgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlc1t2aWRlb0luZGV4XS5maXJzdENoaWxkLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzb3VyY2VzW3ZpZGVvSW5kZXhdLmZpcnN0Q2hpbGQuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZSgne1wiZXZlbnRcIjpcImNvbW1hbmRcIixcImZ1bmNcIjpcInN0b3BWaWRlb1wiLFwiYXJnc1wiOlwiXCJ9JywgJyonKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgdGhpcy5zZXRTbGlkZSA9IGZ1bmN0aW9uIChzbGlkZSkge1xuXG4gICAgICAgIHNlbGYuZGF0YS5zbGlkZSA9IHNsaWRlO1xuICAgICAgICBzZWxmLmRhdGEudXBkYXRlU2xpZGVOdW1iZXIoc2xpZGUpO1xuICAgICAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IHNlbGYuZ2V0U291cmNlc0luZGV4ZXMuYWxsKHNsaWRlKTtcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IHNlbGYuZGF0YS5zb3VyY2VzO1xuXG4gICAgICAgIGlmIChzb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlcygnaW5pdGlhbCcsIHNsaWRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10gPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlcygncHJldmlvdXMnLCBzbGlkZSk7XG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgICAgIHNlbGYubG9hZHNvdXJjZXMoJ2N1cnJlbnQnLCBzbGlkZSk7XG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgICAgIHNlbGYubG9hZHNvdXJjZXMoJ25leHQnLCBzbGlkZSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBzb3VyY2VJbmRleCBpbiBzb3VyY2VzKSB7XG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZUluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XG5cbiAgICAgICAgICAgIC8vIHNvdXJjZXMgbGVuZ3RoIG5lZWRzIHRvIGJlIGhpZ2hlciB0aGFuIDEgYmVjYXVzZSBpZiB0aGVyZSBpcyBvbmx5IDEgc2xpZGVcbiAgICAgICAgICAgIC8vIHNvdXJjZXNJbmRleGVzLnByZXZpb3VzIHdpbGwgYmUgMCBzbyBpdCB3b3VsZCByZXR1cm4gYSBiYWQgdHJhbnNpdGlvblxuICAgICAgICAgICAgaWYgKHNvdXJjZUluZGV4ID09IHNvdXJjZXNJbmRleGVzLnByZXZpb3VzICYmIHNvdXJjZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1NaW51cyhzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc291cmNlSW5kZXggPT0gc291cmNlc0luZGV4ZXMuY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1OdWxsKHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0pO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNvdXJjZUluZGV4ID09IHNvdXJjZXNJbmRleGVzLm5leHQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRyYW5zZm9ybXMudHJhbnNmb3JtUGx1cyhzb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybU1pbnVzKHNvdXJjZXNbc291cmNlSW5kZXhdKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZHMgdGhhdCBhcHBlbmRzIHNvdXJjZXMgdG8gbWVkaWFIb2xkZXIgZGVwZW5kaW5nIG9uIGFjdGlvblxuICAgICAqIEB0eXBlIHt7aW5pdGlhbEFwcGVuZCwgcHJldmlvdXNBcHBlbmQsIG5leHRBcHBlbmR9fCp9XG4gICAgICovXG4gICAgdGhpcy5hcHBlbmRNZXRob2RzID0gcmVxdWlyZSgnLi9hcHBlbmRTb3VyY2UnKTtcblxuXG4gICAgLyoqXG4gICAgICogRGlzcGxheSBzb3VyY2UgKGltYWdlcywgSFRNTDUgdmlkZW8sIFlvdVR1YmUgdmlkZW8pIGRlcGVuZGluZyBvbiBnaXZlbiB1cmwgZnJvbSB1c2VyXG4gICAgICogT3IgaWYgZGlzcGxheSBpcyBpbml0aWFsIGRpc3BsYXkgMyBpbml0aWFsIHNvdXJjZXNcbiAgICAgKiBJZiB0aGVyZSBhcmUgPj0gMyBpbml0aWFsIHNvdXJjZXMgdGhlcmUgd2lsbCBiZSBhbHdheXMgMyBpbiBzdGFnZVxuICAgICAqIEBwYXJhbSB0eXBlT2ZMb2FkXG4gICAgICogQHBhcmFtIHNsaWRlXG4gICAgICogQHJldHVybnMge21vZHVsZS5leHBvcnRzfVxuICAgICAqL1xuICAgIHRoaXMubG9hZHNvdXJjZXMgPSBmdW5jdGlvbiAodHlwZU9mTG9hZCwgc2xpZGUpIHtcbiAgICAgICAgY29uc3QgbG9hZHNvdXJjZW1vZHVsZSA9IHJlcXVpcmUoXCIuL2xvYWRTb3VyY2UuanNcIik7XG4gICAgICAgIHJldHVybiBuZXcgbG9hZHNvdXJjZW1vZHVsZShzZWxmLCBET01PYmplY3QsIHR5cGVPZkxvYWQsIHNsaWRlKTtcbiAgICB9O1xufTtcblxuXG4hZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvdy5mc0xpZ2h0Ym94SW5zdGFuY2VzID0gW107XG4gICAgd2luZG93LmZzTGlnaHRib3hIZWxwZXJzID0ge1xuICAgICAgICBcImFcIjogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKVxuICAgIH07XG5cbiAgICBsZXQgYSA9IGZzTGlnaHRib3hIZWxwZXJzLmE7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBpZiAoIWFbaV0uaGFzQXR0cmlidXRlKCdmc2xpZ2h0Ym94LWdhbGxlcnknKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBib3hOYW1lID0gYVtpXS5nZXRBdHRyaWJ1dGUoJ2ZzbGlnaHRib3gtZ2FsbGVyeScpO1xuICAgICAgICBpZiAodHlwZW9mIGZzTGlnaHRib3hJbnN0YW5jZXNbYm94TmFtZV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3ggPSBuZXcgZnNMaWdodGJveE9iamVjdCgpO1xuICAgICAgICAgICAgZnNMaWdodGJveC5kYXRhLm5hbWUgPSBib3hOYW1lO1xuICAgICAgICAgICAgZnNMaWdodGJveEluc3RhbmNlc1tib3hOYW1lXSA9IGZzTGlnaHRib3g7XG4gICAgICAgIH1cblxuICAgICAgICBhW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxldCBnYWxsZXJ5ID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2ZzbGlnaHRib3gtZ2FsbGVyeScpO1xuICAgICAgICAgICAgaWYgKGZzTGlnaHRib3hJbnN0YW5jZXNbZ2FsbGVyeV0uZGF0YS5pbml0aWF0ZWQpIHtcbiAgICAgICAgICAgICAgICBmc0xpZ2h0Ym94SW5zdGFuY2VzW2dhbGxlcnldLnNldFNsaWRlKFxuICAgICAgICAgICAgICAgICAgICBmc0xpZ2h0Ym94SW5zdGFuY2VzW2dhbGxlcnldLmRhdGEudXJscy5pbmRleE9mKHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJykpICsgMVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgZnNMaWdodGJveEluc3RhbmNlc1tnYWxsZXJ5XS5zaG93KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnNMaWdodGJveEluc3RhbmNlc1tnYWxsZXJ5XS5pbml0KHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJykpO1xuICAgICAgICB9KTtcbiAgICB9XG59KGRvY3VtZW50LCB3aW5kb3cpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZiwgRE9NT2JqZWN0LCB0eXBlT2ZMb2FkLCBzbGlkZSkge1xuXG4gICAgY29uc3Qgc291cmNlc0luZGV4ZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzbGlkZSk7XG4gICAgY29uc3QgdXJscyA9IHNlbGYuZGF0YS51cmxzO1xuICAgIGNvbnN0IHNvdXJjZXMgPSBzZWxmLmRhdGEuc291cmNlcztcblxuICAgIGxldCBzb3VyY2VEaW1lbnNpb25zID0gZnVuY3Rpb24gKHNvdXJjZUVsZW0sIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQpIHtcblxuICAgICAgICBjb25zdCBjb2VmZmljaWVudCA9IHNvdXJjZVdpZHRoIC8gc291cmNlSGVpZ2h0O1xuICAgICAgICBjb25zdCBkZXZpY2VXaWR0aCA9IHBhcnNlSW50KHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuc3R5bGUud2lkdGgpO1xuICAgICAgICBjb25zdCBkZXZpY2VIZWlnaHQgPSBwYXJzZUludChzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLnN0eWxlLmhlaWdodCk7XG4gICAgICAgIGxldCBuZXdIZWlnaHQgPSBkZXZpY2VXaWR0aCAvIGNvZWZmaWNpZW50O1xuICAgICAgICBpZiAobmV3SGVpZ2h0IDwgZGV2aWNlSGVpZ2h0IC0gNjApIHtcbiAgICAgICAgICAgIHNvdXJjZUVsZW0uc3R5bGUuaGVpZ2h0ID0gbmV3SGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICAgICAgc291cmNlRWxlbS5zdHlsZS53aWR0aCA9IGRldmljZVdpZHRoICsgXCJweFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3SGVpZ2h0ID0gZGV2aWNlSGVpZ2h0IC0gNjA7XG4gICAgICAgICAgICBzb3VyY2VFbGVtLnN0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArIFwicHhcIjtcbiAgICAgICAgICAgIHNvdXJjZUVsZW0uc3R5bGUud2lkdGggPSBuZXdIZWlnaHQgKiBjb2VmZmljaWVudCArIFwicHhcIjtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIGxldCBsb2FkID0gZnVuY3Rpb24gKHNvdXJjZUhvbGRlciwgc291cmNlRWxlbSkge1xuICAgICAgICBzb3VyY2VIb2xkZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHNvdXJjZUhvbGRlci5hcHBlbmRDaGlsZChzb3VyY2VFbGVtKTtcbiAgICAgICAgdm9pZCBzb3VyY2VIb2xkZXIuZmlyc3RDaGlsZC5vZmZzZXRXaWR0aDtcbiAgICAgICAgc291cmNlSG9sZGVyLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1mYWRlLWluLWFuaW1hdGlvbicpO1xuICAgIH07XG5cbiAgICBsZXQgYXBwZW5kSW5pdGlhbCA9IGZ1bmN0aW9uIChzb3VyY2VIb2xkZXIsIHNvdXJjZUVsZW0pIHtcbiAgICAgICAgc291cmNlSG9sZGVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBzb3VyY2VIb2xkZXIuYXBwZW5kQ2hpbGQoc291cmNlRWxlbSk7XG4gICAgICAgIHNvdXJjZUhvbGRlci5maXJzdENoaWxkLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbi1hbmltYXRpb24nKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogYWRkIGZhZGUgaW4gY2xhc3MgYW5kIGRpbWVuc2lvbiBmdW5jdGlvblxuICAgICAqL1xuICAgIGxldCBvbmxvYWRMaXN0ZW5lciA9IGZ1bmN0aW9uIChzb3VyY2VFbGVtLCBzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0LCBhcnJheUluZGV4KSB7XG5cbiAgICAgICAgbGV0IHNvdXJjZUhvbGRlciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNvdXJjZS1ob2xkZXInXSk7XG5cbiAgICAgICAgLy9ub3JtYWwgc291cmNlIGRpbWVuc2lvbnMgbmVlZHMgdG8gYmUgc3RvcmVkIGluIGFycmF5XG4gICAgICAgIC8vaXQgd2lsbCBiZSBuZWVkZWQgd2hlbiByZXNpemluZyBhIHNvdXJjZVxuICAgICAgICBzZWxmLmRhdGEucmVtZW1iZXJlZFNvdXJjZXNEaW1lbnNpb25zW2FycmF5SW5kZXhdID0ge1xuICAgICAgICAgICAgXCJ3aWR0aFwiOiBzb3VyY2VXaWR0aCxcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IHNvdXJjZUhlaWdodFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHNldCBkaW1lbnNpb25zIGZvciB0aGUgMXN0IHRpbWVcbiAgICAgICAgc291cmNlRGltZW5zaW9ucyhzb3VyY2VFbGVtLCBzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0KTtcbiAgICAgICAgc291cmNlSG9sZGVyLmFwcGVuZENoaWxkKHNvdXJjZUVsZW0pO1xuXG4gICAgICAgIGlmKHR5cGVPZkxvYWQgPT09ICdpbml0aWFsJykge1xuICAgICAgICAgICAgYXBwZW5kSW5pdGlhbChzb3VyY2VzW2FycmF5SW5kZXhdLCBzb3VyY2VFbGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvYWQoc291cmNlc1thcnJheUluZGV4XSwgc291cmNlRWxlbSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICBjb25zdCBsb2FkWW91dHViZXZpZGVvID0gZnVuY3Rpb24gKHZpZGVvSWQsIGFycmF5SW5kZXgpIHtcbiAgICAgICAgbGV0IGlmcmFtZSA9IG5ldyBET01PYmplY3QoJ2lmcmFtZScpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNpbmdsZS1zb3VyY2UnXSk7XG4gICAgICAgIGlmcmFtZS5zcmMgPSAnLy93d3cueW91dHViZS5jb20vZW1iZWQvJyArIHZpZGVvSWQgKyAnP2VuYWJsZWpzYXBpPTEnO1xuICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvd2Z1bGxzY3JlZW4nLCAnJyk7XG4gICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2ZyYW1lYm9yZGVyJywgJzAnKTtcbiAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgICBvbmxvYWRMaXN0ZW5lcihpZnJhbWUsIDE5MjAsIDEwODAsIGFycmF5SW5kZXgpO1xuICAgIH07XG5cblxuICAgIGNvbnN0IGltYWdlTG9hZCA9IGZ1bmN0aW9uIChzcmMsIGFycmF5SW5kZXgpIHtcbiAgICAgICAgbGV0IHNvdXJjZUVsZW0gPSBuZXcgRE9NT2JqZWN0KCdpbWcnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zaW5nbGUtc291cmNlJ10pO1xuICAgICAgICBzb3VyY2VFbGVtLnNyYyA9IHNyYztcbiAgICAgICAgc291cmNlRWxlbS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgb25sb2FkTGlzdGVuZXIoc291cmNlRWxlbSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIGFycmF5SW5kZXgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICBjb25zdCB2aWRlb0xvYWQgPSBmdW5jdGlvbiAoc3JjLCBhcnJheUluZGV4LCB0eXBlKSB7XG4gICAgICAgIGxldCB2aWRlb0xvYWRlZCA9IGZhbHNlO1xuICAgICAgICBsZXQgdmlkZW9FbGVtID0gbmV3IERPTU9iamVjdCgndmlkZW8nKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zaW5nbGUtc291cmNlJ10pO1xuICAgICAgICBsZXQgc291cmNlID0gbmV3IERPTU9iamVjdCgnc291cmNlJykuZWxlbTtcbiAgICAgICAgaWYoc2VsZi5kYXRhLnZpZGVvc1Bvc3RlcnNbYXJyYXlJbmRleF0pIHtcbiAgICAgICAgICAgIHZpZGVvRWxlbS5wb3N0ZXIgPSBzZWxmLmRhdGEudmlkZW9zUG9zdGVyc1thcnJheUluZGV4XTtcbiAgICAgICAgICAgIHZpZGVvRWxlbS5zdHlsZS5vYmplY3RGaXQgPSAnY292ZXInO1xuICAgICAgICB9XG4gICAgICAgIHNvdXJjZS5zcmMgPSBzcmM7XG4gICAgICAgIHNvdXJjZS50eXBlID0gdHlwZTtcbiAgICAgICAgdmlkZW9FbGVtLmFwcGVuZENoaWxkKHNvdXJjZSk7XG4gICAgICAgIGxldCB3aWR0aDtcbiAgICAgICAgbGV0IGhlaWdodDtcbiAgICAgICAgdmlkZW9FbGVtLm9ubG9hZGVkbWV0YWRhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodmlkZW9Mb2FkZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiBicm93c2VyIGRvbid0IHN1cHBvcnQgdmlkZW9XaWR0aCBhbmQgdmlkZW9IZWlnaHQgd2UgbmVlZCB0byBhZGQgZGVmYXVsdCBvbmVzXG4gICAgICAgICAgICBpZiAoIXRoaXMudmlkZW9XaWR0aCB8fCB0aGlzLnZpZGVvV2lkdGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB3aWR0aCA9IDE5MjA7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gMTA4MDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2lkdGggPSB0aGlzLnZpZGVvV2lkdGg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gdGhpcy52aWRlb0hlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZpZGVvTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIG9ubG9hZExpc3RlbmVyKHZpZGVvRWxlbSwgd2lkdGgsIGhlaWdodCwgYXJyYXlJbmRleCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gaWYgYnJvd3NlciBkb24ndCBzdXBwcnQgYm90aCBvbmxvYWRtZXRhZGF0YSBvciAudmlkZW9XaWR0aCB3ZSB3aWxsIGxvYWQgaXQgYWZ0ZXIgMzAwMG1zXG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcblxuICAgICAgICAvLyBPTiBJRSBvbiBsb2FkIGV2ZW50IGRvbnQgd29yayBzbyB3ZSBuZWVkIHRvIHdhaXQgZm9yIGRpbWVuc2lvbnMgd2l0aCBzZXRUaW1lb3V0c1xuICAgICAgICBsZXQgSUVGaXggPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGlmKHZpZGVvTG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChJRUZpeCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF2aWRlb0VsZW0udmlkZW9XaWR0aCB8fCB2aWRlb0VsZW0gLnZpZGVvV2lkdGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZihjb3VudGVyIDwgMzEpIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGggPSAxOTIwO1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSAxMDgwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2lkdGggPSB2aWRlb0VsZW0udmlkZW9XaWR0aDtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSB2aWRlb0VsZW0udmlkZW9IZWlnaHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZpZGVvTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIG9ubG9hZExpc3RlbmVyKHZpZGVvRWxlbSwgd2lkdGgsIGhlaWdodCwgYXJyYXlJbmRleCk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKElFRml4KTtcbiAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICB2aWRlb0VsZW0uc2V0QXR0cmlidXRlKCdjb250cm9scycsICcnKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaW52YWxpZEZpbGUgPSBmdW5jdGlvbiAoYXJyYXlJbmRleCkge1xuICAgICAgICBsZXQgaW52YWxpZEZpbGVXcmFwcGVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtaW52YWxpZC1maWxlLXdyYXBwZXInXSk7XG4gICAgICAgIGludmFsaWRGaWxlV3JhcHBlci5pbm5lckhUTUwgPSAnSW52YWxpZCBmaWxlJztcblxuICAgICAgICBvbmxvYWRMaXN0ZW5lcihpbnZhbGlkRmlsZVdyYXBwZXIsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQsIGFycmF5SW5kZXgpO1xuICAgIH07XG5cblxuICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbSA9IGZ1bmN0aW9uICh1cmxJbmRleCkge1xuICAgICAgICBjb25zdCBwYXJzZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGNvbnN0IHNvdXJjZVVybCA9IHNlbGYuZGF0YS51cmxzW3VybEluZGV4XTtcblxuICAgICAgICBwYXJzZXIuaHJlZiA9IHNvdXJjZVVybDtcblxuICAgICAgICBmdW5jdGlvbiBnZXRJZChzb3VyY2VVcmwpIHtcbiAgICAgICAgICAgIGxldCByZWdFeHAgPSAvXi4qKHlvdXR1LmJlXFwvfHZcXC98dVxcL1xcd1xcL3xlbWJlZFxcL3x3YXRjaFxcP3Y9fFxcJnY9KShbXiNcXCZcXD9dKikuKi87XG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBzb3VyY2VVcmwubWF0Y2gocmVnRXhwKTtcblxuICAgICAgICAgICAgaWYgKG1hdGNoICYmIG1hdGNoWzJdLmxlbmd0aCA9PSAxMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaFsyXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdlcnJvcic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyc2VyLmhvc3RuYW1lID09PSAnd3d3LnlvdXR1YmUuY29tJykge1xuICAgICAgICAgICAgc2VsZi5kYXRhLnZpZGVvc1t1cmxJbmRleF0gPSBmYWxzZTtcbiAgICAgICAgICAgIGxvYWRZb3V0dWJldmlkZW8oZ2V0SWQoc291cmNlVXJsKSwgdXJsSW5kZXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDAgfHwgeGhyLnN0YXR1cyA9PT0gMjA2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIHdoYXQgdHlwZSBvZiBmaWxlIHByb3ZpZGVkIGZyb20gbGlua1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VUeXBlID0geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdjb250ZW50LXR5cGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFUeXBlID0gcmVzcG9uc2VUeXBlLnNsaWNlKDAsIHJlc3BvbnNlVHlwZS5pbmRleE9mKCcvJykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZUxvYWQodXJsc1t1cmxJbmRleF0sIHVybEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YVR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0xvYWQodXJsc1t1cmxJbmRleF0sIHVybEluZGV4LCByZXNwb25zZVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YS52aWRlb3NbdXJsSW5kZXhdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZEZpbGUodXJsSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZEZpbGUodXJsSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHhoci5vcGVuKCdnZXQnLCBzb3VyY2VVcmwsIHRydWUpO1xuICAgICAgICAgICAgeGhyLnNlbmQobnVsbCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICBpZiAodHlwZU9mTG9hZCA9PT0gJ2luaXRpYWwnKSB7XG4gICAgICAgIC8vYXBwZW5kIGxvYWRlciB3aGVuIGxvYWRpbmcgaW5pdGlhbGx5XG4gICAgICAgIHNlbGYuYXBwZW5kTWV0aG9kcy5yZW5kZXJIb2xkZXJJbml0aWFsKHNlbGYsIHNsaWRlLCBET01PYmplY3QpO1xuXG4gICAgICAgIGlmICh1cmxzLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc291cmNlc0luZGV4ZXMuY3VycmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXJscy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNvdXJjZXNJbmRleGVzLm5leHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVybHMubGVuZ3RoID49IDMpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbShzb3VyY2VzSW5kZXhlcy5wcmV2aW91cyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhcHBlbmQgbG9hZGVyIHdoZW4gbG9hZGluZyBhIG5leHQgc291cmNlXG4gICAgICAgIHNlbGYuYXBwZW5kTWV0aG9kcy5yZW5kZXJIb2xkZXIoc2VsZiwgc2xpZGUsIHR5cGVPZkxvYWQpO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZU9mTG9hZCkge1xuICAgICAgICAgICAgY2FzZSAncHJldmlvdXMnOlxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbShzb3VyY2VzSW5kZXhlcy5wcmV2aW91cyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjdXJyZW50JzpcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc291cmNlc0luZGV4ZXMuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICduZXh0JzpcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc291cmNlc0luZGV4ZXMubmV4dCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlbGYsIERPTU9iamVjdCkge1xuXG5cbiAgICAvKipcbiAgICAgKiBTbGlkZSBjb3VudGVyIG9iamVjdCAtIHVwcGVyIGxlZnQgY29ybmVyIG9mIGZzTGlnaHRib3hcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdCBzbGlkZUNvdW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBudW1iZXJDb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1udW1iZXItY29udGFpbmVyJ10pO1xuICAgICAgICBzZWxmLmRhdGEuc2xpZGVDb3VudGVyRWxlbSA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLXNsaWRlLW51bWJlciddKTtcblxuICAgICAgICBzZWxmLmRhdGEuc2xpZGVDb3VudGVyRWxlbS5pbm5lckhUTUwgPSBzZWxmLmRhdGEuc2xpZGU7XG4gICAgICAgIHNlbGYuZGF0YS5zbGlkZUNvdW50ZXJFbGVtLmlkID0gJ2N1cnJlbnRfc2xpZGUnO1xuXG4gICAgICAgIGxldCBzcGFjZSA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLXNsaWRlLW51bWJlcicsICdmc2xpZ2h0Ym94LXNsYXNoJ10pO1xuICAgICAgICBzcGFjZS5pbm5lckhUTUwgPSAnLyc7XG5cbiAgICAgICAgbGV0IHNsaWRlcyA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLXNsaWRlLW51bWJlciddKTtcbiAgICAgICAgc2xpZGVzLmlubmVySFRNTCA9IHNlbGYuZGF0YS50b3RhbF9zbGlkZXM7XG5cbiAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYuZGF0YS5zbGlkZUNvdW50ZXJFbGVtKTtcbiAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNwYWNlKTtcbiAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNsaWRlcyk7XG5cbiAgICAgICAgLy8gdGhpcyBtZXRob2QgaXMgY2FsbGVkIGFmdGVyIHN3aXRjaGluZyBzbGlkZXNcbiAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyID0gZnVuY3Rpb24gKG51bWJlcikge1xuICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlID0gbnVtYmVyO1xuICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlQ291bnRlckVsZW0uaW5uZXJIVE1MID0gbnVtYmVyO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMucmVuZGVyU2xpZGVDb3VudGVyID0gZnVuY3Rpb24gKG5hdikge1xuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZUNvdW50ZXIpXG4gICAgICAgICAgICAgICAgbmF2LmFwcGVuZENoaWxkKG51bWJlckNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICBjb25zdCByZW5kZXJOYXYgPSBmdW5jdGlvbiAoY29udGFpbmVyKSB7XG4gICAgICAgIHNlbGYuZGF0YS5uYXYgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1uYXYnXSk7XG4gICAgICAgIHNlbGYudG9vbGJhci5yZW5kZXJUb29sYmFyKHNlbGYuZGF0YS5uYXYpO1xuXG4gICAgICAgIGNvbnN0IGNvdW50ZXIgPSBuZXcgc2xpZGVDb3VudGVyKCk7XG4gICAgICAgIGNvdW50ZXIucmVuZGVyU2xpZGVDb3VudGVyKHNlbGYuZGF0YS5uYXYpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5kYXRhLm5hdik7XG5cbiAgICB9O1xuXG4gICAgY29uc3QgY3JlYXRlQlROID0gZnVuY3Rpb24gKGJ1dHRvbkNvbnRhaW5lciwgY29udGFpbmVyLCBkKSB7XG4gICAgICAgIGxldCBidG4gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4nLCAnYnV0dG9uLXN0eWxlJ10pO1xuICAgICAgICBidG4uYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBuZXcgc2VsZi5TVkdJY29uKCkuZ2V0U1ZHSWNvbignMCAwIDIwIDIwJywgJzFlbScsIGQpXG4gICAgICAgICk7XG4gICAgICAgIGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uQ29udGFpbmVyKTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVuZGVyU2xpZGVCdXR0b25zID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgICAgICBpZiAoc2VsZi5kYXRhLnNsaWRlQnV0dG9ucyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvL3JlbmRlciBsZWZ0IGJ0blxuICAgICAgICBsZXQgbGVmdF9idG5fY29udGFpbmVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtYnRuLWNvbnRhaW5lcicsICdmc2xpZ2h0Ym94LXNsaWRlLWJ0bi1sZWZ0LWNvbnRhaW5lciddKTtcbiAgICAgICAgY3JlYXRlQlROKGxlZnRfYnRuX2NvbnRhaW5lciwgY29udGFpbmVyLCAnTTguMzg4LDEwLjA0OWw0Ljc2LTQuODczYzAuMzAzLTAuMzEsMC4yOTctMC44MDQtMC4wMTItMS4xMDVjLTAuMzA5LTAuMzA0LTAuODAzLTAuMjkzLTEuMTA1LDAuMDEyTDYuNzI2LDkuNTE2Yy0wLjMwMywwLjMxLTAuMjk2LDAuODA1LDAuMDEyLDEuMTA1bDUuNDMzLDUuMzA3YzAuMTUyLDAuMTQ4LDAuMzUsMC4yMjMsMC41NDcsMC4yMjNjMC4yMDMsMCwwLjQwNi0wLjA4LDAuNTU5LTAuMjM2YzAuMzAzLTAuMzA5LDAuMjk1LTAuODAzLTAuMDEyLTEuMTA0TDguMzg4LDEwLjA0OXonKTtcblxuICAgICAgICAvL2dvIHRvIHByZXZpb3VzIHNsaWRlIG9uY2xpY2tcbiAgICAgICAgbGVmdF9idG5fY29udGFpbmVyLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLmFwcGVuZE1ldGhvZHMucHJldmlvdXNTbGlkZVZpYUJ1dHRvbihzZWxmLCBzZWxmLmRhdGEuc2xpZGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGxldCByaWdodF9idG5fY29udGFpbmVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtYnRuLWNvbnRhaW5lcicsICdmc2xpZ2h0Ym94LXNsaWRlLWJ0bi1yaWdodC1jb250YWluZXInXSk7XG4gICAgICAgIGNyZWF0ZUJUTihyaWdodF9idG5fY29udGFpbmVyLCBjb250YWluZXIsICdNMTEuNjExLDEwLjA0OWwtNC43Ni00Ljg3M2MtMC4zMDMtMC4zMS0wLjI5Ny0wLjgwNCwwLjAxMi0xLjEwNWMwLjMwOS0wLjMwNCwwLjgwMy0wLjI5MywxLjEwNSwwLjAxMmw1LjMwNiw1LjQzM2MwLjMwNCwwLjMxLDAuMjk2LDAuODA1LTAuMDEyLDEuMTA1TDcuODMsMTUuOTI4Yy0wLjE1MiwwLjE0OC0wLjM1LDAuMjIzLTAuNTQ3LDAuMjIzYy0wLjIwMywwLTAuNDA2LTAuMDgtMC41NTktMC4yMzZjLTAuMzAzLTAuMzA5LTAuMjk1LTAuODAzLDAuMDEyLTEuMTA0TDExLjYxMSwxMC4wNDl6Jyk7XG4gICAgICAgIC8vIGdvIHRvIG5leHQgc2xpZGUgb24gY2xpY2tcbiAgICAgICAgcmlnaHRfYnRuX2NvbnRhaW5lci5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5hcHBlbmRNZXRob2RzLm5leHRTbGlkZVZpYUJ1dHRvbihzZWxmLCBzZWxmLmRhdGEuc2xpZGUpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICAvL2Rpc2FibGUgc2Nyb2xsaW5nIGFuZCBhZGQgZml4IGZvciBqdW1waW5nIHNpdGUgaWYgbm90IG1vYmlsZVxuICAgIHNlbGYuc2Nyb2xsYmFyLnNob3dTY3JvbGxiYXIoKTtcbiAgICBzZWxmLmVsZW1lbnQuaWQgPSBcImZzbGlnaHRib3gtY29udGFpbmVyXCI7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWxmLmVsZW1lbnQpO1xuXG4gICAgLy9yZW5kZXIgc2xpZGUgYnV0dG9ucyBhbmQgbmF2KHRvb2xiYXIpXG4gICAgcmVuZGVyTmF2KHNlbGYuZWxlbWVudCk7XG5cbiAgICBpZiAoc2VsZi5kYXRhLnRvdGFsX3NsaWRlcyA+IDEpIHtcbiAgICAgICAgcmVuZGVyU2xpZGVCdXR0b25zKHNlbGYuZWxlbWVudCk7XG4gICAgfVxuXG4gICAgc2VsZi5kYXRhLmhvbGRlcldyYXBwZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1ob2xkZXItd3JhcHBlciddKTtcbiAgICBzZWxmLmVsZW1lbnQuYXBwZW5kQ2hpbGQoc2VsZi5kYXRhLmhvbGRlcldyYXBwZXIpO1xuICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlciA9IG5ldyBzZWxmLm1lZGlhSG9sZGVyKCk7XG4gICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLnJlbmRlckhvbGRlcihzZWxmLmRhdGEuaG9sZGVyV3JhcHBlcik7XG4gICAgc2VsZi5lbGVtZW50LmNsYXNzTGlzdC5hZGQoWydmc2xpZ2h0Ym94LWZhZGUtaW4tYW5pbWF0aW9uJ10pO1xuICAgIHNlbGYuZGF0YS5pc2ZpcnN0VGltZUxvYWQgPSB0cnVlO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWxmLCBET01PYmplY3QpIHtcblxuICAgIHRoaXMudG9vbGJhckVsZW0gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC10b29sYmFyJ10pO1xuICAgIGNvbnN0IF90aGlzID0gdGhpcztcblxuICAgIHRoaXMucmVuZGVyRGVmYXVsdEJ1dHRvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBzaG91bGRSZW5kZXJCdXR0b25zID0gc2VsZi5kYXRhLnRvb2xiYXJCdXR0b25zO1xuXG4gICAgICAgIGlmIChzaG91bGRSZW5kZXJCdXR0b25zLmZ1bGxzY3JlZW4gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGxldCBidXR0b24gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC10b29sYmFyLWJ1dHRvbicsICdidXR0b24tc3R5bGUnXSk7XG4gICAgICAgICAgICBsZXQgc3ZnID0gbmV3IHNlbGYuU1ZHSWNvbigpLmdldFNWR0ljb24oJzAgMCAxNy41IDE3LjUnLCAnMS4yNWVtJywgJ000LjUgMTFIM3Y0aDR2LTEuNUg0LjVWMTF6TTMgN2gxLjVWNC41SDdWM0gzdjR6bTEwLjUgNi41SDExVjE1aDR2LTRoLTEuNXYyLjV6TTExIDN2MS41aDIuNVY3SDE1VjNoLTR6Jyk7XG4gICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoc3ZnKTtcbiAgICAgICAgICAgIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIChzZWxmLmRhdGEuZnVsbHNjcmVlbikgP1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jbG9zZUZ1bGxzY3JlZW4oKTpcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub3BlbkZ1bGxzY3JlZW4oKTtcblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMudG9vbGJhckVsZW0uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaG91bGRSZW5kZXJCdXR0b25zLmNsb3NlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsZXQgYnV0dG9uID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtdG9vbGJhci1idXR0b24nLCAnYnV0dG9uLXN0eWxlJ10pO1xuICAgICAgICAgICAgbGV0IHN2ZyA9IG5ldyBzZWxmLlNWR0ljb24oKS5nZXRTVkdJY29uKCcwIDAgMjAgMjAnLCAnMWVtJywgJ00gMTEuNDY5IDEwIGwgNy4wOCAtNy4wOCBjIDAuNDA2IC0wLjQwNiAwLjQwNiAtMS4wNjQgMCAtMS40NjkgYyAtMC40MDYgLTAuNDA2IC0xLjA2MyAtMC40MDYgLTEuNDY5IDAgTCAxMCA4LjUzIGwgLTcuMDgxIC03LjA4IGMgLTAuNDA2IC0wLjQwNiAtMS4wNjQgLTAuNDA2IC0xLjQ2OSAwIGMgLTAuNDA2IDAuNDA2IC0wLjQwNiAxLjA2MyAwIDEuNDY5IEwgOC41MzEgMTAgTCAxLjQ1IDE3LjA4MSBjIC0wLjQwNiAwLjQwNiAtMC40MDYgMS4wNjQgMCAxLjQ2OSBjIDAuMjAzIDAuMjAzIDAuNDY5IDAuMzA0IDAuNzM1IDAuMzA0IGMgMC4yNjYgMCAwLjUzMSAtMC4xMDEgMC43MzUgLTAuMzA0IEwgMTAgMTEuNDY5IGwgNy4wOCA3LjA4MSBjIDAuMjAzIDAuMjAzIDAuNDY5IDAuMzA0IDAuNzM1IDAuMzA0IGMgMC4yNjcgMCAwLjUzMiAtMC4xMDEgMC43MzUgLTAuMzA0IGMgMC40MDYgLTAuNDA2IDAuNDA2IC0xLjA2NCAwIC0xLjQ2OSBMIDExLjQ2OSAxMCBaJyk7XG4gICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoc3ZnKTtcbiAgICAgICAgICAgIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmKCFzZWxmLmRhdGEuZmFkaW5nT3V0KSBzZWxmLmhpZGUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnRvb2xiYXJFbGVtLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB0aGlzLm9wZW5GdWxsc2NyZWVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmRhdGEuZnVsbHNjcmVlbiA9IHRydWU7XG4gICAgICAgIGxldCBlbGVtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICBpZiAoZWxlbS5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgZWxlbS5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW0ubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgIGVsZW0ubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBlbGVtLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbS5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBlbGVtLm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmNsb3NlRnVsbHNjcmVlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5kYXRhLmZ1bGxzY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgaWYgKGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5yZW5kZXJUb29sYmFyID0gZnVuY3Rpb24gKG5hdikge1xuICAgICAgICB0aGlzLnJlbmRlckRlZmF1bHRCdXR0b25zKCk7XG4gICAgICAgIG5hdi5hcHBlbmRDaGlsZCh0aGlzLnRvb2xiYXJFbGVtKTtcbiAgICB9O1xufTsiXX0=
