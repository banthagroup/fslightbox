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
            if(arrayIndex === lastArrayIndex) {
                stageSources.nextSource = 0;
            } else {
                stageSources.nextSource = sources[arrayIndex + 1];
            }

            for(let source in stageSources) {
                self.data.mediaHolder.holder.appendChild(stageSources[source]);
            }
        }
    },

    previousAppend: function () {

    },

    nextAppend: function () {

    }
};
},{}],2:[function(require,module,exports){
module.exports = function (self) {

    const elements = {
        "mediaHolder": self.data.mediaHolder.holder,
        "nav": self.data.nav
    };

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

            console.log(self.data.xPosition);
        },


        mouseUpEvent: function () {
            for(let elem in elements) {
                elements[elem].classList.remove('fslightbox-cursor-grabbing');
            }
            self.data.xPosition = self.data.xPosition + difference;
            is_dragging = false;

            if (difference > 0) {

            } else if (difference < 0) {

            }
        },


        mouseMoveEvent: function (e) {
            if (!is_dragging){
                return;
            }
            const sourceElem = self.data.sources[self.data.slide - 1];
            difference = e.clientX - mouseDownClientX;
            let to_transform = self.data.xPosition + difference;
            elements.mediaHolder.style.transform = 'translate3d(' + to_transform + 'px,0,0)';
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
        xPosition: -window.innerWidth,

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
        self.data.updateSlideNumber = function () {
            self.data.slideCounterElem.innerHTML = self.data.slide;
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
                self.data.slide -= 1;
            } else {
                self.data.slide = self.data.total_slides
            }

            //load source by index (array is indexed from 0 so we need to decrement index)
            self.loadsource(self.data.urls[self.data.slide - 1]);
            self.data.updateSlideNumber();
        };


        this.nextSlideViaButton = function () {
            if (self.data.slide < self.data.total_slides) {
                self.data.slide += 1;
            } else {
                self.data.slide = 1;
            }

            //load source by index (array is indexed from 0 so we need to decrement index)
            self.loadsource(self.data.urls[self.data.slide - 1]);
            self.data.updateSlideNumber();
        };
    };

    /**
     * Div that holds source elem
     */
    this.mediaHolder = function () {
        this.holder = new DOMObject('div').addClassesAndCreate(['fslightbox-media-holder']);
        this.holder.style.width = 3.6 * window.innerWidth + 'px';
        this.holder.style.transform = 'translate3d(' + -1.3 * window.innerWidth + 'px,0,0)';
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
     * @type {{intialAppend, previousAppend, nextAppend}|*}
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

    if(typeOfLoad === 'initial') {

        this.createSourceElem(self.data.urls[currentSlideArrayIndex]);
        this.createSourceElem(self.data.urls[currentSlideArrayIndex + 1]);
        if(currentSlideArrayIndex === 0) {
            this.createSourceElem(self.data.urls[self.data.urls.length - 1]);
        } else {
            this.createSourceElem(currentSlideArrayIndex - 1);
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwZW5kU291cmNlLmpzIiwic3JjL2pzL2NoYW5nZVNsaWRlQnlEcmFnZ2luZy5qcyIsInNyYy9qcy9pbmRleC5qcyIsInNyYy9qcy9sb2FkU291cmNlLmpzIiwic3JjL2pzL3JlbmRlckRPTS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgaW5pdGlhbEFwcGVuZDogZnVuY3Rpb24gKHNlbGYpIHtcclxuXHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBzb3VyY2UgaW4gc2VsZi5kYXRhLnNvdXJjZXMpIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvdW50ICE9PSAzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb3VudCA9PT0gMykge1xyXG5cclxuICAgICAgICAgICAgLy9pbmRleCBvZiB0aGUgY3VycmVudCBlbGVtZW50IHN0b3JlZCBpbiBtZW1vcnkgaXMganVzdCBkZWNyZW1lbnRlZCBzbGlkZSBudW1iZXJcclxuICAgICAgICAgICAgbGV0IGFycmF5SW5kZXggPSBzZWxmLmRhdGEuc2xpZGUgLSAxO1xyXG4gICAgICAgICAgICBsZXQgbGFzdEFycmF5SW5kZXggPSBzZWxmLmRhdGEudXJscy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VzID0gc2VsZi5kYXRhLnNvdXJjZXM7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YWdlU291cmNlcyA9IHNlbGYuZGF0YS5zdGFnZVNvdXJjZXM7XHJcblxyXG4gICAgICAgICAgICAvL3ByZXZpb3VzIHNvdXJjZVxyXG4gICAgICAgICAgICBpZiAoYXJyYXlJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc3RhZ2VTb3VyY2VzLnByZXZpb3VzU291cmNlID0gc291cmNlc1tsYXN0QXJyYXlJbmRleF07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGFnZVNvdXJjZXMucHJldmlvdXNTb3VyY2UgPSBzb3VyY2VzW2FycmF5SW5kZXggLSAxXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9jdXJyZW50IHNvdXJjZVxyXG4gICAgICAgICAgICBzdGFnZVNvdXJjZXMuY3VycmVudFNvdXJjZSA9IHNvdXJjZXNbYXJyYXlJbmRleF07XHJcblxyXG4gICAgICAgICAgICAvL25leHQgc291cmNlXHJcbiAgICAgICAgICAgIGlmKGFycmF5SW5kZXggPT09IGxhc3RBcnJheUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBzdGFnZVNvdXJjZXMubmV4dFNvdXJjZSA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGFnZVNvdXJjZXMubmV4dFNvdXJjZSA9IHNvdXJjZXNbYXJyYXlJbmRleCArIDFdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IHNvdXJjZSBpbiBzdGFnZVNvdXJjZXMpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuYXBwZW5kQ2hpbGQoc3RhZ2VTb3VyY2VzW3NvdXJjZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBwcmV2aW91c0FwcGVuZDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgbmV4dEFwcGVuZDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH1cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWxmKSB7XHJcblxyXG4gICAgY29uc3QgZWxlbWVudHMgPSB7XHJcbiAgICAgICAgXCJtZWRpYUhvbGRlclwiOiBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLFxyXG4gICAgICAgIFwibmF2XCI6IHNlbGYuZGF0YS5uYXZcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGlzX2RyYWdnaW5nID0gZmFsc2U7XHJcbiAgICBsZXQgbW91c2VEb3duQ2xpZW50WDtcclxuICAgIGxldCBkaWZmZXJlbmNlO1xyXG5cclxuICAgIGxldCBldmVudExpc3RlbmVycyA9IHtcclxuXHJcbiAgICAgICAgbW91c2VEb3duRXZlbnQ6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIG1vdXNlRG93bkNsaWVudFggPSBlLmNsaWVudFg7XHJcbiAgICAgICAgICAgIGZvcihsZXQgZWxlbSBpbiBlbGVtZW50cykge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHNbZWxlbV0uY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1jdXJzb3ItZ3JhYmJpbmcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpc19kcmFnZ2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIGRpZmZlcmVuY2UgPSAwO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZi5kYXRhLnhQb3NpdGlvbik7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIG1vdXNlVXBFdmVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmb3IobGV0IGVsZW0gaW4gZWxlbWVudHMpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzW2VsZW1dLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtY3Vyc29yLWdyYWJiaW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5kYXRhLnhQb3NpdGlvbiA9IHNlbGYuZGF0YS54UG9zaXRpb24gKyBkaWZmZXJlbmNlO1xyXG4gICAgICAgICAgICBpc19kcmFnZ2luZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRpZmZlcmVuY2UgPiAwKSB7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRpZmZlcmVuY2UgPCAwKSB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIG1vdXNlTW92ZUV2ZW50OiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoIWlzX2RyYWdnaW5nKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VFbGVtID0gc2VsZi5kYXRhLnNvdXJjZXNbc2VsZi5kYXRhLnNsaWRlIC0gMV07XHJcbiAgICAgICAgICAgIGRpZmZlcmVuY2UgPSBlLmNsaWVudFggLSBtb3VzZURvd25DbGllbnRYO1xyXG4gICAgICAgICAgICBsZXQgdG9fdHJhbnNmb3JtID0gc2VsZi5kYXRhLnhQb3NpdGlvbiArIGRpZmZlcmVuY2U7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzLm1lZGlhSG9sZGVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgdG9fdHJhbnNmb3JtICsgJ3B4LDAsMCknO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIGZvcihsZXQgZWxlbSBpbiBlbGVtZW50cykge1xyXG4gICAgICAgIGVsZW1lbnRzW2VsZW1dLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGV2ZW50TGlzdGVuZXJzLm1vdXNlRG93bkV2ZW50KTtcclxuICAgIH1cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZXZlbnRMaXN0ZW5lcnMubW91c2VVcEV2ZW50KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBldmVudExpc3RlbmVycy5tb3VzZU1vdmVFdmVudCk7XHJcbn07Iiwid2luZG93LmZzTGlnaHRib3hPYmplY3QgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgdGhpcy5kYXRhID0ge1xyXG4gICAgICAgIHNsaWRlOiAxLFxyXG4gICAgICAgIHRvdGFsX3NsaWRlczogNixcclxuICAgICAgICB4UG9zaXRpb246IC13aW5kb3cuaW5uZXJXaWR0aCxcclxuXHJcbiAgICAgICAgc2xpZGVDb3VudGVyOiB0cnVlLFxyXG4gICAgICAgIHNsaWRlQnV0dG9uczogdHJ1ZSxcclxuICAgICAgICBpc0ZpcnN0VGltZUxvYWQ6IGZhbHNlLFxyXG4gICAgICAgIG1vdmVTbGlkZXNWaWFEcmFnOiB0cnVlLFxyXG4gICAgICAgIGlzUmVuZGVyaW5nVG9vbGJhckJ1dHRvbnM6IHtcclxuICAgICAgICAgICAgXCJjbG9zZVwiOiB0cnVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXJsczogW1xyXG4gICAgICAgICAgICBcImltYWdlcy8xLmpwZWdcIixcclxuICAgICAgICAgICAgXCJpbWFnZXMvMi5qcGdcIixcclxuICAgICAgICAgICAgXCJpbWFnZXMvMy5qcGVnXCIsXHJcbiAgICAgICAgICAgIFwiaW1hZ2VzLzQuanBlZ1wiLFxyXG4gICAgICAgICAgICBcImltYWdlcy81LmpwZ1wiLFxyXG4gICAgICAgICAgICBcImltYWdlcy82LmpwZ1wiLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc291cmNlczogW10sXHJcbiAgICAgICAgcmVtZW1iZXJlZFNvdXJjZXNEaW1lbnNpb25zOiBbXSxcclxuXHJcbiAgICAgICAgbWVkaWFIb2xkZXI6IHt9LFxyXG4gICAgICAgIHN0YWdlU291cmNlczoge1xyXG4gICAgICAgICAgICBcInByZXZpb3VzU291cmNlXCI6IHt9LFxyXG4gICAgICAgICAgICBcImN1cnJlbnRTb3VyY2VcIjoge30sXHJcbiAgICAgICAgICAgIFwibmV4dFNvdXJjZVwiOiB7fSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBuYXY6IHt9LFxyXG4gICAgICAgIHRvb2xiYXI6IHt9LFxyXG4gICAgICAgIHNvdXJjZUVsZW06IHt9LFxyXG4gICAgICAgIHNsaWRlQ291bnRlckVsZW06IHt9LFxyXG5cclxuICAgICAgICBvblJlc2l6ZUV2ZW50OiBuZXcgb25SZXNpemVFdmVudCgpLFxyXG4gICAgICAgIHVwZGF0ZVNsaWRlTnVtYmVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHtXaW5kb3d9XHJcbiAgICAgKi9cclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcblxyXG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG5ldyBzZWxmLmRvbSgpO1xyXG4gICAgICAgIHJlcXVpcmUoJy4vY2hhbmdlU2xpZGVCeURyYWdnaW5nLmpzJykoc2VsZik7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciBhbGwgbGlicmFyeSBlbGVtZW50c1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHRoaXMuZG9tID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJlcXVpcmUoJy4vcmVuZGVyRE9NLmpzJykoc2VsZiwgRE9NT2JqZWN0KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZzbGlnaHRib3gtY29udGFpbmVyJykucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlIGRvbSBlbGVtZW50IHdpdGggY2xhc3Nlc1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIERPTU9iamVjdCh0YWcpIHtcclxuICAgICAgICB0aGlzLmVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ2xhc3Nlc0FuZENyZWF0ZSA9IGZ1bmN0aW9uIChjbGFzc2VzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4IGluIGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzZXNbaW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9iamVjdCB0aGF0IGNvbnRhaW5zIGFsbCBhY3Rpb25zIHRoYXQgZnNsaWdodGJveCBpcyBkb2luZyBkdXJpbmcgcnVubmluZ1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIG9uUmVzaXplRXZlbnQoKSB7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5yZW1lbWJlcmRXaWR0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5yZW1lbWJlcmRIZWlnaHQgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhSG9sZGVyRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc291cmNlRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLm1lZGlhSG9sZGVyRGltZW5zaW9ucygpO1xyXG4gICAgICAgICAgICBfdGhpcy5zb3VyY2VEaW1lbnNpb25zKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTVkdJY29uIG9iamVjdCB3aXRoIGdldFNWR0ljb24gbWV0aG9kIHdoaWNoIHJldHVybiA8c3ZnPiBlbGVtZW50IHdpdGggPHBhdGg+IGNoaWxkXHJcbiAgICAgKiBAcmV0dXJucyB7RWxlbWVudH1cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLlNWR0ljb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIDxzdmc+IHdpdGggYWRkZWQgJ2ZzbGlnaHRib3gtc3ZnLWljb24nIGNsYXNzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgXCJzdmdcIik7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGNoaWxkIG9mIHN2ZyBlbXB0eSA8cGF0aD5cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgXCJwYXRoXCIpO1xyXG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICdjbGFzcycsICdmc2xpZ2h0Ym94LXN2Zy1pY29uJyk7XHJcbiAgICAgICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3ZpZXdCb3gnLCAnMCAwIDIwIDIwJyk7XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm5zIERPTSA8c3ZnPiBpY29uIGNvbnRhaW5pbmcgPHBhdGg+IGNoaWxkIHdpdGggZCBhdHRyaWJ1dGUgZnJvbSBwYXJhbWV0ZXJcclxuICAgICAgICAgKiBAcGFyYW0gZFxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZ2V0U1ZHSWNvbiA9IGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZCcsIGQpO1xyXG4gICAgICAgICAgICB0aGlzLnN2Zy5hcHBlbmRDaGlsZCh0aGlzLnBhdGgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdmc7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTbGlkZSBjb3VudGVyIG9iamVjdCAtIHVwcGVyIGxlZnQgY29ybmVyIG9mIGZzTGlnaHRib3hcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLnNsaWRlQ291bnRlckVsZW0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IG51bWJlckNvbnRhaW5lciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLW51bWJlci1jb250YWluZXInXSk7XHJcbiAgICAgICAgc2VsZi5kYXRhLnNsaWRlQ291bnRlckVsZW0gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1zbGlkZS1udW1iZXInXSk7XHJcblxyXG4gICAgICAgIHNlbGYuZGF0YS5zbGlkZUNvdW50ZXJFbGVtLmlubmVySFRNTCA9IHNlbGYuZGF0YS5zbGlkZTtcclxuICAgICAgICBzZWxmLmRhdGEuc2xpZGVDb3VudGVyRWxlbS5pZCA9ICdjdXJyZW50X3NsaWRlJztcclxuXHJcbiAgICAgICAgbGV0IHNwYWNlID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtc2xpZGUtbnVtYmVyJ10pO1xyXG4gICAgICAgIHNwYWNlLmlubmVySFRNTCA9ICcvJztcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlcyA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLXNsaWRlLW51bWJlciddKTtcclxuICAgICAgICBzbGlkZXMuaW5uZXJIVE1MID0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlcztcclxuXHJcbiAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYuZGF0YS5zbGlkZUNvdW50ZXJFbGVtKTtcclxuICAgICAgICBudW1iZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoc3BhY2UpO1xyXG4gICAgICAgIG51bWJlckNvbnRhaW5lci5hcHBlbmRDaGlsZChzbGlkZXMpO1xyXG5cclxuICAgICAgICAvLyB0aGlzIG1ldGhvZCBpcyBjYWxsZWQgYWZ0ZXIgc3dpdGNoaW5nIHNsaWRlc1xyXG4gICAgICAgIHNlbGYuZGF0YS51cGRhdGVTbGlkZU51bWJlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlQ291bnRlckVsZW0uaW5uZXJIVE1MID0gc2VsZi5kYXRhLnNsaWRlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyU2xpZGVDb3VudGVyID0gZnVuY3Rpb24gKG5hdikge1xyXG4gICAgICAgICAgICBuYXYuYXBwZW5kQ2hpbGQobnVtYmVyQ29udGFpbmVyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvb2xiYXIgYnV0dG9uXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgdGhpcy50b29sYmFyQnV0dG9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuYnV0dG9uID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtdG9vbGJhci1idXR0b24nLCAnYnV0dG9uLXN0eWxlJ10pO1xyXG5cclxuICAgICAgICB0aGlzLmFkZFNWR0ljb24gPSBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICBsZXQgU1ZHSWNvbiA9IG5ldyBzZWxmLlNWR0ljb24oKS5nZXRTVkdJY29uKGQpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbi5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgIFNWR0ljb25cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmJ1dHRvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb29sYmFyIG9iamVjdCB3aGljaCBjb250YWlucyB0b29sYmFyIGJ1dHRvbnNcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLnRvb2xiYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy50b29sYmFyRWxlbSA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXRvb2xiYXInXSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyRGVmYXVsdEJ1dHRvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBzaG91bGRSZW5kZXJCdXR0b25zID0gc2VsZi5kYXRhLmlzUmVuZGVyaW5nVG9vbGJhckJ1dHRvbnM7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2hvdWxkUmVuZGVyQnV0dG9ucy5jbG9zZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXRvb2xiYXItYnV0dG9uJywgJ2J1dHRvbi1zdHlsZSddKTtcclxuICAgICAgICAgICAgICAgIGxldCBzdmcgPSBuZXcgc2VsZi5TVkdJY29uKCkuZ2V0U1ZHSWNvbignTSAxMS40NjkgMTAgbCA3LjA4IC03LjA4IGMgMC40MDYgLTAuNDA2IDAuNDA2IC0xLjA2NCAwIC0xLjQ2OSBjIC0wLjQwNiAtMC40MDYgLTEuMDYzIC0wLjQwNiAtMS40NjkgMCBMIDEwIDguNTMgbCAtNy4wODEgLTcuMDggYyAtMC40MDYgLTAuNDA2IC0xLjA2NCAtMC40MDYgLTEuNDY5IDAgYyAtMC40MDYgMC40MDYgLTAuNDA2IDEuMDYzIDAgMS40NjkgTCA4LjUzMSAxMCBMIDEuNDUgMTcuMDgxIGMgLTAuNDA2IDAuNDA2IC0wLjQwNiAxLjA2NCAwIDEuNDY5IGMgMC4yMDMgMC4yMDMgMC40NjkgMC4zMDQgMC43MzUgMC4zMDQgYyAwLjI2NiAwIDAuNTMxIC0wLjEwMSAwLjczNSAtMC4zMDQgTCAxMCAxMS40NjkgbCA3LjA4IDcuMDgxIGMgMC4yMDMgMC4yMDMgMC40NjkgMC4zMDQgMC43MzUgMC4zMDQgYyAwLjI2NyAwIDAuNTMyIC0wLjEwMSAwLjczNSAtMC4zMDQgYyAwLjQwNiAtMC40MDYgMC40MDYgLTEuMDY0IDAgLTEuNDY5IEwgMTEuNDY5IDEwIFonKTtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChzdmcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b29sYmFyRWxlbS5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJUb29sYmFyID0gZnVuY3Rpb24gKG5hdikge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckRlZmF1bHRCdXR0b25zKCk7XHJcbiAgICAgICAgICAgIG5hdi5hcHBlbmRDaGlsZCh0aGlzLnRvb2xiYXJFbGVtKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFkZEJ1dHRvblRvVG9vbGJhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHRvb2xiYXJCdXR0b24gPSBuZXcgc2VsZi50b29sYmFyQnV0dG9uKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuc2xpZGUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHRoaXMucHJldmlvdXNTbGlkZVZpYUJ1dHRvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZSA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGF0YS5zbGlkZSAtPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlID0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlc1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2xvYWQgc291cmNlIGJ5IGluZGV4IChhcnJheSBpcyBpbmRleGVkIGZyb20gMCBzbyB3ZSBuZWVkIHRvIGRlY3JlbWVudCBpbmRleClcclxuICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlKHNlbGYuZGF0YS51cmxzW3NlbGYuZGF0YS5zbGlkZSAtIDFdKTtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKCk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMubmV4dFNsaWRlVmlhQnV0dG9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5kYXRhLnNsaWRlIDwgc2VsZi5kYXRhLnRvdGFsX3NsaWRlcykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlICs9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2xvYWQgc291cmNlIGJ5IGluZGV4IChhcnJheSBpcyBpbmRleGVkIGZyb20gMCBzbyB3ZSBuZWVkIHRvIGRlY3JlbWVudCBpbmRleClcclxuICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlKHNlbGYuZGF0YS51cmxzW3NlbGYuZGF0YS5zbGlkZSAtIDFdKTtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXYgdGhhdCBob2xkcyBzb3VyY2UgZWxlbVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1lZGlhSG9sZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuaG9sZGVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtbWVkaWEtaG9sZGVyJ10pO1xyXG4gICAgICAgIHRoaXMuaG9sZGVyLnN0eWxlLndpZHRoID0gMy42ICogd2luZG93LmlubmVyV2lkdGggKyAncHgnO1xyXG4gICAgICAgIHRoaXMuaG9sZGVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgLTEuMyAqIHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4LDAsMCknO1xyXG4gICAgICAgIHRoaXMuaG9sZGVyLnN0eWxlLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCArICdweCc7XHJcbiAgICAgICAgc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQubWVkaWFIb2xkZXJEaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLnN0eWxlLndpZHRoID0gMyAqIHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4JztcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucmVuZGVySG9sZGVyID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5ob2xkZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGhvZHMgdGhhdCBhcHBlbmRzIHNvdXJjZXMgdG8gbWVkaWFIb2xkZXIgZGVwZW5kaW5nIG9uIGFjdGlvblxyXG4gICAgICogQHR5cGUge3tpbnRpYWxBcHBlbmQsIHByZXZpb3VzQXBwZW5kLCBuZXh0QXBwZW5kfXwqfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmFwcGVuZE1ldGhvZHMgPSByZXF1aXJlKCcuL2FwcGVuZFNvdXJjZScpO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3BsYXkgc291cmNlIChpbWFnZXMsIEhUTUw1IHZpZGVvLCBZb3VUdWJlIHZpZGVvKSBkZXBlbmRpbmcgb24gZ2l2ZW4gdXJsIGZyb20gdXNlclxyXG4gICAgICogT3IgaWYgZGlzcGxheSBpcyBpbml0aWFsIGRpc3BsYXkgMyBpbml0aWFsIHNvdXJjZXNcclxuICAgICAqIElmIHRoZXJlIGFyZSA+PSAzIGluaXRpYWwgc291cmNlcyB0aGVyZSB3aWxsIGJlIGFsd2F5cyAzIGluIHN0YWdlXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKiBAcGFyYW0gdHlwZU9mTG9hZFxyXG4gICAgICogQHJldHVybnMge21vZHVsZS5leHBvcnRzfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmxvYWRzb3VyY2VzID0gZnVuY3Rpb24gKHR5cGVPZkxvYWQpIHtcclxuICAgICAgICBjb25zdCBsb2Fkc291cmNlbW9kdWxlID0gcmVxdWlyZShcIi4vbG9hZFNvdXJjZS5qc1wiKTtcclxuICAgICAgICByZXR1cm4gbmV3IGxvYWRzb3VyY2Vtb2R1bGUoc2VsZiwgRE9NT2JqZWN0LCB0eXBlT2ZMb2FkKTtcclxuICAgIH07XHJcbn07XHJcblxyXG5cclxuIWZ1bmN0aW9uICgpIHtcclxufShkb2N1bWVudCwgd2luZG93KTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZiwgRE9NT2JqZWN0LCB0eXBlT2ZMb2FkKSB7XHJcblxyXG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xyXG4gICAgbGV0IGN1cnJlbnRTbGlkZUFycmF5SW5kZXggPSBzZWxmLmRhdGEuc2xpZGUgLSAxO1xyXG5cclxuICAgIGxldCBzb3VyY2VEaW1lbnNpb25zID0gZnVuY3Rpb24gKHNvdXJjZUVsZW0sIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQpIHtcclxuICAgICAgICBpZiAodHlwZW9mICBzb3VyY2VXaWR0aCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBzb3VyY2VXaWR0aCA9IHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50LnJlbWVtYmVyZFdpZHRoO1xyXG4gICAgICAgICAgICBzb3VyY2VIZWlnaHQgPSBzZWxmLmRhdGEub25SZXNpemVFdmVudC5yZW1lbWJlcmRIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjb2VmZmljaWVudCA9IHNvdXJjZVdpZHRoIC8gc291cmNlSGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IGRldmljZVdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgY29uc3QgZGV2aWNlSGVpZ2h0ID0gcGFyc2VJbnQoc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5zdHlsZS5oZWlnaHQpO1xyXG4gICAgICAgIGxldCBuZXdIZWlnaHQgPSBkZXZpY2VXaWR0aCAvIGNvZWZmaWNpZW50O1xyXG4gICAgICAgIGlmIChuZXdIZWlnaHQgPCBkZXZpY2VIZWlnaHQgLSA2MCkge1xyXG4gICAgICAgICAgICBzb3VyY2VFbGVtLnN0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgc291cmNlRWxlbS5zdHlsZS53aWR0aCA9IGRldmljZVdpZHRoICsgXCJweFwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld0hlaWdodCA9IGRldmljZUhlaWdodCAtIDYwO1xyXG4gICAgICAgICAgICBzb3VyY2VFbGVtLnN0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgc291cmNlRWxlbS5zdHlsZS53aWR0aCA9IG5ld0hlaWdodCAqIGNvZWZmaWNpZW50ICsgXCJweFwiO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIGZhZGUgaW4gY2xhc3MgYW5kIGRpbWVuc2lvbiBmdW5jdGlvblxyXG4gICAgICovXHJcbiAgICBsZXQgb25sb2FkTGlzdGVuZXIgPSBmdW5jdGlvbiAoc291cmNlRWxlbSwgc291cmNlV2lkdGgsIHNvdXJjZUhlaWdodCwgYXJyYXlJbmRleCkge1xyXG5cclxuICAgICAgICBsZXQgc291cmNlSG9sZGVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc291cmNlLWhvbGRlciddKTtcclxuXHJcbiAgICAgICAgLy9ub3JtYWwgc291cmNlIGRpbWVuc2lvbnMgbmVlZHMgdG8gYmUgc3RvcmVkIGluIGFycmF5XHJcbiAgICAgICAgLy9pdCB3aWxsIGJlIG5lZWRlZCB3aGVuIGxvYWRpbmcgc291cmNlIGZyb20gbWVtb3J5XHJcbiAgICAgICAgc2VsZi5kYXRhLnJlbWVtYmVyZWRTb3VyY2VzRGltZW5zaW9uc1thcnJheUluZGV4XSA9IHtcclxuICAgICAgICAgICAgXCJ3aWR0aFwiOiBzb3VyY2VXaWR0aCxcclxuICAgICAgICAgICAgXCJoZWlnaHRcIjogc291cmNlSGVpZ2h0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9hZGQgc29tZSBmYWRlIGluIGFuaW1hdGlvblxyXG4gICAgICAgIHNvdXJjZUVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1mYWRlLWluJyk7XHJcbiAgICAgICAgdm9pZCBzb3VyY2VFbGVtLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIHNvdXJjZUVsZW0uY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1mYWRlLWluJyk7XHJcblxyXG4gICAgICAgIC8vYWRkIG1ldGhvZCB0aGF0IGNoYW5nZXMgc291cmNlIGRpbWVuc2lvbiBvbiB3aW5kb3cgcmVzaXplXHJcbiAgICAgICAgc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQuc291cmNlRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc291cmNlRGltZW5zaW9ucyhzb3VyY2VFbGVtLCBzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL3NldCBkaW1lbnNpb24gZm9yIHRoZSBmaXJzdCB0aW1lXHJcbiAgICAgICAgc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQuc291cmNlRGltZW5zaW9ucyhzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgLy8gZGltZW5zaW9ucyB3aWxsIGJlIGdpdmVuIG9ubHkgb25lIHRpbWUgc28gd2Ugd2lsbCBuZWVkIHRvIHJlbWVtYmVyIGl0XHJcbiAgICAgICAgLy8gZm9yIG5leHQgb25yZXNpemUgZXZlbnQgY2FsbHNcclxuICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudC5yZW1lbWJlcmRXaWR0aCA9IHNvdXJjZVdpZHRoO1xyXG4gICAgICAgIHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50LnJlbWVtYmVyZEhlaWdodCA9IHNvdXJjZUhlaWdodDtcclxuXHJcbiAgICAgICAgc291cmNlSG9sZGVyLmFwcGVuZENoaWxkKHNvdXJjZUVsZW0pO1xyXG4gICAgICAgIHNlbGYuZGF0YS5zb3VyY2VzW2FycmF5SW5kZXhdID0gc291cmNlSG9sZGVyO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHR5cGVPZkxvYWQpIHtcclxuICAgICAgICAgICAgY2FzZSAnaW5pdGlhbCc6XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFwcGVuZE1ldGhvZHMuaW5pdGlhbEFwcGVuZChzZWxmKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMubG9hZFlvdXR1YmV2aWRlbyA9IGZ1bmN0aW9uICh2aWRlb0lkLCBhcnJheUluZGV4KSB7XHJcbiAgICAgICAgbGV0IGlmcmFtZSA9IG5ldyBET01PYmplY3QoJ2lmcmFtZScpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNpbmdsZS1zb3VyY2UnXSk7XHJcbiAgICAgICAgaWZyYW1lLnNyYyA9ICcvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8nICsgdmlkZW9JZDtcclxuICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvd2Z1bGxzY3JlZW4nLCAnJyk7XHJcbiAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnZnJhbWVib3JkZXInLCAnMCcpO1xyXG4gICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcclxuICAgICAgICBvbmxvYWRMaXN0ZW5lcihpZnJhbWUsIDE5MjAsIDEwODAsIGFycmF5SW5kZXgpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5pbWFnZUxvYWQgPSBmdW5jdGlvbiAoc3JjLCBhcnJheUluZGV4KSB7XHJcbiAgICAgICAgbGV0IHNvdXJjZUVsZW0gPSBuZXcgRE9NT2JqZWN0KCdpbWcnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zaW5nbGUtc291cmNlJ10pO1xyXG4gICAgICAgIHNvdXJjZUVsZW0uc3JjID0gc3JjO1xyXG4gICAgICAgIHNvdXJjZUVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb25sb2FkTGlzdGVuZXIoc291cmNlRWxlbSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIGFycmF5SW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy52aWRlb0xvYWQgPSBmdW5jdGlvbiAoc3JjLCBhcnJheUluZGV4KSB7XHJcbiAgICAgICAgbGV0IHZpZGVvRWxlbSA9IG5ldyBET01PYmplY3QoJ3ZpZGVvJykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2luZ2xlLXNvdXJjZSddKTtcclxuICAgICAgICBsZXQgc291cmNlID0gbmV3IERPTU9iamVjdCgnc291cmNlJykuZWxlbTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzb3VyY2Uub2Zmc2V0V2lkdGgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHNvdXJjZS52aWRlb1dpZHRoKTtcclxuICAgICAgICBzb3VyY2Uuc3JjID0gc3JjO1xyXG4gICAgICAgIHZpZGVvRWxlbS5pbm5lclRleHQgPSAnU29ycnksIHlvdXIgYnJvd3NlciBkb2VzblxcJ3Qgc3VwcG9ydCBlbWJlZGRlZCB2aWRlb3MsIDxhXFxuJyArXHJcbiAgICAgICAgICAgICcgICAgICAgICAgICBocmVmPVwiaHR0cDovL2Rvd25sb2FkLmJsZW5kZXIub3JnL3BlYWNoL2JpZ2J1Y2tidW5ueV9tb3ZpZXMvQmlnQnVja0J1bm55XzMyMHgxODAubXA0XCI+ZG93bmxvYWQ8L2E+IGFuZCB3YXRjaFxcbicgK1xyXG4gICAgICAgICAgICAnICAgICAgICB3aXRoIHlvdXIgZmF2b3JpdGUgdmlkZW8gcGxheWVyISc7XHJcblxyXG4gICAgICAgIHZpZGVvRWxlbS5zZXRBdHRyaWJ1dGUoJ2NvbnRyb2xzJywgJycpO1xyXG4gICAgICAgIHZpZGVvRWxlbS5hcHBlbmRDaGlsZChzb3VyY2UpO1xyXG4gICAgICAgIHZpZGVvRWxlbS5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb25sb2FkTGlzdGVuZXIodmlkZW9FbGVtLCB0aGlzLnZpZGVvV2lkdGgsIHRoaXMudmlkZW9IZWlnaHQsIGFycmF5SW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtID0gZnVuY3Rpb24gKHNvdXJjZVVybCkge1xyXG4gICAgICAgIGNvbnN0IHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICBjb25zdCBpbmRleE9mU291cmNlID0gc2VsZi5kYXRhLnVybHMuaW5kZXhPZihzb3VyY2VVcmwpO1xyXG5cclxuICAgICAgICBwYXJzZXIuaHJlZiA9IHNvdXJjZVVybDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0SWQoc291cmNlVXJsKSB7XHJcbiAgICAgICAgICAgIGxldCByZWdFeHAgPSAvXi4qKHlvdXR1LmJlXFwvfHZcXC98dVxcL1xcd1xcL3xlbWJlZFxcL3x3YXRjaFxcP3Y9fFxcJnY9KShbXiNcXCZcXD9dKikuKi87XHJcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IHNvdXJjZVVybC5tYXRjaChyZWdFeHApO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1hdGNoICYmIG1hdGNoWzJdLmxlbmd0aCA9PSAxMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoWzJdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdlcnJvcic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAocGFyc2VyLmhvc3RuYW1lID09PSAnd3d3LnlvdXR1YmUuY29tJykge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRZb3V0dWJldmlkZW8oZ2V0SWQoc291cmNlVXJsKSwgaW5kZXhPZlNvdXJjZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHhoci5vbmxvYWRzdGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSBcImJsb2JcIjtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIHdoYXQgdHlwZSBvZiBmaWxlIHByb3ZpZGVkIGZyb20gbGlua1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzcG9uc2VUeXBlID0geGhyLnJlc3BvbnNlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZS5pbmRleE9mKCcvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZS5zbGljZSgwLCByZXNwb25zZVR5cGUuaW5kZXhPZignLycpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZVR5cGUgPT09ICdpbWFnZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmltYWdlTG9hZChVUkwuY3JlYXRlT2JqZWN0VVJMKHhoci5yZXNwb25zZSksIGluZGV4T2ZTb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2VUeXBlID09PSAndmlkZW8nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy52aWRlb0xvYWQoVVJMLmNyZWF0ZU9iamVjdFVSTCh4aHIucmVzcG9uc2UpLCBpbmRleE9mU291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHhoci5vcGVuKCdnZXQnLCBzb3VyY2VVcmwsIHRydWUpO1xyXG4gICAgICAgICAgICB4aHIuc2VuZChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmKHR5cGVPZkxvYWQgPT09ICdpbml0aWFsJykge1xyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc2VsZi5kYXRhLnVybHNbY3VycmVudFNsaWRlQXJyYXlJbmRleF0pO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbShzZWxmLmRhdGEudXJsc1tjdXJyZW50U2xpZGVBcnJheUluZGV4ICsgMV0pO1xyXG4gICAgICAgIGlmKGN1cnJlbnRTbGlkZUFycmF5SW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNlbGYuZGF0YS51cmxzW3NlbGYuZGF0YS51cmxzLmxlbmd0aCAtIDFdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oY3VycmVudFNsaWRlQXJyYXlJbmRleCAtIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy9pZiBmaXJzdCB0aW1lIGxvYWQgYWRkIGxvYWRlclxyXG4gICAgaWYgKHNlbGYuZGF0YS5pc0ZpcnN0VGltZUxvYWQgPT09IHRydWUpIHtcclxuICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwibGRzLXJpbmdcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgc2VsZi5kYXRhLmlzRmlyc3RUaW1lTG9hZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKlxyXG5cclxuXHJcbiAgICAvL2NoZWNrIGlmIHNvdXJjZSB3YXMgcHJldmlvdXNseSBjcmVhdGVkIGFuZFxyXG4gICAgLy8gY3JlYXRlIGl0IGlmIGl0IHdhc24ndCBvciBpZiBpdCB3YXMgbG9hZCBpdCBmcm9tIHZhcmlhYmxlXHJcbiAgICBpZiAodHlwZW9mIHNlbGYuZGF0YS5zb3VyY2VzW2luZGV4T2ZTb3VyY2VVUkxdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdsb2FkZWQgZnJvbSBtZW1vcnknKTtcclxuICAgICAgICBjb25zdCBzb3VyY2VFbGVtID0gc2VsZi5kYXRhLnNvdXJjZXNbaW5kZXhPZlNvdXJjZVVSTF07XHJcbiAgICAgICAgY29uc3QgcmVtZW1iZXJlZFNvdXJjZURpbWVuc2lvbnMgPSBzZWxmLmRhdGEucmVtZW1iZXJlZFNvdXJjZXNEaW1lbnNpb25zW2luZGV4T2ZTb3VyY2VVUkxdO1xyXG4gICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5hcHBlbmRDaGlsZChzb3VyY2VFbGVtKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzb3VyY2VFbGVtKTtcclxuXHJcbiAgICAgICAgc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQuc291cmNlRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc291cmNlRGltZW5zaW9ucyhcclxuICAgICAgICAgICAgICAgIHNvdXJjZUVsZW0sXHJcbiAgICAgICAgICAgICAgICByZW1lbWJlcmVkU291cmNlRGltZW5zaW9ucy53aWR0aCxcclxuICAgICAgICAgICAgICAgIHJlbWVtYmVyZWRTb3VyY2VEaW1lbnNpb25zLmhlaWdodFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQuc291cmNlRGltZW5zaW9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgICovXHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZiwgRE9NT2JqZWN0KSB7XHJcbiAgICBsZXQgcHJpdmF0ZU1ldGhvZHMgPSB7XHJcbiAgICAgICAgcmVuZGVyTmF2OiBmdW5jdGlvbiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5uYXYgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1uYXYnXSk7XHJcbiAgICAgICAgICAgIG5ldyBzZWxmLnRvb2xiYXIoKS5yZW5kZXJUb29sYmFyKHNlbGYuZGF0YS5uYXYpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZUNvdW50ZXIgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIG5ldyBzZWxmLnNsaWRlQ291bnRlckVsZW0oKS5yZW5kZXJTbGlkZUNvdW50ZXIoc2VsZi5kYXRhLm5hdik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxmLmRhdGEubmF2KTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXJTbGlkZUJ1dHRvbnM6IGZ1bmN0aW9uIChjb250YWluZXIpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZUJ1dHRvbnMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vcmVuZGVyIGxlZnQgYnRuXHJcbiAgICAgICAgICAgIGxldCBsZWZ0X2J0bl9jb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4tY29udGFpbmVyJ10pO1xyXG4gICAgICAgICAgICBsZXQgYnRuID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtYnRuJywgJ2J1dHRvbi1zdHlsZSddKTtcclxuICAgICAgICAgICAgYnRuLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgbmV3IHNlbGYuU1ZHSWNvbigpLmdldFNWR0ljb24oJ004LjM4OCwxMC4wNDlsNC43Ni00Ljg3M2MwLjMwMy0wLjMxLDAuMjk3LTAuODA0LTAuMDEyLTEuMTA1Yy0wLjMwOS0wLjMwNC0wLjgwMy0wLjI5My0xLjEwNSwwLjAxMkw2LjcyNiw5LjUxNmMtMC4zMDMsMC4zMS0wLjI5NiwwLjgwNSwwLjAxMiwxLjEwNWw1LjQzMyw1LjMwN2MwLjE1MiwwLjE0OCwwLjM1LDAuMjIzLDAuNTQ3LDAuMjIzYzAuMjAzLDAsMC40MDYtMC4wOCwwLjU1OS0wLjIzNmMwLjMwMy0wLjMwOSwwLjI5NS0wLjgwMy0wLjAxMi0xLjEwNEw4LjM4OCwxMC4wNDl6JylcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxlZnRfYnRuX2NvbnRhaW5lcik7XHJcblxyXG4gICAgICAgICAgICAvLyBzbGlkZSBvYmplY3QgdGhhdCBjb250YWlucyBjaGFuZ2luZyBzbGlkZSBtZXRob2RzXHJcbiAgICAgICAgICAgIGxldCBzbGlkZSA9IG5ldyBzZWxmLnNsaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAvL2dvIHRvIHByZXZpb3VzIHNsaWRlIG9uY2xpY2tcclxuICAgICAgICAgICAgbGVmdF9idG5fY29udGFpbmVyLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZS5wcmV2aW91c1NsaWRlVmlhQnV0dG9uKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZWZ0X2J0bl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYnRuKTtcclxuICAgICAgICAgICAgbGV0IHJpZ2h0X2J0bl9jb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4tY29udGFpbmVyJywgJ2ZzbGlnaHRib3gtc2xpZGUtYnRuLXJpZ2h0LWNvbnRhaW5lciddKTtcclxuICAgICAgICAgICAgYnRuID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtYnRuJywgJ2J1dHRvbi1zdHlsZSddKTtcclxuICAgICAgICAgICAgYnRuLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgbmV3IHNlbGYuU1ZHSWNvbigpLmdldFNWR0ljb24oJ00xMS42MTEsMTAuMDQ5bC00Ljc2LTQuODczYy0wLjMwMy0wLjMxLTAuMjk3LTAuODA0LDAuMDEyLTEuMTA1YzAuMzA5LTAuMzA0LDAuODAzLTAuMjkzLDEuMTA1LDAuMDEybDUuMzA2LDUuNDMzYzAuMzA0LDAuMzEsMC4yOTYsMC44MDUtMC4wMTIsMS4xMDVMNy44MywxNS45MjhjLTAuMTUyLDAuMTQ4LTAuMzUsMC4yMjMtMC41NDcsMC4yMjNjLTAuMjAzLDAtMC40MDYtMC4wOC0wLjU1OS0wLjIzNmMtMC4zMDMtMC4zMDktMC4yOTUtMC44MDMsMC4wMTItMS4xMDRMMTEuNjExLDEwLjA0OXonKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgLy9nbyB0byBuZXh0IHNsaWRlIG9uY2xpY2tcclxuICAgICAgICAgICAgcmlnaHRfYnRuX2NvbnRhaW5lci5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2xpZGUubmV4dFNsaWRlVmlhQnV0dG9uKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJpZ2h0X2J0bl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYnRuKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJpZ2h0X2J0bl9jb250YWluZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9kaXNhYmxlIHNjcm9sbGluZ1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LW9wZW4nKTtcclxuXHJcbiAgICAvL2NyZWF0ZSBjb250YWluZXJcclxuICAgIGxldCBjb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1jb250YWluZXInXSk7XHJcbiAgICBjb250YWluZXIuaWQgPSBcImZzbGlnaHRib3gtY29udGFpbmVyXCI7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcblxyXG4gICAgLy9yZW5kZXIgc2xpZGUgYnV0dG9ucyBhbmQgbmF2KHRvb2xiYXIpXHJcbiAgICBwcml2YXRlTWV0aG9kcy5yZW5kZXJOYXYoY29udGFpbmVyKTtcclxuICAgIHByaXZhdGVNZXRob2RzLnJlbmRlclNsaWRlQnV0dG9ucyhjb250YWluZXIpO1xyXG5cclxuICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlciA9IG5ldyBzZWxmLm1lZGlhSG9sZGVyKCk7XHJcbiAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIucmVuZGVySG9sZGVyKGNvbnRhaW5lcik7XHJcblxyXG4gICAgc2VsZi5kYXRhLmlzZmlyc3RUaW1lTG9hZCA9IHRydWU7XHJcbiAgICBzZWxmLmxvYWRzb3VyY2VzKCdpbml0aWFsJyk7XHJcbn07Il19
