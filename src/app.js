(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {

    loader: '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>',
    DOMObject: '',

    createHolder: function (self, index) {
        let sourceHolder = new this.DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
        sourceHolder.innerHTML = this.loader;
        self.data.sources[index] = sourceHolder;
        return sourceHolder;
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

        nextSource.classList.remove('fslightbox-transform-transition');
        currentSource.classList.remove('fslightbox-transform-transition');
        sources[newSourcesIndexes.previous].classList.remove('fslightbox-transform-transition');

        nextSource.classList.remove('fslightbox-fade-in-animation');
        void nextSource.offsetWidth;
        nextSource.classList.add('fslightbox-fade-in-animation');


        currentSource.classList.remove('fslightbox-fade-in-animation');
        void currentSource.offsetWidth;
        currentSource.classList.add('fslightbox-fade-in-animation');

        self.transforms.transformNull(currentSource);
        self.transforms.transformPlus(nextSource);
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


        self.transforms.transformNull(currentSource);
        self.transforms.transformMinus(previousSource);
    }
};
},{}],2:[function(require,module,exports){
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


    let self = this;


    /**
     * Init a new fsLightbox instance
     */
    this.init = function (initHref) {


        if (self.data.initiated) {
            self.initSetSlide(initHref);
            self.show();
            return;
        }

        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) self.data.isMobile = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        self.data.onResizeEvent = new onResizeEvent();

        let gallery = self.data.name;

        let urls = [];
        const a = fsLightboxHelpers.a;
        for (let i = 0; i < a.length; i++) {
            if (!a[i].hasAttribute('data-fslightbox')) {
                continue;
            }
            if (a[i].getAttribute('data-fslightbox') === gallery) {
                urls.push(a[i].getAttribute('href'));
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
        elem.classList.remove(['fslightbox-fade-in-animation']);
        elem.classList.add(['fslightbox-fade-in-animation']);
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
        if (typeof(Event) === 'function') {
            event = new Event(eventName);
        } else {
            event = document.createEvent('Event');
            event.initEvent(eventName, true, true);
        }
        self.element.dispatchEvent(event);
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

        this.transforms = function () {

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
            if (window.innerWidth > 1000) {
                self.data.mediaHolder.holder.style.width = (window.innerWidth - 0.1 * window.innerWidth) + 'px';
                self.data.mediaHolder.holder.style.height = (window.innerHeight - 0.1 * window.innerHeight) + 'px';
            } else {
                self.data.mediaHolder.holder.style.width = window.innerWidth + 'px';
                self.data.mediaHolder.holder.style.height = window.innerHeight + 'px';
            }
        };

        this.sourcesDimensions = function () {

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

        window.onresize = function () {
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
                    self.data.isMobile = true
                } else {
                    self.data.isMobile = false;
                }
            })(navigator.userAgent || navigator.vendor || window.opera);
            _this.mediaHolderDimensions();
            _this.sourcesDimensions();
            _this.transforms();
        };
    }


    /**
     * Contains methods that takes care of scrollbar
     * @type {{hideScrollbar: Window.scrollbar.hideScrollbar, showScrollbar: Window.scrollbar.showScrollbar}}
     */
    this.scrollbar = {

        hideScrollbar: function () {
            document.documentElement.classList.remove('fslightbox-open');
            if (!self.data.isMobile) {
                let recompense = document.querySelector('.recompense-for-scrollbar');
                if (recompense) {
                    recompense.style.paddingRight = '0';
                }
                document.documentElement.classList.remove('fslightbox-scrollbarfix');
            }
        },

        showScrollbar: function () {
            document.documentElement.classList.add('fslightbox-open');
            if (!self.data.isMobile) {
                let recompense = document.querySelector('.recompense-for-scrollbar');
                if (recompense) {
                    recompense.style.paddingRight = '17px';
                }
                document.documentElement.classList.add('fslightbox-scrollbarfix');
            }
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

        if (!a[i].hasAttribute('data-fslightbox')) {
            continue;
        }

        a[i].classList.add('fslightbox-fix-webkit-highlight');
        const boxName = a[i].getAttribute('data-fslightbox');
        if (typeof fsLightboxInstances[boxName] === "undefined") {
            fsLightbox = new fsLightboxObject();
            fsLightbox.data.name = boxName;
            fsLightboxInstances[boxName] = fsLightbox;
        }

        a[i].addEventListener('click', function (e) {
            e.preventDefault();
            let gallery = this.getAttribute('data-fslightbox');
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

    const _this = this;
    const sourcesIndexes = self.getSourcesIndexes.all(slide);
    const urls = self.data.urls;
    const sources = self.data.sources;
    let initialAppends = {
        "prev": false,
        "curr": false,
        "next": false
    };


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


    this.loadYoutubevideo = function (videoId, arrayIndex) {
        let iframe = new DOMObject('iframe').addClassesAndCreate(['fslightbox-single-source']);
        iframe.src = '//www.youtube.com/embed/' + videoId + '?enablejsapi=1';
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
        videoElem.onloadedmetadata = function () {
            onloadListener(videoElem, this.videoWidth, this.videoHeight, arrayIndex);
        };
        videoElem.innerText = 'Sorry, your browser doesn\'t support embedded videos, <a\n' +
            '            href="http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4">download</a> and watch\n' +
            '        with your favorite video player!';

        videoElem.setAttribute('controls', '');
        videoElem.appendChild(source);
        source.src = src;
    };

    this.invalidFile = function (arrayIndex) {
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
            this.loadYoutubevideo(getId(sourceUrl), urlIndex);
        } else {
            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 2) {
                    if (xhr.status === 200 || xhr.status === 206) {
                        //check what type of file provided from link
                        let responseType = xhr.getResponseHeader('content-type');
                        responseType.indexOf('/');
                        responseType = responseType.slice(0, responseType.indexOf('/'));

                        if (responseType === 'image') {
                            _this.imageLoad(urls[urlIndex], urlIndex);
                        }

                        else if (responseType === 'video') {
                            _this.videoLoad(urls[urlIndex], urlIndex);
                            self.data.videos[urlIndex] = true;
                        }

                        else {
                            _this.invalidFile(urlIndex);
                        }
                    }
                    else {
                        _this.invalidFile(urlIndex);
                    }
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

    let privateMethods = {

        renderNav: function (container) {
            self.data.nav = new DOMObject('div').addClassesAndCreate(['fslightbox-nav']);
            self.toolbar.renderToolbar(self.data.nav);

            const slideCounter = new this.slideCounter();
            slideCounter.renderSlideCounter(self.data.nav);
            container.appendChild(self.data.nav);

        },

        createBTN: function (buttonContainer, container, d) {
            let btn = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn', 'button-style']);
            btn.appendChild(
                new self.SVGIcon().getSVGIcon('0 0 20 20', '1em', d)
            );
            buttonContainer.appendChild(btn);
            container.appendChild(buttonContainer);
        },

        renderSlideButtons: function (container) {
            if (self.data.slideButtons === false) {
                return false;
            }
            //render left btn
            let left_btn_container = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn-container', 'fslightbox-slide-btn-left-container']);
            this.createBTN(left_btn_container, container, 'M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z');

            //go to previous slide onclick
            left_btn_container.onclick = function () {
                self.appendMethods.previousSlideViaButton(self, self.data.slide);
            };

            let right_btn_container = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn-container', 'fslightbox-slide-btn-right-container']);
            this.createBTN(right_btn_container, container, 'M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z');
            // go to next slide on click
            right_btn_container.onclick = function () {
                self.appendMethods.nextSlideViaButton(self, self.data.slide);
            };
        },

        /**
         * Slide counter object - upper left corner of fsLightbox
         * @constructor
         */
        slideCounter: function () {
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
        }
    };

    //disable scrolling and add fix for jumping site if not mobile
    self.scrollbar.showScrollbar();
    self.element.id = "fslightbox-container";
    document.body.appendChild(self.element);

    //render slide buttons and nav(toolbar)
    privateMethods.renderNav(self.element);

    if (self.data.total_slides > 1) {
        privateMethods.renderSlideButtons(self.element);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwZW5kU291cmNlLmpzIiwic3JjL2pzL2NoYW5nZVNsaWRlQnlEcmFnZ2luZy5qcyIsInNyYy9qcy9pbmRleC5qcyIsInNyYy9qcy9sb2FkU291cmNlLmpzIiwic3JjL2pzL3JlbmRlckRPTS5qcyIsInNyYy9qcy90b29sYmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9MQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgIGxvYWRlcjogJzxkaXYgY2xhc3M9XCJsZHMtcmluZ1wiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+JyxcclxuICAgIERPTU9iamVjdDogJycsXHJcblxyXG4gICAgY3JlYXRlSG9sZGVyOiBmdW5jdGlvbiAoc2VsZiwgaW5kZXgpIHtcclxuICAgICAgICBsZXQgc291cmNlSG9sZGVyID0gbmV3IHRoaXMuRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zb3VyY2UtaG9sZGVyJ10pO1xyXG4gICAgICAgIHNvdXJjZUhvbGRlci5pbm5lckhUTUwgPSB0aGlzLmxvYWRlcjtcclxuICAgICAgICBzZWxmLmRhdGEuc291cmNlc1tpbmRleF0gPSBzb3VyY2VIb2xkZXI7XHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZUhvbGRlcjtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyBsb2FkZXIgd2hlbiBsb2FkaW5nIGZzTGlnaHRib3ggaW5pdGlhbGx5XHJcbiAgICAgKiBAcGFyYW0gc2xpZGVcclxuICAgICAqIEBwYXJhbSBET01PYmplY3RcclxuICAgICAqL1xyXG4gICAgcmVuZGVySG9sZGVySW5pdGlhbDogZnVuY3Rpb24gKHNlbGYsIHNsaWRlLCBET01PYmplY3QpIHtcclxuICAgICAgICB0aGlzLkRPTU9iamVjdCA9IERPTU9iamVjdDtcclxuICAgICAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IHNlbGYuZ2V0U291cmNlc0luZGV4ZXMuYWxsKHNsaWRlKTtcclxuICAgICAgICBjb25zdCB0b3RhbFNsaWRlcyA9IHNlbGYuZGF0YS50b3RhbF9zbGlkZXM7XHJcblxyXG4gICAgICAgIGlmICh0b3RhbFNsaWRlcyA+PSAzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByZXYgPSB0aGlzLmNyZWF0ZUhvbGRlcihzZWxmLCBzb3VyY2VzSW5kZXhlcy5wcmV2aW91cyk7XHJcbiAgICAgICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1NaW51cyhwcmV2KTtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5hcHBlbmRDaGlsZChwcmV2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRvdGFsU2xpZGVzID49IDEpIHtcclxuICAgICAgICAgICAgY29uc3QgY3VyciA9IHRoaXMuY3JlYXRlSG9sZGVyKHNlbGYsIHNvdXJjZXNJbmRleGVzLmN1cnJlbnQpO1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLmFwcGVuZENoaWxkKGN1cnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodG90YWxTbGlkZXMgPj0gMikge1xyXG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gdGhpcy5jcmVhdGVIb2xkZXIoc2VsZiwgc291cmNlc0luZGV4ZXMubmV4dCk7XHJcbiAgICAgICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1QbHVzKG5leHQpO1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLmFwcGVuZENoaWxkKG5leHQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVySG9sZGVyOiBmdW5jdGlvbiAoc2VsZiwgc2xpZGUsIHR5cGUpIHtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncHJldmlvdXMnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJIb2xkZXJQcmV2aW91cyhzZWxmLCBzbGlkZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnY3VycmVudCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckhvbGRlckN1cnJlbnQoc2VsZiwgc2xpZGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ25leHQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJIb2xkZXJOZXh0KHNlbGYsIHNsaWRlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIGxvYWRlciB3aGVuIGxvYWRpbmcgYSBwcmV2aW91cyBzb3VyY2VcclxuICAgICAqIEBwYXJhbSBzZWxmXHJcbiAgICAgKiBAcGFyYW0gc2xpZGVcclxuICAgICAqL1xyXG4gICAgcmVuZGVySG9sZGVyUHJldmlvdXM6IGZ1bmN0aW9uIChzZWxmLCBzbGlkZSkge1xyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzU291cmNlSW5kZXggPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLnByZXZpb3VzKHNsaWRlKTtcclxuICAgICAgICBjb25zdCBwcmV2ID0gdGhpcy5jcmVhdGVIb2xkZXIoc2VsZiwgcHJldmlvdXNTb3VyY2VJbmRleCk7XHJcbiAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybU1pbnVzKHByZXYpO1xyXG4gICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgcHJldik7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgbG9hZGVyIHdoZW4gbG9hZGluZyBhIG5leHQgc291cmNlXHJcbiAgICAgKiBAcGFyYW0gc2VsZlxyXG4gICAgICogQHBhcmFtIHNsaWRlXHJcbiAgICAgKi9cclxuICAgIHJlbmRlckhvbGRlck5leHQ6IGZ1bmN0aW9uIChzZWxmLCBzbGlkZSkge1xyXG4gICAgICAgIGNvbnN0IG5leHRTb3VyY2VJbmRleCA9IHNlbGYuZ2V0U291cmNlc0luZGV4ZXMubmV4dChzbGlkZSk7XHJcbiAgICAgICAgY29uc3QgbmV4dCA9IHRoaXMuY3JlYXRlSG9sZGVyKHNlbGYsIG5leHRTb3VyY2VJbmRleCk7XHJcbiAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybVBsdXMobmV4dCk7XHJcbiAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5hcHBlbmRDaGlsZChuZXh0KTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyBsb2FkZXIgd2hlbiBsb2FkaW5nIGEgcHJldmlvdXMgc291cmNlXHJcbiAgICAgKiBAcGFyYW0gc2VsZlxyXG4gICAgICogQHBhcmFtIHNsaWRlXHJcbiAgICAgKi9cclxuICAgIHJlbmRlckhvbGRlckN1cnJlbnQ6IGZ1bmN0aW9uIChzZWxmLCBzbGlkZSkge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZXNJbmRleGVzID0gc2VsZi5nZXRTb3VyY2VzSW5kZXhlcy5hbGwoc2xpZGUpO1xyXG4gICAgICAgIGNvbnN0IGN1cnIgPSB0aGlzLmNyZWF0ZUhvbGRlcihzZWxmLCBzb3VyY2VzSW5kZXhlcy5jdXJyZW50KTtcclxuICAgICAgICBzZWxmLnRyYW5zZm9ybXMudHJhbnNmb3JtTnVsbChjdXJyKTtcclxuICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLmluc2VydEJlZm9yZShjdXJyLCBzZWxmLmRhdGEuc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoYW5nZSBzbGlkZSB0byBwcmV2aW91cyBhZnRlciBjbGlja2luZyBidXR0b25cclxuICAgICAqIEBwYXJhbSBzZWxmXHJcbiAgICAgKiBAcGFyYW0gcHJldmlvdXNTbGlkZVxyXG4gICAgICovXHJcbiAgICBwcmV2aW91c1NsaWRlVmlhQnV0dG9uOiBmdW5jdGlvbiAoc2VsZiwgcHJldmlvdXNTbGlkZSkge1xyXG4gICAgICAgIGlmIChwcmV2aW91c1NsaWRlID09PSAxKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zbGlkZSA9IHNlbGYuZGF0YS50b3RhbF9zbGlkZXM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlIC09IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLnN0b3BWaWRlb3MoKTtcclxuICAgICAgICBzZWxmLmRhdGEudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnNsaWRlKTtcclxuICAgICAgICBjb25zdCBuZXdTb3VyY2VzSW5kZXhlcyA9IHNlbGYuZ2V0U291cmNlc0luZGV4ZXMuYWxsKHNlbGYuZGF0YS5zbGlkZSk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZi5kYXRhLnNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMucHJldmlvdXNdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHNlbGYubG9hZHNvdXJjZXMoJ3ByZXZpb3VzJywgc2VsZi5kYXRhLnNsaWRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSBzZWxmLmRhdGEuc291cmNlcztcclxuICAgICAgICBjb25zdCBjdXJyZW50U291cmNlID0gc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5jdXJyZW50XTtcclxuICAgICAgICBjb25zdCBuZXh0U291cmNlID0gc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5uZXh0XTtcclxuXHJcbiAgICAgICAgbmV4dFNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgY3VycmVudFNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5wcmV2aW91c10uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG5cclxuICAgICAgICBuZXh0U291cmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtZmFkZS1pbi1hbmltYXRpb24nKTtcclxuICAgICAgICB2b2lkIG5leHRTb3VyY2Uub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgbmV4dFNvdXJjZS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LWZhZGUtaW4tYW5pbWF0aW9uJyk7XHJcblxyXG5cclxuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtZmFkZS1pbi1hbmltYXRpb24nKTtcclxuICAgICAgICB2b2lkIGN1cnJlbnRTb3VyY2Uub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgY3VycmVudFNvdXJjZS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LWZhZGUtaW4tYW5pbWF0aW9uJyk7XHJcblxyXG4gICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1OdWxsKGN1cnJlbnRTb3VyY2UpO1xyXG4gICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1QbHVzKG5leHRTb3VyY2UpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2Ugc2xpZGUgdG8gbmV4dCBhZnRlciBjbGlja2luZyBidXR0b25cclxuICAgICAqIEBwYXJhbSBzZWxmXHJcbiAgICAgKiBAcGFyYW0gcHJldmlvdXNTbGlkZVxyXG4gICAgICovXHJcbiAgICBuZXh0U2xpZGVWaWFCdXR0b246IGZ1bmN0aW9uIChzZWxmLCBwcmV2aW91c1NsaWRlKSB7XHJcbiAgICAgICAgaWYgKHByZXZpb3VzU2xpZGUgPT09IHNlbGYuZGF0YS50b3RhbF9zbGlkZXMpIHtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGUgKz0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYuc3RvcFZpZGVvcygpO1xyXG4gICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgIGNvbnN0IG5ld1NvdXJjZXNJbmRleGVzID0gc2VsZi5nZXRTb3VyY2VzSW5kZXhlcy5hbGwoc2VsZi5kYXRhLnNsaWRlKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxmLmRhdGEuc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5uZXh0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBzZWxmLmxvYWRzb3VyY2VzKCduZXh0Jywgc2VsZi5kYXRhLnNsaWRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSBzZWxmLmRhdGEuc291cmNlcztcclxuICAgICAgICBjb25zdCBjdXJyZW50U291cmNlID0gc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5jdXJyZW50XTtcclxuICAgICAgICBjb25zdCBwcmV2aW91c1NvdXJjZSA9IHNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMucHJldmlvdXNdO1xyXG5cclxuICAgICAgICBwcmV2aW91c1NvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgY3VycmVudFNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5uZXh0XS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcblxyXG4gICAgICAgIHByZXZpb3VzU291cmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtZmFkZS1pbi1hbmltYXRpb24nKTtcclxuICAgICAgICB2b2lkIHByZXZpb3VzU291cmNlLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIHByZXZpb3VzU291cmNlLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbi1hbmltYXRpb24nKTtcclxuXHJcblxyXG4gICAgICAgIGN1cnJlbnRTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1mYWRlLWluLWFuaW1hdGlvbicpO1xyXG4gICAgICAgIHZvaWQgY3VycmVudFNvdXJjZS5vZmZzZXRXaWR0aDtcclxuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbi1hbmltYXRpb24nKTtcclxuXHJcblxyXG4gICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1OdWxsKGN1cnJlbnRTb3VyY2UpO1xyXG4gICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1NaW51cyhwcmV2aW91c1NvdXJjZSk7XHJcbiAgICB9XHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZiwgRE9NT2JqZWN0KSB7XHJcblxyXG4gICAgLy93ZSB3aWxsIGhvdmVyIGFsbCB3aW5kb3dzIHdpdGggZGl2IHdpdGggaGlnaCB6LWluZGV4IHRvIGJlIHN1cmUgbW91c2V1cCBpcyB0cmlnZ2VyZWRcclxuICAgIGNvbnN0IGludmlzaWJsZUhvdmVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtaW52aXNpYmxlLWhvdmVyJ10pO1xyXG5cclxuICAgIC8vdG8gdGhlc2UgZWxlbWVudHMgYXJlIGFkZGVkIG1vdXNlIGV2ZW50c1xyXG4gICAgY29uc3QgZWxlbWVudHMgPSB7XHJcbiAgICAgICAgXCJtZWRpYUhvbGRlclwiOiBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLFxyXG4gICAgICAgIFwiaW52aXNpYmxlSG92ZXJcIjogaW52aXNpYmxlSG92ZXIsXHJcbiAgICAgICAgXCJob2xkZXJXcmFwcGVyXCI6IHNlbGYuZGF0YS5ob2xkZXJXcmFwcGVyXHJcbiAgICB9O1xyXG4gICAgLy9zb3VyY2VzIGFyZSB0cmFuc2Zvcm1lZFxyXG4gICAgY29uc3Qgc291cmNlcyA9IHNlbGYuZGF0YS5zb3VyY2VzO1xyXG5cclxuICAgIC8vIGlmIHRoZXJlIGFyZSBvbmx5IDIgb3IgMSB1cmxzIHRyYW5zZm9ybXMgd2lsbCBiZSBkaWZmZXJlbnRcclxuICAgIGNvbnN0IHVybHNMZW5ndGggPSBzZWxmLmRhdGEudXJscy5sZW5ndGg7XHJcblxyXG4gICAgbGV0IGlzX2RyYWdnaW5nID0gZmFsc2U7XHJcbiAgICBsZXQgbW91c2VEb3duQ2xpZW50WDtcclxuICAgIGxldCBkaWZmZXJlbmNlO1xyXG4gICAgbGV0IHNsaWRlYUFibGUgPSB0cnVlO1xyXG5cclxuICAgIGxldCBldmVudExpc3RlbmVycyA9IHtcclxuXHJcblxyXG4gICAgICAgIG1vdXNlRG93bkV2ZW50OiBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgLy8gdGFnIGNhbid0IGJlIHZpZGVvIGNhdXNlIGl0IHdvdWxkIGJlIHVuY2xpY2thYmxlIGluIG1pY3Jvc29mdCBicm93c2Vyc1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSAhPT0gJ1ZJREVPJyAmJiAhc2VsZi5kYXRhLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgZWxlbSBpbiBlbGVtZW50cykge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHNbZWxlbV0uY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1jdXJzb3ItZ3JhYmJpbmcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpc19kcmFnZ2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIChzZWxmLmRhdGEuaXNNb2JpbGUpID9cclxuICAgICAgICAgICAgICAgIG1vdXNlRG93bkNsaWVudFggPSBlLnRvdWNoZXNbMF0uY2xpZW50WCA6XHJcbiAgICAgICAgICAgICAgICBtb3VzZURvd25DbGllbnRYID0gZS5jbGllbnRYO1xyXG4gICAgICAgICAgICBkaWZmZXJlbmNlID0gMDtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgbW91c2VVcEV2ZW50OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZi5lbGVtZW50LmNvbnRhaW5zKGludmlzaWJsZUhvdmVyKSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5lbGVtZW50LnJlbW92ZUNoaWxkKGludmlzaWJsZUhvdmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgc291cmNlc0luZGV4ZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzZWxmLmRhdGEuc2xpZGUpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgZWxlbSBpbiBlbGVtZW50cykge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHNbZWxlbV0uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1jdXJzb3ItZ3JhYmJpbmcnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaXNfZHJhZ2dpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmIHVzZXIgZGlkbid0IHNsaWRlIG5vbmUgYW5pbWF0aW9uIHNob3VsZCB3b3JrXHJcbiAgICAgICAgICAgIGlmIChkaWZmZXJlbmNlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vd2UgY2FuIHNsaWRlIG9ubHkgaWYgcHJldmlvdXMgYW5pbWF0aW9uIGhhcyBmaW5pc2hlZFxyXG4gICAgICAgICAgICBpZiAoIXNsaWRlYUFibGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzbGlkZWFBYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgdHJhbnNpdGlvbiBpZiB1c2VyIHNsaWRlIHRvIHNvdXJjZVxyXG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0uY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBzbGlkZSBwcmV2aW91c1xyXG4gICAgICAgICAgICBpZiAoZGlmZmVyZW5jZSA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgc2xpZGUgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5kYXRhLnNsaWRlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKHNlbGYuZGF0YS50b3RhbF9zbGlkZXMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnNsaWRlIC0gMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHVybHNMZW5ndGggPj0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1QbHVzKHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1OdWxsKHNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBzZWxmLnRyYW5zZm9ybXMudHJhbnNmb3JtTnVsbChzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgbmV3IGluZGV4ZXNcclxuICAgICAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzID0gc2VsZi5nZXRTb3VyY2VzSW5kZXhlcy5hbGwoc2VsZi5kYXRhLnNsaWRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2lmIHNvdXJjZSBpc24ndCBhbHJlYWR5IGluIG1lbW9yeVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxmLmRhdGEuc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYWRzb3VyY2VzKCdwcmV2aW91cycsIHNlbGYuZGF0YS5zbGlkZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvLyBzbGlkZSBuZXh0XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRpZmZlcmVuY2UgPCAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy91cGRhdGUgc2xpZGUgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5kYXRhLnNsaWRlID09PSBzZWxmLmRhdGEudG90YWxfc2xpZGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKDEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnNsaWRlICsgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh1cmxzTGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1NaW51cyhzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnRyYW5zZm9ybXMudHJhbnNmb3JtTnVsbChzb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybU51bGwoc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IG5ldyBpbmRleGVzXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzSW5kZXhlcyA9IHNlbGYuZ2V0U291cmNlc0luZGV4ZXMuYWxsKHNlbGYuZGF0YS5zbGlkZSk7XHJcbiAgICAgICAgICAgICAgICAvL2lmIHNvdXJjZSBpc24ndCBhbHJlYWR5IGluIG1lbW9yeVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxmLmRhdGEuc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9hZHNvdXJjZXMoJ25leHQnLCBzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkaWZmZXJlbmNlID0gMDtcclxuICAgICAgICAgICAgc2VsZi5zdG9wVmlkZW9zKCk7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgdHJhbnNpdGlvbiBiZWNhdXNlIHdpdGggZHJhZ2dpbmcgaXQgbG9va3MgYXdmdWxcclxuICAgICAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdXNlciBzaG91bGRuJ3QgYmUgYWJsZSB0byBzbGlkZSB3aGVuIGFuaW1hdGlvbiBpcyBydW5uaW5nXHJcbiAgICAgICAgICAgICAgICBzbGlkZWFBYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSwgMjUwKTtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgbW91c2VNb3ZlRXZlbnQ6IGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlzX2RyYWdnaW5nIHx8ICFzbGlkZWFBYmxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBjbGllbnRYO1xyXG4gICAgICAgICAgICAoc2VsZi5kYXRhLmlzTW9iaWxlKSA/XHJcbiAgICAgICAgICAgICAgICBjbGllbnRYID0gZS50b3VjaGVzWzBdLmNsaWVudFggOlxyXG4gICAgICAgICAgICAgICAgY2xpZW50WCA9IGUuY2xpZW50WDtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuZWxlbWVudC5hcHBlbmRDaGlsZChpbnZpc2libGVIb3Zlcik7XHJcbiAgICAgICAgICAgIGRpZmZlcmVuY2UgPSBjbGllbnRYIC0gbW91c2VEb3duQ2xpZW50WDtcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlc0luZGV4ZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzZWxmLmRhdGEuc2xpZGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHVybHNMZW5ndGggPj0gMykge1xyXG4gICAgICAgICAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICtcclxuICAgICAgICAgICAgICAgICAgICAoLXNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGggKyBkaWZmZXJlbmNlKVxyXG4gICAgICAgICAgICAgICAgICAgICsgJ3B4LDApJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHVybHNMZW5ndGggPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyBkaWZmZXJlbmNlICsgJ3B4LDApJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHVybHNMZW5ndGggPj0gMikge1xyXG4gICAgICAgICAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCdcclxuICAgICAgICAgICAgICAgICAgICArIChzZWxmLmRhdGEuc2xpZGVEaXN0YW5jZSAqIHdpbmRvdy5pbm5lcldpZHRoICsgZGlmZmVyZW5jZSlcclxuICAgICAgICAgICAgICAgICAgICArICdweCwwKSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwcmV2ZW50RGVmYXVsdEV2ZW50OiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgZm9yIChsZXQgZWxlbSBpbiBlbGVtZW50cykge1xyXG4gICAgICAgIGVsZW1lbnRzW2VsZW1dLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGV2ZW50TGlzdGVuZXJzLm1vdXNlRG93bkV2ZW50KTtcclxuICAgICAgICBlbGVtZW50c1tlbGVtXS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZXZlbnRMaXN0ZW5lcnMubW91c2VEb3duRXZlbnQsIHtwYXNzaXZlOiB0cnVlfSk7XHJcbiAgICB9XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGV2ZW50TGlzdGVuZXJzLm1vdXNlVXBFdmVudCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBldmVudExpc3RlbmVycy5tb3VzZVVwRXZlbnQpO1xyXG4gICAgaW52aXNpYmxlSG92ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGV2ZW50TGlzdGVuZXJzLm1vdXNlVXBFdmVudCk7XHJcbiAgICBpbnZpc2libGVIb3Zlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGV2ZW50TGlzdGVuZXJzLm1vdXNlVXBFdmVudCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZXZlbnRMaXN0ZW5lcnMubW91c2VNb3ZlRXZlbnQpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGV2ZW50TGlzdGVuZXJzLm1vdXNlTW92ZUV2ZW50KTtcclxuICAgIHNlbGYuZGF0YS5uYXYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZXZlbnRMaXN0ZW5lcnMucHJldmVudERlZmF1bHRFdmVudCk7XHJcbn07Iiwid2luZG93LmZzTGlnaHRib3hPYmplY3QgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50ID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtY29udGFpbmVyJ10pO1xyXG5cclxuICAgIHRoaXMuZGF0YSA9IHtcclxuICAgICAgICBzbGlkZTogMSxcclxuICAgICAgICB0b3RhbF9zbGlkZXM6IDEsXHJcbiAgICAgICAgc2xpZGVEaXN0YW5jZTogMS4zLFxyXG4gICAgICAgIHNsaWRlQ291bnRlcjogdHJ1ZSxcclxuICAgICAgICBzbGlkZUJ1dHRvbnM6IHRydWUsXHJcbiAgICAgICAgaXNGaXJzdFRpbWVMb2FkOiBmYWxzZSxcclxuICAgICAgICBtb3ZlU2xpZGVzVmlhRHJhZzogdHJ1ZSxcclxuICAgICAgICB0b29sYmFyQnV0dG9uczoge1xyXG4gICAgICAgICAgICBcImNsb3NlXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiZnVsbHNjcmVlblwiOiB0cnVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbmFtZTogJycsXHJcblxyXG4gICAgICAgIGlzTW9iaWxlOiBmYWxzZSxcclxuXHJcbiAgICAgICAgdXJsczogW10sXHJcbiAgICAgICAgc291cmNlczogW10sXHJcbiAgICAgICAgc291cmNlc0xvYWRlZDogW10sXHJcbiAgICAgICAgcmVtZW1iZXJlZFNvdXJjZXNEaW1lbnNpb25zOiBbXSxcclxuICAgICAgICB2aWRlb3M6IFtdLFxyXG5cclxuICAgICAgICBob2xkZXJXcmFwcGVyOiB7fSxcclxuICAgICAgICBtZWRpYUhvbGRlcjoge30sXHJcbiAgICAgICAgbmF2OiB7fSxcclxuICAgICAgICB0b29sYmFyOiB7fSxcclxuICAgICAgICBzbGlkZUNvdW50ZXJFbGVtOiB7fSxcclxuXHJcbiAgICAgICAgaW5pdGlhdGVkOiBmYWxzZSxcclxuICAgICAgICBmdWxsc2NyZWVuOiBmYWxzZSxcclxuICAgICAgICBmYWRpbmdPdXQ6IGZhbHNlLFxyXG5cclxuICAgICAgICBvblJlc2l6ZUV2ZW50OiB7fSxcclxuICAgICAgICB1cGRhdGVTbGlkZU51bWJlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdCBhIG5ldyBmc0xpZ2h0Ym94IGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uIChpbml0SHJlZikge1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHNlbGYuZGF0YS5pbml0aWF0ZWQpIHtcclxuICAgICAgICAgICAgc2VsZi5pbml0U2V0U2xpZGUoaW5pdEhyZWYpO1xyXG4gICAgICAgICAgICBzZWxmLnNob3coKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgKGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgICAgICAgIGlmICgvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vfGFuZHJvaWR8aXBhZHxwbGF5Ym9va3xzaWxrL2kudGVzdChhKSB8fCAvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsIDQpKSkgc2VsZi5kYXRhLmlzTW9iaWxlID0gdHJ1ZTtcclxuICAgICAgICB9KShuYXZpZ2F0b3IudXNlckFnZW50IHx8IG5hdmlnYXRvci52ZW5kb3IgfHwgd2luZG93Lm9wZXJhKTtcclxuICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudCA9IG5ldyBvblJlc2l6ZUV2ZW50KCk7XHJcblxyXG4gICAgICAgIGxldCBnYWxsZXJ5ID0gc2VsZi5kYXRhLm5hbWU7XHJcblxyXG4gICAgICAgIGxldCB1cmxzID0gW107XHJcbiAgICAgICAgY29uc3QgYSA9IGZzTGlnaHRib3hIZWxwZXJzLmE7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghYVtpXS5oYXNBdHRyaWJ1dGUoJ2RhdGEtZnNsaWdodGJveCcpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYVtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnNsaWdodGJveCcpID09PSBnYWxsZXJ5KSB7XHJcbiAgICAgICAgICAgICAgICB1cmxzLnB1c2goYVtpXS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYuZGF0YS51cmxzID0gdXJscztcclxuICAgICAgICBzZWxmLmRhdGEudG90YWxfc2xpZGVzID0gdXJscy5sZW5ndGg7XHJcbiAgICAgICAgbmV3IHNlbGYuZG9tKCk7XHJcbiAgICAgICAgc2VsZi50aHJvd0V2ZW50KCdpbml0Jyk7XHJcbiAgICAgICAgc2VsZi50aHJvd0V2ZW50KCdvcGVuJyk7XHJcbiAgICAgICAgcmVxdWlyZSgnLi9jaGFuZ2VTbGlkZUJ5RHJhZ2dpbmcuanMnKShzZWxmLCBET01PYmplY3QpO1xyXG5cclxuICAgICAgICBzZWxmLmluaXRTZXRTbGlkZShpbml0SHJlZik7XHJcbiAgICAgICAgc2VsZi5kYXRhLmluaXRpYXRlZCA9IHRydWU7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXQgY2FuIGhhdmUgbXVsdGlwbGUgdHlwZSBvZiBzbGlkZXNcclxuICAgICAqIEBwYXJhbSBzbGlkZVxyXG4gICAgICovXHJcbiAgICB0aGlzLmluaXRTZXRTbGlkZSA9IGZ1bmN0aW9uIChzbGlkZSkge1xyXG5cclxuICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIHNsaWRlO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTbGlkZShzZWxmLmRhdGEudXJscy5pbmRleE9mKHNsaWRlKSArIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjpcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U2xpZGUoc2xpZGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U2xpZGUoMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3cgZG9tIG9mIGZzTGlnaHRib3ggaW5zdGFuY2UgaWYgZXhpc3RzXHJcbiAgICAgKi9cclxuICAgIHRoaXMuc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBlbGVtID0gc2VsZi5lbGVtZW50O1xyXG4gICAgICAgIHNlbGYuc2Nyb2xsYmFyLnNob3dTY3JvbGxiYXIoKTtcclxuICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtY29udGFpbmVyLWZhZGVvdXQnKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW0pO1xyXG4gICAgICAgIHNlbGYudGhyb3dFdmVudCgnc2hvdycpO1xyXG4gICAgICAgIHNlbGYudGhyb3dFdmVudCgnb3BlbicpO1xyXG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZShbJ2ZzbGlnaHRib3gtZmFkZS1pbi1hbmltYXRpb24nXSk7XHJcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKFsnZnNsaWdodGJveC1mYWRlLWluLWFuaW1hdGlvbiddKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlkZSBkb20gb2YgZXhpc3RpbmcgZnNMaWdodGJveCBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICB0aGlzLmhpZGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuZGF0YS5mdWxsc2NyZWVuKSBzZWxmLnRvb2xiYXIuY2xvc2VGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgc2VsZi5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtY29udGFpbmVyLWZhZGVvdXQnKTtcclxuICAgICAgICBzZWxmLmRhdGEuZmFkaW5nT3V0ID0gdHJ1ZTtcclxuICAgICAgICBzZWxmLnRocm93RXZlbnQoJ2Nsb3NlJyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuc2Nyb2xsYmFyLmhpZGVTY3JvbGxiYXIoKTtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLmZhZGluZ091dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNlbGYuZWxlbWVudCk7XHJcbiAgICAgICAgfSwgMjUwKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgYWxsIGxpYnJhcnkgZWxlbWVudHNcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLmRvbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXF1aXJlKCcuL3JlbmRlckRPTS5qcycpKHNlbGYsIERPTU9iamVjdCk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBldmVudCBhbmQgZGlzcGF0Y2ggaXQgdG8gc2VsZi5lbGVtZW50XHJcbiAgICAgKi9cclxuICAgIHRoaXMudGhyb3dFdmVudCA9IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcclxuICAgICAgICBsZXQgZXZlbnQ7XHJcbiAgICAgICAgaWYgKHR5cGVvZihFdmVudCkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoZXZlbnROYW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xyXG4gICAgICAgICAgICBldmVudC5pbml0RXZlbnQoZXZlbnROYW1lLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5lbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZSBkb20gZWxlbWVudCB3aXRoIGNsYXNzZXNcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBET01PYmplY3QodGFnKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZENsYXNzZXNBbmRDcmVhdGUgPSBmdW5jdGlvbiAoY2xhc3Nlcykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCBpbiBjbGFzc2VzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc2VzW2luZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYmplY3QgdGhhdCBjb250YWlucyBhbGwgYWN0aW9ucyB0aGF0IGZzbGlnaHRib3ggaXMgZG9pbmcgZHVyaW5nIHJ1bm5pbmdcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBvblJlc2l6ZUV2ZW50KCkge1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSBzZWxmLmRhdGEuc291cmNlcztcclxuXHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1zID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc291cmNlcyA9IHNlbGYuZGF0YS5zb3VyY2VzO1xyXG4gICAgICAgICAgICBjb25zdCBzdGFnZVNvdXJjZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzZWxmLmRhdGEuc2xpZGUpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgc291cmNlSW5kZXggaW4gc291cmNlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHNvdXJjZUluZGV4KSA9PT0gc3RhZ2VTb3VyY2VzLnByZXZpb3VzXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgcGFyc2VJbnQoc291cmNlSW5kZXgpID09PSBzdGFnZVNvdXJjZXMuY3VycmVudFxyXG4gICAgICAgICAgICAgICAgICAgIHx8IHBhcnNlSW50KHNvdXJjZUluZGV4KSA9PT0gc3RhZ2VTb3VyY2VzLm5leHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNvdXJjZXNbc291cmNlSW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1NaW51cyhzb3VyY2VzW3NvdXJjZUluZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5tZWRpYUhvbGRlckRpbWVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDEwMDApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuc3R5bGUud2lkdGggPSAod2luZG93LmlubmVyV2lkdGggLSAwLjEgKiB3aW5kb3cuaW5uZXJXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5zdHlsZS5oZWlnaHQgPSAod2luZG93LmlubmVySGVpZ2h0IC0gMC4xICogd2luZG93LmlubmVySGVpZ2h0KSArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLnN0eWxlLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5zdHlsZS5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5zb3VyY2VzRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN0YWdlU291cmNlc0luZGV4ZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgICAgICBjb25zdCByZW1lbWJlcmVkU291cmNlRGltZW5zaW9uID0gc2VsZi5kYXRhLnJlbWVtYmVyZWRTb3VyY2VzRGltZW5zaW9ucztcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHNvdXJjZUluZGV4IGluIHNvdXJjZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgdHJhbmZvcm1zIHRvIHN0YWdlIHNvdXJjZXNcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmRhdGEudXJscy5sZW5ndGggPiAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybU1pbnVzKHNvdXJjZXNbc3RhZ2VTb3VyY2VzSW5kZXhlcy5wcmV2aW91c10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybU51bGwoc291cmNlc1tzdGFnZVNvdXJjZXNJbmRleGVzLmN1cnJlbnRdKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmRhdGEudXJscy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybVBsdXMoc291cmNlc1tzdGFnZVNvdXJjZXNJbmRleGVzLm5leHRdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtID0gc291cmNlc1tzb3VyY2VJbmRleF0uZmlyc3RDaGlsZDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlV2lkdGggPSByZW1lbWJlcmVkU291cmNlRGltZW5zaW9uW3NvdXJjZUluZGV4XS53aWR0aDtcclxuICAgICAgICAgICAgICAgIGxldCBzb3VyY2VIZWlnaHQgPSByZW1lbWJlcmVkU291cmNlRGltZW5zaW9uW3NvdXJjZUluZGV4XS5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgY29lZmZpY2llbnQgPSBzb3VyY2VXaWR0aCAvIHNvdXJjZUhlaWdodDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRldmljZVdpZHRoID0gcGFyc2VJbnQoc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5zdHlsZS53aWR0aCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXZpY2VIZWlnaHQgPSBwYXJzZUludChzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLnN0eWxlLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3SGVpZ2h0ID0gZGV2aWNlV2lkdGggLyBjb2VmZmljaWVudDtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdIZWlnaHQgPCBkZXZpY2VIZWlnaHQgLSA2MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuaGVpZ2h0ID0gbmV3SGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUud2lkdGggPSBkZXZpY2VXaWR0aCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3SGVpZ2h0ID0gZGV2aWNlSGVpZ2h0IC0gNjA7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5oZWlnaHQgPSBuZXdIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS53aWR0aCA9IG5ld0hlaWdodCAqIGNvZWZmaWNpZW50ICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAoZnVuY3Rpb24gKGEpIHtcclxuICAgICAgICAgICAgICAgIGlmICgvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vfGFuZHJvaWR8aXBhZHxwbGF5Ym9va3xzaWxrL2kudGVzdChhKSB8fCAvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsIDQpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YS5pc01vYmlsZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhLmlzTW9iaWxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3cub3BlcmEpO1xyXG4gICAgICAgICAgICBfdGhpcy5tZWRpYUhvbGRlckRpbWVuc2lvbnMoKTtcclxuICAgICAgICAgICAgX3RoaXMuc291cmNlc0RpbWVuc2lvbnMoKTtcclxuICAgICAgICAgICAgX3RoaXMudHJhbnNmb3JtcygpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udGFpbnMgbWV0aG9kcyB0aGF0IHRha2VzIGNhcmUgb2Ygc2Nyb2xsYmFyXHJcbiAgICAgKiBAdHlwZSB7e2hpZGVTY3JvbGxiYXI6IFdpbmRvdy5zY3JvbGxiYXIuaGlkZVNjcm9sbGJhciwgc2hvd1Njcm9sbGJhcjogV2luZG93LnNjcm9sbGJhci5zaG93U2Nyb2xsYmFyfX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5zY3JvbGxiYXIgPSB7XHJcblxyXG4gICAgICAgIGhpZGVTY3JvbGxiYXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtb3BlbicpO1xyXG4gICAgICAgICAgICBpZiAoIXNlbGYuZGF0YS5pc01vYmlsZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlY29tcGVuc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVjb21wZW5zZS1mb3Itc2Nyb2xsYmFyJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVjb21wZW5zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY29tcGVuc2Uuc3R5bGUucGFkZGluZ1JpZ2h0ID0gJzAnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtc2Nyb2xsYmFyZml4Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzaG93U2Nyb2xsYmFyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LW9wZW4nKTtcclxuICAgICAgICAgICAgaWYgKCFzZWxmLmRhdGEuaXNNb2JpbGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZWNvbXBlbnNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlY29tcGVuc2UtZm9yLXNjcm9sbGJhcicpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlY29tcGVuc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWNvbXBlbnNlLnN0eWxlLnBhZGRpbmdSaWdodCA9ICcxN3B4JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LXNjcm9sbGJhcmZpeCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTVkdJY29uIG9iamVjdCB3aXRoIGdldFNWR0ljb24gbWV0aG9kIHdoaWNoIHJldHVybiA8c3ZnPiBlbGVtZW50IHdpdGggPHBhdGg+IGNoaWxkXHJcbiAgICAgKiBAcmV0dXJucyB7RWxlbWVudH1cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLlNWR0ljb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gIDxzdmc+IHdpdGggYWRkZWQgJ2ZzbGlnaHRib3gtc3ZnLWljb24nIGNsYXNzXHJcbiAgICAgICAgdGhpcy5zdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgXCJzdmdcIik7XHJcblxyXG4gICAgICAgIC8vIGNoaWxkIG9mIHN2ZyBlbXB0eSA8cGF0aD5cclxuICAgICAgICB0aGlzLnBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgXCJwYXRoXCIpO1xyXG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICdjbGFzcycsICdmc2xpZ2h0Ym94LXN2Zy1pY29uJyk7XHJcbiAgICAgICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3ZpZXdCb3gnLCAnMCAwIDE1IDE1Jyk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHVybnMgRE9NIDxzdmc+IGljb24gY29udGFpbmluZyA8cGF0aD4gY2hpbGQgd2l0aCBkIGF0dHJpYnV0ZSBmcm9tIHBhcmFtZXRlclxyXG4gICAgICAgICAqIEBwYXJhbSBkXHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5nZXRTVkdJY29uID0gZnVuY3Rpb24gKHZpZXdCb3gsIGRpbWVuc2lvbiwgZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhdGguc2V0QXR0cmlidXRlTlMobnVsbCwgJ2QnLCBkKTtcclxuICAgICAgICAgICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3ZpZXdCb3gnLCB2aWV3Qm94KTtcclxuICAgICAgICAgICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3dpZHRoJywgZGltZW5zaW9uKTtcclxuICAgICAgICAgICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2hlaWdodCcsIGRpbWVuc2lvbik7XHJcbiAgICAgICAgICAgIHRoaXMuc3ZnLmFwcGVuZENoaWxkKHRoaXMucGF0aCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN2ZztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9vbGJhciBvYmplY3Qgd2hpY2ggY29udGFpbnMgdG9vbGJhciBidXR0b25zXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgbGV0IHRvb2xiYXJNb2R1bGUgPSByZXF1aXJlKCcuL3Rvb2xiYXInKTtcclxuICAgIHRoaXMudG9vbGJhciA9IG5ldyB0b29sYmFyTW9kdWxlKHNlbGYsIERPTU9iamVjdCk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGl2IHRoYXQgaG9sZHMgc291cmNlIGVsZW1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tZWRpYUhvbGRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmhvbGRlciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LW1lZGlhLWhvbGRlciddKTtcclxuXHJcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gMTAwMCkge1xyXG4gICAgICAgICAgICB0aGlzLmhvbGRlci5zdHlsZS53aWR0aCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAtIDAuMSAqIHdpbmRvdy5pbm5lcldpZHRoKSArICdweCc7XHJcbiAgICAgICAgICAgIHRoaXMuaG9sZGVyLnN0eWxlLmhlaWdodCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSAwLjEgKiB3aW5kb3cuaW5uZXJIZWlnaHQpICsgJ3B4JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhvbGRlci5zdHlsZS53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgdGhpcy5ob2xkZXIuc3R5bGUuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVySG9sZGVyID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5ob2xkZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBvYmplY3Qgd2l0aCBzdGFnZSBzb3VyY2VzIGluZGV4ZXMgZGVwZW5kaW5nIG9uIHByb3ZpZGVkIHNsaWRlXHJcbiAgICAgKiBAcGFyYW0gc2xpZGVcclxuICAgICAqIEByZXR1cm5zIHt7cHJldmlvdXM6IG51bWJlciwgY3VycmVudDogbnVtYmVyLCBuZXh0OiBudW1iZXJ9fVxyXG4gICAgICovXHJcbiAgICB0aGlzLmdldFNvdXJjZXNJbmRleGVzID0ge1xyXG5cclxuICAgICAgICBwcmV2aW91czogZnVuY3Rpb24gKHNsaWRlKSB7XHJcbiAgICAgICAgICAgIGxldCBwcmV2aW91c1NsaWRlSW5kZXg7XHJcbiAgICAgICAgICAgIGNvbnN0IGFycmF5SW5kZXggPSBzbGlkZSAtIDE7XHJcblxyXG4gICAgICAgICAgICAvLyBwcmV2aW91c1xyXG4gICAgICAgICAgICBpZiAoYXJyYXlJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNTbGlkZUluZGV4ID0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlcyAtIDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91c1NsaWRlSW5kZXggPSBhcnJheUluZGV4IC0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzU2xpZGVJbmRleDtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKHNsaWRlKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV4dFNsaWRlSW5kZXg7XHJcbiAgICAgICAgICAgIGNvbnN0IGFycmF5SW5kZXggPSBzbGlkZSAtIDE7XHJcblxyXG4gICAgICAgICAgICAvL25leHRcclxuICAgICAgICAgICAgaWYgKHNsaWRlID09PSBzZWxmLmRhdGEudG90YWxfc2xpZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGVJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGVJbmRleCA9IGFycmF5SW5kZXggKyAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV4dFNsaWRlSW5kZXg7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIGFsbDogZnVuY3Rpb24gKHNsaWRlKSB7XHJcbiAgICAgICAgICAgIC8vIHNvdXJjZXMgYXJlIHN0b3JlZCBpbiBhcnJheSBpbmRleGVkIGZyb20gMFxyXG4gICAgICAgICAgICBjb25zdCBhcnJheUluZGV4ID0gc2xpZGUgLSAxO1xyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IHtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzOiAwLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudDogMCxcclxuICAgICAgICAgICAgICAgIG5leHQ6IDBcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIHByZXZpb3VzXHJcbiAgICAgICAgICAgIGlmIChhcnJheUluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzSW5kZXhlcy5wcmV2aW91cyA9IHNlbGYuZGF0YS50b3RhbF9zbGlkZXMgLSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc291cmNlc0luZGV4ZXMucHJldmlvdXMgPSBhcnJheUluZGV4IC0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gY3VycmVudFxyXG4gICAgICAgICAgICBzb3VyY2VzSW5kZXhlcy5jdXJyZW50ID0gYXJyYXlJbmRleDtcclxuXHJcbiAgICAgICAgICAgIC8vbmV4dFxyXG4gICAgICAgICAgICBpZiAoc2xpZGUgPT09IHNlbGYuZGF0YS50b3RhbF9zbGlkZXMpIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzLm5leHQgPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc291cmNlc0luZGV4ZXMubmV4dCA9IGFycmF5SW5kZXggKyAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc291cmNlc0luZGV4ZXM7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMudHJhbnNmb3JtcyA9IHtcclxuXHJcbiAgICAgICAgdHJhbnNmb3JtTWludXM6IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgICAgIGVsZW0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgKC1zZWxmLmRhdGEuc2xpZGVEaXN0YW5jZSAqIHdpbmRvdy5pbm5lcldpZHRoKSArICdweCwwKSc7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdHJhbnNmb3JtTnVsbDogZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgZWxlbS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKDAsMCknO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRyYW5zZm9ybVBsdXM6IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgICAgIGVsZW0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgc2VsZi5kYXRhLnNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aCArICdweCwwKSc7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wIHZpZGVvcyBhZnRlciBjaGFuZ2luZyBzbGlkZVxyXG4gICAgICovXHJcbiAgICB0aGlzLnN0b3BWaWRlb3MgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHZpZGVvcyA9IHNlbGYuZGF0YS52aWRlb3M7XHJcblxyXG4gICAgICAgIC8vIHRydWUgaXMgaHRtbDUgdmlkZW8sIGZhbHNlIGlzIHlvdXR1YmUgdmlkZW9cclxuICAgICAgICBmb3IgKGxldCB2aWRlb0luZGV4IGluIHZpZGVvcykge1xyXG5cclxuICAgICAgICAgICAgaWYgKHZpZGVvc1t2aWRlb0luZGV4XSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxmLmRhdGEuc291cmNlc1t2aWRlb0luZGV4XS5maXJzdENoaWxkLnBhdXNlICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhLnNvdXJjZXNbdmlkZW9JbmRleF0uZmlyc3RDaGlsZC5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnNvdXJjZXNbdmlkZW9JbmRleF0uZmlyc3RDaGlsZC5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKCd7XCJldmVudFwiOlwiY29tbWFuZFwiLFwiZnVuY1wiOlwic3RvcFZpZGVvXCIsXCJhcmdzXCI6XCJcIn0nLCAnKicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGlzLnNldFNsaWRlID0gZnVuY3Rpb24gKHNsaWRlKSB7XHJcblxyXG4gICAgICAgIHNlbGYuZGF0YS5zbGlkZSA9IHNsaWRlO1xyXG4gICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlcihzbGlkZSk7XHJcbiAgICAgICAgY29uc3Qgc291cmNlc0luZGV4ZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzbGlkZSk7XHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IHNlbGYuZGF0YS5zb3VyY2VzO1xyXG5cclxuICAgICAgICBpZiAoc291cmNlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlcygnaW5pdGlhbCcsIHNsaWRlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdID09PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlcygncHJldmlvdXMnLCBzbGlkZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdID09PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlcygnY3VycmVudCcsIHNsaWRlKTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0gPT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRzb3VyY2VzKCduZXh0Jywgc2xpZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgc291cmNlSW5kZXggaW4gc291cmNlcykge1xyXG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZUluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBzb3VyY2VzIGxlbmd0aCBuZWVkcyB0byBiZSBoaWdoZXIgdGhhbiAxIGJlY2F1c2UgaWYgdGhlcmUgaXMgb25seSAxIHNsaWRlXHJcbiAgICAgICAgICAgIC8vIHNvdXJjZXNJbmRleGVzLnByZXZpb3VzIHdpbGwgYmUgMCBzbyBpdCB3b3VsZCByZXR1cm4gYSBiYWQgdHJhbnNpdGlvblxyXG4gICAgICAgICAgICBpZiAoc291cmNlSW5kZXggPT0gc291cmNlc0luZGV4ZXMucHJldmlvdXMgJiYgc291cmNlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnRyYW5zZm9ybXMudHJhbnNmb3JtTWludXMoc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10pO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNvdXJjZUluZGV4ID09IHNvdXJjZXNJbmRleGVzLmN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1OdWxsKHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0pO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNvdXJjZUluZGV4ID09IHNvdXJjZXNJbmRleGVzLm5leHQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1QbHVzKHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0pO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1NaW51cyhzb3VyY2VzW3NvdXJjZUluZGV4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRob2RzIHRoYXQgYXBwZW5kcyBzb3VyY2VzIHRvIG1lZGlhSG9sZGVyIGRlcGVuZGluZyBvbiBhY3Rpb25cclxuICAgICAqIEB0eXBlIHt7aW5pdGlhbEFwcGVuZCwgcHJldmlvdXNBcHBlbmQsIG5leHRBcHBlbmR9fCp9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuYXBwZW5kTWV0aG9kcyA9IHJlcXVpcmUoJy4vYXBwZW5kU291cmNlJyk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcGxheSBzb3VyY2UgKGltYWdlcywgSFRNTDUgdmlkZW8sIFlvdVR1YmUgdmlkZW8pIGRlcGVuZGluZyBvbiBnaXZlbiB1cmwgZnJvbSB1c2VyXHJcbiAgICAgKiBPciBpZiBkaXNwbGF5IGlzIGluaXRpYWwgZGlzcGxheSAzIGluaXRpYWwgc291cmNlc1xyXG4gICAgICogSWYgdGhlcmUgYXJlID49IDMgaW5pdGlhbCBzb3VyY2VzIHRoZXJlIHdpbGwgYmUgYWx3YXlzIDMgaW4gc3RhZ2VcclxuICAgICAqIEBwYXJhbSB0eXBlT2ZMb2FkXHJcbiAgICAgKiBAcGFyYW0gc2xpZGVcclxuICAgICAqIEByZXR1cm5zIHttb2R1bGUuZXhwb3J0c31cclxuICAgICAqL1xyXG4gICAgdGhpcy5sb2Fkc291cmNlcyA9IGZ1bmN0aW9uICh0eXBlT2ZMb2FkLCBzbGlkZSkge1xyXG4gICAgICAgIGNvbnN0IGxvYWRzb3VyY2Vtb2R1bGUgPSByZXF1aXJlKFwiLi9sb2FkU291cmNlLmpzXCIpO1xyXG4gICAgICAgIHJldHVybiBuZXcgbG9hZHNvdXJjZW1vZHVsZShzZWxmLCBET01PYmplY3QsIHR5cGVPZkxvYWQsIHNsaWRlKTtcclxuICAgIH07XHJcbn07XHJcblxyXG5cclxuIWZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5mc0xpZ2h0Ym94SW5zdGFuY2VzID0gW107XHJcbiAgICB3aW5kb3cuZnNMaWdodGJveEhlbHBlcnMgPSB7XHJcbiAgICAgICAgXCJhXCI6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJylcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGEgPSBmc0xpZ2h0Ym94SGVscGVycy5hO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICBpZiAoIWFbaV0uaGFzQXR0cmlidXRlKCdkYXRhLWZzbGlnaHRib3gnKSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFbaV0uY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1maXgtd2Via2l0LWhpZ2hsaWdodCcpO1xyXG4gICAgICAgIGNvbnN0IGJveE5hbWUgPSBhW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1mc2xpZ2h0Ym94Jyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBmc0xpZ2h0Ym94SW5zdGFuY2VzW2JveE5hbWVdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIGZzTGlnaHRib3ggPSBuZXcgZnNMaWdodGJveE9iamVjdCgpO1xyXG4gICAgICAgICAgICBmc0xpZ2h0Ym94LmRhdGEubmFtZSA9IGJveE5hbWU7XHJcbiAgICAgICAgICAgIGZzTGlnaHRib3hJbnN0YW5jZXNbYm94TmFtZV0gPSBmc0xpZ2h0Ym94O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgbGV0IGdhbGxlcnkgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1mc2xpZ2h0Ym94Jyk7XHJcbiAgICAgICAgICAgIGlmIChmc0xpZ2h0Ym94SW5zdGFuY2VzW2dhbGxlcnldLmRhdGEuaW5pdGlhdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBmc0xpZ2h0Ym94SW5zdGFuY2VzW2dhbGxlcnldLnNldFNsaWRlKFxyXG4gICAgICAgICAgICAgICAgICAgIGZzTGlnaHRib3hJbnN0YW5jZXNbZ2FsbGVyeV0uZGF0YS51cmxzLmluZGV4T2YodGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSkgKyAxXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgZnNMaWdodGJveEluc3RhbmNlc1tnYWxsZXJ5XS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnNMaWdodGJveEluc3RhbmNlc1tnYWxsZXJ5XS5pbml0KHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KGRvY3VtZW50LCB3aW5kb3cpO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWxmLCBET01PYmplY3QsIHR5cGVPZkxvYWQsIHNsaWRlKSB7XHJcblxyXG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xyXG4gICAgY29uc3Qgc291cmNlc0luZGV4ZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzbGlkZSk7XHJcbiAgICBjb25zdCB1cmxzID0gc2VsZi5kYXRhLnVybHM7XHJcbiAgICBjb25zdCBzb3VyY2VzID0gc2VsZi5kYXRhLnNvdXJjZXM7XHJcbiAgICBsZXQgaW5pdGlhbEFwcGVuZHMgPSB7XHJcbiAgICAgICAgXCJwcmV2XCI6IGZhbHNlLFxyXG4gICAgICAgIFwiY3VyclwiOiBmYWxzZSxcclxuICAgICAgICBcIm5leHRcIjogZmFsc2VcclxuICAgIH07XHJcblxyXG5cclxuICAgIGxldCBzb3VyY2VEaW1lbnNpb25zID0gZnVuY3Rpb24gKHNvdXJjZUVsZW0sIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQpIHtcclxuXHJcbiAgICAgICAgY29uc3QgY29lZmZpY2llbnQgPSBzb3VyY2VXaWR0aCAvIHNvdXJjZUhlaWdodDtcclxuICAgICAgICBjb25zdCBkZXZpY2VXaWR0aCA9IHBhcnNlSW50KHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuc3R5bGUud2lkdGgpO1xyXG4gICAgICAgIGNvbnN0IGRldmljZUhlaWdodCA9IHBhcnNlSW50KHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuc3R5bGUuaGVpZ2h0KTtcclxuICAgICAgICBsZXQgbmV3SGVpZ2h0ID0gZGV2aWNlV2lkdGggLyBjb2VmZmljaWVudDtcclxuICAgICAgICBpZiAobmV3SGVpZ2h0IDwgZGV2aWNlSGVpZ2h0IC0gNjApIHtcclxuICAgICAgICAgICAgc291cmNlRWxlbS5zdHlsZS5oZWlnaHQgPSBuZXdIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIHNvdXJjZUVsZW0uc3R5bGUud2lkdGggPSBkZXZpY2VXaWR0aCArIFwicHhcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdIZWlnaHQgPSBkZXZpY2VIZWlnaHQgLSA2MDtcclxuICAgICAgICAgICAgc291cmNlRWxlbS5zdHlsZS5oZWlnaHQgPSBuZXdIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIHNvdXJjZUVsZW0uc3R5bGUud2lkdGggPSBuZXdIZWlnaHQgKiBjb2VmZmljaWVudCArIFwicHhcIjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBsZXQgbG9hZCA9IGZ1bmN0aW9uIChzb3VyY2VIb2xkZXIsIHNvdXJjZUVsZW0pIHtcclxuICAgICAgICBzb3VyY2VIb2xkZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgc291cmNlSG9sZGVyLmFwcGVuZENoaWxkKHNvdXJjZUVsZW0pO1xyXG4gICAgICAgIHZvaWQgc291cmNlSG9sZGVyLmZpcnN0Q2hpbGQub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgc291cmNlSG9sZGVyLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1mYWRlLWluLWFuaW1hdGlvbicpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgYXBwZW5kSW5pdGlhbCA9IGZ1bmN0aW9uIChzb3VyY2VIb2xkZXIsIHNvdXJjZUVsZW0pIHtcclxuICAgICAgICBzb3VyY2VIb2xkZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgc291cmNlSG9sZGVyLmFwcGVuZENoaWxkKHNvdXJjZUVsZW0pO1xyXG4gICAgICAgIHNvdXJjZUhvbGRlci5maXJzdENoaWxkLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbi1hbmltYXRpb24nKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgZmFkZSBpbiBjbGFzcyBhbmQgZGltZW5zaW9uIGZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIGxldCBvbmxvYWRMaXN0ZW5lciA9IGZ1bmN0aW9uIChzb3VyY2VFbGVtLCBzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0LCBhcnJheUluZGV4KSB7XHJcblxyXG4gICAgICAgIGxldCBzb3VyY2VIb2xkZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zb3VyY2UtaG9sZGVyJ10pO1xyXG5cclxuICAgICAgICAvL25vcm1hbCBzb3VyY2UgZGltZW5zaW9ucyBuZWVkcyB0byBiZSBzdG9yZWQgaW4gYXJyYXlcclxuICAgICAgICAvL2l0IHdpbGwgYmUgbmVlZGVkIHdoZW4gcmVzaXppbmcgYSBzb3VyY2VcclxuICAgICAgICBzZWxmLmRhdGEucmVtZW1iZXJlZFNvdXJjZXNEaW1lbnNpb25zW2FycmF5SW5kZXhdID0ge1xyXG4gICAgICAgICAgICBcIndpZHRoXCI6IHNvdXJjZVdpZHRoLFxyXG4gICAgICAgICAgICBcImhlaWdodFwiOiBzb3VyY2VIZWlnaHRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBzZXQgZGltZW5zaW9ucyBmb3IgdGhlIDFzdCB0aW1lXHJcbiAgICAgICAgc291cmNlRGltZW5zaW9ucyhzb3VyY2VFbGVtLCBzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0KTtcclxuICAgICAgICBzb3VyY2VIb2xkZXIuYXBwZW5kQ2hpbGQoc291cmNlRWxlbSk7XHJcblxyXG4gICAgICAgIGlmKHR5cGVPZkxvYWQgPT09ICdpbml0aWFsJykge1xyXG4gICAgICAgICAgICBhcHBlbmRJbml0aWFsKHNvdXJjZXNbYXJyYXlJbmRleF0sIHNvdXJjZUVsZW0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxvYWQoc291cmNlc1thcnJheUluZGV4XSwgc291cmNlRWxlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5sb2FkWW91dHViZXZpZGVvID0gZnVuY3Rpb24gKHZpZGVvSWQsIGFycmF5SW5kZXgpIHtcclxuICAgICAgICBsZXQgaWZyYW1lID0gbmV3IERPTU9iamVjdCgnaWZyYW1lJykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2luZ2xlLXNvdXJjZSddKTtcclxuICAgICAgICBpZnJhbWUuc3JjID0gJy8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLycgKyB2aWRlb0lkICsgJz9lbmFibGVqc2FwaT0xJztcclxuICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvd2Z1bGxzY3JlZW4nLCAnJyk7XHJcbiAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnZnJhbWVib3JkZXInLCAnMCcpO1xyXG4gICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcclxuICAgICAgICBvbmxvYWRMaXN0ZW5lcihpZnJhbWUsIDE5MjAsIDEwODAsIGFycmF5SW5kZXgpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5pbWFnZUxvYWQgPSBmdW5jdGlvbiAoc3JjLCBhcnJheUluZGV4KSB7XHJcbiAgICAgICAgbGV0IHNvdXJjZUVsZW0gPSBuZXcgRE9NT2JqZWN0KCdpbWcnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zaW5nbGUtc291cmNlJ10pO1xyXG4gICAgICAgIHNvdXJjZUVsZW0uc3JjID0gc3JjO1xyXG4gICAgICAgIHNvdXJjZUVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb25sb2FkTGlzdGVuZXIoc291cmNlRWxlbSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIGFycmF5SW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy52aWRlb0xvYWQgPSBmdW5jdGlvbiAoc3JjLCBhcnJheUluZGV4KSB7XHJcbiAgICAgICAgbGV0IHZpZGVvRWxlbSA9IG5ldyBET01PYmplY3QoJ3ZpZGVvJykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2luZ2xlLXNvdXJjZSddKTtcclxuICAgICAgICBsZXQgc291cmNlID0gbmV3IERPTU9iamVjdCgnc291cmNlJykuZWxlbTtcclxuICAgICAgICB2aWRlb0VsZW0ub25sb2FkZWRtZXRhZGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb25sb2FkTGlzdGVuZXIodmlkZW9FbGVtLCB0aGlzLnZpZGVvV2lkdGgsIHRoaXMudmlkZW9IZWlnaHQsIGFycmF5SW5kZXgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmlkZW9FbGVtLmlubmVyVGV4dCA9ICdTb3JyeSwgeW91ciBicm93c2VyIGRvZXNuXFwndCBzdXBwb3J0IGVtYmVkZGVkIHZpZGVvcywgPGFcXG4nICtcclxuICAgICAgICAgICAgJyAgICAgICAgICAgIGhyZWY9XCJodHRwOi8vZG93bmxvYWQuYmxlbmRlci5vcmcvcGVhY2gvYmlnYnVja2J1bm55X21vdmllcy9CaWdCdWNrQnVubnlfMzIweDE4MC5tcDRcIj5kb3dubG9hZDwvYT4gYW5kIHdhdGNoXFxuJyArXHJcbiAgICAgICAgICAgICcgICAgICAgIHdpdGggeW91ciBmYXZvcml0ZSB2aWRlbyBwbGF5ZXIhJztcclxuXHJcbiAgICAgICAgdmlkZW9FbGVtLnNldEF0dHJpYnV0ZSgnY29udHJvbHMnLCAnJyk7XHJcbiAgICAgICAgdmlkZW9FbGVtLmFwcGVuZENoaWxkKHNvdXJjZSk7XHJcbiAgICAgICAgc291cmNlLnNyYyA9IHNyYztcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5pbnZhbGlkRmlsZSA9IGZ1bmN0aW9uIChhcnJheUluZGV4KSB7XHJcbiAgICAgICAgbGV0IGludmFsaWRGaWxlV3JhcHBlciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LWludmFsaWQtZmlsZS13cmFwcGVyJ10pO1xyXG4gICAgICAgIGludmFsaWRGaWxlV3JhcHBlci5pbm5lckhUTUwgPSAnSW52YWxpZCBmaWxlJztcclxuXHJcbiAgICAgICAgb25sb2FkTGlzdGVuZXIoaW52YWxpZEZpbGVXcmFwcGVyLCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0LCBhcnJheUluZGV4KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbSA9IGZ1bmN0aW9uICh1cmxJbmRleCkge1xyXG4gICAgICAgIGNvbnN0IHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICBjb25zdCBzb3VyY2VVcmwgPSBzZWxmLmRhdGEudXJsc1t1cmxJbmRleF07XHJcblxyXG4gICAgICAgIHBhcnNlci5ocmVmID0gc291cmNlVXJsO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRJZChzb3VyY2VVcmwpIHtcclxuICAgICAgICAgICAgbGV0IHJlZ0V4cCA9IC9eLiooeW91dHUuYmVcXC98dlxcL3x1XFwvXFx3XFwvfGVtYmVkXFwvfHdhdGNoXFw/dj18XFwmdj0pKFteI1xcJlxcP10qKS4qLztcclxuICAgICAgICAgICAgbGV0IG1hdGNoID0gc291cmNlVXJsLm1hdGNoKHJlZ0V4cCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobWF0Y2ggJiYgbWF0Y2hbMl0ubGVuZ3RoID09IDExKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hbMl07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2Vycm9yJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhcnNlci5ob3N0bmFtZSA9PT0gJ3d3dy55b3V0dWJlLmNvbScpIHtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLnZpZGVvc1t1cmxJbmRleF0gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkWW91dHViZXZpZGVvKGdldElkKHNvdXJjZVVybCksIHVybEluZGV4KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwIHx8IHhoci5zdGF0dXMgPT09IDIwNikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIHdoYXQgdHlwZSBvZiBmaWxlIHByb3ZpZGVkIGZyb20gbGlua1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzcG9uc2VUeXBlID0geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdjb250ZW50LXR5cGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlLmluZGV4T2YoJy8nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlLnNsaWNlKDAsIHJlc3BvbnNlVHlwZS5pbmRleE9mKCcvJykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlVHlwZSA9PT0gJ2ltYWdlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW1hZ2VMb2FkKHVybHNbdXJsSW5kZXhdLCB1cmxJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlVHlwZSA9PT0gJ3ZpZGVvJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudmlkZW9Mb2FkKHVybHNbdXJsSW5kZXhdLCB1cmxJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEudmlkZW9zW3VybEluZGV4XSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW52YWxpZEZpbGUodXJsSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbnZhbGlkRmlsZSh1cmxJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgeGhyLm9wZW4oJ2dldCcsIHNvdXJjZVVybCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHhoci5zZW5kKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIGlmICh0eXBlT2ZMb2FkID09PSAnaW5pdGlhbCcpIHtcclxuICAgICAgICAvL2FwcGVuZCBsb2FkZXIgd2hlbiBsb2FkaW5nIGluaXRpYWxseVxyXG4gICAgICAgIHNlbGYuYXBwZW5kTWV0aG9kcy5yZW5kZXJIb2xkZXJJbml0aWFsKHNlbGYsIHNsaWRlLCBET01PYmplY3QpO1xyXG5cclxuICAgICAgICBpZiAodXJscy5sZW5ndGggPj0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc291cmNlc0luZGV4ZXMuY3VycmVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodXJscy5sZW5ndGggPj0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc291cmNlc0luZGV4ZXMubmV4dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodXJscy5sZW5ndGggPj0gMykge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc291cmNlc0luZGV4ZXMucHJldmlvdXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gYXBwZW5kIGxvYWRlciB3aGVuIGxvYWRpbmcgYSBuZXh0IHNvdXJjZVxyXG4gICAgICAgIHNlbGYuYXBwZW5kTWV0aG9kcy5yZW5kZXJIb2xkZXIoc2VsZiwgc2xpZGUsIHR5cGVPZkxvYWQpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHR5cGVPZkxvYWQpIHtcclxuICAgICAgICAgICAgY2FzZSAncHJldmlvdXMnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNvdXJjZXNJbmRleGVzLnByZXZpb3VzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdjdXJyZW50JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbShzb3VyY2VzSW5kZXhlcy5jdXJyZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICduZXh0JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbShzb3VyY2VzSW5kZXhlcy5uZXh0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWxmLCBET01PYmplY3QpIHtcclxuXHJcbiAgICBsZXQgcHJpdmF0ZU1ldGhvZHMgPSB7XHJcblxyXG4gICAgICAgIHJlbmRlck5hdjogZnVuY3Rpb24gKGNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEubmF2ID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtbmF2J10pO1xyXG4gICAgICAgICAgICBzZWxmLnRvb2xiYXIucmVuZGVyVG9vbGJhcihzZWxmLmRhdGEubmF2KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlQ291bnRlciA9IG5ldyB0aGlzLnNsaWRlQ291bnRlcigpO1xyXG4gICAgICAgICAgICBzbGlkZUNvdW50ZXIucmVuZGVyU2xpZGVDb3VudGVyKHNlbGYuZGF0YS5uYXYpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5kYXRhLm5hdik7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNyZWF0ZUJUTjogZnVuY3Rpb24gKGJ1dHRvbkNvbnRhaW5lciwgY29udGFpbmVyLCBkKSB7XHJcbiAgICAgICAgICAgIGxldCBidG4gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4nLCAnYnV0dG9uLXN0eWxlJ10pO1xyXG4gICAgICAgICAgICBidG4uYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBuZXcgc2VsZi5TVkdJY29uKCkuZ2V0U1ZHSWNvbignMCAwIDIwIDIwJywgJzFlbScsIGQpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uQ29udGFpbmVyKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXJTbGlkZUJ1dHRvbnM6IGZ1bmN0aW9uIChjb250YWluZXIpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZUJ1dHRvbnMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9yZW5kZXIgbGVmdCBidG5cclxuICAgICAgICAgICAgbGV0IGxlZnRfYnRuX2NvbnRhaW5lciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLWJ0bi1jb250YWluZXInLCAnZnNsaWdodGJveC1zbGlkZS1idG4tbGVmdC1jb250YWluZXInXSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQlROKGxlZnRfYnRuX2NvbnRhaW5lciwgY29udGFpbmVyLCAnTTguMzg4LDEwLjA0OWw0Ljc2LTQuODczYzAuMzAzLTAuMzEsMC4yOTctMC44MDQtMC4wMTItMS4xMDVjLTAuMzA5LTAuMzA0LTAuODAzLTAuMjkzLTEuMTA1LDAuMDEyTDYuNzI2LDkuNTE2Yy0wLjMwMywwLjMxLTAuMjk2LDAuODA1LDAuMDEyLDEuMTA1bDUuNDMzLDUuMzA3YzAuMTUyLDAuMTQ4LDAuMzUsMC4yMjMsMC41NDcsMC4yMjNjMC4yMDMsMCwwLjQwNi0wLjA4LDAuNTU5LTAuMjM2YzAuMzAzLTAuMzA5LDAuMjk1LTAuODAzLTAuMDEyLTEuMTA0TDguMzg4LDEwLjA0OXonKTtcclxuXHJcbiAgICAgICAgICAgIC8vZ28gdG8gcHJldmlvdXMgc2xpZGUgb25jbGlja1xyXG4gICAgICAgICAgICBsZWZ0X2J0bl9jb250YWluZXIub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuYXBwZW5kTWV0aG9kcy5wcmV2aW91c1NsaWRlVmlhQnV0dG9uKHNlbGYsIHNlbGYuZGF0YS5zbGlkZSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgcmlnaHRfYnRuX2NvbnRhaW5lciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLWJ0bi1jb250YWluZXInLCAnZnNsaWdodGJveC1zbGlkZS1idG4tcmlnaHQtY29udGFpbmVyJ10pO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUJUTihyaWdodF9idG5fY29udGFpbmVyLCBjb250YWluZXIsICdNMTEuNjExLDEwLjA0OWwtNC43Ni00Ljg3M2MtMC4zMDMtMC4zMS0wLjI5Ny0wLjgwNCwwLjAxMi0xLjEwNWMwLjMwOS0wLjMwNCwwLjgwMy0wLjI5MywxLjEwNSwwLjAxMmw1LjMwNiw1LjQzM2MwLjMwNCwwLjMxLDAuMjk2LDAuODA1LTAuMDEyLDEuMTA1TDcuODMsMTUuOTI4Yy0wLjE1MiwwLjE0OC0wLjM1LDAuMjIzLTAuNTQ3LDAuMjIzYy0wLjIwMywwLTAuNDA2LTAuMDgtMC41NTktMC4yMzZjLTAuMzAzLTAuMzA5LTAuMjk1LTAuODAzLDAuMDEyLTEuMTA0TDExLjYxMSwxMC4wNDl6Jyk7XHJcbiAgICAgICAgICAgIC8vIGdvIHRvIG5leHQgc2xpZGUgb24gY2xpY2tcclxuICAgICAgICAgICAgcmlnaHRfYnRuX2NvbnRhaW5lci5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hcHBlbmRNZXRob2RzLm5leHRTbGlkZVZpYUJ1dHRvbihzZWxmLCBzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNsaWRlIGNvdW50ZXIgb2JqZWN0IC0gdXBwZXIgbGVmdCBjb3JuZXIgb2YgZnNMaWdodGJveFxyXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNsaWRlQ291bnRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgbnVtYmVyQ29udGFpbmVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtbnVtYmVyLWNvbnRhaW5lciddKTtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlQ291bnRlckVsZW0gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1zbGlkZS1udW1iZXInXSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGVDb3VudGVyRWxlbS5pbm5lckhUTUwgPSBzZWxmLmRhdGEuc2xpZGU7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zbGlkZUNvdW50ZXJFbGVtLmlkID0gJ2N1cnJlbnRfc2xpZGUnO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNwYWNlID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtc2xpZGUtbnVtYmVyJywgJ2ZzbGlnaHRib3gtc2xhc2gnXSk7XHJcbiAgICAgICAgICAgIHNwYWNlLmlubmVySFRNTCA9ICcvJztcclxuXHJcbiAgICAgICAgICAgIGxldCBzbGlkZXMgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1zbGlkZS1udW1iZXInXSk7XHJcbiAgICAgICAgICAgIHNsaWRlcy5pbm5lckhUTUwgPSBzZWxmLmRhdGEudG90YWxfc2xpZGVzO1xyXG5cclxuICAgICAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYuZGF0YS5zbGlkZUNvdW50ZXJFbGVtKTtcclxuICAgICAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNwYWNlKTtcclxuICAgICAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNsaWRlcyk7XHJcblxyXG4gICAgICAgICAgICAvLyB0aGlzIG1ldGhvZCBpcyBjYWxsZWQgYWZ0ZXIgc3dpdGNoaW5nIHNsaWRlc1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEudXBkYXRlU2xpZGVOdW1iZXIgPSBmdW5jdGlvbiAobnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGUgPSBudW1iZXI7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGVDb3VudGVyRWxlbS5pbm5lckhUTUwgPSBudW1iZXI7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclNsaWRlQ291bnRlciA9IGZ1bmN0aW9uIChuYXYpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmRhdGEuc2xpZGVDb3VudGVyKVxyXG4gICAgICAgICAgICAgICAgICAgIG5hdi5hcHBlbmRDaGlsZChudW1iZXJDb250YWluZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL2Rpc2FibGUgc2Nyb2xsaW5nIGFuZCBhZGQgZml4IGZvciBqdW1waW5nIHNpdGUgaWYgbm90IG1vYmlsZVxyXG4gICAgc2VsZi5zY3JvbGxiYXIuc2hvd1Njcm9sbGJhcigpO1xyXG4gICAgc2VsZi5lbGVtZW50LmlkID0gXCJmc2xpZ2h0Ym94LWNvbnRhaW5lclwiO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWxmLmVsZW1lbnQpO1xyXG5cclxuICAgIC8vcmVuZGVyIHNsaWRlIGJ1dHRvbnMgYW5kIG5hdih0b29sYmFyKVxyXG4gICAgcHJpdmF0ZU1ldGhvZHMucmVuZGVyTmF2KHNlbGYuZWxlbWVudCk7XHJcblxyXG4gICAgaWYgKHNlbGYuZGF0YS50b3RhbF9zbGlkZXMgPiAxKSB7XHJcbiAgICAgICAgcHJpdmF0ZU1ldGhvZHMucmVuZGVyU2xpZGVCdXR0b25zKHNlbGYuZWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZi5kYXRhLmhvbGRlcldyYXBwZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1ob2xkZXItd3JhcHBlciddKTtcclxuICAgIHNlbGYuZWxlbWVudC5hcHBlbmRDaGlsZChzZWxmLmRhdGEuaG9sZGVyV3JhcHBlcik7XHJcbiAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIgPSBuZXcgc2VsZi5tZWRpYUhvbGRlcigpO1xyXG4gICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLnJlbmRlckhvbGRlcihzZWxmLmRhdGEuaG9sZGVyV3JhcHBlcik7XHJcbiAgICBzZWxmLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChbJ2ZzbGlnaHRib3gtZmFkZS1pbi1hbmltYXRpb24nXSk7XHJcbiAgICBzZWxmLmRhdGEuaXNmaXJzdFRpbWVMb2FkID0gdHJ1ZTtcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWxmLCBET01PYmplY3QpIHtcclxuXHJcbiAgICB0aGlzLnRvb2xiYXJFbGVtID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtdG9vbGJhciddKTtcclxuICAgIGNvbnN0IF90aGlzID0gdGhpcztcclxuXHJcbiAgICB0aGlzLnJlbmRlckRlZmF1bHRCdXR0b25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBzaG91bGRSZW5kZXJCdXR0b25zID0gc2VsZi5kYXRhLnRvb2xiYXJCdXR0b25zO1xyXG5cclxuICAgICAgICBpZiAoc2hvdWxkUmVuZGVyQnV0dG9ucy5mdWxsc2NyZWVuID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCBidXR0b24gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC10b29sYmFyLWJ1dHRvbicsICdidXR0b24tc3R5bGUnXSk7XHJcbiAgICAgICAgICAgIGxldCBzdmcgPSBuZXcgc2VsZi5TVkdJY29uKCkuZ2V0U1ZHSWNvbignMCAwIDE3LjUgMTcuNScsICcxLjI1ZW0nLCAnTTQuNSAxMUgzdjRoNHYtMS41SDQuNVYxMXpNMyA3aDEuNVY0LjVIN1YzSDN2NHptMTAuNSA2LjVIMTFWMTVoNHYtNGgtMS41djIuNXpNMTEgM3YxLjVoMi41VjdIMTVWM2gtNHonKTtcclxuICAgICAgICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKHN2Zyk7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgKHNlbGYuZGF0YS5mdWxsc2NyZWVuKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2xvc2VGdWxsc2NyZWVuKCk6XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub3BlbkZ1bGxzY3JlZW4oKTtcclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMudG9vbGJhckVsZW0uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzaG91bGRSZW5kZXJCdXR0b25zLmNsb3NlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCBidXR0b24gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC10b29sYmFyLWJ1dHRvbicsICdidXR0b24tc3R5bGUnXSk7XHJcbiAgICAgICAgICAgIGxldCBzdmcgPSBuZXcgc2VsZi5TVkdJY29uKCkuZ2V0U1ZHSWNvbignMCAwIDIwIDIwJywgJzFlbScsICdNIDExLjQ2OSAxMCBsIDcuMDggLTcuMDggYyAwLjQwNiAtMC40MDYgMC40MDYgLTEuMDY0IDAgLTEuNDY5IGMgLTAuNDA2IC0wLjQwNiAtMS4wNjMgLTAuNDA2IC0xLjQ2OSAwIEwgMTAgOC41MyBsIC03LjA4MSAtNy4wOCBjIC0wLjQwNiAtMC40MDYgLTEuMDY0IC0wLjQwNiAtMS40NjkgMCBjIC0wLjQwNiAwLjQwNiAtMC40MDYgMS4wNjMgMCAxLjQ2OSBMIDguNTMxIDEwIEwgMS40NSAxNy4wODEgYyAtMC40MDYgMC40MDYgLTAuNDA2IDEuMDY0IDAgMS40NjkgYyAwLjIwMyAwLjIwMyAwLjQ2OSAwLjMwNCAwLjczNSAwLjMwNCBjIDAuMjY2IDAgMC41MzEgLTAuMTAxIDAuNzM1IC0wLjMwNCBMIDEwIDExLjQ2OSBsIDcuMDggNy4wODEgYyAwLjIwMyAwLjIwMyAwLjQ2OSAwLjMwNCAwLjczNSAwLjMwNCBjIDAuMjY3IDAgMC41MzIgLTAuMTAxIDAuNzM1IC0wLjMwNCBjIDAuNDA2IC0wLjQwNiAwLjQwNiAtMS4wNjQgMCAtMS40NjkgTCAxMS40NjkgMTAgWicpO1xyXG4gICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoc3ZnKTtcclxuICAgICAgICAgICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZighc2VsZi5kYXRhLmZhZGluZ091dCkgc2VsZi5oaWRlKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMudG9vbGJhckVsZW0uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGlzLm9wZW5GdWxsc2NyZWVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlbGYuZGF0YS5mdWxsc2NyZWVuID0gdHJ1ZTtcclxuICAgICAgICBsZXQgZWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuICAgICAgICBpZiAoZWxlbS5yZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAgICAgICBlbGVtLnJlcXVlc3RGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICAgIGVsZW0ubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGVsZW0ud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgZWxlbS53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbS5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgICAgIGVsZW0ubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jbG9zZUZ1bGxzY3JlZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2VsZi5kYXRhLmZ1bGxzY3JlZW4gPSBmYWxzZTtcclxuICAgICAgICBpZiAoZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5yZW5kZXJUb29sYmFyID0gZnVuY3Rpb24gKG5hdikge1xyXG4gICAgICAgIHRoaXMucmVuZGVyRGVmYXVsdEJ1dHRvbnMoKTtcclxuICAgICAgICBuYXYuYXBwZW5kQ2hpbGQodGhpcy50b29sYmFyRWxlbSk7XHJcbiAgICB9O1xyXG59OyJdfQ==
