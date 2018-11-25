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

    previousAppend: function () {

    },


    /**
     * Loading after transition should be called first
     * but if image won't load till that this method will be called to append next source when it's loaded
     * @param self
     */
    nextAppend: function (self) {

        const nextLoad = self.data.nextLoad;
        if(!nextLoad.loaded || !nextLoad.isCallingAppend) {
            return;
        }
        nextLoad.loaded = false;
        nextLoad.isCallingAppend = false;

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

        mediaHolder.insertAdjacentElement('afterbegin', stageSources.previousSource);
        stageSources.currentSource = stageSources.nextSource;
        stageSources.nextSource = self.data.sources[self.data.slide];

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

            if (difference > 0) {

                //update slide number
                if(self.data.slide === 1) {
                    self.data.updateSlideNumber(self.data.total_slides);
                } else {
                    self.data.updateSlideNumber(self.data.slide - 1);
                }

                self.data.xPosition = -0.1 * window.innerWidth;

                sources.previousSource.classList.add('fslightbox-transform-transition');
                sources.currentSource.classList.add('fslightbox-transform-transition');
                sources.nextSource.classList.add('fslightbox-transform-transition');

                for(let source in sources) {
                    sources[source].style.transform = 'translate(' + -0.1 * window.innerWidth + 'px,0)';
                }

                setTimeout(function () {
                    sources.previousSource.classList.remove('fslightbox-transform-transition');
                    sources.currentSource.classList.remove('fslightbox-transform-transition');
                    sources.nextSource.classList.remove('fslightbox-transform-transition');
                }, 366);
            }

            else if (difference < 0) {

                //update slide number
                if(self.data.slide === self.data.total_slides) {
                    self.data.updateSlideNumber(1);
                } else {
                    self.data.updateSlideNumber(self.data.slide + 1);
                }

                self.data.xPosition = -2.5 * window.innerWidth;
                self.loadsources('next');

                sources.previousSource.classList.add('fslightbox-transform-transition');
                sources.currentSource.classList.add('fslightbox-transform-transition');
                sources.nextSource.classList.add('fslightbox-transform-transition');

                for(let source in sources) {
                    sources[source].style.transform = 'translate(' + -2.5 * window.innerWidth + 'px,0)';
                }


                /**
                 *  After transition finish change stage sources after sliding to next source
                 */
                setTimeout(function () {

                    // disable animation when not sliding
                    sources.previousSource.classList.remove('fslightbox-transform-transition');
                    sources.currentSource.classList.remove('fslightbox-transform-transition');
                    sources.nextSource.classList.remove('fslightbox-transform-transition');


                    // transition last 366ms so if image won't load till that
                    // we will need to render it after it loads on nextAppend method at appendSource.js
                    const nextLoad = self.data.nextLoad;
                    if(nextLoad.loaded === false) {
                        nextLoad.isCallingAppend = true;
                        return;
                    }
                    nextLoad.loaded = false;
                    nextLoad.isCallingAppend = false;

                    self.appendMethods.nextSourceChangeStage(self);
                }, 366);
            }
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
            "images/5.jpg",
            "images/4.jpeg",
            "images/3.jpeg",
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
        previousLoad: {
            loaded: false,
            isCallingAppend: false
        },
        nextLoad: {
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
                self.data.nextLoad.loaded = true;
                self.appendMethods.nextAppend(self);
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
        console.log(source.offsetWidth);
        console.log(source.videoWidth);
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

    if (typeOfLoad === 'initial') {
        this.createSourceElem(self.data.urls[currentSlideArrayIndex]);
        this.createSourceElem(self.data.urls[currentSlideArrayIndex + 1]);
        if (currentSlideArrayIndex === 0) {
            this.createSourceElem(self.data.urls[self.data.urls.length - 1]);
        } else {
            this.createSourceElem(currentSlideArrayIndex - 1);
        }
    }

    if (typeOfLoad === 'next') {
        this.createSourceElem(self.data.urls[self.data.slide]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwZW5kU291cmNlLmpzIiwic3JjL2pzL2NoYW5nZVNsaWRlQnlEcmFnZ2luZy5qcyIsInNyYy9qcy9pbmRleC5qcyIsInNyYy9qcy9sb2FkU291cmNlLmpzIiwic3JjL2pzL3JlbmRlckRPTS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICBpbml0aWFsQXBwZW5kOiBmdW5jdGlvbiAoc2VsZikge1xyXG5cclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IHNvdXJjZSBpbiBzZWxmLmRhdGEuc291cmNlcykge1xyXG4gICAgICAgICAgICBpZiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY291bnQgIT09IDMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvdW50ID09PSAzKSB7XHJcblxyXG4gICAgICAgICAgICAvL2luZGV4IG9mIHRoZSBjdXJyZW50IGVsZW1lbnQgc3RvcmVkIGluIG1lbW9yeSBpcyBqdXN0IGRlY3JlbWVudGVkIHNsaWRlIG51bWJlclxyXG4gICAgICAgICAgICBsZXQgYXJyYXlJbmRleCA9IHNlbGYuZGF0YS5zbGlkZSAtIDE7XHJcbiAgICAgICAgICAgIGxldCBsYXN0QXJyYXlJbmRleCA9IHNlbGYuZGF0YS51cmxzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZXMgPSBzZWxmLmRhdGEuc291cmNlcztcclxuICAgICAgICAgICAgY29uc3Qgc3RhZ2VTb3VyY2VzID0gc2VsZi5kYXRhLnN0YWdlU291cmNlcztcclxuXHJcbiAgICAgICAgICAgIC8vcHJldmlvdXMgc291cmNlXHJcbiAgICAgICAgICAgIGlmIChhcnJheUluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFnZVNvdXJjZXMucHJldmlvdXNTb3VyY2UgPSBzb3VyY2VzW2xhc3RBcnJheUluZGV4XTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0YWdlU291cmNlcy5wcmV2aW91c1NvdXJjZSA9IHNvdXJjZXNbYXJyYXlJbmRleCAtIDFdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy9jdXJyZW50IHNvdXJjZVxyXG4gICAgICAgICAgICBzdGFnZVNvdXJjZXMuY3VycmVudFNvdXJjZSA9IHNvdXJjZXNbYXJyYXlJbmRleF07XHJcblxyXG4gICAgICAgICAgICAvL25leHQgc291cmNlXHJcbiAgICAgICAgICAgIGlmIChhcnJheUluZGV4ID09PSBsYXN0QXJyYXlJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgc3RhZ2VTb3VyY2VzLm5leHRTb3VyY2UgPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RhZ2VTb3VyY2VzLm5leHRTb3VyY2UgPSBzb3VyY2VzW2FycmF5SW5kZXggKyAxXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgc291cmNlIGluIHN0YWdlU291cmNlcykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5hcHBlbmRDaGlsZChzdGFnZVNvdXJjZXNbc291cmNlXSk7XHJcbiAgICAgICAgICAgICAgICBzdGFnZVNvdXJjZXNbc291cmNlXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyAtMS4zICogd2luZG93LmlubmVyV2lkdGggKyAncHgsMCknO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBwcmV2aW91c0FwcGVuZDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZGluZyBhZnRlciB0cmFuc2l0aW9uIHNob3VsZCBiZSBjYWxsZWQgZmlyc3RcclxuICAgICAqIGJ1dCBpZiBpbWFnZSB3b24ndCBsb2FkIHRpbGwgdGhhdCB0aGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCB0byBhcHBlbmQgbmV4dCBzb3VyY2Ugd2hlbiBpdCdzIGxvYWRlZFxyXG4gICAgICogQHBhcmFtIHNlbGZcclxuICAgICAqL1xyXG4gICAgbmV4dEFwcGVuZDogZnVuY3Rpb24gKHNlbGYpIHtcclxuXHJcbiAgICAgICAgY29uc3QgbmV4dExvYWQgPSBzZWxmLmRhdGEubmV4dExvYWQ7XHJcbiAgICAgICAgaWYoIW5leHRMb2FkLmxvYWRlZCB8fCAhbmV4dExvYWQuaXNDYWxsaW5nQXBwZW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV4dExvYWQubG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgbmV4dExvYWQuaXNDYWxsaW5nQXBwZW5kID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMubmV4dFNvdXJjZUNoYW5nZVN0YWdlKHNlbGYpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBjaGFuZ2Ugc3RhZ2Ugc291cmNlcyBhZnRlciBzbGlkaW5nIHRvIG5leHQgc291cmNlXHJcbiAgICAgKiBAcGFyYW0gc2VsZlxyXG4gICAgICovXHJcbiAgICBuZXh0U291cmNlQ2hhbmdlU3RhZ2U6IGZ1bmN0aW9uIChzZWxmKSB7XHJcbiAgICAgICAgY29uc3QgbWVkaWFIb2xkZXIgPSBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyO1xyXG4gICAgICAgIGNvbnN0IHN0YWdlU291cmNlcyA9IHNlbGYuZGF0YS5zdGFnZVNvdXJjZXM7XHJcblxyXG4gICAgICAgIG1lZGlhSG9sZGVyLnJlbW92ZUNoaWxkKHN0YWdlU291cmNlcy5wcmV2aW91c1NvdXJjZSk7XHJcbiAgICAgICAgc3RhZ2VTb3VyY2VzLnByZXZpb3VzU291cmNlID0gc3RhZ2VTb3VyY2VzLmN1cnJlbnRTb3VyY2U7XHJcblxyXG4gICAgICAgIG1lZGlhSG9sZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIHN0YWdlU291cmNlcy5wcmV2aW91c1NvdXJjZSk7XHJcbiAgICAgICAgc3RhZ2VTb3VyY2VzLmN1cnJlbnRTb3VyY2UgPSBzdGFnZVNvdXJjZXMubmV4dFNvdXJjZTtcclxuICAgICAgICBzdGFnZVNvdXJjZXMubmV4dFNvdXJjZSA9IHNlbGYuZGF0YS5zb3VyY2VzW3NlbGYuZGF0YS5zbGlkZV07XHJcblxyXG4gICAgICAgIHNlbGYuZGF0YS54UG9zaXRpb24gPSAtMS4zICogd2luZG93LmlubmVyV2lkdGg7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHNvdXJjZSBpbiBzdGFnZVNvdXJjZXMpIHtcclxuICAgICAgICAgICAgc3RhZ2VTb3VyY2VzW3NvdXJjZV0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgLTEuMyAqIHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4LDApJztcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVkaWFIb2xkZXIuYXBwZW5kQ2hpbGQoc3RhZ2VTb3VyY2VzLm5leHRTb3VyY2UpO1xyXG4gICAgfVxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlbGYpIHtcclxuXHJcbiAgICAvL3RvIHRoZXNlIGVsZW1lbnRzIGFyZSBhZGRlZCBtb3VzZSBldmVudHNcclxuICAgIGNvbnN0IGVsZW1lbnRzID0ge1xyXG4gICAgICAgIFwibWVkaWFIb2xkZXJcIjogc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlcixcclxuICAgICAgICBcIm5hdlwiOiBzZWxmLmRhdGEubmF2XHJcbiAgICB9O1xyXG4gICAgLy9zb3VyY2VzIGFyZSB0cmFuc2Zvcm1lZFxyXG4gICAgY29uc3Qgc291cmNlcyA9IHNlbGYuZGF0YS5zdGFnZVNvdXJjZXM7XHJcblxyXG4gICAgbGV0IGlzX2RyYWdnaW5nID0gZmFsc2U7XHJcbiAgICBsZXQgbW91c2VEb3duQ2xpZW50WDtcclxuICAgIGxldCBkaWZmZXJlbmNlO1xyXG5cclxuICAgIGxldCBldmVudExpc3RlbmVycyA9IHtcclxuXHJcbiAgICAgICAgbW91c2VEb3duRXZlbnQ6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgbW91c2VEb3duQ2xpZW50WCA9IGUuY2xpZW50WDtcclxuICAgICAgICAgICAgZm9yKGxldCBlbGVtIGluIGVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50c1tlbGVtXS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LWN1cnNvci1ncmFiYmluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlzX2RyYWdnaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgZGlmZmVyZW5jZSA9IDA7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIG1vdXNlVXBFdmVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmb3IobGV0IGVsZW0gaW4gZWxlbWVudHMpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzW2VsZW1dLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtY3Vyc29yLWdyYWJiaW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5kYXRhLnhQb3NpdGlvbiA9IHNlbGYuZGF0YS54UG9zaXRpb24gKyBkaWZmZXJlbmNlO1xyXG4gICAgICAgICAgICBpc19kcmFnZ2luZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRpZmZlcmVuY2UgPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy91cGRhdGUgc2xpZGUgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICBpZihzZWxmLmRhdGEuc2xpZGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnRvdGFsX3NsaWRlcyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEuc2xpZGUgLSAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEueFBvc2l0aW9uID0gLTAuMSAqIHdpbmRvdy5pbm5lcldpZHRoO1xyXG5cclxuICAgICAgICAgICAgICAgIHNvdXJjZXMucHJldmlvdXNTb3VyY2UuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgc291cmNlcy5jdXJyZW50U291cmNlLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXMubmV4dFNvdXJjZS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBzb3VyY2UgaW4gc291cmNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZXNbc291cmNlXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyAtMC4xICogd2luZG93LmlubmVyV2lkdGggKyAncHgsMCknO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZXMucHJldmlvdXNTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZXMuY3VycmVudFNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlcy5uZXh0U291cmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgIH0sIDM2Nik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRpZmZlcmVuY2UgPCAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy91cGRhdGUgc2xpZGUgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICBpZihzZWxmLmRhdGEuc2xpZGUgPT09IHNlbGYuZGF0YS50b3RhbF9zbGlkZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEudXBkYXRlU2xpZGVOdW1iZXIoMSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEuc2xpZGUgKyAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEueFBvc2l0aW9uID0gLTIuNSAqIHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlcygnbmV4dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNvdXJjZXMucHJldmlvdXNTb3VyY2UuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgc291cmNlcy5jdXJyZW50U291cmNlLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXMubmV4dFNvdXJjZS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBzb3VyY2UgaW4gc291cmNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZXNbc291cmNlXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyAtMi41ICogd2luZG93LmlubmVyV2lkdGggKyAncHgsMCknO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqICBBZnRlciB0cmFuc2l0aW9uIGZpbmlzaCBjaGFuZ2Ugc3RhZ2Ugc291cmNlcyBhZnRlciBzbGlkaW5nIHRvIG5leHQgc291cmNlXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBkaXNhYmxlIGFuaW1hdGlvbiB3aGVuIG5vdCBzbGlkaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlcy5wcmV2aW91c1NvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlcy5jdXJyZW50U291cmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VzLm5leHRTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdHJhbnNpdGlvbiBsYXN0IDM2Nm1zIHNvIGlmIGltYWdlIHdvbid0IGxvYWQgdGlsbCB0aGF0XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gd2Ugd2lsbCBuZWVkIHRvIHJlbmRlciBpdCBhZnRlciBpdCBsb2FkcyBvbiBuZXh0QXBwZW5kIG1ldGhvZCBhdCBhcHBlbmRTb3VyY2UuanNcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0TG9hZCA9IHNlbGYuZGF0YS5uZXh0TG9hZDtcclxuICAgICAgICAgICAgICAgICAgICBpZihuZXh0TG9hZC5sb2FkZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRMb2FkLmlzQ2FsbGluZ0FwcGVuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dExvYWQubG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dExvYWQuaXNDYWxsaW5nQXBwZW5kID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYXBwZW5kTWV0aG9kcy5uZXh0U291cmNlQ2hhbmdlU3RhZ2Uoc2VsZik7XHJcbiAgICAgICAgICAgICAgICB9LCAzNjYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIG1vdXNlTW92ZUV2ZW50OiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoIWlzX2RyYWdnaW5nKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkaWZmZXJlbmNlID0gZS5jbGllbnRYIC0gbW91c2VEb3duQ2xpZW50WDtcclxuICAgICAgICAgICAgbGV0IHRvX3RyYW5zZm9ybSA9IHNlbGYuZGF0YS54UG9zaXRpb24gKyBkaWZmZXJlbmNlO1xyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBzb3VyY2UgaW4gc291cmNlcykge1xyXG4gICAgICAgICAgICAgICAgc291cmNlc1tzb3VyY2VdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIHRvX3RyYW5zZm9ybSArICdweCwwKSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBmb3IobGV0IGVsZW0gaW4gZWxlbWVudHMpIHtcclxuICAgICAgICBlbGVtZW50c1tlbGVtXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBldmVudExpc3RlbmVycy5tb3VzZURvd25FdmVudCk7XHJcbiAgICB9XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGV2ZW50TGlzdGVuZXJzLm1vdXNlVXBFdmVudCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZXZlbnRMaXN0ZW5lcnMubW91c2VNb3ZlRXZlbnQpO1xyXG59OyIsIndpbmRvdy5mc0xpZ2h0Ym94T2JqZWN0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHRoaXMuZGF0YSA9IHtcclxuICAgICAgICBzbGlkZTogMSxcclxuICAgICAgICB0b3RhbF9zbGlkZXM6IDYsXHJcbiAgICAgICAgeFBvc2l0aW9uOiAtMS4zICogd2luZG93LmlubmVyV2lkdGgsXHJcblxyXG4gICAgICAgIHNsaWRlQ291bnRlcjogdHJ1ZSxcclxuICAgICAgICBzbGlkZUJ1dHRvbnM6IHRydWUsXHJcbiAgICAgICAgaXNGaXJzdFRpbWVMb2FkOiBmYWxzZSxcclxuICAgICAgICBtb3ZlU2xpZGVzVmlhRHJhZzogdHJ1ZSxcclxuICAgICAgICBpc1JlbmRlcmluZ1Rvb2xiYXJCdXR0b25zOiB7XHJcbiAgICAgICAgICAgIFwiY2xvc2VcIjogdHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVybHM6IFtcclxuICAgICAgICAgICAgXCJpbWFnZXMvMS5qcGVnXCIsXHJcbiAgICAgICAgICAgIFwiaW1hZ2VzLzIuanBnXCIsXHJcbiAgICAgICAgICAgIFwiaW1hZ2VzLzUuanBnXCIsXHJcbiAgICAgICAgICAgIFwiaW1hZ2VzLzQuanBlZ1wiLFxyXG4gICAgICAgICAgICBcImltYWdlcy8zLmpwZWdcIixcclxuICAgICAgICAgICAgXCJpbWFnZXMvNi5qcGdcIixcclxuICAgICAgICBdLFxyXG4gICAgICAgIHNvdXJjZXM6IFtdLFxyXG4gICAgICAgIHJlbWVtYmVyZWRTb3VyY2VzRGltZW5zaW9uczogW10sXHJcblxyXG4gICAgICAgIG1lZGlhSG9sZGVyOiB7fSxcclxuICAgICAgICBzdGFnZVNvdXJjZXM6IHtcclxuICAgICAgICAgICAgXCJwcmV2aW91c1NvdXJjZVwiOiB7fSxcclxuICAgICAgICAgICAgXCJjdXJyZW50U291cmNlXCI6IHt9LFxyXG4gICAgICAgICAgICBcIm5leHRTb3VyY2VcIjoge30sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcmV2aW91c0xvYWQ6IHtcclxuICAgICAgICAgICAgbG9hZGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgaXNDYWxsaW5nQXBwZW5kOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbmV4dExvYWQ6IHtcclxuICAgICAgICAgICAgbG9hZGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgaXNDYWxsaW5nQXBwZW5kOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG5hdjoge30sXHJcbiAgICAgICAgdG9vbGJhcjoge30sXHJcbiAgICAgICAgc291cmNlRWxlbToge30sXHJcbiAgICAgICAgc2xpZGVDb3VudGVyRWxlbToge30sXHJcblxyXG4gICAgICAgIG9uUmVzaXplRXZlbnQ6IG5ldyBvblJlc2l6ZUV2ZW50KCksXHJcbiAgICAgICAgdXBkYXRlU2xpZGVOdW1iZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge1dpbmRvd31cclxuICAgICAqL1xyXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuXHJcbiAgICB0aGlzLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbmV3IHNlbGYuZG9tKCk7XHJcbiAgICAgICAgcmVxdWlyZSgnLi9jaGFuZ2VTbGlkZUJ5RHJhZ2dpbmcuanMnKShzZWxmKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIGFsbCBsaWJyYXJ5IGVsZW1lbnRzXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgdGhpcy5kb20gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmVxdWlyZSgnLi9yZW5kZXJET00uanMnKShzZWxmLCBET01PYmplY3QpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnNsaWdodGJveC1jb250YWluZXInKS5yZW1vdmUoKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGUgZG9tIGVsZW1lbnQgd2l0aCBjbGFzc2VzXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gRE9NT2JqZWN0KHRhZykge1xyXG4gICAgICAgIHRoaXMuZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRDbGFzc2VzQW5kQ3JlYXRlID0gZnVuY3Rpb24gKGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggaW4gY2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3Nlc1tpbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsZW1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JqZWN0IHRoYXQgY29udGFpbnMgYWxsIGFjdGlvbnMgdGhhdCBmc2xpZ2h0Ym94IGlzIGRvaW5nIGR1cmluZyBydW5uaW5nXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gb25SZXNpemVFdmVudCgpIHtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLnJlbWVtYmVyZFdpZHRoID0gMDtcclxuICAgICAgICB0aGlzLnJlbWVtYmVyZEhlaWdodCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMubWVkaWFIb2xkZXJEaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zb3VyY2VEaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMubWVkaWFIb2xkZXJEaW1lbnNpb25zKCk7XHJcbiAgICAgICAgICAgIF90aGlzLnNvdXJjZURpbWVuc2lvbnMoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNWR0ljb24gb2JqZWN0IHdpdGggZ2V0U1ZHSWNvbiBtZXRob2Qgd2hpY2ggcmV0dXJuIDxzdmc+IGVsZW1lbnQgd2l0aCA8cGF0aD4gY2hpbGRcclxuICAgICAqIEByZXR1cm5zIHtFbGVtZW50fVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHRoaXMuU1ZHSWNvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgPHN2Zz4gd2l0aCBhZGRlZCAnZnNsaWdodGJveC1zdmctaWNvbicgY2xhc3NcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBcInN2Z1wiKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogY2hpbGQgb2Ygc3ZnIGVtcHR5IDxwYXRoPlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMucGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBcInBhdGhcIik7XHJcbiAgICAgICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2NsYXNzJywgJ2ZzbGlnaHRib3gtc3ZnLWljb24nKTtcclxuICAgICAgICB0aGlzLnN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndmlld0JveCcsICcwIDAgMjAgMjAnKTtcclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHVybnMgRE9NIDxzdmc+IGljb24gY29udGFpbmluZyA8cGF0aD4gY2hpbGQgd2l0aCBkIGF0dHJpYnV0ZSBmcm9tIHBhcmFtZXRlclxyXG4gICAgICAgICAqIEBwYXJhbSBkXHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5nZXRTVkdJY29uID0gZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXRoLnNldEF0dHJpYnV0ZU5TKG51bGwsICdkJywgZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3ZnLmFwcGVuZENoaWxkKHRoaXMucGF0aCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN2ZztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNsaWRlIGNvdW50ZXIgb2JqZWN0IC0gdXBwZXIgbGVmdCBjb3JuZXIgb2YgZnNMaWdodGJveFxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHRoaXMuc2xpZGVDb3VudGVyRWxlbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbnVtYmVyQ29udGFpbmVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtbnVtYmVyLWNvbnRhaW5lciddKTtcclxuICAgICAgICBzZWxmLmRhdGEuc2xpZGVDb3VudGVyRWxlbSA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLXNsaWRlLW51bWJlciddKTtcclxuXHJcbiAgICAgICAgc2VsZi5kYXRhLnNsaWRlQ291bnRlckVsZW0uaW5uZXJIVE1MID0gc2VsZi5kYXRhLnNsaWRlO1xyXG4gICAgICAgIHNlbGYuZGF0YS5zbGlkZUNvdW50ZXJFbGVtLmlkID0gJ2N1cnJlbnRfc2xpZGUnO1xyXG5cclxuICAgICAgICBsZXQgc3BhY2UgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1zbGlkZS1udW1iZXInXSk7XHJcbiAgICAgICAgc3BhY2UuaW5uZXJIVE1MID0gJy8nO1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVzID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtc2xpZGUtbnVtYmVyJ10pO1xyXG4gICAgICAgIHNsaWRlcy5pbm5lckhUTUwgPSBzZWxmLmRhdGEudG90YWxfc2xpZGVzO1xyXG5cclxuICAgICAgICBudW1iZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5kYXRhLnNsaWRlQ291bnRlckVsZW0pO1xyXG4gICAgICAgIG51bWJlckNvbnRhaW5lci5hcHBlbmRDaGlsZChzcGFjZSk7XHJcbiAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNsaWRlcyk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCBhZnRlciBzd2l0Y2hpbmcgc2xpZGVzXHJcbiAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyID0gZnVuY3Rpb24gKG51bWJlcikge1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGUgPSBudW1iZXI7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5zbGlkZUNvdW50ZXJFbGVtLmlubmVySFRNTCA9IG51bWJlcjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlclNsaWRlQ291bnRlciA9IGZ1bmN0aW9uIChuYXYpIHtcclxuICAgICAgICAgICAgbmF2LmFwcGVuZENoaWxkKG51bWJlckNvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb29sYmFyIGJ1dHRvblxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHRoaXMudG9vbGJhckJ1dHRvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmJ1dHRvbiA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXRvb2xiYXItYnV0dG9uJywgJ2J1dHRvbi1zdHlsZSddKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRTVkdJY29uID0gZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgbGV0IFNWR0ljb24gPSBuZXcgc2VsZi5TVkdJY29uKCkuZ2V0U1ZHSWNvbihkKTtcclxuICAgICAgICAgICAgdGhpcy5idXR0b24uYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBTVkdJY29uXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5idXR0b24pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9vbGJhciBvYmplY3Qgd2hpY2ggY29udGFpbnMgdG9vbGJhciBidXR0b25zXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgdGhpcy50b29sYmFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMudG9vbGJhckVsZW0gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC10b29sYmFyJ10pO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlckRlZmF1bHRCdXR0b25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgc2hvdWxkUmVuZGVyQnV0dG9ucyA9IHNlbGYuZGF0YS5pc1JlbmRlcmluZ1Rvb2xiYXJCdXR0b25zO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNob3VsZFJlbmRlckJ1dHRvbnMuY2xvc2UgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBidXR0b24gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC10b29sYmFyLWJ1dHRvbicsICdidXR0b24tc3R5bGUnXSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3ZnID0gbmV3IHNlbGYuU1ZHSWNvbigpLmdldFNWR0ljb24oJ00gMTEuNDY5IDEwIGwgNy4wOCAtNy4wOCBjIDAuNDA2IC0wLjQwNiAwLjQwNiAtMS4wNjQgMCAtMS40NjkgYyAtMC40MDYgLTAuNDA2IC0xLjA2MyAtMC40MDYgLTEuNDY5IDAgTCAxMCA4LjUzIGwgLTcuMDgxIC03LjA4IGMgLTAuNDA2IC0wLjQwNiAtMS4wNjQgLTAuNDA2IC0xLjQ2OSAwIGMgLTAuNDA2IDAuNDA2IC0wLjQwNiAxLjA2MyAwIDEuNDY5IEwgOC41MzEgMTAgTCAxLjQ1IDE3LjA4MSBjIC0wLjQwNiAwLjQwNiAtMC40MDYgMS4wNjQgMCAxLjQ2OSBjIDAuMjAzIDAuMjAzIDAuNDY5IDAuMzA0IDAuNzM1IDAuMzA0IGMgMC4yNjYgMCAwLjUzMSAtMC4xMDEgMC43MzUgLTAuMzA0IEwgMTAgMTEuNDY5IGwgNy4wOCA3LjA4MSBjIDAuMjAzIDAuMjAzIDAuNDY5IDAuMzA0IDAuNzM1IDAuMzA0IGMgMC4yNjcgMCAwLjUzMiAtMC4xMDEgMC43MzUgLTAuMzA0IGMgMC40MDYgLTAuNDA2IDAuNDA2IC0xLjA2NCAwIC0xLjQ2OSBMIDExLjQ2OSAxMCBaJyk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoc3ZnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9vbGJhckVsZW0uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyVG9vbGJhciA9IGZ1bmN0aW9uIChuYXYpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJEZWZhdWx0QnV0dG9ucygpO1xyXG4gICAgICAgICAgICBuYXYuYXBwZW5kQ2hpbGQodGhpcy50b29sYmFyRWxlbSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRCdXR0b25Ub1Rvb2xiYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCB0b29sYmFyQnV0dG9uID0gbmV3IHNlbGYudG9vbGJhckJ1dHRvbigpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGlzLnNsaWRlID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB0aGlzLnByZXZpb3VzU2xpZGVWaWFCdXR0b24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmRhdGEuc2xpZGUgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnNsaWRlIC0gMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnRvdGFsX3NsaWRlcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vbG9hZCBzb3VyY2UgYnkgaW5kZXggKGFycmF5IGlzIGluZGV4ZWQgZnJvbSAwIHNvIHdlIG5lZWQgdG8gZGVjcmVtZW50IGluZGV4KVxyXG4gICAgICAgICAgICBzZWxmLmxvYWRzb3VyY2Uoc2VsZi5kYXRhLnVybHNbc2VsZi5kYXRhLnNsaWRlIC0gMV0pO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB0aGlzLm5leHRTbGlkZVZpYUJ1dHRvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZSA8IHNlbGYuZGF0YS50b3RhbF9zbGlkZXMpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEuc2xpZGUgKyAxKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKHNlbGYuZGF0YS50b3RhbF9zbGlkZXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2xvYWQgc291cmNlIGJ5IGluZGV4IChhcnJheSBpcyBpbmRleGVkIGZyb20gMCBzbyB3ZSBuZWVkIHRvIGRlY3JlbWVudCBpbmRleClcclxuICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlKHNlbGYuZGF0YS51cmxzW3NlbGYuZGF0YS5zbGlkZSAtIDFdKTtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKHNlbGYuZGF0YS5zbGlkZSk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXYgdGhhdCBob2xkcyBzb3VyY2UgZWxlbVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1lZGlhSG9sZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuaG9sZGVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtbWVkaWEtaG9sZGVyJ10pO1xyXG4gICAgICAgIHRoaXMuaG9sZGVyLnN0eWxlLndpZHRoID0gMy42ICogd2luZG93LmlubmVyV2lkdGggKyAncHgnO1xyXG4gICAgICAgIHRoaXMuaG9sZGVyLnN0eWxlLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCArICdweCc7XHJcbiAgICAgICAgc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQubWVkaWFIb2xkZXJEaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLnN0eWxlLndpZHRoID0gMyAqIHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4JztcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucmVuZGVySG9sZGVyID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5ob2xkZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGhvZHMgdGhhdCBhcHBlbmRzIHNvdXJjZXMgdG8gbWVkaWFIb2xkZXIgZGVwZW5kaW5nIG9uIGFjdGlvblxyXG4gICAgICogQHR5cGUge3tpbml0aWFsQXBwZW5kLCBwcmV2aW91c0FwcGVuZCwgbmV4dEFwcGVuZH18Kn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5hcHBlbmRNZXRob2RzID0gcmVxdWlyZSgnLi9hcHBlbmRTb3VyY2UnKTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwbGF5IHNvdXJjZSAoaW1hZ2VzLCBIVE1MNSB2aWRlbywgWW91VHViZSB2aWRlbykgZGVwZW5kaW5nIG9uIGdpdmVuIHVybCBmcm9tIHVzZXJcclxuICAgICAqIE9yIGlmIGRpc3BsYXkgaXMgaW5pdGlhbCBkaXNwbGF5IDMgaW5pdGlhbCBzb3VyY2VzXHJcbiAgICAgKiBJZiB0aGVyZSBhcmUgPj0gMyBpbml0aWFsIHNvdXJjZXMgdGhlcmUgd2lsbCBiZSBhbHdheXMgMyBpbiBzdGFnZVxyXG4gICAgICogQHBhcmFtIHVybFxyXG4gICAgICogQHBhcmFtIHR5cGVPZkxvYWRcclxuICAgICAqIEByZXR1cm5zIHttb2R1bGUuZXhwb3J0c31cclxuICAgICAqL1xyXG4gICAgdGhpcy5sb2Fkc291cmNlcyA9IGZ1bmN0aW9uICh0eXBlT2ZMb2FkKSB7XHJcbiAgICAgICAgY29uc3QgbG9hZHNvdXJjZW1vZHVsZSA9IHJlcXVpcmUoXCIuL2xvYWRTb3VyY2UuanNcIik7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBsb2Fkc291cmNlbW9kdWxlKHNlbGYsIERPTU9iamVjdCwgdHlwZU9mTG9hZCk7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuXHJcbiFmdW5jdGlvbiAoKSB7XHJcbn0oZG9jdW1lbnQsIHdpbmRvdyk7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlbGYsIERPTU9iamVjdCwgdHlwZU9mTG9hZCkge1xyXG5cclxuICAgIGNvbnN0IF90aGlzID0gdGhpcztcclxuICAgIGxldCBjdXJyZW50U2xpZGVBcnJheUluZGV4ID0gc2VsZi5kYXRhLnNsaWRlIC0gMTtcclxuXHJcbiAgICBsZXQgc291cmNlRGltZW5zaW9ucyA9IGZ1bmN0aW9uIChzb3VyY2VFbGVtLCBzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAgc291cmNlV2lkdGggPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgc291cmNlV2lkdGggPSBzZWxmLmRhdGEub25SZXNpemVFdmVudC5yZW1lbWJlcmRXaWR0aDtcclxuICAgICAgICAgICAgc291cmNlSGVpZ2h0ID0gc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQucmVtZW1iZXJkSGVpZ2h0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY29lZmZpY2llbnQgPSBzb3VyY2VXaWR0aCAvIHNvdXJjZUhlaWdodDtcclxuICAgICAgICBjb25zdCBkZXZpY2VXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGNvbnN0IGRldmljZUhlaWdodCA9IHBhcnNlSW50KHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuc3R5bGUuaGVpZ2h0KTtcclxuICAgICAgICBsZXQgbmV3SGVpZ2h0ID0gZGV2aWNlV2lkdGggLyBjb2VmZmljaWVudDtcclxuICAgICAgICBpZiAobmV3SGVpZ2h0IDwgZGV2aWNlSGVpZ2h0IC0gNjApIHtcclxuICAgICAgICAgICAgc291cmNlRWxlbS5zdHlsZS5oZWlnaHQgPSBuZXdIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIHNvdXJjZUVsZW0uc3R5bGUud2lkdGggPSBkZXZpY2VXaWR0aCArIFwicHhcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdIZWlnaHQgPSBkZXZpY2VIZWlnaHQgLSA2MDtcclxuICAgICAgICAgICAgc291cmNlRWxlbS5zdHlsZS5oZWlnaHQgPSBuZXdIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIHNvdXJjZUVsZW0uc3R5bGUud2lkdGggPSBuZXdIZWlnaHQgKiBjb2VmZmljaWVudCArIFwicHhcIjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZCBmYWRlIGluIGNsYXNzIGFuZCBkaW1lbnNpb24gZnVuY3Rpb25cclxuICAgICAqL1xyXG4gICAgbGV0IG9ubG9hZExpc3RlbmVyID0gZnVuY3Rpb24gKHNvdXJjZUVsZW0sIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQsIGFycmF5SW5kZXgpIHtcclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZUhvbGRlciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNvdXJjZS1ob2xkZXInXSk7XHJcblxyXG4gICAgICAgIC8vbm9ybWFsIHNvdXJjZSBkaW1lbnNpb25zIG5lZWRzIHRvIGJlIHN0b3JlZCBpbiBhcnJheVxyXG4gICAgICAgIC8vaXQgd2lsbCBiZSBuZWVkZWQgd2hlbiBsb2FkaW5nIHNvdXJjZSBmcm9tIG1lbW9yeVxyXG4gICAgICAgIHNlbGYuZGF0YS5yZW1lbWJlcmVkU291cmNlc0RpbWVuc2lvbnNbYXJyYXlJbmRleF0gPSB7XHJcbiAgICAgICAgICAgIFwid2lkdGhcIjogc291cmNlV2lkdGgsXHJcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IHNvdXJjZUhlaWdodFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vYWRkIHNvbWUgZmFkZSBpbiBhbmltYXRpb25cclxuICAgICAgICBzb3VyY2VFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtZmFkZS1pbicpO1xyXG4gICAgICAgIHZvaWQgc291cmNlRWxlbS5vZmZzZXRXaWR0aDtcclxuICAgICAgICBzb3VyY2VFbGVtLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbicpO1xyXG5cclxuICAgICAgICAvL2FkZCBtZXRob2QgdGhhdCBjaGFuZ2VzIHNvdXJjZSBkaW1lbnNpb24gb24gd2luZG93IHJlc2l6ZVxyXG4gICAgICAgIHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50LnNvdXJjZURpbWVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZURpbWVuc2lvbnMoc291cmNlRWxlbSwgc291cmNlV2lkdGgsIHNvdXJjZUhlaWdodCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9zZXQgZGltZW5zaW9uIGZvciB0aGUgZmlyc3QgdGltZVxyXG4gICAgICAgIHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50LnNvdXJjZURpbWVuc2lvbnMoc291cmNlV2lkdGgsIHNvdXJjZUhlaWdodCk7XHJcblxyXG5cclxuICAgICAgICAvLyBkaW1lbnNpb25zIHdpbGwgYmUgZ2l2ZW4gb25seSBvbmUgdGltZSBzbyB3ZSB3aWxsIG5lZWQgdG8gcmVtZW1iZXIgaXRcclxuICAgICAgICAvLyBmb3IgbmV4dCBvbnJlc2l6ZSBldmVudCBjYWxsc1xyXG4gICAgICAgIHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50LnJlbWVtYmVyZFdpZHRoID0gc291cmNlV2lkdGg7XHJcbiAgICAgICAgc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQucmVtZW1iZXJkSGVpZ2h0ID0gc291cmNlSGVpZ2h0O1xyXG5cclxuXHJcbiAgICAgICAgc291cmNlSG9sZGVyLmFwcGVuZENoaWxkKHNvdXJjZUVsZW0pO1xyXG4gICAgICAgIHNlbGYuZGF0YS5zb3VyY2VzW2FycmF5SW5kZXhdID0gc291cmNlSG9sZGVyO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHR5cGVPZkxvYWQpIHtcclxuICAgICAgICAgICAgY2FzZSAnaW5pdGlhbCc6XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFwcGVuZE1ldGhvZHMuaW5pdGlhbEFwcGVuZChzZWxmKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICduZXh0JzpcclxuICAgICAgICAgICAgICAgIHNlbGYuZGF0YS5uZXh0TG9hZC5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hcHBlbmRNZXRob2RzLm5leHRBcHBlbmQoc2VsZik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGlzLmxvYWRZb3V0dWJldmlkZW8gPSBmdW5jdGlvbiAodmlkZW9JZCwgYXJyYXlJbmRleCkge1xyXG4gICAgICAgIGxldCBpZnJhbWUgPSBuZXcgRE9NT2JqZWN0KCdpZnJhbWUnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zaW5nbGUtc291cmNlJ10pO1xyXG4gICAgICAgIGlmcmFtZS5zcmMgPSAnLy93d3cueW91dHViZS5jb20vZW1iZWQvJyArIHZpZGVvSWQ7XHJcbiAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3dmdWxsc2NyZWVuJywgJycpO1xyXG4gICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2ZyYW1lYm9yZGVyJywgJzAnKTtcclxuICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLmFwcGVuZENoaWxkKGlmcmFtZSk7XHJcbiAgICAgICAgb25sb2FkTGlzdGVuZXIoaWZyYW1lLCAxOTIwLCAxMDgwLCBhcnJheUluZGV4KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuaW1hZ2VMb2FkID0gZnVuY3Rpb24gKHNyYywgYXJyYXlJbmRleCkge1xyXG4gICAgICAgIGxldCBzb3VyY2VFbGVtID0gbmV3IERPTU9iamVjdCgnaW1nJykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2luZ2xlLXNvdXJjZSddKTtcclxuICAgICAgICBzb3VyY2VFbGVtLnNyYyA9IHNyYztcclxuICAgICAgICBzb3VyY2VFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG9ubG9hZExpc3RlbmVyKHNvdXJjZUVsZW0sIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBhcnJheUluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMudmlkZW9Mb2FkID0gZnVuY3Rpb24gKHNyYywgYXJyYXlJbmRleCkge1xyXG4gICAgICAgIGxldCB2aWRlb0VsZW0gPSBuZXcgRE9NT2JqZWN0KCd2aWRlbycpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNpbmdsZS1zb3VyY2UnXSk7XHJcbiAgICAgICAgbGV0IHNvdXJjZSA9IG5ldyBET01PYmplY3QoJ3NvdXJjZScpLmVsZW07XHJcbiAgICAgICAgY29uc29sZS5sb2coc291cmNlLm9mZnNldFdpZHRoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzb3VyY2UudmlkZW9XaWR0aCk7XHJcbiAgICAgICAgc291cmNlLnNyYyA9IHNyYztcclxuICAgICAgICB2aWRlb0VsZW0uaW5uZXJUZXh0ID0gJ1NvcnJ5LCB5b3VyIGJyb3dzZXIgZG9lc25cXCd0IHN1cHBvcnQgZW1iZWRkZWQgdmlkZW9zLCA8YVxcbicgK1xyXG4gICAgICAgICAgICAnICAgICAgICAgICAgaHJlZj1cImh0dHA6Ly9kb3dubG9hZC5ibGVuZGVyLm9yZy9wZWFjaC9iaWdidWNrYnVubnlfbW92aWVzL0JpZ0J1Y2tCdW5ueV8zMjB4MTgwLm1wNFwiPmRvd25sb2FkPC9hPiBhbmQgd2F0Y2hcXG4nICtcclxuICAgICAgICAgICAgJyAgICAgICAgd2l0aCB5b3VyIGZhdm9yaXRlIHZpZGVvIHBsYXllciEnO1xyXG5cclxuICAgICAgICB2aWRlb0VsZW0uc2V0QXR0cmlidXRlKCdjb250cm9scycsICcnKTtcclxuICAgICAgICB2aWRlb0VsZW0uYXBwZW5kQ2hpbGQoc291cmNlKTtcclxuICAgICAgICB2aWRlb0VsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG9ubG9hZExpc3RlbmVyKHZpZGVvRWxlbSwgdGhpcy52aWRlb1dpZHRoLCB0aGlzLnZpZGVvSGVpZ2h0LCBhcnJheUluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbSA9IGZ1bmN0aW9uIChzb3VyY2VVcmwpIHtcclxuICAgICAgICBjb25zdCBwYXJzZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgY29uc3QgaW5kZXhPZlNvdXJjZSA9IHNlbGYuZGF0YS51cmxzLmluZGV4T2Yoc291cmNlVXJsKTtcclxuXHJcbiAgICAgICAgcGFyc2VyLmhyZWYgPSBzb3VyY2VVcmw7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldElkKHNvdXJjZVVybCkge1xyXG4gICAgICAgICAgICBsZXQgcmVnRXhwID0gL14uKih5b3V0dS5iZVxcL3x2XFwvfHVcXC9cXHdcXC98ZW1iZWRcXC98d2F0Y2hcXD92PXxcXCZ2PSkoW14jXFwmXFw/XSopLiovO1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBzb3VyY2VVcmwubWF0Y2gocmVnRXhwKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaCAmJiBtYXRjaFsyXS5sZW5ndGggPT0gMTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaFsyXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnZXJyb3InO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHBhcnNlci5ob3N0bmFtZSA9PT0gJ3d3dy55b3V0dWJlLmNvbScpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkWW91dHViZXZpZGVvKGdldElkKHNvdXJjZVVybCksIGluZGV4T2ZTb3VyY2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB4aHIub25sb2Fkc3RhcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gXCJibG9iXCI7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGVjayB3aGF0IHR5cGUgb2YgZmlsZSBwcm92aWRlZCBmcm9tIGxpbmtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlVHlwZSA9IHhoci5yZXNwb25zZS50eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZVR5cGUuaW5kZXhPZignLycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUuc2xpY2UoMCwgcmVzcG9uc2VUeXBlLmluZGV4T2YoJy8nKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2VUeXBlID09PSAnaW1hZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbWFnZUxvYWQoVVJMLmNyZWF0ZU9iamVjdFVSTCh4aHIucmVzcG9uc2UpLCBpbmRleE9mU291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlVHlwZSA9PT0gJ3ZpZGVvJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudmlkZW9Mb2FkKFVSTC5jcmVhdGVPYmplY3RVUkwoeGhyLnJlc3BvbnNlKSwgaW5kZXhPZlNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB4aHIub3BlbignZ2V0Jywgc291cmNlVXJsLCB0cnVlKTtcclxuICAgICAgICAgICAgeGhyLnNlbmQobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodHlwZU9mTG9hZCA9PT0gJ2luaXRpYWwnKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNlbGYuZGF0YS51cmxzW2N1cnJlbnRTbGlkZUFycmF5SW5kZXhdKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc2VsZi5kYXRhLnVybHNbY3VycmVudFNsaWRlQXJyYXlJbmRleCArIDFdKTtcclxuICAgICAgICBpZiAoY3VycmVudFNsaWRlQXJyYXlJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc2VsZi5kYXRhLnVybHNbc2VsZi5kYXRhLnVybHMubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbShjdXJyZW50U2xpZGVBcnJheUluZGV4IC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlT2ZMb2FkID09PSAnbmV4dCcpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc2VsZi5kYXRhLnVybHNbc2VsZi5kYXRhLnNsaWRlXSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vaWYgZmlyc3QgdGltZSBsb2FkIGFkZCBsb2FkZXJcclxuICAgIGlmIChzZWxmLmRhdGEuaXNGaXJzdFRpbWVMb2FkID09PSB0cnVlKSB7XHJcbiAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImxkcy1yaW5nXCI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgIHNlbGYuZGF0YS5pc0ZpcnN0VGltZUxvYWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLypcclxuXHJcblxyXG4gICAgLy9jaGVjayBpZiBzb3VyY2Ugd2FzIHByZXZpb3VzbHkgY3JlYXRlZCBhbmRcclxuICAgIC8vIGNyZWF0ZSBpdCBpZiBpdCB3YXNuJ3Qgb3IgaWYgaXQgd2FzIGxvYWQgaXQgZnJvbSB2YXJpYWJsZVxyXG4gICAgaWYgKHR5cGVvZiBzZWxmLmRhdGEuc291cmNlc1tpbmRleE9mU291cmNlVVJMXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnbG9hZGVkIGZyb20gbWVtb3J5Jyk7XHJcbiAgICAgICAgY29uc3Qgc291cmNlRWxlbSA9IHNlbGYuZGF0YS5zb3VyY2VzW2luZGV4T2ZTb3VyY2VVUkxdO1xyXG4gICAgICAgIGNvbnN0IHJlbWVtYmVyZWRTb3VyY2VEaW1lbnNpb25zID0gc2VsZi5kYXRhLnJlbWVtYmVyZWRTb3VyY2VzRGltZW5zaW9uc1tpbmRleE9mU291cmNlVVJMXTtcclxuICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuYXBwZW5kQ2hpbGQoc291cmNlRWxlbSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coc291cmNlRWxlbSk7XHJcblxyXG4gICAgICAgIHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50LnNvdXJjZURpbWVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZURpbWVuc2lvbnMoXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VFbGVtLFxyXG4gICAgICAgICAgICAgICAgcmVtZW1iZXJlZFNvdXJjZURpbWVuc2lvbnMud2lkdGgsXHJcbiAgICAgICAgICAgICAgICByZW1lbWJlcmVkU291cmNlRGltZW5zaW9ucy5oZWlnaHRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50LnNvdXJjZURpbWVuc2lvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAqL1xyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlbGYsIERPTU9iamVjdCkge1xyXG4gICAgbGV0IHByaXZhdGVNZXRob2RzID0ge1xyXG4gICAgICAgIHJlbmRlck5hdjogZnVuY3Rpb24gKGNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEubmF2ID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtbmF2J10pO1xyXG4gICAgICAgICAgICBuZXcgc2VsZi50b29sYmFyKCkucmVuZGVyVG9vbGJhcihzZWxmLmRhdGEubmF2KTtcclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgeGRidG4gPSBuZXcgRE9NT2JqZWN0KCdhJykuZWxlbTtcclxuICAgICAgICAgICAgeGRidG4uaW5uZXJIVE1MID0gJ2hpZGUnO1xyXG4gICAgICAgICAgICB4ZGJ0bi5zdHlsZS56SW5kZXggPSAnOTk5OTk5OSc7XHJcbiAgICAgICAgICAgIHhkYnRuLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLmRhdGEuc291cmNlc1swXSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgLy8gZm9yKGxldCBzb3VyY2UgaW4gc2VsZi5kYXRhLnNvdXJjZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLmFwcGVuZENoaWxkKHNlbGYuZGF0YS5zb3VyY2VzWzBdKTtcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEubmF2LmFwcGVuZENoaWxkKHhkYnRuKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxmLmRhdGEuc2xpZGVDb3VudGVyID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBuZXcgc2VsZi5zbGlkZUNvdW50ZXJFbGVtKCkucmVuZGVyU2xpZGVDb3VudGVyKHNlbGYuZGF0YS5uYXYpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5kYXRhLm5hdik7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyU2xpZGVCdXR0b25zOiBmdW5jdGlvbiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmRhdGEuc2xpZGVCdXR0b25zID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3JlbmRlciBsZWZ0IGJ0blxyXG4gICAgICAgICAgICBsZXQgbGVmdF9idG5fY29udGFpbmVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtYnRuLWNvbnRhaW5lciddKTtcclxuICAgICAgICAgICAgbGV0IGJ0biA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLWJ0bicsICdidXR0b24tc3R5bGUnXSk7XHJcbiAgICAgICAgICAgIGJ0bi5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgIG5ldyBzZWxmLlNWR0ljb24oKS5nZXRTVkdJY29uKCdNOC4zODgsMTAuMDQ5bDQuNzYtNC44NzNjMC4zMDMtMC4zMSwwLjI5Ny0wLjgwNC0wLjAxMi0xLjEwNWMtMC4zMDktMC4zMDQtMC44MDMtMC4yOTMtMS4xMDUsMC4wMTJMNi43MjYsOS41MTZjLTAuMzAzLDAuMzEtMC4yOTYsMC44MDUsMC4wMTIsMS4xMDVsNS40MzMsNS4zMDdjMC4xNTIsMC4xNDgsMC4zNSwwLjIyMywwLjU0NywwLjIyM2MwLjIwMywwLDAuNDA2LTAuMDgsMC41NTktMC4yMzZjMC4zMDMtMC4zMDksMC4yOTUtMC44MDMtMC4wMTItMS4xMDRMOC4zODgsMTAuMDQ5eicpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsZWZ0X2J0bl9jb250YWluZXIpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2xpZGUgb2JqZWN0IHRoYXQgY29udGFpbnMgY2hhbmdpbmcgc2xpZGUgbWV0aG9kc1xyXG4gICAgICAgICAgICBsZXQgc2xpZGUgPSBuZXcgc2VsZi5zbGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgLy9nbyB0byBwcmV2aW91cyBzbGlkZSBvbmNsaWNrXHJcbiAgICAgICAgICAgIGxlZnRfYnRuX2NvbnRhaW5lci5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2xpZGUucHJldmlvdXNTbGlkZVZpYUJ1dHRvbigpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGVmdF9idG5fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ0bik7XHJcbiAgICAgICAgICAgIGxldCByaWdodF9idG5fY29udGFpbmVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtYnRuLWNvbnRhaW5lcicsICdmc2xpZ2h0Ym94LXNsaWRlLWJ0bi1yaWdodC1jb250YWluZXInXSk7XHJcbiAgICAgICAgICAgIGJ0biA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLWJ0bicsICdidXR0b24tc3R5bGUnXSk7XHJcbiAgICAgICAgICAgIGJ0bi5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgIG5ldyBzZWxmLlNWR0ljb24oKS5nZXRTVkdJY29uKCdNMTEuNjExLDEwLjA0OWwtNC43Ni00Ljg3M2MtMC4zMDMtMC4zMS0wLjI5Ny0wLjgwNCwwLjAxMi0xLjEwNWMwLjMwOS0wLjMwNCwwLjgwMy0wLjI5MywxLjEwNSwwLjAxMmw1LjMwNiw1LjQzM2MwLjMwNCwwLjMxLDAuMjk2LDAuODA1LTAuMDEyLDEuMTA1TDcuODMsMTUuOTI4Yy0wLjE1MiwwLjE0OC0wLjM1LDAuMjIzLTAuNTQ3LDAuMjIzYy0wLjIwMywwLTAuNDA2LTAuMDgtMC41NTktMC4yMzZjLTAuMzAzLTAuMzA5LTAuMjk1LTAuODAzLDAuMDEyLTEuMTA0TDExLjYxMSwxMC4wNDl6JylcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIC8vZ28gdG8gbmV4dCBzbGlkZSBvbmNsaWNrXHJcbiAgICAgICAgICAgIHJpZ2h0X2J0bl9jb250YWluZXIub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlLm5leHRTbGlkZVZpYUJ1dHRvbigpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByaWdodF9idG5fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ0bik7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyaWdodF9idG5fY29udGFpbmVyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vZGlzYWJsZSBzY3JvbGxpbmdcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1vcGVuJyk7XHJcblxyXG4gICAgLy9jcmVhdGUgY29udGFpbmVyXHJcbiAgICBsZXQgY29udGFpbmVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtY29udGFpbmVyJ10pO1xyXG4gICAgY29udGFpbmVyLmlkID0gXCJmc2xpZ2h0Ym94LWNvbnRhaW5lclwiO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG5cclxuICAgIC8vcmVuZGVyIHNsaWRlIGJ1dHRvbnMgYW5kIG5hdih0b29sYmFyKVxyXG4gICAgcHJpdmF0ZU1ldGhvZHMucmVuZGVyTmF2KGNvbnRhaW5lcik7XHJcbiAgICBwcml2YXRlTWV0aG9kcy5yZW5kZXJTbGlkZUJ1dHRvbnMoY29udGFpbmVyKTtcclxuXHJcbiAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIgPSBuZXcgc2VsZi5tZWRpYUhvbGRlcigpO1xyXG4gICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLnJlbmRlckhvbGRlcihjb250YWluZXIpO1xyXG5cclxuICAgIHNlbGYuZGF0YS5pc2ZpcnN0VGltZUxvYWQgPSB0cnVlO1xyXG4gICAgc2VsZi5sb2Fkc291cmNlcygnaW5pdGlhbCcpO1xyXG59OyJdfQ==
