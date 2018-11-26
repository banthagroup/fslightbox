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

            for (let source in stageSources) {
                self.data.mediaHolder.holder.appendChild(stageSources[source]);
                stageSources[source].style.transform = 'translate(' + -1.3 * window.innerWidth + 'px,0)';
            }
        }
    },



    /**
     * Loading after transition should be called first
     * but if source won't load till that this method will notice that
     * @param self
     */
    useAppendMethod: function(self) {
        const slideLoad = self.data.slideLoad;
        if(!slideLoad.loaded || !slideLoad.isCallingAppend) {
            return false;
        }
        slideLoad.loaded = false;
        slideLoad.isCallingAppend = false;

        return true;
    },



    /**
     * Check if previous source append is needed and call if it is
     * @param self
     */
    previousAppend: function (self) {
        if(!this.useAppendMethod(self)) {
            return;
        }

        this.previousSourceChangeStage(self);
    },


    /**
     * This method changes stage sources after sliding to previous source
     * @param self
     */
    previousSourceChangeStage: function(self) {

        const mediaHolder = self.data.mediaHolder.holder;
        const stageSources = self.data.stageSources;

        mediaHolder.removeChild(stageSources.nextSource);
        stageSources.nextSource = stageSources.currentSource;

        stageSources.currentSource = stageSources.previousSource;

        if(self.data.slide === 1) {
            stageSources.previousSource = self.data.sources[self.data.total_slides - 1];
        } else {
            stageSources.previousSource = self.data.sources[self.data.slide - 2];
        }

        self.data.xPosition = -1.3 * window.innerWidth;
        for (let source in stageSources) {
            stageSources[source].style.transform = 'translate(' + -1.3 * window.innerWidth + 'px,0)';
        }
        mediaHolder.insertAdjacentElement('afterbegin', stageSources.previousSource);
    },




    /**
     * Check if next source append is needed and call if it is
     * @param self
     */
    nextAppend: function (self) {
        if(!this.useAppendMethod(self)) {
            return;
        }

        this.nextSourceChangeStage(self);
    },

    /**
     * This method change stage sources after sliding to next source
     * @param self
     */
    nextSourceChangeStage: function (self) {
        const mediaHolder = self.data.mediaHolder.holder;
        const stageSources = self.data.stageSources;

        mediaHolder.removeChild(stageSources.previousSource);
        stageSources.previousSource = stageSources.currentSource;

        stageSources.currentSource = stageSources.nextSource;

        if(self.data.slide === self.data.total_slides) {
            stageSources.nextSource = self.data.sources[0];
        } else {
            stageSources.nextSource = self.data.sources[self.data.slide];
        }

        self.data.xPosition = -1.3 * window.innerWidth;
        for (let source in stageSources) {
            stageSources[source].style.transform = 'translate(' + -1.3 * window.innerWidth + 'px,0)';
        }
        mediaHolder.appendChild(stageSources.nextSource);
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
},{}],3:[function(require,module,exports){
window.fsLightboxObject = function () {

    /**
     * @constructor
     */
    this.data = {
        slide: 1,
        total_slides: 6,
        xPosition: -1.3 * window.innerWidth,

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
            "images/3.jpeg",
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
            loaded: false,
            isCallingAppend: false
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
        this.holder.style.width = 3.6 * window.innerWidth + 'px';
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
    this.loadsources = function (typeOfLoad) {
        const loadsourcemodule = require("./loadSource.js");
        return new loadsourcemodule(self, DOMObject, typeOfLoad);
    };
};


!function () {
}(document, window);

},{"./appendSource":1,"./changeSlideByDragging.js":2,"./loadSource.js":4,"./renderDOM.js":5}],4:[function(require,module,exports){
module.exports = function (self, DOMObject, typeOfLoad) {

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
                self.data.slideLoad.loaded = true;
                self.appendMethods.nextAppend(self);
                break;
            case 'previous':
                self.data.slideLoad.loaded = true;
                self.appendMethods.previousAppend(self);
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
            if(self.data.slide === 1) {


                // if source was previously appended load it from memory
                if(typeof self.data.sources[self.data.total_slides] !== "undefined") {
                    self.data.slideLoad.loaded = true;
                    self.appendMethods.previousAppend(self);
                } else {
                    this.createSourceElem(self.data.urls[self.data.total_slides - 1]);
                }

                break;
            }

            // if data was previously appended load it from memory
            else if(typeof self.data.sources[self.data.slide - 2] !== "undefined") {
                self.data.slideLoad.loaded = true;
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
            if(self.data.slide === self.data.total_slides) {

                // if source was previously appended load it from memory
                if(typeof self.data.sources[0] !== "undefined") {
                    console.log(1);
                    self.data.slideLoad.loaded = true;
                    self.appendMethods.nextAppend(self);
                } else {
                    this.createSourceElem(self.data.urls[0]);
                }

                break;
            }

            // if data was previously appended load it from memory
            else if(typeof self.data.sources[self.data.slide] !== "undefined") {
                self.data.slideLoad.loaded = true;
                self.appendMethods.nextAppend(self);
                break;
            }

            // if source wasn't previously appended we will need to create it
            this.createSourceElem(self.data.urls[self.data.slide]);
            break;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwZW5kU291cmNlLmpzIiwic3JjL2pzL2NoYW5nZVNsaWRlQnlEcmFnZ2luZy5qcyIsInNyYy9qcy9pbmRleC5qcyIsInNyYy9qcy9sb2FkU291cmNlLmpzIiwic3JjL2pzL3JlbmRlckRPTS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgIGluaXRpYWxBcHBlbmQ6IGZ1bmN0aW9uIChzZWxmKSB7XHJcblxyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgc291cmNlIGluIHNlbGYuZGF0YS5zb3VyY2VzKSB7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb3VudCAhPT0gMykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY291bnQgPT09IDMpIHtcclxuXHJcbiAgICAgICAgICAgIC8vaW5kZXggb2YgdGhlIGN1cnJlbnQgZWxlbWVudCBzdG9yZWQgaW4gbWVtb3J5IGlzIGp1c3QgZGVjcmVtZW50ZWQgc2xpZGUgbnVtYmVyXHJcbiAgICAgICAgICAgIGxldCBhcnJheUluZGV4ID0gc2VsZi5kYXRhLnNsaWRlIC0gMTtcclxuICAgICAgICAgICAgbGV0IGxhc3RBcnJheUluZGV4ID0gc2VsZi5kYXRhLnVybHMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlcyA9IHNlbGYuZGF0YS5zb3VyY2VzO1xyXG4gICAgICAgICAgICBjb25zdCBzdGFnZVNvdXJjZXMgPSBzZWxmLmRhdGEuc3RhZ2VTb3VyY2VzO1xyXG5cclxuICAgICAgICAgICAgLy9wcmV2aW91cyBzb3VyY2VcclxuICAgICAgICAgICAgaWYgKGFycmF5SW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHN0YWdlU291cmNlcy5wcmV2aW91c1NvdXJjZSA9IHNvdXJjZXNbbGFzdEFycmF5SW5kZXhdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RhZ2VTb3VyY2VzLnByZXZpb3VzU291cmNlID0gc291cmNlc1thcnJheUluZGV4IC0gMV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvL2N1cnJlbnQgc291cmNlXHJcbiAgICAgICAgICAgIHN0YWdlU291cmNlcy5jdXJyZW50U291cmNlID0gc291cmNlc1thcnJheUluZGV4XTtcclxuXHJcbiAgICAgICAgICAgIC8vbmV4dCBzb3VyY2VcclxuICAgICAgICAgICAgaWYgKGFycmF5SW5kZXggPT09IGxhc3RBcnJheUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBzdGFnZVNvdXJjZXMubmV4dFNvdXJjZSA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGFnZVNvdXJjZXMubmV4dFNvdXJjZSA9IHNvdXJjZXNbYXJyYXlJbmRleCArIDFdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBzb3VyY2UgaW4gc3RhZ2VTb3VyY2VzKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLmFwcGVuZENoaWxkKHN0YWdlU291cmNlc1tzb3VyY2VdKTtcclxuICAgICAgICAgICAgICAgIHN0YWdlU291cmNlc1tzb3VyY2VdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIC0xLjMgKiB3aW5kb3cuaW5uZXJXaWR0aCArICdweCwwKSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkaW5nIGFmdGVyIHRyYW5zaXRpb24gc2hvdWxkIGJlIGNhbGxlZCBmaXJzdFxyXG4gICAgICogYnV0IGlmIHNvdXJjZSB3b24ndCBsb2FkIHRpbGwgdGhhdCB0aGlzIG1ldGhvZCB3aWxsIG5vdGljZSB0aGF0XHJcbiAgICAgKiBAcGFyYW0gc2VsZlxyXG4gICAgICovXHJcbiAgICB1c2VBcHBlbmRNZXRob2Q6IGZ1bmN0aW9uKHNlbGYpIHtcclxuICAgICAgICBjb25zdCBzbGlkZUxvYWQgPSBzZWxmLmRhdGEuc2xpZGVMb2FkO1xyXG4gICAgICAgIGlmKCFzbGlkZUxvYWQubG9hZGVkIHx8ICFzbGlkZUxvYWQuaXNDYWxsaW5nQXBwZW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2xpZGVMb2FkLmxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHNsaWRlTG9hZC5pc0NhbGxpbmdBcHBlbmQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiBwcmV2aW91cyBzb3VyY2UgYXBwZW5kIGlzIG5lZWRlZCBhbmQgY2FsbCBpZiBpdCBpc1xyXG4gICAgICogQHBhcmFtIHNlbGZcclxuICAgICAqL1xyXG4gICAgcHJldmlvdXNBcHBlbmQ6IGZ1bmN0aW9uIChzZWxmKSB7XHJcbiAgICAgICAgaWYoIXRoaXMudXNlQXBwZW5kTWV0aG9kKHNlbGYpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucHJldmlvdXNTb3VyY2VDaGFuZ2VTdGFnZShzZWxmKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgY2hhbmdlcyBzdGFnZSBzb3VyY2VzIGFmdGVyIHNsaWRpbmcgdG8gcHJldmlvdXMgc291cmNlXHJcbiAgICAgKiBAcGFyYW0gc2VsZlxyXG4gICAgICovXHJcbiAgICBwcmV2aW91c1NvdXJjZUNoYW5nZVN0YWdlOiBmdW5jdGlvbihzZWxmKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IG1lZGlhSG9sZGVyID0gc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlcjtcclxuICAgICAgICBjb25zdCBzdGFnZVNvdXJjZXMgPSBzZWxmLmRhdGEuc3RhZ2VTb3VyY2VzO1xyXG5cclxuICAgICAgICBtZWRpYUhvbGRlci5yZW1vdmVDaGlsZChzdGFnZVNvdXJjZXMubmV4dFNvdXJjZSk7XHJcbiAgICAgICAgc3RhZ2VTb3VyY2VzLm5leHRTb3VyY2UgPSBzdGFnZVNvdXJjZXMuY3VycmVudFNvdXJjZTtcclxuXHJcbiAgICAgICAgc3RhZ2VTb3VyY2VzLmN1cnJlbnRTb3VyY2UgPSBzdGFnZVNvdXJjZXMucHJldmlvdXNTb3VyY2U7XHJcblxyXG4gICAgICAgIGlmKHNlbGYuZGF0YS5zbGlkZSA9PT0gMSkge1xyXG4gICAgICAgICAgICBzdGFnZVNvdXJjZXMucHJldmlvdXNTb3VyY2UgPSBzZWxmLmRhdGEuc291cmNlc1tzZWxmLmRhdGEudG90YWxfc2xpZGVzIC0gMV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RhZ2VTb3VyY2VzLnByZXZpb3VzU291cmNlID0gc2VsZi5kYXRhLnNvdXJjZXNbc2VsZi5kYXRhLnNsaWRlIC0gMl07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLmRhdGEueFBvc2l0aW9uID0gLTEuMyAqIHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGZvciAobGV0IHNvdXJjZSBpbiBzdGFnZVNvdXJjZXMpIHtcclxuICAgICAgICAgICAgc3RhZ2VTb3VyY2VzW3NvdXJjZV0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgLTEuMyAqIHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4LDApJztcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVkaWFIb2xkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgc3RhZ2VTb3VyY2VzLnByZXZpb3VzU291cmNlKTtcclxuICAgIH0sXHJcblxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiBuZXh0IHNvdXJjZSBhcHBlbmQgaXMgbmVlZGVkIGFuZCBjYWxsIGlmIGl0IGlzXHJcbiAgICAgKiBAcGFyYW0gc2VsZlxyXG4gICAgICovXHJcbiAgICBuZXh0QXBwZW5kOiBmdW5jdGlvbiAoc2VsZikge1xyXG4gICAgICAgIGlmKCF0aGlzLnVzZUFwcGVuZE1ldGhvZChzZWxmKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5leHRTb3VyY2VDaGFuZ2VTdGFnZShzZWxmKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBjaGFuZ2Ugc3RhZ2Ugc291cmNlcyBhZnRlciBzbGlkaW5nIHRvIG5leHQgc291cmNlXHJcbiAgICAgKiBAcGFyYW0gc2VsZlxyXG4gICAgICovXHJcbiAgICBuZXh0U291cmNlQ2hhbmdlU3RhZ2U6IGZ1bmN0aW9uIChzZWxmKSB7XHJcbiAgICAgICAgY29uc3QgbWVkaWFIb2xkZXIgPSBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyO1xyXG4gICAgICAgIGNvbnN0IHN0YWdlU291cmNlcyA9IHNlbGYuZGF0YS5zdGFnZVNvdXJjZXM7XHJcblxyXG4gICAgICAgIG1lZGlhSG9sZGVyLnJlbW92ZUNoaWxkKHN0YWdlU291cmNlcy5wcmV2aW91c1NvdXJjZSk7XHJcbiAgICAgICAgc3RhZ2VTb3VyY2VzLnByZXZpb3VzU291cmNlID0gc3RhZ2VTb3VyY2VzLmN1cnJlbnRTb3VyY2U7XHJcblxyXG4gICAgICAgIHN0YWdlU291cmNlcy5jdXJyZW50U291cmNlID0gc3RhZ2VTb3VyY2VzLm5leHRTb3VyY2U7XHJcblxyXG4gICAgICAgIGlmKHNlbGYuZGF0YS5zbGlkZSA9PT0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlcykge1xyXG4gICAgICAgICAgICBzdGFnZVNvdXJjZXMubmV4dFNvdXJjZSA9IHNlbGYuZGF0YS5zb3VyY2VzWzBdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0YWdlU291cmNlcy5uZXh0U291cmNlID0gc2VsZi5kYXRhLnNvdXJjZXNbc2VsZi5kYXRhLnNsaWRlXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYuZGF0YS54UG9zaXRpb24gPSAtMS4zICogd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgZm9yIChsZXQgc291cmNlIGluIHN0YWdlU291cmNlcykge1xyXG4gICAgICAgICAgICBzdGFnZVNvdXJjZXNbc291cmNlXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyAtMS4zICogd2luZG93LmlubmVyV2lkdGggKyAncHgsMCknO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZWRpYUhvbGRlci5hcHBlbmRDaGlsZChzdGFnZVNvdXJjZXMubmV4dFNvdXJjZSk7XHJcbiAgICB9XHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZikge1xyXG5cclxuICAgIC8vdG8gdGhlc2UgZWxlbWVudHMgYXJlIGFkZGVkIG1vdXNlIGV2ZW50c1xyXG4gICAgY29uc3QgZWxlbWVudHMgPSB7XHJcbiAgICAgICAgXCJtZWRpYUhvbGRlclwiOiBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLFxyXG4gICAgICAgIFwibmF2XCI6IHNlbGYuZGF0YS5uYXZcclxuICAgIH07XHJcbiAgICAvL3NvdXJjZXMgYXJlIHRyYW5zZm9ybWVkXHJcbiAgICBjb25zdCBzb3VyY2VzID0gc2VsZi5kYXRhLnN0YWdlU291cmNlcztcclxuXHJcbiAgICBsZXQgaXNfZHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgIGxldCBtb3VzZURvd25DbGllbnRYO1xyXG4gICAgbGV0IGRpZmZlcmVuY2U7XHJcbiAgICBsZXQgc2xpZGVhQWJsZSA9IHRydWU7XHJcblxyXG4gICAgbGV0IGV2ZW50TGlzdGVuZXJzID0ge1xyXG5cclxuXHJcbiAgICAgICAgbW91c2VEb3duRXZlbnQ6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgbW91c2VEb3duQ2xpZW50WCA9IGUuY2xpZW50WDtcclxuICAgICAgICAgICAgZm9yKGxldCBlbGVtIGluIGVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50c1tlbGVtXS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LWN1cnNvci1ncmFiYmluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlzX2RyYWdnaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgZGlmZmVyZW5jZSA9IDA7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG5cclxuICAgICAgICBtb3VzZVVwRXZlbnQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgZWxlbSBpbiBlbGVtZW50cykge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHNbZWxlbV0uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1jdXJzb3ItZ3JhYmJpbmcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmRhdGEueFBvc2l0aW9uID0gc2VsZi5kYXRhLnhQb3NpdGlvbiArIGRpZmZlcmVuY2U7XHJcbiAgICAgICAgICAgIGlzX2RyYWdnaW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvL3dlIGNhbiBzbGlkZSBvbmx5IGlmIHByZXZpb3VzIGFuaW1hdGlvbiBoYXMgZmluaXNoZWRcclxuICAgICAgICAgICAgaWYoIXNsaWRlYUFibGUpIHtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgc291cmNlIGluIHNvdXJjZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VzW3NvdXJjZV0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgLTEuMyAqIHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4LDApJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygxKTtcclxuICAgICAgICAgICAgc2xpZGVhQWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gYWRkIHRyYW5zaXRpb24gaWYgdXNlciBzbGlkZSB0byBzb3VyY2VcclxuICAgICAgICAgICAgc291cmNlcy5wcmV2aW91c1NvdXJjZS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgICAgIHNvdXJjZXMuY3VycmVudFNvdXJjZS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgICAgIHNvdXJjZXMubmV4dFNvdXJjZS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gc2xpZGUgcHJldmlvdXNcclxuICAgICAgICAgICAgaWYgKGRpZmZlcmVuY2UgPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHNsaWRlIG51bWJlclxyXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5kYXRhLnNsaWRlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKHNlbGYuZGF0YS50b3RhbF9zbGlkZXMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnNsaWRlIC0gMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnhQb3NpdGlvbiA9IC0wLjEgKiB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICAgICAgICAgIHNlbGYubG9hZHNvdXJjZXMoJ3ByZXZpb3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBzb3VyY2UgaW4gc291cmNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZXNbc291cmNlXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyAtMC4xICogd2luZG93LmlubmVyV2lkdGggKyAncHgsMCknO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gc2xpZGUgbmV4dFxyXG4gICAgICAgICAgICBlbHNlIGlmIChkaWZmZXJlbmNlIDwgMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdXBkYXRlIHNsaWRlIG51bWJlclxyXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5kYXRhLnNsaWRlID09PSBzZWxmLmRhdGEudG90YWxfc2xpZGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKDEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnNsaWRlICsgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnhQb3NpdGlvbiA9IC0yLjUgKiB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICAgICAgICAgIHNlbGYubG9hZHNvdXJjZXMoJ25leHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IHNvdXJjZSBpbiBzb3VyY2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlc1tzb3VyY2VdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIC0yLjUgKiB3aW5kb3cuaW5uZXJXaWR0aCArICdweCwwKSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqICBBZnRlciB0cmFuc2l0aW9uIGZpbmlzaCBjaGFuZ2Ugc3RhZ2Ugc291cmNlcyBhZnRlciBzbGlkaW5nIHRvIG5leHQgc291cmNlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXMucHJldmlvdXNTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgc291cmNlcy5jdXJyZW50U291cmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXMubmV4dFNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdHJhbnNpdGlvbiBsYXN0IDM2Nm1zIHNvIGlmIGltYWdlIHdvbid0IGxvYWQgdGlsbCB0aGF0XHJcbiAgICAgICAgICAgICAgICAvLyB3ZSB3aWxsIG5lZWQgdG8gcmVuZGVyIGl0IGFmdGVyIGl0IGxvYWRzIG9uIG5leHRBcHBlbmQgbWV0aG9kIGF0IGFwcGVuZFNvdXJjZS5qc1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2xpZGVMb2FkID0gc2VsZi5kYXRhLnNsaWRlTG9hZDtcclxuICAgICAgICAgICAgICAgIGlmKHNsaWRlTG9hZC5sb2FkZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVMb2FkLmlzQ2FsbGluZ0FwcGVuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2xpZGVMb2FkLmxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc2xpZGVMb2FkLmlzQ2FsbGluZ0FwcGVuZCA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlmZmVyZW5jZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmFwcGVuZE1ldGhvZHMucHJldmlvdXNTb3VyY2VDaGFuZ2VTdGFnZShzZWxmKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihkaWZmZXJlbmNlIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYXBwZW5kTWV0aG9kcy5uZXh0U291cmNlQ2hhbmdlU3RhZ2Uoc2VsZik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2xpZGVhQWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0sIDM2Nik7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG5cclxuICAgICAgICBtb3VzZU1vdmVFdmVudDogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKCFpc19kcmFnZ2luZyl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGlmZmVyZW5jZSA9IGUuY2xpZW50WCAtIG1vdXNlRG93bkNsaWVudFg7XHJcbiAgICAgICAgICAgIGxldCB0b190cmFuc2Zvcm0gPSBzZWxmLmRhdGEueFBvc2l0aW9uICsgZGlmZmVyZW5jZTtcclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgc291cmNlIGluIHNvdXJjZXMpIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXNbc291cmNlXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyB0b190cmFuc2Zvcm0gKyAncHgsMCknO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgZm9yKGxldCBlbGVtIGluIGVsZW1lbnRzKSB7XHJcbiAgICAgICAgZWxlbWVudHNbZWxlbV0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZXZlbnRMaXN0ZW5lcnMubW91c2VEb3duRXZlbnQpO1xyXG4gICAgfVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBldmVudExpc3RlbmVycy5tb3VzZVVwRXZlbnQpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGV2ZW50TGlzdGVuZXJzLm1vdXNlTW92ZUV2ZW50KTtcclxufTsiLCJ3aW5kb3cuZnNMaWdodGJveE9iamVjdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLmRhdGEgPSB7XHJcbiAgICAgICAgc2xpZGU6IDEsXHJcbiAgICAgICAgdG90YWxfc2xpZGVzOiA2LFxyXG4gICAgICAgIHhQb3NpdGlvbjogLTEuMyAqIHdpbmRvdy5pbm5lcldpZHRoLFxyXG5cclxuICAgICAgICBzbGlkZUNvdW50ZXI6IHRydWUsXHJcbiAgICAgICAgc2xpZGVCdXR0b25zOiB0cnVlLFxyXG4gICAgICAgIGlzRmlyc3RUaW1lTG9hZDogZmFsc2UsXHJcbiAgICAgICAgbW92ZVNsaWRlc1ZpYURyYWc6IHRydWUsXHJcbiAgICAgICAgaXNSZW5kZXJpbmdUb29sYmFyQnV0dG9uczoge1xyXG4gICAgICAgICAgICBcImNsb3NlXCI6IHRydWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cmxzOiBbXHJcbiAgICAgICAgICAgIFwiaW1hZ2VzLzEuanBlZ1wiLFxyXG4gICAgICAgICAgICBcImltYWdlcy8yLmpwZ1wiLFxyXG4gICAgICAgICAgICBcImltYWdlcy8zLmpwZWdcIixcclxuICAgICAgICAgICAgXCJpbWFnZXMvNC5qcGVnXCIsXHJcbiAgICAgICAgICAgIFwiaW1hZ2VzLzUuanBnXCIsXHJcbiAgICAgICAgICAgIFwiaW1hZ2VzLzYuanBnXCIsXHJcbiAgICAgICAgXSxcclxuICAgICAgICBzb3VyY2VzOiBbXSxcclxuICAgICAgICByZW1lbWJlcmVkU291cmNlc0RpbWVuc2lvbnM6IFtdLFxyXG5cclxuICAgICAgICBtZWRpYUhvbGRlcjoge30sXHJcbiAgICAgICAgc3RhZ2VTb3VyY2VzOiB7XHJcbiAgICAgICAgICAgIFwicHJldmlvdXNTb3VyY2VcIjoge30sXHJcbiAgICAgICAgICAgIFwiY3VycmVudFNvdXJjZVwiOiB7fSxcclxuICAgICAgICAgICAgXCJuZXh0U291cmNlXCI6IHt9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2xpZGVMb2FkOiB7XHJcbiAgICAgICAgICAgIGxvYWRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzQ2FsbGluZ0FwcGVuZDogZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBuYXY6IHt9LFxyXG4gICAgICAgIHRvb2xiYXI6IHt9LFxyXG4gICAgICAgIHNvdXJjZUVsZW06IHt9LFxyXG4gICAgICAgIHNsaWRlQ291bnRlckVsZW06IHt9LFxyXG5cclxuICAgICAgICBvblJlc2l6ZUV2ZW50OiBuZXcgb25SZXNpemVFdmVudCgpLFxyXG4gICAgICAgIHVwZGF0ZVNsaWRlTnVtYmVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHtXaW5kb3d9XHJcbiAgICAgKi9cclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcblxyXG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG5ldyBzZWxmLmRvbSgpO1xyXG4gICAgICAgIHJlcXVpcmUoJy4vY2hhbmdlU2xpZGVCeURyYWdnaW5nLmpzJykoc2VsZik7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciBhbGwgbGlicmFyeSBlbGVtZW50c1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHRoaXMuZG9tID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJlcXVpcmUoJy4vcmVuZGVyRE9NLmpzJykoc2VsZiwgRE9NT2JqZWN0KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZzbGlnaHRib3gtY29udGFpbmVyJykucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlIGRvbSBlbGVtZW50IHdpdGggY2xhc3Nlc1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIERPTU9iamVjdCh0YWcpIHtcclxuICAgICAgICB0aGlzLmVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ2xhc3Nlc0FuZENyZWF0ZSA9IGZ1bmN0aW9uIChjbGFzc2VzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4IGluIGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzZXNbaW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9iamVjdCB0aGF0IGNvbnRhaW5zIGFsbCBhY3Rpb25zIHRoYXQgZnNsaWdodGJveCBpcyBkb2luZyBkdXJpbmcgcnVubmluZ1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIG9uUmVzaXplRXZlbnQoKSB7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5yZW1lbWJlcmRXaWR0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5yZW1lbWJlcmRIZWlnaHQgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhSG9sZGVyRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc291cmNlRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLm1lZGlhSG9sZGVyRGltZW5zaW9ucygpO1xyXG4gICAgICAgICAgICBfdGhpcy5zb3VyY2VEaW1lbnNpb25zKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTVkdJY29uIG9iamVjdCB3aXRoIGdldFNWR0ljb24gbWV0aG9kIHdoaWNoIHJldHVybiA8c3ZnPiBlbGVtZW50IHdpdGggPHBhdGg+IGNoaWxkXHJcbiAgICAgKiBAcmV0dXJucyB7RWxlbWVudH1cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLlNWR0ljb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIDxzdmc+IHdpdGggYWRkZWQgJ2ZzbGlnaHRib3gtc3ZnLWljb24nIGNsYXNzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgXCJzdmdcIik7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGNoaWxkIG9mIHN2ZyBlbXB0eSA8cGF0aD5cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgXCJwYXRoXCIpO1xyXG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICdjbGFzcycsICdmc2xpZ2h0Ym94LXN2Zy1pY29uJyk7XHJcbiAgICAgICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3ZpZXdCb3gnLCAnMCAwIDIwIDIwJyk7XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm5zIERPTSA8c3ZnPiBpY29uIGNvbnRhaW5pbmcgPHBhdGg+IGNoaWxkIHdpdGggZCBhdHRyaWJ1dGUgZnJvbSBwYXJhbWV0ZXJcclxuICAgICAgICAgKiBAcGFyYW0gZFxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZ2V0U1ZHSWNvbiA9IGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZCcsIGQpO1xyXG4gICAgICAgICAgICB0aGlzLnN2Zy5hcHBlbmRDaGlsZCh0aGlzLnBhdGgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdmc7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTbGlkZSBjb3VudGVyIG9iamVjdCAtIHVwcGVyIGxlZnQgY29ybmVyIG9mIGZzTGlnaHRib3hcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLnNsaWRlQ291bnRlckVsZW0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IG51bWJlckNvbnRhaW5lciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLW51bWJlci1jb250YWluZXInXSk7XHJcbiAgICAgICAgc2VsZi5kYXRhLnNsaWRlQ291bnRlckVsZW0gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1zbGlkZS1udW1iZXInXSk7XHJcblxyXG4gICAgICAgIHNlbGYuZGF0YS5zbGlkZUNvdW50ZXJFbGVtLmlubmVySFRNTCA9IHNlbGYuZGF0YS5zbGlkZTtcclxuICAgICAgICBzZWxmLmRhdGEuc2xpZGVDb3VudGVyRWxlbS5pZCA9ICdjdXJyZW50X3NsaWRlJztcclxuXHJcbiAgICAgICAgbGV0IHNwYWNlID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtc2xpZGUtbnVtYmVyJ10pO1xyXG4gICAgICAgIHNwYWNlLmlubmVySFRNTCA9ICcvJztcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlcyA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLXNsaWRlLW51bWJlciddKTtcclxuICAgICAgICBzbGlkZXMuaW5uZXJIVE1MID0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlcztcclxuXHJcbiAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYuZGF0YS5zbGlkZUNvdW50ZXJFbGVtKTtcclxuICAgICAgICBudW1iZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoc3BhY2UpO1xyXG4gICAgICAgIG51bWJlckNvbnRhaW5lci5hcHBlbmRDaGlsZChzbGlkZXMpO1xyXG5cclxuICAgICAgICAvLyB0aGlzIG1ldGhvZCBpcyBjYWxsZWQgYWZ0ZXIgc3dpdGNoaW5nIHNsaWRlc1xyXG4gICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlciA9IGZ1bmN0aW9uIChudW1iZXIpIHtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlID0gbnVtYmVyO1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGVDb3VudGVyRWxlbS5pbm5lckhUTUwgPSBudW1iZXI7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJTbGlkZUNvdW50ZXIgPSBmdW5jdGlvbiAobmF2KSB7XHJcbiAgICAgICAgICAgIG5hdi5hcHBlbmRDaGlsZChudW1iZXJDb250YWluZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9vbGJhciBidXR0b25cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLnRvb2xiYXJCdXR0b24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5idXR0b24gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC10b29sYmFyLWJ1dHRvbicsICdidXR0b24tc3R5bGUnXSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkU1ZHSWNvbiA9IGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgIGxldCBTVkdJY29uID0gbmV3IHNlbGYuU1ZHSWNvbigpLmdldFNWR0ljb24oZCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgU1ZHSWNvblxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYnV0dG9uKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvb2xiYXIgb2JqZWN0IHdoaWNoIGNvbnRhaW5zIHRvb2xiYXIgYnV0dG9uc1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHRoaXMudG9vbGJhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnRvb2xiYXJFbGVtID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtdG9vbGJhciddKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJEZWZhdWx0QnV0dG9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHNob3VsZFJlbmRlckJ1dHRvbnMgPSBzZWxmLmRhdGEuaXNSZW5kZXJpbmdUb29sYmFyQnV0dG9ucztcclxuXHJcbiAgICAgICAgICAgIGlmIChzaG91bGRSZW5kZXJCdXR0b25zLmNsb3NlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnV0dG9uID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtdG9vbGJhci1idXR0b24nLCAnYnV0dG9uLXN0eWxlJ10pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN2ZyA9IG5ldyBzZWxmLlNWR0ljb24oKS5nZXRTVkdJY29uKCdNIDExLjQ2OSAxMCBsIDcuMDggLTcuMDggYyAwLjQwNiAtMC40MDYgMC40MDYgLTEuMDY0IDAgLTEuNDY5IGMgLTAuNDA2IC0wLjQwNiAtMS4wNjMgLTAuNDA2IC0xLjQ2OSAwIEwgMTAgOC41MyBsIC03LjA4MSAtNy4wOCBjIC0wLjQwNiAtMC40MDYgLTEuMDY0IC0wLjQwNiAtMS40NjkgMCBjIC0wLjQwNiAwLjQwNiAtMC40MDYgMS4wNjMgMCAxLjQ2OSBMIDguNTMxIDEwIEwgMS40NSAxNy4wODEgYyAtMC40MDYgMC40MDYgLTAuNDA2IDEuMDY0IDAgMS40NjkgYyAwLjIwMyAwLjIwMyAwLjQ2OSAwLjMwNCAwLjczNSAwLjMwNCBjIDAuMjY2IDAgMC41MzEgLTAuMTAxIDAuNzM1IC0wLjMwNCBMIDEwIDExLjQ2OSBsIDcuMDggNy4wODEgYyAwLjIwMyAwLjIwMyAwLjQ2OSAwLjMwNCAwLjczNSAwLjMwNCBjIDAuMjY3IDAgMC41MzIgLTAuMTAxIDAuNzM1IC0wLjMwNCBjIDAuNDA2IC0wLjQwNiAwLjQwNiAtMS4wNjQgMCAtMS40NjkgTCAxMS40NjkgMTAgWicpO1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKHN2Zyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2xiYXJFbGVtLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlclRvb2xiYXIgPSBmdW5jdGlvbiAobmF2KSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyRGVmYXVsdEJ1dHRvbnMoKTtcclxuICAgICAgICAgICAgbmF2LmFwcGVuZENoaWxkKHRoaXMudG9vbGJhckVsZW0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQnV0dG9uVG9Ub29sYmFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgdG9vbGJhckJ1dHRvbiA9IG5ldyBzZWxmLnRvb2xiYXJCdXR0b24oKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5zbGlkZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5wcmV2aW91c1NsaWRlVmlhQnV0dG9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5kYXRhLnNsaWRlID4gMSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKHNlbGYuZGF0YS5zbGlkZSAtIDEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKHNlbGYuZGF0YS50b3RhbF9zbGlkZXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2xvYWQgc291cmNlIGJ5IGluZGV4IChhcnJheSBpcyBpbmRleGVkIGZyb20gMCBzbyB3ZSBuZWVkIHRvIGRlY3JlbWVudCBpbmRleClcclxuICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlKHNlbGYuZGF0YS51cmxzW3NlbGYuZGF0YS5zbGlkZSAtIDFdKTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5uZXh0U2xpZGVWaWFCdXR0b24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmRhdGEuc2xpZGUgPCBzZWxmLmRhdGEudG90YWxfc2xpZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnNsaWRlICsgMSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEudG90YWxfc2xpZGVzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9sb2FkIHNvdXJjZSBieSBpbmRleCAoYXJyYXkgaXMgaW5kZXhlZCBmcm9tIDAgc28gd2UgbmVlZCB0byBkZWNyZW1lbnQgaW5kZXgpXHJcbiAgICAgICAgICAgIHNlbGYubG9hZHNvdXJjZShzZWxmLmRhdGEudXJsc1tzZWxmLmRhdGEuc2xpZGUgLSAxXSk7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGl2IHRoYXQgaG9sZHMgc291cmNlIGVsZW1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tZWRpYUhvbGRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmhvbGRlciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LW1lZGlhLWhvbGRlciddKTtcclxuICAgICAgICB0aGlzLmhvbGRlci5zdHlsZS53aWR0aCA9IDMuNiAqIHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4JztcclxuICAgICAgICB0aGlzLmhvbGRlci5zdHlsZS5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgIHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50Lm1lZGlhSG9sZGVyRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5zdHlsZS53aWR0aCA9IDMgKiB3aW5kb3cuaW5uZXJXaWR0aCArICdweCc7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnJlbmRlckhvbGRlciA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuaG9sZGVyKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRob2RzIHRoYXQgYXBwZW5kcyBzb3VyY2VzIHRvIG1lZGlhSG9sZGVyIGRlcGVuZGluZyBvbiBhY3Rpb25cclxuICAgICAqIEB0eXBlIHt7aW5pdGlhbEFwcGVuZCwgcHJldmlvdXNBcHBlbmQsIG5leHRBcHBlbmR9fCp9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuYXBwZW5kTWV0aG9kcyA9IHJlcXVpcmUoJy4vYXBwZW5kU291cmNlJyk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcGxheSBzb3VyY2UgKGltYWdlcywgSFRNTDUgdmlkZW8sIFlvdVR1YmUgdmlkZW8pIGRlcGVuZGluZyBvbiBnaXZlbiB1cmwgZnJvbSB1c2VyXHJcbiAgICAgKiBPciBpZiBkaXNwbGF5IGlzIGluaXRpYWwgZGlzcGxheSAzIGluaXRpYWwgc291cmNlc1xyXG4gICAgICogSWYgdGhlcmUgYXJlID49IDMgaW5pdGlhbCBzb3VyY2VzIHRoZXJlIHdpbGwgYmUgYWx3YXlzIDMgaW4gc3RhZ2VcclxuICAgICAqIEBwYXJhbSB1cmxcclxuICAgICAqIEBwYXJhbSB0eXBlT2ZMb2FkXHJcbiAgICAgKiBAcmV0dXJucyB7bW9kdWxlLmV4cG9ydHN9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubG9hZHNvdXJjZXMgPSBmdW5jdGlvbiAodHlwZU9mTG9hZCkge1xyXG4gICAgICAgIGNvbnN0IGxvYWRzb3VyY2Vtb2R1bGUgPSByZXF1aXJlKFwiLi9sb2FkU291cmNlLmpzXCIpO1xyXG4gICAgICAgIHJldHVybiBuZXcgbG9hZHNvdXJjZW1vZHVsZShzZWxmLCBET01PYmplY3QsIHR5cGVPZkxvYWQpO1xyXG4gICAgfTtcclxufTtcclxuXHJcblxyXG4hZnVuY3Rpb24gKCkge1xyXG59KGRvY3VtZW50LCB3aW5kb3cpO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWxmLCBET01PYmplY3QsIHR5cGVPZkxvYWQpIHtcclxuXHJcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XHJcbiAgICBsZXQgY3VycmVudFNsaWRlQXJyYXlJbmRleCA9IHNlbGYuZGF0YS5zbGlkZSAtIDE7XHJcblxyXG4gICAgbGV0IHNvdXJjZURpbWVuc2lvbnMgPSBmdW5jdGlvbiAoc291cmNlRWxlbSwgc291cmNlV2lkdGgsIHNvdXJjZUhlaWdodCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgIHNvdXJjZVdpZHRoID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZVdpZHRoID0gc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQucmVtZW1iZXJkV2lkdGg7XHJcbiAgICAgICAgICAgIHNvdXJjZUhlaWdodCA9IHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50LnJlbWVtYmVyZEhlaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNvZWZmaWNpZW50ID0gc291cmNlV2lkdGggLyBzb3VyY2VIZWlnaHQ7XHJcbiAgICAgICAgY29uc3QgZGV2aWNlV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICBjb25zdCBkZXZpY2VIZWlnaHQgPSBwYXJzZUludChzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLnN0eWxlLmhlaWdodCk7XHJcbiAgICAgICAgbGV0IG5ld0hlaWdodCA9IGRldmljZVdpZHRoIC8gY29lZmZpY2llbnQ7XHJcbiAgICAgICAgaWYgKG5ld0hlaWdodCA8IGRldmljZUhlaWdodCAtIDYwKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZUVsZW0uc3R5bGUuaGVpZ2h0ID0gbmV3SGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICBzb3VyY2VFbGVtLnN0eWxlLndpZHRoID0gZGV2aWNlV2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3SGVpZ2h0ID0gZGV2aWNlSGVpZ2h0IC0gNjA7XHJcbiAgICAgICAgICAgIHNvdXJjZUVsZW0uc3R5bGUuaGVpZ2h0ID0gbmV3SGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICBzb3VyY2VFbGVtLnN0eWxlLndpZHRoID0gbmV3SGVpZ2h0ICogY29lZmZpY2llbnQgKyBcInB4XCI7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgZmFkZSBpbiBjbGFzcyBhbmQgZGltZW5zaW9uIGZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIGxldCBvbmxvYWRMaXN0ZW5lciA9IGZ1bmN0aW9uIChzb3VyY2VFbGVtLCBzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0LCBhcnJheUluZGV4KSB7XHJcblxyXG4gICAgICAgIGxldCBzb3VyY2VIb2xkZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zb3VyY2UtaG9sZGVyJ10pO1xyXG5cclxuICAgICAgICAvL25vcm1hbCBzb3VyY2UgZGltZW5zaW9ucyBuZWVkcyB0byBiZSBzdG9yZWQgaW4gYXJyYXlcclxuICAgICAgICAvL2l0IHdpbGwgYmUgbmVlZGVkIHdoZW4gbG9hZGluZyBzb3VyY2UgZnJvbSBtZW1vcnlcclxuICAgICAgICBzZWxmLmRhdGEucmVtZW1iZXJlZFNvdXJjZXNEaW1lbnNpb25zW2FycmF5SW5kZXhdID0ge1xyXG4gICAgICAgICAgICBcIndpZHRoXCI6IHNvdXJjZVdpZHRoLFxyXG4gICAgICAgICAgICBcImhlaWdodFwiOiBzb3VyY2VIZWlnaHRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2FkZCBzb21lIGZhZGUgaW4gYW5pbWF0aW9uXHJcbiAgICAgICAgc291cmNlRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LWZhZGUtaW4nKTtcclxuICAgICAgICB2b2lkIHNvdXJjZUVsZW0ub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgc291cmNlRWxlbS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LWZhZGUtaW4nKTtcclxuXHJcbiAgICAgICAgLy9hZGQgbWV0aG9kIHRoYXQgY2hhbmdlcyBzb3VyY2UgZGltZW5zaW9uIG9uIHdpbmRvdyByZXNpemVcclxuICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudC5zb3VyY2VEaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzb3VyY2VEaW1lbnNpb25zKHNvdXJjZUVsZW0sIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vc2V0IGRpbWVuc2lvbiBmb3IgdGhlIGZpcnN0IHRpbWVcclxuICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudC5zb3VyY2VEaW1lbnNpb25zKHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQpO1xyXG5cclxuXHJcbiAgICAgICAgLy8gZGltZW5zaW9ucyB3aWxsIGJlIGdpdmVuIG9ubHkgb25lIHRpbWUgc28gd2Ugd2lsbCBuZWVkIHRvIHJlbWVtYmVyIGl0XHJcbiAgICAgICAgLy8gZm9yIG5leHQgb25yZXNpemUgZXZlbnQgY2FsbHNcclxuICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudC5yZW1lbWJlcmRXaWR0aCA9IHNvdXJjZVdpZHRoO1xyXG4gICAgICAgIHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50LnJlbWVtYmVyZEhlaWdodCA9IHNvdXJjZUhlaWdodDtcclxuXHJcbiAgICAgICAgc291cmNlSG9sZGVyLmFwcGVuZENoaWxkKHNvdXJjZUVsZW0pO1xyXG4gICAgICAgIHNlbGYuZGF0YS5zb3VyY2VzW2FycmF5SW5kZXhdID0gc291cmNlSG9sZGVyO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHR5cGVPZkxvYWQpIHtcclxuICAgICAgICAgICAgY2FzZSAnaW5pdGlhbCc6XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFwcGVuZE1ldGhvZHMuaW5pdGlhbEFwcGVuZChzZWxmKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICduZXh0JzpcclxuICAgICAgICAgICAgICAgIHNlbGYuZGF0YS5zbGlkZUxvYWQubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuYXBwZW5kTWV0aG9kcy5uZXh0QXBwZW5kKHNlbGYpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3ByZXZpb3VzJzpcclxuICAgICAgICAgICAgICAgIHNlbGYuZGF0YS5zbGlkZUxvYWQubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuYXBwZW5kTWV0aG9kcy5wcmV2aW91c0FwcGVuZChzZWxmKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMubG9hZFlvdXR1YmV2aWRlbyA9IGZ1bmN0aW9uICh2aWRlb0lkLCBhcnJheUluZGV4KSB7XHJcbiAgICAgICAgbGV0IGlmcmFtZSA9IG5ldyBET01PYmplY3QoJ2lmcmFtZScpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNpbmdsZS1zb3VyY2UnXSk7XHJcbiAgICAgICAgaWZyYW1lLnNyYyA9ICcvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8nICsgdmlkZW9JZDtcclxuICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvd2Z1bGxzY3JlZW4nLCAnJyk7XHJcbiAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnZnJhbWVib3JkZXInLCAnMCcpO1xyXG4gICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcclxuICAgICAgICBvbmxvYWRMaXN0ZW5lcihpZnJhbWUsIDE5MjAsIDEwODAsIGFycmF5SW5kZXgpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5pbWFnZUxvYWQgPSBmdW5jdGlvbiAoc3JjLCBhcnJheUluZGV4KSB7XHJcbiAgICAgICAgbGV0IHNvdXJjZUVsZW0gPSBuZXcgRE9NT2JqZWN0KCdpbWcnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zaW5nbGUtc291cmNlJ10pO1xyXG4gICAgICAgIHNvdXJjZUVsZW0uc3JjID0gc3JjO1xyXG4gICAgICAgIHNvdXJjZUVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb25sb2FkTGlzdGVuZXIoc291cmNlRWxlbSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIGFycmF5SW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy52aWRlb0xvYWQgPSBmdW5jdGlvbiAoc3JjLCBhcnJheUluZGV4KSB7XHJcbiAgICAgICAgbGV0IHZpZGVvRWxlbSA9IG5ldyBET01PYmplY3QoJ3ZpZGVvJykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2luZ2xlLXNvdXJjZSddKTtcclxuICAgICAgICBsZXQgc291cmNlID0gbmV3IERPTU9iamVjdCgnc291cmNlJykuZWxlbTtcclxuICAgICAgICBzb3VyY2Uuc3JjID0gc3JjO1xyXG4gICAgICAgIHZpZGVvRWxlbS5pbm5lclRleHQgPSAnU29ycnksIHlvdXIgYnJvd3NlciBkb2VzblxcJ3Qgc3VwcG9ydCBlbWJlZGRlZCB2aWRlb3MsIDxhXFxuJyArXHJcbiAgICAgICAgICAgICcgICAgICAgICAgICBocmVmPVwiaHR0cDovL2Rvd25sb2FkLmJsZW5kZXIub3JnL3BlYWNoL2JpZ2J1Y2tidW5ueV9tb3ZpZXMvQmlnQnVja0J1bm55XzMyMHgxODAubXA0XCI+ZG93bmxvYWQ8L2E+IGFuZCB3YXRjaFxcbicgK1xyXG4gICAgICAgICAgICAnICAgICAgICB3aXRoIHlvdXIgZmF2b3JpdGUgdmlkZW8gcGxheWVyISc7XHJcblxyXG4gICAgICAgIHZpZGVvRWxlbS5zZXRBdHRyaWJ1dGUoJ2NvbnRyb2xzJywgJycpO1xyXG4gICAgICAgIHZpZGVvRWxlbS5hcHBlbmRDaGlsZChzb3VyY2UpO1xyXG4gICAgICAgIHZpZGVvRWxlbS5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb25sb2FkTGlzdGVuZXIodmlkZW9FbGVtLCB0aGlzLnZpZGVvV2lkdGgsIHRoaXMudmlkZW9IZWlnaHQsIGFycmF5SW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtID0gZnVuY3Rpb24gKHNvdXJjZVVybCkge1xyXG4gICAgICAgIGNvbnN0IHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICBjb25zdCBpbmRleE9mU291cmNlID0gc2VsZi5kYXRhLnVybHMuaW5kZXhPZihzb3VyY2VVcmwpO1xyXG5cclxuICAgICAgICBwYXJzZXIuaHJlZiA9IHNvdXJjZVVybDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0SWQoc291cmNlVXJsKSB7XHJcbiAgICAgICAgICAgIGxldCByZWdFeHAgPSAvXi4qKHlvdXR1LmJlXFwvfHZcXC98dVxcL1xcd1xcL3xlbWJlZFxcL3x3YXRjaFxcP3Y9fFxcJnY9KShbXiNcXCZcXD9dKikuKi87XHJcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IHNvdXJjZVVybC5tYXRjaChyZWdFeHApO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1hdGNoICYmIG1hdGNoWzJdLmxlbmd0aCA9PSAxMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoWzJdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdlcnJvcic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXJzZXIuaG9zdG5hbWUgPT09ICd3d3cueW91dHViZS5jb20nKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFlvdXR1YmV2aWRlbyhnZXRJZChzb3VyY2VVcmwpLCBpbmRleE9mU291cmNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgeGhyLm9ubG9hZHN0YXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IFwiYmxvYlwiO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgd2hhdCB0eXBlIG9mIGZpbGUgcHJvdmlkZWQgZnJvbSBsaW5rXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXNwb25zZVR5cGUgPSB4aHIucmVzcG9uc2UudHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlLmluZGV4T2YoJy8nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlLnNsaWNlKDAsIHJlc3BvbnNlVHlwZS5pbmRleE9mKCcvJykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlVHlwZSA9PT0gJ2ltYWdlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW1hZ2VMb2FkKFVSTC5jcmVhdGVPYmplY3RVUkwoeGhyLnJlc3BvbnNlKSwgaW5kZXhPZlNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZVR5cGUgPT09ICd2aWRlbycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnZpZGVvTG9hZChVUkwuY3JlYXRlT2JqZWN0VVJMKHhoci5yZXNwb25zZSksIGluZGV4T2ZTb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgeGhyLm9wZW4oJ2dldCcsIHNvdXJjZVVybCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHhoci5zZW5kKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICBzd2l0Y2ggKHR5cGVPZkxvYWQpIHtcclxuICAgICAgICBjYXNlICdpbml0aWFsJzpcclxuICAgICAgICAgICAgLy8gaWYgd2UgbG9hZCBpbml0aWFsbHkgd2UnbGwgbmVlZCB0byBjcmVhdGUgYWxsIHRocmVlIHN0YWdlIHNvdXJjZXNcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNlbGYuZGF0YS51cmxzW2N1cnJlbnRTbGlkZUFycmF5SW5kZXhdKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNlbGYuZGF0YS51cmxzW2N1cnJlbnRTbGlkZUFycmF5SW5kZXggKyAxXSk7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50U2xpZGVBcnJheUluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc2VsZi5kYXRhLnVybHNbc2VsZi5kYXRhLnVybHMubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKGN1cnJlbnRTbGlkZUFycmF5SW5kZXggLSAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAncHJldmlvdXMnOlxyXG4gICAgICAgICAgICAvLyBBcnJheSBpcyBpbmRleGVkIGZyb20gMCBzbyBwcmV2aW91cyBzb3VyY2UgaW5kZXggd2lsbCBiZSBzbGlkZSBudW1iZXIgLSAyXHJcblxyXG4gICAgICAgICAgICAvLyBpZiBzbGlkZSBudW1iZXIgaXMgMVxyXG4gICAgICAgICAgICAvLyB3ZSdsbCBiZSBhcHBlbmRpbmcgc291cmNlIGZyb20gdG90YWxfc2xpZGVzIGluZGV4IG5vdCBmcm9tIHNsaWRlIG51bWJlciBpbmRleCAtIDJcclxuICAgICAgICAgICAgaWYoc2VsZi5kYXRhLnNsaWRlID09PSAxKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlmIHNvdXJjZSB3YXMgcHJldmlvdXNseSBhcHBlbmRlZCBsb2FkIGl0IGZyb20gbWVtb3J5XHJcbiAgICAgICAgICAgICAgICBpZih0eXBlb2Ygc2VsZi5kYXRhLnNvdXJjZXNbc2VsZi5kYXRhLnRvdGFsX3NsaWRlc10gIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGVMb2FkLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hcHBlbmRNZXRob2RzLnByZXZpb3VzQXBwZW5kKHNlbGYpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc2VsZi5kYXRhLnVybHNbc2VsZi5kYXRhLnRvdGFsX3NsaWRlcyAtIDFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgZGF0YSB3YXMgcHJldmlvdXNseSBhcHBlbmRlZCBsb2FkIGl0IGZyb20gbWVtb3J5XHJcbiAgICAgICAgICAgIGVsc2UgaWYodHlwZW9mIHNlbGYuZGF0YS5zb3VyY2VzW3NlbGYuZGF0YS5zbGlkZSAtIDJdICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGVMb2FkLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFwcGVuZE1ldGhvZHMucHJldmlvdXNBcHBlbmQoc2VsZik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgc291cmNlIHdhc24ndCBwcmV2aW91c2x5IGFwcGVuZGVkIHdlIHdpbGwgbmVlZCB0byBjcmVhdGUgaXRcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNlbGYuZGF0YS51cmxzW3NlbGYuZGF0YS5zbGlkZSAtIDJdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ25leHQnOlxyXG4gICAgICAgICAgICAvLyBBcnJheSBpcyBpbmRleGVkIGZyb20gMCBzbyBuZXh0IHNvdXJjZSBpbmRleCB3aWxsIGJlIHNpbXBseSBzbGlkZSBudW1iZXJcclxuXHJcbiAgICAgICAgICAgIC8vIGlmIHNsaWRlIG51bWJlciBpcyBlcXVhbHMgdG90YWwgc2xpZGUgbnVtYmVyXHJcbiAgICAgICAgICAgIC8vIHdlJ2xsIGJlIGFwcGVuZGluZyBzb3VyY2UgZnJvbSBpbmRleCAwIG5vdCBmcm9tIHNsaWRlIG51bWJlciBpbmRleFxyXG4gICAgICAgICAgICBpZihzZWxmLmRhdGEuc2xpZGUgPT09IHNlbGYuZGF0YS50b3RhbF9zbGlkZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiBzb3VyY2Ugd2FzIHByZXZpb3VzbHkgYXBwZW5kZWQgbG9hZCBpdCBmcm9tIG1lbW9yeVxyXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIHNlbGYuZGF0YS5zb3VyY2VzWzBdICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlTG9hZC5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYXBwZW5kTWV0aG9kcy5uZXh0QXBwZW5kKHNlbGYpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc2VsZi5kYXRhLnVybHNbMF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiBkYXRhIHdhcyBwcmV2aW91c2x5IGFwcGVuZGVkIGxvYWQgaXQgZnJvbSBtZW1vcnlcclxuICAgICAgICAgICAgZWxzZSBpZih0eXBlb2Ygc2VsZi5kYXRhLnNvdXJjZXNbc2VsZi5kYXRhLnNsaWRlXSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlTG9hZC5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hcHBlbmRNZXRob2RzLm5leHRBcHBlbmQoc2VsZik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgc291cmNlIHdhc24ndCBwcmV2aW91c2x5IGFwcGVuZGVkIHdlIHdpbGwgbmVlZCB0byBjcmVhdGUgaXRcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNlbGYuZGF0YS51cmxzW3NlbGYuZGF0YS5zbGlkZV0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAvL2lmIGZpcnN0IHRpbWUgbG9hZCBhZGQgbG9hZGVyXHJcbiAgICBpZiAoc2VsZi5kYXRhLmlzRmlyc3RUaW1lTG9hZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJsZHMtcmluZ1wiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+JztcclxuICAgICAgICBzZWxmLmRhdGEuaXNGaXJzdFRpbWVMb2FkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qXHJcblxyXG5cclxuICAgIC8vY2hlY2sgaWYgc291cmNlIHdhcyBwcmV2aW91c2x5IGNyZWF0ZWQgYW5kXHJcbiAgICAvLyBjcmVhdGUgaXQgaWYgaXQgd2Fzbid0IG9yIGlmIGl0IHdhcyBsb2FkIGl0IGZyb20gdmFyaWFibGVcclxuICAgIGlmICh0eXBlb2Ygc2VsZi5kYXRhLnNvdXJjZXNbaW5kZXhPZlNvdXJjZVVSTF0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2xvYWRlZCBmcm9tIG1lbW9yeScpO1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZUVsZW0gPSBzZWxmLmRhdGEuc291cmNlc1tpbmRleE9mU291cmNlVVJMXTtcclxuICAgICAgICBjb25zdCByZW1lbWJlcmVkU291cmNlRGltZW5zaW9ucyA9IHNlbGYuZGF0YS5yZW1lbWJlcmVkU291cmNlc0RpbWVuc2lvbnNbaW5kZXhPZlNvdXJjZVVSTF07XHJcbiAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLmFwcGVuZENoaWxkKHNvdXJjZUVsZW0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHNvdXJjZUVsZW0pO1xyXG5cclxuICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudC5zb3VyY2VEaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzb3VyY2VEaW1lbnNpb25zKFxyXG4gICAgICAgICAgICAgICAgc291cmNlRWxlbSxcclxuICAgICAgICAgICAgICAgIHJlbWVtYmVyZWRTb3VyY2VEaW1lbnNpb25zLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgcmVtZW1iZXJlZFNvdXJjZURpbWVuc2lvbnMuaGVpZ2h0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudC5zb3VyY2VEaW1lbnNpb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgKi9cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWxmLCBET01PYmplY3QpIHtcclxuICAgIGxldCBwcml2YXRlTWV0aG9kcyA9IHtcclxuICAgICAgICByZW5kZXJOYXY6IGZ1bmN0aW9uIChjb250YWluZXIpIHtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLm5hdiA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LW5hdiddKTtcclxuICAgICAgICAgICAgbmV3IHNlbGYudG9vbGJhcigpLnJlbmRlclRvb2xiYXIoc2VsZi5kYXRhLm5hdik7XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IHhkYnRuID0gbmV3IERPTU9iamVjdCgnYScpLmVsZW07XHJcbiAgICAgICAgICAgIHhkYnRuLmlubmVySFRNTCA9ICdoaWRlJztcclxuICAgICAgICAgICAgeGRidG4uc3R5bGUuekluZGV4ID0gJzk5OTk5OTknO1xyXG4gICAgICAgICAgICB4ZGJ0bi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZi5kYXRhLnNvdXJjZXNbMF0pO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgIC8vIGZvcihsZXQgc291cmNlIGluIHNlbGYuZGF0YS5zb3VyY2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5hcHBlbmRDaGlsZChzZWxmLmRhdGEuc291cmNlc1swXSk7XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLm5hdi5hcHBlbmRDaGlsZCh4ZGJ0bik7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZi5kYXRhLnNsaWRlQ291bnRlciA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbmV3IHNlbGYuc2xpZGVDb3VudGVyRWxlbSgpLnJlbmRlclNsaWRlQ291bnRlcihzZWxmLmRhdGEubmF2KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYuZGF0YS5uYXYpO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlclNsaWRlQnV0dG9uczogZnVuY3Rpb24gKGNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5kYXRhLnNsaWRlQnV0dG9ucyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9yZW5kZXIgbGVmdCBidG5cclxuICAgICAgICAgICAgbGV0IGxlZnRfYnRuX2NvbnRhaW5lciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLWJ0bi1jb250YWluZXInXSk7XHJcbiAgICAgICAgICAgIGxldCBidG4gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4nLCAnYnV0dG9uLXN0eWxlJ10pO1xyXG4gICAgICAgICAgICBidG4uYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBuZXcgc2VsZi5TVkdJY29uKCkuZ2V0U1ZHSWNvbignTTguMzg4LDEwLjA0OWw0Ljc2LTQuODczYzAuMzAzLTAuMzEsMC4yOTctMC44MDQtMC4wMTItMS4xMDVjLTAuMzA5LTAuMzA0LTAuODAzLTAuMjkzLTEuMTA1LDAuMDEyTDYuNzI2LDkuNTE2Yy0wLjMwMywwLjMxLTAuMjk2LDAuODA1LDAuMDEyLDEuMTA1bDUuNDMzLDUuMzA3YzAuMTUyLDAuMTQ4LDAuMzUsMC4yMjMsMC41NDcsMC4yMjNjMC4yMDMsMCwwLjQwNi0wLjA4LDAuNTU5LTAuMjM2YzAuMzAzLTAuMzA5LDAuMjk1LTAuODAzLTAuMDEyLTEuMTA0TDguMzg4LDEwLjA0OXonKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGVmdF9idG5fY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNsaWRlIG9iamVjdCB0aGF0IGNvbnRhaW5zIGNoYW5naW5nIHNsaWRlIG1ldGhvZHNcclxuICAgICAgICAgICAgbGV0IHNsaWRlID0gbmV3IHNlbGYuc2xpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vZ28gdG8gcHJldmlvdXMgc2xpZGUgb25jbGlja1xyXG4gICAgICAgICAgICBsZWZ0X2J0bl9jb250YWluZXIub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlLnByZXZpb3VzU2xpZGVWaWFCdXR0b24oKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxlZnRfYnRuX2NvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgICAgICAgICBsZXQgcmlnaHRfYnRuX2NvbnRhaW5lciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLWJ0bi1jb250YWluZXInLCAnZnNsaWdodGJveC1zbGlkZS1idG4tcmlnaHQtY29udGFpbmVyJ10pO1xyXG4gICAgICAgICAgICBidG4gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4nLCAnYnV0dG9uLXN0eWxlJ10pO1xyXG4gICAgICAgICAgICBidG4uYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBuZXcgc2VsZi5TVkdJY29uKCkuZ2V0U1ZHSWNvbignTTExLjYxMSwxMC4wNDlsLTQuNzYtNC44NzNjLTAuMzAzLTAuMzEtMC4yOTctMC44MDQsMC4wMTItMS4xMDVjMC4zMDktMC4zMDQsMC44MDMtMC4yOTMsMS4xMDUsMC4wMTJsNS4zMDYsNS40MzNjMC4zMDQsMC4zMSwwLjI5NiwwLjgwNS0wLjAxMiwxLjEwNUw3LjgzLDE1LjkyOGMtMC4xNTIsMC4xNDgtMC4zNSwwLjIyMy0wLjU0NywwLjIyM2MtMC4yMDMsMC0wLjQwNi0wLjA4LTAuNTU5LTAuMjM2Yy0wLjMwMy0wLjMwOS0wLjI5NS0wLjgwMywwLjAxMi0xLjEwNEwxMS42MTEsMTAuMDQ5eicpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvL2dvIHRvIG5leHQgc2xpZGUgb25jbGlja1xyXG4gICAgICAgICAgICByaWdodF9idG5fY29udGFpbmVyLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZS5uZXh0U2xpZGVWaWFCdXR0b24oKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmlnaHRfYnRuX2NvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmlnaHRfYnRuX2NvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL2Rpc2FibGUgc2Nyb2xsaW5nXHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtb3BlbicpO1xyXG5cclxuICAgIC8vY3JlYXRlIGNvbnRhaW5lclxyXG4gICAgbGV0IGNvbnRhaW5lciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LWNvbnRhaW5lciddKTtcclxuICAgIGNvbnRhaW5lci5pZCA9IFwiZnNsaWdodGJveC1jb250YWluZXJcIjtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuXHJcbiAgICAvL3JlbmRlciBzbGlkZSBidXR0b25zIGFuZCBuYXYodG9vbGJhcilcclxuICAgIHByaXZhdGVNZXRob2RzLnJlbmRlck5hdihjb250YWluZXIpO1xyXG4gICAgcHJpdmF0ZU1ldGhvZHMucmVuZGVyU2xpZGVCdXR0b25zKGNvbnRhaW5lcik7XHJcblxyXG4gICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyID0gbmV3IHNlbGYubWVkaWFIb2xkZXIoKTtcclxuICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5yZW5kZXJIb2xkZXIoY29udGFpbmVyKTtcclxuXHJcbiAgICBzZWxmLmRhdGEuaXNmaXJzdFRpbWVMb2FkID0gdHJ1ZTtcclxuICAgIHNlbGYubG9hZHNvdXJjZXMoJ2luaXRpYWwnKTtcclxufTsiXX0=
