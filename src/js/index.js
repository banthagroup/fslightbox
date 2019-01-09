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
