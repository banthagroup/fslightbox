(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * @constructor
 */
window.fsLightboxObject = function () {

    this.data = {
        running: false,
        slide: 1,
        total_slides: 6,
        isRenderingSlideCounter: true,
        isRenderingSlideButtons: true,
        isfirstTimeLoad: false,
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
        sourceElem: {},
        slideCounter: {},
        updateSlideNumber: function() {},
        onResizeEvent: new onResizeEvent()
    };

    /**
     * @type {fsLightboxObject}
     */
    let self = this;


    this.init = function () {
        new self.dom();
    };


    /**
     * @constructor
     */
    this.dom = function () {
        let module = require('./renderDOM.js');
        this.renderedDOM = new module(self, DOMObject);
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
        this.rememberdWidth = 0;
        this.rememberdHeight = 0;

        this.mediaHolderDimensions = function () {
        };
        this.sourceDimensions = function () {
        };
        let eventThis = this;
        window.onresize = function () {
            eventThis.mediaHolderDimensions();
            eventThis.sourceDimensions();
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
    this.slideCounter = function () {
        let numberContainer = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-number-container']);
        self.data.currentSlideDOM = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-slide-number']);

        self.data.currentSlideDOM.innerHTML = self.data.slide;
        self.data.currentSlideDOM.id = 'current_slide';

        let space = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-slide-number']);
        space.innerHTML = '/';

        let slides = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-slide-number']);
        slides.innerHTML = self.data.total_slides;

        numberContainer.appendChild(self.data.currentSlideDOM);
        numberContainer.appendChild(space);
        numberContainer.appendChild(slides);

        // this method is called after switching slides
        self.data.updateSlideNumber = function () {
            self.data.currentSlideDOM.innerHTML = self.data.slide;
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
        this.holder.style.height = window.innerHeight + 'px';
        self.data.onResizeEvent.mediaHolderDimensions = function () {
            self.data.mediaHolder.holder.style.height = window.innerHeight + 'px';
        };
        this.renderHolder = function (container) {
            container.appendChild(this.holder);
        };
    };


    this.loadsource = function (url) {
        const loadsourcemodule = require("./loadSource.js");
        return new loadsourcemodule(self, DOMObject, url);
    };


    this.slideByDrag = function () {

    };
};


!function () {
}(document, window);

},{"./loadSource.js":2,"./renderDOM.js":3}],2:[function(require,module,exports){
module.exports = function (self, DOMObject, url) {

    const indexOfSourceURL = self.data.urls.indexOf(url);
    const _this = this;

    let sourceDimensions = function (sourceElem, sourceWidth, sourceHeight) {
        if (typeof  sourceWidth === "undefined") {
            sourceWidth = self.data.onResizeEvent.rememberdWidth;
            sourceHeight = self.data.onResizeEvent.rememberdHeight;
        }

        const coefficient = sourceWidth / sourceHeight;
        const deviceWidth = window.innerWidth;
        const deviceHeight = window.innerHeight;
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
    let onloadListener = function (sourceElem, sourceWidth, sourceHeight) {

        //add method that changes source dimension on window resize
        self.data.onResizeEvent.sourceDimensions = function () {
            sourceDimensions(sourceElem, sourceWidth, sourceHeight);
        };

        // dimensions will be given only one time so we will need to remember it
        // for next onresize event calls
        self.data.onResizeEvent.rememberdWidth = sourceWidth;
        self.data.onResizeEvent.rememberdHeight = sourceHeight;

        //normal source dimensions needs to be stored in array
        //it will be needed when loading source from memory
        self.data.rememberedSourcesDimensions[indexOfSourceURL] = {
            "width": sourceWidth,
            "height": sourceHeight
        };
        //set dimension for the first time
        self.data.onResizeEvent.sourceDimensions(sourceWidth, sourceHeight);

        //append elem
        self.data.mediaHolder.holder.innerHTML = '';
        self.data.mediaHolder.holder.appendChild(sourceElem);

        //add some fade in animation
        sourceElem.classList.remove('fslightbox-fade-in');
        void sourceElem.offsetWidth;
        sourceElem.classList.add('fslightbox-fade-in');

        //push elem to array from where it will be loaded again if needed
        self.data.sources[indexOfSourceURL] = sourceElem;
    };


    this.loadYoutubevideo = function (videoId) {
        let iframe = new DOMObject('iframe').addClassesAndCreate(['fslightbox-single-source']);
        iframe.src = '//www.youtube.com/embed/' + videoId;
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('frameborder', '0');
        this.data.mediaHolder.holder.appendChild(iframe);
        onloadListener(iframe, 1920, 1080);
    };


    this.imageLoad = function (src) {
        let sourceElem = new DOMObject('img').addClassesAndCreate(['fslightbox-single-source']);
        let loader = new DOMObject('div').addClassesAndCreate(['fslightbox-loader']);
        self.data.mediaHolder.holder.appendChild(loader);
        sourceElem.src = src;
        sourceElem.addEventListener('load', function () {
            onloadListener(sourceElem, this.width, this.height);
        });
    };


    this.videoLoad = function (src) {
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
        //let loader = new DOMObject('div').addClassesAndCreate(['fslightbox-loader']);
        videoElem.addEventListener('loadedmetadata', function () {
            onloadListener(videoElem, this.videoWidth, this.videoHeight);
        });
    };


    this.createSourceElem = function () {
        const parser = document.createElement('a');
        parser.href = url;

        function getId(url) {
            let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            let match = url.match(regExp);

            if (match && match[2].length == 11) {
                return match[2];
            } else {
                return 'error';
            }
        }


        if (parser.hostname === 'www.youtube.com') {
            this.loadYoutubevideo(getId(url));
        } else {
            const xhr = new XMLHttpRequest();
            xhr.onloadstart = function () {
                xhr.responseType = "blob";
            };

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let responseType = xhr.response.type;
                        responseType.indexOf('/');
                        responseType = responseType.slice(0, responseType.indexOf('/'));

                        if (responseType === 'image') {
                            _this.imageLoad(URL.createObjectURL(xhr.response));
                        }

                        if (responseType === 'video') {
                            _this.videoLoad(URL.createObjectURL(xhr.response));
                        }
                    }
                }
            };

            xhr.open('get', url, true);
            xhr.send(null);
        }
    };


    //if first time load add loader
    if (self.data.isfirstTimeLoad === true) {
        self.data.mediaHolder.holder.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
        self.data.isfirstTimeLoad = false;
    }

    //check if source was previously created and
    // create it if it wasn't or if it was load it from variable
    if (typeof self.data.sources[indexOfSourceURL] === "undefined") {
        this.createSourceElem();
    } else {
        const sourceElem = self.data.sources[indexOfSourceURL];
        const rememberedSourceDimensions = self.data.rememberedSourcesDimensions[indexOfSourceURL];
        self.data.mediaHolder.holder.innerHTML = '';
        self.data.mediaHolder.holder.appendChild(sourceElem);

        self.data.onResizeEvent.sourceDimensions = function () {
            sourceDimensions(
                sourceElem,
                rememberedSourceDimensions.width,
                rememberedSourceDimensions.height
            );
        };
        self.data.onResizeEvent.sourceDimensions();
    }


    // let index = 1;
    // setInterval( function () {
    //
    //     if(index === 6){
    //         index = 0;
    //     }
    //
    //     if(typeof self.data.sources[index] !== "undefined") {
    //         self.data.mediaHolder.holder.innerHTML = '';
    //         self.data.mediaHolder.holder.appendChild(self.data.sources[index]);
    //         index++;
    //         return;
    //     }
    //
    //     const xhr = new XMLHttpRequest();
    //     xhr.onloadstart = function() {
    //         xhr.responseType = "blob";
    //     };
    //     xhr.onreadystatechange = function() {
    //         if(xhr.readyState === 4) {
    //             if(xhr.status === 200) {
    //                 sourceElem.src = URL.createObjectURL(xhr.response);
    //             }
    //         }
    //     };
    //     xhr.open('get', self.data.urls[index], true);
    //     xhr.send(null);
    //
    //     self.data.mediaHolder.holder.innerHTML = '';
    //     self.data.sourceElem = new DOMObject('img').addClassesAndCreate(['fslightbox-single-source']);
    //
    //     sourceElem.onload = function() {
    //         self.data.onResizeEvent.rememberdWidth = this.width;
    //         self.data.onResizeEvent.rememberdHeight = this.height;
    //         self.data.onResizeEvent.sourceDimensions(this.width, this.height);
    //         self.data.mediaHolder.holder.appendChild(self.data.sourceElem);
    //         sourceElem.classList.remove('fslightbox-fade-in');
    //         void sourceElem.offsetWidth;
    //         sourceElem.classList.add('fslightbox-fade-in');
    //         self.data.sources.push(self.data.sourceElem);
    //         console.log(self.data.sources);
    //     };
    //     index++;
    // },500);
};
},{}],3:[function(require,module,exports){
module.exports = function(self, DOMObject) {
    let privateMethods = {
        renderNav: function (container) {
            let nav = new DOMObject('div').addClassesAndCreate(['fslightbox-nav']);

            let toolbar = new self.toolbar();
            new self.toolbar().renderToolbar(nav);

            new self.slideCounter().renderSlideCounter(nav);

            container.appendChild(nav);
        },
        renderSlideButtons: function (container) {
            if (self.data.isRenderingSlideButtons === false) {
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
    self.loadsource(self.data.urls[0]);
};
},{}]},{},[1,3,2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvbG9hZFNvdXJjZS5qcyIsInNyYy9qcy9yZW5kZXJET00uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9OQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbndpbmRvdy5mc0xpZ2h0Ym94T2JqZWN0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHRoaXMuZGF0YSA9IHtcclxuICAgICAgICBydW5uaW5nOiBmYWxzZSxcclxuICAgICAgICBzbGlkZTogMSxcclxuICAgICAgICB0b3RhbF9zbGlkZXM6IDYsXHJcbiAgICAgICAgaXNSZW5kZXJpbmdTbGlkZUNvdW50ZXI6IHRydWUsXHJcbiAgICAgICAgaXNSZW5kZXJpbmdTbGlkZUJ1dHRvbnM6IHRydWUsXHJcbiAgICAgICAgaXNmaXJzdFRpbWVMb2FkOiBmYWxzZSxcclxuICAgICAgICBpc1JlbmRlcmluZ1Rvb2xiYXJCdXR0b25zOiB7XHJcbiAgICAgICAgICAgIFwiY2xvc2VcIjogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXJsczogW1xyXG4gICAgICAgICAgICBcImltYWdlcy8xLmpwZWdcIixcclxuICAgICAgICAgICAgXCJpbWFnZXMvMi5qcGdcIixcclxuICAgICAgICAgICAgXCJpbWFnZXMvMy5qcGVnXCIsXHJcbiAgICAgICAgICAgIFwiaW1hZ2VzLzQuanBlZ1wiLFxyXG4gICAgICAgICAgICBcImltYWdlcy81LmpwZ1wiLFxyXG4gICAgICAgICAgICBcImltYWdlcy82LmpwZ1wiLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc291cmNlczogW10sXHJcbiAgICAgICAgcmVtZW1iZXJlZFNvdXJjZXNEaW1lbnNpb25zOiBbXSxcclxuICAgICAgICBtZWRpYUhvbGRlcjoge30sXHJcbiAgICAgICAgc291cmNlRWxlbToge30sXHJcbiAgICAgICAgc2xpZGVDb3VudGVyOiB7fSxcclxuICAgICAgICB1cGRhdGVTbGlkZU51bWJlcjogZnVuY3Rpb24oKSB7fSxcclxuICAgICAgICBvblJlc2l6ZUV2ZW50OiBuZXcgb25SZXNpemVFdmVudCgpXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge2ZzTGlnaHRib3hPYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcblxyXG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG5ldyBzZWxmLmRvbSgpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgdGhpcy5kb20gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IG1vZHVsZSA9IHJlcXVpcmUoJy4vcmVuZGVyRE9NLmpzJyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlZERPTSA9IG5ldyBtb2R1bGUoc2VsZiwgRE9NT2JqZWN0KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZzbGlnaHRib3gtY29udGFpbmVyJykucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGUgZG9tIGVsZW1lbnQgd2l0aCBjbGFzc2VzXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gRE9NT2JqZWN0KHRhZykge1xyXG4gICAgICAgIHRoaXMuZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRDbGFzc2VzQW5kQ3JlYXRlID0gZnVuY3Rpb24gKGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggaW4gY2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3Nlc1tpbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsZW1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JqZWN0IHRoYXQgY29udGFpbnMgYWxsIGFjdGlvbnMgdGhhdCBmc2xpZ2h0Ym94IGlzIGRvaW5nIGR1cmluZyBydW5uaW5nXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gb25SZXNpemVFdmVudCgpIHtcclxuICAgICAgICB0aGlzLnJlbWVtYmVyZFdpZHRoID0gMDtcclxuICAgICAgICB0aGlzLnJlbWVtYmVyZEhlaWdodCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMubWVkaWFIb2xkZXJEaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zb3VyY2VEaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGV2ZW50VGhpcyA9IHRoaXM7XHJcbiAgICAgICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBldmVudFRoaXMubWVkaWFIb2xkZXJEaW1lbnNpb25zKCk7XHJcbiAgICAgICAgICAgIGV2ZW50VGhpcy5zb3VyY2VEaW1lbnNpb25zKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTVkdJY29uIG9iamVjdCB3aXRoIGdldFNWR0ljb24gbWV0aG9kIHdoaWNoIHJldHVybiA8c3ZnPiBlbGVtZW50IHdpdGggPHBhdGg+IGNoaWxkXHJcbiAgICAgKiBAcmV0dXJucyB7RWxlbWVudH1cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLlNWR0ljb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIDxzdmc+IHdpdGggYWRkZWQgJ2ZzbGlnaHRib3gtc3ZnLWljb24nIGNsYXNzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgXCJzdmdcIik7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGNoaWxkIG9mIHN2ZyBlbXB0eSA8cGF0aD5cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgXCJwYXRoXCIpO1xyXG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICdjbGFzcycsICdmc2xpZ2h0Ym94LXN2Zy1pY29uJyk7XHJcbiAgICAgICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3ZpZXdCb3gnLCAnMCAwIDIwIDIwJyk7XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm5zIERPTSA8c3ZnPiBpY29uIGNvbnRhaW5pbmcgPHBhdGg+IGNoaWxkIHdpdGggZCBhdHRyaWJ1dGUgZnJvbSBwYXJhbWV0ZXJcclxuICAgICAgICAgKiBAcGFyYW0gZFxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZ2V0U1ZHSWNvbiA9IGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZCcsIGQpO1xyXG4gICAgICAgICAgICB0aGlzLnN2Zy5hcHBlbmRDaGlsZCh0aGlzLnBhdGgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdmc7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTbGlkZSBjb3VudGVyIG9iamVjdCAtIHVwcGVyIGxlZnQgY29ybmVyIG9mIGZzTGlnaHRib3hcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLnNsaWRlQ291bnRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbnVtYmVyQ29udGFpbmVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtbnVtYmVyLWNvbnRhaW5lciddKTtcclxuICAgICAgICBzZWxmLmRhdGEuY3VycmVudFNsaWRlRE9NID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtc2xpZGUtbnVtYmVyJ10pO1xyXG5cclxuICAgICAgICBzZWxmLmRhdGEuY3VycmVudFNsaWRlRE9NLmlubmVySFRNTCA9IHNlbGYuZGF0YS5zbGlkZTtcclxuICAgICAgICBzZWxmLmRhdGEuY3VycmVudFNsaWRlRE9NLmlkID0gJ2N1cnJlbnRfc2xpZGUnO1xyXG5cclxuICAgICAgICBsZXQgc3BhY2UgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1zbGlkZS1udW1iZXInXSk7XHJcbiAgICAgICAgc3BhY2UuaW5uZXJIVE1MID0gJy8nO1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVzID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtc2xpZGUtbnVtYmVyJ10pO1xyXG4gICAgICAgIHNsaWRlcy5pbm5lckhUTUwgPSBzZWxmLmRhdGEudG90YWxfc2xpZGVzO1xyXG5cclxuICAgICAgICBudW1iZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5kYXRhLmN1cnJlbnRTbGlkZURPTSk7XHJcbiAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNwYWNlKTtcclxuICAgICAgICBudW1iZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoc2xpZGVzKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcyBtZXRob2QgaXMgY2FsbGVkIGFmdGVyIHN3aXRjaGluZyBzbGlkZXNcclxuICAgICAgICBzZWxmLmRhdGEudXBkYXRlU2xpZGVOdW1iZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5jdXJyZW50U2xpZGVET00uaW5uZXJIVE1MID0gc2VsZi5kYXRhLnNsaWRlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyU2xpZGVDb3VudGVyID0gZnVuY3Rpb24gKG5hdikge1xyXG4gICAgICAgICAgICBuYXYuYXBwZW5kQ2hpbGQobnVtYmVyQ29udGFpbmVyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvb2xiYXIgYnV0dG9uXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgdGhpcy50b29sYmFyQnV0dG9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuYnV0dG9uID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtdG9vbGJhci1idXR0b24nLCAnYnV0dG9uLXN0eWxlJ10pO1xyXG5cclxuICAgICAgICB0aGlzLmFkZFNWR0ljb24gPSBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICBsZXQgU1ZHSWNvbiA9IG5ldyBzZWxmLlNWR0ljb24oKS5nZXRTVkdJY29uKGQpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbi5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgIFNWR0ljb25cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmJ1dHRvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb29sYmFyIG9iamVjdCB3aGljaCBjb250YWlucyB0b29sYmFyIGJ1dHRvbnNcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLnRvb2xiYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy50b29sYmFyRWxlbSA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXRvb2xiYXInXSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyRGVmYXVsdEJ1dHRvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBzaG91bGRSZW5kZXJCdXR0b25zID0gc2VsZi5kYXRhLmlzUmVuZGVyaW5nVG9vbGJhckJ1dHRvbnM7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2hvdWxkUmVuZGVyQnV0dG9ucy5jbG9zZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXRvb2xiYXItYnV0dG9uJywgJ2J1dHRvbi1zdHlsZSddKTtcclxuICAgICAgICAgICAgICAgIGxldCBzdmcgPSBuZXcgc2VsZi5TVkdJY29uKCkuZ2V0U1ZHSWNvbignTSAxMS40NjkgMTAgbCA3LjA4IC03LjA4IGMgMC40MDYgLTAuNDA2IDAuNDA2IC0xLjA2NCAwIC0xLjQ2OSBjIC0wLjQwNiAtMC40MDYgLTEuMDYzIC0wLjQwNiAtMS40NjkgMCBMIDEwIDguNTMgbCAtNy4wODEgLTcuMDggYyAtMC40MDYgLTAuNDA2IC0xLjA2NCAtMC40MDYgLTEuNDY5IDAgYyAtMC40MDYgMC40MDYgLTAuNDA2IDEuMDYzIDAgMS40NjkgTCA4LjUzMSAxMCBMIDEuNDUgMTcuMDgxIGMgLTAuNDA2IDAuNDA2IC0wLjQwNiAxLjA2NCAwIDEuNDY5IGMgMC4yMDMgMC4yMDMgMC40NjkgMC4zMDQgMC43MzUgMC4zMDQgYyAwLjI2NiAwIDAuNTMxIC0wLjEwMSAwLjczNSAtMC4zMDQgTCAxMCAxMS40NjkgbCA3LjA4IDcuMDgxIGMgMC4yMDMgMC4yMDMgMC40NjkgMC4zMDQgMC43MzUgMC4zMDQgYyAwLjI2NyAwIDAuNTMyIC0wLjEwMSAwLjczNSAtMC4zMDQgYyAwLjQwNiAtMC40MDYgMC40MDYgLTEuMDY0IDAgLTEuNDY5IEwgMTEuNDY5IDEwIFonKTtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChzdmcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b29sYmFyRWxlbS5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJUb29sYmFyID0gZnVuY3Rpb24gKG5hdikge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckRlZmF1bHRCdXR0b25zKCk7XHJcbiAgICAgICAgICAgIG5hdi5hcHBlbmRDaGlsZCh0aGlzLnRvb2xiYXJFbGVtKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFkZEJ1dHRvblRvVG9vbGJhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHRvb2xiYXJCdXR0b24gPSBuZXcgc2VsZi50b29sYmFyQnV0dG9uKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuc2xpZGUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHRoaXMucHJldmlvdXNTbGlkZVZpYUJ1dHRvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZSA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGF0YS5zbGlkZSAtPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlID0gc2VsZi5kYXRhLnRvdGFsX3NsaWRlc1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2xvYWQgc291cmNlIGJ5IGluZGV4IChhcnJheSBpcyBpbmRleGVkIGZyb20gMCBzbyB3ZSBuZWVkIHRvIGRlY3JlbWVudCBpbmRleClcclxuICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlKHNlbGYuZGF0YS51cmxzW3NlbGYuZGF0YS5zbGlkZSAtIDFdKTtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKCk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMubmV4dFNsaWRlVmlhQnV0dG9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5kYXRhLnNsaWRlIDwgc2VsZi5kYXRhLnRvdGFsX3NsaWRlcykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlICs9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2xvYWQgc291cmNlIGJ5IGluZGV4IChhcnJheSBpcyBpbmRleGVkIGZyb20gMCBzbyB3ZSBuZWVkIHRvIGRlY3JlbWVudCBpbmRleClcclxuICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlKHNlbGYuZGF0YS51cmxzW3NlbGYuZGF0YS5zbGlkZSAtIDFdKTtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLnVwZGF0ZVNsaWRlTnVtYmVyKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXYgdGhhdCBob2xkcyBzb3VyY2UgZWxlbVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1lZGlhSG9sZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuaG9sZGVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtbWVkaWEtaG9sZGVyJ10pO1xyXG4gICAgICAgIHRoaXMuaG9sZGVyLnN0eWxlLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCArICdweCc7XHJcbiAgICAgICAgc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQubWVkaWFIb2xkZXJEaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLnN0eWxlLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCArICdweCc7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnJlbmRlckhvbGRlciA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuaG9sZGVyKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5sb2Fkc291cmNlID0gZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgIGNvbnN0IGxvYWRzb3VyY2Vtb2R1bGUgPSByZXF1aXJlKFwiLi9sb2FkU291cmNlLmpzXCIpO1xyXG4gICAgICAgIHJldHVybiBuZXcgbG9hZHNvdXJjZW1vZHVsZShzZWxmLCBET01PYmplY3QsIHVybCk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGlzLnNsaWRlQnlEcmFnID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH07XHJcbn07XHJcblxyXG5cclxuIWZ1bmN0aW9uICgpIHtcclxufShkb2N1bWVudCwgd2luZG93KTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZiwgRE9NT2JqZWN0LCB1cmwpIHtcclxuXHJcbiAgICBjb25zdCBpbmRleE9mU291cmNlVVJMID0gc2VsZi5kYXRhLnVybHMuaW5kZXhPZih1cmwpO1xyXG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgIGxldCBzb3VyY2VEaW1lbnNpb25zID0gZnVuY3Rpb24gKHNvdXJjZUVsZW0sIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQpIHtcclxuICAgICAgICBpZiAodHlwZW9mICBzb3VyY2VXaWR0aCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBzb3VyY2VXaWR0aCA9IHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50LnJlbWVtYmVyZFdpZHRoO1xyXG4gICAgICAgICAgICBzb3VyY2VIZWlnaHQgPSBzZWxmLmRhdGEub25SZXNpemVFdmVudC5yZW1lbWJlcmRIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjb2VmZmljaWVudCA9IHNvdXJjZVdpZHRoIC8gc291cmNlSGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IGRldmljZVdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgY29uc3QgZGV2aWNlSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgIGxldCBuZXdIZWlnaHQgPSBkZXZpY2VXaWR0aCAvIGNvZWZmaWNpZW50O1xyXG4gICAgICAgIGlmIChuZXdIZWlnaHQgPCBkZXZpY2VIZWlnaHQgLSA2MCkge1xyXG4gICAgICAgICAgICBzb3VyY2VFbGVtLnN0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgc291cmNlRWxlbS5zdHlsZS53aWR0aCA9IGRldmljZVdpZHRoICsgXCJweFwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld0hlaWdodCA9IGRldmljZUhlaWdodCAtIDYwO1xyXG4gICAgICAgICAgICBzb3VyY2VFbGVtLnN0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgc291cmNlRWxlbS5zdHlsZS53aWR0aCA9IG5ld0hlaWdodCAqIGNvZWZmaWNpZW50ICsgXCJweFwiO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIGZhZGUgaW4gY2xhc3MgYW5kIGRpbWVuc2lvbiBmdW5jdGlvblxyXG4gICAgICovXHJcbiAgICBsZXQgb25sb2FkTGlzdGVuZXIgPSBmdW5jdGlvbiAoc291cmNlRWxlbSwgc291cmNlV2lkdGgsIHNvdXJjZUhlaWdodCkge1xyXG5cclxuICAgICAgICAvL2FkZCBtZXRob2QgdGhhdCBjaGFuZ2VzIHNvdXJjZSBkaW1lbnNpb24gb24gd2luZG93IHJlc2l6ZVxyXG4gICAgICAgIHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50LnNvdXJjZURpbWVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZURpbWVuc2lvbnMoc291cmNlRWxlbSwgc291cmNlV2lkdGgsIHNvdXJjZUhlaWdodCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gZGltZW5zaW9ucyB3aWxsIGJlIGdpdmVuIG9ubHkgb25lIHRpbWUgc28gd2Ugd2lsbCBuZWVkIHRvIHJlbWVtYmVyIGl0XHJcbiAgICAgICAgLy8gZm9yIG5leHQgb25yZXNpemUgZXZlbnQgY2FsbHNcclxuICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudC5yZW1lbWJlcmRXaWR0aCA9IHNvdXJjZVdpZHRoO1xyXG4gICAgICAgIHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50LnJlbWVtYmVyZEhlaWdodCA9IHNvdXJjZUhlaWdodDtcclxuXHJcbiAgICAgICAgLy9ub3JtYWwgc291cmNlIGRpbWVuc2lvbnMgbmVlZHMgdG8gYmUgc3RvcmVkIGluIGFycmF5XHJcbiAgICAgICAgLy9pdCB3aWxsIGJlIG5lZWRlZCB3aGVuIGxvYWRpbmcgc291cmNlIGZyb20gbWVtb3J5XHJcbiAgICAgICAgc2VsZi5kYXRhLnJlbWVtYmVyZWRTb3VyY2VzRGltZW5zaW9uc1tpbmRleE9mU291cmNlVVJMXSA9IHtcclxuICAgICAgICAgICAgXCJ3aWR0aFwiOiBzb3VyY2VXaWR0aCxcclxuICAgICAgICAgICAgXCJoZWlnaHRcIjogc291cmNlSGVpZ2h0XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL3NldCBkaW1lbnNpb24gZm9yIHRoZSBmaXJzdCB0aW1lXHJcbiAgICAgICAgc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQuc291cmNlRGltZW5zaW9ucyhzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgLy9hcHBlbmQgZWxlbVxyXG4gICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5hcHBlbmRDaGlsZChzb3VyY2VFbGVtKTtcclxuXHJcbiAgICAgICAgLy9hZGQgc29tZSBmYWRlIGluIGFuaW1hdGlvblxyXG4gICAgICAgIHNvdXJjZUVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1mYWRlLWluJyk7XHJcbiAgICAgICAgdm9pZCBzb3VyY2VFbGVtLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIHNvdXJjZUVsZW0uY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1mYWRlLWluJyk7XHJcblxyXG4gICAgICAgIC8vcHVzaCBlbGVtIHRvIGFycmF5IGZyb20gd2hlcmUgaXQgd2lsbCBiZSBsb2FkZWQgYWdhaW4gaWYgbmVlZGVkXHJcbiAgICAgICAgc2VsZi5kYXRhLnNvdXJjZXNbaW5kZXhPZlNvdXJjZVVSTF0gPSBzb3VyY2VFbGVtO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5sb2FkWW91dHViZXZpZGVvID0gZnVuY3Rpb24gKHZpZGVvSWQpIHtcclxuICAgICAgICBsZXQgaWZyYW1lID0gbmV3IERPTU9iamVjdCgnaWZyYW1lJykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2luZ2xlLXNvdXJjZSddKTtcclxuICAgICAgICBpZnJhbWUuc3JjID0gJy8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLycgKyB2aWRlb0lkO1xyXG4gICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FsbG93ZnVsbHNjcmVlbicsICcnKTtcclxuICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdmcmFtZWJvcmRlcicsICcwJyk7XHJcbiAgICAgICAgdGhpcy5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5hcHBlbmRDaGlsZChpZnJhbWUpO1xyXG4gICAgICAgIG9ubG9hZExpc3RlbmVyKGlmcmFtZSwgMTkyMCwgMTA4MCk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGlzLmltYWdlTG9hZCA9IGZ1bmN0aW9uIChzcmMpIHtcclxuICAgICAgICBsZXQgc291cmNlRWxlbSA9IG5ldyBET01PYmplY3QoJ2ltZycpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNpbmdsZS1zb3VyY2UnXSk7XHJcbiAgICAgICAgbGV0IGxvYWRlciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LWxvYWRlciddKTtcclxuICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLmFwcGVuZENoaWxkKGxvYWRlcik7XHJcbiAgICAgICAgc291cmNlRWxlbS5zcmMgPSBzcmM7XHJcbiAgICAgICAgc291cmNlRWxlbS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBvbmxvYWRMaXN0ZW5lcihzb3VyY2VFbGVtLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGlzLnZpZGVvTG9hZCA9IGZ1bmN0aW9uIChzcmMpIHtcclxuICAgICAgICBsZXQgdmlkZW9FbGVtID0gbmV3IERPTU9iamVjdCgndmlkZW8nKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zaW5nbGUtc291cmNlJ10pO1xyXG4gICAgICAgIGxldCBzb3VyY2UgPSBuZXcgRE9NT2JqZWN0KCdzb3VyY2UnKS5lbGVtO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHNvdXJjZS5vZmZzZXRXaWR0aCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coc291cmNlLnZpZGVvV2lkdGgpO1xyXG4gICAgICAgIHNvdXJjZS5zcmMgPSBzcmM7XHJcbiAgICAgICAgdmlkZW9FbGVtLmlubmVyVGV4dCA9ICdTb3JyeSwgeW91ciBicm93c2VyIGRvZXNuXFwndCBzdXBwb3J0IGVtYmVkZGVkIHZpZGVvcywgPGFcXG4nICtcclxuICAgICAgICAgICAgJyAgICAgICAgICAgIGhyZWY9XCJodHRwOi8vZG93bmxvYWQuYmxlbmRlci5vcmcvcGVhY2gvYmlnYnVja2J1bm55X21vdmllcy9CaWdCdWNrQnVubnlfMzIweDE4MC5tcDRcIj5kb3dubG9hZDwvYT4gYW5kIHdhdGNoXFxuJyArXHJcbiAgICAgICAgICAgICcgICAgICAgIHdpdGggeW91ciBmYXZvcml0ZSB2aWRlbyBwbGF5ZXIhJztcclxuXHJcbiAgICAgICAgdmlkZW9FbGVtLnNldEF0dHJpYnV0ZSgnY29udHJvbHMnLCAnJyk7XHJcbiAgICAgICAgdmlkZW9FbGVtLmFwcGVuZENoaWxkKHNvdXJjZSk7XHJcbiAgICAgICAgLy9sZXQgbG9hZGVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtbG9hZGVyJ10pO1xyXG4gICAgICAgIHZpZGVvRWxlbS5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb25sb2FkTGlzdGVuZXIodmlkZW9FbGVtLCB0aGlzLnZpZGVvV2lkdGgsIHRoaXMudmlkZW9IZWlnaHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICBwYXJzZXIuaHJlZiA9IHVybDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0SWQodXJsKSB7XHJcbiAgICAgICAgICAgIGxldCByZWdFeHAgPSAvXi4qKHlvdXR1LmJlXFwvfHZcXC98dVxcL1xcd1xcL3xlbWJlZFxcL3x3YXRjaFxcP3Y9fFxcJnY9KShbXiNcXCZcXD9dKikuKi87XHJcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IHVybC5tYXRjaChyZWdFeHApO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1hdGNoICYmIG1hdGNoWzJdLmxlbmd0aCA9PSAxMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoWzJdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdlcnJvcic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAocGFyc2VyLmhvc3RuYW1lID09PSAnd3d3LnlvdXR1YmUuY29tJykge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRZb3V0dWJldmlkZW8oZ2V0SWQodXJsKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHhoci5vbmxvYWRzdGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSBcImJsb2JcIjtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXNwb25zZVR5cGUgPSB4aHIucmVzcG9uc2UudHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlLmluZGV4T2YoJy8nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlLnNsaWNlKDAsIHJlc3BvbnNlVHlwZS5pbmRleE9mKCcvJykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlVHlwZSA9PT0gJ2ltYWdlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW1hZ2VMb2FkKFVSTC5jcmVhdGVPYmplY3RVUkwoeGhyLnJlc3BvbnNlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZVR5cGUgPT09ICd2aWRlbycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnZpZGVvTG9hZChVUkwuY3JlYXRlT2JqZWN0VVJMKHhoci5yZXNwb25zZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgeGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHhoci5zZW5kKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8vaWYgZmlyc3QgdGltZSBsb2FkIGFkZCBsb2FkZXJcclxuICAgIGlmIChzZWxmLmRhdGEuaXNmaXJzdFRpbWVMb2FkID09PSB0cnVlKSB7XHJcbiAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImxkcy1yaW5nXCI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgIHNlbGYuZGF0YS5pc2ZpcnN0VGltZUxvYWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NoZWNrIGlmIHNvdXJjZSB3YXMgcHJldmlvdXNseSBjcmVhdGVkIGFuZFxyXG4gICAgLy8gY3JlYXRlIGl0IGlmIGl0IHdhc24ndCBvciBpZiBpdCB3YXMgbG9hZCBpdCBmcm9tIHZhcmlhYmxlXHJcbiAgICBpZiAodHlwZW9mIHNlbGYuZGF0YS5zb3VyY2VzW2luZGV4T2ZTb3VyY2VVUkxdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZUVsZW0gPSBzZWxmLmRhdGEuc291cmNlc1tpbmRleE9mU291cmNlVVJMXTtcclxuICAgICAgICBjb25zdCByZW1lbWJlcmVkU291cmNlRGltZW5zaW9ucyA9IHNlbGYuZGF0YS5yZW1lbWJlcmVkU291cmNlc0RpbWVuc2lvbnNbaW5kZXhPZlNvdXJjZVVSTF07XHJcbiAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLmFwcGVuZENoaWxkKHNvdXJjZUVsZW0pO1xyXG5cclxuICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudC5zb3VyY2VEaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzb3VyY2VEaW1lbnNpb25zKFxyXG4gICAgICAgICAgICAgICAgc291cmNlRWxlbSxcclxuICAgICAgICAgICAgICAgIHJlbWVtYmVyZWRTb3VyY2VEaW1lbnNpb25zLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgcmVtZW1iZXJlZFNvdXJjZURpbWVuc2lvbnMuaGVpZ2h0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudC5zb3VyY2VEaW1lbnNpb25zKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIGxldCBpbmRleCA9IDE7XHJcbiAgICAvLyBzZXRJbnRlcnZhbCggZnVuY3Rpb24gKCkge1xyXG4gICAgLy9cclxuICAgIC8vICAgICBpZihpbmRleCA9PT0gNil7XHJcbiAgICAvLyAgICAgICAgIGluZGV4ID0gMDtcclxuICAgIC8vICAgICB9XHJcbiAgICAvL1xyXG4gICAgLy8gICAgIGlmKHR5cGVvZiBzZWxmLmRhdGEuc291cmNlc1tpbmRleF0gIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIC8vICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5pbm5lckhUTUwgPSAnJztcclxuICAgIC8vICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5hcHBlbmRDaGlsZChzZWxmLmRhdGEuc291cmNlc1tpbmRleF0pO1xyXG4gICAgLy8gICAgICAgICBpbmRleCsrO1xyXG4gICAgLy8gICAgICAgICByZXR1cm47XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy9cclxuICAgIC8vICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIC8vICAgICB4aHIub25sb2Fkc3RhcnQgPSBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IFwiYmxvYlwiO1xyXG4gICAgLy8gICAgIH07XHJcbiAgICAvLyAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAgICAgICBpZih4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG4gICAgLy8gICAgICAgICAgICAgaWYoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgc291cmNlRWxlbS5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHhoci5yZXNwb25zZSk7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9O1xyXG4gICAgLy8gICAgIHhoci5vcGVuKCdnZXQnLCBzZWxmLmRhdGEudXJsc1tpbmRleF0sIHRydWUpO1xyXG4gICAgLy8gICAgIHhoci5zZW5kKG51bGwpO1xyXG4gICAgLy9cclxuICAgIC8vICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgLy8gICAgIHNlbGYuZGF0YS5zb3VyY2VFbGVtID0gbmV3IERPTU9iamVjdCgnaW1nJykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2luZ2xlLXNvdXJjZSddKTtcclxuICAgIC8vXHJcbiAgICAvLyAgICAgc291cmNlRWxlbS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICAgICAgc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQucmVtZW1iZXJkV2lkdGggPSB0aGlzLndpZHRoO1xyXG4gICAgLy8gICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudC5yZW1lbWJlcmRIZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuICAgIC8vICAgICAgICAgc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQuc291cmNlRGltZW5zaW9ucyh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICAvLyAgICAgICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuYXBwZW5kQ2hpbGQoc2VsZi5kYXRhLnNvdXJjZUVsZW0pO1xyXG4gICAgLy8gICAgICAgICBzb3VyY2VFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtZmFkZS1pbicpO1xyXG4gICAgLy8gICAgICAgICB2b2lkIHNvdXJjZUVsZW0ub2Zmc2V0V2lkdGg7XHJcbiAgICAvLyAgICAgICAgIHNvdXJjZUVsZW0uY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1mYWRlLWluJyk7XHJcbiAgICAvLyAgICAgICAgIHNlbGYuZGF0YS5zb3VyY2VzLnB1c2goc2VsZi5kYXRhLnNvdXJjZUVsZW0pO1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhzZWxmLmRhdGEuc291cmNlcyk7XHJcbiAgICAvLyAgICAgfTtcclxuICAgIC8vICAgICBpbmRleCsrO1xyXG4gICAgLy8gfSw1MDApO1xyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VsZiwgRE9NT2JqZWN0KSB7XHJcbiAgICBsZXQgcHJpdmF0ZU1ldGhvZHMgPSB7XHJcbiAgICAgICAgcmVuZGVyTmF2OiBmdW5jdGlvbiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIGxldCBuYXYgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1uYXYnXSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdG9vbGJhciA9IG5ldyBzZWxmLnRvb2xiYXIoKTtcclxuICAgICAgICAgICAgbmV3IHNlbGYudG9vbGJhcigpLnJlbmRlclRvb2xiYXIobmF2KTtcclxuXHJcbiAgICAgICAgICAgIG5ldyBzZWxmLnNsaWRlQ291bnRlcigpLnJlbmRlclNsaWRlQ291bnRlcihuYXYpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5hdik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXJTbGlkZUJ1dHRvbnM6IGZ1bmN0aW9uIChjb250YWluZXIpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5pc1JlbmRlcmluZ1NsaWRlQnV0dG9ucyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9yZW5kZXIgbGVmdCBidG5cclxuICAgICAgICAgICAgbGV0IGxlZnRfYnRuX2NvbnRhaW5lciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLWJ0bi1jb250YWluZXInXSk7XHJcbiAgICAgICAgICAgIGxldCBidG4gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4nLCAnYnV0dG9uLXN0eWxlJ10pO1xyXG4gICAgICAgICAgICBidG4uYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBuZXcgc2VsZi5TVkdJY29uKCkuZ2V0U1ZHSWNvbignTTguMzg4LDEwLjA0OWw0Ljc2LTQuODczYzAuMzAzLTAuMzEsMC4yOTctMC44MDQtMC4wMTItMS4xMDVjLTAuMzA5LTAuMzA0LTAuODAzLTAuMjkzLTEuMTA1LDAuMDEyTDYuNzI2LDkuNTE2Yy0wLjMwMywwLjMxLTAuMjk2LDAuODA1LDAuMDEyLDEuMTA1bDUuNDMzLDUuMzA3YzAuMTUyLDAuMTQ4LDAuMzUsMC4yMjMsMC41NDcsMC4yMjNjMC4yMDMsMCwwLjQwNi0wLjA4LDAuNTU5LTAuMjM2YzAuMzAzLTAuMzA5LDAuMjk1LTAuODAzLTAuMDEyLTEuMTA0TDguMzg4LDEwLjA0OXonKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGVmdF9idG5fY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNsaWRlIG9iamVjdCB0aGF0IGNvbnRhaW5zIGNoYW5naW5nIHNsaWRlIG1ldGhvZHNcclxuICAgICAgICAgICAgbGV0IHNsaWRlID0gbmV3IHNlbGYuc2xpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vZ28gdG8gcHJldmlvdXMgc2xpZGUgb25jbGlja1xyXG4gICAgICAgICAgICBsZWZ0X2J0bl9jb250YWluZXIub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlLnByZXZpb3VzU2xpZGVWaWFCdXR0b24oKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxlZnRfYnRuX2NvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgICAgICAgICBsZXQgcmlnaHRfYnRuX2NvbnRhaW5lciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLWJ0bi1jb250YWluZXInLCAnZnNsaWdodGJveC1zbGlkZS1idG4tcmlnaHQtY29udGFpbmVyJ10pO1xyXG4gICAgICAgICAgICBidG4gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4nLCAnYnV0dG9uLXN0eWxlJ10pO1xyXG4gICAgICAgICAgICBidG4uYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBuZXcgc2VsZi5TVkdJY29uKCkuZ2V0U1ZHSWNvbignTTExLjYxMSwxMC4wNDlsLTQuNzYtNC44NzNjLTAuMzAzLTAuMzEtMC4yOTctMC44MDQsMC4wMTItMS4xMDVjMC4zMDktMC4zMDQsMC44MDMtMC4yOTMsMS4xMDUsMC4wMTJsNS4zMDYsNS40MzNjMC4zMDQsMC4zMSwwLjI5NiwwLjgwNS0wLjAxMiwxLjEwNUw3LjgzLDE1LjkyOGMtMC4xNTIsMC4xNDgtMC4zNSwwLjIyMy0wLjU0NywwLjIyM2MtMC4yMDMsMC0wLjQwNi0wLjA4LTAuNTU5LTAuMjM2Yy0wLjMwMy0wLjMwOS0wLjI5NS0wLjgwMywwLjAxMi0xLjEwNEwxMS42MTEsMTAuMDQ5eicpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvL2dvIHRvIG5leHQgc2xpZGUgb25jbGlja1xyXG4gICAgICAgICAgICByaWdodF9idG5fY29udGFpbmVyLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZS5uZXh0U2xpZGVWaWFCdXR0b24oKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmlnaHRfYnRuX2NvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmlnaHRfYnRuX2NvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL2Rpc2FibGUgc2Nyb2xsaW5nXHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtb3BlbicpO1xyXG5cclxuICAgIC8vY3JlYXRlIGNvbnRhaW5lclxyXG4gICAgbGV0IGNvbnRhaW5lciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LWNvbnRhaW5lciddKTtcclxuICAgIGNvbnRhaW5lci5pZCA9IFwiZnNsaWdodGJveC1jb250YWluZXJcIjtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuXHJcbiAgICAvL3JlbmRlciBzbGlkZSBidXR0b25zIGFuZCBuYXYodG9vbGJhcilcclxuICAgIHByaXZhdGVNZXRob2RzLnJlbmRlck5hdihjb250YWluZXIpO1xyXG4gICAgcHJpdmF0ZU1ldGhvZHMucmVuZGVyU2xpZGVCdXR0b25zKGNvbnRhaW5lcik7XHJcblxyXG4gICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyID0gbmV3IHNlbGYubWVkaWFIb2xkZXIoKTtcclxuICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlci5yZW5kZXJIb2xkZXIoY29udGFpbmVyKTtcclxuXHJcbiAgICBzZWxmLmRhdGEuaXNmaXJzdFRpbWVMb2FkID0gdHJ1ZTtcclxuICAgIHNlbGYubG9hZHNvdXJjZShzZWxmLmRhdGEudXJsc1swXSk7XHJcbn07Il19
