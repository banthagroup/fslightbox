/**
 * @constructor
 */
window.fsLightboxObject =  function () {

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
        onResizeEvent: new onResizeEvent()
    };

    /**
     * @type {fsLightboxObject}
     */
    let self = this;


    this.init = function () {
        let xd = require('./renderDom')(this, DOMObject);
        xd = '';
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
