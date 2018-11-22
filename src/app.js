<<<<<<< HEAD
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * @constructor
 */
window.fsLightboxObject =  function () {

=======
"use strict";

/**
 * @constructor
 */
function fsLightboxObject() {

>>>>>>> animations
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
<<<<<<< HEAD
        rememberedSourcesDimensions: [],
=======
>>>>>>> animations
        mediaHolder: {},
        sourceElem: {},
        onResizeEvent: new onResizeEvent()
    };

    /**
     * @type {fsLightboxObject}
     */
    let self = this;


    this.init = function () {
<<<<<<< HEAD
        let xd = require('./renderDom')(this, DOMObject);
=======
        this.renderDOM();
>>>>>>> animations
    };


    this.clear = function () {
        document.getElementById('fslightbox-container').remove();
    };
<<<<<<< HEAD

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
        let number_container = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-number-container']);
        this.current_slide = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-slide-number']);

        this.current_slide.innerHTML = self.data.slide;
        this.current_slide.id = 'current_slide';

        let space = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-slide-number']);
        space.innerHTML = '/';

        let slides = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-slide-number']);
        slides.innerHTML = self.data.total_slides;

        number_container.appendChild(this.current_slide);
        number_container.appendChild(space);
        number_container.appendChild(slides);

        this.renderSlideCounter = function (nav) {
            nav.appendChild(number_container);
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
        };


        this.nextSlideViaButton = function () {
            if (self.data.slide < self.data.total_slides) {
                self.data.slide += 1;
            } else {
                self.data.slide = 1;
            }

            //load source by index (array is indexed from 0 so we need to decrement index)
            self.loadsource(self.data.urls[self.data.slide - 1]);

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

    /**
     * Handles source loading depending on it type
     * @constructor
     */
    this.loadsource = function (url) {

        let _this = this;
        const indexOfSourceURL = self.data.urls.indexOf(url);

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
            self.data.rememberedSourcesDimensions.splice(indexOfSourceURL, 0, {
                "width": sourceWidth,
                "height": sourceHeight
            });

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
            this.data.mediaHolder.holder.appendChild(loader);
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
        if (this.data.isfirstTimeLoad === true) {
            this.data.mediaHolder.holder.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
            this.data.isfirstTimeLoad = false;
        }

        //check if source was previously created and
        // create it if it wasn't or if it was load it from variable
        if (typeof this.data.sources[indexOfSourceURL] === "undefined") {
            this.createSourceElem();
        } else {
            const sourceElem = self.data.sources[indexOfSourceURL];
            const rememberedSourceDimensions = self.data.rememberedSourcesDimensions[indexOfSourceURL];
            console.log(rememberedSourceDimensions);
            self.data.mediaHolder.holder.innerHTML = '';
            self.data.mediaHolder.holder.appendChild(sourceElem);

            self.data.onResizeEvent.sourceDimensions = function () {
                sourceDimensions(
                    sourceElem,
                    rememberedSourceDimensions[indexOfSourceURL].width,
                    rememberedSourceDimensions[indexOfSourceURL].height
                );
            };
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

    this.slideByDrag = function () {

    };
};


!function () {
}(document, window);

},{"./renderDom":2}],2:[function(require,module,exports){
function renderDOM(self, DOMObject) {
    let privateMethods = {
        renderNav: function (container) {
            console.log(self.data);
            let nav = new DOMObject('div').addClassesAndCreate(['fslightbox-nav']);

            let toolbar = new self.toolbar();
            toolbar.renderToolbar(nav);

            let slideCounter = new self.slideCounter();
            slideCounter.renderSlideCounter(nav);

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
    privateMethods.renderSlideButtons(container);
    privateMethods.renderNav(container);

    self.data.mediaHolder = new self.mediaHolder();
    self.data.mediaHolder.renderHolder(container);

    self.data.isfirstTimeLoad = true;
    self.loadsource(self.data.urls[0]);
};
module.exports = renderDOM;
},{}]},{},[1,2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvcmVuZGVyRG9tLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25kQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxud2luZG93LmZzTGlnaHRib3hPYmplY3QgPSAgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHRoaXMuZGF0YSA9IHtcclxuICAgICAgICBydW5uaW5nOiBmYWxzZSxcclxuICAgICAgICBzbGlkZTogMSxcclxuICAgICAgICB0b3RhbF9zbGlkZXM6IDYsXHJcbiAgICAgICAgaXNSZW5kZXJpbmdTbGlkZUNvdW50ZXI6IHRydWUsXHJcbiAgICAgICAgaXNSZW5kZXJpbmdTbGlkZUJ1dHRvbnM6IHRydWUsXHJcbiAgICAgICAgaXNmaXJzdFRpbWVMb2FkOiBmYWxzZSxcclxuICAgICAgICBpc1JlbmRlcmluZ1Rvb2xiYXJCdXR0b25zOiB7XHJcbiAgICAgICAgICAgIFwiY2xvc2VcIjogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXJsczogW1xyXG4gICAgICAgICAgICBcImltYWdlcy8xLmpwZWdcIixcclxuICAgICAgICAgICAgXCJpbWFnZXMvMi5qcGdcIixcclxuICAgICAgICAgICAgXCJpbWFnZXMvMy5qcGVnXCIsXHJcbiAgICAgICAgICAgIFwiaW1hZ2VzLzQuanBlZ1wiLFxyXG4gICAgICAgICAgICBcImltYWdlcy81LmpwZ1wiLFxyXG4gICAgICAgICAgICBcImltYWdlcy82LmpwZ1wiLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc291cmNlczogW10sXHJcbiAgICAgICAgcmVtZW1iZXJlZFNvdXJjZXNEaW1lbnNpb25zOiBbXSxcclxuICAgICAgICBtZWRpYUhvbGRlcjoge30sXHJcbiAgICAgICAgc291cmNlRWxlbToge30sXHJcbiAgICAgICAgb25SZXNpemVFdmVudDogbmV3IG9uUmVzaXplRXZlbnQoKVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHtmc0xpZ2h0Ym94T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG5cclxuICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgeGQgPSByZXF1aXJlKCcuL3JlbmRlckRvbScpKHRoaXMsIERPTU9iamVjdCk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGlzLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmc2xpZ2h0Ym94LWNvbnRhaW5lcicpLnJlbW92ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlIGRvbSBlbGVtZW50IHdpdGggY2xhc3Nlc1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIERPTU9iamVjdCh0YWcpIHtcclxuICAgICAgICB0aGlzLmVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ2xhc3Nlc0FuZENyZWF0ZSA9IGZ1bmN0aW9uIChjbGFzc2VzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4IGluIGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzZXNbaW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9iamVjdCB0aGF0IGNvbnRhaW5zIGFsbCBhY3Rpb25zIHRoYXQgZnNsaWdodGJveCBpcyBkb2luZyBkdXJpbmcgcnVubmluZ1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIG9uUmVzaXplRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5yZW1lbWJlcmRXaWR0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5yZW1lbWJlcmRIZWlnaHQgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhSG9sZGVyRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc291cmNlRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBldmVudFRoaXMgPSB0aGlzO1xyXG4gICAgICAgIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZXZlbnRUaGlzLm1lZGlhSG9sZGVyRGltZW5zaW9ucygpO1xyXG4gICAgICAgICAgICBldmVudFRoaXMuc291cmNlRGltZW5zaW9ucygpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU1ZHSWNvbiBvYmplY3Qgd2l0aCBnZXRTVkdJY29uIG1ldGhvZCB3aGljaCByZXR1cm4gPHN2Zz4gZWxlbWVudCB3aXRoIDxwYXRoPiBjaGlsZFxyXG4gICAgICogQHJldHVybnMge0VsZW1lbnR9XHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgdGhpcy5TVkdJY29uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICA8c3ZnPiB3aXRoIGFkZGVkICdmc2xpZ2h0Ym94LXN2Zy1pY29uJyBjbGFzc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIFwic3ZnXCIpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBjaGlsZCBvZiBzdmcgZW1wdHkgPHBhdGg+XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5wYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIFwicGF0aFwiKTtcclxuICAgICAgICB0aGlzLnN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnY2xhc3MnLCAnZnNsaWdodGJveC1zdmctaWNvbicpO1xyXG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICd2aWV3Qm94JywgJzAgMCAyMCAyMCcpO1xyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmV0dXJucyBET00gPHN2Zz4gaWNvbiBjb250YWluaW5nIDxwYXRoPiBjaGlsZCB3aXRoIGQgYXR0cmlidXRlIGZyb20gcGFyYW1ldGVyXHJcbiAgICAgICAgICogQHBhcmFtIGRcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmdldFNWR0ljb24gPSBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhdGguc2V0QXR0cmlidXRlTlMobnVsbCwgJ2QnLCBkKTtcclxuICAgICAgICAgICAgdGhpcy5zdmcuYXBwZW5kQ2hpbGQodGhpcy5wYXRoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3ZnO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2xpZGUgY291bnRlciBvYmplY3QgLSB1cHBlciBsZWZ0IGNvcm5lciBvZiBmc0xpZ2h0Ym94XHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgdGhpcy5zbGlkZUNvdW50ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IG51bWJlcl9jb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1udW1iZXItY29udGFpbmVyJ10pO1xyXG4gICAgICAgIHRoaXMuY3VycmVudF9zbGlkZSA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLXNsaWRlLW51bWJlciddKTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50X3NsaWRlLmlubmVySFRNTCA9IHNlbGYuZGF0YS5zbGlkZTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRfc2xpZGUuaWQgPSAnY3VycmVudF9zbGlkZSc7XHJcblxyXG4gICAgICAgIGxldCBzcGFjZSA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLXNsaWRlLW51bWJlciddKTtcclxuICAgICAgICBzcGFjZS5pbm5lckhUTUwgPSAnLyc7XHJcblxyXG4gICAgICAgIGxldCBzbGlkZXMgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1zbGlkZS1udW1iZXInXSk7XHJcbiAgICAgICAgc2xpZGVzLmlubmVySFRNTCA9IHNlbGYuZGF0YS50b3RhbF9zbGlkZXM7XHJcblxyXG4gICAgICAgIG51bWJlcl9jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jdXJyZW50X3NsaWRlKTtcclxuICAgICAgICBudW1iZXJfY29udGFpbmVyLmFwcGVuZENoaWxkKHNwYWNlKTtcclxuICAgICAgICBudW1iZXJfY29udGFpbmVyLmFwcGVuZENoaWxkKHNsaWRlcyk7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyU2xpZGVDb3VudGVyID0gZnVuY3Rpb24gKG5hdikge1xyXG4gICAgICAgICAgICBuYXYuYXBwZW5kQ2hpbGQobnVtYmVyX2NvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb29sYmFyIGJ1dHRvblxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHRoaXMudG9vbGJhckJ1dHRvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmJ1dHRvbiA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXRvb2xiYXItYnV0dG9uJywgJ2J1dHRvbi1zdHlsZSddKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRTVkdJY29uID0gZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgbGV0IFNWR0ljb24gPSBuZXcgc2VsZi5TVkdJY29uKCkuZ2V0U1ZHSWNvbihkKTtcclxuICAgICAgICAgICAgdGhpcy5idXR0b24uYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBTVkdJY29uXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5idXR0b24pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9vbGJhciBvYmplY3Qgd2hpY2ggY29udGFpbnMgdG9vbGJhciBidXR0b25zXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgdGhpcy50b29sYmFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMudG9vbGJhckVsZW0gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC10b29sYmFyJ10pO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlckRlZmF1bHRCdXR0b25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgc2hvdWxkUmVuZGVyQnV0dG9ucyA9IHNlbGYuZGF0YS5pc1JlbmRlcmluZ1Rvb2xiYXJCdXR0b25zO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNob3VsZFJlbmRlckJ1dHRvbnMuY2xvc2UgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBidXR0b24gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC10b29sYmFyLWJ1dHRvbicsICdidXR0b24tc3R5bGUnXSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3ZnID0gbmV3IHNlbGYuU1ZHSWNvbigpLmdldFNWR0ljb24oJ00gMTEuNDY5IDEwIGwgNy4wOCAtNy4wOCBjIDAuNDA2IC0wLjQwNiAwLjQwNiAtMS4wNjQgMCAtMS40NjkgYyAtMC40MDYgLTAuNDA2IC0xLjA2MyAtMC40MDYgLTEuNDY5IDAgTCAxMCA4LjUzIGwgLTcuMDgxIC03LjA4IGMgLTAuNDA2IC0wLjQwNiAtMS4wNjQgLTAuNDA2IC0xLjQ2OSAwIGMgLTAuNDA2IDAuNDA2IC0wLjQwNiAxLjA2MyAwIDEuNDY5IEwgOC41MzEgMTAgTCAxLjQ1IDE3LjA4MSBjIC0wLjQwNiAwLjQwNiAtMC40MDYgMS4wNjQgMCAxLjQ2OSBjIDAuMjAzIDAuMjAzIDAuNDY5IDAuMzA0IDAuNzM1IDAuMzA0IGMgMC4yNjYgMCAwLjUzMSAtMC4xMDEgMC43MzUgLTAuMzA0IEwgMTAgMTEuNDY5IGwgNy4wOCA3LjA4MSBjIDAuMjAzIDAuMjAzIDAuNDY5IDAuMzA0IDAuNzM1IDAuMzA0IGMgMC4yNjcgMCAwLjUzMiAtMC4xMDEgMC43MzUgLTAuMzA0IGMgMC40MDYgLTAuNDA2IDAuNDA2IC0xLjA2NCAwIC0xLjQ2OSBMIDExLjQ2OSAxMCBaJyk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoc3ZnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9vbGJhckVsZW0uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyVG9vbGJhciA9IGZ1bmN0aW9uIChuYXYpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJEZWZhdWx0QnV0dG9ucygpO1xyXG4gICAgICAgICAgICBuYXYuYXBwZW5kQ2hpbGQodGhpcy50b29sYmFyRWxlbSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRCdXR0b25Ub1Rvb2xiYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCB0b29sYmFyQnV0dG9uID0gbmV3IHNlbGYudG9vbGJhckJ1dHRvbigpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGlzLnNsaWRlID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB0aGlzLnByZXZpb3VzU2xpZGVWaWFCdXR0b24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmRhdGEuc2xpZGUgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGUgLT0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGF0YS5zbGlkZSA9IHNlbGYuZGF0YS50b3RhbF9zbGlkZXNcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9sb2FkIHNvdXJjZSBieSBpbmRleCAoYXJyYXkgaXMgaW5kZXhlZCBmcm9tIDAgc28gd2UgbmVlZCB0byBkZWNyZW1lbnQgaW5kZXgpXHJcbiAgICAgICAgICAgIHNlbGYubG9hZHNvdXJjZShzZWxmLmRhdGEudXJsc1tzZWxmLmRhdGEuc2xpZGUgLSAxXSk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMubmV4dFNsaWRlVmlhQnV0dG9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5kYXRhLnNsaWRlIDwgc2VsZi5kYXRhLnRvdGFsX3NsaWRlcykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnNsaWRlICs9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEuc2xpZGUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2xvYWQgc291cmNlIGJ5IGluZGV4IChhcnJheSBpcyBpbmRleGVkIGZyb20gMCBzbyB3ZSBuZWVkIHRvIGRlY3JlbWVudCBpbmRleClcclxuICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlKHNlbGYuZGF0YS51cmxzW3NlbGYuZGF0YS5zbGlkZSAtIDFdKTtcclxuXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXYgdGhhdCBob2xkcyBzb3VyY2UgZWxlbVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1lZGlhSG9sZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuaG9sZGVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtbWVkaWEtaG9sZGVyJ10pO1xyXG4gICAgICAgIHRoaXMuaG9sZGVyLnN0eWxlLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCArICdweCc7XHJcbiAgICAgICAgc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQubWVkaWFIb2xkZXJEaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLnN0eWxlLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCArICdweCc7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnJlbmRlckhvbGRlciA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuaG9sZGVyKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgc291cmNlIGxvYWRpbmcgZGVwZW5kaW5nIG9uIGl0IHR5cGVcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICB0aGlzLmxvYWRzb3VyY2UgPSBmdW5jdGlvbiAodXJsKSB7XHJcblxyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgaW5kZXhPZlNvdXJjZVVSTCA9IHNlbGYuZGF0YS51cmxzLmluZGV4T2YodXJsKTtcclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZURpbWVuc2lvbnMgPSBmdW5jdGlvbiAoc291cmNlRWxlbSwgc291cmNlV2lkdGgsIHNvdXJjZUhlaWdodCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mICBzb3VyY2VXaWR0aCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgc291cmNlV2lkdGggPSBzZWxmLmRhdGEub25SZXNpemVFdmVudC5yZW1lbWJlcmRXaWR0aDtcclxuICAgICAgICAgICAgICAgIHNvdXJjZUhlaWdodCA9IHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50LnJlbWVtYmVyZEhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgY29lZmZpY2llbnQgPSBzb3VyY2VXaWR0aCAvIHNvdXJjZUhlaWdodDtcclxuICAgICAgICAgICAgY29uc3QgZGV2aWNlV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICAgICAgY29uc3QgZGV2aWNlSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgICAgICBsZXQgbmV3SGVpZ2h0ID0gZGV2aWNlV2lkdGggLyBjb2VmZmljaWVudDtcclxuICAgICAgICAgICAgaWYgKG5ld0hlaWdodCA8IGRldmljZUhlaWdodCAtIDYwKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VFbGVtLnN0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgIHNvdXJjZUVsZW0uc3R5bGUud2lkdGggPSBkZXZpY2VXaWR0aCArIFwicHhcIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld0hlaWdodCA9IGRldmljZUhlaWdodCAtIDYwO1xyXG4gICAgICAgICAgICAgICAgc291cmNlRWxlbS5zdHlsZS5oZWlnaHQgPSBuZXdIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VFbGVtLnN0eWxlLndpZHRoID0gbmV3SGVpZ2h0ICogY29lZmZpY2llbnQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBhZGQgZmFkZSBpbiBjbGFzcyBhbmQgZGltZW5zaW9uIGZ1bmN0aW9uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbGV0IG9ubG9hZExpc3RlbmVyID0gZnVuY3Rpb24gKHNvdXJjZUVsZW0sIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQpIHtcclxuXHJcbiAgICAgICAgICAgIC8vYWRkIG1ldGhvZCB0aGF0IGNoYW5nZXMgc291cmNlIGRpbWVuc2lvbiBvbiB3aW5kb3cgcmVzaXplXHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50LnNvdXJjZURpbWVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VEaW1lbnNpb25zKHNvdXJjZUVsZW0sIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gZGltZW5zaW9ucyB3aWxsIGJlIGdpdmVuIG9ubHkgb25lIHRpbWUgc28gd2Ugd2lsbCBuZWVkIHRvIHJlbWVtYmVyIGl0XHJcbiAgICAgICAgICAgIC8vIGZvciBuZXh0IG9ucmVzaXplIGV2ZW50IGNhbGxzXHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50LnJlbWVtYmVyZFdpZHRoID0gc291cmNlV2lkdGg7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50LnJlbWVtYmVyZEhlaWdodCA9IHNvdXJjZUhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIC8vbm9ybWFsIHNvdXJjZSBkaW1lbnNpb25zIG5lZWRzIHRvIGJlIHN0b3JlZCBpbiBhcnJheVxyXG4gICAgICAgICAgICAvL2l0IHdpbGwgYmUgbmVlZGVkIHdoZW4gbG9hZGluZyBzb3VyY2UgZnJvbSBtZW1vcnlcclxuICAgICAgICAgICAgc2VsZi5kYXRhLnJlbWVtYmVyZWRTb3VyY2VzRGltZW5zaW9ucy5zcGxpY2UoaW5kZXhPZlNvdXJjZVVSTCwgMCwge1xyXG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBzb3VyY2VXaWR0aCxcclxuICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IHNvdXJjZUhlaWdodFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vc2V0IGRpbWVuc2lvbiBmb3IgdGhlIGZpcnN0IHRpbWVcclxuICAgICAgICAgICAgc2VsZi5kYXRhLm9uUmVzaXplRXZlbnQuc291cmNlRGltZW5zaW9ucyhzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIC8vYXBwZW5kIGVsZW1cclxuICAgICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5hcHBlbmRDaGlsZChzb3VyY2VFbGVtKTtcclxuXHJcbiAgICAgICAgICAgIC8vYWRkIHNvbWUgZmFkZSBpbiBhbmltYXRpb25cclxuICAgICAgICAgICAgc291cmNlRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LWZhZGUtaW4nKTtcclxuICAgICAgICAgICAgdm9pZCBzb3VyY2VFbGVtLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICBzb3VyY2VFbGVtLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbicpO1xyXG5cclxuICAgICAgICAgICAgLy9wdXNoIGVsZW0gdG8gYXJyYXkgZnJvbSB3aGVyZSBpdCB3aWxsIGJlIGxvYWRlZCBhZ2FpbiBpZiBuZWVkZWRcclxuICAgICAgICAgICAgc2VsZi5kYXRhLnNvdXJjZXNbaW5kZXhPZlNvdXJjZVVSTF0gPSBzb3VyY2VFbGVtO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB0aGlzLmxvYWRZb3V0dWJldmlkZW8gPSBmdW5jdGlvbiAodmlkZW9JZCkge1xyXG4gICAgICAgICAgICBsZXQgaWZyYW1lID0gbmV3IERPTU9iamVjdCgnaWZyYW1lJykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2luZ2xlLXNvdXJjZSddKTtcclxuICAgICAgICAgICAgaWZyYW1lLnNyYyA9ICcvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8nICsgdmlkZW9JZDtcclxuICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3dmdWxsc2NyZWVuJywgJycpO1xyXG4gICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdmcmFtZWJvcmRlcicsICcwJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5tZWRpYUhvbGRlci5ob2xkZXIuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcclxuICAgICAgICAgICAgb25sb2FkTGlzdGVuZXIoaWZyYW1lLCAxOTIwLCAxMDgwKTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5pbWFnZUxvYWQgPSBmdW5jdGlvbiAoc3JjKSB7XHJcbiAgICAgICAgICAgIGxldCBzb3VyY2VFbGVtID0gbmV3IERPTU9iamVjdCgnaW1nJykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2luZ2xlLXNvdXJjZSddKTtcclxuICAgICAgICAgICAgbGV0IGxvYWRlciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LWxvYWRlciddKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5hcHBlbmRDaGlsZChsb2FkZXIpO1xyXG4gICAgICAgICAgICBzb3VyY2VFbGVtLnNyYyA9IHNyYztcclxuICAgICAgICAgICAgc291cmNlRWxlbS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgb25sb2FkTGlzdGVuZXIoc291cmNlRWxlbSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy52aWRlb0xvYWQgPSBmdW5jdGlvbiAoc3JjKSB7XHJcbiAgICAgICAgICAgIGxldCB2aWRlb0VsZW0gPSBuZXcgRE9NT2JqZWN0KCd2aWRlbycpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNpbmdsZS1zb3VyY2UnXSk7XHJcbiAgICAgICAgICAgIGxldCBzb3VyY2UgPSBuZXcgRE9NT2JqZWN0KCdzb3VyY2UnKS5lbGVtO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzb3VyY2Uub2Zmc2V0V2lkdGgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzb3VyY2UudmlkZW9XaWR0aCk7XHJcbiAgICAgICAgICAgIHNvdXJjZS5zcmMgPSBzcmM7XHJcbiAgICAgICAgICAgIHZpZGVvRWxlbS5pbm5lclRleHQgPSAnU29ycnksIHlvdXIgYnJvd3NlciBkb2VzblxcJ3Qgc3VwcG9ydCBlbWJlZGRlZCB2aWRlb3MsIDxhXFxuJyArXHJcbiAgICAgICAgICAgICAgICAnICAgICAgICAgICAgaHJlZj1cImh0dHA6Ly9kb3dubG9hZC5ibGVuZGVyLm9yZy9wZWFjaC9iaWdidWNrYnVubnlfbW92aWVzL0JpZ0J1Y2tCdW5ueV8zMjB4MTgwLm1wNFwiPmRvd25sb2FkPC9hPiBhbmQgd2F0Y2hcXG4nICtcclxuICAgICAgICAgICAgICAgICcgICAgICAgIHdpdGggeW91ciBmYXZvcml0ZSB2aWRlbyBwbGF5ZXIhJztcclxuXHJcbiAgICAgICAgICAgIHZpZGVvRWxlbS5zZXRBdHRyaWJ1dGUoJ2NvbnRyb2xzJywgJycpO1xyXG4gICAgICAgICAgICB2aWRlb0VsZW0uYXBwZW5kQ2hpbGQoc291cmNlKTtcclxuICAgICAgICAgICAgLy9sZXQgbG9hZGVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtbG9hZGVyJ10pO1xyXG4gICAgICAgICAgICB2aWRlb0VsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBvbmxvYWRMaXN0ZW5lcih2aWRlb0VsZW0sIHRoaXMudmlkZW9XaWR0aCwgdGhpcy52aWRlb0hlaWdodCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICAgICAgcGFyc2VyLmhyZWYgPSB1cmw7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRJZCh1cmwpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZWdFeHAgPSAvXi4qKHlvdXR1LmJlXFwvfHZcXC98dVxcL1xcd1xcL3xlbWJlZFxcL3x3YXRjaFxcP3Y9fFxcJnY9KShbXiNcXCZcXD9dKikuKi87XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2ggPSB1cmwubWF0Y2gocmVnRXhwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2ggJiYgbWF0Y2hbMl0ubGVuZ3RoID09IDExKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoWzJdO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2Vycm9yJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChwYXJzZXIuaG9zdG5hbWUgPT09ICd3d3cueW91dHViZS5jb20nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRZb3V0dWJldmlkZW8oZ2V0SWQodXJsKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgICAgIHhoci5vbmxvYWRzdGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gXCJibG9iXCI7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXNwb25zZVR5cGUgPSB4aHIucmVzcG9uc2UudHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZS5pbmRleE9mKCcvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUuc2xpY2UoMCwgcmVzcG9uc2VUeXBlLmluZGV4T2YoJy8nKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlVHlwZSA9PT0gJ2ltYWdlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmltYWdlTG9hZChVUkwuY3JlYXRlT2JqZWN0VVJMKHhoci5yZXNwb25zZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZVR5cGUgPT09ICd2aWRlbycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy52aWRlb0xvYWQoVVJMLmNyZWF0ZU9iamVjdFVSTCh4aHIucmVzcG9uc2UpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgeGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB4aHIuc2VuZChudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAvL2lmIGZpcnN0IHRpbWUgbG9hZCBhZGQgbG9hZGVyXHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5pc2ZpcnN0VGltZUxvYWQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImxkcy1yaW5nXCI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuaXNmaXJzdFRpbWVMb2FkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NoZWNrIGlmIHNvdXJjZSB3YXMgcHJldmlvdXNseSBjcmVhdGVkIGFuZFxyXG4gICAgICAgIC8vIGNyZWF0ZSBpdCBpZiBpdCB3YXNuJ3Qgb3IgaWYgaXQgd2FzIGxvYWQgaXQgZnJvbSB2YXJpYWJsZVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kYXRhLnNvdXJjZXNbaW5kZXhPZlNvdXJjZVVSTF0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlRWxlbSA9IHNlbGYuZGF0YS5zb3VyY2VzW2luZGV4T2ZTb3VyY2VVUkxdO1xyXG4gICAgICAgICAgICBjb25zdCByZW1lbWJlcmVkU291cmNlRGltZW5zaW9ucyA9IHNlbGYuZGF0YS5yZW1lbWJlcmVkU291cmNlc0RpbWVuc2lvbnNbaW5kZXhPZlNvdXJjZVVSTF07XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlbWVtYmVyZWRTb3VyY2VEaW1lbnNpb25zKTtcclxuICAgICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5hcHBlbmRDaGlsZChzb3VyY2VFbGVtKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50LnNvdXJjZURpbWVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VEaW1lbnNpb25zKFxyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUVsZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVtZW1iZXJlZFNvdXJjZURpbWVuc2lvbnNbaW5kZXhPZlNvdXJjZVVSTF0ud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVtZW1iZXJlZFNvdXJjZURpbWVuc2lvbnNbaW5kZXhPZlNvdXJjZVVSTF0uaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIGxldCBpbmRleCA9IDE7XHJcbiAgICAgICAgLy8gc2V0SW50ZXJ2YWwoIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICBpZihpbmRleCA9PT0gNil7XHJcbiAgICAgICAgLy8gICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICBpZih0eXBlb2Ygc2VsZi5kYXRhLnNvdXJjZXNbaW5kZXhdICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIuaG9sZGVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIC8vICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5hcHBlbmRDaGlsZChzZWxmLmRhdGEuc291cmNlc1tpbmRleF0pO1xyXG4gICAgICAgIC8vICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIC8vICAgICB4aHIub25sb2Fkc3RhcnQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSBcImJsb2JcIjtcclxuICAgICAgICAvLyAgICAgfTtcclxuICAgICAgICAvLyAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgaWYoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICBpZih4aHIuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgc291cmNlRWxlbS5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9O1xyXG4gICAgICAgIC8vICAgICB4aHIub3BlbignZ2V0Jywgc2VsZi5kYXRhLnVybHNbaW5kZXhdLCB0cnVlKTtcclxuICAgICAgICAvLyAgICAgeGhyLnNlbmQobnVsbCk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAvLyAgICAgc2VsZi5kYXRhLnNvdXJjZUVsZW0gPSBuZXcgRE9NT2JqZWN0KCdpbWcnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zaW5nbGUtc291cmNlJ10pO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIHNvdXJjZUVsZW0ub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudC5yZW1lbWJlcmRXaWR0aCA9IHRoaXMud2lkdGg7XHJcbiAgICAgICAgLy8gICAgICAgICBzZWxmLmRhdGEub25SZXNpemVFdmVudC5yZW1lbWJlcmRIZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuICAgICAgICAvLyAgICAgICAgIHNlbGYuZGF0YS5vblJlc2l6ZUV2ZW50LnNvdXJjZURpbWVuc2lvbnModGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIC8vICAgICAgICAgc2VsZi5kYXRhLm1lZGlhSG9sZGVyLmhvbGRlci5hcHBlbmRDaGlsZChzZWxmLmRhdGEuc291cmNlRWxlbSk7XHJcbiAgICAgICAgLy8gICAgICAgICBzb3VyY2VFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtZmFkZS1pbicpO1xyXG4gICAgICAgIC8vICAgICAgICAgdm9pZCBzb3VyY2VFbGVtLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIC8vICAgICAgICAgc291cmNlRWxlbS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LWZhZGUtaW4nKTtcclxuICAgICAgICAvLyAgICAgICAgIHNlbGYuZGF0YS5zb3VyY2VzLnB1c2goc2VsZi5kYXRhLnNvdXJjZUVsZW0pO1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coc2VsZi5kYXRhLnNvdXJjZXMpO1xyXG4gICAgICAgIC8vICAgICB9O1xyXG4gICAgICAgIC8vICAgICBpbmRleCsrO1xyXG4gICAgICAgIC8vIH0sNTAwKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5zbGlkZUJ5RHJhZyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9O1xyXG59O1xyXG5cclxuXHJcbiFmdW5jdGlvbiAoKSB7XHJcbn0oZG9jdW1lbnQsIHdpbmRvdyk7XHJcbiIsImZ1bmN0aW9uIHJlbmRlckRPTShzZWxmLCBET01PYmplY3QpIHtcclxuICAgIGxldCBwcml2YXRlTWV0aG9kcyA9IHtcclxuICAgICAgICByZW5kZXJOYXY6IGZ1bmN0aW9uIChjb250YWluZXIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZi5kYXRhKTtcclxuICAgICAgICAgICAgbGV0IG5hdiA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LW5hdiddKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0b29sYmFyID0gbmV3IHNlbGYudG9vbGJhcigpO1xyXG4gICAgICAgICAgICB0b29sYmFyLnJlbmRlclRvb2xiYXIobmF2KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzbGlkZUNvdW50ZXIgPSBuZXcgc2VsZi5zbGlkZUNvdW50ZXIoKTtcclxuICAgICAgICAgICAgc2xpZGVDb3VudGVyLnJlbmRlclNsaWRlQ291bnRlcihuYXYpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5hdik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXJTbGlkZUJ1dHRvbnM6IGZ1bmN0aW9uIChjb250YWluZXIpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5pc1JlbmRlcmluZ1NsaWRlQnV0dG9ucyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9yZW5kZXIgbGVmdCBidG5cclxuICAgICAgICAgICAgbGV0IGxlZnRfYnRuX2NvbnRhaW5lciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLWJ0bi1jb250YWluZXInXSk7XHJcbiAgICAgICAgICAgIGxldCBidG4gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4nLCAnYnV0dG9uLXN0eWxlJ10pO1xyXG4gICAgICAgICAgICBidG4uYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBuZXcgc2VsZi5TVkdJY29uKCkuZ2V0U1ZHSWNvbignTTguMzg4LDEwLjA0OWw0Ljc2LTQuODczYzAuMzAzLTAuMzEsMC4yOTctMC44MDQtMC4wMTItMS4xMDVjLTAuMzA5LTAuMzA0LTAuODAzLTAuMjkzLTEuMTA1LDAuMDEyTDYuNzI2LDkuNTE2Yy0wLjMwMywwLjMxLTAuMjk2LDAuODA1LDAuMDEyLDEuMTA1bDUuNDMzLDUuMzA3YzAuMTUyLDAuMTQ4LDAuMzUsMC4yMjMsMC41NDcsMC4yMjNjMC4yMDMsMCwwLjQwNi0wLjA4LDAuNTU5LTAuMjM2YzAuMzAzLTAuMzA5LDAuMjk1LTAuODAzLTAuMDEyLTEuMTA0TDguMzg4LDEwLjA0OXonKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGVmdF9idG5fY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNsaWRlIG9iamVjdCB0aGF0IGNvbnRhaW5zIGNoYW5naW5nIHNsaWRlIG1ldGhvZHNcclxuICAgICAgICAgICAgbGV0IHNsaWRlID0gbmV3IHNlbGYuc2xpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vZ28gdG8gcHJldmlvdXMgc2xpZGUgb25jbGlja1xyXG4gICAgICAgICAgICBsZWZ0X2J0bl9jb250YWluZXIub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlLnByZXZpb3VzU2xpZGVWaWFCdXR0b24oKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxlZnRfYnRuX2NvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgICAgICAgICBsZXQgcmlnaHRfYnRuX2NvbnRhaW5lciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLWJ0bi1jb250YWluZXInLCAnZnNsaWdodGJveC1zbGlkZS1idG4tcmlnaHQtY29udGFpbmVyJ10pO1xyXG4gICAgICAgICAgICBidG4gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4nLCAnYnV0dG9uLXN0eWxlJ10pO1xyXG4gICAgICAgICAgICBidG4uYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBuZXcgc2VsZi5TVkdJY29uKCkuZ2V0U1ZHSWNvbignTTExLjYxMSwxMC4wNDlsLTQuNzYtNC44NzNjLTAuMzAzLTAuMzEtMC4yOTctMC44MDQsMC4wMTItMS4xMDVjMC4zMDktMC4zMDQsMC44MDMtMC4yOTMsMS4xMDUsMC4wMTJsNS4zMDYsNS40MzNjMC4zMDQsMC4zMSwwLjI5NiwwLjgwNS0wLjAxMiwxLjEwNUw3LjgzLDE1LjkyOGMtMC4xNTIsMC4xNDgtMC4zNSwwLjIyMy0wLjU0NywwLjIyM2MtMC4yMDMsMC0wLjQwNi0wLjA4LTAuNTU5LTAuMjM2Yy0wLjMwMy0wLjMwOS0wLjI5NS0wLjgwMywwLjAxMi0xLjEwNEwxMS42MTEsMTAuMDQ5eicpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvL2dvIHRvIG5leHQgc2xpZGUgb25jbGlja1xyXG4gICAgICAgICAgICByaWdodF9idG5fY29udGFpbmVyLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZS5uZXh0U2xpZGVWaWFCdXR0b24oKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmlnaHRfYnRuX2NvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmlnaHRfYnRuX2NvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLy9kaXNhYmxlIHNjcm9sbGluZ1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LW9wZW4nKTtcclxuXHJcbiAgICAvL2NyZWF0ZSBjb250YWluZXJcclxuICAgIGxldCBjb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1jb250YWluZXInXSk7XHJcbiAgICBjb250YWluZXIuaWQgPSBcImZzbGlnaHRib3gtY29udGFpbmVyXCI7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcblxyXG4gICAgLy9yZW5kZXIgc2xpZGUgYnV0dG9ucyBhbmQgbmF2KHRvb2xiYXIpXHJcbiAgICBwcml2YXRlTWV0aG9kcy5yZW5kZXJTbGlkZUJ1dHRvbnMoY29udGFpbmVyKTtcclxuICAgIHByaXZhdGVNZXRob2RzLnJlbmRlck5hdihjb250YWluZXIpO1xyXG5cclxuICAgIHNlbGYuZGF0YS5tZWRpYUhvbGRlciA9IG5ldyBzZWxmLm1lZGlhSG9sZGVyKCk7XHJcbiAgICBzZWxmLmRhdGEubWVkaWFIb2xkZXIucmVuZGVySG9sZGVyKGNvbnRhaW5lcik7XHJcblxyXG4gICAgc2VsZi5kYXRhLmlzZmlyc3RUaW1lTG9hZCA9IHRydWU7XHJcbiAgICBzZWxmLmxvYWRzb3VyY2Uoc2VsZi5kYXRhLnVybHNbMF0pO1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlckRPTTsiXX0=
=======

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
        let number_container = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-number-container']);
        this.current_slide = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-slide-number']);

        this.current_slide.innerHTML = self.data.slide;
        this.current_slide.id = 'current_slide';

        let space = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-slide-number']);
        space.innerHTML = '/';

        let slides = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-slide-number']);
        slides.innerHTML = self.data.total_slides;

        number_container.appendChild(this.current_slide);
        number_container.appendChild(space);
        number_container.appendChild(slides);

        this.renderSlideCounter = function (nav) {
            nav.appendChild(number_container);
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
     * Method that takes care of rendering whole dom of fsLightbox
     */
    this.renderDOM = function () {

        let privateMethods = {
            renderNav: function (container) {
                let nav = new DOMObject('div').addClassesAndCreate(['fslightbox-nav']);

                let toolbar = new self.toolbar();
                toolbar.renderToolbar(nav);

                let slideCounter = new self.slideCounter();
                slideCounter.renderSlideCounter(nav);

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


                //go to previous slide onclick
                left_btn_container.onclick = function () {
                    if(self.data.slide > 1) {
                        self.data.slide -= 1;
                    } else {
                        self.data.slide = self.data.total_slides
                    }

                    //load source by index (array is indexed from 0 so we need to decrement index)
                    self.loadsource(self.data.urls[self.data.slide - 1]);
                };
                left_btn_container.appendChild(btn);
                let right_btn_container = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn-container', 'fslightbox-slide-btn-right-container']);
                btn = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn', 'button-style']);
                btn.appendChild(
                    new self.SVGIcon().getSVGIcon('M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z')
                );


                //go to next slide onclick
                right_btn_container.onclick = function () {
                    if(self.data.slide < self.data.total_slides) {
                        self.data.slide += 1;
                    } else {
                        self.data.slide = 1;
                    }

                    //load source by index (array is indexed from 0 so we need to decrement index)
                    self.loadsource(self.data.urls[self.data.slide - 1]);
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
        privateMethods.renderSlideButtons(container);
        privateMethods.renderNav(container);

        this.data.mediaHolder = new this.mediaHolder();
        this.data.mediaHolder.renderHolder(container);

        this.data.isfirstTimeLoad = true;
        this.loadsource(this.data.urls[0]);
    };

    /**
     * @constructor
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


    this.slideByDrag = function () {

    };


    /**
     * Handles source loading depending on it type
     * @constructor
     */
    this.loadsource = function (url) {

        let _this = this;

        /**
         * add fade in class and dimension function
         */
        let onloadListener = function (sourceElem, sourceWidth, sourceHeight) {
            //imagine that is is fix for IE ...
            //if IE wouldnt exists i would just simply add max-width 100% and max-height: 100%
            self.data.onResizeEvent.sourceDimensions = function (sourceWidth, sourceHeight) {
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

            // dimensions will be given only one time so we will need to remember it
            // for next onresize event calls
            self.data.onResizeEvent.rememberdWidth = sourceWidth;
            self.data.onResizeEvent.rememberdHeight = sourceHeight;
            self.data.onResizeEvent.sourceDimensions(sourceWidth, sourceHeight);
            self.data.mediaHolder.holder.innerHTML = '';
            self.data.mediaHolder.holder.appendChild(sourceElem);
            sourceElem.classList.remove('fslightbox-fade-in');
            void sourceElem.offsetWidth;
            sourceElem.classList.add('fslightbox-fade-in');
            self.data.sources.push(sourceElem);
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
            this.data.mediaHolder.holder.appendChild(loader);
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
                    xhr.dataType = 'json';
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
        if (this.data.isfirstTimeLoad === true) {
            this.data.mediaHolder.holder.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
            this.data.isfirstTimeLoad = false;
        }

        //check if source was previously created and
        // create it if it wasn't or if it was load it from variable
        if (typeof this.data.sources[this.data.urls.indexOf(url)] === "undefined") {
            this.createSourceElem();
        } else {
            _this.data.mediaHolder.holder.innerHTML = '';
            _this.data.mediaHolder.holder.appendChild(
                _this.data.sources[this.data.urls.indexOf(url)]
            );
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
    }
}

!function () {
}(document, window);
>>>>>>> animations
