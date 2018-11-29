(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {

    initialAppend: function (self) {

        let count = 0;
        for (let source in self.data.sources) {
            if (source) {
                count++;
            }
        }

        if (count !== 3) {
            return;
        }

        if (count === 3) {

            //index of the current element stored in memory is just decremented slide number
            let arrayIndex = self.data.slide - 1;
            let lastArrayIndex = self.data.urls.length - 1;
            const sources = self.data.sources;
            const stageSources = self.data.stageSources;

            //previous source
            if (arrayIndex === 0) {
                stageSources.previousSource = sources[lastArrayIndex];
            } else {
                stageSources.previousSource = sources[arrayIndex - 1];
            }


            //current source
            stageSources.currentSource = sources[arrayIndex];

            //next source
            if (arrayIndex === lastArrayIndex) {
                stageSources.nextSource = 0;
            } else {
                stageSources.nextSource = sources[arrayIndex + 1];
            }


            stageSources.previousSource.style.transform = 'translate(' + -self.data.slideDistance * window.innerWidth + 'px,0)';
            stageSources.nextSource.style.transform = 'translate(' + self.data.slideDistance * window.innerWidth + 'px,0)';
            for (let source in stageSources) {
                self.data.mediaHolder.holder.appendChild(stageSources[source]);
            }
        }
    },


    /**
     * Loading after transition should be called first
     * but if source won't load till that this method will notice that
     * @param self
     * @param slide
     */
    useAppendMethod: function (self, slide) {
        const slideLoad = self.data.slideLoad;
        if (!slideLoad.loaded[slide] || !slideLoad.isCallingAppend[slide]) {
            return false;
        }
        slideLoad.loaded[slide] = false;
        slideLoad.isCallingAppend[slide] = false;

        return true;
    },


    /**
     * Check if previous source append is needed and call if it is
     * @param self
     * @param slide
     */
    previousAppend: function (self, slide) {
        if (!this.useAppendMethod(self, slide)) {
            return;
        }

        this.previousSourceChangeStage(self, slide);
    },


    /**
     * This method changes stage sources after sliding to previous source
     * @param self
     */
    previousSourceChangeStage: function (self) {

        const mediaHolder = self.data.mediaHolder.holder;
        const stageSources = self.data.stageSources;

        mediaHolder.removeChild(stageSources.nextSource);
        stageSources.nextSource = stageSources.currentSource;

        stageSources.currentSource = stageSources.previousSource;

        if (self.data.slide === 1) {
            stageSources.previousSource = self.data.sources[self.data.total_slides - 1];
        } else {
            stageSources.previousSource = self.data.sources[self.data.slide - 2];
        }
        mediaHolder.insertAdjacentElement('afterbegin', stageSources.previousSource);
    },


    /**
     * Check if next source append is needed and call if it is
     * @param self
     * @param slide
     */
    nextAppend: function (self, slide) {
        if (!this.useAppendMethod(self, slide)) {
            return;
        }

        this.nextSourceChangeStage(self, slide);
    },


    renderHolderNext: function (self, slide, DOMObject) {

        const stageSources = self.data.stageSources;

        let sourceHolder = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
        sourceHolder.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';

        self.data.mediaHolder.holder.removeChild(stageSources.previousSource);
        stageSources.previousSource = stageSources.currentSource;
        stageSources.currentSource = stageSources.nextSource;
        stageSources.nextSource = sourceHolder;
        stageSources.nextSource.style.transform = 'translate(' + self.data.slideDistance * window.innerWidth + 'px,0)';
        console.log(sourceHolder);
        self.data.mediaHolder.holder.appendChild(sourceHolder);
    },


    /**
     * This method change stage sources after sliding to next source
     * @param self
     */
    nextSourceChangeStage: function (self, slide) {
        const nextSource = self.data.sources[slide];
        const stageSources = self.data.stageSources;


        stageSources.nextSource.innerHTML = '';
        stageSources.nextSource.appendChild(nextSource.firstChild);
    },
};
},{}],2:[function(require,module,exports){
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
            "images/6.jpg",
        ],
        sources: [],
        rememberedSourcesDimensions: [],

        mediaHolder: {},
        stageSources: {
            "previousSource": {},
            "currentSource": {},
            "nextSource": {},
        },
        slideLoad: {
            appends: [],
            loaded: [],
            isCallingAppend: []
        },

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

        let space = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-slide-number']);
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


    this.slide = function () {

        this.previousSlideViaButton = function () {
            if (self.data.slide > 1) {
                self.data.updateSlideNumber(self.data.slide - 1);
            } else {
                self.data.updateSlideNumber(self.data.total_slides);
            }

            //load source by index (array is indexed from 0 so we need to decrement index)
            self.loadsource(self.data.urls[self.data.slide - 1]);
        };


        this.nextSlideViaButton = function () {
            if (self.data.slide < self.data.total_slides) {
                self.data.updateSlideNumber(self.data.slide + 1)
            } else {
                self.data.updateSlideNumber(self.data.total_slides);
            }

            //load source by index (array is indexed from 0 so we need to decrement index)
            self.loadsource(self.data.urls[self.data.slide - 1]);
            self.data.updateSlideNumber(self.data.slide);
        };
    };

    /**
     * Div that holds source elem
     */
    this.mediaHolder = function () {
        this.holder = new DOMObject('div').addClassesAndCreate(['fslightbox-media-holder']);
        this.holder.style.width =  window.innerWidth + 'px';
        this.holder.style.height = window.innerHeight + 'px';
        self.data.onResizeEvent.mediaHolderDimensions = function () {
            self.data.mediaHolder.holder.style.width = 3 * window.innerWidth + 'px';
        };
        this.renderHolder = function (container) {
            container.appendChild(this.holder);
        };
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
    let currentSlideArrayIndex = self.data.slide - 1;

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

        let sourceHolder = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);

        //normal source dimensions needs to be stored in array
        //it will be needed when loading source from memory
        self.data.rememberedSourcesDimensions[arrayIndex] = {
            "width": sourceWidth,
            "height": sourceHeight
        };

        //add some fade in animation
        sourceElem.classList.remove('fslightbox-fade-in');
        void sourceElem.offsetWidth;
        sourceElem.classList.add('fslightbox-fade-in');

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
        self.data.sources[arrayIndex] = sourceHolder;


        switch (typeOfLoad) {
            case 'initial':
                self.appendMethods.initialAppend(self);
                break;
            case 'next':
                self.data.slideLoad.loaded[slide] = true;
                self.data.slideLoad.appends[slide] = true;
                self.appendMethods.nextAppend(self, slide);
                break;
            case 'previous':
                self.data.slideLoad.loaded = true;
                self.data.slideLoad.loads[slide] = true;
                self.data.slideLoad.appends[slide] = true;
                self.appendMethods.previousAppend(self, slide);
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
        let videoElem = new DOMObject('video').addClassesAndCreate(['fslightbox-single-source', 'fslightbox-fade-in']);
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

                        if (responseType === 'video') {
                            _this.videoLoad(URL.createObjectURL(xhr.response), indexOfSource);
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
            // if we load initially we'll need to create all three stage sources
            this.createSourceElem(self.data.urls[currentSlideArrayIndex]);
            this.createSourceElem(self.data.urls[currentSlideArrayIndex + 1]);
            if (currentSlideArrayIndex === 0) {
                this.createSourceElem(self.data.urls[self.data.urls.length - 1]);
            } else {
                this.createSourceElem(currentSlideArrayIndex - 1);
            }
            break;

        case 'previous':
            // Array is indexed from 0 so previous source index will be slide number - 2

            // if slide number is 1
            // we'll be appending source from total_slides index not from slide number index - 2
            if (self.data.slide === 1) {


                // if source was previously appended load it from memory
                if (typeof self.data.sources[self.data.total_slides] !== "undefined") {
                    self.data.slideLoad.loaded = true;
                    self.data.slideLoad.loads[slide] = true;
                    self.appendMethods.previousAppend(self);
                } else {
                    this.createSourceElem(self.data.urls[self.data.total_slides - 1]);
                }

                break;
            }

            // if data was previously appended load it from memory
            else if (typeof self.data.sources[self.data.slide - 2] !== "undefined") {
                self.data.slideLoad.loaded = true;
                self.data.slideLoad.loads[slide] = true;
                self.appendMethods.previousAppend(self);
                break;
            }

            // if source wasn't previously appended we will need to create it
            this.createSourceElem(self.data.urls[self.data.slide - 2]);
            break;

        case 'next':
            // Array is indexed from 0 so next source index will be simply slide number

            // if slide number is equals total slide number
            // we'll be appending source from index 0 not from slide number index
            if (self.data.slide === self.data.total_slides) {

                // if source was previously appended load it from memory
                if (typeof self.data.sources[0] !== "undefined") {
                    self.data.slideLoad.loaded[slide] = true;
                    self.appendMethods.nextAppend(self);
                } else {
                    this.createSourceElem(self.data.urls[0]);
                }

                break;
            }

            // if data was previously appended load it from memory
            else if (typeof self.data.sources[self.data.slide] !== "undefined") {
                self.data.slideLoad.loaded[slide] = true;
                self.appendMethods.nextAppend(self);
                break;
            }


            //we'll render loader for load time of source
            self.appendMethods.renderHolderNext(self,slide, DOMObject);
            //if source wasn't previously appended we will need to create it
            this.createSourceElem(self.data.urls[self.data.slide]);
            break;
    }


    if(slide) {
        self.data.slideLoad.appends[slide] = false;
    }


    //if first time load add loader
    if (self.data.isFirstTimeLoad === true) {
        self.data.mediaHolder.holder.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
        self.data.isFirstTimeLoad = false;
    }


    /*


    //check if source was previously created and
    // create it if it wasn't or if it was load it from variable
    if (typeof self.data.sources[indexOfSourceURL] === "undefined") {
        this.createSourceElem();
    } else {
        console.log('loaded from memory');
        const sourceElem = self.data.sources[indexOfSourceURL];
        const rememberedSourceDimensions = self.data.rememberedSourcesDimensions[indexOfSourceURL];
        self.data.mediaHolder.holder.innerHTML = '';
        self.data.mediaHolder.holder.appendChild(sourceElem);
        console.log(sourceElem);

        self.data.onResizeEvent.sourceDimensions = function () {
            sourceDimensions(
                sourceElem,
                rememberedSourceDimensions.width,
                rememberedSourceDimensions.height
            );
        };
        self.data.onResizeEvent.sourceDimensions();
    }

    */
};
},{}],5:[function(require,module,exports){
module.exports = function (self, DOMObject) {
    let privateMethods = {
        renderNav: function (container) {
            self.data.nav = new DOMObject('div').addClassesAndCreate(['fslightbox-nav']);
            new self.toolbar().renderToolbar(self.data.nav);


            let xdbtn = new DOMObject('a').elem;
            xdbtn.innerHTML = 'hide';
            xdbtn.style.zIndex = '9999999';
            xdbtn.onclick = function () {
                console.log(self.data.sources[0]);
                self.data.mediaHolder.holder.innerHTML = '';

                // for(let source in self.data.sources) {
                self.data.mediaHolder.holder.appendChild(self.data.sources[0]);
                //    }
            };
            self.data.nav.appendChild(xdbtn);

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

            // slide object that contains changing slide methods
            let slide = new self.slide();

            //go to previous slide onclick
            left_btn_container.onclick = function () {
                slide.previousSlideViaButton();
            };

            left_btn_container.appendChild(btn);
            let right_btn_container = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn-container', 'fslightbox-slide-btn-right-container']);
            btn = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn', 'button-style']);
            btn.appendChild(
                new self.SVGIcon().getSVGIcon('M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z')
            );

            //go to next slide onclick
            right_btn_container.onclick = function () {
                slide.nextSlideViaButton();
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
    self.loadsources('initial');
};
},{}]},{},[3,5,4,1,2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwZW5kU291cmNlLmpzIiwic3JjL2pzL2NoYW5nZVNsaWRlQnlEcmFnZ2luZy5qcyIsInNyYy9qcy9pbmRleC5qcyIsInNyYy9qcy9sb2FkU291cmNlLmpzIiwic3JjL2pzL3JlbmRlckRPTS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgaW5pdGlhbEFwcGVuZDogZnVuY3Rpb24gKHNlbGYpIHtcclxuXHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBzb3VyY2UgaW4gc2VsZi5kYXRhLnNvdXJjZXMpIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvdW50ICE9PSAzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb3VudCA9PT0gMykge1xyXG5cclxuICAgICAgICAgICAgLy9pbmRleCBvZiB0aGUgY3VycmVudCBlbGVtZW50IHN0b3JlZCBpbiBtZW1vcnkgaXMganVzdCBkZWNyZW1lbnRlZCBzbGlkZSBudW1iZXJcclxuICAgICAgICAgICAgbGV0IGFycmF5SW5kZXggPSBzZWxmLmRhdGEuc2xpZGUgLSAxO1xyXG4gICAgICAgICAgICBsZXQgbGFzdEFycmF5SW5kZXggPSBzZWxmLmRhdGEudXJscy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VzID0gc2VsZi5kYXRhLnNvdXJjZXM7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YWdlU291cmNlcyA9IHNlbGYuZGF0YS5zdGFnZVNvdXJjZXM7XHJcblxyXG4gICAgICAgICAgICAvL3ByZXZpb3VzIHNvdXJjZVxyXG4gICAgICAgICAgICBpZiAoYXJyYXlJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc3RhZ2VTb3VyY2VzLnByZXZpb3VzU291cmNlID0gc291cmNlc1tsYXN0QXJyYXlJbmRleF07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGFnZVNvdXJjZXMucHJldmlvdXNTb3VyY2UgPSBzb3VyY2VzW2FycmF5SW5kZXggLSAxXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vY3VycmVudCBzb3VyY2VcclxuICAgICAgICAgICAgc3RhZ2VTb3VyY2VzLmN1cnJlbnRTb3VyY2UgPSBzb3VyY2VzW2FycmF5SW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgLy9uZXh0IHNvdXJjZVxyXG4gICAgICAgICAgICBpZiAoYXJyYXlJbmRleCA9PT0gbGFzdEFycmF5SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHN0YWdlU291cmNlcy5uZXh0U291cmNlID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0YWdlU291cmNlcy5uZXh0U291cmNlID0gc291cmNlc1thcnJheUluZGV4ICsgMV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBzdGFnZVNvdXJjZXMucHJldmlvdXNTb3VyY2Uuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgLXNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGggKyAncHgsMCknO1xyXG4gICAgICAgICAgICBzdGFnZVNvdXJjZXMubmV4dFNvdXJjZS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyBzZWxmLmRhdGEuc2xpZGVEaXN0YW5jZSAqIHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4LDApJztcclxuICAgICAgICAgICAgZm9yIChsZXQgc291cmNlIGluIHN0YWdlU291cmNlcykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5hcHBlbmRDaGlsZChzdGFnZVNvdXJjZXNbc291cmNlXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRpbmcgYWZ0ZXIgdHJhbnNpdGlvbiBzaG91bGQgYmUgY2FsbGVkIGZpcnN0XHJcbiAgICAgKiBidXQgaWYgc291cmNlIHdvbid0IGxvYWQgdGlsbCB0aGF0IHRoaXMgbWV0aG9kIHdpbGwgbm90aWNlIHRoYXRcclxuICAgICAqIEBwYXJhbSBzZWxmXHJcbiAgICAgKiBAcGFyYW0gc2xpZGVcclxuICAgICAqL1xyXG4gICAgdXNlQXBwZW5kTWV0aG9kOiBmdW5jdGlvbiAoc2VsZiwgc2xpZGUpIHtcclxuICAgICAgICBjb25zdCBzbGlkZUxvYWQgPSBzZWxmLmRhdGEuc2xpZGVMb2FkO1xyXG4gICAgICAgIGlmICghc2xpZGVMb2FkLmxvYWRlZFtzbGlkZV0gfHwgIXNsaWRlTG9hZC5pc0NhbGxpbmdBcHBlbmRbc2xpZGVdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2xpZGVMb2FkLmxvYWRlZFtzbGlkZV0gPSBmYWxzZTtcclxuICAgICAgICBzbGlkZUxvYWQuaXNDYWxsaW5nQXBwZW5kW3NsaWRlXSA9IGZhbHNlO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgcHJldmlvdXMgc291cmNlIGFwcGVuZCBpcyBuZWVkZWQgYW5kIGNhbGwgaWYgaXQgaXNcclxuICAgICAqIEBwYXJhbSBzZWxmXHJcbiAgICAgKiBAcGFyYW0gc2xpZGVcclxuICAgICAqL1xyXG4gICAgcHJldmlvdXNBcHBlbmQ6IGZ1bmN0aW9uIChzZWxmLCBzbGlkZSkge1xyXG4gICAgICAgIGlmICghdGhpcy51c2VBcHBlbmRNZXRob2Qoc2VsZiwgc2xpZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucHJldmlvdXNTb3VyY2VDaGFuZ2VTdGFnZShzZWxmLCBzbGlkZSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIGNoYW5nZXMgc3RhZ2Ugc291cmNlcyBhZnRlciBzbGlkaW5nIHRvIHByZXZpb3VzIHNvdXJjZVxyXG4gICAgICogQHBhcmFtIHNlbGZcclxuICAgICAqL1xyXG4gICAgcHJldmlvdXNTb3VyY2VDaGFuZ2VTdGFnZTogZnVuY3Rpb24gKHNlbGYpIHtcclxuXHJcbiAgICAgICAgY29uc3QgbWVkaWFIb2xkZXIgPSBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyO1xyXG4gICAgICAgIGNvbnN0IHN0YWdlU291cmNlcyA9IHNlbGYuZGF0YS5zdGFnZVNvdXJjZXM7XHJcblxyXG4gICAgICAgIG1lZGlhSG9sZGVyLnJlbW92ZUNoaWxkKHN0YWdlU291cmNlcy5uZXh0U291cmNlKTtcclxuICAgICAgICBzdGFnZVNvdXJjZXMubmV4dFNvdXJjZSA9IHN0YWdlU291cmNlcy5jdXJyZW50U291cmNlO1xyXG5cclxuICAgICAgICBzdGFnZVNvdXJjZXMuY3VycmVudFNvdXJjZSA9IHN0YWdlU291cmNlcy5wcmV2aW91c1NvdXJjZTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZSA9PT0gMSkge1xyXG4gICAgICAgICAgICBzdGFnZVNvdXJjZXMucHJldmlvdXNTb3VyY2UgPSBzZWxmLmRhdGEuc291cmNlc1tzZWxmLmRhdGEudG90YWxfc2xpZGVzIC0gMV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RhZ2VTb3VyY2VzLnByZXZpb3VzU291cmNlID0gc2VsZi5kYXRhLnNvdXJjZXNbc2VsZi5kYXRhLnNsaWRlIC0gMl07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lZGlhSG9sZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIHN0YWdlU291cmNlcy5wcmV2aW91c1NvdXJjZSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIG5leHQgc291cmNlIGFwcGVuZCBpcyBuZWVkZWQgYW5kIGNhbGwgaWYgaXQgaXNcclxuICAgICAqIEBwYXJhbSBzZWxmXHJcbiAgICAgKiBAcGFyYW0gc2xpZGVcclxuICAgICAqL1xyXG4gICAgbmV4dEFwcGVuZDogZnVuY3Rpb24gKHNlbGYsIHNsaWRlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnVzZUFwcGVuZE1ldGhvZChzZWxmLCBzbGlkZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5uZXh0U291cmNlQ2hhbmdlU3RhZ2Uoc2VsZiwgc2xpZGUpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgcmVuZGVySG9sZGVyTmV4dDogZnVuY3Rpb24gKHNlbGYsIHNsaWRlLCBET01PYmplY3QpIHtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RhZ2VTb3VyY2VzID0gc2VsZi5kYXRhLnN0YWdlU291cmNlcztcclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZUhvbGRlciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNvdXJjZS1ob2xkZXInXSk7XHJcbiAgICAgICAgc291cmNlSG9sZGVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwibGRzLXJpbmdcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2Pic7XHJcblxyXG4gICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIucmVtb3ZlQ2hpbGQoc3RhZ2VTb3VyY2VzLnByZXZpb3VzU291cmNlKTtcclxuICAgICAgICBzdGFnZVNvdXJjZXMucHJldmlvdXNTb3VyY2UgPSBzdGFnZVNvdXJjZXMuY3VycmVudFNvdXJjZTtcclxuICAgICAgICBzdGFnZVNvdXJjZXMuY3VycmVudFNvdXJjZSA9IHN0YWdlU291cmNlcy5uZXh0U291cmNlO1xyXG4gICAgICAgIHN0YWdlU291cmNlcy5uZXh0U291cmNlID0gc291cmNlSG9sZGVyO1xyXG4gICAgICAgIHN0YWdlU291cmNlcy5uZXh0U291cmNlLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIHNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGggKyAncHgsMCknO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHNvdXJjZUhvbGRlcik7XHJcbiAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5hcHBlbmRDaGlsZChzb3VyY2VIb2xkZXIpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBjaGFuZ2Ugc3RhZ2Ugc291cmNlcyBhZnRlciBzbGlkaW5nIHRvIG5leHQgc291cmNlXHJcbiAgICAgKiBAcGFyYW0gc2VsZlxyXG4gICAgICovXHJcbiAgICBuZXh0U291cmNlQ2hhbmdlU3RhZ2U6IGZ1bmN0aW9uIChzZWxmLCBzbGlkZSkge1xyXG4gICAgICAgIGNvbnN0IG5leHRTb3VyY2UgPSBzZWxmLmRhdGEuc291cmNlc1tzbGlkZV07XHJcbiAgICAgICAgY29uc3Qgc3RhZ2VTb3VyY2VzID0gc2VsZi5kYXRhLnN0YWdlU291cmNlcztcclxuXHJcblxyXG4gICAgICAgIHN0YWdlU291cmNlcy5uZXh0U291cmNlLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIHN0YWdlU291cmNlcy5uZXh0U291cmNlLmFwcGVuZENoaWxkKG5leHRTb3VyY2UuZmlyc3RDaGlsZCk7XHJcbiAgICB9LFxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlbGYpIHtcclxuXHJcbiAgICAvL3RvIHRoZXNlIGVsZW1lbnRzIGFyZSBhZGRlZCBtb3VzZSBldmVudHNcclxuICAgIGNvbnN0IGVsZW1lbnRzID0ge1xyXG4gICAgICAgIFwibWVkaWFIb2xkZXJcIjogc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlcixcclxuICAgICAgICBcIm5hdlwiOiBzZWxmLmRhdGEubmF2XHJcbiAgICB9O1xyXG4gICAgLy9zb3VyY2VzIGFyZSB0cmFuc2Zvcm1lZFxyXG4gICAgY29uc3Qgc291cmNlcyA9IHNlbGYuZGF0YS5zdGFnZVNvdXJjZXM7XHJcblxyXG4gICAgbGV0IGlzX2RyYWdnaW5nID0gZmFsc2U7XHJcbiAgICBsZXQgbW91c2VEb3duQ2xpZW50WDtcclxuICAgIGxldCBkaWZmZXJlbmNlO1xyXG4gICAgbGV0IHNsaWRlYUFibGUgPSB0cnVlO1xyXG5cclxuICAgIGxldCBldmVudExpc3RlbmVycyA9IHtcclxuXHJcblxyXG4gICAgICAgIG1vdXNlRG93bkV2ZW50OiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGVsZW0gaW4gZWxlbWVudHMpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzW2VsZW1dLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtY3Vyc29yLWdyYWJiaW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaXNfZHJhZ2dpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBtb3VzZURvd25DbGllbnRYID0gZS5jbGllbnRYO1xyXG5cclxuICAgICAgICAgICAgaWYoIXNsaWRlYUFibGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkaWZmZXJlbmNlID0gMDtcclxuICAgICAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgICAgIG1vdXNlVXBFdmVudDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBlbGVtIGluIGVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50c1tlbGVtXS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LWN1cnNvci1ncmFiYmluZycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpc19kcmFnZ2luZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgdXNlciBkaWRuJ3Qgc2xpZGUgbm9uZSBhbmltYXRpb24gc2hvdWxkIHdvcmtcclxuICAgICAgICAgICAgaWYoZGlmZmVyZW5jZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vd2UgY2FuIHNsaWRlIG9ubHkgaWYgcHJldmlvdXMgYW5pbWF0aW9uIGhhcyBmaW5pc2hlZFxyXG4gICAgICAgICAgICBpZighc2xpZGVhQWJsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNsaWRlYUFibGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCB0cmFuc2l0aW9uIGlmIHVzZXIgc2xpZGUgdG8gc291cmNlXHJcbiAgICAgICAgICAgIHNvdXJjZXMucHJldmlvdXNTb3VyY2UuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG4gICAgICAgICAgICBzb3VyY2VzLmN1cnJlbnRTb3VyY2UuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG4gICAgICAgICAgICBzb3VyY2VzLm5leHRTb3VyY2UuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIHNsaWRlIHByZXZpb3VzXHJcbiAgICAgICAgICAgIGlmIChkaWZmZXJlbmNlID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBzbGlkZSBudW1iZXJcclxuICAgICAgICAgICAgICAgIGlmKHNlbGYuZGF0YS5zbGlkZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEudG90YWxfc2xpZGVzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKHNlbGYuZGF0YS5zbGlkZSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuZGF0YS54UG9zaXRpb24gPSAtMC4xICogd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRzb3VyY2VzKCdwcmV2aW91cycsIHNlbGYuZGF0YS5zbGlkZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBzb3VyY2UgaW4gc291cmNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZXNbc291cmNlXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyAtMC4xICogd2luZG93LmlubmVyV2lkdGggKyAncHgsMCknO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gc2xpZGUgbmV4dFxyXG4gICAgICAgICAgICBlbHNlIGlmIChkaWZmZXJlbmNlIDwgMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdXBkYXRlIHNsaWRlIG51bWJlclxyXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5kYXRhLnNsaWRlID09PSBzZWxmLmRhdGEudG90YWxfc2xpZGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKDEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnNsaWRlICsgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnhQb3NpdGlvbiA9IC0yLjUgKiB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICAgICAgICAgIGxldCBwcmV2aW91cyA9IC1zZWxmLmRhdGEuc2xpZGVEaXN0YW5jZSAqIHdpbmRvdy5pbm5lcldpZHRoICsgZGlmZmVyZW5jZTtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXMuY3VycmVudFNvdXJjZS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyBwcmV2aW91cyArICdweCwwKSc7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzLm5leHRTb3VyY2Uuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgwLDApJztcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRzb3VyY2VzKCduZXh0Jywgc2VsZi5kYXRhLnNsaWRlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTbGlkZSA9IHNlbGYuZGF0YS5zbGlkZTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiAgQWZ0ZXIgdHJhbnNpdGlvbiBmaW5pc2ggY2hhbmdlIHN0YWdlIHNvdXJjZXMgYWZ0ZXIgc2xpZGluZyB0byBuZXh0IHNvdXJjZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc291cmNlcy5wcmV2aW91c1NvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzLmN1cnJlbnRTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgc291cmNlcy5uZXh0U291cmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0cmFuc2l0aW9uIGxhc3QgMjUwbXMgc28gaWYgaW1hZ2Ugd29uJ3QgbG9hZCB0aWxsIHRoYXRcclxuICAgICAgICAgICAgICAgIC8vIHdlIHdpbGwgbmVlZCB0byByZW5kZXIgaXQgYWZ0ZXIgaXQgbG9hZHMgb24gbmV4dEFwcGVuZCBtZXRob2QgYXQgYXBwZW5kU291cmNlLmpzXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzbGlkZUxvYWQgPSBzZWxmLmRhdGEuc2xpZGVMb2FkO1xyXG4gICAgICAgICAgICAgICAgc2xpZGVhQWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZihzbGlkZUxvYWQubG9hZGVkW2N1cnJlbnRTbGlkZV0gPT09IGZhbHNlIHx8IHR5cGVvZiBzbGlkZUxvYWQubG9hZGVkW2N1cnJlbnRTbGlkZV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZUxvYWQuaXNDYWxsaW5nQXBwZW5kW2N1cnJlbnRTbGlkZV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzbGlkZUxvYWQubG9hZGVkW2N1cnJlbnRTbGlkZV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNsaWRlTG9hZC5pc0NhbGxpbmdBcHBlbmRbY3VycmVudFNsaWRlXSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkaWZmZXJlbmNlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYXBwZW5kTWV0aG9kcy5wcmV2aW91c1NvdXJjZUNoYW5nZVN0YWdlKHNlbGYsIGN1cnJlbnRTbGlkZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoZGlmZmVyZW5jZSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmFwcGVuZE1ldGhvZHMubmV4dFNvdXJjZUNoYW5nZVN0YWdlKHNlbGYsIGN1cnJlbnRTbGlkZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LDI1MCk7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG5cclxuICAgICAgICBtb3VzZU1vdmVFdmVudDogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKCFpc19kcmFnZ2luZyB8fCAhc2xpZGVhQWJsZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRpZmZlcmVuY2UgPSBlLmNsaWVudFggLSBtb3VzZURvd25DbGllbnRYO1xyXG4gICAgICAgICAgICBsZXQgcHJldmlvdXMgPSAtc2VsZi5kYXRhLnNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aCArIGRpZmZlcmVuY2U7XHJcbiAgICAgICAgICAgIGxldCBuZXh0ID0gc2VsZi5kYXRhLnNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aCArIGRpZmZlcmVuY2U7XHJcbiAgICAgICAgICAgIHNvdXJjZXMucHJldmlvdXNTb3VyY2Uuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgcHJldmlvdXMgKyAncHgsMCknO1xyXG4gICAgICAgICAgICBzb3VyY2VzLmN1cnJlbnRTb3VyY2Uuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgZGlmZmVyZW5jZSArICdweCwwKSc7XHJcbiAgICAgICAgICAgIHNvdXJjZXMubmV4dFNvdXJjZS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyBuZXh0ICsgJ3B4LDApJztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBmb3IobGV0IGVsZW0gaW4gZWxlbWVudHMpIHtcclxuICAgICAgICBlbGVtZW50c1tlbGVtXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBldmVudExpc3RlbmVycy5tb3VzZURvd25FdmVudCk7XHJcbiAgICB9XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGV2ZW50TGlzdGVuZXJzLm1vdXNlVXBFdmVudCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZXZlbnRMaXN0ZW5lcnMubW91c2VNb3ZlRXZlbnQpO1xyXG59OyIsIndpbmRvdy5mc0xpZ2h0Ym94T2JqZWN0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHRoaXMuZGF0YSA9IHtcclxuICAgICAgICBzbGlkZTogMSxcclxuICAgICAgICB0b3RhbF9zbGlkZXM6IDYsXHJcbiAgICAgICAgeFBvc2l0aW9uOiAtMS4zICogd2luZG93LmlubmVyV2lkdGgsXHJcbiAgICAgICAgc2xpZGVEaXN0YW5jZTogMS4zLFxyXG5cclxuICAgICAgICBzbGlkZUNvdW50ZXI6IHRydWUsXHJcbiAgICAgICAgc2xpZGVCdXR0b25zOiB0cnVlLFxyXG4gICAgICAgIGlzRmlyc3RUaW1lTG9hZDogZmFsc2UsXHJcbiAgICAgICAgbW92ZVNsaWRlc1ZpYURyYWc6IHRydWUsXHJcbiAgICAgICAgaXNSZW5kZXJpbmdUb29sYmFyQnV0dG9uczoge1xyXG4gICAgICAgICAgICBcImNsb3NlXCI6IHRydWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cmxzOiBbXHJcbiAgICAgICAgICAgIFwiaW1hZ2VzLzEuanBlZ1wiLFxyXG4gICAgICAgICAgICBcImltYWdlcy8yLmpwZ1wiLFxyXG4gICAgICAgICAgICAvL1wiaW1hZ2VzLzMuanBlZ1wiLFxyXG4gICAgICAgICAgICBcImZpbG1zL2ZpbG0ubXA0XCIsXHJcbiAgICAgICAgICAgIFwiaW1hZ2VzLzQuanBlZ1wiLFxyXG4gICAgICAgICAgICBcImltYWdlcy81LmpwZ1wiLFxyXG4gICAgICAgICAgICBcImltYWdlcy82LmpwZ1wiLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc291cmNlczogW10sXHJcbiAgICAgICAgcmVtZW1iZXJlZFNvdXJjZXNEaW1lbnNpb25zOiBbXSxcclxuXHJcbiAgICAgICAgbWVkaWFIb2xkZXI6IHt9LFxyXG4gICAgICAgIHN0YWdlU291cmNlczoge1xyXG4gICAgICAgICAgICBcInByZXZpb3VzU291cmNlXCI6IHt9LFxyXG4gICAgICAgICAgICBcImN1cnJlbnRTb3VyY2VcIjoge30sXHJcbiAgICAgICAgICAgIFwibmV4dFNvdXJjZVwiOiB7fSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNsaWRlTG9hZDoge1xyXG4gICAgICAgICAgICBhcHBlbmRzOiBbXSxcclxuICAgICAgICAgICAgbG9hZGVkOiBbXSxcclxuICAgICAgICAgICAgaXNDYWxsaW5nQXBwZW5kOiBbXVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG5hdjoge30sXHJcbiAgICAgICAgdG9vbGJhcjoge30sXHJcbiAgICAgICAgc291cmNlRWxlbToge30sXHJcbiAgICAgICAgc2xpZGVDb3VudGVyRWxlbToge30sXHJcblxyXG4gICAgICAgIG9uUmVzaXplRXZlbnQ6IG5ldyBvblJlc2l6ZUV2ZW50KCksXHJcbiAgICAgICAgdXBkYXRlU2xpZGVOdW1iZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHtXaW5kb3d9XHJcbiAgICAgKi9cclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcblxyXG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG5ldyBzZWxmLmRvbSgpO1xyXG4gICAgICAgIHJlcXVpcmUoJy4vY2hhbmdlU2xpZGVCeURyYWdnaW5nLmpzJykoc2VsZik7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciBhbGwgbGlicmFyeSBlbGVtZW50c1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHRoaXMuZG9tID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJlcXVpcmUoJy4vcmVuZGVyRE9NLmpzJykoc2VsZiwgRE9NT2JqZWN0KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZzbGlnaHRib3gtY29udGFpbmVyJykucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlIGRvbSBlbGVtZW50IHdpdGggY2xhc3Nlc1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIERPTU9iamVjdCh0YWcpIHtcclxuICAgICAgICB0aGlzLmVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ2xhc3Nlc0FuZENyZWF0ZSA9IGZ1bmN0aW9uIChjbGFzc2VzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4IGluIGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzZXNbaW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9iamVjdCB0aGF0IGNvbnRhaW5zIGFsbCBhY3Rpb25zIHRoYXQgZnNsaWdodGJveCBpcyBkb2luZyBkdXJpbmcgcnVubmluZ1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIG9uUmVzaXplRXZlbnQoKSB7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5yZW1lbWJlcmRXaWR0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5yZW1lbWJlcmRIZWlnaHQgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhSG9sZGVyRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc291cmNlRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLm1lZGlhSG9sZGVyRGltZW5zaW9ucygpO1xyXG4gICAgICAgICAgICBfdGhpcy5zb3VyY2VEaW1lbnNpb25zKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTVkdJY29uIG9iamVjdCB3aXRoIGdldFNWR0ljb24gbWV0aG9kIHdoaWNoIHJldHVybiA8c3ZnPiBlbGVtZW50IHdpdGggPHBhdGg+IGNoaWxkXHJcbiAgICAgKiBAcmV0dXJucyB7RWxlbWVudH1cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLlNWR0ljb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIDxzdmc+IHdpdGggYWRkZWQgJ2ZzbGlnaHRib3gtc3ZnLWljb24nIGNsYXNzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgXCJzdmdcIik7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGNoaWxkIG9mIHN2ZyBlbXB0eSA8cGF0aD5cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgXCJwYXRoXCIpO1xyXG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICdjbGFzcycsICdmc2xpZ2h0Ym94LXN2Zy1pY29uJyk7XHJcbiAgICAgICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3ZpZXdCb3gnLCAnMCAwIDIwIDIwJyk7XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm5zIERPTSA8c3ZnPiBpY29uIGNvbnRhaW5pbmcgPHBhdGg+IGNoaWxkIHdpdGggZCBhdHRyaWJ1dGUgZnJvbSBwYXJhbWV0ZXJcclxuICAgICAgICAgKiBAcGFyYW0gZFxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZ2V0U1ZHSWNvbiA9IGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZCcsIGQpO1xyXG4gICAgICAgICAgICB0aGlzLnN2Zy5hcHBlbmRDaGlsZCh0aGlzLnBhdGgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdmc7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTbGlkZSBjb3VudGVyIG9iamVjdCAtIHVwcGVyIGxlZnQgY29ybmVyIG9mIGZzTGlnaHRib3hcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLnNsaWRlQ291bnRlckVsZW0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IG51bWJlckNvbnRhaW5lciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLW51bWJlci1jb250YWluZXInXSk7XHJcbiAgICAgICAgc2VsZi5kYXRhLnNsaWRlQ291bnRlckVsZW0gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1zbGlkZS1udW1iZXInXSk7XHJcblxyXG4gICAgICAgIHNlbGYuZGF0YS5zbGlkZUNvdW50ZXJFbGVtLmlubmVySFRNTCA9IHNlbGYuZGF0YS5zbGlkZTtcclxuICAgICAgICBzZWxmLmRhdGEuc2xpZGVDb3VudGVyRWxlbS5pZCA9ICdjdXJyZW50X3NsaWRlJztcclxuXHJcbiAgICAgICAgbGV0IHNwYWNlID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtc2xpZGUtbnVtYmVyJ10pO1xyXG4gICAgICAgIHNwYWNlLmlubmVySFRNTCA9ICcvJztcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlcyA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLXNsaWRlLW51bWJlciddKTtcclxuICAgICAgICBzbGlkZXMuaW5uZXJIVE1MID0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlcztcclxuXHJcbiAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYuZGF0YS5zbGlkZUNvdW50ZXJFbGVtKTtcclxuICAgICAgICBudW1iZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoc3BhY2UpO1xyXG4gICAgICAgIG51bWJlckNvbnRhaW5lci5hcHBlbmRDaGlsZChzbGlkZXMpO1xyXG5cclxuICAgICAgICAvLyB0aGlzIG1ldGhvZCBpcyBjYWxsZWQgYWZ0ZXIgc3dpdGNoaW5nIHNsaWRlc1xyXG4gICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlciA9IGZ1bmN0aW9uIChudW1iZXIpIHtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlID0gbnVtYmVyO1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGVDb3VudGVyRWxlbS5pbm5lckhUTUwgPSBudW1iZXI7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTbGlkZUNvdW50ZXIgPSBmdW5jdGlvbiAobmF2KSB7XHJcbiAgICAgICAgICAgIG5hdi5hcHBlbmRDaGlsZChudW1iZXJDb250YWluZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9vbGJhciBidXR0b25cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLnRvb2xiYXJCdXR0b24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5idXR0b24gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC10b29sYmFyLWJ1dHRvbicsICdidXR0b24tc3R5bGUnXSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkU1ZHSWNvbiA9IGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgIGxldCBTVkdJY29uID0gbmV3IHNlbGYuU1ZHSWNvbigpLmdldFNWR0ljb24oZCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgU1ZHSWNvblxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYnV0dG9uKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvb2xiYXIgb2JqZWN0IHdoaWNoIGNvbnRhaW5zIHRvb2xiYXIgYnV0dG9uc1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHRoaXMudG9vbGJhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnRvb2xiYXJFbGVtID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtdG9vbGJhciddKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJEZWZhdWx0QnV0dG9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHNob3VsZFJlbmRlckJ1dHRvbnMgPSBzZWxmLmRhdGEuaXNSZW5kZXJpbmdUb29sYmFyQnV0dG9ucztcclxuXHJcbiAgICAgICAgICAgIGlmIChzaG91bGRSZW5kZXJCdXR0b25zLmNsb3NlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnV0dG9uID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtdG9vbGJhci1idXR0b24nLCAnYnV0dG9uLXN0eWxlJ10pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN2ZyA9IG5ldyBzZWxmLlNWR0ljb24oKS5nZXRTVkdJY29uKCdNIDExLjQ2OSAxMCBsIDcuMDggLTcuMDggYyAwLjQwNiAtMC40MDYgMC40MDYgLTEuMDY0IDAgLTEuNDY5IGMgLTAuNDA2IC0wLjQwNiAtMS4wNjMgLTAuNDA2IC0xLjQ2OSAwIEwgMTAgOC41MyBsIC03LjA4MSAtNy4wOCBjIC0wLjQwNiAtMC40MDYgLTEuMDY0IC0wLjQwNiAtMS40NjkgMCBjIC0wLjQwNiAwLjQwNiAtMC40MDYgMS4wNjMgMCAxLjQ2OSBMIDguNTMxIDEwIEwgMS40NSAxNy4wODEgYyAtMC40MDYgMC40MDYgLTAuNDA2IDEuMDY0IDAgMS40NjkgYyAwLjIwMyAwLjIwMyAwLjQ2OSAwLjMwNCAwLjczNSAwLjMwNCBjIDAuMjY2IDAgMC41MzEgLTAuMTAxIDAuNzM1IC0wLjMwNCBMIDEwIDExLjQ2OSBsIDcuMDggNy4wODEgYyAwLjIwMyAwLjIwMyAwLjQ2OSAwLjMwNCAwLjczNSAwLjMwNCBjIDAuMjY3IDAgMC41MzIgLTAuMTAxIDAuNzM1IC0wLjMwNCBjIDAuNDA2IC0wLjQwNiAwLjQwNiAtMS4wNjQgMCAtMS40NjkgTCAxMS40NjkgMTAgWicpO1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKHN2Zyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2xiYXJFbGVtLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlclRvb2xiYXIgPSBmdW5jdGlvbiAobmF2KSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyRGVmYXVsdEJ1dHRvbnMoKTtcclxuICAgICAgICAgICAgbmF2LmFwcGVuZENoaWxkKHRoaXMudG9vbGJhckVsZW0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQnV0dG9uVG9Ub29sYmFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgdG9vbGJhckJ1dHRvbiA9IG5ldyBzZWxmLnRvb2xiYXJCdXR0b24oKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5zbGlkZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5wcmV2aW91c1NsaWRlVmlhQnV0dG9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5kYXRhLnNsaWRlID4gMSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKHNlbGYuZGF0YS5zbGlkZSAtIDEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKHNlbGYuZGF0YS50b3RhbF9zbGlkZXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2xvYWQgc291cmNlIGJ5IGluZGV4IChhcnJheSBpcyBpbmRleGVkIGZyb20gMCBzbyB3ZSBuZWVkIHRvIGRlY3JlbWVudCBpbmRleClcclxuICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlKHNlbGYuZGF0YS51cmxzW3NlbGYuZGF0YS5zbGlkZSAtIDFdKTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5uZXh0U2xpZGVWaWFCdXR0b24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmRhdGEuc2xpZGUgPCBzZWxmLmRhdGEudG90YWxfc2xpZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnNsaWRlICsgMSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEudG90YWxfc2xpZGVzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9sb2FkIHNvdXJjZSBieSBpbmRleCAoYXJyYXkgaXMgaW5kZXhlZCBmcm9tIDAgc28gd2UgbmVlZCB0byBkZWNyZW1lbnQgaW5kZXgpXHJcbiAgICAgICAgICAgIHNlbGYubG9hZHNvdXJjZShzZWxmLmRhdGEudXJsc1tzZWxmLmRhdGEuc2xpZGUgLSAxXSk7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGl2IHRoYXQgaG9sZHMgc291cmNlIGVsZW1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tZWRpYUhvbGRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmhvbGRlciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LW1lZGlhLWhvbGRlciddKTtcclxuICAgICAgICB0aGlzLmhvbGRlci5zdHlsZS53aWR0aCA9ICB3aW5kb3cuaW5uZXJXaWR0aCArICdweCc7XHJcbiAgICAgICAgdGhpcy5ob2xkZXIuc3R5bGUuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudC5tZWRpYUhvbGRlckRpbWVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuc3R5bGUud2lkdGggPSAzICogd2luZG93LmlubmVyV2lkdGggKyAncHgnO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5yZW5kZXJIb2xkZXIgPSBmdW5jdGlvbiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmhvbGRlcik7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWV0aG9kcyB0aGF0IGFwcGVuZHMgc291cmNlcyB0byBtZWRpYUhvbGRlciBkZXBlbmRpbmcgb24gYWN0aW9uXHJcbiAgICAgKiBAdHlwZSB7e2luaXRpYWxBcHBlbmQsIHByZXZpb3VzQXBwZW5kLCBuZXh0QXBwZW5kfXwqfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmFwcGVuZE1ldGhvZHMgPSByZXF1aXJlKCcuL2FwcGVuZFNvdXJjZScpO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3BsYXkgc291cmNlIChpbWFnZXMsIEhUTUw1IHZpZGVvLCBZb3VUdWJlIHZpZGVvKSBkZXBlbmRpbmcgb24gZ2l2ZW4gdXJsIGZyb20gdXNlclxyXG4gICAgICogT3IgaWYgZGlzcGxheSBpcyBpbml0aWFsIGRpc3BsYXkgMyBpbml0aWFsIHNvdXJjZXNcclxuICAgICAqIElmIHRoZXJlIGFyZSA+PSAzIGluaXRpYWwgc291cmNlcyB0aGVyZSB3aWxsIGJlIGFsd2F5cyAzIGluIHN0YWdlXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKiBAcGFyYW0gdHlwZU9mTG9hZFxyXG4gICAgICogQHJldHVybnMge21vZHVsZS5leHBvcnRzfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmxvYWRzb3VyY2VzID0gZnVuY3Rpb24gKHR5cGVPZkxvYWQsIHNsaWRlKSB7XHJcbiAgICAgICAgY29uc3QgbG9hZHNvdXJjZW1vZHVsZSA9IHJlcXVpcmUoXCIuL2xvYWRTb3VyY2UuanNcIik7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBsb2Fkc291cmNlbW9kdWxlKHNlbGYsIERPTU9iamVjdCwgdHlwZU9mTG9hZCwgc2xpZGUpO1xyXG4gICAgfTtcclxufTtcclxuXHJcblxyXG4hZnVuY3Rpb24gKCkge1xyXG59KGRvY3VtZW50LCB3aW5kb3cpO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWxmLCBET01PYmplY3QsIHR5cGVPZkxvYWQsIHNsaWRlKSB7XHJcblxyXG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xyXG4gICAgbGV0IGN1cnJlbnRTbGlkZUFycmF5SW5kZXggPSBzZWxmLmRhdGEuc2xpZGUgLSAxO1xyXG5cclxuICAgIGxldCBzb3VyY2VEaW1lbnNpb25zID0gZnVuY3Rpb24gKHNvdXJjZUVsZW0sIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQpIHtcclxuICAgICAgICBpZiAodHlwZW9mICBzb3VyY2VXaWR0aCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBzb3VyY2VXaWR0aCA9IHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50LnJlbWVtYmVyZFdpZHRoO1xyXG4gICAgICAgICAgICBzb3VyY2VIZWlnaHQgPSBzZWxmLmRhdGEub25SZXNpemVFdmVudC5yZW1lbWJlcmRIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjb2VmZmljaWVudCA9IHNvdXJjZVdpZHRoIC8gc291cmNlSGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IGRldmljZVdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgY29uc3QgZGV2aWNlSGVpZ2h0ID0gcGFyc2VJbnQoc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5zdHlsZS5oZWlnaHQpO1xyXG4gICAgICAgIGxldCBuZXdIZWlnaHQgPSBkZXZpY2VXaWR0aCAvIGNvZWZmaWNpZW50O1xyXG4gICAgICAgIGlmIChuZXdIZWlnaHQgPCBkZXZpY2VIZWlnaHQgLSA2MCkge1xyXG4gICAgICAgICAgICBzb3VyY2VFbGVtLnN0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgc291cmNlRWxlbS5zdHlsZS53aWR0aCA9IGRldmljZVdpZHRoICsgXCJweFwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld0hlaWdodCA9IGRldmljZUhlaWdodCAtIDYwO1xyXG4gICAgICAgICAgICBzb3VyY2VFbGVtLnN0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgc291cmNlRWxlbS5zdHlsZS53aWR0aCA9IG5ld0hlaWdodCAqIGNvZWZmaWNpZW50ICsgXCJweFwiO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIGZhZGUgaW4gY2xhc3MgYW5kIGRpbWVuc2lvbiBmdW5jdGlvblxyXG4gICAgICovXHJcbiAgICBsZXQgb25sb2FkTGlzdGVuZXIgPSBmdW5jdGlvbiAoc291cmNlRWxlbSwgc291cmNlV2lkdGgsIHNvdXJjZUhlaWdodCwgYXJyYXlJbmRleCkge1xyXG5cclxuICAgICAgICBsZXQgc291cmNlSG9sZGVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc291cmNlLWhvbGRlciddKTtcclxuXHJcbiAgICAgICAgLy9ub3JtYWwgc291cmNlIGRpbWVuc2lvbnMgbmVlZHMgdG8gYmUgc3RvcmVkIGluIGFycmF5XHJcbiAgICAgICAgLy9pdCB3aWxsIGJlIG5lZWRlZCB3aGVuIGxvYWRpbmcgc291cmNlIGZyb20gbWVtb3J5XHJcbiAgICAgICAgc2VsZi5kYXRhLnJlbWVtYmVyZWRTb3VyY2VzRGltZW5zaW9uc1thcnJheUluZGV4XSA9IHtcclxuICAgICAgICAgICAgXCJ3aWR0aFwiOiBzb3VyY2VXaWR0aCxcclxuICAgICAgICAgICAgXCJoZWlnaHRcIjogc291cmNlSGVpZ2h0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9hZGQgc29tZSBmYWRlIGluIGFuaW1hdGlvblxyXG4gICAgICAgIHNvdXJjZUVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1mYWRlLWluJyk7XHJcbiAgICAgICAgdm9pZCBzb3VyY2VFbGVtLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIHNvdXJjZUVsZW0uY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1mYWRlLWluJyk7XHJcblxyXG4gICAgICAgIC8vYWRkIG1ldGhvZCB0aGF0IGNoYW5nZXMgc291cmNlIGRpbWVuc2lvbiBvbiB3aW5kb3cgcmVzaXplXHJcbiAgICAgICAgc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQuc291cmNlRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc291cmNlRGltZW5zaW9ucyhzb3VyY2VFbGVtLCBzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL3NldCBkaW1lbnNpb24gZm9yIHRoZSBmaXJzdCB0aW1lXHJcbiAgICAgICAgc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQuc291cmNlRGltZW5zaW9ucyhzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0KTtcclxuXHJcblxyXG4gICAgICAgIC8vIGRpbWVuc2lvbnMgd2lsbCBiZSBnaXZlbiBvbmx5IG9uZSB0aW1lIHNvIHdlIHdpbGwgbmVlZCB0byByZW1lbWJlciBpdFxyXG4gICAgICAgIC8vIGZvciBuZXh0IG9ucmVzaXplIGV2ZW50IGNhbGxzXHJcbiAgICAgICAgc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQucmVtZW1iZXJkV2lkdGggPSBzb3VyY2VXaWR0aDtcclxuICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudC5yZW1lbWJlcmRIZWlnaHQgPSBzb3VyY2VIZWlnaHQ7XHJcblxyXG4gICAgICAgIHNvdXJjZUhvbGRlci5hcHBlbmRDaGlsZChzb3VyY2VFbGVtKTtcclxuICAgICAgICBzZWxmLmRhdGEuc291cmNlc1thcnJheUluZGV4XSA9IHNvdXJjZUhvbGRlcjtcclxuXHJcblxyXG4gICAgICAgIHN3aXRjaCAodHlwZU9mTG9hZCkge1xyXG4gICAgICAgICAgICBjYXNlICdpbml0aWFsJzpcclxuICAgICAgICAgICAgICAgIHNlbGYuYXBwZW5kTWV0aG9kcy5pbml0aWFsQXBwZW5kKHNlbGYpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ25leHQnOlxyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlTG9hZC5sb2FkZWRbc2xpZGVdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGF0YS5zbGlkZUxvYWQuYXBwZW5kc1tzbGlkZV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hcHBlbmRNZXRob2RzLm5leHRBcHBlbmQoc2VsZiwgc2xpZGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3ByZXZpb3VzJzpcclxuICAgICAgICAgICAgICAgIHNlbGYuZGF0YS5zbGlkZUxvYWQubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGF0YS5zbGlkZUxvYWQubG9hZHNbc2xpZGVdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGF0YS5zbGlkZUxvYWQuYXBwZW5kc1tzbGlkZV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hcHBlbmRNZXRob2RzLnByZXZpb3VzQXBwZW5kKHNlbGYsIHNsaWRlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMubG9hZFlvdXR1YmV2aWRlbyA9IGZ1bmN0aW9uICh2aWRlb0lkLCBhcnJheUluZGV4KSB7XHJcbiAgICAgICAgbGV0IGlmcmFtZSA9IG5ldyBET01PYmplY3QoJ2lmcmFtZScpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNpbmdsZS1zb3VyY2UnXSk7XHJcbiAgICAgICAgaWZyYW1lLnNyYyA9ICcvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8nICsgdmlkZW9JZDtcclxuICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvd2Z1bGxzY3JlZW4nLCAnJyk7XHJcbiAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnZnJhbWVib3JkZXInLCAnMCcpO1xyXG4gICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcclxuICAgICAgICBvbmxvYWRMaXN0ZW5lcihpZnJhbWUsIDE5MjAsIDEwODAsIGFycmF5SW5kZXgpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5pbWFnZUxvYWQgPSBmdW5jdGlvbiAoc3JjLCBhcnJheUluZGV4KSB7XHJcbiAgICAgICAgbGV0IHNvdXJjZUVsZW0gPSBuZXcgRE9NT2JqZWN0KCdpbWcnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zaW5nbGUtc291cmNlJ10pO1xyXG4gICAgICAgIHNvdXJjZUVsZW0uc3JjID0gc3JjO1xyXG4gICAgICAgIHNvdXJjZUVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb25sb2FkTGlzdGVuZXIoc291cmNlRWxlbSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIGFycmF5SW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy52aWRlb0xvYWQgPSBmdW5jdGlvbiAoc3JjLCBhcnJheUluZGV4KSB7XHJcbiAgICAgICAgbGV0IHZpZGVvRWxlbSA9IG5ldyBET01PYmplY3QoJ3ZpZGVvJykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2luZ2xlLXNvdXJjZScsICdmc2xpZ2h0Ym94LWZhZGUtaW4nXSk7XHJcbiAgICAgICAgbGV0IHNvdXJjZSA9IG5ldyBET01PYmplY3QoJ3NvdXJjZScpLmVsZW07XHJcbiAgICAgICAgc291cmNlLnNyYyA9IHNyYztcclxuICAgICAgICB2aWRlb0VsZW0uaW5uZXJUZXh0ID0gJ1NvcnJ5LCB5b3VyIGJyb3dzZXIgZG9lc25cXCd0IHN1cHBvcnQgZW1iZWRkZWQgdmlkZW9zLCA8YVxcbicgK1xyXG4gICAgICAgICAgICAnICAgICAgICAgICAgaHJlZj1cImh0dHA6Ly9kb3dubG9hZC5ibGVuZGVyLm9yZy9wZWFjaC9iaWdidWNrYnVubnlfbW92aWVzL0JpZ0J1Y2tCdW5ueV8zMjB4MTgwLm1wNFwiPmRvd25sb2FkPC9hPiBhbmQgd2F0Y2hcXG4nICtcclxuICAgICAgICAgICAgJyAgICAgICAgd2l0aCB5b3VyIGZhdm9yaXRlIHZpZGVvIHBsYXllciEnO1xyXG5cclxuICAgICAgICB2aWRlb0VsZW0uc2V0QXR0cmlidXRlKCdjb250cm9scycsICcnKTtcclxuICAgICAgICB2aWRlb0VsZW0uYXBwZW5kQ2hpbGQoc291cmNlKTtcclxuICAgICAgICB2aWRlb0VsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG9ubG9hZExpc3RlbmVyKHZpZGVvRWxlbSwgdGhpcy52aWRlb1dpZHRoLCB0aGlzLnZpZGVvSGVpZ2h0LCBhcnJheUluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbSA9IGZ1bmN0aW9uIChzb3VyY2VVcmwpIHtcclxuICAgICAgICBjb25zdCBwYXJzZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgY29uc3QgaW5kZXhPZlNvdXJjZSA9IHNlbGYuZGF0YS51cmxzLmluZGV4T2Yoc291cmNlVXJsKTtcclxuXHJcbiAgICAgICAgcGFyc2VyLmhyZWYgPSBzb3VyY2VVcmw7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldElkKHNvdXJjZVVybCkge1xyXG4gICAgICAgICAgICBsZXQgcmVnRXhwID0gL14uKih5b3V0dS5iZVxcL3x2XFwvfHVcXC9cXHdcXC98ZW1iZWRcXC98d2F0Y2hcXD92PXxcXCZ2PSkoW14jXFwmXFw/XSopLiovO1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBzb3VyY2VVcmwubWF0Y2gocmVnRXhwKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaCAmJiBtYXRjaFsyXS5sZW5ndGggPT0gMTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaFsyXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnZXJyb3InO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyc2VyLmhvc3RuYW1lID09PSAnd3d3LnlvdXR1YmUuY29tJykge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRZb3V0dWJldmlkZW8oZ2V0SWQoc291cmNlVXJsKSwgaW5kZXhPZlNvdXJjZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHhoci5vbmxvYWRzdGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSBcImJsb2JcIjtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIHdoYXQgdHlwZSBvZiBmaWxlIHByb3ZpZGVkIGZyb20gbGlua1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzcG9uc2VUeXBlID0geGhyLnJlc3BvbnNlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZS5pbmRleE9mKCcvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZS5zbGljZSgwLCByZXNwb25zZVR5cGUuaW5kZXhPZignLycpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZVR5cGUgPT09ICdpbWFnZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmltYWdlTG9hZChVUkwuY3JlYXRlT2JqZWN0VVJMKHhoci5yZXNwb25zZSksIGluZGV4T2ZTb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2VUeXBlID09PSAndmlkZW8nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy52aWRlb0xvYWQoVVJMLmNyZWF0ZU9iamVjdFVSTCh4aHIucmVzcG9uc2UpLCBpbmRleE9mU291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHhoci5vcGVuKCdnZXQnLCBzb3VyY2VVcmwsIHRydWUpO1xyXG4gICAgICAgICAgICB4aHIuc2VuZChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBzd2l0Y2ggKHR5cGVPZkxvYWQpIHtcclxuICAgICAgICBjYXNlICdpbml0aWFsJzpcclxuICAgICAgICAgICAgLy8gaWYgd2UgbG9hZCBpbml0aWFsbHkgd2UnbGwgbmVlZCB0byBjcmVhdGUgYWxsIHRocmVlIHN0YWdlIHNvdXJjZXNcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNlbGYuZGF0YS51cmxzW2N1cnJlbnRTbGlkZUFycmF5SW5kZXhdKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNlbGYuZGF0YS51cmxzW2N1cnJlbnRTbGlkZUFycmF5SW5kZXggKyAxXSk7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50U2xpZGVBcnJheUluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc2VsZi5kYXRhLnVybHNbc2VsZi5kYXRhLnVybHMubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKGN1cnJlbnRTbGlkZUFycmF5SW5kZXggLSAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAncHJldmlvdXMnOlxyXG4gICAgICAgICAgICAvLyBBcnJheSBpcyBpbmRleGVkIGZyb20gMCBzbyBwcmV2aW91cyBzb3VyY2UgaW5kZXggd2lsbCBiZSBzbGlkZSBudW1iZXIgLSAyXHJcblxyXG4gICAgICAgICAgICAvLyBpZiBzbGlkZSBudW1iZXIgaXMgMVxyXG4gICAgICAgICAgICAvLyB3ZSdsbCBiZSBhcHBlbmRpbmcgc291cmNlIGZyb20gdG90YWxfc2xpZGVzIGluZGV4IG5vdCBmcm9tIHNsaWRlIG51bWJlciBpbmRleCAtIDJcclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZSA9PT0gMSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiBzb3VyY2Ugd2FzIHByZXZpb3VzbHkgYXBwZW5kZWQgbG9hZCBpdCBmcm9tIG1lbW9yeVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxmLmRhdGEuc291cmNlc1tzZWxmLmRhdGEudG90YWxfc2xpZGVzXSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YS5zbGlkZUxvYWQubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGVMb2FkLmxvYWRzW3NsaWRlXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hcHBlbmRNZXRob2RzLnByZXZpb3VzQXBwZW5kKHNlbGYpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc2VsZi5kYXRhLnVybHNbc2VsZi5kYXRhLnRvdGFsX3NsaWRlcyAtIDFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgZGF0YSB3YXMgcHJldmlvdXNseSBhcHBlbmRlZCBsb2FkIGl0IGZyb20gbWVtb3J5XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBzZWxmLmRhdGEuc291cmNlc1tzZWxmLmRhdGEuc2xpZGUgLSAyXSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlTG9hZC5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlTG9hZC5sb2Fkc1tzbGlkZV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hcHBlbmRNZXRob2RzLnByZXZpb3VzQXBwZW5kKHNlbGYpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGlmIHNvdXJjZSB3YXNuJ3QgcHJldmlvdXNseSBhcHBlbmRlZCB3ZSB3aWxsIG5lZWQgdG8gY3JlYXRlIGl0XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbShzZWxmLmRhdGEudXJsc1tzZWxmLmRhdGEuc2xpZGUgLSAyXSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlICduZXh0JzpcclxuICAgICAgICAgICAgLy8gQXJyYXkgaXMgaW5kZXhlZCBmcm9tIDAgc28gbmV4dCBzb3VyY2UgaW5kZXggd2lsbCBiZSBzaW1wbHkgc2xpZGUgbnVtYmVyXHJcblxyXG4gICAgICAgICAgICAvLyBpZiBzbGlkZSBudW1iZXIgaXMgZXF1YWxzIHRvdGFsIHNsaWRlIG51bWJlclxyXG4gICAgICAgICAgICAvLyB3ZSdsbCBiZSBhcHBlbmRpbmcgc291cmNlIGZyb20gaW5kZXggMCBub3QgZnJvbSBzbGlkZSBudW1iZXIgaW5kZXhcclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZSA9PT0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlcykge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlmIHNvdXJjZSB3YXMgcHJldmlvdXNseSBhcHBlbmRlZCBsb2FkIGl0IGZyb20gbWVtb3J5XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNlbGYuZGF0YS5zb3VyY2VzWzBdICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlTG9hZC5sb2FkZWRbc2xpZGVdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmFwcGVuZE1ldGhvZHMubmV4dEFwcGVuZChzZWxmKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNlbGYuZGF0YS51cmxzWzBdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgZGF0YSB3YXMgcHJldmlvdXNseSBhcHBlbmRlZCBsb2FkIGl0IGZyb20gbWVtb3J5XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBzZWxmLmRhdGEuc291cmNlc1tzZWxmLmRhdGEuc2xpZGVdICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGVMb2FkLmxvYWRlZFtzbGlkZV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hcHBlbmRNZXRob2RzLm5leHRBcHBlbmQoc2VsZik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vd2UnbGwgcmVuZGVyIGxvYWRlciBmb3IgbG9hZCB0aW1lIG9mIHNvdXJjZVxyXG4gICAgICAgICAgICBzZWxmLmFwcGVuZE1ldGhvZHMucmVuZGVySG9sZGVyTmV4dChzZWxmLHNsaWRlLCBET01PYmplY3QpO1xyXG4gICAgICAgICAgICAvL2lmIHNvdXJjZSB3YXNuJ3QgcHJldmlvdXNseSBhcHBlbmRlZCB3ZSB3aWxsIG5lZWQgdG8gY3JlYXRlIGl0XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbShzZWxmLmRhdGEudXJsc1tzZWxmLmRhdGEuc2xpZGVdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmKHNsaWRlKSB7XHJcbiAgICAgICAgc2VsZi5kYXRhLnNsaWRlTG9hZC5hcHBlbmRzW3NsaWRlXSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL2lmIGZpcnN0IHRpbWUgbG9hZCBhZGQgbG9hZGVyXHJcbiAgICBpZiAoc2VsZi5kYXRhLmlzRmlyc3RUaW1lTG9hZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJsZHMtcmluZ1wiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+JztcclxuICAgICAgICBzZWxmLmRhdGEuaXNGaXJzdFRpbWVMb2FkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qXHJcblxyXG5cclxuICAgIC8vY2hlY2sgaWYgc291cmNlIHdhcyBwcmV2aW91c2x5IGNyZWF0ZWQgYW5kXHJcbiAgICAvLyBjcmVhdGUgaXQgaWYgaXQgd2Fzbid0IG9yIGlmIGl0IHdhcyBsb2FkIGl0IGZyb20gdmFyaWFibGVcclxuICAgIGlmICh0eXBlb2Ygc2VsZi5kYXRhLnNvdXJjZXNbaW5kZXhPZlNvdXJjZVVSTF0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2xvYWRlZCBmcm9tIG1lbW9yeScpO1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZUVsZW0gPSBzZWxmLmRhdGEuc291cmNlc1tpbmRleE9mU291cmNlVVJMXTtcclxuICAgICAgICBjb25zdCByZW1lbWJlcmVkU291cmNlRGltZW5zaW9ucyA9IHNlbGYuZGF0YS5yZW1lbWJlcmVkU291cmNlc0RpbWVuc2lvbnNbaW5kZXhPZlNvdXJjZVVSTF07XHJcbiAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLmFwcGVuZENoaWxkKHNvdXJjZUVsZW0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHNvdXJjZUVsZW0pO1xyXG5cclxuICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudC5zb3VyY2VEaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzb3VyY2VEaW1lbnNpb25zKFxyXG4gICAgICAgICAgICAgICAgc291cmNlRWxlbSxcclxuICAgICAgICAgICAgICAgIHJlbWVtYmVyZWRTb3VyY2VEaW1lbnNpb25zLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgcmVtZW1iZXJlZFNvdXJjZURpbWVuc2lvbnMuaGVpZ2h0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudC5zb3VyY2VEaW1lbnNpb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgKi9cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWxmLCBET01PYmplY3QpIHtcclxuICAgIGxldCBwcml2YXRlTWV0aG9kcyA9IHtcclxuICAgICAgICByZW5kZXJOYXY6IGZ1bmN0aW9uIChjb250YWluZXIpIHtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLm5hdiA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LW5hdiddKTtcclxuICAgICAgICAgICAgbmV3IHNlbGYudG9vbGJhcigpLnJlbmRlclRvb2xiYXIoc2VsZi5kYXRhLm5hdik7XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IHhkYnRuID0gbmV3IERPTU9iamVjdCgnYScpLmVsZW07XHJcbiAgICAgICAgICAgIHhkYnRuLmlubmVySFRNTCA9ICdoaWRlJztcclxuICAgICAgICAgICAgeGRidG4uc3R5bGUuekluZGV4ID0gJzk5OTk5OTknO1xyXG4gICAgICAgICAgICB4ZGJ0bi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZi5kYXRhLnNvdXJjZXNbMF0pO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmb3IobGV0IHNvdXJjZSBpbiBzZWxmLmRhdGEuc291cmNlcykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5hcHBlbmRDaGlsZChzZWxmLmRhdGEuc291cmNlc1swXSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5uYXYuYXBwZW5kQ2hpbGQoeGRidG4pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZUNvdW50ZXIgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIG5ldyBzZWxmLnNsaWRlQ291bnRlckVsZW0oKS5yZW5kZXJTbGlkZUNvdW50ZXIoc2VsZi5kYXRhLm5hdik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxmLmRhdGEubmF2KTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXJTbGlkZUJ1dHRvbnM6IGZ1bmN0aW9uIChjb250YWluZXIpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZUJ1dHRvbnMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vcmVuZGVyIGxlZnQgYnRuXHJcbiAgICAgICAgICAgIGxldCBsZWZ0X2J0bl9jb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4tY29udGFpbmVyJ10pO1xyXG4gICAgICAgICAgICBsZXQgYnRuID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtYnRuJywgJ2J1dHRvbi1zdHlsZSddKTtcclxuICAgICAgICAgICAgYnRuLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgbmV3IHNlbGYuU1ZHSWNvbigpLmdldFNWR0ljb24oJ004LjM4OCwxMC4wNDlsNC43Ni00Ljg3M2MwLjMwMy0wLjMxLDAuMjk3LTAuODA0LTAuMDEyLTEuMTA1Yy0wLjMwOS0wLjMwNC0wLjgwMy0wLjI5My0xLjEwNSwwLjAxMkw2LjcyNiw5LjUxNmMtMC4zMDMsMC4zMS0wLjI5NiwwLjgwNSwwLjAxMiwxLjEwNWw1LjQzMyw1LjMwN2MwLjE1MiwwLjE0OCwwLjM1LDAuMjIzLDAuNTQ3LDAuMjIzYzAuMjAzLDAsMC40MDYtMC4wOCwwLjU1OS0wLjIzNmMwLjMwMy0wLjMwOSwwLjI5NS0wLjgwMy0wLjAxMi0xLjEwNEw4LjM4OCwxMC4wNDl6JylcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxlZnRfYnRuX2NvbnRhaW5lcik7XHJcblxyXG4gICAgICAgICAgICAvLyBzbGlkZSBvYmplY3QgdGhhdCBjb250YWlucyBjaGFuZ2luZyBzbGlkZSBtZXRob2RzXHJcbiAgICAgICAgICAgIGxldCBzbGlkZSA9IG5ldyBzZWxmLnNsaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAvL2dvIHRvIHByZXZpb3VzIHNsaWRlIG9uY2xpY2tcclxuICAgICAgICAgICAgbGVmdF9idG5fY29udGFpbmVyLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZS5wcmV2aW91c1NsaWRlVmlhQnV0dG9uKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZWZ0X2J0bl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYnRuKTtcclxuICAgICAgICAgICAgbGV0IHJpZ2h0X2J0bl9jb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4tY29udGFpbmVyJywgJ2ZzbGlnaHRib3gtc2xpZGUtYnRuLXJpZ2h0LWNvbnRhaW5lciddKTtcclxuICAgICAgICAgICAgYnRuID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtYnRuJywgJ2J1dHRvbi1zdHlsZSddKTtcclxuICAgICAgICAgICAgYnRuLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgbmV3IHNlbGYuU1ZHSWNvbigpLmdldFNWR0ljb24oJ00xMS42MTEsMTAuMDQ5bC00Ljc2LTQuODczYy0wLjMwMy0wLjMxLTAuMjk3LTAuODA0LDAuMDEyLTEuMTA1YzAuMzA5LTAuMzA0LDAuODAzLTAuMjkzLDEuMTA1LDAuMDEybDUuMzA2LDUuNDMzYzAuMzA0LDAuMzEsMC4yOTYsMC44MDUtMC4wMTIsMS4xMDVMNy44MywxNS45MjhjLTAuMTUyLDAuMTQ4LTAuMzUsMC4yMjMtMC41NDcsMC4yMjNjLTAuMjAzLDAtMC40MDYtMC4wOC0wLjU1OS0wLjIzNmMtMC4zMDMtMC4zMDktMC4yOTUtMC44MDMsMC4wMTItMS4xMDRMMTEuNjExLDEwLjA0OXonKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgLy9nbyB0byBuZXh0IHNsaWRlIG9uY2xpY2tcclxuICAgICAgICAgICAgcmlnaHRfYnRuX2NvbnRhaW5lci5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2xpZGUubmV4dFNsaWRlVmlhQnV0dG9uKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJpZ2h0X2J0bl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYnRuKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJpZ2h0X2J0bl9jb250YWluZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9kaXNhYmxlIHNjcm9sbGluZ1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LW9wZW4nKTtcclxuXHJcbiAgICAvL2NyZWF0ZSBjb250YWluZXJcclxuICAgIGxldCBjb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1jb250YWluZXInXSk7XHJcbiAgICBjb250YWluZXIuaWQgPSBcImZzbGlnaHRib3gtY29udGFpbmVyXCI7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcblxyXG4gICAgLy9yZW5kZXIgc2xpZGUgYnV0dG9ucyBhbmQgbmF2KHRvb2xiYXIpXHJcbiAgICBwcml2YXRlTWV0aG9kcy5yZW5kZXJOYXYoY29udGFpbmVyKTtcclxuICAgIHByaXZhdGVNZXRob2RzLnJlbmRlclNsaWRlQnV0dG9ucyhjb250YWluZXIpO1xyXG5cclxuICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlciA9IG5ldyBzZWxmLm1lZGlhSG9sZGVyKCk7XHJcbiAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIucmVuZGVySG9sZGVyKGNvbnRhaW5lcik7XHJcblxyXG4gICAgc2VsZi5kYXRhLmlzZmlyc3RUaW1lTG9hZCA9IHRydWU7XHJcbiAgICBzZWxmLmxvYWRzb3VyY2VzKCdpbml0aWFsJyk7XHJcbn07Il19
