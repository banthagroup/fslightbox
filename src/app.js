(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = function (tag) {
    this.elem = document.createElement(tag);

    this.addClassesAndCreate = function (classes) {
        for (let index in classes) {
            this.elem.classList.add(classes[index]);
        }
        return this.elem
    }
};
},{}],2:[function(require,module,exports){
const DOMObject = require('./DOMObject');

module.exports = function () {
    const holder = new DOMObject('div').addClassesAndCreate(['fslightbox-media-holder']);
    if (window.innerWidth > 1000) {
        holder.style.width = (window.innerWidth - 0.1 * window.innerWidth) + 'px';
        holder.style.height = (window.innerHeight - 0.1 * window.innerHeight) + 'px';
    } else {
        holder.style.width = window.innerWidth + 'px';
        holder.style.height = window.innerHeight + 'px';
    }
    return holder;
};
},{"./DOMObject":1}],3:[function(require,module,exports){
module.exports = function () {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
    this.path = document.createElementNS('http://www.w3.org/2000/svg', "path");
    this.path.classList.add('fslightbox-svg-path');
    this.svg.setAttributeNS(null, 'class', 'fslightbox-svg-icon');
    this.svg.setAttributeNS(null, 'viewBox', '0 0 15 15');

    this.getSVGIcon = function (viewBox, dimension, d) {
        this.path.setAttributeNS(null, 'd', d);
        this.svg.setAttributeNS(null, 'viewBox', viewBox);
        this.svg.setAttributeNS(null, 'width', dimension);
        this.svg.setAttributeNS(null, 'height', dimension);
        this.svg.appendChild(this.path);
        return this.svg;
    }
};
},{}],4:[function(require,module,exports){
const DOMObject = require('./DOMObject');

module.exports = function (fsLightbox) {
    this.toolbarElem = new DOMObject('div').addClassesAndCreate(['fslightbox-toolbar']);
    const _this = this;

    this.renderDefaultButtons = function () {
        let shouldRenderButtons = fsLightbox.data.toolbarButtons;

        if (shouldRenderButtons.fullscreen === true) {
            let button = new DOMObject('div').addClassesAndCreate(['fslightbox-toolbar-button', 'fslightbox-flex-centered']);
            let svg = new fsLightbox.SVGIcon().getSVGIcon('0 0 17.5 17.5' +
                '', '20px', 'M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z');
            button.appendChild(svg);
            button.onclick = function () {
                (fsLightbox.data.fullscreen) ?
                    _this.closeFullscreen():
                    _this.openFullscreen();

            };
            this.toolbarElem.appendChild(button);
        }

        if (shouldRenderButtons.close === true) {
            let button = new DOMObject('div').addClassesAndCreate(['fslightbox-toolbar-button', 'fslightbox-flex-centered']);
            let svg = new fsLightbox.SVGIcon().getSVGIcon('0 0 20 20', '16px', 'M 11.469 10 l 7.08 -7.08 c 0.406 -0.406 0.406 -1.064 0 -1.469 c -0.406 -0.406 -1.063 -0.406 -1.469 0 L 10 8.53 l -7.081 -7.08 c -0.406 -0.406 -1.064 -0.406 -1.469 0 c -0.406 0.406 -0.406 1.063 0 1.469 L 8.531 10 L 1.45 17.081 c -0.406 0.406 -0.406 1.064 0 1.469 c 0.203 0.203 0.469 0.304 0.735 0.304 c 0.266 0 0.531 -0.101 0.735 -0.304 L 10 11.469 l 7.08 7.081 c 0.203 0.203 0.469 0.304 0.735 0.304 c 0.267 0 0.532 -0.101 0.735 -0.304 c 0.406 -0.406 0.406 -1.064 0 -1.469 L 11.469 10 Z');
            button.appendChild(svg);
            button.onclick = function () {
                if(!fsLightbox.data.fadingOut) fsLightbox.hide();
            };
            this.toolbarElem.appendChild(button);
        }
    };


    this.openFullscreen = function () {
        fsLightbox.data.fullscreen = true;
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
        fsLightbox.data.fullscreen = false;
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
},{"./DOMObject":1}],5:[function(require,module,exports){
const DOMObject = require('../Components/DOMObject');

module.exports = function (fsLightbox) {
    this.renderDOM = function () {
        fsLightbox.element.id = "fslightbox-container";
        document.body.appendChild(fsLightbox.element);

        //render slide buttons and nav(toolbar)
        renderNav(fsLightbox.element);

        if (fsLightbox.data.totalSlides > 1) {
            renderSlideButtons(fsLightbox.element);
        }
        fsLightbox.element.appendChild(fsLightbox.mediaHolder);
        fsLightbox.data.isfirstTimeLoad = true;
    };

    const slideCounter = function () {
        let numberContainer = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-number-container', 'fslightbox-flex-centered']);
        fsLightbox.data.slideCounterElem = document.createElement('div');
        const slideCounterElem = fsLightbox.data.slideCounterElem;

        slideCounterElem.innerHTML = fsLightbox.data.slide;
        slideCounterElem.id = 'current_slide';

        let space = new DOMObject('div').addClassesAndCreate(['fslightbox-slash']);
        space.innerHTML = '/';

        let slides = document.createElement('div');
        slides.innerHTML = fsLightbox.data.totalSlides;

        numberContainer.appendChild(slideCounterElem);
        numberContainer.appendChild(space);
        numberContainer.appendChild(slides);

        this.renderSlideCounter = function (nav) {
            if (fsLightbox.data.slideCounter)
                nav.appendChild(numberContainer);
        }
    };


    const renderNav = function (container) {
        fsLightbox.data.nav = new DOMObject('div').addClassesAndCreate(['fslightbox-nav']);
        fsLightbox.toolbar.renderToolbar(fsLightbox.data.nav);

        if(fsLightbox.data.totalSlides > 2) {
            const counter = new slideCounter();
            counter.renderSlideCounter(fsLightbox.data.nav);
        }
        container.appendChild(fsLightbox.data.nav);

    };

    const createBTN = function (buttonContainer, container, d) {
        let btn = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn', 'fslightbox-flex-centered']);
        btn.appendChild(
            new fsLightbox.SVGIcon().getSVGIcon('0 0 20 20', '1em', d)
        );
        buttonContainer.appendChild(btn);
        container.appendChild(buttonContainer);
    };

    const renderSlideButtons = function (container) {
        if (fsLightbox.data.slideButtons === false) {
            return false;
        }
        //render left btn
        let left_btn_container = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn-container', 'fslightbox-slide-btn-left-container']);
        createBTN(left_btn_container, container, 'M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z');

        //go to previous slide onclick
        left_btn_container.onclick = function () {
            fsLightbox.appendMethods.previousSlideViaButton(fsLightbox.data.slide);
        };

        let right_btn_container = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn-container', 'fslightbox-slide-btn-right-container']);
        createBTN(right_btn_container, container, 'M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z');
        // go to next slide on click
        right_btn_container.onclick = function () {
            fsLightbox.appendMethods.nextSlideViaButton(fsLightbox.data.slide);
        };
    };
};
},{"../Components/DOMObject":1}],6:[function(require,module,exports){
module.exports = function (scrollbarWidth) {
    this.addRecompense = function () {
        if (!doesScrollbarHaveWidth()) {
            return;
        }
        document.documentElement.style.marginRight = scrollbarWidth + 'px';
        const elementsToRecompense = getRecompenseElements();
        if (!elementsToRecompense) return;
        for (let i = 0; i < elementsToRecompense.length; i++) {
            elementsToRecompense[i].style.marginRight = scrollbarWidth + 'px';
        }
    };

    this.removeRecompense = function () {
        if (!doesScrollbarHaveWidth())
            return;
        document.documentElement.style.marginRight = '';
        const elementsToRecompense = getRecompenseElements();
        if (!elementsToRecompense) return;
        for (let i = 0; i < elementsToRecompense.length; i++) {
            elementsToRecompense[i].style.marginRight = '';
        }
    };

    const getRecompenseElements = function () {
        return document.getElementsByClassName('recompense-for-scrollbar');
    };

    const doesScrollbarHaveWidth = function () {
        return !!scrollbarWidth;
    };
};
},{}],7:[function(require,module,exports){
module.exports = function(data) {
    this.getWidth = function () {
        let outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.msOverflowStyle = "scrollbar";
        document.body.appendChild(outer);
        let widthNoScroll = outer.offsetWidth;
        outer.style.overflow = "scroll";
        let inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);
        let widthWithScroll = inner.offsetWidth;
        outer.parentNode.removeChild(outer);
        data.scrollbarWidth = widthNoScroll - widthWithScroll;
    };
};
},{}],8:[function(require,module,exports){
module.exports = function (self) {
    //we will hover all windows with div with high z-index to be sure mouseup is triggered
    const invisibleHover = new (require('../Components/DOMObject'))('div').addClassesAndCreate(['fslightbox-invisible-hover']);

    //to these elements are added mouse events
    const elements = {
        "mediaHolder": self.mediaHolder,
        "invisibleHover": invisibleHover,
    };
    //sources are transformed
    const sources = self.data.sources;

    // if there are only 2 or 1 urls slideTransformer will be different
    const urlsLength = self.data.urls.length;

    let is_dragging = false;
    let mouseDownClientX;
    let difference;
    let slideAble = true;


    const mouseDownEvent = function (e) {
        // tag can't be video cause it would be unclickable in microsoft browsers
        if (e.target.tagName !== 'VIDEO' && !e.touches) {
            e.preventDefault();
        }
        for (let elem in elements) {
            elements[elem].classList.add('fslightbox-cursor-grabbing');
        }
        is_dragging = true;
        (e.touches) ?
            mouseDownClientX = e.touches[0].clientX :
            mouseDownClientX = e.clientX;
        difference = 0;
    };


    const mouseUpEvent = function () {
        if (self.element.contains(invisibleHover)) {
            self.element.removeChild(invisibleHover);
        }
        for (let elem in elements) {
            elements[elem].classList.remove('fslightbox-cursor-grabbing');
        }

        is_dragging = false;

        // if user didn't slide none animation should work
        if (difference === 0) {
            return;
        }

        // we can slide only if previous animation has finished
        if (!slideAble) {
            return;
        }
        slideAble = false;
        let sourcesIndexes = self.stageSourceIndexes.all(self.data.slide);

        // add transition if user slide to source
        sources[sourcesIndexes.previous].classList.add('fslightbox-transform-transition');
        sources[sourcesIndexes.current].classList.add('fslightbox-transform-transition');
        sources[sourcesIndexes.next].classList.add('fslightbox-transform-transition');


        // slide previous
        if (difference > 0) {

            // update slide number
            if (self.data.slide === 1) {
                self.updateSlideNumber(self.data.totalSlides);
            } else {
                self.updateSlideNumber(self.data.slide - 1);
            }

            if (urlsLength >= 2) {
                self.slideTransformer.plus(sources[sourcesIndexes.current]);
                self.slideTransformer.zero(sources[sourcesIndexes.previous]);
            } else {
                self.slideTransformer.zero(sources[sourcesIndexes.current]);
            }

            // get new indexes
            sourcesIndexes = self.stageSourceIndexes.all(self.data.slide);

            //if source isn't already in memory
            if (typeof self.data.sources[sourcesIndexes.previous] === "undefined") {
                self.loadsources('previous', self.data.slide);
            }
        }


        // slide next
        else if (difference < 0) {

            //update slide number
            if (self.data.slide === self.data.totalSlides) {
                self.updateSlideNumber(1);
            } else {
                self.updateSlideNumber(self.data.slide + 1);
            }


            if (urlsLength > 1) {
                self.slideTransformer.minus(sources[sourcesIndexes.current]);
                self.slideTransformer.zero(sources[sourcesIndexes.next]);
            } else {
                self.slideTransformer.zero(sources[sourcesIndexes.current]);
            }

            // get new indexes
            sourcesIndexes = self.stageSourceIndexes.all(self.data.slide);
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
            slideAble = true;
        }, 250);
    };


    const mouseMoveEvent = function (e) {
        if (!is_dragging || !slideAble) {
            return;
        }

        let clientX;
        (e.touches) ?
            clientX = e.touches[0].clientX :
            clientX = e.clientX;

        self.element.appendChild(invisibleHover);
        difference = clientX - mouseDownClientX;
        const sourcesIndexes = self.stageSourceIndexes.all(self.data.slide);

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
    };

    const preventDefaultEvent = function (e) {
        e.preventDefault();
    };


    for (let elem in elements) {
        elements[elem].addEventListener('mousedown', mouseDownEvent);
        elements[elem].addEventListener('touchstart', mouseDownEvent, { passive: true });
    }
    window.addEventListener('mouseup', mouseUpEvent);
    window.addEventListener('touchend', mouseUpEvent);
    invisibleHover.addEventListener('mouseup', mouseUpEvent);
    invisibleHover.addEventListener('touchend', mouseUpEvent, { passive: true });
    window.addEventListener('mousemove', mouseMoveEvent);
    window.addEventListener('touchmove', mouseMoveEvent, { passive: true });
    self.data.nav.addEventListener('mousedown', preventDefaultEvent);
};
},{"../Components/DOMObject":1}],9:[function(require,module,exports){
module.exports = function (slideDistance) {
    this.minus = function (elem) {
        elem.style.transform = 'translate(' + (-slideDistance * window.innerWidth) + 'px,0)';
    };

    this.zero = function (elem) {
        elem.style.transform = 'translate(0,0)';
    };

    this.plus = function (elem) {
        elem.style.transform = 'translate(' + slideDistance * window.innerWidth + 'px,0)';
    };
};
},{}],10:[function(require,module,exports){
module.exports = function (data) {
    this.previous = function (slide) {
        let previousSlideIndex;
        const arrayIndex = slide - 1;

        // previous
        if (arrayIndex === 0) {
            previousSlideIndex = data.totalSlides - 1;
        } else {
            previousSlideIndex = arrayIndex - 1;
        }

        return previousSlideIndex;
    };

    this.next = function (slide) {

        let nextSlideIndex;
        const arrayIndex = slide - 1;

        //next
        if (slide === data.totalSlides) {
            nextSlideIndex = 0;
        } else {
            nextSlideIndex = arrayIndex + 1;
        }

        return nextSlideIndex;
    };

    this.all = function (slide) {
        // sources are stored in array indexed from 0
        const arrayIndex = slide - 1;
        const sourcesIndexes = {
            previous: 0,
            current: 0,
            next: 0
        };

        // previous
        if (arrayIndex === 0) {
            sourcesIndexes.previous = data.totalSlides - 1;
        } else {
            sourcesIndexes.previous = arrayIndex - 1;
        }

        // current
        sourcesIndexes.current = arrayIndex;

        //next
        if (slide === data.totalSlides) {
            sourcesIndexes.next = 0;
        } else {
            sourcesIndexes.next = arrayIndex + 1;
        }

        return sourcesIndexes;
    };
};

},{}],11:[function(require,module,exports){
module.exports = function (fsLightbox) {
    const loader = '<div class="fslightbox-loader"><div></div><div></div><div></div><div></div></div>';
    const transition = 'fslightbox-transform-transition';
    const fadeIn = 'fslightbox-fade-in';
    const fadeOut = 'fslightbox-fade-out';

    const createHolder = function (index) {
        const sourceHolder = new (require('./Components/DOMObject'))('div').addClassesAndCreate(['fslightbox-source-holder', 'fslightbox-full-dimension']);
        sourceHolder.innerHTML = loader;
        fsLightbox.data.sources[index] = sourceHolder;
        return sourceHolder;
    };

    const runAnimationOnSource = function (elem) {
        elem.firstChild.classList.add(fadeIn);
    };

    const clearAnimationOnSource = function (elem) {
        const src = elem.firstChild;
        src.classList.remove(fadeIn);
        src.classList.remove(fadeOut);
        void src.offsetWidth;
    };

    const runFadeOutAnimationOnSource = function (elem) {
        elem.firstChild.classList.add(fadeOut);
    };

    /**
     * Renders loader when loading fsLightbox initially
     * @param slide
     */
    this.renderHolderInitial = function (slide) {
        const sourcesIndexes = fsLightbox.stageSourceIndexes.all(slide);
        const totalSlides = fsLightbox.data.totalSlides;

        if (totalSlides >= 3) {
            const prev = createHolder(sourcesIndexes.previous);
            fsLightbox.slideTransformer.minus(prev);
            fsLightbox.mediaHolder.appendChild(prev);
        }
        if (totalSlides >= 1) {
            const curr = createHolder(sourcesIndexes.current);
            fsLightbox.mediaHolder.appendChild(curr);
        }
        if (totalSlides >= 2) {
            const next = createHolder(sourcesIndexes.next);
            fsLightbox.slideTransformer.plus(next);
            fsLightbox.mediaHolder.appendChild(next);
        }
    };


    this.renderHolder = function (slide, type) {
        switch (type) {
            case 'previous':
                renderHolderPrevious(slide);
                break;
            case 'current':
                renderHolderCurrent(slide);
                break;
            case 'next':
                renderHolderNext(slide);
                break;
        }
    };


    const renderHolderPrevious = function (slide) {
        const previousSourceIndex = fsLightbox.stageSourceIndexes.previous(slide);
        const prev = createHolder(previousSourceIndex);
        fsLightbox.slideTransformer.minus(prev);
        fsLightbox.mediaHolder.insertAdjacentElement('afterbegin', prev);
    };


    const renderHolderNext = function (slide) {
        const nextSourceIndex = fsLightbox.stageSourceIndexes.next(slide);
        const next = createHolder(nextSourceIndex);
        fsLightbox.slideTransformer.plus(next);
        fsLightbox.mediaHolder.appendChild(next);
    };


    const renderHolderCurrent = function (slide) {
        const sourcesIndexes = fsLightbox.stageSourceIndexes.all(slide);
        const curr = createHolder(sourcesIndexes.current);
        fsLightbox.slideTransformer.zero(curr);
        fsLightbox.mediaHolder.insertBefore(curr, fsLightbox.data.sources[sourcesIndexes.next]);
    };


    this.previousSlideViaButton = function (previousSlide) {
        if (previousSlide === 1) {
            fsLightbox.data.slide = fsLightbox.data.totalSlides;
        } else {
            fsLightbox.data.slide -= 1;
        }

        const newSourcesIndexes = stopVideosUpdateSlideAndReturnSlideNumberIndexes();

        if (typeof fsLightbox.data.sources[newSourcesIndexes.previous] === "undefined") {
            fsLightbox.loadsources('previous', fsLightbox.data.slide);
        }

        const sources = fsLightbox.data.sources;
        const currentSource = sources[newSourcesIndexes.current];
        const nextSource = sources[newSourcesIndexes.next];

        nextSource.classList.remove(transition);
        currentSource.classList.remove(transition);
        sources[newSourcesIndexes.previous].classList.remove(transition);


        clearAnimationOnSource(currentSource);
        runAnimationOnSource(currentSource);
        runFadeOutAnimationOnSource(nextSource);

        fsLightbox.slideTransformer.zero(currentSource);
        setTimeout(function () {
            fsLightbox.slideTransformer.plus(nextSource);
            nextSource.firstChild.classList.remove(fadeOut);
        }, 220);
    };


    this.nextSlideViaButton = function (previousSlide) {
        if (previousSlide === fsLightbox.data.totalSlides) {
            fsLightbox.data.slide = 1;
        } else {
            fsLightbox.data.slide += 1;
        }

        const newSourcesIndexes = stopVideosUpdateSlideAndReturnSlideNumberIndexes();

        if (typeof fsLightbox.data.sources[newSourcesIndexes.next] === "undefined") {
            fsLightbox.loadsources('next', fsLightbox.data.slide);
        }

        const sources = fsLightbox.data.sources;
        const currentSource = sources[newSourcesIndexes.current];
        const previousSource = sources[newSourcesIndexes.previous];

        previousSource.classList.remove(transition);
        currentSource.classList.remove(transition);
        sources[newSourcesIndexes.next].classList.remove(transition);

        clearAnimationOnSource(currentSource);
        runAnimationOnSource(currentSource);
        runFadeOutAnimationOnSource(previousSource);
        fsLightbox.slideTransformer.zero(currentSource);

        setTimeout(function () {
            fsLightbox.slideTransformer.minus(previousSource);
            previousSource.firstChild.classList.remove(fadeOut);
        }, 220);
    };

    const stopVideosUpdateSlideAndReturnSlideNumberIndexes = function () {
        fsLightbox.stopVideos();
        fsLightbox.updateSlideNumber(fsLightbox.data.slide);
        return fsLightbox.stageSourceIndexes.all(fsLightbox.data.slide);
    };
};
},{"./Components/DOMObject":1}],12:[function(require,module,exports){
window.fsLightboxClass = function () {
    const DOMObject = require('./Components/DOMObject');

    this.data = {
        slide: 1,
        totalSlides: 1,
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
        scrollbarWidth: 0,

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
    };

    const _this = this;

    /**
     * Init a new fsLightbox instance
     */
    this.init = function (initHref) {
        if (this.data.initiated) {
            this.initSetSlide(initHref);
            this.show();
            return;
        }
        let gallery = this.data.name;

        let urls = [];
        const a = fsLightboxHelpers.a;
        for (let i = 0; i < a.length; i++) {
            if (!a[i].hasAttribute('data-fslightbox'))
                continue;

            if (a[i].getAttribute('data-fslightbox') === gallery) {
                let urlsLength = urls.push(a[i].getAttribute('href'));
                if (a[i].hasAttribute('data-video-poster'))
                    this.data.videosPosters[urlsLength - 1] = a[i].getAttribute('data-video-poster');
            }
        }

        this.data.urls = urls;
        this.data.totalSlides = urls.length;
        domRenderer.renderDOM();
        document.documentElement.classList.add('fslightbox-open');
        this.scrollbarRecompensor.addRecompense();
        this.onResizeEvent.init();
        this.throwEvent('init');
        this.throwEvent('open');
        require('./Core/SlideSwiping.js')(this);
        this.initSetSlide(initHref);
        this.data.initiated = true;
        this.element.classList.add('fslightbox-open');
    };


    /**
     * Init can have multiple type of slides
     * @param slide
     */
    this.initSetSlide = function (slide) {
        const type = typeof slide;
        switch (type) {
            case "string":
                this.setSlide(this.data.urls.indexOf(slide) + 1);
                break;
            case "number":
                this.setSlide(slide);
                break;
            case "undefined":
                this.setSlide(1);
                break;
        }
    };


    /**
     * Show dom of fsLightbox instance if exists
     */
    this.show = function () {
        const elem = this.element;
        this.scrollbarRecompensor.addRecompense();
        elem.classList.remove('fslightbox-fade-out-complete');
        document.documentElement.classList.add('fslightbox-open');
        void elem.offsetWidth;
        elem.classList.add('fslightbox-fade-in-complete');
        document.body.appendChild(elem);
        this.onResizeEvent.addListener();
        this.throwEvent('show');
        this.throwEvent('open');
    };


    /**
     * Hide dom of existing fsLightbox instance
     */
    this.hide = function () {
        if (this.data.fullscreen) this.toolbar.closeFullscreen();
        this.element.classList.add('fslightbox-fade-out-complete');
        this.data.fadingOut = true;
        this.throwEvent('close');
        this.onResizeEvent.removeListener();
        setTimeout(function () {
            _this.scrollbarRecompensor.removeRecompense();
            document.documentElement.classList.remove('fslightbox-open');
            _this.data.fadingOut = false;
            document.body.removeChild(_this.element);
        }, 250);
    };

    this.updateSlideNumber = function (number) {
        this.data.slide = number;
        if (this.data.totalSlides > 1)
            this.data.slideCounterElem.innerHTML = number;
    };

    this.throwEvent = function (eventName) {
        let event;
        if (typeof (Event) === 'function') {
            event = new Event(eventName);
        } else {
            event = document.createEvent('Event');
            event.initEvent(eventName, true, true);
        }
        this.element.dispatchEvent(event);
    };

    this.element = new DOMObject('div').addClassesAndCreate(['fslightbox-container', 'fslightbox-full-dimension']);
    this.mediaHolder = new (require('./Components/MediaHolder'));
    const domRenderer = new (require('./Core/DomRenderer'))(this);
    this.stageSourceIndexes = new (require('./Core/StageSourcesIndexes'))(this.data);
    new (require('./Core/ScrollbarWidthGetter'))(this.data).getWidth();
    this.onResizeEvent = new (require('./onResizeEvent'))(this);
    this.scrollbarRecompensor = new (require('./Core/ScrollbarRecompensor'))(this.data.scrollbarWidth);
    this.slideTransformer = new (require('./Core/SlideTransformer'))(this.data.slideDistance);
    this.toolbar = new (require('./Components/Toolbar'))(this);
    this.SVGIcon = require('./Components/SVGIcon');
    this.appendMethods = new (require('./appendMethods'))(this);

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
        return new loadsourcemodule(this, typeOfLoad, slide);
    };


    /**
     * Stop videos after changing slide
     */
    this.stopVideos = function () {
        const videos = this.data.videos;
        const sources = this.data.sources;

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
        this.data.slide = slide;
        this.updateSlideNumber(slide);
        const sourcesIndexes = this.stageSourceIndexes.all(slide);
        const sources = this.data.sources;

        if (sources.length === 0) {
            this.loadsources('initial', slide);
        } else {
            if (typeof sources[sourcesIndexes.previous] === "undefined")
                this.loadsources('previous', slide);


            if (typeof sources[sourcesIndexes.current] === "undefined")
                this.loadsources('current', slide);


            if (typeof sources[sourcesIndexes.next] === "undefined")
                this.loadsources('next', slide);
        }

        for (let sourceIndex in sources) {
            sources[sourceIndex].classList.remove('fslightbox-transform-transition');

            // sources length needs to be higher than 1 because if there is only 1 slide
            // sourcesIndexes.previous will be 0 so it would return a bad transition
            if (sourceIndex == sourcesIndexes.previous && sources.length > 1) {
                this.slideTransformer.minus(sources[sourcesIndexes.previous]);
                continue;
            }
            if (sourceIndex == sourcesIndexes.current) {
                this.slideTransformer.zero(sources[sourcesIndexes.current]);
                continue;
            }
            if (sourceIndex == sourcesIndexes.next) {
                this.slideTransformer.plus(sources[sourcesIndexes.next]);
                continue;
            }

            this.slideTransformer.minus(sources[sourceIndex]);
        }
    };
};


!function () {
    window.fsLightboxInstances = [];
    window.fsLightboxHelpers = {
        "a": document.getElementsByTagName('a')
    };

    let a = window.fsLightboxHelpers.a;

    for (let i = 0; i < a.length; i++) {

        if (!a[i].hasAttribute('data-fslightbox')) {
            continue;
        }

        const boxName = a[i].getAttribute('data-fslightbox');
        if (typeof window.fsLightboxInstances[boxName] === "undefined") {
            window.fsLightbox = new window.fsLightboxClass();
            window.fsLightbox.data.name = boxName;
            window.fsLightboxInstances[boxName] = window.fsLightbox;
        }

        a[i].addEventListener('click', function (e) {
            e.preventDefault();
            let gallery = this.getAttribute('data-fslightbox');
            if (window.fsLightboxInstances[gallery].data.initiated) {
                window.fsLightboxInstances[gallery].setSlide(
                    window.fsLightboxInstances[gallery].data.urls.indexOf(this.getAttribute('href')) + 1
                );
                window.fsLightboxInstances[gallery].show();
                return;
            }
            window.fsLightboxInstances[gallery].init(this.getAttribute('href'));
        });
    }
}(document, window);

},{"./Components/DOMObject":1,"./Components/MediaHolder":2,"./Components/SVGIcon":3,"./Components/Toolbar":4,"./Core/DomRenderer":5,"./Core/ScrollbarRecompensor":6,"./Core/ScrollbarWidthGetter":7,"./Core/SlideSwiping.js":8,"./Core/SlideTransformer":9,"./Core/StageSourcesIndexes":10,"./appendMethods":11,"./loadSource.js":13,"./onResizeEvent":14}],13:[function(require,module,exports){
module.exports = function (fsLightbox, typeOfLoad, slide) {

    const DOMObject = require('./Components/DOMObject');

    const sourcesIndexes = fsLightbox.stageSourceIndexes.all(slide);
    const urls = fsLightbox.data.urls;
    const sources = fsLightbox.data.sources;


    const append = function (sourceHolder, sourceElem) {
        sourceHolder.innerHTML = '';
        sourceHolder.appendChild(sourceElem);
        void sourceHolder.firstChild.offsetWidth;
    };

    let onloadListener = function (sourceElem, sourceWidth, sourceHeight, arrayIndex) {

        let sourceHolder = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);

        //normal source dimensions needs to be stored in array
        //it will be needed when resizing a source
        fsLightbox.data.rememberedSourcesDimensions[arrayIndex] = {
            "width": sourceWidth,
            "height": sourceHeight
        };
        sourceHolder.appendChild(sourceElem);
        append(sources[arrayIndex], sourceElem);
        fsLightbox.onResizeEvent.scaleSource(arrayIndex);
    };


    const loadYoutubevideo = function (videoId, arrayIndex) {
        let iframe = new DOMObject('iframe').addClassesAndCreate(['fslightbox-single-source']);
        iframe.src = '//www.youtube.com/embed/' + videoId + '?enablejsapi=1';
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('frameborder', '0');
        fsLightbox.mediaHolder.appendChild(iframe);
        onloadListener(iframe, 1920, 1080, arrayIndex);
    };


    const imageLoad = function (src, arrayIndex) {
        let sourceElem = new DOMObject('img').addClassesAndCreate(['fslightbox-single-source']);
        sourceElem.src = src;
        sourceElem.addEventListener('load', function () {
            onloadListener(sourceElem, this.width, this.height, arrayIndex);
        });
    };


    const videoLoad = function (src, arrayIndex, type) {
        let videoLoaded = false;
        let videoElem = new DOMObject('video').addClassesAndCreate(['fslightbox-single-source']);
        let source = new DOMObject('source').elem;
        if(fsLightbox.data.videosPosters[arrayIndex]) {
            videoElem.poster = fsLightbox.data.videosPosters[arrayIndex];
            videoElem.style.objectFit = 'cover';
        }
        source.src = src;
        source.type = type;
        videoElem.appendChild(source);
        let width;
        let height;
        videoElem.onloadedmetadata = function () {
            if (videoLoaded) {
                return;
            }
            // if browser don't support videoWidth and videoHeight we need to add default ones
            if (!this.videoWidth || this.videoWidth === 0) {
                width = 1920;
                height = 1080;
            } else {
                width = this.videoWidth;
                height = this.videoHeight;
            }
            videoLoaded = true;
            onloadListener(videoElem, width, height, arrayIndex);
        };

        // if browser don't supprt both onloadmetadata or .videoWidth we will load it after 3000ms
        let counter = 0;

        // ON IE on load event dont work so we need to wait for dimensions with setTimeouts
        let IEFix = setInterval(function () {

            if(videoLoaded) {
                clearInterval(IEFix);
                return;
            }
            if (!videoElem.videoWidth || videoElem .videoWidth === 0) {
                if(counter < 31) {
                    counter++;
                    return;
                } else {
                    width = 1920;
                    height = 1080;
                }
            } else {
                width = videoElem.videoWidth;
                height = videoElem.videoHeight;
            }

            videoLoaded = true;
            onloadListener(videoElem, width, height, arrayIndex);
            clearInterval(IEFix);
        }, 100);

        videoElem.setAttribute('controls', '');
    };

    const invalidFile = function (arrayIndex) {
        let invalidFileWrapper = new DOMObject('div').addClassesAndCreate(['fslightbox-invalid-file-wrapper']);
        invalidFileWrapper.innerHTML = 'Invalid file';

        onloadListener(invalidFileWrapper, window.innerWidth, window.innerHeight, arrayIndex);
    };


    this.createSourceElem = function (urlIndex) {
        const parser = document.createElement('a');
        const sourceUrl = fsLightbox.data.urls[urlIndex];

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
            fsLightbox.data.videos[urlIndex] = false;
            loadYoutubevideo(getId(sourceUrl), urlIndex);
        } else {
            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 2) {
                    if (xhr.status === 200 || xhr.status === 206) {
                        //check what type of file provided from link
                        const responseType = xhr.getResponseHeader('content-type');
                        const dataType = responseType.slice(0, responseType.indexOf('/'));

                        if (dataType === 'image') {
                            imageLoad(urls[urlIndex], urlIndex);
                        }

                        else if (dataType === 'video') {
                            videoLoad(urls[urlIndex], urlIndex, responseType);
                            fsLightbox.data.videos[urlIndex] = true;
                        }

                        else {
                            invalidFile(urlIndex);
                        }
                    }
                    else {
                        invalidFile(urlIndex);
                    }
                    xhr.abort();
                }
            };

            xhr.open('get', sourceUrl, true);
            xhr.send(null);
        }
    };


    if (typeOfLoad === 'initial') {
        //append loader when loading initially
        fsLightbox.appendMethods.renderHolderInitial(slide, DOMObject);

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
        fsLightbox.appendMethods.renderHolder(slide, typeOfLoad);

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
},{"./Components/DOMObject":1}],14:[function(require,module,exports){
module.exports = function (fsLightbox) {
    const _this = this;
    const sources = fsLightbox.data.sources;
    const rememberedSourceDimension = fsLightbox.data.rememberedSourcesDimensions;

    this.mediaHolderDimensions = function () {
        const mediaHolderStyle = fsLightbox.mediaHolder.style;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if (windowWidth > 1000) {
            mediaHolderStyle.width = (windowWidth - (0.1 * windowWidth)) + 'px';
            mediaHolderStyle.height = (windowHeight - (0.1 * windowHeight)) + 'px';
        } else {
            mediaHolderStyle.width = windowWidth + 'px';
            mediaHolderStyle.height = (windowHeight - (0.1 * windowHeight)) + 'px';
        }
    };


    this.scaleAndTransformSources = function () {
        const sourcesCount = fsLightbox.data.urls.length;
        const stageSourcesIndexes = fsLightbox.stageSourceIndexes.all(fsLightbox.data.slide);
        if (sourcesCount > 0) {
            fsLightbox.slideTransformer.zero(sources[stageSourcesIndexes.current]);
        }

        if (sourcesCount > 1) {
            fsLightbox.slideTransformer.plus(sources[stageSourcesIndexes.next]);
        }

        if (sourcesCount > 2) {
            fsLightbox.slideTransformer.minus(sources[stageSourcesIndexes.previous]);
        }

        for (let i = 0; i < sourcesCount; i++) {
            this.scaleSource(i);
            if (i !== stageSourcesIndexes.current
                && i !== stageSourcesIndexes.next
                && i !== stageSourcesIndexes.previous
                && sources[i]) {
                fsLightbox.slideTransformer.plus(sources[i]);
            }
        }
    };


    this.scaleSource = function (sourceIndex) {
        if (!sources[sourceIndex]) return;
        const element = sources[sourceIndex].firstChild;
        let sourceWidth = rememberedSourceDimension[sourceIndex].width;
        let sourceHeight = rememberedSourceDimension[sourceIndex].height;

        const coefficient = sourceWidth / sourceHeight;
        const deviceWidth = parseInt(fsLightbox.mediaHolder.style.width);
        const deviceHeight = parseInt(fsLightbox.mediaHolder.style.height);
        let newHeight = deviceWidth / coefficient;

        const setDimensions = function () {
            element.style.height = newHeight + "px";
            element.style.width = (newHeight * coefficient) + "px";
        };

        // wider than higher
        if (newHeight < deviceHeight) {
            if (sourceWidth < deviceWidth) {
                newHeight = sourceHeight;
            }
            setDimensions();
            return;
        }

        //higher than wider
        if (sourceHeight > deviceHeight) {
            newHeight = deviceHeight;
        } else {
            newHeight = sourceHeight;
        }

        setDimensions();
    };

    this.init = function () {
        this.mediaHolderDimensions();
        this.addListener();
    };

    this.addListener = function() {
        window.addEventListener('resize', resizeListener);
    };

    const resizeListener = function()  {
        _this.mediaHolderDimensions();
        _this.scaleAndTransformSources();
    };

    this.removeListener = function() {
        window.removeEventListener('resize', resizeListener);
    };
};

},{}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9ET01PYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9NZWRpYUhvbGRlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL1NWR0ljb24uanMiLCJzcmMvanMvQ29tcG9uZW50cy9Ub29sYmFyLmpzIiwic3JjL2pzL0NvcmUvRG9tUmVuZGVyZXIuanMiLCJzcmMvanMvQ29yZS9TY3JvbGxiYXJSZWNvbXBlbnNvci5qcyIsInNyYy9qcy9Db3JlL1Njcm9sbGJhcldpZHRoR2V0dGVyLmpzIiwic3JjL2pzL0NvcmUvU2xpZGVTd2lwaW5nLmpzIiwic3JjL2pzL0NvcmUvU2xpZGVUcmFuc2Zvcm1lci5qcyIsInNyYy9qcy9Db3JlL1N0YWdlU291cmNlc0luZGV4ZXMuanMiLCJzcmMvanMvYXBwZW5kTWV0aG9kcy5qcyIsInNyYy9qcy9pbmRleC5qcyIsInNyYy9qcy9sb2FkU291cmNlLmpzIiwic3JjL2pzL29uUmVzaXplRXZlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDblJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN01BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgICB0aGlzLmVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG5cbiAgICB0aGlzLmFkZENsYXNzZXNBbmRDcmVhdGUgPSBmdW5jdGlvbiAoY2xhc3Nlcykge1xuICAgICAgICBmb3IgKGxldCBpbmRleCBpbiBjbGFzc2VzKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc2VzW2luZGV4XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbVxuICAgIH1cbn07IiwiY29uc3QgRE9NT2JqZWN0ID0gcmVxdWlyZSgnLi9ET01PYmplY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaG9sZGVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtbWVkaWEtaG9sZGVyJ10pO1xuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDEwMDApIHtcbiAgICAgICAgaG9sZGVyLnN0eWxlLndpZHRoID0gKHdpbmRvdy5pbm5lcldpZHRoIC0gMC4xICogd2luZG93LmlubmVyV2lkdGgpICsgJ3B4JztcbiAgICAgICAgaG9sZGVyLnN0eWxlLmhlaWdodCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSAwLjEgKiB3aW5kb3cuaW5uZXJIZWlnaHQpICsgJ3B4JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBob2xkZXIuc3R5bGUud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCArICdweCc7XG4gICAgICAgIGhvbGRlci5zdHlsZS5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKyAncHgnO1xuICAgIH1cbiAgICByZXR1cm4gaG9sZGVyO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBcInN2Z1wiKTtcbiAgICB0aGlzLnBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgXCJwYXRoXCIpO1xuICAgIHRoaXMucGF0aC5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LXN2Zy1wYXRoJyk7XG4gICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2NsYXNzJywgJ2ZzbGlnaHRib3gtc3ZnLWljb24nKTtcbiAgICB0aGlzLnN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndmlld0JveCcsICcwIDAgMTUgMTUnKTtcblxuICAgIHRoaXMuZ2V0U1ZHSWNvbiA9IGZ1bmN0aW9uICh2aWV3Qm94LCBkaW1lbnNpb24sIGQpIHtcbiAgICAgICAgdGhpcy5wYXRoLnNldEF0dHJpYnV0ZU5TKG51bGwsICdkJywgZCk7XG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICd2aWV3Qm94Jywgdmlld0JveCk7XG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICd3aWR0aCcsIGRpbWVuc2lvbik7XG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICdoZWlnaHQnLCBkaW1lbnNpb24pO1xuICAgICAgICB0aGlzLnN2Zy5hcHBlbmRDaGlsZCh0aGlzLnBhdGgpO1xuICAgICAgICByZXR1cm4gdGhpcy5zdmc7XG4gICAgfVxufTsiLCJjb25zdCBET01PYmplY3QgPSByZXF1aXJlKCcuL0RPTU9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmc0xpZ2h0Ym94KSB7XG4gICAgdGhpcy50b29sYmFyRWxlbSA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXRvb2xiYXInXSk7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5yZW5kZXJEZWZhdWx0QnV0dG9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHNob3VsZFJlbmRlckJ1dHRvbnMgPSBmc0xpZ2h0Ym94LmRhdGEudG9vbGJhckJ1dHRvbnM7XG5cbiAgICAgICAgaWYgKHNob3VsZFJlbmRlckJ1dHRvbnMuZnVsbHNjcmVlbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXRvb2xiYXItYnV0dG9uJywgJ2ZzbGlnaHRib3gtZmxleC1jZW50ZXJlZCddKTtcbiAgICAgICAgICAgIGxldCBzdmcgPSBuZXcgZnNMaWdodGJveC5TVkdJY29uKCkuZ2V0U1ZHSWNvbignMCAwIDE3LjUgMTcuNScgK1xuICAgICAgICAgICAgICAgICcnLCAnMjBweCcsICdNNC41IDExSDN2NGg0di0xLjVINC41VjExek0zIDdoMS41VjQuNUg3VjNIM3Y0em0xMC41IDYuNUgxMVYxNWg0di00aC0xLjV2Mi41ek0xMSAzdjEuNWgyLjVWN0gxNVYzaC00eicpO1xuICAgICAgICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKHN2Zyk7XG4gICAgICAgICAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAoZnNMaWdodGJveC5kYXRhLmZ1bGxzY3JlZW4pID9cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2xvc2VGdWxsc2NyZWVuKCk6XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm9wZW5GdWxsc2NyZWVuKCk7XG5cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnRvb2xiYXJFbGVtLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2hvdWxkUmVuZGVyQnV0dG9ucy5jbG9zZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXRvb2xiYXItYnV0dG9uJywgJ2ZzbGlnaHRib3gtZmxleC1jZW50ZXJlZCddKTtcbiAgICAgICAgICAgIGxldCBzdmcgPSBuZXcgZnNMaWdodGJveC5TVkdJY29uKCkuZ2V0U1ZHSWNvbignMCAwIDIwIDIwJywgJzE2cHgnLCAnTSAxMS40NjkgMTAgbCA3LjA4IC03LjA4IGMgMC40MDYgLTAuNDA2IDAuNDA2IC0xLjA2NCAwIC0xLjQ2OSBjIC0wLjQwNiAtMC40MDYgLTEuMDYzIC0wLjQwNiAtMS40NjkgMCBMIDEwIDguNTMgbCAtNy4wODEgLTcuMDggYyAtMC40MDYgLTAuNDA2IC0xLjA2NCAtMC40MDYgLTEuNDY5IDAgYyAtMC40MDYgMC40MDYgLTAuNDA2IDEuMDYzIDAgMS40NjkgTCA4LjUzMSAxMCBMIDEuNDUgMTcuMDgxIGMgLTAuNDA2IDAuNDA2IC0wLjQwNiAxLjA2NCAwIDEuNDY5IGMgMC4yMDMgMC4yMDMgMC40NjkgMC4zMDQgMC43MzUgMC4zMDQgYyAwLjI2NiAwIDAuNTMxIC0wLjEwMSAwLjczNSAtMC4zMDQgTCAxMCAxMS40NjkgbCA3LjA4IDcuMDgxIGMgMC4yMDMgMC4yMDMgMC40NjkgMC4zMDQgMC43MzUgMC4zMDQgYyAwLjI2NyAwIDAuNTMyIC0wLjEwMSAwLjczNSAtMC4zMDQgYyAwLjQwNiAtMC40MDYgMC40MDYgLTEuMDY0IDAgLTEuNDY5IEwgMTEuNDY5IDEwIFonKTtcbiAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChzdmcpO1xuICAgICAgICAgICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYoIWZzTGlnaHRib3guZGF0YS5mYWRpbmdPdXQpIGZzTGlnaHRib3guaGlkZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMudG9vbGJhckVsZW0uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHRoaXMub3BlbkZ1bGxzY3JlZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZzTGlnaHRib3guZGF0YS5mdWxsc2NyZWVuID0gdHJ1ZTtcbiAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIGlmIChlbGVtLnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBlbGVtLnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbS5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICAgICAgZWxlbS5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW0ud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGVsZW0ud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtLm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGVsZW0ubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuY2xvc2VGdWxsc2NyZWVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmc0xpZ2h0Ym94LmRhdGEuZnVsbHNjcmVlbiA9IGZhbHNlO1xuICAgICAgICBpZiAoZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnJlbmRlclRvb2xiYXIgPSBmdW5jdGlvbiAobmF2KSB7XG4gICAgICAgIHRoaXMucmVuZGVyRGVmYXVsdEJ1dHRvbnMoKTtcbiAgICAgICAgbmF2LmFwcGVuZENoaWxkKHRoaXMudG9vbGJhckVsZW0pO1xuICAgIH07XG59OyIsImNvbnN0IERPTU9iamVjdCA9IHJlcXVpcmUoJy4uL0NvbXBvbmVudHMvRE9NT2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZzTGlnaHRib3gpIHtcbiAgICB0aGlzLnJlbmRlckRPTSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnNMaWdodGJveC5lbGVtZW50LmlkID0gXCJmc2xpZ2h0Ym94LWNvbnRhaW5lclwiO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZzTGlnaHRib3guZWxlbWVudCk7XG5cbiAgICAgICAgLy9yZW5kZXIgc2xpZGUgYnV0dG9ucyBhbmQgbmF2KHRvb2xiYXIpXG4gICAgICAgIHJlbmRlck5hdihmc0xpZ2h0Ym94LmVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChmc0xpZ2h0Ym94LmRhdGEudG90YWxTbGlkZXMgPiAxKSB7XG4gICAgICAgICAgICByZW5kZXJTbGlkZUJ1dHRvbnMoZnNMaWdodGJveC5lbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBmc0xpZ2h0Ym94LmVsZW1lbnQuYXBwZW5kQ2hpbGQoZnNMaWdodGJveC5tZWRpYUhvbGRlcik7XG4gICAgICAgIGZzTGlnaHRib3guZGF0YS5pc2ZpcnN0VGltZUxvYWQgPSB0cnVlO1xuICAgIH07XG5cbiAgICBjb25zdCBzbGlkZUNvdW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBudW1iZXJDb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1udW1iZXItY29udGFpbmVyJywgJ2ZzbGlnaHRib3gtZmxleC1jZW50ZXJlZCddKTtcbiAgICAgICAgZnNMaWdodGJveC5kYXRhLnNsaWRlQ291bnRlckVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3Qgc2xpZGVDb3VudGVyRWxlbSA9IGZzTGlnaHRib3guZGF0YS5zbGlkZUNvdW50ZXJFbGVtO1xuXG4gICAgICAgIHNsaWRlQ291bnRlckVsZW0uaW5uZXJIVE1MID0gZnNMaWdodGJveC5kYXRhLnNsaWRlO1xuICAgICAgICBzbGlkZUNvdW50ZXJFbGVtLmlkID0gJ2N1cnJlbnRfc2xpZGUnO1xuXG4gICAgICAgIGxldCBzcGFjZSA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsYXNoJ10pO1xuICAgICAgICBzcGFjZS5pbm5lckhUTUwgPSAnLyc7XG5cbiAgICAgICAgbGV0IHNsaWRlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzbGlkZXMuaW5uZXJIVE1MID0gZnNMaWdodGJveC5kYXRhLnRvdGFsU2xpZGVzO1xuXG4gICAgICAgIG51bWJlckNvbnRhaW5lci5hcHBlbmRDaGlsZChzbGlkZUNvdW50ZXJFbGVtKTtcbiAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNwYWNlKTtcbiAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNsaWRlcyk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJTbGlkZUNvdW50ZXIgPSBmdW5jdGlvbiAobmF2KSB7XG4gICAgICAgICAgICBpZiAoZnNMaWdodGJveC5kYXRhLnNsaWRlQ291bnRlcilcbiAgICAgICAgICAgICAgICBuYXYuYXBwZW5kQ2hpbGQobnVtYmVyQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIGNvbnN0IHJlbmRlck5hdiA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcbiAgICAgICAgZnNMaWdodGJveC5kYXRhLm5hdiA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LW5hdiddKTtcbiAgICAgICAgZnNMaWdodGJveC50b29sYmFyLnJlbmRlclRvb2xiYXIoZnNMaWdodGJveC5kYXRhLm5hdik7XG5cbiAgICAgICAgaWYoZnNMaWdodGJveC5kYXRhLnRvdGFsU2xpZGVzID4gMikge1xuICAgICAgICAgICAgY29uc3QgY291bnRlciA9IG5ldyBzbGlkZUNvdW50ZXIoKTtcbiAgICAgICAgICAgIGNvdW50ZXIucmVuZGVyU2xpZGVDb3VudGVyKGZzTGlnaHRib3guZGF0YS5uYXYpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmc0xpZ2h0Ym94LmRhdGEubmF2KTtcblxuICAgIH07XG5cbiAgICBjb25zdCBjcmVhdGVCVE4gPSBmdW5jdGlvbiAoYnV0dG9uQ29udGFpbmVyLCBjb250YWluZXIsIGQpIHtcbiAgICAgICAgbGV0IGJ0biA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLWJ0bicsICdmc2xpZ2h0Ym94LWZsZXgtY2VudGVyZWQnXSk7XG4gICAgICAgIGJ0bi5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIG5ldyBmc0xpZ2h0Ym94LlNWR0ljb24oKS5nZXRTVkdJY29uKCcwIDAgMjAgMjAnLCAnMWVtJywgZClcbiAgICAgICAgKTtcbiAgICAgICAgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25Db250YWluZXIpO1xuICAgIH07XG5cbiAgICBjb25zdCByZW5kZXJTbGlkZUJ1dHRvbnMgPSBmdW5jdGlvbiAoY29udGFpbmVyKSB7XG4gICAgICAgIGlmIChmc0xpZ2h0Ym94LmRhdGEuc2xpZGVCdXR0b25zID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vcmVuZGVyIGxlZnQgYnRuXG4gICAgICAgIGxldCBsZWZ0X2J0bl9jb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4tY29udGFpbmVyJywgJ2ZzbGlnaHRib3gtc2xpZGUtYnRuLWxlZnQtY29udGFpbmVyJ10pO1xuICAgICAgICBjcmVhdGVCVE4obGVmdF9idG5fY29udGFpbmVyLCBjb250YWluZXIsICdNOC4zODgsMTAuMDQ5bDQuNzYtNC44NzNjMC4zMDMtMC4zMSwwLjI5Ny0wLjgwNC0wLjAxMi0xLjEwNWMtMC4zMDktMC4zMDQtMC44MDMtMC4yOTMtMS4xMDUsMC4wMTJMNi43MjYsOS41MTZjLTAuMzAzLDAuMzEtMC4yOTYsMC44MDUsMC4wMTIsMS4xMDVsNS40MzMsNS4zMDdjMC4xNTIsMC4xNDgsMC4zNSwwLjIyMywwLjU0NywwLjIyM2MwLjIwMywwLDAuNDA2LTAuMDgsMC41NTktMC4yMzZjMC4zMDMtMC4zMDksMC4yOTUtMC44MDMtMC4wMTItMS4xMDRMOC4zODgsMTAuMDQ5eicpO1xuXG4gICAgICAgIC8vZ28gdG8gcHJldmlvdXMgc2xpZGUgb25jbGlja1xuICAgICAgICBsZWZ0X2J0bl9jb250YWluZXIub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3guYXBwZW5kTWV0aG9kcy5wcmV2aW91c1NsaWRlVmlhQnV0dG9uKGZzTGlnaHRib3guZGF0YS5zbGlkZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IHJpZ2h0X2J0bl9jb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4tY29udGFpbmVyJywgJ2ZzbGlnaHRib3gtc2xpZGUtYnRuLXJpZ2h0LWNvbnRhaW5lciddKTtcbiAgICAgICAgY3JlYXRlQlROKHJpZ2h0X2J0bl9jb250YWluZXIsIGNvbnRhaW5lciwgJ00xMS42MTEsMTAuMDQ5bC00Ljc2LTQuODczYy0wLjMwMy0wLjMxLTAuMjk3LTAuODA0LDAuMDEyLTEuMTA1YzAuMzA5LTAuMzA0LDAuODAzLTAuMjkzLDEuMTA1LDAuMDEybDUuMzA2LDUuNDMzYzAuMzA0LDAuMzEsMC4yOTYsMC44MDUtMC4wMTIsMS4xMDVMNy44MywxNS45MjhjLTAuMTUyLDAuMTQ4LTAuMzUsMC4yMjMtMC41NDcsMC4yMjNjLTAuMjAzLDAtMC40MDYtMC4wOC0wLjU1OS0wLjIzNmMtMC4zMDMtMC4zMDktMC4yOTUtMC44MDMsMC4wMTItMS4xMDRMMTEuNjExLDEwLjA0OXonKTtcbiAgICAgICAgLy8gZ28gdG8gbmV4dCBzbGlkZSBvbiBjbGlja1xuICAgICAgICByaWdodF9idG5fY29udGFpbmVyLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmc0xpZ2h0Ym94LmFwcGVuZE1ldGhvZHMubmV4dFNsaWRlVmlhQnV0dG9uKGZzTGlnaHRib3guZGF0YS5zbGlkZSk7XG4gICAgICAgIH07XG4gICAgfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2Nyb2xsYmFyV2lkdGgpIHtcbiAgICB0aGlzLmFkZFJlY29tcGVuc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghZG9lc1Njcm9sbGJhckhhdmVXaWR0aCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm1hcmdpblJpZ2h0ID0gc2Nyb2xsYmFyV2lkdGggKyAncHgnO1xuICAgICAgICBjb25zdCBlbGVtZW50c1RvUmVjb21wZW5zZSA9IGdldFJlY29tcGVuc2VFbGVtZW50cygpO1xuICAgICAgICBpZiAoIWVsZW1lbnRzVG9SZWNvbXBlbnNlKSByZXR1cm47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHNUb1JlY29tcGVuc2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGVsZW1lbnRzVG9SZWNvbXBlbnNlW2ldLnN0eWxlLm1hcmdpblJpZ2h0ID0gc2Nyb2xsYmFyV2lkdGggKyAncHgnO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMucmVtb3ZlUmVjb21wZW5zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFkb2VzU2Nyb2xsYmFySGF2ZVdpZHRoKCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5tYXJnaW5SaWdodCA9ICcnO1xuICAgICAgICBjb25zdCBlbGVtZW50c1RvUmVjb21wZW5zZSA9IGdldFJlY29tcGVuc2VFbGVtZW50cygpO1xuICAgICAgICBpZiAoIWVsZW1lbnRzVG9SZWNvbXBlbnNlKSByZXR1cm47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHNUb1JlY29tcGVuc2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGVsZW1lbnRzVG9SZWNvbXBlbnNlW2ldLnN0eWxlLm1hcmdpblJpZ2h0ID0gJyc7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0UmVjb21wZW5zZUVsZW1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVjb21wZW5zZS1mb3Itc2Nyb2xsYmFyJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRvZXNTY3JvbGxiYXJIYXZlV2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAhIXNjcm9sbGJhcldpZHRoO1xuICAgIH07XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHRoaXMuZ2V0V2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBvdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIG91dGVyLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICBvdXRlci5zdHlsZS53aWR0aCA9IFwiMTAwcHhcIjtcbiAgICAgICAgb3V0ZXIuc3R5bGUubXNPdmVyZmxvd1N0eWxlID0gXCJzY3JvbGxiYXJcIjtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlcik7XG4gICAgICAgIGxldCB3aWR0aE5vU2Nyb2xsID0gb3V0ZXIub2Zmc2V0V2lkdGg7XG4gICAgICAgIG91dGVyLnN0eWxlLm92ZXJmbG93ID0gXCJzY3JvbGxcIjtcbiAgICAgICAgbGV0IGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW5uZXIuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgb3V0ZXIuYXBwZW5kQ2hpbGQoaW5uZXIpO1xuICAgICAgICBsZXQgd2lkdGhXaXRoU2Nyb2xsID0gaW5uZXIub2Zmc2V0V2lkdGg7XG4gICAgICAgIG91dGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob3V0ZXIpO1xuICAgICAgICBkYXRhLnNjcm9sbGJhcldpZHRoID0gd2lkdGhOb1Njcm9sbCAtIHdpZHRoV2l0aFNjcm9sbDtcbiAgICB9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWxmKSB7XG4gICAgLy93ZSB3aWxsIGhvdmVyIGFsbCB3aW5kb3dzIHdpdGggZGl2IHdpdGggaGlnaCB6LWluZGV4IHRvIGJlIHN1cmUgbW91c2V1cCBpcyB0cmlnZ2VyZWRcbiAgICBjb25zdCBpbnZpc2libGVIb3ZlciA9IG5ldyAocmVxdWlyZSgnLi4vQ29tcG9uZW50cy9ET01PYmplY3QnKSkoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LWludmlzaWJsZS1ob3ZlciddKTtcblxuICAgIC8vdG8gdGhlc2UgZWxlbWVudHMgYXJlIGFkZGVkIG1vdXNlIGV2ZW50c1xuICAgIGNvbnN0IGVsZW1lbnRzID0ge1xuICAgICAgICBcIm1lZGlhSG9sZGVyXCI6IHNlbGYubWVkaWFIb2xkZXIsXG4gICAgICAgIFwiaW52aXNpYmxlSG92ZXJcIjogaW52aXNpYmxlSG92ZXIsXG4gICAgfTtcbiAgICAvL3NvdXJjZXMgYXJlIHRyYW5zZm9ybWVkXG4gICAgY29uc3Qgc291cmNlcyA9IHNlbGYuZGF0YS5zb3VyY2VzO1xuXG4gICAgLy8gaWYgdGhlcmUgYXJlIG9ubHkgMiBvciAxIHVybHMgc2xpZGVUcmFuc2Zvcm1lciB3aWxsIGJlIGRpZmZlcmVudFxuICAgIGNvbnN0IHVybHNMZW5ndGggPSBzZWxmLmRhdGEudXJscy5sZW5ndGg7XG5cbiAgICBsZXQgaXNfZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICBsZXQgbW91c2VEb3duQ2xpZW50WDtcbiAgICBsZXQgZGlmZmVyZW5jZTtcbiAgICBsZXQgc2xpZGVBYmxlID0gdHJ1ZTtcblxuXG4gICAgY29uc3QgbW91c2VEb3duRXZlbnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAvLyB0YWcgY2FuJ3QgYmUgdmlkZW8gY2F1c2UgaXQgd291bGQgYmUgdW5jbGlja2FibGUgaW4gbWljcm9zb2Z0IGJyb3dzZXJzXG4gICAgICAgIGlmIChlLnRhcmdldC50YWdOYW1lICE9PSAnVklERU8nICYmICFlLnRvdWNoZXMpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBlbGVtIGluIGVsZW1lbnRzKSB7XG4gICAgICAgICAgICBlbGVtZW50c1tlbGVtXS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LWN1cnNvci1ncmFiYmluZycpO1xuICAgICAgICB9XG4gICAgICAgIGlzX2RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgKGUudG91Y2hlcykgP1xuICAgICAgICAgICAgbW91c2VEb3duQ2xpZW50WCA9IGUudG91Y2hlc1swXS5jbGllbnRYIDpcbiAgICAgICAgICAgIG1vdXNlRG93bkNsaWVudFggPSBlLmNsaWVudFg7XG4gICAgICAgIGRpZmZlcmVuY2UgPSAwO1xuICAgIH07XG5cblxuICAgIGNvbnN0IG1vdXNlVXBFdmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHNlbGYuZWxlbWVudC5jb250YWlucyhpbnZpc2libGVIb3ZlcikpIHtcbiAgICAgICAgICAgIHNlbGYuZWxlbWVudC5yZW1vdmVDaGlsZChpbnZpc2libGVIb3Zlcik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgZWxlbSBpbiBlbGVtZW50cykge1xuICAgICAgICAgICAgZWxlbWVudHNbZWxlbV0uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1jdXJzb3ItZ3JhYmJpbmcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlzX2RyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgLy8gaWYgdXNlciBkaWRuJ3Qgc2xpZGUgbm9uZSBhbmltYXRpb24gc2hvdWxkIHdvcmtcbiAgICAgICAgaWYgKGRpZmZlcmVuY2UgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdlIGNhbiBzbGlkZSBvbmx5IGlmIHByZXZpb3VzIGFuaW1hdGlvbiBoYXMgZmluaXNoZWRcbiAgICAgICAgaWYgKCFzbGlkZUFibGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzbGlkZUFibGUgPSBmYWxzZTtcbiAgICAgICAgbGV0IHNvdXJjZXNJbmRleGVzID0gc2VsZi5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKHNlbGYuZGF0YS5zbGlkZSk7XG5cbiAgICAgICAgLy8gYWRkIHRyYW5zaXRpb24gaWYgdXNlciBzbGlkZSB0byBzb3VyY2VcbiAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10uY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xuICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcbiAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XG5cblxuICAgICAgICAvLyBzbGlkZSBwcmV2aW91c1xuICAgICAgICBpZiAoZGlmZmVyZW5jZSA+IDApIHtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIHNsaWRlIG51bWJlclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnRvdGFsU2xpZGVzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEuc2xpZGUgLSAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHVybHNMZW5ndGggPj0gMikge1xuICAgICAgICAgICAgICAgIHNlbGYuc2xpZGVUcmFuc2Zvcm1lci5wbHVzKHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0pO1xuICAgICAgICAgICAgICAgIHNlbGYuc2xpZGVUcmFuc2Zvcm1lci56ZXJvKHNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zbGlkZVRyYW5zZm9ybWVyLnplcm8oc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGdldCBuZXcgaW5kZXhlc1xuICAgICAgICAgICAgc291cmNlc0luZGV4ZXMgPSBzZWxmLnN0YWdlU291cmNlSW5kZXhlcy5hbGwoc2VsZi5kYXRhLnNsaWRlKTtcblxuICAgICAgICAgICAgLy9pZiBzb3VyY2UgaXNuJ3QgYWxyZWFkeSBpbiBtZW1vcnlcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZi5kYXRhLnNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlcygncHJldmlvdXMnLCBzZWxmLmRhdGEuc2xpZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvLyBzbGlkZSBuZXh0XG4gICAgICAgIGVsc2UgaWYgKGRpZmZlcmVuY2UgPCAwKSB7XG5cbiAgICAgICAgICAgIC8vdXBkYXRlIHNsaWRlIG51bWJlclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZSA9PT0gc2VsZi5kYXRhLnRvdGFsU2xpZGVzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi51cGRhdGVTbGlkZU51bWJlcigxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEuc2xpZGUgKyAxKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZiAodXJsc0xlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNsaWRlVHJhbnNmb3JtZXIubWludXMoc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XSk7XG4gICAgICAgICAgICAgICAgc2VsZi5zbGlkZVRyYW5zZm9ybWVyLnplcm8oc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuc2xpZGVUcmFuc2Zvcm1lci56ZXJvKHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBnZXQgbmV3IGluZGV4ZXNcbiAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzID0gc2VsZi5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKHNlbGYuZGF0YS5zbGlkZSk7XG4gICAgICAgICAgICAvL2lmIHNvdXJjZSBpc24ndCBhbHJlYWR5IGluIG1lbW9yeVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxmLmRhdGEuc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgIHNlbGYubG9hZHNvdXJjZXMoJ25leHQnLCBzZWxmLmRhdGEuc2xpZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZGlmZmVyZW5jZSA9IDA7XG4gICAgICAgIHNlbGYuc3RvcFZpZGVvcygpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIHRyYW5zaXRpb24gYmVjYXVzZSB3aXRoIGRyYWdnaW5nIGl0IGxvb2tzIGF3ZnVsXG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcbiAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xuXG4gICAgICAgICAgICAvLyB1c2VyIHNob3VsZG4ndCBiZSBhYmxlIHRvIHNsaWRlIHdoZW4gYW5pbWF0aW9uIGlzIHJ1bm5pbmdcbiAgICAgICAgICAgIHNsaWRlQWJsZSA9IHRydWU7XG4gICAgICAgIH0sIDI1MCk7XG4gICAgfTtcblxuXG4gICAgY29uc3QgbW91c2VNb3ZlRXZlbnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoIWlzX2RyYWdnaW5nIHx8ICFzbGlkZUFibGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjbGllbnRYO1xuICAgICAgICAoZS50b3VjaGVzKSA/XG4gICAgICAgICAgICBjbGllbnRYID0gZS50b3VjaGVzWzBdLmNsaWVudFggOlxuICAgICAgICAgICAgY2xpZW50WCA9IGUuY2xpZW50WDtcblxuICAgICAgICBzZWxmLmVsZW1lbnQuYXBwZW5kQ2hpbGQoaW52aXNpYmxlSG92ZXIpO1xuICAgICAgICBkaWZmZXJlbmNlID0gY2xpZW50WCAtIG1vdXNlRG93bkNsaWVudFg7XG4gICAgICAgIGNvbnN0IHNvdXJjZXNJbmRleGVzID0gc2VsZi5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKHNlbGYuZGF0YS5zbGlkZSk7XG5cbiAgICAgICAgaWYgKHVybHNMZW5ndGggPj0gMykge1xuICAgICAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICtcbiAgICAgICAgICAgICAgICAoLXNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGggKyBkaWZmZXJlbmNlKVxuICAgICAgICAgICAgICAgICsgJ3B4LDApJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1cmxzTGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgZGlmZmVyZW5jZSArICdweCwwKSc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXJsc0xlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJ1xuICAgICAgICAgICAgICAgICsgKHNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGggKyBkaWZmZXJlbmNlKVxuICAgICAgICAgICAgICAgICsgJ3B4LDApJztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBwcmV2ZW50RGVmYXVsdEV2ZW50ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG5cblxuICAgIGZvciAobGV0IGVsZW0gaW4gZWxlbWVudHMpIHtcbiAgICAgICAgZWxlbWVudHNbZWxlbV0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2VEb3duRXZlbnQpO1xuICAgICAgICBlbGVtZW50c1tlbGVtXS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgbW91c2VEb3duRXZlbnQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwRXZlbnQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG1vdXNlVXBFdmVudCk7XG4gICAgaW52aXNpYmxlSG92ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlVXBFdmVudCk7XG4gICAgaW52aXNpYmxlSG92ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBtb3VzZVVwRXZlbnQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlRXZlbnQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBtb3VzZU1vdmVFdmVudCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHNlbGYuZGF0YS5uYXYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgcHJldmVudERlZmF1bHRFdmVudCk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNsaWRlRGlzdGFuY2UpIHtcbiAgICB0aGlzLm1pbnVzID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgZWxlbS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyAoLXNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aCkgKyAncHgsMCknO1xuICAgIH07XG5cbiAgICB0aGlzLnplcm8gPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICBlbGVtLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoMCwwKSc7XG4gICAgfTtcblxuICAgIHRoaXMucGx1cyA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIGVsZW0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgc2xpZGVEaXN0YW5jZSAqIHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4LDApJztcbiAgICB9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdGhpcy5wcmV2aW91cyA9IGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgICBsZXQgcHJldmlvdXNTbGlkZUluZGV4O1xuICAgICAgICBjb25zdCBhcnJheUluZGV4ID0gc2xpZGUgLSAxO1xuXG4gICAgICAgIC8vIHByZXZpb3VzXG4gICAgICAgIGlmIChhcnJheUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICBwcmV2aW91c1NsaWRlSW5kZXggPSBkYXRhLnRvdGFsU2xpZGVzIC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByZXZpb3VzU2xpZGVJbmRleCA9IGFycmF5SW5kZXggLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzU2xpZGVJbmRleDtcbiAgICB9O1xuXG4gICAgdGhpcy5uZXh0ID0gZnVuY3Rpb24gKHNsaWRlKSB7XG5cbiAgICAgICAgbGV0IG5leHRTbGlkZUluZGV4O1xuICAgICAgICBjb25zdCBhcnJheUluZGV4ID0gc2xpZGUgLSAxO1xuXG4gICAgICAgIC8vbmV4dFxuICAgICAgICBpZiAoc2xpZGUgPT09IGRhdGEudG90YWxTbGlkZXMpIHtcbiAgICAgICAgICAgIG5leHRTbGlkZUluZGV4ID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHRTbGlkZUluZGV4ID0gYXJyYXlJbmRleCArIDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFNsaWRlSW5kZXg7XG4gICAgfTtcblxuICAgIHRoaXMuYWxsID0gZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICAgIC8vIHNvdXJjZXMgYXJlIHN0b3JlZCBpbiBhcnJheSBpbmRleGVkIGZyb20gMFxuICAgICAgICBjb25zdCBhcnJheUluZGV4ID0gc2xpZGUgLSAxO1xuICAgICAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IHtcbiAgICAgICAgICAgIHByZXZpb3VzOiAwLFxuICAgICAgICAgICAgY3VycmVudDogMCxcbiAgICAgICAgICAgIG5leHQ6IDBcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBwcmV2aW91c1xuICAgICAgICBpZiAoYXJyYXlJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgc291cmNlc0luZGV4ZXMucHJldmlvdXMgPSBkYXRhLnRvdGFsU2xpZGVzIC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzLnByZXZpb3VzID0gYXJyYXlJbmRleCAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjdXJyZW50XG4gICAgICAgIHNvdXJjZXNJbmRleGVzLmN1cnJlbnQgPSBhcnJheUluZGV4O1xuXG4gICAgICAgIC8vbmV4dFxuICAgICAgICBpZiAoc2xpZGUgPT09IGRhdGEudG90YWxTbGlkZXMpIHtcbiAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzLm5leHQgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc291cmNlc0luZGV4ZXMubmV4dCA9IGFycmF5SW5kZXggKyAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNvdXJjZXNJbmRleGVzO1xuICAgIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZnNMaWdodGJveCkge1xuICAgIGNvbnN0IGxvYWRlciA9ICc8ZGl2IGNsYXNzPVwiZnNsaWdodGJveC1sb2FkZXJcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2Pic7XG4gICAgY29uc3QgdHJhbnNpdGlvbiA9ICdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJztcbiAgICBjb25zdCBmYWRlSW4gPSAnZnNsaWdodGJveC1mYWRlLWluJztcbiAgICBjb25zdCBmYWRlT3V0ID0gJ2ZzbGlnaHRib3gtZmFkZS1vdXQnO1xuXG4gICAgY29uc3QgY3JlYXRlSG9sZGVyID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZUhvbGRlciA9IG5ldyAocmVxdWlyZSgnLi9Db21wb25lbnRzL0RPTU9iamVjdCcpKSgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc291cmNlLWhvbGRlcicsICdmc2xpZ2h0Ym94LWZ1bGwtZGltZW5zaW9uJ10pO1xuICAgICAgICBzb3VyY2VIb2xkZXIuaW5uZXJIVE1MID0gbG9hZGVyO1xuICAgICAgICBmc0xpZ2h0Ym94LmRhdGEuc291cmNlc1tpbmRleF0gPSBzb3VyY2VIb2xkZXI7XG4gICAgICAgIHJldHVybiBzb3VyY2VIb2xkZXI7XG4gICAgfTtcblxuICAgIGNvbnN0IHJ1bkFuaW1hdGlvbk9uU291cmNlID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgZWxlbS5maXJzdENoaWxkLmNsYXNzTGlzdC5hZGQoZmFkZUluKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2xlYXJBbmltYXRpb25PblNvdXJjZSA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IGVsZW0uZmlyc3RDaGlsZDtcbiAgICAgICAgc3JjLmNsYXNzTGlzdC5yZW1vdmUoZmFkZUluKTtcbiAgICAgICAgc3JjLmNsYXNzTGlzdC5yZW1vdmUoZmFkZU91dCk7XG4gICAgICAgIHZvaWQgc3JjLm9mZnNldFdpZHRoO1xuICAgIH07XG5cbiAgICBjb25zdCBydW5GYWRlT3V0QW5pbWF0aW9uT25Tb3VyY2UgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICBlbGVtLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LmFkZChmYWRlT3V0KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBsb2FkZXIgd2hlbiBsb2FkaW5nIGZzTGlnaHRib3ggaW5pdGlhbGx5XG4gICAgICogQHBhcmFtIHNsaWRlXG4gICAgICovXG4gICAgdGhpcy5yZW5kZXJIb2xkZXJJbml0aWFsID0gZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZXNJbmRleGVzID0gZnNMaWdodGJveC5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKHNsaWRlKTtcbiAgICAgICAgY29uc3QgdG90YWxTbGlkZXMgPSBmc0xpZ2h0Ym94LmRhdGEudG90YWxTbGlkZXM7XG5cbiAgICAgICAgaWYgKHRvdGFsU2xpZGVzID49IDMpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXYgPSBjcmVhdGVIb2xkZXIoc291cmNlc0luZGV4ZXMucHJldmlvdXMpO1xuICAgICAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLm1pbnVzKHByZXYpO1xuICAgICAgICAgICAgZnNMaWdodGJveC5tZWRpYUhvbGRlci5hcHBlbmRDaGlsZChwcmV2KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG90YWxTbGlkZXMgPj0gMSkge1xuICAgICAgICAgICAgY29uc3QgY3VyciA9IGNyZWF0ZUhvbGRlcihzb3VyY2VzSW5kZXhlcy5jdXJyZW50KTtcbiAgICAgICAgICAgIGZzTGlnaHRib3gubWVkaWFIb2xkZXIuYXBwZW5kQ2hpbGQoY3Vycik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRvdGFsU2xpZGVzID49IDIpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHQgPSBjcmVhdGVIb2xkZXIoc291cmNlc0luZGV4ZXMubmV4dCk7XG4gICAgICAgICAgICBmc0xpZ2h0Ym94LnNsaWRlVHJhbnNmb3JtZXIucGx1cyhuZXh0KTtcbiAgICAgICAgICAgIGZzTGlnaHRib3gubWVkaWFIb2xkZXIuYXBwZW5kQ2hpbGQobmV4dCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB0aGlzLnJlbmRlckhvbGRlciA9IGZ1bmN0aW9uIChzbGlkZSwgdHlwZSkge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3ByZXZpb3VzJzpcbiAgICAgICAgICAgICAgICByZW5kZXJIb2xkZXJQcmV2aW91cyhzbGlkZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjdXJyZW50JzpcbiAgICAgICAgICAgICAgICByZW5kZXJIb2xkZXJDdXJyZW50KHNsaWRlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ25leHQnOlxuICAgICAgICAgICAgICAgIHJlbmRlckhvbGRlck5leHQoc2xpZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgY29uc3QgcmVuZGVySG9sZGVyUHJldmlvdXMgPSBmdW5jdGlvbiAoc2xpZGUpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTb3VyY2VJbmRleCA9IGZzTGlnaHRib3guc3RhZ2VTb3VyY2VJbmRleGVzLnByZXZpb3VzKHNsaWRlKTtcbiAgICAgICAgY29uc3QgcHJldiA9IGNyZWF0ZUhvbGRlcihwcmV2aW91c1NvdXJjZUluZGV4KTtcbiAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLm1pbnVzKHByZXYpO1xuICAgICAgICBmc0xpZ2h0Ym94Lm1lZGlhSG9sZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIHByZXYpO1xuICAgIH07XG5cblxuICAgIGNvbnN0IHJlbmRlckhvbGRlck5leHQgPSBmdW5jdGlvbiAoc2xpZGUpIHtcbiAgICAgICAgY29uc3QgbmV4dFNvdXJjZUluZGV4ID0gZnNMaWdodGJveC5zdGFnZVNvdXJjZUluZGV4ZXMubmV4dChzbGlkZSk7XG4gICAgICAgIGNvbnN0IG5leHQgPSBjcmVhdGVIb2xkZXIobmV4dFNvdXJjZUluZGV4KTtcbiAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLnBsdXMobmV4dCk7XG4gICAgICAgIGZzTGlnaHRib3gubWVkaWFIb2xkZXIuYXBwZW5kQ2hpbGQobmV4dCk7XG4gICAgfTtcblxuXG4gICAgY29uc3QgcmVuZGVySG9sZGVyQ3VycmVudCA9IGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IGZzTGlnaHRib3guc3RhZ2VTb3VyY2VJbmRleGVzLmFsbChzbGlkZSk7XG4gICAgICAgIGNvbnN0IGN1cnIgPSBjcmVhdGVIb2xkZXIoc291cmNlc0luZGV4ZXMuY3VycmVudCk7XG4gICAgICAgIGZzTGlnaHRib3guc2xpZGVUcmFuc2Zvcm1lci56ZXJvKGN1cnIpO1xuICAgICAgICBmc0xpZ2h0Ym94Lm1lZGlhSG9sZGVyLmluc2VydEJlZm9yZShjdXJyLCBmc0xpZ2h0Ym94LmRhdGEuc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XSk7XG4gICAgfTtcblxuXG4gICAgdGhpcy5wcmV2aW91c1NsaWRlVmlhQnV0dG9uID0gZnVuY3Rpb24gKHByZXZpb3VzU2xpZGUpIHtcbiAgICAgICAgaWYgKHByZXZpb3VzU2xpZGUgPT09IDEpIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3guZGF0YS5zbGlkZSA9IGZzTGlnaHRib3guZGF0YS50b3RhbFNsaWRlcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3guZGF0YS5zbGlkZSAtPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV3U291cmNlc0luZGV4ZXMgPSBzdG9wVmlkZW9zVXBkYXRlU2xpZGVBbmRSZXR1cm5TbGlkZU51bWJlckluZGV4ZXMoKTtcblxuICAgICAgICBpZiAodHlwZW9mIGZzTGlnaHRib3guZGF0YS5zb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLnByZXZpb3VzXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgZnNMaWdodGJveC5sb2Fkc291cmNlcygncHJldmlvdXMnLCBmc0xpZ2h0Ym94LmRhdGEuc2xpZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGZzTGlnaHRib3guZGF0YS5zb3VyY2VzO1xuICAgICAgICBjb25zdCBjdXJyZW50U291cmNlID0gc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5jdXJyZW50XTtcbiAgICAgICAgY29uc3QgbmV4dFNvdXJjZSA9IHNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMubmV4dF07XG5cbiAgICAgICAgbmV4dFNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKHRyYW5zaXRpb24pO1xuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5yZW1vdmUodHJhbnNpdGlvbik7XG4gICAgICAgIHNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMucHJldmlvdXNdLmNsYXNzTGlzdC5yZW1vdmUodHJhbnNpdGlvbik7XG5cblxuICAgICAgICBjbGVhckFuaW1hdGlvbk9uU291cmNlKGN1cnJlbnRTb3VyY2UpO1xuICAgICAgICBydW5BbmltYXRpb25PblNvdXJjZShjdXJyZW50U291cmNlKTtcbiAgICAgICAgcnVuRmFkZU91dEFuaW1hdGlvbk9uU291cmNlKG5leHRTb3VyY2UpO1xuXG4gICAgICAgIGZzTGlnaHRib3guc2xpZGVUcmFuc2Zvcm1lci56ZXJvKGN1cnJlbnRTb3VyY2UpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3guc2xpZGVUcmFuc2Zvcm1lci5wbHVzKG5leHRTb3VyY2UpO1xuICAgICAgICAgICAgbmV4dFNvdXJjZS5maXJzdENoaWxkLmNsYXNzTGlzdC5yZW1vdmUoZmFkZU91dCk7XG4gICAgICAgIH0sIDIyMCk7XG4gICAgfTtcblxuXG4gICAgdGhpcy5uZXh0U2xpZGVWaWFCdXR0b24gPSBmdW5jdGlvbiAocHJldmlvdXNTbGlkZSkge1xuICAgICAgICBpZiAocHJldmlvdXNTbGlkZSA9PT0gZnNMaWdodGJveC5kYXRhLnRvdGFsU2xpZGVzKSB7XG4gICAgICAgICAgICBmc0xpZ2h0Ym94LmRhdGEuc2xpZGUgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnNMaWdodGJveC5kYXRhLnNsaWRlICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXdTb3VyY2VzSW5kZXhlcyA9IHN0b3BWaWRlb3NVcGRhdGVTbGlkZUFuZFJldHVyblNsaWRlTnVtYmVySW5kZXhlcygpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZnNMaWdodGJveC5kYXRhLnNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMubmV4dF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3gubG9hZHNvdXJjZXMoJ25leHQnLCBmc0xpZ2h0Ym94LmRhdGEuc2xpZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGZzTGlnaHRib3guZGF0YS5zb3VyY2VzO1xuICAgICAgICBjb25zdCBjdXJyZW50U291cmNlID0gc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5jdXJyZW50XTtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTb3VyY2UgPSBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLnByZXZpb3VzXTtcblxuICAgICAgICBwcmV2aW91c1NvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKHRyYW5zaXRpb24pO1xuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5yZW1vdmUodHJhbnNpdGlvbik7XG4gICAgICAgIHNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMubmV4dF0uY2xhc3NMaXN0LnJlbW92ZSh0cmFuc2l0aW9uKTtcblxuICAgICAgICBjbGVhckFuaW1hdGlvbk9uU291cmNlKGN1cnJlbnRTb3VyY2UpO1xuICAgICAgICBydW5BbmltYXRpb25PblNvdXJjZShjdXJyZW50U291cmNlKTtcbiAgICAgICAgcnVuRmFkZU91dEFuaW1hdGlvbk9uU291cmNlKHByZXZpb3VzU291cmNlKTtcbiAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLnplcm8oY3VycmVudFNvdXJjZSk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmc0xpZ2h0Ym94LnNsaWRlVHJhbnNmb3JtZXIubWludXMocHJldmlvdXNTb3VyY2UpO1xuICAgICAgICAgICAgcHJldmlvdXNTb3VyY2UuZmlyc3RDaGlsZC5jbGFzc0xpc3QucmVtb3ZlKGZhZGVPdXQpO1xuICAgICAgICB9LCAyMjApO1xuICAgIH07XG5cbiAgICBjb25zdCBzdG9wVmlkZW9zVXBkYXRlU2xpZGVBbmRSZXR1cm5TbGlkZU51bWJlckluZGV4ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZzTGlnaHRib3guc3RvcFZpZGVvcygpO1xuICAgICAgICBmc0xpZ2h0Ym94LnVwZGF0ZVNsaWRlTnVtYmVyKGZzTGlnaHRib3guZGF0YS5zbGlkZSk7XG4gICAgICAgIHJldHVybiBmc0xpZ2h0Ym94LnN0YWdlU291cmNlSW5kZXhlcy5hbGwoZnNMaWdodGJveC5kYXRhLnNsaWRlKTtcbiAgICB9O1xufTsiLCJ3aW5kb3cuZnNMaWdodGJveENsYXNzID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IERPTU9iamVjdCA9IHJlcXVpcmUoJy4vQ29tcG9uZW50cy9ET01PYmplY3QnKTtcblxuICAgIHRoaXMuZGF0YSA9IHtcbiAgICAgICAgc2xpZGU6IDEsXG4gICAgICAgIHRvdGFsU2xpZGVzOiAxLFxuICAgICAgICBzbGlkZURpc3RhbmNlOiAxLjMsXG4gICAgICAgIHNsaWRlQ291bnRlcjogdHJ1ZSxcbiAgICAgICAgc2xpZGVCdXR0b25zOiB0cnVlLFxuICAgICAgICBpc0ZpcnN0VGltZUxvYWQ6IGZhbHNlLFxuICAgICAgICBtb3ZlU2xpZGVzVmlhRHJhZzogdHJ1ZSxcbiAgICAgICAgdG9vbGJhckJ1dHRvbnM6IHtcbiAgICAgICAgICAgIFwiY2xvc2VcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZnVsbHNjcmVlblwiOiB0cnVlXG4gICAgICAgIH0sXG5cbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIHNjcm9sbGJhcldpZHRoOiAwLFxuXG4gICAgICAgIHVybHM6IFtdLFxuICAgICAgICBzb3VyY2VzOiBbXSxcbiAgICAgICAgc291cmNlc0xvYWRlZDogW10sXG4gICAgICAgIHJlbWVtYmVyZWRTb3VyY2VzRGltZW5zaW9uczogW10sXG4gICAgICAgIHZpZGVvczogW10sXG4gICAgICAgIHZpZGVvc1Bvc3RlcnM6IFtdLFxuXG4gICAgICAgIGhvbGRlcldyYXBwZXI6IHt9LFxuICAgICAgICBtZWRpYUhvbGRlcjoge30sXG4gICAgICAgIG5hdjoge30sXG4gICAgICAgIHRvb2xiYXI6IHt9LFxuICAgICAgICBzbGlkZUNvdW50ZXJFbGVtOiB7fSxcblxuICAgICAgICBpbml0aWF0ZWQ6IGZhbHNlLFxuICAgICAgICBmdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgICAgZmFkaW5nT3V0OiBmYWxzZSxcbiAgICB9O1xuXG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuXG4gICAgLyoqXG4gICAgICogSW5pdCBhIG5ldyBmc0xpZ2h0Ym94IGluc3RhbmNlXG4gICAgICovXG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKGluaXRIcmVmKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGEuaW5pdGlhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRTZXRTbGlkZShpbml0SHJlZik7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZ2FsbGVyeSA9IHRoaXMuZGF0YS5uYW1lO1xuXG4gICAgICAgIGxldCB1cmxzID0gW107XG4gICAgICAgIGNvbnN0IGEgPSBmc0xpZ2h0Ym94SGVscGVycy5hO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghYVtpXS5oYXNBdHRyaWJ1dGUoJ2RhdGEtZnNsaWdodGJveCcpKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBpZiAoYVtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnNsaWdodGJveCcpID09PSBnYWxsZXJ5KSB7XG4gICAgICAgICAgICAgICAgbGV0IHVybHNMZW5ndGggPSB1cmxzLnB1c2goYVtpXS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XG4gICAgICAgICAgICAgICAgaWYgKGFbaV0uaGFzQXR0cmlidXRlKCdkYXRhLXZpZGVvLXBvc3RlcicpKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEudmlkZW9zUG9zdGVyc1t1cmxzTGVuZ3RoIC0gMV0gPSBhW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS12aWRlby1wb3N0ZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0YS51cmxzID0gdXJscztcbiAgICAgICAgdGhpcy5kYXRhLnRvdGFsU2xpZGVzID0gdXJscy5sZW5ndGg7XG4gICAgICAgIGRvbVJlbmRlcmVyLnJlbmRlckRPTSgpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1vcGVuJyk7XG4gICAgICAgIHRoaXMuc2Nyb2xsYmFyUmVjb21wZW5zb3IuYWRkUmVjb21wZW5zZSgpO1xuICAgICAgICB0aGlzLm9uUmVzaXplRXZlbnQuaW5pdCgpO1xuICAgICAgICB0aGlzLnRocm93RXZlbnQoJ2luaXQnKTtcbiAgICAgICAgdGhpcy50aHJvd0V2ZW50KCdvcGVuJyk7XG4gICAgICAgIHJlcXVpcmUoJy4vQ29yZS9TbGlkZVN3aXBpbmcuanMnKSh0aGlzKTtcbiAgICAgICAgdGhpcy5pbml0U2V0U2xpZGUoaW5pdEhyZWYpO1xuICAgICAgICB0aGlzLmRhdGEuaW5pdGlhdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtb3BlbicpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEluaXQgY2FuIGhhdmUgbXVsdGlwbGUgdHlwZSBvZiBzbGlkZXNcbiAgICAgKiBAcGFyYW0gc2xpZGVcbiAgICAgKi9cbiAgICB0aGlzLmluaXRTZXRTbGlkZSA9IGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIHNsaWRlO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNsaWRlKHRoaXMuZGF0YS51cmxzLmluZGV4T2Yoc2xpZGUpICsgMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTbGlkZShzbGlkZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTbGlkZSgxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFNob3cgZG9tIG9mIGZzTGlnaHRib3ggaW5zdGFuY2UgaWYgZXhpc3RzXG4gICAgICovXG4gICAgdGhpcy5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBlbGVtID0gdGhpcy5lbGVtZW50O1xuICAgICAgICB0aGlzLnNjcm9sbGJhclJlY29tcGVuc29yLmFkZFJlY29tcGVuc2UoKTtcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LWZhZGUtb3V0LWNvbXBsZXRlJyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LW9wZW4nKTtcbiAgICAgICAgdm9pZCBlbGVtLm9mZnNldFdpZHRoO1xuICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbi1jb21wbGV0ZScpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW0pO1xuICAgICAgICB0aGlzLm9uUmVzaXplRXZlbnQuYWRkTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy50aHJvd0V2ZW50KCdzaG93Jyk7XG4gICAgICAgIHRoaXMudGhyb3dFdmVudCgnb3BlbicpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEhpZGUgZG9tIG9mIGV4aXN0aW5nIGZzTGlnaHRib3ggaW5zdGFuY2VcbiAgICAgKi9cbiAgICB0aGlzLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGEuZnVsbHNjcmVlbikgdGhpcy50b29sYmFyLmNsb3NlRnVsbHNjcmVlbigpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1mYWRlLW91dC1jb21wbGV0ZScpO1xuICAgICAgICB0aGlzLmRhdGEuZmFkaW5nT3V0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50aHJvd0V2ZW50KCdjbG9zZScpO1xuICAgICAgICB0aGlzLm9uUmVzaXplRXZlbnQucmVtb3ZlTGlzdGVuZXIoKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5zY3JvbGxiYXJSZWNvbXBlbnNvci5yZW1vdmVSZWNvbXBlbnNlKCk7XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1vcGVuJyk7XG4gICAgICAgICAgICBfdGhpcy5kYXRhLmZhZGluZ091dCA9IGZhbHNlO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChfdGhpcy5lbGVtZW50KTtcbiAgICAgICAgfSwgMjUwKTtcbiAgICB9O1xuXG4gICAgdGhpcy51cGRhdGVTbGlkZU51bWJlciA9IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICAgICAgdGhpcy5kYXRhLnNsaWRlID0gbnVtYmVyO1xuICAgICAgICBpZiAodGhpcy5kYXRhLnRvdGFsU2xpZGVzID4gMSlcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zbGlkZUNvdW50ZXJFbGVtLmlubmVySFRNTCA9IG51bWJlcjtcbiAgICB9O1xuXG4gICAgdGhpcy50aHJvd0V2ZW50ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICBsZXQgZXZlbnQ7XG4gICAgICAgIGlmICh0eXBlb2YgKEV2ZW50KSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoZXZlbnROYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICAgICAgICBldmVudC5pbml0RXZlbnQoZXZlbnROYW1lLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfTtcblxuICAgIHRoaXMuZWxlbWVudCA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LWNvbnRhaW5lcicsICdmc2xpZ2h0Ym94LWZ1bGwtZGltZW5zaW9uJ10pO1xuICAgIHRoaXMubWVkaWFIb2xkZXIgPSBuZXcgKHJlcXVpcmUoJy4vQ29tcG9uZW50cy9NZWRpYUhvbGRlcicpKTtcbiAgICBjb25zdCBkb21SZW5kZXJlciA9IG5ldyAocmVxdWlyZSgnLi9Db3JlL0RvbVJlbmRlcmVyJykpKHRoaXMpO1xuICAgIHRoaXMuc3RhZ2VTb3VyY2VJbmRleGVzID0gbmV3IChyZXF1aXJlKCcuL0NvcmUvU3RhZ2VTb3VyY2VzSW5kZXhlcycpKSh0aGlzLmRhdGEpO1xuICAgIG5ldyAocmVxdWlyZSgnLi9Db3JlL1Njcm9sbGJhcldpZHRoR2V0dGVyJykpKHRoaXMuZGF0YSkuZ2V0V2lkdGgoKTtcbiAgICB0aGlzLm9uUmVzaXplRXZlbnQgPSBuZXcgKHJlcXVpcmUoJy4vb25SZXNpemVFdmVudCcpKSh0aGlzKTtcbiAgICB0aGlzLnNjcm9sbGJhclJlY29tcGVuc29yID0gbmV3IChyZXF1aXJlKCcuL0NvcmUvU2Nyb2xsYmFyUmVjb21wZW5zb3InKSkodGhpcy5kYXRhLnNjcm9sbGJhcldpZHRoKTtcbiAgICB0aGlzLnNsaWRlVHJhbnNmb3JtZXIgPSBuZXcgKHJlcXVpcmUoJy4vQ29yZS9TbGlkZVRyYW5zZm9ybWVyJykpKHRoaXMuZGF0YS5zbGlkZURpc3RhbmNlKTtcbiAgICB0aGlzLnRvb2xiYXIgPSBuZXcgKHJlcXVpcmUoJy4vQ29tcG9uZW50cy9Ub29sYmFyJykpKHRoaXMpO1xuICAgIHRoaXMuU1ZHSWNvbiA9IHJlcXVpcmUoJy4vQ29tcG9uZW50cy9TVkdJY29uJyk7XG4gICAgdGhpcy5hcHBlbmRNZXRob2RzID0gbmV3IChyZXF1aXJlKCcuL2FwcGVuZE1ldGhvZHMnKSkodGhpcyk7XG5cbiAgICAvKipcbiAgICAgKiBEaXNwbGF5IHNvdXJjZSAoaW1hZ2VzLCBIVE1MNSB2aWRlbywgWW91VHViZSB2aWRlbykgZGVwZW5kaW5nIG9uIGdpdmVuIHVybCBmcm9tIHVzZXJcbiAgICAgKiBPciBpZiBkaXNwbGF5IGlzIGluaXRpYWwgZGlzcGxheSAzIGluaXRpYWwgc291cmNlc1xuICAgICAqIElmIHRoZXJlIGFyZSA+PSAzIGluaXRpYWwgc291cmNlcyB0aGVyZSB3aWxsIGJlIGFsd2F5cyAzIGluIHN0YWdlXG4gICAgICogQHBhcmFtIHR5cGVPZkxvYWRcbiAgICAgKiBAcGFyYW0gc2xpZGVcbiAgICAgKiBAcmV0dXJucyB7bW9kdWxlLmV4cG9ydHN9XG4gICAgICovXG4gICAgdGhpcy5sb2Fkc291cmNlcyA9IGZ1bmN0aW9uICh0eXBlT2ZMb2FkLCBzbGlkZSkge1xuICAgICAgICBjb25zdCBsb2Fkc291cmNlbW9kdWxlID0gcmVxdWlyZShcIi4vbG9hZFNvdXJjZS5qc1wiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBsb2Fkc291cmNlbW9kdWxlKHRoaXMsIHR5cGVPZkxvYWQsIHNsaWRlKTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBTdG9wIHZpZGVvcyBhZnRlciBjaGFuZ2luZyBzbGlkZVxuICAgICAqL1xuICAgIHRoaXMuc3RvcFZpZGVvcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgdmlkZW9zID0gdGhpcy5kYXRhLnZpZGVvcztcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IHRoaXMuZGF0YS5zb3VyY2VzO1xuXG4gICAgICAgIC8vIHRydWUgaXMgaHRtbDUgdmlkZW8sIGZhbHNlIGlzIHlvdXR1YmUgdmlkZW9cbiAgICAgICAgZm9yIChsZXQgdmlkZW9JbmRleCBpbiB2aWRlb3MpIHtcbiAgICAgICAgICAgIGlmICh2aWRlb3NbdmlkZW9JbmRleF0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNvdXJjZXNbdmlkZW9JbmRleF0uZmlyc3RDaGlsZC5wYXVzZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2VzW3ZpZGVvSW5kZXhdLmZpcnN0Q2hpbGQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNvdXJjZXNbdmlkZW9JbmRleF0uZmlyc3RDaGlsZC5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKCd7XCJldmVudFwiOlwiY29tbWFuZFwiLFwiZnVuY1wiOlwic3RvcFZpZGVvXCIsXCJhcmdzXCI6XCJcIn0nLCAnKicpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB0aGlzLnNldFNsaWRlID0gZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICAgIHRoaXMuZGF0YS5zbGlkZSA9IHNsaWRlO1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlTnVtYmVyKHNsaWRlKTtcbiAgICAgICAgY29uc3Qgc291cmNlc0luZGV4ZXMgPSB0aGlzLnN0YWdlU291cmNlSW5kZXhlcy5hbGwoc2xpZGUpO1xuICAgICAgICBjb25zdCBzb3VyY2VzID0gdGhpcy5kYXRhLnNvdXJjZXM7XG5cbiAgICAgICAgaWYgKHNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRzb3VyY2VzKCdpbml0aWFsJywgc2xpZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXSA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRzb3VyY2VzKCdwcmV2aW91cycsIHNsaWRlKTtcblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0gPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgdGhpcy5sb2Fkc291cmNlcygnY3VycmVudCcsIHNsaWRlKTtcblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0gPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgdGhpcy5sb2Fkc291cmNlcygnbmV4dCcsIHNsaWRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHNvdXJjZUluZGV4IGluIHNvdXJjZXMpIHtcbiAgICAgICAgICAgIHNvdXJjZXNbc291cmNlSW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcblxuICAgICAgICAgICAgLy8gc291cmNlcyBsZW5ndGggbmVlZHMgdG8gYmUgaGlnaGVyIHRoYW4gMSBiZWNhdXNlIGlmIHRoZXJlIGlzIG9ubHkgMSBzbGlkZVxuICAgICAgICAgICAgLy8gc291cmNlc0luZGV4ZXMucHJldmlvdXMgd2lsbCBiZSAwIHNvIGl0IHdvdWxkIHJldHVybiBhIGJhZCB0cmFuc2l0aW9uXG4gICAgICAgICAgICBpZiAoc291cmNlSW5kZXggPT0gc291cmNlc0luZGV4ZXMucHJldmlvdXMgJiYgc291cmNlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZVRyYW5zZm9ybWVyLm1pbnVzKHNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzb3VyY2VJbmRleCA9PSBzb3VyY2VzSW5kZXhlcy5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZVRyYW5zZm9ybWVyLnplcm8oc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc291cmNlSW5kZXggPT0gc291cmNlc0luZGV4ZXMubmV4dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVUcmFuc2Zvcm1lci5wbHVzKHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0pO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNsaWRlVHJhbnNmb3JtZXIubWludXMoc291cmNlc1tzb3VyY2VJbmRleF0pO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cblxuIWZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3cuZnNMaWdodGJveEluc3RhbmNlcyA9IFtdO1xuICAgIHdpbmRvdy5mc0xpZ2h0Ym94SGVscGVycyA9IHtcbiAgICAgICAgXCJhXCI6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJylcbiAgICB9O1xuXG4gICAgbGV0IGEgPSB3aW5kb3cuZnNMaWdodGJveEhlbHBlcnMuYTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIGlmICghYVtpXS5oYXNBdHRyaWJ1dGUoJ2RhdGEtZnNsaWdodGJveCcpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJveE5hbWUgPSBhW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1mc2xpZ2h0Ym94Jyk7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93LmZzTGlnaHRib3hJbnN0YW5jZXNbYm94TmFtZV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5mc0xpZ2h0Ym94ID0gbmV3IHdpbmRvdy5mc0xpZ2h0Ym94Q2xhc3MoKTtcbiAgICAgICAgICAgIHdpbmRvdy5mc0xpZ2h0Ym94LmRhdGEubmFtZSA9IGJveE5hbWU7XG4gICAgICAgICAgICB3aW5kb3cuZnNMaWdodGJveEluc3RhbmNlc1tib3hOYW1lXSA9IHdpbmRvdy5mc0xpZ2h0Ym94O1xuICAgICAgICB9XG5cbiAgICAgICAgYVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgZ2FsbGVyeSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWZzbGlnaHRib3gnKTtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuZnNMaWdodGJveEluc3RhbmNlc1tnYWxsZXJ5XS5kYXRhLmluaXRpYXRlZCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5mc0xpZ2h0Ym94SW5zdGFuY2VzW2dhbGxlcnldLnNldFNsaWRlKFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZnNMaWdodGJveEluc3RhbmNlc1tnYWxsZXJ5XS5kYXRhLnVybHMuaW5kZXhPZih0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpKSArIDFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5mc0xpZ2h0Ym94SW5zdGFuY2VzW2dhbGxlcnldLnNob3coKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aW5kb3cuZnNMaWdodGJveEluc3RhbmNlc1tnYWxsZXJ5XS5pbml0KHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJykpO1xuICAgICAgICB9KTtcbiAgICB9XG59KGRvY3VtZW50LCB3aW5kb3cpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZnNMaWdodGJveCwgdHlwZU9mTG9hZCwgc2xpZGUpIHtcblxuICAgIGNvbnN0IERPTU9iamVjdCA9IHJlcXVpcmUoJy4vQ29tcG9uZW50cy9ET01PYmplY3QnKTtcblxuICAgIGNvbnN0IHNvdXJjZXNJbmRleGVzID0gZnNMaWdodGJveC5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKHNsaWRlKTtcbiAgICBjb25zdCB1cmxzID0gZnNMaWdodGJveC5kYXRhLnVybHM7XG4gICAgY29uc3Qgc291cmNlcyA9IGZzTGlnaHRib3guZGF0YS5zb3VyY2VzO1xuXG5cbiAgICBjb25zdCBhcHBlbmQgPSBmdW5jdGlvbiAoc291cmNlSG9sZGVyLCBzb3VyY2VFbGVtKSB7XG4gICAgICAgIHNvdXJjZUhvbGRlci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgc291cmNlSG9sZGVyLmFwcGVuZENoaWxkKHNvdXJjZUVsZW0pO1xuICAgICAgICB2b2lkIHNvdXJjZUhvbGRlci5maXJzdENoaWxkLm9mZnNldFdpZHRoO1xuICAgIH07XG5cbiAgICBsZXQgb25sb2FkTGlzdGVuZXIgPSBmdW5jdGlvbiAoc291cmNlRWxlbSwgc291cmNlV2lkdGgsIHNvdXJjZUhlaWdodCwgYXJyYXlJbmRleCkge1xuXG4gICAgICAgIGxldCBzb3VyY2VIb2xkZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zb3VyY2UtaG9sZGVyJ10pO1xuXG4gICAgICAgIC8vbm9ybWFsIHNvdXJjZSBkaW1lbnNpb25zIG5lZWRzIHRvIGJlIHN0b3JlZCBpbiBhcnJheVxuICAgICAgICAvL2l0IHdpbGwgYmUgbmVlZGVkIHdoZW4gcmVzaXppbmcgYSBzb3VyY2VcbiAgICAgICAgZnNMaWdodGJveC5kYXRhLnJlbWVtYmVyZWRTb3VyY2VzRGltZW5zaW9uc1thcnJheUluZGV4XSA9IHtcbiAgICAgICAgICAgIFwid2lkdGhcIjogc291cmNlV2lkdGgsXG4gICAgICAgICAgICBcImhlaWdodFwiOiBzb3VyY2VIZWlnaHRcbiAgICAgICAgfTtcbiAgICAgICAgc291cmNlSG9sZGVyLmFwcGVuZENoaWxkKHNvdXJjZUVsZW0pO1xuICAgICAgICBhcHBlbmQoc291cmNlc1thcnJheUluZGV4XSwgc291cmNlRWxlbSk7XG4gICAgICAgIGZzTGlnaHRib3gub25SZXNpemVFdmVudC5zY2FsZVNvdXJjZShhcnJheUluZGV4KTtcbiAgICB9O1xuXG5cbiAgICBjb25zdCBsb2FkWW91dHViZXZpZGVvID0gZnVuY3Rpb24gKHZpZGVvSWQsIGFycmF5SW5kZXgpIHtcbiAgICAgICAgbGV0IGlmcmFtZSA9IG5ldyBET01PYmplY3QoJ2lmcmFtZScpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNpbmdsZS1zb3VyY2UnXSk7XG4gICAgICAgIGlmcmFtZS5zcmMgPSAnLy93d3cueW91dHViZS5jb20vZW1iZWQvJyArIHZpZGVvSWQgKyAnP2VuYWJsZWpzYXBpPTEnO1xuICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvd2Z1bGxzY3JlZW4nLCAnJyk7XG4gICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2ZyYW1lYm9yZGVyJywgJzAnKTtcbiAgICAgICAgZnNMaWdodGJveC5tZWRpYUhvbGRlci5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgICBvbmxvYWRMaXN0ZW5lcihpZnJhbWUsIDE5MjAsIDEwODAsIGFycmF5SW5kZXgpO1xuICAgIH07XG5cblxuICAgIGNvbnN0IGltYWdlTG9hZCA9IGZ1bmN0aW9uIChzcmMsIGFycmF5SW5kZXgpIHtcbiAgICAgICAgbGV0IHNvdXJjZUVsZW0gPSBuZXcgRE9NT2JqZWN0KCdpbWcnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zaW5nbGUtc291cmNlJ10pO1xuICAgICAgICBzb3VyY2VFbGVtLnNyYyA9IHNyYztcbiAgICAgICAgc291cmNlRWxlbS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgb25sb2FkTGlzdGVuZXIoc291cmNlRWxlbSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIGFycmF5SW5kZXgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICBjb25zdCB2aWRlb0xvYWQgPSBmdW5jdGlvbiAoc3JjLCBhcnJheUluZGV4LCB0eXBlKSB7XG4gICAgICAgIGxldCB2aWRlb0xvYWRlZCA9IGZhbHNlO1xuICAgICAgICBsZXQgdmlkZW9FbGVtID0gbmV3IERPTU9iamVjdCgndmlkZW8nKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zaW5nbGUtc291cmNlJ10pO1xuICAgICAgICBsZXQgc291cmNlID0gbmV3IERPTU9iamVjdCgnc291cmNlJykuZWxlbTtcbiAgICAgICAgaWYoZnNMaWdodGJveC5kYXRhLnZpZGVvc1Bvc3RlcnNbYXJyYXlJbmRleF0pIHtcbiAgICAgICAgICAgIHZpZGVvRWxlbS5wb3N0ZXIgPSBmc0xpZ2h0Ym94LmRhdGEudmlkZW9zUG9zdGVyc1thcnJheUluZGV4XTtcbiAgICAgICAgICAgIHZpZGVvRWxlbS5zdHlsZS5vYmplY3RGaXQgPSAnY292ZXInO1xuICAgICAgICB9XG4gICAgICAgIHNvdXJjZS5zcmMgPSBzcmM7XG4gICAgICAgIHNvdXJjZS50eXBlID0gdHlwZTtcbiAgICAgICAgdmlkZW9FbGVtLmFwcGVuZENoaWxkKHNvdXJjZSk7XG4gICAgICAgIGxldCB3aWR0aDtcbiAgICAgICAgbGV0IGhlaWdodDtcbiAgICAgICAgdmlkZW9FbGVtLm9ubG9hZGVkbWV0YWRhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodmlkZW9Mb2FkZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiBicm93c2VyIGRvbid0IHN1cHBvcnQgdmlkZW9XaWR0aCBhbmQgdmlkZW9IZWlnaHQgd2UgbmVlZCB0byBhZGQgZGVmYXVsdCBvbmVzXG4gICAgICAgICAgICBpZiAoIXRoaXMudmlkZW9XaWR0aCB8fCB0aGlzLnZpZGVvV2lkdGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB3aWR0aCA9IDE5MjA7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gMTA4MDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2lkdGggPSB0aGlzLnZpZGVvV2lkdGg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gdGhpcy52aWRlb0hlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZpZGVvTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIG9ubG9hZExpc3RlbmVyKHZpZGVvRWxlbSwgd2lkdGgsIGhlaWdodCwgYXJyYXlJbmRleCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gaWYgYnJvd3NlciBkb24ndCBzdXBwcnQgYm90aCBvbmxvYWRtZXRhZGF0YSBvciAudmlkZW9XaWR0aCB3ZSB3aWxsIGxvYWQgaXQgYWZ0ZXIgMzAwMG1zXG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcblxuICAgICAgICAvLyBPTiBJRSBvbiBsb2FkIGV2ZW50IGRvbnQgd29yayBzbyB3ZSBuZWVkIHRvIHdhaXQgZm9yIGRpbWVuc2lvbnMgd2l0aCBzZXRUaW1lb3V0c1xuICAgICAgICBsZXQgSUVGaXggPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGlmKHZpZGVvTG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChJRUZpeCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF2aWRlb0VsZW0udmlkZW9XaWR0aCB8fCB2aWRlb0VsZW0gLnZpZGVvV2lkdGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZihjb3VudGVyIDwgMzEpIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGggPSAxOTIwO1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSAxMDgwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2lkdGggPSB2aWRlb0VsZW0udmlkZW9XaWR0aDtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSB2aWRlb0VsZW0udmlkZW9IZWlnaHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZpZGVvTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIG9ubG9hZExpc3RlbmVyKHZpZGVvRWxlbSwgd2lkdGgsIGhlaWdodCwgYXJyYXlJbmRleCk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKElFRml4KTtcbiAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICB2aWRlb0VsZW0uc2V0QXR0cmlidXRlKCdjb250cm9scycsICcnKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaW52YWxpZEZpbGUgPSBmdW5jdGlvbiAoYXJyYXlJbmRleCkge1xuICAgICAgICBsZXQgaW52YWxpZEZpbGVXcmFwcGVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtaW52YWxpZC1maWxlLXdyYXBwZXInXSk7XG4gICAgICAgIGludmFsaWRGaWxlV3JhcHBlci5pbm5lckhUTUwgPSAnSW52YWxpZCBmaWxlJztcblxuICAgICAgICBvbmxvYWRMaXN0ZW5lcihpbnZhbGlkRmlsZVdyYXBwZXIsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQsIGFycmF5SW5kZXgpO1xuICAgIH07XG5cblxuICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbSA9IGZ1bmN0aW9uICh1cmxJbmRleCkge1xuICAgICAgICBjb25zdCBwYXJzZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGNvbnN0IHNvdXJjZVVybCA9IGZzTGlnaHRib3guZGF0YS51cmxzW3VybEluZGV4XTtcblxuICAgICAgICBwYXJzZXIuaHJlZiA9IHNvdXJjZVVybDtcblxuICAgICAgICBmdW5jdGlvbiBnZXRJZChzb3VyY2VVcmwpIHtcbiAgICAgICAgICAgIGxldCByZWdFeHAgPSAvXi4qKHlvdXR1LmJlXFwvfHZcXC98dVxcL1xcd1xcL3xlbWJlZFxcL3x3YXRjaFxcP3Y9fFxcJnY9KShbXiNcXCZcXD9dKikuKi87XG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBzb3VyY2VVcmwubWF0Y2gocmVnRXhwKTtcblxuICAgICAgICAgICAgaWYgKG1hdGNoICYmIG1hdGNoWzJdLmxlbmd0aCA9PSAxMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaFsyXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdlcnJvcic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyc2VyLmhvc3RuYW1lID09PSAnd3d3LnlvdXR1YmUuY29tJykge1xuICAgICAgICAgICAgZnNMaWdodGJveC5kYXRhLnZpZGVvc1t1cmxJbmRleF0gPSBmYWxzZTtcbiAgICAgICAgICAgIGxvYWRZb3V0dWJldmlkZW8oZ2V0SWQoc291cmNlVXJsKSwgdXJsSW5kZXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDAgfHwgeGhyLnN0YXR1cyA9PT0gMjA2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIHdoYXQgdHlwZSBvZiBmaWxlIHByb3ZpZGVkIGZyb20gbGlua1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VUeXBlID0geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdjb250ZW50LXR5cGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFUeXBlID0gcmVzcG9uc2VUeXBlLnNsaWNlKDAsIHJlc3BvbnNlVHlwZS5pbmRleE9mKCcvJykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZUxvYWQodXJsc1t1cmxJbmRleF0sIHVybEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YVR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0xvYWQodXJsc1t1cmxJbmRleF0sIHVybEluZGV4LCByZXNwb25zZVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZzTGlnaHRib3guZGF0YS52aWRlb3NbdXJsSW5kZXhdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZEZpbGUodXJsSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZEZpbGUodXJsSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHhoci5vcGVuKCdnZXQnLCBzb3VyY2VVcmwsIHRydWUpO1xuICAgICAgICAgICAgeGhyLnNlbmQobnVsbCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICBpZiAodHlwZU9mTG9hZCA9PT0gJ2luaXRpYWwnKSB7XG4gICAgICAgIC8vYXBwZW5kIGxvYWRlciB3aGVuIGxvYWRpbmcgaW5pdGlhbGx5XG4gICAgICAgIGZzTGlnaHRib3guYXBwZW5kTWV0aG9kcy5yZW5kZXJIb2xkZXJJbml0aWFsKHNsaWRlLCBET01PYmplY3QpO1xuXG4gICAgICAgIGlmICh1cmxzLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc291cmNlc0luZGV4ZXMuY3VycmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXJscy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNvdXJjZXNJbmRleGVzLm5leHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVybHMubGVuZ3RoID49IDMpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbShzb3VyY2VzSW5kZXhlcy5wcmV2aW91cyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhcHBlbmQgbG9hZGVyIHdoZW4gbG9hZGluZyBhIG5leHQgc291cmNlXG4gICAgICAgIGZzTGlnaHRib3guYXBwZW5kTWV0aG9kcy5yZW5kZXJIb2xkZXIoc2xpZGUsIHR5cGVPZkxvYWQpO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZU9mTG9hZCkge1xuICAgICAgICAgICAgY2FzZSAncHJldmlvdXMnOlxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbShzb3VyY2VzSW5kZXhlcy5wcmV2aW91cyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjdXJyZW50JzpcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc291cmNlc0luZGV4ZXMuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICduZXh0JzpcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc291cmNlc0luZGV4ZXMubmV4dCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZzTGlnaHRib3gpIHtcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgY29uc3Qgc291cmNlcyA9IGZzTGlnaHRib3guZGF0YS5zb3VyY2VzO1xuICAgIGNvbnN0IHJlbWVtYmVyZWRTb3VyY2VEaW1lbnNpb24gPSBmc0xpZ2h0Ym94LmRhdGEucmVtZW1iZXJlZFNvdXJjZXNEaW1lbnNpb25zO1xuXG4gICAgdGhpcy5tZWRpYUhvbGRlckRpbWVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IG1lZGlhSG9sZGVyU3R5bGUgPSBmc0xpZ2h0Ym94Lm1lZGlhSG9sZGVyLnN0eWxlO1xuICAgICAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgaWYgKHdpbmRvd1dpZHRoID4gMTAwMCkge1xuICAgICAgICAgICAgbWVkaWFIb2xkZXJTdHlsZS53aWR0aCA9ICh3aW5kb3dXaWR0aCAtICgwLjEgKiB3aW5kb3dXaWR0aCkpICsgJ3B4JztcbiAgICAgICAgICAgIG1lZGlhSG9sZGVyU3R5bGUuaGVpZ2h0ID0gKHdpbmRvd0hlaWdodCAtICgwLjEgKiB3aW5kb3dIZWlnaHQpKSArICdweCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZWRpYUhvbGRlclN0eWxlLndpZHRoID0gd2luZG93V2lkdGggKyAncHgnO1xuICAgICAgICAgICAgbWVkaWFIb2xkZXJTdHlsZS5oZWlnaHQgPSAod2luZG93SGVpZ2h0IC0gKDAuMSAqIHdpbmRvd0hlaWdodCkpICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHRoaXMuc2NhbGVBbmRUcmFuc2Zvcm1Tb3VyY2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBzb3VyY2VzQ291bnQgPSBmc0xpZ2h0Ym94LmRhdGEudXJscy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHN0YWdlU291cmNlc0luZGV4ZXMgPSBmc0xpZ2h0Ym94LnN0YWdlU291cmNlSW5kZXhlcy5hbGwoZnNMaWdodGJveC5kYXRhLnNsaWRlKTtcbiAgICAgICAgaWYgKHNvdXJjZXNDb3VudCA+IDApIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3guc2xpZGVUcmFuc2Zvcm1lci56ZXJvKHNvdXJjZXNbc3RhZ2VTb3VyY2VzSW5kZXhlcy5jdXJyZW50XSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc291cmNlc0NvdW50ID4gMSkge1xuICAgICAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLnBsdXMoc291cmNlc1tzdGFnZVNvdXJjZXNJbmRleGVzLm5leHRdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzb3VyY2VzQ291bnQgPiAyKSB7XG4gICAgICAgICAgICBmc0xpZ2h0Ym94LnNsaWRlVHJhbnNmb3JtZXIubWludXMoc291cmNlc1tzdGFnZVNvdXJjZXNJbmRleGVzLnByZXZpb3VzXSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvdXJjZXNDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnNjYWxlU291cmNlKGkpO1xuICAgICAgICAgICAgaWYgKGkgIT09IHN0YWdlU291cmNlc0luZGV4ZXMuY3VycmVudFxuICAgICAgICAgICAgICAgICYmIGkgIT09IHN0YWdlU291cmNlc0luZGV4ZXMubmV4dFxuICAgICAgICAgICAgICAgICYmIGkgIT09IHN0YWdlU291cmNlc0luZGV4ZXMucHJldmlvdXNcbiAgICAgICAgICAgICAgICAmJiBzb3VyY2VzW2ldKSB7XG4gICAgICAgICAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLnBsdXMoc291cmNlc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB0aGlzLnNjYWxlU291cmNlID0gZnVuY3Rpb24gKHNvdXJjZUluZGV4KSB7XG4gICAgICAgIGlmICghc291cmNlc1tzb3VyY2VJbmRleF0pIHJldHVybjtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHNvdXJjZXNbc291cmNlSW5kZXhdLmZpcnN0Q2hpbGQ7XG4gICAgICAgIGxldCBzb3VyY2VXaWR0aCA9IHJlbWVtYmVyZWRTb3VyY2VEaW1lbnNpb25bc291cmNlSW5kZXhdLndpZHRoO1xuICAgICAgICBsZXQgc291cmNlSGVpZ2h0ID0gcmVtZW1iZXJlZFNvdXJjZURpbWVuc2lvbltzb3VyY2VJbmRleF0uaGVpZ2h0O1xuXG4gICAgICAgIGNvbnN0IGNvZWZmaWNpZW50ID0gc291cmNlV2lkdGggLyBzb3VyY2VIZWlnaHQ7XG4gICAgICAgIGNvbnN0IGRldmljZVdpZHRoID0gcGFyc2VJbnQoZnNMaWdodGJveC5tZWRpYUhvbGRlci5zdHlsZS53aWR0aCk7XG4gICAgICAgIGNvbnN0IGRldmljZUhlaWdodCA9IHBhcnNlSW50KGZzTGlnaHRib3gubWVkaWFIb2xkZXIuc3R5bGUuaGVpZ2h0KTtcbiAgICAgICAgbGV0IG5ld0hlaWdodCA9IGRldmljZVdpZHRoIC8gY29lZmZpY2llbnQ7XG5cbiAgICAgICAgY29uc3Qgc2V0RGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gbmV3SGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IChuZXdIZWlnaHQgKiBjb2VmZmljaWVudCkgKyBcInB4XCI7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gd2lkZXIgdGhhbiBoaWdoZXJcbiAgICAgICAgaWYgKG5ld0hlaWdodCA8IGRldmljZUhlaWdodCkge1xuICAgICAgICAgICAgaWYgKHNvdXJjZVdpZHRoIDwgZGV2aWNlV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBuZXdIZWlnaHQgPSBzb3VyY2VIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXREaW1lbnNpb25zKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL2hpZ2hlciB0aGFuIHdpZGVyXG4gICAgICAgIGlmIChzb3VyY2VIZWlnaHQgPiBkZXZpY2VIZWlnaHQpIHtcbiAgICAgICAgICAgIG5ld0hlaWdodCA9IGRldmljZUhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0hlaWdodCA9IHNvdXJjZUhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldERpbWVuc2lvbnMoKTtcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm1lZGlhSG9sZGVyRGltZW5zaW9ucygpO1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKCk7XG4gICAgfTtcblxuICAgIHRoaXMuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZUxpc3RlbmVyKTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzaXplTGlzdGVuZXIgPSBmdW5jdGlvbigpICB7XG4gICAgICAgIF90aGlzLm1lZGlhSG9sZGVyRGltZW5zaW9ucygpO1xuICAgICAgICBfdGhpcy5zY2FsZUFuZFRyYW5zZm9ybVNvdXJjZXMoKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplTGlzdGVuZXIpO1xuICAgIH07XG59O1xuIl19
