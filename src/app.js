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
            self.transforms.transformMinus(sourceHolderPrevious);
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
            self.transforms.transformPlus(sourceHolderNext);
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
        self.transforms.transformMinus(sourceHolder);

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
        self.transforms.transformPlus(sourceHolder);

        self.data.sources[nextSourceIndex] = sourceHolder;
        holder.appendChild(sourceHolder);
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

    // if there are only 2 or 1 urls transforms will be different
    const urlsLength = self.data.urls.length;

    let is_dragging = false;
    let mouseDownClientX;
    let difference;
    let slideaAble = true;

    let eventListeners = {


        mouseDownEvent: function (e) {

            // tag can't be video cause it would be unclickable in microsoft browsers
            if (e.target.tagName !== 'VIDEO') {
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
            if (mediaHolder.contains(invisibleHover)) {
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

            mediaHolder.appendChild(invisibleHover);
            difference = e.clientX - mouseDownClientX;
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
        total_slides: 1,
        slideDistance: 1.3,
        slideCounter: true,
        slideButtons: true,
        isFirstTimeLoad: false,
        moveSlidesViaDrag: true,
        isRenderingToolbarButtons: {
            "close": true
        },

        element: null,
        isMobile: false,

        urls: [],
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


    /**
     * Init a new fsLightbox instance
     */
    this.init = function () {
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) self.data.isMobile = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        self.data.onResizeEvent = new onResizeEvent();
        new self.dom();
        require('./changeSlideByDragging.js')(self, DOMObject);
    };


    /**
     * Show dom of fsLightbox instance if exists
     */
    this.show = function () {
        if (self.data.element !== null) {
            document.body.classList.add('fslightbox-open');
            document.body.appendChild(self.data.element);
            self.data.element.classList.remove(['fslightbox-fade-in-animation']);
            self.data.element.classList.add(['fslightbox-fade-in-animation']);
        } else {
            self.init();
        }
    };


    /**
     * Hide dom of existing fsLightbox instance
     */
    this.hide = function () {
        document.body.classList.remove('fslightbox-open');
        if(!self.data.isMobile) {
            document.body.classList.remove('fslightbox-scrollbarfix');
        }
        document.body.removeChild(self.data.element);
    };


    /**
     * Render all library elements
     * @constructor
     */
    this.dom = function () {
        require('./renderDOM.js')(self, DOMObject);
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

            for (let sourceIndex in sources) {

                // add tranforms to stage sources
                self.transforms.transformMinus(sources[stageSourcesIndexes.previous]);
                self.transforms.transformNull(sources[stageSourcesIndexes.current]);
                self.transforms.transformPlus(sources[stageSourcesIndexes.next]);

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
                button.onclick = self.hide;
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
    let a = document.getElementsByTagName('a');


    for (let i = 0; i < a.length; i++) {

        a[i].addEventListener('click', function (e) {

            let urls = [];

            e.preventDefault();
            const gallery = a[i].getAttribute('data-fslightbox');

            for (let j = 0; j < a.length; j++) {

                const name = a[j].getAttribute('data-fslightbox');

                if (name === gallery) {
                    urls.push(a[j].getAttribute('href'));
                }
            }

            fsLightbox = new fsLightboxObject();
            fsLightbox.data.urls = urls;
            fsLightbox.data.total_slides = urls.length;
            fsLightbox.init();
        });
    }
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
                const tempSourcesLength = Object.keys(tempSources).length;

                let appends = {

                    appendPrevious: function () {
                        previousSource.innerHTML = '';
                        previousSource.appendChild(tempSources[sourcesIndexes.previous].firstChild);
                        previousSource.firstChild.classList.add('fslightbox-fade-in');
                    },

                    appendCurrent: function () {
                        currentSource.innerHTML = '';
                        currentSource.appendChild(tempSources[sourcesIndexes.current].firstChild);
                        void currentSource.firstChild.offsetWidth;
                        currentSource.firstChild.classList.add('fslightbox-fade-in');
                    },

                    appendNext: function () {
                        nextSource.innerHTML = '';
                        nextSource.appendChild(tempSources[sourcesIndexes.next].firstChild);
                        nextSource.firstChild.classList.add('fslightbox-fade-in');
                    }
                };

                if(urls.length >= 3) {
                    // append sources only if all stage sources are loaded
                    if(tempSourcesLength >= 3) {
                        appends.appendPrevious();
                        appends.appendCurrent();
                        appends.appendNext();
                    }
                }


                if(urls.length === 2) {
                    if(tempSourcesLength >= 2) {
                        appends.appendPrevious();
                        appends.appendCurrent();
                    }
                }

                if(urls.length === 1) {
                    appends.appendCurrent();
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

            if(urls.length >= 1) {
                this.createSourceElem(urls[sourcesIndexes.current]);
            }

            if(urls.length >= 2) {
                this.createSourceElem(urls[sourcesIndexes.next]);
            }

            if(urls.length >= 3) {
                this.createSourceElem(urls[sourcesIndexes.previous]);
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
            let left_btn_container = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn-container','fslightbox-slide-btn-left-container']);
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

    //disable scrolling and add fix for jumping site if not mobile
    document.body.classList.add('fslightbox-open');
    if(!self.data.isMobile) {
        document.body.classList.add('fslightbox-scrollbarfix');
    }

    //create container
    self.data.element = new DOMObject('div').addClassesAndCreate(['fslightbox-container']);
    self.data.element.id = "fslightbox-container";
    document.body.appendChild(self.data.element);

    //render slide buttons and nav(toolbar)
    privateMethods.renderNav(self.data.element);

    if(self.data.total_slides > 1) {
        privateMethods.renderSlideButtons(self.data.element);
    }

    self.data.mediaHolder = new self.mediaHolder();
    self.data.mediaHolder.renderHolder(self.data.element);
    self.data.element.classList.add(['fslightbox-fade-in-animation']);

    self.data.isfirstTimeLoad = true;
    self.loadsources('initial', self.data.slide);
};
},{}]},{},[3,5,4,1,2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwZW5kU291cmNlLmpzIiwic3JjL2pzL2NoYW5nZVNsaWRlQnlEcmFnZ2luZy5qcyIsInNyYy9qcy9pbmRleC5qcyIsInNyYy9qcy9sb2FkU291cmNlLmpzIiwic3JjL2pzL3JlbmRlckRPTS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Y0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgbG9hZGVyIHdoZW4gbG9hZGluZyBmc0xpZ2h0Ym94IGluaXRpYWxseVxyXG4gICAgICogQHBhcmFtIHNlbGZcclxuICAgICAqIEBwYXJhbSBzbGlkZVxyXG4gICAgICogQHBhcmFtIERPTU9iamVjdFxyXG4gICAgICovXHJcbiAgICByZW5kZXJIb2xkZXJJbml0aWFsOiBmdW5jdGlvbiAoc2VsZiwgc2xpZGUsIERPTU9iamVjdCkge1xyXG4gICAgICAgIGNvbnN0IGhvbGRlciA9IHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXI7XHJcbiAgICAgICAgY29uc3Qgc291cmNlc0luZGV4ZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzbGlkZSk7XHJcbiAgICAgICAgY29uc3QgbG9hZGVyID0gJzxkaXYgY2xhc3M9XCJsZHMtcmluZ1wiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+JztcclxuICAgICAgICBjb25zdCB0b3RhbFNsaWRlcyA9IHNlbGYuZGF0YS50b3RhbF9zbGlkZXM7XHJcblxyXG4gICAgICAgIGlmICh0b3RhbFNsaWRlcyA+PSAzKSB7XHJcbiAgICAgICAgICAgIGxldCBzb3VyY2VIb2xkZXJQcmV2aW91cyA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNvdXJjZS1ob2xkZXInXSk7XHJcbiAgICAgICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1NaW51cyhzb3VyY2VIb2xkZXJQcmV2aW91cyk7XHJcbiAgICAgICAgICAgIHNvdXJjZUhvbGRlclByZXZpb3VzLmlubmVySFRNTCA9IGxvYWRlcjtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLnNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdID0gc291cmNlSG9sZGVyUHJldmlvdXM7XHJcbiAgICAgICAgICAgIGhvbGRlci5hcHBlbmRDaGlsZChzb3VyY2VIb2xkZXJQcmV2aW91cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodG90YWxTbGlkZXMgPj0gMSkge1xyXG4gICAgICAgICAgICBsZXQgc291cmNlSG9sZGVyQ3VycmVudCA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNvdXJjZS1ob2xkZXInXSk7XHJcbiAgICAgICAgICAgIHNvdXJjZUhvbGRlckN1cnJlbnQuaW5uZXJIVE1MID0gbG9hZGVyO1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEuc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XSA9IHNvdXJjZUhvbGRlckN1cnJlbnQ7XHJcbiAgICAgICAgICAgIGhvbGRlci5hcHBlbmRDaGlsZChzb3VyY2VIb2xkZXJDdXJyZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0b3RhbFNsaWRlcyA+PSAyKSB7XHJcbiAgICAgICAgICAgIGxldCBzb3VyY2VIb2xkZXJOZXh0ID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc291cmNlLWhvbGRlciddKTtcclxuICAgICAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybVBsdXMoc291cmNlSG9sZGVyTmV4dCk7XHJcbiAgICAgICAgICAgIHNvdXJjZUhvbGRlck5leHQuaW5uZXJIVE1MID0gbG9hZGVyO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5kYXRhLnNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0gPSBzb3VyY2VIb2xkZXJOZXh0O1xyXG4gICAgICAgICAgICBob2xkZXIuYXBwZW5kQ2hpbGQoc291cmNlSG9sZGVyTmV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIGxvYWRlciB3aGVuIGxvYWRpbmcgYSBwcmV2aW91cyBzb3VyY2VcclxuICAgICAqIEBwYXJhbSBzZWxmXHJcbiAgICAgKiBAcGFyYW0gc2xpZGVcclxuICAgICAqIEBwYXJhbSBET01PYmplY3RcclxuICAgICAqL1xyXG4gICAgcmVuZGVySG9sZGVyUHJldmlvdXM6IGZ1bmN0aW9uIChzZWxmLCBzbGlkZSwgRE9NT2JqZWN0KSB7XHJcbiAgICAgICAgY29uc3QgaG9sZGVyID0gc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlcjtcclxuICAgICAgICBjb25zdCBwcmV2aW91c1NvdXJjZUluZGV4ID0gc2VsZi5nZXRTb3VyY2VzSW5kZXhlcy5wcmV2aW91cyhzbGlkZSk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBob2xkZXIgYW5kIGFkZCBhIHByb3BlciB0cmFuc2Zvcm1cclxuICAgICAgICBsZXQgc291cmNlSG9sZGVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc291cmNlLWhvbGRlciddKTtcclxuICAgICAgICBzb3VyY2VIb2xkZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJsZHMtcmluZ1wiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+JztcclxuICAgICAgICBzZWxmLnRyYW5zZm9ybXMudHJhbnNmb3JtTWludXMoc291cmNlSG9sZGVyKTtcclxuXHJcbiAgICAgICAgc2VsZi5kYXRhLnNvdXJjZXNbcHJldmlvdXNTb3VyY2VJbmRleF0gPSBzb3VyY2VIb2xkZXI7XHJcbiAgICAgICAgaG9sZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIHNvdXJjZUhvbGRlcik7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgbG9hZGVyIHdoZW4gbG9hZGluZyBhIG5leHQgc291cmNlXHJcbiAgICAgKiBAcGFyYW0gc2VsZlxyXG4gICAgICogQHBhcmFtIHNsaWRlXHJcbiAgICAgKiBAcGFyYW0gRE9NT2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHJlbmRlckhvbGRlck5leHQ6IGZ1bmN0aW9uIChzZWxmLCBzbGlkZSwgRE9NT2JqZWN0KSB7XHJcbiAgICAgICAgY29uc3QgaG9sZGVyID0gc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlcjtcclxuICAgICAgICBjb25zdCBuZXh0U291cmNlSW5kZXggPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLm5leHQoc2xpZGUpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgaG9sZGVyIGFuZCBhZGQgYSBwcm9wZXIgdHJhbnNmb3JtXHJcbiAgICAgICAgbGV0IHNvdXJjZUhvbGRlciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNvdXJjZS1ob2xkZXInXSk7XHJcbiAgICAgICAgc291cmNlSG9sZGVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwibGRzLXJpbmdcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybVBsdXMoc291cmNlSG9sZGVyKTtcclxuXHJcbiAgICAgICAgc2VsZi5kYXRhLnNvdXJjZXNbbmV4dFNvdXJjZUluZGV4XSA9IHNvdXJjZUhvbGRlcjtcclxuICAgICAgICBob2xkZXIuYXBwZW5kQ2hpbGQoc291cmNlSG9sZGVyKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlIHNsaWRlIHRvIHByZXZpb3VzIGFmdGVyIGNsaWNraW5nIGJ1dHRvblxyXG4gICAgICogQHBhcmFtIHNlbGZcclxuICAgICAqIEBwYXJhbSBwcmV2aW91c1NsaWRlXHJcbiAgICAgKi9cclxuICAgIHByZXZpb3VzU2xpZGVWaWFCdXR0b246IGZ1bmN0aW9uIChzZWxmLCBwcmV2aW91c1NsaWRlKSB7XHJcbiAgICAgICAgaWYgKHByZXZpb3VzU2xpZGUgPT09IDEpIHtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlID0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGUgLT0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYuc3RvcFZpZGVvcygpO1xyXG4gICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgIGNvbnN0IG5ld1NvdXJjZXNJbmRleGVzID0gc2VsZi5nZXRTb3VyY2VzSW5kZXhlcy5hbGwoc2VsZi5kYXRhLnNsaWRlKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxmLmRhdGEuc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5wcmV2aW91c10gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlcygncHJldmlvdXMnLCBzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IHNlbGYuZGF0YS5zb3VyY2VzO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTb3VyY2UgPSBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLmN1cnJlbnRdO1xyXG4gICAgICAgIGNvbnN0IG5leHRTb3VyY2UgPSBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLm5leHRdO1xyXG5cclxuICAgICAgICBuZXh0U291cmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcblxyXG4gICAgICAgIG5leHRTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1mYWRlLWluLWFuaW1hdGlvbicpO1xyXG4gICAgICAgIHZvaWQgbmV4dFNvdXJjZS5vZmZzZXRXaWR0aDtcclxuICAgICAgICBuZXh0U291cmNlLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbi1hbmltYXRpb24nKTtcclxuXHJcblxyXG4gICAgICAgIGN1cnJlbnRTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1mYWRlLWluLWFuaW1hdGlvbicpO1xyXG4gICAgICAgIHZvaWQgY3VycmVudFNvdXJjZS5vZmZzZXRXaWR0aDtcclxuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbi1hbmltYXRpb24nKTtcclxuXHJcbiAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybU51bGwoY3VycmVudFNvdXJjZSk7XHJcbiAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybVBsdXMobmV4dFNvdXJjZSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoYW5nZSBzbGlkZSB0byBuZXh0IGFmdGVyIGNsaWNraW5nIGJ1dHRvblxyXG4gICAgICogQHBhcmFtIHNlbGZcclxuICAgICAqIEBwYXJhbSBwcmV2aW91c1NsaWRlXHJcbiAgICAgKi9cclxuICAgIG5leHRTbGlkZVZpYUJ1dHRvbjogZnVuY3Rpb24gKHNlbGYsIHByZXZpb3VzU2xpZGUpIHtcclxuICAgICAgICBpZiAocHJldmlvdXNTbGlkZSA9PT0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlcykge1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGUgPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zbGlkZSArPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5zdG9wVmlkZW9zKCk7XHJcbiAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKHNlbGYuZGF0YS5zbGlkZSk7XHJcbiAgICAgICAgY29uc3QgbmV3U291cmNlc0luZGV4ZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzZWxmLmRhdGEuc2xpZGUpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHNlbGYuZGF0YS5zb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLm5leHRdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHNlbGYubG9hZHNvdXJjZXMoJ25leHQnLCBzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IHNlbGYuZGF0YS5zb3VyY2VzO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTb3VyY2UgPSBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLmN1cnJlbnRdO1xyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzU291cmNlID0gc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5wcmV2aW91c107XHJcblxyXG4gICAgICAgIHByZXZpb3VzU291cmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLm5leHRdLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuXHJcbiAgICAgICAgcHJldmlvdXNTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1mYWRlLWluLWFuaW1hdGlvbicpO1xyXG4gICAgICAgIHZvaWQgcHJldmlvdXNTb3VyY2Uub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgcHJldmlvdXNTb3VyY2UuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1mYWRlLWluLWFuaW1hdGlvbicpO1xyXG5cclxuXHJcbiAgICAgICAgY3VycmVudFNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LWZhZGUtaW4tYW5pbWF0aW9uJyk7XHJcbiAgICAgICAgdm9pZCBjdXJyZW50U291cmNlLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIGN1cnJlbnRTb3VyY2UuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1mYWRlLWluLWFuaW1hdGlvbicpO1xyXG5cclxuXHJcbiAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybU51bGwoY3VycmVudFNvdXJjZSk7XHJcbiAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybU1pbnVzKHByZXZpb3VzU291cmNlKTtcclxuICAgIH1cclxuXHJcblxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlbGYsIERPTU9iamVjdCkge1xyXG5cclxuICAgIC8vdG8gdGhlc2UgZWxlbWVudHMgYXJlIGFkZGVkIG1vdXNlIGV2ZW50c1xyXG4gICAgY29uc3QgZWxlbWVudHMgPSB7XHJcbiAgICAgICAgXCJtZWRpYUhvbGRlclwiOiBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLFxyXG4gICAgICAgIFwibmF2XCI6IHNlbGYuZGF0YS5uYXZcclxuICAgIH07XHJcbiAgICAvL3NvdXJjZXMgYXJlIHRyYW5zZm9ybWVkXHJcbiAgICBjb25zdCBzb3VyY2VzID0gc2VsZi5kYXRhLnNvdXJjZXM7XHJcbiAgICBjb25zdCBtZWRpYUhvbGRlciA9IHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXI7XHJcblxyXG4gICAgLy93ZSB3aWxsIGhvdmVyIGFsbCB3aW5kb3dzIHdpdGggZGl2IHdpdGggaGlnaCB6LWluZGV4IHRvIGJlIHN1cmUgbW91c2V1cCBpcyB0cmlnZ2VyZWRcclxuICAgIGNvbnN0IGludmlzaWJsZUhvdmVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtaW52aXNpYmxlLWhvdmVyJ10pO1xyXG5cclxuICAgIC8vIGlmIHRoZXJlIGFyZSBvbmx5IDIgb3IgMSB1cmxzIHRyYW5zZm9ybXMgd2lsbCBiZSBkaWZmZXJlbnRcclxuICAgIGNvbnN0IHVybHNMZW5ndGggPSBzZWxmLmRhdGEudXJscy5sZW5ndGg7XHJcblxyXG4gICAgbGV0IGlzX2RyYWdnaW5nID0gZmFsc2U7XHJcbiAgICBsZXQgbW91c2VEb3duQ2xpZW50WDtcclxuICAgIGxldCBkaWZmZXJlbmNlO1xyXG4gICAgbGV0IHNsaWRlYUFibGUgPSB0cnVlO1xyXG5cclxuICAgIGxldCBldmVudExpc3RlbmVycyA9IHtcclxuXHJcblxyXG4gICAgICAgIG1vdXNlRG93bkV2ZW50OiBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgLy8gdGFnIGNhbid0IGJlIHZpZGVvIGNhdXNlIGl0IHdvdWxkIGJlIHVuY2xpY2thYmxlIGluIG1pY3Jvc29mdCBicm93c2Vyc1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSAhPT0gJ1ZJREVPJykge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBlbGVtIGluIGVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50c1tlbGVtXS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LWN1cnNvci1ncmFiYmluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlzX2RyYWdnaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgbW91c2VEb3duQ2xpZW50WCA9IGUuY2xpZW50WDtcclxuICAgICAgICAgICAgZGlmZmVyZW5jZSA9IDA7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIG1vdXNlVXBFdmVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobWVkaWFIb2xkZXIuY29udGFpbnMoaW52aXNpYmxlSG92ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICBtZWRpYUhvbGRlci5yZW1vdmVDaGlsZChpbnZpc2libGVIb3Zlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHNvdXJjZXNJbmRleGVzID0gc2VsZi5nZXRTb3VyY2VzSW5kZXhlcy5hbGwoc2VsZi5kYXRhLnNsaWRlKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGVsZW0gaW4gZWxlbWVudHMpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzW2VsZW1dLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtY3Vyc29yLWdyYWJiaW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlzX2RyYWdnaW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB1c2VyIGRpZG4ndCBzbGlkZSBub25lIGFuaW1hdGlvbiBzaG91bGQgd29ya1xyXG4gICAgICAgICAgICBpZiAoZGlmZmVyZW5jZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3dlIGNhbiBzbGlkZSBvbmx5IGlmIHByZXZpb3VzIGFuaW1hdGlvbiBoYXMgZmluaXNoZWRcclxuICAgICAgICAgICAgaWYgKCFzbGlkZWFBYmxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2xpZGVhQWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gYWRkIHRyYW5zaXRpb24gaWYgdXNlciBzbGlkZSB0byBzb3VyY2VcclxuICAgICAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10uY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gc2xpZGUgcHJldmlvdXNcclxuICAgICAgICAgICAgaWYgKGRpZmZlcmVuY2UgPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHNsaWRlIG51bWJlclxyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEudG90YWxfc2xpZGVzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKHNlbGYuZGF0YS5zbGlkZSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh1cmxzTGVuZ3RoID49IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnRyYW5zZm9ybXMudHJhbnNmb3JtUGx1cyhzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnRyYW5zZm9ybXMudHJhbnNmb3JtTnVsbChzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybU51bGwoc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IG5ldyBpbmRleGVzXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzSW5kZXhlcyA9IHNlbGYuZ2V0U291cmNlc0luZGV4ZXMuYWxsKHNlbGYuZGF0YS5zbGlkZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9pZiBzb3VyY2UgaXNuJ3QgYWxyZWFkeSBpbiBtZW1vcnlcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZi5kYXRhLnNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlcygncHJldmlvdXMnLCBzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gc2xpZGUgbmV4dFxyXG4gICAgICAgICAgICBlbHNlIGlmIChkaWZmZXJlbmNlIDwgMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdXBkYXRlIHNsaWRlIG51bWJlclxyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZSA9PT0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlcigxKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKHNlbGYuZGF0YS5zbGlkZSArIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodXJsc0xlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnRyYW5zZm9ybXMudHJhbnNmb3JtTWludXMoc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50cmFuc2Zvcm1zLnRyYW5zZm9ybU51bGwoc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1OdWxsKHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGdldCBuZXcgaW5kZXhlc1xyXG4gICAgICAgICAgICAgICAgc291cmNlc0luZGV4ZXMgPSBzZWxmLmdldFNvdXJjZXNJbmRleGVzLmFsbChzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgICAgICAgICAgLy9pZiBzb3VyY2UgaXNuJ3QgYWxyZWFkeSBpbiBtZW1vcnlcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZi5kYXRhLnNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYWRzb3VyY2VzKCduZXh0Jywgc2VsZi5kYXRhLnNsaWRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGlmZmVyZW5jZSA9IDA7XHJcbiAgICAgICAgICAgIHNlbGYuc3RvcFZpZGVvcygpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRyYW5zaXRpb24gYmVjYXVzZSB3aXRoIGRyYWdnaW5nIGl0IGxvb2tzIGF3ZnVsXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHVzZXIgc2hvdWxkbid0IGJlIGFibGUgdG8gc2xpZGUgd2hlbiBhbmltYXRpb24gaXMgcnVubmluZ1xyXG4gICAgICAgICAgICAgICAgc2xpZGVhQWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0sIDI1MCk7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIG1vdXNlTW92ZUV2ZW50OiBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpc19kcmFnZ2luZyB8fCAhc2xpZGVhQWJsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtZWRpYUhvbGRlci5hcHBlbmRDaGlsZChpbnZpc2libGVIb3Zlcik7XHJcbiAgICAgICAgICAgIGRpZmZlcmVuY2UgPSBlLmNsaWVudFggLSBtb3VzZURvd25DbGllbnRYO1xyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IHNlbGYuZ2V0U291cmNlc0luZGV4ZXMuYWxsKHNlbGYuZGF0YS5zbGlkZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodXJsc0xlbmd0aCA+PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgK1xyXG4gICAgICAgICAgICAgICAgICAgICgtc2VsZi5kYXRhLnNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aCArIGRpZmZlcmVuY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgKyAncHgsMCknO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodXJsc0xlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIGRpZmZlcmVuY2UgKyAncHgsMCknO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodXJsc0xlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJ1xyXG4gICAgICAgICAgICAgICAgICAgICsgKHNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGggKyBkaWZmZXJlbmNlKVxyXG4gICAgICAgICAgICAgICAgICAgICsgJ3B4LDApJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIGZvciAobGV0IGVsZW0gaW4gZWxlbWVudHMpIHtcclxuICAgICAgICBlbGVtZW50c1tlbGVtXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBldmVudExpc3RlbmVycy5tb3VzZURvd25FdmVudCk7XHJcbiAgICB9XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGV2ZW50TGlzdGVuZXJzLm1vdXNlVXBFdmVudCk7XHJcbiAgICAvL3dlIHdpbGwgaG92ZXIgYWxsIHdpbmRvd3Mgd2l0aCBkaXYgd2l0aCBoaWdoIHotaW5kZXggdG8gYmUgc3VyZSBtb3VzZXVwIGlzIHRyaWdnZXJlZFxyXG4gICAgaW52aXNpYmxlSG92ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGV2ZW50TGlzdGVuZXJzLm1vdXNlVXBFdmVudCk7XHJcbiAgICBpbnZpc2libGVIb3Zlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBldmVudExpc3RlbmVycy5tb3VzZVVwRXZlbnQpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGV2ZW50TGlzdGVuZXJzLm1vdXNlTW92ZUV2ZW50KTtcclxufTsiLCJ3aW5kb3cuZnNMaWdodGJveE9iamVjdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLmRhdGEgPSB7XHJcbiAgICAgICAgc2xpZGU6IDEsXHJcbiAgICAgICAgdG90YWxfc2xpZGVzOiAxLFxyXG4gICAgICAgIHNsaWRlRGlzdGFuY2U6IDEuMyxcclxuICAgICAgICBzbGlkZUNvdW50ZXI6IHRydWUsXHJcbiAgICAgICAgc2xpZGVCdXR0b25zOiB0cnVlLFxyXG4gICAgICAgIGlzRmlyc3RUaW1lTG9hZDogZmFsc2UsXHJcbiAgICAgICAgbW92ZVNsaWRlc1ZpYURyYWc6IHRydWUsXHJcbiAgICAgICAgaXNSZW5kZXJpbmdUb29sYmFyQnV0dG9uczoge1xyXG4gICAgICAgICAgICBcImNsb3NlXCI6IHRydWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBlbGVtZW50OiBudWxsLFxyXG4gICAgICAgIGlzTW9iaWxlOiBmYWxzZSxcclxuXHJcbiAgICAgICAgdXJsczogW10sXHJcbiAgICAgICAgc291cmNlczogW10sXHJcbiAgICAgICAgc291cmNlc0xvYWRlZDogW10sXHJcbiAgICAgICAgcmVtZW1iZXJlZFNvdXJjZXNEaW1lbnNpb25zOiBbXSxcclxuICAgICAgICB2aWRlb3M6IFtdLFxyXG5cclxuICAgICAgICBtZWRpYUhvbGRlcjoge30sXHJcbiAgICAgICAgbmF2OiB7fSxcclxuICAgICAgICB0b29sYmFyOiB7fSxcclxuICAgICAgICBzbGlkZUNvdW50ZXJFbGVtOiB7fSxcclxuXHJcbiAgICAgICAgb25SZXNpemVFdmVudDogJycsXHJcbiAgICAgICAgdXBkYXRlU2xpZGVOdW1iZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHtXaW5kb3d9XHJcbiAgICAgKi9cclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0IGEgbmV3IGZzTGlnaHRib3ggaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIChmdW5jdGlvbiAoYSkge1xyXG4gICAgICAgICAgICBpZiAoLyhhbmRyb2lkfGJiXFxkK3xtZWVnbykuK21vYmlsZXxhdmFudGdvfGJhZGFcXC98YmxhY2tiZXJyeXxibGF6ZXJ8Y29tcGFsfGVsYWluZXxmZW5uZWN8aGlwdG9wfGllbW9iaWxlfGlwKGhvbmV8b2QpfGlyaXN8a2luZGxlfGxnZSB8bWFlbW98bWlkcHxtbXB8bW9iaWxlLitmaXJlZm94fG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIGNlfHhkYXx4aWlub3xhbmRyb2lkfGlwYWR8cGxheWJvb2t8c2lsay9pLnRlc3QoYSkgfHwgLzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChhLnN1YnN0cigwLCA0KSkpIHNlbGYuZGF0YS5pc01vYmlsZSA9IHRydWU7XHJcbiAgICAgICAgfSkobmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvdy5vcGVyYSk7XHJcbiAgICAgICAgc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQgPSBuZXcgb25SZXNpemVFdmVudCgpO1xyXG4gICAgICAgIG5ldyBzZWxmLmRvbSgpO1xyXG4gICAgICAgIHJlcXVpcmUoJy4vY2hhbmdlU2xpZGVCeURyYWdnaW5nLmpzJykoc2VsZiwgRE9NT2JqZWN0KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvdyBkb20gb2YgZnNMaWdodGJveCBpbnN0YW5jZSBpZiBleGlzdHNcclxuICAgICAqL1xyXG4gICAgdGhpcy5zaG93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChzZWxmLmRhdGEuZWxlbWVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtb3BlbicpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNlbGYuZGF0YS5lbGVtZW50KTtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShbJ2ZzbGlnaHRib3gtZmFkZS1pbi1hbmltYXRpb24nXSk7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoWydmc2xpZ2h0Ym94LWZhZGUtaW4tYW5pbWF0aW9uJ10pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGYuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlkZSBkb20gb2YgZXhpc3RpbmcgZnNMaWdodGJveCBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICB0aGlzLmhpZGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LW9wZW4nKTtcclxuICAgICAgICBpZighc2VsZi5kYXRhLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1zY3JvbGxiYXJmaXgnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzZWxmLmRhdGEuZWxlbWVudCk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciBhbGwgbGlicmFyeSBlbGVtZW50c1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHRoaXMuZG9tID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJlcXVpcmUoJy4vcmVuZGVyRE9NLmpzJykoc2VsZiwgRE9NT2JqZWN0KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGUgZG9tIGVsZW1lbnQgd2l0aCBjbGFzc2VzXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gRE9NT2JqZWN0KHRhZykge1xyXG4gICAgICAgIHRoaXMuZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRDbGFzc2VzQW5kQ3JlYXRlID0gZnVuY3Rpb24gKGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggaW4gY2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3Nlc1tpbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsZW1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JqZWN0IHRoYXQgY29udGFpbnMgYWxsIGFjdGlvbnMgdGhhdCBmc2xpZ2h0Ym94IGlzIGRvaW5nIGR1cmluZyBydW5uaW5nXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gb25SZXNpemVFdmVudCgpIHtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gc2VsZi5kYXRhLnNvdXJjZXM7XHJcbiAgICAgICAgY29uc3QgcmVtZW1iZXJlZFNvdXJjZURpbWVuc2lvbiA9IHNlbGYuZGF0YS5yZW1lbWJlcmVkU291cmNlc0RpbWVuc2lvbnM7XHJcblxyXG4gICAgICAgIHRoaXMubWVkaWFIb2xkZXJEaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiAxMDAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLnN0eWxlLndpZHRoID0gKHdpbmRvdy5pbm5lcldpZHRoIC0gMC4xICogd2luZG93LmlubmVyV2lkdGgpICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuc3R5bGUuaGVpZ2h0ID0gKHdpbmRvdy5pbm5lckhlaWdodCAtIDAuMSAqIHdpbmRvdy5pbm5lckhlaWdodCkgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5zdHlsZS53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuc3R5bGUuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuc291cmNlc0RpbWVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdGFnZVNvdXJjZXNJbmRleGVzID0gc2VsZi5nZXRTb3VyY2VzSW5kZXhlcy5hbGwoc2VsZi5kYXRhLnNsaWRlKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHNvdXJjZUluZGV4IGluIHNvdXJjZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgdHJhbmZvcm1zIHRvIHN0YWdlIHNvdXJjZXNcclxuICAgICAgICAgICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1NaW51cyhzb3VyY2VzW3N0YWdlU291cmNlc0luZGV4ZXMucHJldmlvdXNdKTtcclxuICAgICAgICAgICAgICAgIHNlbGYudHJhbnNmb3Jtcy50cmFuc2Zvcm1OdWxsKHNvdXJjZXNbc3RhZ2VTb3VyY2VzSW5kZXhlcy5jdXJyZW50XSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnRyYW5zZm9ybXMudHJhbnNmb3JtUGx1cyhzb3VyY2VzW3N0YWdlU291cmNlc0luZGV4ZXMubmV4dF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBzb3VyY2VzW3NvdXJjZUluZGV4XS5maXJzdENoaWxkO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBzb3VyY2VXaWR0aCA9IHJlbWVtYmVyZWRTb3VyY2VEaW1lbnNpb25bc291cmNlSW5kZXhdLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZUhlaWdodCA9IHJlbWVtYmVyZWRTb3VyY2VEaW1lbnNpb25bc291cmNlSW5kZXhdLmhlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2VmZmljaWVudCA9IHNvdXJjZVdpZHRoIC8gc291cmNlSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGV2aWNlV2lkdGggPSBwYXJzZUludChzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLnN0eWxlLndpZHRoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRldmljZUhlaWdodCA9IHBhcnNlSW50KHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuc3R5bGUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdIZWlnaHQgPSBkZXZpY2VXaWR0aCAvIGNvZWZmaWNpZW50O1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld0hlaWdodCA8IGRldmljZUhlaWdodCAtIDYwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5oZWlnaHQgPSBuZXdIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS53aWR0aCA9IGRldmljZVdpZHRoICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdIZWlnaHQgPSBkZXZpY2VIZWlnaHQgLSA2MDtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLndpZHRoID0gbmV3SGVpZ2h0ICogY29lZmZpY2llbnQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLm1lZGlhSG9sZGVyRGltZW5zaW9ucygpO1xyXG4gICAgICAgICAgICBfdGhpcy5zb3VyY2VzRGltZW5zaW9ucygpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU1ZHSWNvbiBvYmplY3Qgd2l0aCBnZXRTVkdJY29uIG1ldGhvZCB3aGljaCByZXR1cm4gPHN2Zz4gZWxlbWVudCB3aXRoIDxwYXRoPiBjaGlsZFxyXG4gICAgICogQHJldHVybnMge0VsZW1lbnR9XHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgdGhpcy5TVkdJY29uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICA8c3ZnPiB3aXRoIGFkZGVkICdmc2xpZ2h0Ym94LXN2Zy1pY29uJyBjbGFzc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIFwic3ZnXCIpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBjaGlsZCBvZiBzdmcgZW1wdHkgPHBhdGg+XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5wYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIFwicGF0aFwiKTtcclxuICAgICAgICB0aGlzLnN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnY2xhc3MnLCAnZnNsaWdodGJveC1zdmctaWNvbicpO1xyXG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICd2aWV3Qm94JywgJzAgMCAyMCAyMCcpO1xyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmV0dXJucyBET00gPHN2Zz4gaWNvbiBjb250YWluaW5nIDxwYXRoPiBjaGlsZCB3aXRoIGQgYXR0cmlidXRlIGZyb20gcGFyYW1ldGVyXHJcbiAgICAgICAgICogQHBhcmFtIGRcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmdldFNWR0ljb24gPSBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhdGguc2V0QXR0cmlidXRlTlMobnVsbCwgJ2QnLCBkKTtcclxuICAgICAgICAgICAgdGhpcy5zdmcuYXBwZW5kQ2hpbGQodGhpcy5wYXRoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3ZnO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2xpZGUgY291bnRlciBvYmplY3QgLSB1cHBlciBsZWZ0IGNvcm5lciBvZiBmc0xpZ2h0Ym94XHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgdGhpcy5zbGlkZUNvdW50ZXJFbGVtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBudW1iZXJDb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1udW1iZXItY29udGFpbmVyJ10pO1xyXG4gICAgICAgIHNlbGYuZGF0YS5zbGlkZUNvdW50ZXJFbGVtID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtc2xpZGUtbnVtYmVyJ10pO1xyXG5cclxuICAgICAgICBzZWxmLmRhdGEuc2xpZGVDb3VudGVyRWxlbS5pbm5lckhUTUwgPSBzZWxmLmRhdGEuc2xpZGU7XHJcbiAgICAgICAgc2VsZi5kYXRhLnNsaWRlQ291bnRlckVsZW0uaWQgPSAnY3VycmVudF9zbGlkZSc7XHJcblxyXG4gICAgICAgIGxldCBzcGFjZSA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLXNsaWRlLW51bWJlcicsICdmc2xpZ2h0Ym94LXNsYXNoJ10pO1xyXG4gICAgICAgIHNwYWNlLmlubmVySFRNTCA9ICcvJztcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlcyA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLXNsaWRlLW51bWJlciddKTtcclxuICAgICAgICBzbGlkZXMuaW5uZXJIVE1MID0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlcztcclxuXHJcbiAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYuZGF0YS5zbGlkZUNvdW50ZXJFbGVtKTtcclxuICAgICAgICBudW1iZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoc3BhY2UpO1xyXG4gICAgICAgIG51bWJlckNvbnRhaW5lci5hcHBlbmRDaGlsZChzbGlkZXMpO1xyXG5cclxuICAgICAgICAvLyB0aGlzIG1ldGhvZCBpcyBjYWxsZWQgYWZ0ZXIgc3dpdGNoaW5nIHNsaWRlc1xyXG4gICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlciA9IGZ1bmN0aW9uIChudW1iZXIpIHtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlID0gbnVtYmVyO1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGVDb3VudGVyRWxlbS5pbm5lckhUTUwgPSBudW1iZXI7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTbGlkZUNvdW50ZXIgPSBmdW5jdGlvbiAobmF2KSB7XHJcbiAgICAgICAgICAgIG5hdi5hcHBlbmRDaGlsZChudW1iZXJDb250YWluZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9vbGJhciBidXR0b25cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLnRvb2xiYXJCdXR0b24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5idXR0b24gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC10b29sYmFyLWJ1dHRvbicsICdidXR0b24tc3R5bGUnXSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkU1ZHSWNvbiA9IGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgIGxldCBTVkdJY29uID0gbmV3IHNlbGYuU1ZHSWNvbigpLmdldFNWR0ljb24oZCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgU1ZHSWNvblxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYnV0dG9uKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvb2xiYXIgb2JqZWN0IHdoaWNoIGNvbnRhaW5zIHRvb2xiYXIgYnV0dG9uc1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHRoaXMudG9vbGJhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnRvb2xiYXJFbGVtID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtdG9vbGJhciddKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJEZWZhdWx0QnV0dG9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHNob3VsZFJlbmRlckJ1dHRvbnMgPSBzZWxmLmRhdGEuaXNSZW5kZXJpbmdUb29sYmFyQnV0dG9ucztcclxuXHJcbiAgICAgICAgICAgIGlmIChzaG91bGRSZW5kZXJCdXR0b25zLmNsb3NlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnV0dG9uID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtdG9vbGJhci1idXR0b24nLCAnYnV0dG9uLXN0eWxlJ10pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN2ZyA9IG5ldyBzZWxmLlNWR0ljb24oKS5nZXRTVkdJY29uKCdNIDExLjQ2OSAxMCBsIDcuMDggLTcuMDggYyAwLjQwNiAtMC40MDYgMC40MDYgLTEuMDY0IDAgLTEuNDY5IGMgLTAuNDA2IC0wLjQwNiAtMS4wNjMgLTAuNDA2IC0xLjQ2OSAwIEwgMTAgOC41MyBsIC03LjA4MSAtNy4wOCBjIC0wLjQwNiAtMC40MDYgLTEuMDY0IC0wLjQwNiAtMS40NjkgMCBjIC0wLjQwNiAwLjQwNiAtMC40MDYgMS4wNjMgMCAxLjQ2OSBMIDguNTMxIDEwIEwgMS40NSAxNy4wODEgYyAtMC40MDYgMC40MDYgLTAuNDA2IDEuMDY0IDAgMS40NjkgYyAwLjIwMyAwLjIwMyAwLjQ2OSAwLjMwNCAwLjczNSAwLjMwNCBjIDAuMjY2IDAgMC41MzEgLTAuMTAxIDAuNzM1IC0wLjMwNCBMIDEwIDExLjQ2OSBsIDcuMDggNy4wODEgYyAwLjIwMyAwLjIwMyAwLjQ2OSAwLjMwNCAwLjczNSAwLjMwNCBjIDAuMjY3IDAgMC41MzIgLTAuMTAxIDAuNzM1IC0wLjMwNCBjIDAuNDA2IC0wLjQwNiAwLjQwNiAtMS4wNjQgMCAtMS40NjkgTCAxMS40NjkgMTAgWicpO1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKHN2Zyk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24ub25jbGljayA9IHNlbGYuaGlkZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9vbGJhckVsZW0uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyVG9vbGJhciA9IGZ1bmN0aW9uIChuYXYpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJEZWZhdWx0QnV0dG9ucygpO1xyXG4gICAgICAgICAgICBuYXYuYXBwZW5kQ2hpbGQodGhpcy50b29sYmFyRWxlbSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRCdXR0b25Ub1Rvb2xiYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCB0b29sYmFyQnV0dG9uID0gbmV3IHNlbGYudG9vbGJhckJ1dHRvbigpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpdiB0aGF0IGhvbGRzIHNvdXJjZSBlbGVtXHJcbiAgICAgKi9cclxuICAgIHRoaXMubWVkaWFIb2xkZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5ob2xkZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1tZWRpYS1ob2xkZXInXSk7XHJcblxyXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDEwMDApIHtcclxuICAgICAgICAgICAgdGhpcy5ob2xkZXIuc3R5bGUud2lkdGggPSAod2luZG93LmlubmVyV2lkdGggLSAwLjEgKiB3aW5kb3cuaW5uZXJXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgICAgICB0aGlzLmhvbGRlci5zdHlsZS5oZWlnaHQgPSAod2luZG93LmlubmVySGVpZ2h0IC0gMC4xICogd2luZG93LmlubmVySGVpZ2h0KSArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ob2xkZXIuc3R5bGUud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIHRoaXMuaG9sZGVyLnN0eWxlLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCArICdweCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbmRlckhvbGRlciA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuaG9sZGVyKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gb2JqZWN0IHdpdGggc3RhZ2Ugc291cmNlcyBpbmRleGVzIGRlcGVuZGluZyBvbiBwcm92aWRlZCBzbGlkZVxyXG4gICAgICogQHBhcmFtIHNsaWRlXHJcbiAgICAgKiBAcmV0dXJucyB7e3ByZXZpb3VzOiBudW1iZXIsIGN1cnJlbnQ6IG51bWJlciwgbmV4dDogbnVtYmVyfX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5nZXRTb3VyY2VzSW5kZXhlcyA9IHtcclxuXHJcbiAgICAgICAgcHJldmlvdXM6IGZ1bmN0aW9uIChzbGlkZSkge1xyXG4gICAgICAgICAgICBsZXQgcHJldmlvdXNTbGlkZUluZGV4O1xyXG4gICAgICAgICAgICBjb25zdCBhcnJheUluZGV4ID0gc2xpZGUgLSAxO1xyXG5cclxuICAgICAgICAgICAgLy8gcHJldmlvdXNcclxuICAgICAgICAgICAgaWYgKGFycmF5SW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzU2xpZGVJbmRleCA9IHNlbGYuZGF0YS50b3RhbF9zbGlkZXMgLSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNTbGlkZUluZGV4ID0gYXJyYXlJbmRleCAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1NsaWRlSW5kZXg7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uIChzbGlkZSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IG5leHRTbGlkZUluZGV4O1xyXG4gICAgICAgICAgICBjb25zdCBhcnJheUluZGV4ID0gc2xpZGUgLSAxO1xyXG5cclxuICAgICAgICAgICAgLy9uZXh0XHJcbiAgICAgICAgICAgIGlmIChzbGlkZSA9PT0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlcykge1xyXG4gICAgICAgICAgICAgICAgbmV4dFNsaWRlSW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV4dFNsaWRlSW5kZXggPSBhcnJheUluZGV4ICsgMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5leHRTbGlkZUluZGV4O1xyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICBhbGw6IGZ1bmN0aW9uIChzbGlkZSkge1xyXG4gICAgICAgICAgICAvLyBzb3VyY2VzIGFyZSBzdG9yZWQgaW4gYXJyYXkgaW5kZXhlZCBmcm9tIDBcclxuICAgICAgICAgICAgY29uc3QgYXJyYXlJbmRleCA9IHNsaWRlIC0gMTtcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlc0luZGV4ZXMgPSB7XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91czogMCxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IDAsXHJcbiAgICAgICAgICAgICAgICBuZXh0OiAwXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBwcmV2aW91c1xyXG4gICAgICAgICAgICBpZiAoYXJyYXlJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc291cmNlc0luZGV4ZXMucHJldmlvdXMgPSBzZWxmLmRhdGEudG90YWxfc2xpZGVzIC0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzLnByZXZpb3VzID0gYXJyYXlJbmRleCAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGN1cnJlbnRcclxuICAgICAgICAgICAgc291cmNlc0luZGV4ZXMuY3VycmVudCA9IGFycmF5SW5kZXg7XHJcblxyXG4gICAgICAgICAgICAvL25leHRcclxuICAgICAgICAgICAgaWYgKHNsaWRlID09PSBzZWxmLmRhdGEudG90YWxfc2xpZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzSW5kZXhlcy5uZXh0ID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzLm5leHQgPSBhcnJheUluZGV4ICsgMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZXNJbmRleGVzO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGlzLnRyYW5zZm9ybXMgPSB7XHJcblxyXG4gICAgICAgIHRyYW5zZm9ybU1pbnVzOiBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICBlbGVtLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArICgtc2VsZi5kYXRhLnNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aCkgKyAncHgsMCknO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRyYW5zZm9ybU51bGw6IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgICAgIGVsZW0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgwLDApJztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0cmFuc2Zvcm1QbHVzOiBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICBlbGVtLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIHNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGggKyAncHgsMCknO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuc3RvcFZpZGVvcyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgY29uc3QgdmlkZW9zID0gc2VsZi5kYXRhLnZpZGVvcztcclxuXHJcbiAgICAgICAgLy8gdHJ1ZSBpcyBodG1sNSB2aWRlbywgZmFsc2UgaXMgeW91dHViZSB2aWRlb1xyXG4gICAgICAgIGZvciAobGV0IHZpZGVvSW5kZXggaW4gdmlkZW9zKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodmlkZW9zW3ZpZGVvSW5kZXhdID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNlbGYuZGF0YS5zb3VyY2VzW3ZpZGVvSW5kZXhdLmZpcnN0Q2hpbGQucGF1c2UgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEuc291cmNlc1t2aWRlb0luZGV4XS5maXJzdENoaWxkLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEuc291cmNlc1t2aWRlb0luZGV4XS5maXJzdENoaWxkLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoJ3tcImV2ZW50XCI6XCJjb21tYW5kXCIsXCJmdW5jXCI6XCJzdG9wVmlkZW9cIixcImFyZ3NcIjpcIlwifScsICcqJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWV0aG9kcyB0aGF0IGFwcGVuZHMgc291cmNlcyB0byBtZWRpYUhvbGRlciBkZXBlbmRpbmcgb24gYWN0aW9uXHJcbiAgICAgKiBAdHlwZSB7e2luaXRpYWxBcHBlbmQsIHByZXZpb3VzQXBwZW5kLCBuZXh0QXBwZW5kfXwqfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmFwcGVuZE1ldGhvZHMgPSByZXF1aXJlKCcuL2FwcGVuZFNvdXJjZScpO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3BsYXkgc291cmNlIChpbWFnZXMsIEhUTUw1IHZpZGVvLCBZb3VUdWJlIHZpZGVvKSBkZXBlbmRpbmcgb24gZ2l2ZW4gdXJsIGZyb20gdXNlclxyXG4gICAgICogT3IgaWYgZGlzcGxheSBpcyBpbml0aWFsIGRpc3BsYXkgMyBpbml0aWFsIHNvdXJjZXNcclxuICAgICAqIElmIHRoZXJlIGFyZSA+PSAzIGluaXRpYWwgc291cmNlcyB0aGVyZSB3aWxsIGJlIGFsd2F5cyAzIGluIHN0YWdlXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKiBAcGFyYW0gdHlwZU9mTG9hZFxyXG4gICAgICogQHJldHVybnMge21vZHVsZS5leHBvcnRzfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmxvYWRzb3VyY2VzID0gZnVuY3Rpb24gKHR5cGVPZkxvYWQsIHNsaWRlKSB7XHJcbiAgICAgICAgY29uc3QgbG9hZHNvdXJjZW1vZHVsZSA9IHJlcXVpcmUoXCIuL2xvYWRTb3VyY2UuanNcIik7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBsb2Fkc291cmNlbW9kdWxlKHNlbGYsIERPTU9iamVjdCwgdHlwZU9mTG9hZCwgc2xpZGUpO1xyXG4gICAgfTtcclxufVxyXG47XHJcblxyXG5cclxuIWZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBhID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKTtcclxuXHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgIGFbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHVybHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc3QgZ2FsbGVyeSA9IGFbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWZzbGlnaHRib3gnKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYS5sZW5ndGg7IGorKykge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBhW2pdLmdldEF0dHJpYnV0ZSgnZGF0YS1mc2xpZ2h0Ym94Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5hbWUgPT09IGdhbGxlcnkpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmxzLnB1c2goYVtqXS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZzTGlnaHRib3ggPSBuZXcgZnNMaWdodGJveE9iamVjdCgpO1xyXG4gICAgICAgICAgICBmc0xpZ2h0Ym94LmRhdGEudXJscyA9IHVybHM7XHJcbiAgICAgICAgICAgIGZzTGlnaHRib3guZGF0YS50b3RhbF9zbGlkZXMgPSB1cmxzLmxlbmd0aDtcclxuICAgICAgICAgICAgZnNMaWdodGJveC5pbml0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0oZG9jdW1lbnQsIHdpbmRvdyk7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlbGYsIERPTU9iamVjdCwgdHlwZU9mTG9hZCwgc2xpZGUpIHtcclxuXHJcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XHJcbiAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IHNlbGYuZ2V0U291cmNlc0luZGV4ZXMuYWxsKHNsaWRlKTtcclxuICAgIGNvbnN0IHVybHMgPSBzZWxmLmRhdGEudXJscztcclxuICAgIGNvbnN0IHNvdXJjZXMgPSBzZWxmLmRhdGEuc291cmNlcztcclxuICAgIGxldCB0ZW1wU291cmNlcyA9IHt9O1xyXG5cclxuICAgIGxldCBzb3VyY2VEaW1lbnNpb25zID0gZnVuY3Rpb24gKHNvdXJjZUVsZW0sIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQpIHtcclxuXHJcbiAgICAgICAgY29uc3QgY29lZmZpY2llbnQgPSBzb3VyY2VXaWR0aCAvIHNvdXJjZUhlaWdodDtcclxuICAgICAgICBjb25zdCBkZXZpY2VXaWR0aCA9IHBhcnNlSW50KHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuc3R5bGUud2lkdGgpO1xyXG4gICAgICAgIGNvbnN0IGRldmljZUhlaWdodCA9IHBhcnNlSW50KHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuc3R5bGUuaGVpZ2h0KTtcclxuICAgICAgICBsZXQgbmV3SGVpZ2h0ID0gZGV2aWNlV2lkdGggLyBjb2VmZmljaWVudDtcclxuICAgICAgICBpZiAobmV3SGVpZ2h0IDwgZGV2aWNlSGVpZ2h0IC0gNjApIHtcclxuICAgICAgICAgICAgc291cmNlRWxlbS5zdHlsZS5oZWlnaHQgPSBuZXdIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIHNvdXJjZUVsZW0uc3R5bGUud2lkdGggPSBkZXZpY2VXaWR0aCArIFwicHhcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdIZWlnaHQgPSBkZXZpY2VIZWlnaHQgLSA2MDtcclxuICAgICAgICAgICAgc291cmNlRWxlbS5zdHlsZS5oZWlnaHQgPSBuZXdIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIHNvdXJjZUVsZW0uc3R5bGUud2lkdGggPSBuZXdIZWlnaHQgKiBjb2VmZmljaWVudCArIFwicHhcIjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZCBmYWRlIGluIGNsYXNzIGFuZCBkaW1lbnNpb24gZnVuY3Rpb25cclxuICAgICAqL1xyXG4gICAgbGV0IG9ubG9hZExpc3RlbmVyID0gZnVuY3Rpb24gKHNvdXJjZUVsZW0sIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQsIGFycmF5SW5kZXgpIHtcclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZUhvbGRlciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNvdXJjZS1ob2xkZXInXSk7XHJcblxyXG4gICAgICAgIC8vbm9ybWFsIHNvdXJjZSBkaW1lbnNpb25zIG5lZWRzIHRvIGJlIHN0b3JlZCBpbiBhcnJheVxyXG4gICAgICAgIC8vaXQgd2lsbCBiZSBuZWVkZWQgd2hlbiByZXNpemluZyBhIHNvdXJjZVxyXG4gICAgICAgIHNlbGYuZGF0YS5yZW1lbWJlcmVkU291cmNlc0RpbWVuc2lvbnNbYXJyYXlJbmRleF0gPSB7XHJcbiAgICAgICAgICAgIFwid2lkdGhcIjogc291cmNlV2lkdGgsXHJcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IHNvdXJjZUhlaWdodFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIHNldCBkaW1lbnNpb25zIGZvciB0aGUgMXN0IHRpbWVcclxuICAgICAgICBzb3VyY2VEaW1lbnNpb25zKHNvdXJjZUVsZW0sIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQpO1xyXG5cclxuICAgICAgICBzb3VyY2VIb2xkZXIuYXBwZW5kQ2hpbGQoc291cmNlRWxlbSk7XHJcbiAgICAgICAgY29uc3QgcHJldmlvdXNTb3VyY2UgPSBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXTtcclxuICAgICAgICBjb25zdCBjdXJyZW50U291cmNlID0gc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XTtcclxuICAgICAgICBjb25zdCBuZXh0U291cmNlID0gc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XTtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0eXBlT2ZMb2FkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2luaXRpYWwnOlxyXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRvIHRlbXAgYXJyYXkgYmVjYXVzZSBsb2FkaW5nIGlzIGFzeW5jaHJvbm91cyBzbyB3ZSBjYW4ndCBkZXBlbmQgb24gbG9hZCBvcmRlclxyXG4gICAgICAgICAgICAgICAgdGVtcFNvdXJjZXNbYXJyYXlJbmRleF0gPSBzb3VyY2VIb2xkZXI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wU291cmNlc0xlbmd0aCA9IE9iamVjdC5rZXlzKHRlbXBTb3VyY2VzKS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGFwcGVuZHMgPSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZFByZXZpb3VzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzU291cmNlLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1NvdXJjZS5hcHBlbmRDaGlsZCh0ZW1wU291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10uZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzU291cmNlLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1mYWRlLWluJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwZW5kQ3VycmVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlLmFwcGVuZENoaWxkKHRlbXBTb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2b2lkIGN1cnJlbnRTb3VyY2UuZmlyc3RDaGlsZC5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNvdXJjZS5maXJzdENoaWxkLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZE5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNvdXJjZS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNvdXJjZS5hcHBlbmRDaGlsZCh0ZW1wU291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XS5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNvdXJjZS5maXJzdENoaWxkLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodXJscy5sZW5ndGggPj0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFwcGVuZCBzb3VyY2VzIG9ubHkgaWYgYWxsIHN0YWdlIHNvdXJjZXMgYXJlIGxvYWRlZFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRlbXBTb3VyY2VzTGVuZ3RoID49IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwZW5kcy5hcHBlbmRQcmV2aW91cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBlbmRzLmFwcGVuZEN1cnJlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwZW5kcy5hcHBlbmROZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZih1cmxzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRlbXBTb3VyY2VzTGVuZ3RoID49IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwZW5kcy5hcHBlbmRQcmV2aW91cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBlbmRzLmFwcGVuZEN1cnJlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodXJscy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHBlbmRzLmFwcGVuZEN1cnJlbnQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICduZXh0JzpcclxuICAgICAgICAgICAgICAgIC8vIHJlcGxhY2UgbG9hZGVyIHdpdGggbG9hZGVkIHNvdXJjZVxyXG4gICAgICAgICAgICAgICAgbmV4dFNvdXJjZS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgIG5leHRTb3VyY2UuYXBwZW5kQ2hpbGQoc291cmNlRWxlbSk7XHJcbiAgICAgICAgICAgICAgICB2b2lkIGN1cnJlbnRTb3VyY2UuZmlyc3RDaGlsZC5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgIG5leHRTb3VyY2UuZmlyc3RDaGlsZC5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LWZhZGUtaW4nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwcmV2aW91cyc6XHJcbiAgICAgICAgICAgICAgICAvLyByZXBsYWNlIGxvYWRlciB3aXRoIGxvYWRlZCBzb3VyY2VcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzU291cmNlLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNTb3VyY2UuYXBwZW5kQ2hpbGQoc291cmNlRWxlbSk7XHJcbiAgICAgICAgICAgICAgICB2b2lkIGN1cnJlbnRTb3VyY2UuZmlyc3RDaGlsZC5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzU291cmNlLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1mYWRlLWluJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGlzLmxvYWRZb3V0dWJldmlkZW8gPSBmdW5jdGlvbiAodmlkZW9JZCwgYXJyYXlJbmRleCkge1xyXG4gICAgICAgIGxldCBpZnJhbWUgPSBuZXcgRE9NT2JqZWN0KCdpZnJhbWUnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zaW5nbGUtc291cmNlJ10pO1xyXG4gICAgICAgIGlmcmFtZS5zcmMgPSAnLy93d3cueW91dHViZS5jb20vZW1iZWQvJyArIHZpZGVvSWQgKyAnP2VuYWJsZWpzYXBpPTEnO1xyXG4gICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FsbG93ZnVsbHNjcmVlbicsICcnKTtcclxuICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdmcmFtZWJvcmRlcicsICcwJyk7XHJcbiAgICAgICAgaWZyYW1lLm9ubW91c2V1cCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2phcGllcmRvZWwnKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcclxuICAgICAgICBvbmxvYWRMaXN0ZW5lcihpZnJhbWUsIDE5MjAsIDEwODAsIGFycmF5SW5kZXgpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5pbWFnZUxvYWQgPSBmdW5jdGlvbiAoc3JjLCBhcnJheUluZGV4KSB7XHJcbiAgICAgICAgbGV0IHNvdXJjZUVsZW0gPSBuZXcgRE9NT2JqZWN0KCdpbWcnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zaW5nbGUtc291cmNlJ10pO1xyXG4gICAgICAgIHNvdXJjZUVsZW0uc3JjID0gc3JjO1xyXG4gICAgICAgIHNvdXJjZUVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb25sb2FkTGlzdGVuZXIoc291cmNlRWxlbSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIGFycmF5SW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy52aWRlb0xvYWQgPSBmdW5jdGlvbiAoc3JjLCBhcnJheUluZGV4KSB7XHJcbiAgICAgICAgbGV0IHZpZGVvRWxlbSA9IG5ldyBET01PYmplY3QoJ3ZpZGVvJykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2luZ2xlLXNvdXJjZSddKTtcclxuICAgICAgICBsZXQgc291cmNlID0gbmV3IERPTU9iamVjdCgnc291cmNlJykuZWxlbTtcclxuICAgICAgICBzb3VyY2Uuc3JjID0gc3JjO1xyXG4gICAgICAgIHZpZGVvRWxlbS5pbm5lclRleHQgPSAnU29ycnksIHlvdXIgYnJvd3NlciBkb2VzblxcJ3Qgc3VwcG9ydCBlbWJlZGRlZCB2aWRlb3MsIDxhXFxuJyArXHJcbiAgICAgICAgICAgICcgICAgICAgICAgICBocmVmPVwiaHR0cDovL2Rvd25sb2FkLmJsZW5kZXIub3JnL3BlYWNoL2JpZ2J1Y2tidW5ueV9tb3ZpZXMvQmlnQnVja0J1bm55XzMyMHgxODAubXA0XCI+ZG93bmxvYWQ8L2E+IGFuZCB3YXRjaFxcbicgK1xyXG4gICAgICAgICAgICAnICAgICAgICB3aXRoIHlvdXIgZmF2b3JpdGUgdmlkZW8gcGxheWVyISc7XHJcblxyXG4gICAgICAgIHZpZGVvRWxlbS5zZXRBdHRyaWJ1dGUoJ2NvbnRyb2xzJywgJycpO1xyXG4gICAgICAgIHZpZGVvRWxlbS5hcHBlbmRDaGlsZChzb3VyY2UpO1xyXG4gICAgICAgIHZpZGVvRWxlbS5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb25sb2FkTGlzdGVuZXIodmlkZW9FbGVtLCB0aGlzLnZpZGVvV2lkdGgsIHRoaXMudmlkZW9IZWlnaHQsIGFycmF5SW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmludmFsaWRGaWxlID0gZnVuY3Rpb24gKGFycmF5SW5kZXgpIHtcclxuICAgICAgICBsZXQgaW52YWxpZEZpbGVXcmFwcGVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtaW52YWxpZC1maWxlLXdyYXBwZXInXSk7XHJcbiAgICAgICAgaW52YWxpZEZpbGVXcmFwcGVyLmlubmVySFRNTCA9ICdJbnZhbGlkIGZpbGUnO1xyXG5cclxuICAgICAgICBvbmxvYWRMaXN0ZW5lcihpbnZhbGlkRmlsZVdyYXBwZXIsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQsIGFycmF5SW5kZXgpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtID0gZnVuY3Rpb24gKHNvdXJjZVVybCkge1xyXG4gICAgICAgIGNvbnN0IHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICBjb25zdCBpbmRleE9mU291cmNlID0gc2VsZi5kYXRhLnVybHMuaW5kZXhPZihzb3VyY2VVcmwpO1xyXG5cclxuICAgICAgICBwYXJzZXIuaHJlZiA9IHNvdXJjZVVybDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0SWQoc291cmNlVXJsKSB7XHJcbiAgICAgICAgICAgIGxldCByZWdFeHAgPSAvXi4qKHlvdXR1LmJlXFwvfHZcXC98dVxcL1xcd1xcL3xlbWJlZFxcL3x3YXRjaFxcP3Y9fFxcJnY9KShbXiNcXCZcXD9dKikuKi87XHJcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IHNvdXJjZVVybC5tYXRjaChyZWdFeHApO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1hdGNoICYmIG1hdGNoWzJdLmxlbmd0aCA9PSAxMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoWzJdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdlcnJvcic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXJzZXIuaG9zdG5hbWUgPT09ICd3d3cueW91dHViZS5jb20nKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS52aWRlb3NbaW5kZXhPZlNvdXJjZV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkWW91dHViZXZpZGVvKGdldElkKHNvdXJjZVVybCksIGluZGV4T2ZTb3VyY2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB4aHIub25sb2Fkc3RhcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gXCJibG9iXCI7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGVjayB3aGF0IHR5cGUgb2YgZmlsZSBwcm92aWRlZCBmcm9tIGxpbmtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlVHlwZSA9IHhoci5yZXNwb25zZS50eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZVR5cGUuaW5kZXhPZignLycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUuc2xpY2UoMCwgcmVzcG9uc2VUeXBlLmluZGV4T2YoJy8nKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2VUeXBlID09PSAnaW1hZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbWFnZUxvYWQoVVJMLmNyZWF0ZU9iamVjdFVSTCh4aHIucmVzcG9uc2UpLCBpbmRleE9mU291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmVzcG9uc2VUeXBlID09PSAndmlkZW8nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy52aWRlb0xvYWQoVVJMLmNyZWF0ZU9iamVjdFVSTCh4aHIucmVzcG9uc2UpLCBpbmRleE9mU291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YS52aWRlb3NbaW5kZXhPZlNvdXJjZV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmludmFsaWRGaWxlKGluZGV4T2ZTb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgeGhyLm9wZW4oJ2dldCcsIHNvdXJjZVVybCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHhoci5zZW5kKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIHN3aXRjaCAodHlwZU9mTG9hZCkge1xyXG4gICAgICAgIGNhc2UgJ2luaXRpYWwnOlxyXG4gICAgICAgICAgICAvL2FwcGVuZCBsb2FkZXIgd2hlbiBsb2FkaW5nIGluaXRpYWxseVxyXG4gICAgICAgICAgICBzZWxmLmFwcGVuZE1ldGhvZHMucmVuZGVySG9sZGVySW5pdGlhbChzZWxmLHNsaWRlLERPTU9iamVjdCk7XHJcblxyXG4gICAgICAgICAgICBpZih1cmxzLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0odXJsc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHVybHMubGVuZ3RoID49IDIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbSh1cmxzW3NvdXJjZXNJbmRleGVzLm5leHRdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodXJscy5sZW5ndGggPj0gMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHVybHNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlICdwcmV2aW91cyc6XHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCBsb2FkZXIgd2hlbiBsb2FkaW5nIGEgbmV4dCBzb3VyY2VcclxuICAgICAgICAgICAgc2VsZi5hcHBlbmRNZXRob2RzLnJlbmRlckhvbGRlclByZXZpb3VzKHNlbGYsIHNsaWRlLCBET01PYmplY3QpO1xyXG5cclxuICAgICAgICAgICAgLy8gbG9hZCBwcmV2aW91cyBzb3VyY2VcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHVybHNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ25leHQnOlxyXG4gICAgICAgICAgICAvLyBhcHBlbmQgbG9hZGVyIHdoZW4gbG9hZGluZyBhIG5leHQgc291cmNlXHJcbiAgICAgICAgICAgIHNlbGYuYXBwZW5kTWV0aG9kcy5yZW5kZXJIb2xkZXJOZXh0KHNlbGYsIHNsaWRlLCBET01PYmplY3QpO1xyXG5cclxuICAgICAgICAgICAgLy9sb2FkIG5leHQgc291cmNlXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbSh1cmxzW3NvdXJjZXNJbmRleGVzLm5leHRdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZiwgRE9NT2JqZWN0KSB7XHJcbiAgICBsZXQgcHJpdmF0ZU1ldGhvZHMgPSB7XHJcbiAgICAgICAgcmVuZGVyTmF2OiBmdW5jdGlvbiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5uYXYgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1uYXYnXSk7XHJcbiAgICAgICAgICAgIG5ldyBzZWxmLnRvb2xiYXIoKS5yZW5kZXJUb29sYmFyKHNlbGYuZGF0YS5uYXYpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZUNvdW50ZXIgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIG5ldyBzZWxmLnNsaWRlQ291bnRlckVsZW0oKS5yZW5kZXJTbGlkZUNvdW50ZXIoc2VsZi5kYXRhLm5hdik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxmLmRhdGEubmF2KTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXJTbGlkZUJ1dHRvbnM6IGZ1bmN0aW9uIChjb250YWluZXIpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZUJ1dHRvbnMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vcmVuZGVyIGxlZnQgYnRuXHJcbiAgICAgICAgICAgIGxldCBsZWZ0X2J0bl9jb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4tY29udGFpbmVyJywnZnNsaWdodGJveC1zbGlkZS1idG4tbGVmdC1jb250YWluZXInXSk7XHJcbiAgICAgICAgICAgIGxldCBidG4gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4nLCAnYnV0dG9uLXN0eWxlJ10pO1xyXG4gICAgICAgICAgICBidG4uYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBuZXcgc2VsZi5TVkdJY29uKCkuZ2V0U1ZHSWNvbignTTguMzg4LDEwLjA0OWw0Ljc2LTQuODczYzAuMzAzLTAuMzEsMC4yOTctMC44MDQtMC4wMTItMS4xMDVjLTAuMzA5LTAuMzA0LTAuODAzLTAuMjkzLTEuMTA1LDAuMDEyTDYuNzI2LDkuNTE2Yy0wLjMwMywwLjMxLTAuMjk2LDAuODA1LDAuMDEyLDEuMTA1bDUuNDMzLDUuMzA3YzAuMTUyLDAuMTQ4LDAuMzUsMC4yMjMsMC41NDcsMC4yMjNjMC4yMDMsMCwwLjQwNi0wLjA4LDAuNTU5LTAuMjM2YzAuMzAzLTAuMzA5LDAuMjk1LTAuODAzLTAuMDEyLTEuMTA0TDguMzg4LDEwLjA0OXonKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGVmdF9idG5fY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vZ28gdG8gcHJldmlvdXMgc2xpZGUgb25jbGlja1xyXG4gICAgICAgICAgICBsZWZ0X2J0bl9jb250YWluZXIub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuYXBwZW5kTWV0aG9kcy5wcmV2aW91c1NsaWRlVmlhQnV0dG9uKHNlbGYsc2VsZi5kYXRhLnNsaWRlKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxlZnRfYnRuX2NvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgICAgICAgICBsZXQgcmlnaHRfYnRuX2NvbnRhaW5lciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLWJ0bi1jb250YWluZXInLCAnZnNsaWdodGJveC1zbGlkZS1idG4tcmlnaHQtY29udGFpbmVyJ10pO1xyXG4gICAgICAgICAgICBidG4gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4nLCAnYnV0dG9uLXN0eWxlJ10pO1xyXG4gICAgICAgICAgICBidG4uYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBuZXcgc2VsZi5TVkdJY29uKCkuZ2V0U1ZHSWNvbignTTExLjYxMSwxMC4wNDlsLTQuNzYtNC44NzNjLTAuMzAzLTAuMzEtMC4yOTctMC44MDQsMC4wMTItMS4xMDVjMC4zMDktMC4zMDQsMC44MDMtMC4yOTMsMS4xMDUsMC4wMTJsNS4zMDYsNS40MzNjMC4zMDQsMC4zMSwwLjI5NiwwLjgwNS0wLjAxMiwxLjEwNUw3LjgzLDE1LjkyOGMtMC4xNTIsMC4xNDgtMC4zNSwwLjIyMy0wLjU0NywwLjIyM2MtMC4yMDMsMC0wLjQwNi0wLjA4LTAuNTU5LTAuMjM2Yy0wLjMwMy0wLjMwOS0wLjI5NS0wLjgwMywwLjAxMi0xLjEwNEwxMS42MTEsMTAuMDQ5eicpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvL2dvIHRvIG5leHQgc2xpZGUgb25jbGlja1xyXG4gICAgICAgICAgICByaWdodF9idG5fY29udGFpbmVyLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFwcGVuZE1ldGhvZHMubmV4dFNsaWRlVmlhQnV0dG9uKHNlbGYsc2VsZi5kYXRhLnNsaWRlKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmlnaHRfYnRuX2NvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmlnaHRfYnRuX2NvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL2Rpc2FibGUgc2Nyb2xsaW5nIGFuZCBhZGQgZml4IGZvciBqdW1waW5nIHNpdGUgaWYgbm90IG1vYmlsZVxyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LW9wZW4nKTtcclxuICAgIGlmKCFzZWxmLmRhdGEuaXNNb2JpbGUpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtc2Nyb2xsYmFyZml4Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9jcmVhdGUgY29udGFpbmVyXHJcbiAgICBzZWxmLmRhdGEuZWxlbWVudCA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LWNvbnRhaW5lciddKTtcclxuICAgIHNlbGYuZGF0YS5lbGVtZW50LmlkID0gXCJmc2xpZ2h0Ym94LWNvbnRhaW5lclwiO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWxmLmRhdGEuZWxlbWVudCk7XHJcblxyXG4gICAgLy9yZW5kZXIgc2xpZGUgYnV0dG9ucyBhbmQgbmF2KHRvb2xiYXIpXHJcbiAgICBwcml2YXRlTWV0aG9kcy5yZW5kZXJOYXYoc2VsZi5kYXRhLmVsZW1lbnQpO1xyXG5cclxuICAgIGlmKHNlbGYuZGF0YS50b3RhbF9zbGlkZXMgPiAxKSB7XHJcbiAgICAgICAgcHJpdmF0ZU1ldGhvZHMucmVuZGVyU2xpZGVCdXR0b25zKHNlbGYuZGF0YS5lbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIgPSBuZXcgc2VsZi5tZWRpYUhvbGRlcigpO1xyXG4gICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLnJlbmRlckhvbGRlcihzZWxmLmRhdGEuZWxlbWVudCk7XHJcbiAgICBzZWxmLmRhdGEuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFsnZnNsaWdodGJveC1mYWRlLWluLWFuaW1hdGlvbiddKTtcclxuXHJcbiAgICBzZWxmLmRhdGEuaXNmaXJzdFRpbWVMb2FkID0gdHJ1ZTtcclxuICAgIHNlbGYubG9hZHNvdXJjZXMoJ2luaXRpYWwnLCBzZWxmLmRhdGEuc2xpZGUpO1xyXG59OyJdfQ==
