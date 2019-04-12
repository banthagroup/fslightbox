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

        if(fsLightbox.data.totalSlides > 1) {
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
            if (newSourcesIndexes.next !== fsLightbox.data.slide - 1)
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
            if (newSourcesIndexes.previous !== fsLightbox.data.slide - 1)
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
        let invalidFileWrapper = new DOMObject('div')
            .addClassesAndCreate(['fslightbox-invalid-file-wrapper', 'fslightbox-flex-centered']);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9ET01PYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9NZWRpYUhvbGRlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL1NWR0ljb24uanMiLCJzcmMvanMvQ29tcG9uZW50cy9Ub29sYmFyLmpzIiwic3JjL2pzL0NvcmUvRG9tUmVuZGVyZXIuanMiLCJzcmMvanMvQ29yZS9TY3JvbGxiYXJSZWNvbXBlbnNvci5qcyIsInNyYy9qcy9Db3JlL1Njcm9sbGJhcldpZHRoR2V0dGVyLmpzIiwic3JjL2pzL0NvcmUvU2xpZGVTd2lwaW5nLmpzIiwic3JjL2pzL0NvcmUvU2xpZGVUcmFuc2Zvcm1lci5qcyIsInNyYy9qcy9Db3JlL1N0YWdlU291cmNlc0luZGV4ZXMuanMiLCJzcmMvanMvYXBwZW5kTWV0aG9kcy5qcyIsInNyYy9qcy9pbmRleC5qcyIsInNyYy9qcy9sb2FkU291cmNlLmpzIiwic3JjL2pzL29uUmVzaXplRXZlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25SQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgICB0aGlzLmVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG5cbiAgICB0aGlzLmFkZENsYXNzZXNBbmRDcmVhdGUgPSBmdW5jdGlvbiAoY2xhc3Nlcykge1xuICAgICAgICBmb3IgKGxldCBpbmRleCBpbiBjbGFzc2VzKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc2VzW2luZGV4XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbVxuICAgIH1cbn07IiwiY29uc3QgRE9NT2JqZWN0ID0gcmVxdWlyZSgnLi9ET01PYmplY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaG9sZGVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtbWVkaWEtaG9sZGVyJ10pO1xuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDEwMDApIHtcbiAgICAgICAgaG9sZGVyLnN0eWxlLndpZHRoID0gKHdpbmRvdy5pbm5lcldpZHRoIC0gMC4xICogd2luZG93LmlubmVyV2lkdGgpICsgJ3B4JztcbiAgICAgICAgaG9sZGVyLnN0eWxlLmhlaWdodCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSAwLjEgKiB3aW5kb3cuaW5uZXJIZWlnaHQpICsgJ3B4JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBob2xkZXIuc3R5bGUud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCArICdweCc7XG4gICAgICAgIGhvbGRlci5zdHlsZS5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKyAncHgnO1xuICAgIH1cbiAgICByZXR1cm4gaG9sZGVyO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBcInN2Z1wiKTtcbiAgICB0aGlzLnBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgXCJwYXRoXCIpO1xuICAgIHRoaXMucGF0aC5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LXN2Zy1wYXRoJyk7XG4gICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2NsYXNzJywgJ2ZzbGlnaHRib3gtc3ZnLWljb24nKTtcbiAgICB0aGlzLnN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndmlld0JveCcsICcwIDAgMTUgMTUnKTtcblxuICAgIHRoaXMuZ2V0U1ZHSWNvbiA9IGZ1bmN0aW9uICh2aWV3Qm94LCBkaW1lbnNpb24sIGQpIHtcbiAgICAgICAgdGhpcy5wYXRoLnNldEF0dHJpYnV0ZU5TKG51bGwsICdkJywgZCk7XG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICd2aWV3Qm94Jywgdmlld0JveCk7XG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICd3aWR0aCcsIGRpbWVuc2lvbik7XG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICdoZWlnaHQnLCBkaW1lbnNpb24pO1xuICAgICAgICB0aGlzLnN2Zy5hcHBlbmRDaGlsZCh0aGlzLnBhdGgpO1xuICAgICAgICByZXR1cm4gdGhpcy5zdmc7XG4gICAgfVxufTsiLCJjb25zdCBET01PYmplY3QgPSByZXF1aXJlKCcuL0RPTU9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmc0xpZ2h0Ym94KSB7XG4gICAgdGhpcy50b29sYmFyRWxlbSA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXRvb2xiYXInXSk7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5yZW5kZXJEZWZhdWx0QnV0dG9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHNob3VsZFJlbmRlckJ1dHRvbnMgPSBmc0xpZ2h0Ym94LmRhdGEudG9vbGJhckJ1dHRvbnM7XG5cbiAgICAgICAgaWYgKHNob3VsZFJlbmRlckJ1dHRvbnMuZnVsbHNjcmVlbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXRvb2xiYXItYnV0dG9uJywgJ2ZzbGlnaHRib3gtZmxleC1jZW50ZXJlZCddKTtcbiAgICAgICAgICAgIGxldCBzdmcgPSBuZXcgZnNMaWdodGJveC5TVkdJY29uKCkuZ2V0U1ZHSWNvbignMCAwIDE3LjUgMTcuNScgK1xuICAgICAgICAgICAgICAgICcnLCAnMjBweCcsICdNNC41IDExSDN2NGg0di0xLjVINC41VjExek0zIDdoMS41VjQuNUg3VjNIM3Y0em0xMC41IDYuNUgxMVYxNWg0di00aC0xLjV2Mi41ek0xMSAzdjEuNWgyLjVWN0gxNVYzaC00eicpO1xuICAgICAgICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKHN2Zyk7XG4gICAgICAgICAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAoZnNMaWdodGJveC5kYXRhLmZ1bGxzY3JlZW4pID9cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2xvc2VGdWxsc2NyZWVuKCk6XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm9wZW5GdWxsc2NyZWVuKCk7XG5cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnRvb2xiYXJFbGVtLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2hvdWxkUmVuZGVyQnV0dG9ucy5jbG9zZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXRvb2xiYXItYnV0dG9uJywgJ2ZzbGlnaHRib3gtZmxleC1jZW50ZXJlZCddKTtcbiAgICAgICAgICAgIGxldCBzdmcgPSBuZXcgZnNMaWdodGJveC5TVkdJY29uKCkuZ2V0U1ZHSWNvbignMCAwIDIwIDIwJywgJzE2cHgnLCAnTSAxMS40NjkgMTAgbCA3LjA4IC03LjA4IGMgMC40MDYgLTAuNDA2IDAuNDA2IC0xLjA2NCAwIC0xLjQ2OSBjIC0wLjQwNiAtMC40MDYgLTEuMDYzIC0wLjQwNiAtMS40NjkgMCBMIDEwIDguNTMgbCAtNy4wODEgLTcuMDggYyAtMC40MDYgLTAuNDA2IC0xLjA2NCAtMC40MDYgLTEuNDY5IDAgYyAtMC40MDYgMC40MDYgLTAuNDA2IDEuMDYzIDAgMS40NjkgTCA4LjUzMSAxMCBMIDEuNDUgMTcuMDgxIGMgLTAuNDA2IDAuNDA2IC0wLjQwNiAxLjA2NCAwIDEuNDY5IGMgMC4yMDMgMC4yMDMgMC40NjkgMC4zMDQgMC43MzUgMC4zMDQgYyAwLjI2NiAwIDAuNTMxIC0wLjEwMSAwLjczNSAtMC4zMDQgTCAxMCAxMS40NjkgbCA3LjA4IDcuMDgxIGMgMC4yMDMgMC4yMDMgMC40NjkgMC4zMDQgMC43MzUgMC4zMDQgYyAwLjI2NyAwIDAuNTMyIC0wLjEwMSAwLjczNSAtMC4zMDQgYyAwLjQwNiAtMC40MDYgMC40MDYgLTEuMDY0IDAgLTEuNDY5IEwgMTEuNDY5IDEwIFonKTtcbiAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChzdmcpO1xuICAgICAgICAgICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYoIWZzTGlnaHRib3guZGF0YS5mYWRpbmdPdXQpIGZzTGlnaHRib3guaGlkZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMudG9vbGJhckVsZW0uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHRoaXMub3BlbkZ1bGxzY3JlZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZzTGlnaHRib3guZGF0YS5mdWxsc2NyZWVuID0gdHJ1ZTtcbiAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIGlmIChlbGVtLnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBlbGVtLnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbS5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICAgICAgZWxlbS5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW0ud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGVsZW0ud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtLm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGVsZW0ubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuY2xvc2VGdWxsc2NyZWVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmc0xpZ2h0Ym94LmRhdGEuZnVsbHNjcmVlbiA9IGZhbHNlO1xuICAgICAgICBpZiAoZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnJlbmRlclRvb2xiYXIgPSBmdW5jdGlvbiAobmF2KSB7XG4gICAgICAgIHRoaXMucmVuZGVyRGVmYXVsdEJ1dHRvbnMoKTtcbiAgICAgICAgbmF2LmFwcGVuZENoaWxkKHRoaXMudG9vbGJhckVsZW0pO1xuICAgIH07XG59OyIsImNvbnN0IERPTU9iamVjdCA9IHJlcXVpcmUoJy4uL0NvbXBvbmVudHMvRE9NT2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZzTGlnaHRib3gpIHtcbiAgICB0aGlzLnJlbmRlckRPTSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnNMaWdodGJveC5lbGVtZW50LmlkID0gXCJmc2xpZ2h0Ym94LWNvbnRhaW5lclwiO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZzTGlnaHRib3guZWxlbWVudCk7XG5cbiAgICAgICAgLy9yZW5kZXIgc2xpZGUgYnV0dG9ucyBhbmQgbmF2KHRvb2xiYXIpXG4gICAgICAgIHJlbmRlck5hdihmc0xpZ2h0Ym94LmVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChmc0xpZ2h0Ym94LmRhdGEudG90YWxTbGlkZXMgPiAxKSB7XG4gICAgICAgICAgICByZW5kZXJTbGlkZUJ1dHRvbnMoZnNMaWdodGJveC5lbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBmc0xpZ2h0Ym94LmVsZW1lbnQuYXBwZW5kQ2hpbGQoZnNMaWdodGJveC5tZWRpYUhvbGRlcik7XG4gICAgICAgIGZzTGlnaHRib3guZGF0YS5pc2ZpcnN0VGltZUxvYWQgPSB0cnVlO1xuICAgIH07XG5cbiAgICBjb25zdCBzbGlkZUNvdW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBudW1iZXJDb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1udW1iZXItY29udGFpbmVyJywgJ2ZzbGlnaHRib3gtZmxleC1jZW50ZXJlZCddKTtcbiAgICAgICAgZnNMaWdodGJveC5kYXRhLnNsaWRlQ291bnRlckVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3Qgc2xpZGVDb3VudGVyRWxlbSA9IGZzTGlnaHRib3guZGF0YS5zbGlkZUNvdW50ZXJFbGVtO1xuXG4gICAgICAgIHNsaWRlQ291bnRlckVsZW0uaW5uZXJIVE1MID0gZnNMaWdodGJveC5kYXRhLnNsaWRlO1xuICAgICAgICBzbGlkZUNvdW50ZXJFbGVtLmlkID0gJ2N1cnJlbnRfc2xpZGUnO1xuXG4gICAgICAgIGxldCBzcGFjZSA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsYXNoJ10pO1xuICAgICAgICBzcGFjZS5pbm5lckhUTUwgPSAnLyc7XG5cbiAgICAgICAgbGV0IHNsaWRlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzbGlkZXMuaW5uZXJIVE1MID0gZnNMaWdodGJveC5kYXRhLnRvdGFsU2xpZGVzO1xuXG4gICAgICAgIG51bWJlckNvbnRhaW5lci5hcHBlbmRDaGlsZChzbGlkZUNvdW50ZXJFbGVtKTtcbiAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNwYWNlKTtcbiAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNsaWRlcyk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJTbGlkZUNvdW50ZXIgPSBmdW5jdGlvbiAobmF2KSB7XG4gICAgICAgICAgICBpZiAoZnNMaWdodGJveC5kYXRhLnNsaWRlQ291bnRlcilcbiAgICAgICAgICAgICAgICBuYXYuYXBwZW5kQ2hpbGQobnVtYmVyQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIGNvbnN0IHJlbmRlck5hdiA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcbiAgICAgICAgZnNMaWdodGJveC5kYXRhLm5hdiA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LW5hdiddKTtcbiAgICAgICAgZnNMaWdodGJveC50b29sYmFyLnJlbmRlclRvb2xiYXIoZnNMaWdodGJveC5kYXRhLm5hdik7XG5cbiAgICAgICAgaWYoZnNMaWdodGJveC5kYXRhLnRvdGFsU2xpZGVzID4gMSkge1xuICAgICAgICAgICAgY29uc3QgY291bnRlciA9IG5ldyBzbGlkZUNvdW50ZXIoKTtcbiAgICAgICAgICAgIGNvdW50ZXIucmVuZGVyU2xpZGVDb3VudGVyKGZzTGlnaHRib3guZGF0YS5uYXYpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmc0xpZ2h0Ym94LmRhdGEubmF2KTtcblxuICAgIH07XG5cbiAgICBjb25zdCBjcmVhdGVCVE4gPSBmdW5jdGlvbiAoYnV0dG9uQ29udGFpbmVyLCBjb250YWluZXIsIGQpIHtcbiAgICAgICAgbGV0IGJ0biA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLWJ0bicsICdmc2xpZ2h0Ym94LWZsZXgtY2VudGVyZWQnXSk7XG4gICAgICAgIGJ0bi5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIG5ldyBmc0xpZ2h0Ym94LlNWR0ljb24oKS5nZXRTVkdJY29uKCcwIDAgMjAgMjAnLCAnMWVtJywgZClcbiAgICAgICAgKTtcbiAgICAgICAgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25Db250YWluZXIpO1xuICAgIH07XG5cbiAgICBjb25zdCByZW5kZXJTbGlkZUJ1dHRvbnMgPSBmdW5jdGlvbiAoY29udGFpbmVyKSB7XG4gICAgICAgIGlmIChmc0xpZ2h0Ym94LmRhdGEuc2xpZGVCdXR0b25zID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vcmVuZGVyIGxlZnQgYnRuXG4gICAgICAgIGxldCBsZWZ0X2J0bl9jb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4tY29udGFpbmVyJywgJ2ZzbGlnaHRib3gtc2xpZGUtYnRuLWxlZnQtY29udGFpbmVyJ10pO1xuICAgICAgICBjcmVhdGVCVE4obGVmdF9idG5fY29udGFpbmVyLCBjb250YWluZXIsICdNOC4zODgsMTAuMDQ5bDQuNzYtNC44NzNjMC4zMDMtMC4zMSwwLjI5Ny0wLjgwNC0wLjAxMi0xLjEwNWMtMC4zMDktMC4zMDQtMC44MDMtMC4yOTMtMS4xMDUsMC4wMTJMNi43MjYsOS41MTZjLTAuMzAzLDAuMzEtMC4yOTYsMC44MDUsMC4wMTIsMS4xMDVsNS40MzMsNS4zMDdjMC4xNTIsMC4xNDgsMC4zNSwwLjIyMywwLjU0NywwLjIyM2MwLjIwMywwLDAuNDA2LTAuMDgsMC41NTktMC4yMzZjMC4zMDMtMC4zMDksMC4yOTUtMC44MDMtMC4wMTItMS4xMDRMOC4zODgsMTAuMDQ5eicpO1xuXG4gICAgICAgIC8vZ28gdG8gcHJldmlvdXMgc2xpZGUgb25jbGlja1xuICAgICAgICBsZWZ0X2J0bl9jb250YWluZXIub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3guYXBwZW5kTWV0aG9kcy5wcmV2aW91c1NsaWRlVmlhQnV0dG9uKGZzTGlnaHRib3guZGF0YS5zbGlkZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IHJpZ2h0X2J0bl9jb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4tY29udGFpbmVyJywgJ2ZzbGlnaHRib3gtc2xpZGUtYnRuLXJpZ2h0LWNvbnRhaW5lciddKTtcbiAgICAgICAgY3JlYXRlQlROKHJpZ2h0X2J0bl9jb250YWluZXIsIGNvbnRhaW5lciwgJ00xMS42MTEsMTAuMDQ5bC00Ljc2LTQuODczYy0wLjMwMy0wLjMxLTAuMjk3LTAuODA0LDAuMDEyLTEuMTA1YzAuMzA5LTAuMzA0LDAuODAzLTAuMjkzLDEuMTA1LDAuMDEybDUuMzA2LDUuNDMzYzAuMzA0LDAuMzEsMC4yOTYsMC44MDUtMC4wMTIsMS4xMDVMNy44MywxNS45MjhjLTAuMTUyLDAuMTQ4LTAuMzUsMC4yMjMtMC41NDcsMC4yMjNjLTAuMjAzLDAtMC40MDYtMC4wOC0wLjU1OS0wLjIzNmMtMC4zMDMtMC4zMDktMC4yOTUtMC44MDMsMC4wMTItMS4xMDRMMTEuNjExLDEwLjA0OXonKTtcbiAgICAgICAgLy8gZ28gdG8gbmV4dCBzbGlkZSBvbiBjbGlja1xuICAgICAgICByaWdodF9idG5fY29udGFpbmVyLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmc0xpZ2h0Ym94LmFwcGVuZE1ldGhvZHMubmV4dFNsaWRlVmlhQnV0dG9uKGZzTGlnaHRib3guZGF0YS5zbGlkZSk7XG4gICAgICAgIH07XG4gICAgfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2Nyb2xsYmFyV2lkdGgpIHtcbiAgICB0aGlzLmFkZFJlY29tcGVuc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghZG9lc1Njcm9sbGJhckhhdmVXaWR0aCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm1hcmdpblJpZ2h0ID0gc2Nyb2xsYmFyV2lkdGggKyAncHgnO1xuICAgICAgICBjb25zdCBlbGVtZW50c1RvUmVjb21wZW5zZSA9IGdldFJlY29tcGVuc2VFbGVtZW50cygpO1xuICAgICAgICBpZiAoIWVsZW1lbnRzVG9SZWNvbXBlbnNlKSByZXR1cm47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHNUb1JlY29tcGVuc2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGVsZW1lbnRzVG9SZWNvbXBlbnNlW2ldLnN0eWxlLm1hcmdpblJpZ2h0ID0gc2Nyb2xsYmFyV2lkdGggKyAncHgnO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMucmVtb3ZlUmVjb21wZW5zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFkb2VzU2Nyb2xsYmFySGF2ZVdpZHRoKCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5tYXJnaW5SaWdodCA9ICcnO1xuICAgICAgICBjb25zdCBlbGVtZW50c1RvUmVjb21wZW5zZSA9IGdldFJlY29tcGVuc2VFbGVtZW50cygpO1xuICAgICAgICBpZiAoIWVsZW1lbnRzVG9SZWNvbXBlbnNlKSByZXR1cm47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHNUb1JlY29tcGVuc2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGVsZW1lbnRzVG9SZWNvbXBlbnNlW2ldLnN0eWxlLm1hcmdpblJpZ2h0ID0gJyc7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0UmVjb21wZW5zZUVsZW1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVjb21wZW5zZS1mb3Itc2Nyb2xsYmFyJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRvZXNTY3JvbGxiYXJIYXZlV2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAhIXNjcm9sbGJhcldpZHRoO1xuICAgIH07XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHRoaXMuZ2V0V2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBvdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIG91dGVyLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICBvdXRlci5zdHlsZS53aWR0aCA9IFwiMTAwcHhcIjtcbiAgICAgICAgb3V0ZXIuc3R5bGUubXNPdmVyZmxvd1N0eWxlID0gXCJzY3JvbGxiYXJcIjtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlcik7XG4gICAgICAgIGxldCB3aWR0aE5vU2Nyb2xsID0gb3V0ZXIub2Zmc2V0V2lkdGg7XG4gICAgICAgIG91dGVyLnN0eWxlLm92ZXJmbG93ID0gXCJzY3JvbGxcIjtcbiAgICAgICAgbGV0IGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW5uZXIuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgb3V0ZXIuYXBwZW5kQ2hpbGQoaW5uZXIpO1xuICAgICAgICBsZXQgd2lkdGhXaXRoU2Nyb2xsID0gaW5uZXIub2Zmc2V0V2lkdGg7XG4gICAgICAgIG91dGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob3V0ZXIpO1xuICAgICAgICBkYXRhLnNjcm9sbGJhcldpZHRoID0gd2lkdGhOb1Njcm9sbCAtIHdpZHRoV2l0aFNjcm9sbDtcbiAgICB9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWxmKSB7XG4gICAgLy93ZSB3aWxsIGhvdmVyIGFsbCB3aW5kb3dzIHdpdGggZGl2IHdpdGggaGlnaCB6LWluZGV4IHRvIGJlIHN1cmUgbW91c2V1cCBpcyB0cmlnZ2VyZWRcbiAgICBjb25zdCBpbnZpc2libGVIb3ZlciA9IG5ldyAocmVxdWlyZSgnLi4vQ29tcG9uZW50cy9ET01PYmplY3QnKSkoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LWludmlzaWJsZS1ob3ZlciddKTtcblxuICAgIC8vdG8gdGhlc2UgZWxlbWVudHMgYXJlIGFkZGVkIG1vdXNlIGV2ZW50c1xuICAgIGNvbnN0IGVsZW1lbnRzID0ge1xuICAgICAgICBcIm1lZGlhSG9sZGVyXCI6IHNlbGYubWVkaWFIb2xkZXIsXG4gICAgICAgIFwiaW52aXNpYmxlSG92ZXJcIjogaW52aXNpYmxlSG92ZXIsXG4gICAgfTtcbiAgICAvL3NvdXJjZXMgYXJlIHRyYW5zZm9ybWVkXG4gICAgY29uc3Qgc291cmNlcyA9IHNlbGYuZGF0YS5zb3VyY2VzO1xuXG4gICAgLy8gaWYgdGhlcmUgYXJlIG9ubHkgMiBvciAxIHVybHMgc2xpZGVUcmFuc2Zvcm1lciB3aWxsIGJlIGRpZmZlcmVudFxuICAgIGNvbnN0IHVybHNMZW5ndGggPSBzZWxmLmRhdGEudXJscy5sZW5ndGg7XG5cbiAgICBsZXQgaXNfZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICBsZXQgbW91c2VEb3duQ2xpZW50WDtcbiAgICBsZXQgZGlmZmVyZW5jZTtcbiAgICBsZXQgc2xpZGVBYmxlID0gdHJ1ZTtcblxuXG4gICAgY29uc3QgbW91c2VEb3duRXZlbnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAvLyB0YWcgY2FuJ3QgYmUgdmlkZW8gY2F1c2UgaXQgd291bGQgYmUgdW5jbGlja2FibGUgaW4gbWljcm9zb2Z0IGJyb3dzZXJzXG4gICAgICAgIGlmIChlLnRhcmdldC50YWdOYW1lICE9PSAnVklERU8nICYmICFlLnRvdWNoZXMpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBlbGVtIGluIGVsZW1lbnRzKSB7XG4gICAgICAgICAgICBlbGVtZW50c1tlbGVtXS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LWN1cnNvci1ncmFiYmluZycpO1xuICAgICAgICB9XG4gICAgICAgIGlzX2RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgKGUudG91Y2hlcykgP1xuICAgICAgICAgICAgbW91c2VEb3duQ2xpZW50WCA9IGUudG91Y2hlc1swXS5jbGllbnRYIDpcbiAgICAgICAgICAgIG1vdXNlRG93bkNsaWVudFggPSBlLmNsaWVudFg7XG4gICAgICAgIGRpZmZlcmVuY2UgPSAwO1xuICAgIH07XG5cblxuICAgIGNvbnN0IG1vdXNlVXBFdmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHNlbGYuZWxlbWVudC5jb250YWlucyhpbnZpc2libGVIb3ZlcikpIHtcbiAgICAgICAgICAgIHNlbGYuZWxlbWVudC5yZW1vdmVDaGlsZChpbnZpc2libGVIb3Zlcik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgZWxlbSBpbiBlbGVtZW50cykge1xuICAgICAgICAgICAgZWxlbWVudHNbZWxlbV0uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1jdXJzb3ItZ3JhYmJpbmcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlzX2RyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgLy8gaWYgdXNlciBkaWRuJ3Qgc2xpZGUgbm9uZSBhbmltYXRpb24gc2hvdWxkIHdvcmtcbiAgICAgICAgaWYgKGRpZmZlcmVuY2UgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdlIGNhbiBzbGlkZSBvbmx5IGlmIHByZXZpb3VzIGFuaW1hdGlvbiBoYXMgZmluaXNoZWRcbiAgICAgICAgaWYgKCFzbGlkZUFibGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzbGlkZUFibGUgPSBmYWxzZTtcbiAgICAgICAgbGV0IHNvdXJjZXNJbmRleGVzID0gc2VsZi5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKHNlbGYuZGF0YS5zbGlkZSk7XG5cbiAgICAgICAgLy8gYWRkIHRyYW5zaXRpb24gaWYgdXNlciBzbGlkZSB0byBzb3VyY2VcbiAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10uY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xuICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcbiAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XG5cblxuICAgICAgICAvLyBzbGlkZSBwcmV2aW91c1xuICAgICAgICBpZiAoZGlmZmVyZW5jZSA+IDApIHtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIHNsaWRlIG51bWJlclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnRvdGFsU2xpZGVzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEuc2xpZGUgLSAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHVybHNMZW5ndGggPj0gMikge1xuICAgICAgICAgICAgICAgIHNlbGYuc2xpZGVUcmFuc2Zvcm1lci5wbHVzKHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0pO1xuICAgICAgICAgICAgICAgIHNlbGYuc2xpZGVUcmFuc2Zvcm1lci56ZXJvKHNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zbGlkZVRyYW5zZm9ybWVyLnplcm8oc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGdldCBuZXcgaW5kZXhlc1xuICAgICAgICAgICAgc291cmNlc0luZGV4ZXMgPSBzZWxmLnN0YWdlU291cmNlSW5kZXhlcy5hbGwoc2VsZi5kYXRhLnNsaWRlKTtcblxuICAgICAgICAgICAgLy9pZiBzb3VyY2UgaXNuJ3QgYWxyZWFkeSBpbiBtZW1vcnlcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZi5kYXRhLnNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlcygncHJldmlvdXMnLCBzZWxmLmRhdGEuc2xpZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvLyBzbGlkZSBuZXh0XG4gICAgICAgIGVsc2UgaWYgKGRpZmZlcmVuY2UgPCAwKSB7XG5cbiAgICAgICAgICAgIC8vdXBkYXRlIHNsaWRlIG51bWJlclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZSA9PT0gc2VsZi5kYXRhLnRvdGFsU2xpZGVzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi51cGRhdGVTbGlkZU51bWJlcigxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEuc2xpZGUgKyAxKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZiAodXJsc0xlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNsaWRlVHJhbnNmb3JtZXIubWludXMoc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XSk7XG4gICAgICAgICAgICAgICAgc2VsZi5zbGlkZVRyYW5zZm9ybWVyLnplcm8oc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuc2xpZGVUcmFuc2Zvcm1lci56ZXJvKHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBnZXQgbmV3IGluZGV4ZXNcbiAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzID0gc2VsZi5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKHNlbGYuZGF0YS5zbGlkZSk7XG4gICAgICAgICAgICAvL2lmIHNvdXJjZSBpc24ndCBhbHJlYWR5IGluIG1lbW9yeVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxmLmRhdGEuc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgIHNlbGYubG9hZHNvdXJjZXMoJ25leHQnLCBzZWxmLmRhdGEuc2xpZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZGlmZmVyZW5jZSA9IDA7XG4gICAgICAgIHNlbGYuc3RvcFZpZGVvcygpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIHRyYW5zaXRpb24gYmVjYXVzZSB3aXRoIGRyYWdnaW5nIGl0IGxvb2tzIGF3ZnVsXG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcbiAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xuXG4gICAgICAgICAgICAvLyB1c2VyIHNob3VsZG4ndCBiZSBhYmxlIHRvIHNsaWRlIHdoZW4gYW5pbWF0aW9uIGlzIHJ1bm5pbmdcbiAgICAgICAgICAgIHNsaWRlQWJsZSA9IHRydWU7XG4gICAgICAgIH0sIDI1MCk7XG4gICAgfTtcblxuXG4gICAgY29uc3QgbW91c2VNb3ZlRXZlbnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoIWlzX2RyYWdnaW5nIHx8ICFzbGlkZUFibGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjbGllbnRYO1xuICAgICAgICAoZS50b3VjaGVzKSA/XG4gICAgICAgICAgICBjbGllbnRYID0gZS50b3VjaGVzWzBdLmNsaWVudFggOlxuICAgICAgICAgICAgY2xpZW50WCA9IGUuY2xpZW50WDtcblxuICAgICAgICBzZWxmLmVsZW1lbnQuYXBwZW5kQ2hpbGQoaW52aXNpYmxlSG92ZXIpO1xuICAgICAgICBkaWZmZXJlbmNlID0gY2xpZW50WCAtIG1vdXNlRG93bkNsaWVudFg7XG4gICAgICAgIGNvbnN0IHNvdXJjZXNJbmRleGVzID0gc2VsZi5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKHNlbGYuZGF0YS5zbGlkZSk7XG5cbiAgICAgICAgaWYgKHVybHNMZW5ndGggPj0gMykge1xuICAgICAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICtcbiAgICAgICAgICAgICAgICAoLXNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGggKyBkaWZmZXJlbmNlKVxuICAgICAgICAgICAgICAgICsgJ3B4LDApJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1cmxzTGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgZGlmZmVyZW5jZSArICdweCwwKSc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXJsc0xlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJ1xuICAgICAgICAgICAgICAgICsgKHNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGggKyBkaWZmZXJlbmNlKVxuICAgICAgICAgICAgICAgICsgJ3B4LDApJztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBwcmV2ZW50RGVmYXVsdEV2ZW50ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG5cblxuICAgIGZvciAobGV0IGVsZW0gaW4gZWxlbWVudHMpIHtcbiAgICAgICAgZWxlbWVudHNbZWxlbV0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2VEb3duRXZlbnQpO1xuICAgICAgICBlbGVtZW50c1tlbGVtXS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgbW91c2VEb3duRXZlbnQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwRXZlbnQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG1vdXNlVXBFdmVudCk7XG4gICAgaW52aXNpYmxlSG92ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlVXBFdmVudCk7XG4gICAgaW52aXNpYmxlSG92ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBtb3VzZVVwRXZlbnQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlRXZlbnQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBtb3VzZU1vdmVFdmVudCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHNlbGYuZGF0YS5uYXYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgcHJldmVudERlZmF1bHRFdmVudCk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNsaWRlRGlzdGFuY2UpIHtcbiAgICB0aGlzLm1pbnVzID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgZWxlbS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyAoLXNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aCkgKyAncHgsMCknO1xuICAgIH07XG5cbiAgICB0aGlzLnplcm8gPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICBlbGVtLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoMCwwKSc7XG4gICAgfTtcblxuICAgIHRoaXMucGx1cyA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIGVsZW0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgc2xpZGVEaXN0YW5jZSAqIHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4LDApJztcbiAgICB9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdGhpcy5wcmV2aW91cyA9IGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgICBsZXQgcHJldmlvdXNTbGlkZUluZGV4O1xuICAgICAgICBjb25zdCBhcnJheUluZGV4ID0gc2xpZGUgLSAxO1xuXG4gICAgICAgIC8vIHByZXZpb3VzXG4gICAgICAgIGlmIChhcnJheUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICBwcmV2aW91c1NsaWRlSW5kZXggPSBkYXRhLnRvdGFsU2xpZGVzIC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByZXZpb3VzU2xpZGVJbmRleCA9IGFycmF5SW5kZXggLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzU2xpZGVJbmRleDtcbiAgICB9O1xuXG4gICAgdGhpcy5uZXh0ID0gZnVuY3Rpb24gKHNsaWRlKSB7XG5cbiAgICAgICAgbGV0IG5leHRTbGlkZUluZGV4O1xuICAgICAgICBjb25zdCBhcnJheUluZGV4ID0gc2xpZGUgLSAxO1xuXG4gICAgICAgIC8vbmV4dFxuICAgICAgICBpZiAoc2xpZGUgPT09IGRhdGEudG90YWxTbGlkZXMpIHtcbiAgICAgICAgICAgIG5leHRTbGlkZUluZGV4ID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHRTbGlkZUluZGV4ID0gYXJyYXlJbmRleCArIDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFNsaWRlSW5kZXg7XG4gICAgfTtcblxuICAgIHRoaXMuYWxsID0gZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICAgIC8vIHNvdXJjZXMgYXJlIHN0b3JlZCBpbiBhcnJheSBpbmRleGVkIGZyb20gMFxuICAgICAgICBjb25zdCBhcnJheUluZGV4ID0gc2xpZGUgLSAxO1xuICAgICAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IHtcbiAgICAgICAgICAgIHByZXZpb3VzOiAwLFxuICAgICAgICAgICAgY3VycmVudDogMCxcbiAgICAgICAgICAgIG5leHQ6IDBcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBwcmV2aW91c1xuICAgICAgICBpZiAoYXJyYXlJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgc291cmNlc0luZGV4ZXMucHJldmlvdXMgPSBkYXRhLnRvdGFsU2xpZGVzIC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzLnByZXZpb3VzID0gYXJyYXlJbmRleCAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjdXJyZW50XG4gICAgICAgIHNvdXJjZXNJbmRleGVzLmN1cnJlbnQgPSBhcnJheUluZGV4O1xuXG4gICAgICAgIC8vbmV4dFxuICAgICAgICBpZiAoc2xpZGUgPT09IGRhdGEudG90YWxTbGlkZXMpIHtcbiAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzLm5leHQgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc291cmNlc0luZGV4ZXMubmV4dCA9IGFycmF5SW5kZXggKyAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNvdXJjZXNJbmRleGVzO1xuICAgIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZnNMaWdodGJveCkge1xuICAgIGNvbnN0IGxvYWRlciA9ICc8ZGl2IGNsYXNzPVwiZnNsaWdodGJveC1sb2FkZXJcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2Pic7XG4gICAgY29uc3QgdHJhbnNpdGlvbiA9ICdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJztcbiAgICBjb25zdCBmYWRlSW4gPSAnZnNsaWdodGJveC1mYWRlLWluJztcbiAgICBjb25zdCBmYWRlT3V0ID0gJ2ZzbGlnaHRib3gtZmFkZS1vdXQnO1xuXG4gICAgY29uc3QgY3JlYXRlSG9sZGVyID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZUhvbGRlciA9IG5ldyAocmVxdWlyZSgnLi9Db21wb25lbnRzL0RPTU9iamVjdCcpKSgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc291cmNlLWhvbGRlcicsICdmc2xpZ2h0Ym94LWZ1bGwtZGltZW5zaW9uJ10pO1xuICAgICAgICBzb3VyY2VIb2xkZXIuaW5uZXJIVE1MID0gbG9hZGVyO1xuICAgICAgICBmc0xpZ2h0Ym94LmRhdGEuc291cmNlc1tpbmRleF0gPSBzb3VyY2VIb2xkZXI7XG4gICAgICAgIHJldHVybiBzb3VyY2VIb2xkZXI7XG4gICAgfTtcblxuICAgIGNvbnN0IHJ1bkFuaW1hdGlvbk9uU291cmNlID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgZWxlbS5maXJzdENoaWxkLmNsYXNzTGlzdC5hZGQoZmFkZUluKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2xlYXJBbmltYXRpb25PblNvdXJjZSA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IGVsZW0uZmlyc3RDaGlsZDtcbiAgICAgICAgc3JjLmNsYXNzTGlzdC5yZW1vdmUoZmFkZUluKTtcbiAgICAgICAgc3JjLmNsYXNzTGlzdC5yZW1vdmUoZmFkZU91dCk7XG4gICAgICAgIHZvaWQgc3JjLm9mZnNldFdpZHRoO1xuICAgIH07XG5cbiAgICBjb25zdCBydW5GYWRlT3V0QW5pbWF0aW9uT25Tb3VyY2UgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICBlbGVtLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LmFkZChmYWRlT3V0KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBsb2FkZXIgd2hlbiBsb2FkaW5nIGZzTGlnaHRib3ggaW5pdGlhbGx5XG4gICAgICogQHBhcmFtIHNsaWRlXG4gICAgICovXG4gICAgdGhpcy5yZW5kZXJIb2xkZXJJbml0aWFsID0gZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZXNJbmRleGVzID0gZnNMaWdodGJveC5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKHNsaWRlKTtcbiAgICAgICAgY29uc3QgdG90YWxTbGlkZXMgPSBmc0xpZ2h0Ym94LmRhdGEudG90YWxTbGlkZXM7XG5cbiAgICAgICAgaWYgKHRvdGFsU2xpZGVzID49IDMpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXYgPSBjcmVhdGVIb2xkZXIoc291cmNlc0luZGV4ZXMucHJldmlvdXMpO1xuICAgICAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLm1pbnVzKHByZXYpO1xuICAgICAgICAgICAgZnNMaWdodGJveC5tZWRpYUhvbGRlci5hcHBlbmRDaGlsZChwcmV2KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG90YWxTbGlkZXMgPj0gMSkge1xuICAgICAgICAgICAgY29uc3QgY3VyciA9IGNyZWF0ZUhvbGRlcihzb3VyY2VzSW5kZXhlcy5jdXJyZW50KTtcbiAgICAgICAgICAgIGZzTGlnaHRib3gubWVkaWFIb2xkZXIuYXBwZW5kQ2hpbGQoY3Vycik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRvdGFsU2xpZGVzID49IDIpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHQgPSBjcmVhdGVIb2xkZXIoc291cmNlc0luZGV4ZXMubmV4dCk7XG4gICAgICAgICAgICBmc0xpZ2h0Ym94LnNsaWRlVHJhbnNmb3JtZXIucGx1cyhuZXh0KTtcbiAgICAgICAgICAgIGZzTGlnaHRib3gubWVkaWFIb2xkZXIuYXBwZW5kQ2hpbGQobmV4dCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB0aGlzLnJlbmRlckhvbGRlciA9IGZ1bmN0aW9uIChzbGlkZSwgdHlwZSkge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3ByZXZpb3VzJzpcbiAgICAgICAgICAgICAgICByZW5kZXJIb2xkZXJQcmV2aW91cyhzbGlkZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjdXJyZW50JzpcbiAgICAgICAgICAgICAgICByZW5kZXJIb2xkZXJDdXJyZW50KHNsaWRlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ25leHQnOlxuICAgICAgICAgICAgICAgIHJlbmRlckhvbGRlck5leHQoc2xpZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgY29uc3QgcmVuZGVySG9sZGVyUHJldmlvdXMgPSBmdW5jdGlvbiAoc2xpZGUpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTb3VyY2VJbmRleCA9IGZzTGlnaHRib3guc3RhZ2VTb3VyY2VJbmRleGVzLnByZXZpb3VzKHNsaWRlKTtcbiAgICAgICAgY29uc3QgcHJldiA9IGNyZWF0ZUhvbGRlcihwcmV2aW91c1NvdXJjZUluZGV4KTtcbiAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLm1pbnVzKHByZXYpO1xuICAgICAgICBmc0xpZ2h0Ym94Lm1lZGlhSG9sZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIHByZXYpO1xuICAgIH07XG5cblxuICAgIGNvbnN0IHJlbmRlckhvbGRlck5leHQgPSBmdW5jdGlvbiAoc2xpZGUpIHtcbiAgICAgICAgY29uc3QgbmV4dFNvdXJjZUluZGV4ID0gZnNMaWdodGJveC5zdGFnZVNvdXJjZUluZGV4ZXMubmV4dChzbGlkZSk7XG4gICAgICAgIGNvbnN0IG5leHQgPSBjcmVhdGVIb2xkZXIobmV4dFNvdXJjZUluZGV4KTtcbiAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLnBsdXMobmV4dCk7XG4gICAgICAgIGZzTGlnaHRib3gubWVkaWFIb2xkZXIuYXBwZW5kQ2hpbGQobmV4dCk7XG4gICAgfTtcblxuXG4gICAgY29uc3QgcmVuZGVySG9sZGVyQ3VycmVudCA9IGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IGZzTGlnaHRib3guc3RhZ2VTb3VyY2VJbmRleGVzLmFsbChzbGlkZSk7XG4gICAgICAgIGNvbnN0IGN1cnIgPSBjcmVhdGVIb2xkZXIoc291cmNlc0luZGV4ZXMuY3VycmVudCk7XG4gICAgICAgIGZzTGlnaHRib3guc2xpZGVUcmFuc2Zvcm1lci56ZXJvKGN1cnIpO1xuICAgICAgICBmc0xpZ2h0Ym94Lm1lZGlhSG9sZGVyLmluc2VydEJlZm9yZShjdXJyLCBmc0xpZ2h0Ym94LmRhdGEuc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XSk7XG4gICAgfTtcblxuXG4gICAgdGhpcy5wcmV2aW91c1NsaWRlVmlhQnV0dG9uID0gZnVuY3Rpb24gKHByZXZpb3VzU2xpZGUpIHtcbiAgICAgICAgaWYgKHByZXZpb3VzU2xpZGUgPT09IDEpIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3guZGF0YS5zbGlkZSA9IGZzTGlnaHRib3guZGF0YS50b3RhbFNsaWRlcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3guZGF0YS5zbGlkZSAtPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV3U291cmNlc0luZGV4ZXMgPSBzdG9wVmlkZW9zVXBkYXRlU2xpZGVBbmRSZXR1cm5TbGlkZU51bWJlckluZGV4ZXMoKTtcblxuICAgICAgICBpZiAodHlwZW9mIGZzTGlnaHRib3guZGF0YS5zb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLnByZXZpb3VzXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgZnNMaWdodGJveC5sb2Fkc291cmNlcygncHJldmlvdXMnLCBmc0xpZ2h0Ym94LmRhdGEuc2xpZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGZzTGlnaHRib3guZGF0YS5zb3VyY2VzO1xuICAgICAgICBjb25zdCBjdXJyZW50U291cmNlID0gc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5jdXJyZW50XTtcbiAgICAgICAgY29uc3QgbmV4dFNvdXJjZSA9IHNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMubmV4dF07XG5cbiAgICAgICAgbmV4dFNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKHRyYW5zaXRpb24pO1xuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5yZW1vdmUodHJhbnNpdGlvbik7XG4gICAgICAgIHNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMucHJldmlvdXNdLmNsYXNzTGlzdC5yZW1vdmUodHJhbnNpdGlvbik7XG5cblxuICAgICAgICBjbGVhckFuaW1hdGlvbk9uU291cmNlKGN1cnJlbnRTb3VyY2UpO1xuICAgICAgICBydW5BbmltYXRpb25PblNvdXJjZShjdXJyZW50U291cmNlKTtcbiAgICAgICAgcnVuRmFkZU91dEFuaW1hdGlvbk9uU291cmNlKG5leHRTb3VyY2UpO1xuXG4gICAgICAgIGZzTGlnaHRib3guc2xpZGVUcmFuc2Zvcm1lci56ZXJvKGN1cnJlbnRTb3VyY2UpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChuZXdTb3VyY2VzSW5kZXhlcy5uZXh0ICE9PSBmc0xpZ2h0Ym94LmRhdGEuc2xpZGUgLSAxKVxuICAgICAgICAgICAgICAgIGZzTGlnaHRib3guc2xpZGVUcmFuc2Zvcm1lci5wbHVzKG5leHRTb3VyY2UpO1xuICAgICAgICAgICAgbmV4dFNvdXJjZS5maXJzdENoaWxkLmNsYXNzTGlzdC5yZW1vdmUoZmFkZU91dCk7XG4gICAgICAgIH0sIDIyMCk7XG4gICAgfTtcblxuXG4gICAgdGhpcy5uZXh0U2xpZGVWaWFCdXR0b24gPSBmdW5jdGlvbiAocHJldmlvdXNTbGlkZSkge1xuICAgICAgICBpZiAocHJldmlvdXNTbGlkZSA9PT0gZnNMaWdodGJveC5kYXRhLnRvdGFsU2xpZGVzKSB7XG4gICAgICAgICAgICBmc0xpZ2h0Ym94LmRhdGEuc2xpZGUgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnNMaWdodGJveC5kYXRhLnNsaWRlICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXdTb3VyY2VzSW5kZXhlcyA9IHN0b3BWaWRlb3NVcGRhdGVTbGlkZUFuZFJldHVyblNsaWRlTnVtYmVySW5kZXhlcygpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZnNMaWdodGJveC5kYXRhLnNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMubmV4dF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3gubG9hZHNvdXJjZXMoJ25leHQnLCBmc0xpZ2h0Ym94LmRhdGEuc2xpZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGZzTGlnaHRib3guZGF0YS5zb3VyY2VzO1xuICAgICAgICBjb25zdCBjdXJyZW50U291cmNlID0gc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5jdXJyZW50XTtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTb3VyY2UgPSBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLnByZXZpb3VzXTtcblxuICAgICAgICBwcmV2aW91c1NvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKHRyYW5zaXRpb24pO1xuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5yZW1vdmUodHJhbnNpdGlvbik7XG4gICAgICAgIHNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMubmV4dF0uY2xhc3NMaXN0LnJlbW92ZSh0cmFuc2l0aW9uKTtcblxuICAgICAgICBjbGVhckFuaW1hdGlvbk9uU291cmNlKGN1cnJlbnRTb3VyY2UpO1xuICAgICAgICBydW5BbmltYXRpb25PblNvdXJjZShjdXJyZW50U291cmNlKTtcbiAgICAgICAgcnVuRmFkZU91dEFuaW1hdGlvbk9uU291cmNlKHByZXZpb3VzU291cmNlKTtcbiAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLnplcm8oY3VycmVudFNvdXJjZSk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobmV3U291cmNlc0luZGV4ZXMucHJldmlvdXMgIT09IGZzTGlnaHRib3guZGF0YS5zbGlkZSAtIDEpXG4gICAgICAgICAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLm1pbnVzKHByZXZpb3VzU291cmNlKTtcbiAgICAgICAgICAgIHByZXZpb3VzU291cmNlLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LnJlbW92ZShmYWRlT3V0KTtcbiAgICAgICAgfSwgMjIwKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc3RvcFZpZGVvc1VwZGF0ZVNsaWRlQW5kUmV0dXJuU2xpZGVOdW1iZXJJbmRleGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmc0xpZ2h0Ym94LnN0b3BWaWRlb3MoKTtcbiAgICAgICAgZnNMaWdodGJveC51cGRhdGVTbGlkZU51bWJlcihmc0xpZ2h0Ym94LmRhdGEuc2xpZGUpO1xuICAgICAgICByZXR1cm4gZnNMaWdodGJveC5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKGZzTGlnaHRib3guZGF0YS5zbGlkZSk7XG4gICAgfTtcbn07Iiwid2luZG93LmZzTGlnaHRib3hDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBET01PYmplY3QgPSByZXF1aXJlKCcuL0NvbXBvbmVudHMvRE9NT2JqZWN0Jyk7XG5cbiAgICB0aGlzLmRhdGEgPSB7XG4gICAgICAgIHNsaWRlOiAxLFxuICAgICAgICB0b3RhbFNsaWRlczogMSxcbiAgICAgICAgc2xpZGVEaXN0YW5jZTogMS4zLFxuICAgICAgICBzbGlkZUNvdW50ZXI6IHRydWUsXG4gICAgICAgIHNsaWRlQnV0dG9uczogdHJ1ZSxcbiAgICAgICAgaXNGaXJzdFRpbWVMb2FkOiBmYWxzZSxcbiAgICAgICAgbW92ZVNsaWRlc1ZpYURyYWc6IHRydWUsXG4gICAgICAgIHRvb2xiYXJCdXR0b25zOiB7XG4gICAgICAgICAgICBcImNsb3NlXCI6IHRydWUsXG4gICAgICAgICAgICBcImZ1bGxzY3JlZW5cIjogdHJ1ZVxuICAgICAgICB9LFxuXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBzY3JvbGxiYXJXaWR0aDogMCxcblxuICAgICAgICB1cmxzOiBbXSxcbiAgICAgICAgc291cmNlczogW10sXG4gICAgICAgIHNvdXJjZXNMb2FkZWQ6IFtdLFxuICAgICAgICByZW1lbWJlcmVkU291cmNlc0RpbWVuc2lvbnM6IFtdLFxuICAgICAgICB2aWRlb3M6IFtdLFxuICAgICAgICB2aWRlb3NQb3N0ZXJzOiBbXSxcblxuICAgICAgICBob2xkZXJXcmFwcGVyOiB7fSxcbiAgICAgICAgbWVkaWFIb2xkZXI6IHt9LFxuICAgICAgICBuYXY6IHt9LFxuICAgICAgICB0b29sYmFyOiB7fSxcbiAgICAgICAgc2xpZGVDb3VudGVyRWxlbToge30sXG5cbiAgICAgICAgaW5pdGlhdGVkOiBmYWxzZSxcbiAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsXG4gICAgICAgIGZhZGluZ091dDogZmFsc2UsXG4gICAgfTtcblxuICAgIGNvbnN0IF90aGlzID0gdGhpcztcblxuICAgIC8qKlxuICAgICAqIEluaXQgYSBuZXcgZnNMaWdodGJveCBpbnN0YW5jZVxuICAgICAqL1xuICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uIChpbml0SHJlZikge1xuICAgICAgICBpZiAodGhpcy5kYXRhLmluaXRpYXRlZCkge1xuICAgICAgICAgICAgdGhpcy5pbml0U2V0U2xpZGUoaW5pdEhyZWYpO1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGdhbGxlcnkgPSB0aGlzLmRhdGEubmFtZTtcblxuICAgICAgICBsZXQgdXJscyA9IFtdO1xuICAgICAgICBjb25zdCBhID0gZnNMaWdodGJveEhlbHBlcnMuYTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIWFbaV0uaGFzQXR0cmlidXRlKCdkYXRhLWZzbGlnaHRib3gnKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgaWYgKGFbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWZzbGlnaHRib3gnKSA9PT0gZ2FsbGVyeSkge1xuICAgICAgICAgICAgICAgIGxldCB1cmxzTGVuZ3RoID0gdXJscy5wdXNoKGFbaV0uZ2V0QXR0cmlidXRlKCdocmVmJykpO1xuICAgICAgICAgICAgICAgIGlmIChhW2ldLmhhc0F0dHJpYnV0ZSgnZGF0YS12aWRlby1wb3N0ZXInKSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnZpZGVvc1Bvc3RlcnNbdXJsc0xlbmd0aCAtIDFdID0gYVtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmlkZW8tcG9zdGVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRhdGEudXJscyA9IHVybHM7XG4gICAgICAgIHRoaXMuZGF0YS50b3RhbFNsaWRlcyA9IHVybHMubGVuZ3RoO1xuICAgICAgICBkb21SZW5kZXJlci5yZW5kZXJET00oKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtb3BlbicpO1xuICAgICAgICB0aGlzLnNjcm9sbGJhclJlY29tcGVuc29yLmFkZFJlY29tcGVuc2UoKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZUV2ZW50LmluaXQoKTtcbiAgICAgICAgdGhpcy50aHJvd0V2ZW50KCdpbml0Jyk7XG4gICAgICAgIHRoaXMudGhyb3dFdmVudCgnb3BlbicpO1xuICAgICAgICByZXF1aXJlKCcuL0NvcmUvU2xpZGVTd2lwaW5nLmpzJykodGhpcyk7XG4gICAgICAgIHRoaXMuaW5pdFNldFNsaWRlKGluaXRIcmVmKTtcbiAgICAgICAgdGhpcy5kYXRhLmluaXRpYXRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LW9wZW4nKTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBJbml0IGNhbiBoYXZlIG11bHRpcGxlIHR5cGUgb2Ygc2xpZGVzXG4gICAgICogQHBhcmFtIHNsaWRlXG4gICAgICovXG4gICAgdGhpcy5pbml0U2V0U2xpZGUgPSBmdW5jdGlvbiAoc2xpZGUpIHtcbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBzbGlkZTtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTbGlkZSh0aGlzLmRhdGEudXJscy5pbmRleE9mKHNsaWRlKSArIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2xpZGUoc2xpZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2xpZGUoMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBTaG93IGRvbSBvZiBmc0xpZ2h0Ym94IGluc3RhbmNlIGlmIGV4aXN0c1xuICAgICAqL1xuICAgIHRoaXMuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgZWxlbSA9IHRoaXMuZWxlbWVudDtcbiAgICAgICAgdGhpcy5zY3JvbGxiYXJSZWNvbXBlbnNvci5hZGRSZWNvbXBlbnNlKCk7XG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1mYWRlLW91dC1jb21wbGV0ZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1vcGVuJyk7XG4gICAgICAgIHZvaWQgZWxlbS5vZmZzZXRXaWR0aDtcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LWZhZGUtaW4tY29tcGxldGUnKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZUV2ZW50LmFkZExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudGhyb3dFdmVudCgnc2hvdycpO1xuICAgICAgICB0aGlzLnRocm93RXZlbnQoJ29wZW4nKTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBIaWRlIGRvbSBvZiBleGlzdGluZyBmc0xpZ2h0Ym94IGluc3RhbmNlXG4gICAgICovXG4gICAgdGhpcy5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhLmZ1bGxzY3JlZW4pIHRoaXMudG9vbGJhci5jbG9zZUZ1bGxzY3JlZW4oKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1vdXQtY29tcGxldGUnKTtcbiAgICAgICAgdGhpcy5kYXRhLmZhZGluZ091dCA9IHRydWU7XG4gICAgICAgIHRoaXMudGhyb3dFdmVudCgnY2xvc2UnKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZUV2ZW50LnJlbW92ZUxpc3RlbmVyKCk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuc2Nyb2xsYmFyUmVjb21wZW5zb3IucmVtb3ZlUmVjb21wZW5zZSgpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtb3BlbicpO1xuICAgICAgICAgICAgX3RoaXMuZGF0YS5mYWRpbmdPdXQgPSBmYWxzZTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoX3RoaXMuZWxlbWVudCk7XG4gICAgICAgIH0sIDI1MCk7XG4gICAgfTtcblxuICAgIHRoaXMudXBkYXRlU2xpZGVOdW1iZXIgPSBmdW5jdGlvbiAobnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZGF0YS5zbGlkZSA9IG51bWJlcjtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS50b3RhbFNsaWRlcyA+IDEpXG4gICAgICAgICAgICB0aGlzLmRhdGEuc2xpZGVDb3VudGVyRWxlbS5pbm5lckhUTUwgPSBudW1iZXI7XG4gICAgfTtcblxuICAgIHRoaXMudGhyb3dFdmVudCA9IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgbGV0IGV2ZW50O1xuICAgICAgICBpZiAodHlwZW9mIChFdmVudCkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KGV2ZW50TmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgICAgICAgZXZlbnQuaW5pdEV2ZW50KGV2ZW50TmFtZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH07XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1jb250YWluZXInLCAnZnNsaWdodGJveC1mdWxsLWRpbWVuc2lvbiddKTtcbiAgICB0aGlzLm1lZGlhSG9sZGVyID0gbmV3IChyZXF1aXJlKCcuL0NvbXBvbmVudHMvTWVkaWFIb2xkZXInKSk7XG4gICAgY29uc3QgZG9tUmVuZGVyZXIgPSBuZXcgKHJlcXVpcmUoJy4vQ29yZS9Eb21SZW5kZXJlcicpKSh0aGlzKTtcbiAgICB0aGlzLnN0YWdlU291cmNlSW5kZXhlcyA9IG5ldyAocmVxdWlyZSgnLi9Db3JlL1N0YWdlU291cmNlc0luZGV4ZXMnKSkodGhpcy5kYXRhKTtcbiAgICBuZXcgKHJlcXVpcmUoJy4vQ29yZS9TY3JvbGxiYXJXaWR0aEdldHRlcicpKSh0aGlzLmRhdGEpLmdldFdpZHRoKCk7XG4gICAgdGhpcy5vblJlc2l6ZUV2ZW50ID0gbmV3IChyZXF1aXJlKCcuL29uUmVzaXplRXZlbnQnKSkodGhpcyk7XG4gICAgdGhpcy5zY3JvbGxiYXJSZWNvbXBlbnNvciA9IG5ldyAocmVxdWlyZSgnLi9Db3JlL1Njcm9sbGJhclJlY29tcGVuc29yJykpKHRoaXMuZGF0YS5zY3JvbGxiYXJXaWR0aCk7XG4gICAgdGhpcy5zbGlkZVRyYW5zZm9ybWVyID0gbmV3IChyZXF1aXJlKCcuL0NvcmUvU2xpZGVUcmFuc2Zvcm1lcicpKSh0aGlzLmRhdGEuc2xpZGVEaXN0YW5jZSk7XG4gICAgdGhpcy50b29sYmFyID0gbmV3IChyZXF1aXJlKCcuL0NvbXBvbmVudHMvVG9vbGJhcicpKSh0aGlzKTtcbiAgICB0aGlzLlNWR0ljb24gPSByZXF1aXJlKCcuL0NvbXBvbmVudHMvU1ZHSWNvbicpO1xuICAgIHRoaXMuYXBwZW5kTWV0aG9kcyA9IG5ldyAocmVxdWlyZSgnLi9hcHBlbmRNZXRob2RzJykpKHRoaXMpO1xuXG4gICAgLyoqXG4gICAgICogRGlzcGxheSBzb3VyY2UgKGltYWdlcywgSFRNTDUgdmlkZW8sIFlvdVR1YmUgdmlkZW8pIGRlcGVuZGluZyBvbiBnaXZlbiB1cmwgZnJvbSB1c2VyXG4gICAgICogT3IgaWYgZGlzcGxheSBpcyBpbml0aWFsIGRpc3BsYXkgMyBpbml0aWFsIHNvdXJjZXNcbiAgICAgKiBJZiB0aGVyZSBhcmUgPj0gMyBpbml0aWFsIHNvdXJjZXMgdGhlcmUgd2lsbCBiZSBhbHdheXMgMyBpbiBzdGFnZVxuICAgICAqIEBwYXJhbSB0eXBlT2ZMb2FkXG4gICAgICogQHBhcmFtIHNsaWRlXG4gICAgICogQHJldHVybnMge21vZHVsZS5leHBvcnRzfVxuICAgICAqL1xuICAgIHRoaXMubG9hZHNvdXJjZXMgPSBmdW5jdGlvbiAodHlwZU9mTG9hZCwgc2xpZGUpIHtcbiAgICAgICAgY29uc3QgbG9hZHNvdXJjZW1vZHVsZSA9IHJlcXVpcmUoXCIuL2xvYWRTb3VyY2UuanNcIik7XG4gICAgICAgIHJldHVybiBuZXcgbG9hZHNvdXJjZW1vZHVsZSh0aGlzLCB0eXBlT2ZMb2FkLCBzbGlkZSk7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogU3RvcCB2aWRlb3MgYWZ0ZXIgY2hhbmdpbmcgc2xpZGVcbiAgICAgKi9cbiAgICB0aGlzLnN0b3BWaWRlb3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHZpZGVvcyA9IHRoaXMuZGF0YS52aWRlb3M7XG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSB0aGlzLmRhdGEuc291cmNlcztcblxuICAgICAgICAvLyB0cnVlIGlzIGh0bWw1IHZpZGVvLCBmYWxzZSBpcyB5b3V0dWJlIHZpZGVvXG4gICAgICAgIGZvciAobGV0IHZpZGVvSW5kZXggaW4gdmlkZW9zKSB7XG4gICAgICAgICAgICBpZiAodmlkZW9zW3ZpZGVvSW5kZXhdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VzW3ZpZGVvSW5kZXhdLmZpcnN0Q2hpbGQucGF1c2UgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlc1t2aWRlb0luZGV4XS5maXJzdENoaWxkLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzb3VyY2VzW3ZpZGVvSW5kZXhdLmZpcnN0Q2hpbGQuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZSgne1wiZXZlbnRcIjpcImNvbW1hbmRcIixcImZ1bmNcIjpcInN0b3BWaWRlb1wiLFwiYXJnc1wiOlwiXCJ9JywgJyonKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgdGhpcy5zZXRTbGlkZSA9IGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgICB0aGlzLmRhdGEuc2xpZGUgPSBzbGlkZTtcbiAgICAgICAgdGhpcy51cGRhdGVTbGlkZU51bWJlcihzbGlkZSk7XG4gICAgICAgIGNvbnN0IHNvdXJjZXNJbmRleGVzID0gdGhpcy5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKHNsaWRlKTtcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IHRoaXMuZGF0YS5zb3VyY2VzO1xuXG4gICAgICAgIGlmIChzb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5sb2Fkc291cmNlcygnaW5pdGlhbCcsIHNsaWRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10gPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgdGhpcy5sb2Fkc291cmNlcygncHJldmlvdXMnLCBzbGlkZSk7XG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgICAgIHRoaXMubG9hZHNvdXJjZXMoJ2N1cnJlbnQnLCBzbGlkZSk7XG5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgICAgIHRoaXMubG9hZHNvdXJjZXMoJ25leHQnLCBzbGlkZSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBzb3VyY2VJbmRleCBpbiBzb3VyY2VzKSB7XG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZUluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XG5cbiAgICAgICAgICAgIC8vIHNvdXJjZXMgbGVuZ3RoIG5lZWRzIHRvIGJlIGhpZ2hlciB0aGFuIDEgYmVjYXVzZSBpZiB0aGVyZSBpcyBvbmx5IDEgc2xpZGVcbiAgICAgICAgICAgIC8vIHNvdXJjZXNJbmRleGVzLnByZXZpb3VzIHdpbGwgYmUgMCBzbyBpdCB3b3VsZCByZXR1cm4gYSBiYWQgdHJhbnNpdGlvblxuICAgICAgICAgICAgaWYgKHNvdXJjZUluZGV4ID09IHNvdXJjZXNJbmRleGVzLnByZXZpb3VzICYmIHNvdXJjZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVUcmFuc2Zvcm1lci5taW51cyhzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc291cmNlSW5kZXggPT0gc291cmNlc0luZGV4ZXMuY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVUcmFuc2Zvcm1lci56ZXJvKHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0pO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNvdXJjZUluZGV4ID09IHNvdXJjZXNJbmRleGVzLm5leHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlVHJhbnNmb3JtZXIucGx1cyhzb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zbGlkZVRyYW5zZm9ybWVyLm1pbnVzKHNvdXJjZXNbc291cmNlSW5kZXhdKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5cbiFmdW5jdGlvbiAoKSB7XG4gICAgd2luZG93LmZzTGlnaHRib3hJbnN0YW5jZXMgPSBbXTtcbiAgICB3aW5kb3cuZnNMaWdodGJveEhlbHBlcnMgPSB7XG4gICAgICAgIFwiYVwiOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpXG4gICAgfTtcblxuICAgIGxldCBhID0gd2luZG93LmZzTGlnaHRib3hIZWxwZXJzLmE7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBpZiAoIWFbaV0uaGFzQXR0cmlidXRlKCdkYXRhLWZzbGlnaHRib3gnKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBib3hOYW1lID0gYVtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnNsaWdodGJveCcpO1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5mc0xpZ2h0Ym94SW5zdGFuY2VzW2JveE5hbWVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB3aW5kb3cuZnNMaWdodGJveCA9IG5ldyB3aW5kb3cuZnNMaWdodGJveENsYXNzKCk7XG4gICAgICAgICAgICB3aW5kb3cuZnNMaWdodGJveC5kYXRhLm5hbWUgPSBib3hOYW1lO1xuICAgICAgICAgICAgd2luZG93LmZzTGlnaHRib3hJbnN0YW5jZXNbYm94TmFtZV0gPSB3aW5kb3cuZnNMaWdodGJveDtcbiAgICAgICAgfVxuXG4gICAgICAgIGFbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbGV0IGdhbGxlcnkgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1mc2xpZ2h0Ym94Jyk7XG4gICAgICAgICAgICBpZiAod2luZG93LmZzTGlnaHRib3hJbnN0YW5jZXNbZ2FsbGVyeV0uZGF0YS5pbml0aWF0ZWQpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZnNMaWdodGJveEluc3RhbmNlc1tnYWxsZXJ5XS5zZXRTbGlkZShcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmZzTGlnaHRib3hJbnN0YW5jZXNbZ2FsbGVyeV0uZGF0YS51cmxzLmluZGV4T2YodGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSkgKyAxXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZnNMaWdodGJveEluc3RhbmNlc1tnYWxsZXJ5XS5zaG93KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2luZG93LmZzTGlnaHRib3hJbnN0YW5jZXNbZ2FsbGVyeV0uaW5pdCh0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpKTtcbiAgICAgICAgfSk7XG4gICAgfVxufShkb2N1bWVudCwgd2luZG93KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZzTGlnaHRib3gsIHR5cGVPZkxvYWQsIHNsaWRlKSB7XG5cbiAgICBjb25zdCBET01PYmplY3QgPSByZXF1aXJlKCcuL0NvbXBvbmVudHMvRE9NT2JqZWN0Jyk7XG5cbiAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IGZzTGlnaHRib3guc3RhZ2VTb3VyY2VJbmRleGVzLmFsbChzbGlkZSk7XG4gICAgY29uc3QgdXJscyA9IGZzTGlnaHRib3guZGF0YS51cmxzO1xuICAgIGNvbnN0IHNvdXJjZXMgPSBmc0xpZ2h0Ym94LmRhdGEuc291cmNlcztcblxuXG4gICAgY29uc3QgYXBwZW5kID0gZnVuY3Rpb24gKHNvdXJjZUhvbGRlciwgc291cmNlRWxlbSkge1xuICAgICAgICBzb3VyY2VIb2xkZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHNvdXJjZUhvbGRlci5hcHBlbmRDaGlsZChzb3VyY2VFbGVtKTtcbiAgICAgICAgdm9pZCBzb3VyY2VIb2xkZXIuZmlyc3RDaGlsZC5vZmZzZXRXaWR0aDtcbiAgICB9O1xuXG4gICAgbGV0IG9ubG9hZExpc3RlbmVyID0gZnVuY3Rpb24gKHNvdXJjZUVsZW0sIHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQsIGFycmF5SW5kZXgpIHtcblxuICAgICAgICBsZXQgc291cmNlSG9sZGVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc291cmNlLWhvbGRlciddKTtcblxuICAgICAgICAvL25vcm1hbCBzb3VyY2UgZGltZW5zaW9ucyBuZWVkcyB0byBiZSBzdG9yZWQgaW4gYXJyYXlcbiAgICAgICAgLy9pdCB3aWxsIGJlIG5lZWRlZCB3aGVuIHJlc2l6aW5nIGEgc291cmNlXG4gICAgICAgIGZzTGlnaHRib3guZGF0YS5yZW1lbWJlcmVkU291cmNlc0RpbWVuc2lvbnNbYXJyYXlJbmRleF0gPSB7XG4gICAgICAgICAgICBcIndpZHRoXCI6IHNvdXJjZVdpZHRoLFxuICAgICAgICAgICAgXCJoZWlnaHRcIjogc291cmNlSGVpZ2h0XG4gICAgICAgIH07XG4gICAgICAgIHNvdXJjZUhvbGRlci5hcHBlbmRDaGlsZChzb3VyY2VFbGVtKTtcbiAgICAgICAgYXBwZW5kKHNvdXJjZXNbYXJyYXlJbmRleF0sIHNvdXJjZUVsZW0pO1xuICAgICAgICBmc0xpZ2h0Ym94Lm9uUmVzaXplRXZlbnQuc2NhbGVTb3VyY2UoYXJyYXlJbmRleCk7XG4gICAgfTtcblxuXG4gICAgY29uc3QgbG9hZFlvdXR1YmV2aWRlbyA9IGZ1bmN0aW9uICh2aWRlb0lkLCBhcnJheUluZGV4KSB7XG4gICAgICAgIGxldCBpZnJhbWUgPSBuZXcgRE9NT2JqZWN0KCdpZnJhbWUnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zaW5nbGUtc291cmNlJ10pO1xuICAgICAgICBpZnJhbWUuc3JjID0gJy8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLycgKyB2aWRlb0lkICsgJz9lbmFibGVqc2FwaT0xJztcbiAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3dmdWxsc2NyZWVuJywgJycpO1xuICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdmcmFtZWJvcmRlcicsICcwJyk7XG4gICAgICAgIGZzTGlnaHRib3gubWVkaWFIb2xkZXIuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgb25sb2FkTGlzdGVuZXIoaWZyYW1lLCAxOTIwLCAxMDgwLCBhcnJheUluZGV4KTtcbiAgICB9O1xuXG5cbiAgICBjb25zdCBpbWFnZUxvYWQgPSBmdW5jdGlvbiAoc3JjLCBhcnJheUluZGV4KSB7XG4gICAgICAgIGxldCBzb3VyY2VFbGVtID0gbmV3IERPTU9iamVjdCgnaW1nJykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2luZ2xlLXNvdXJjZSddKTtcbiAgICAgICAgc291cmNlRWxlbS5zcmMgPSBzcmM7XG4gICAgICAgIHNvdXJjZUVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9ubG9hZExpc3RlbmVyKHNvdXJjZUVsZW0sIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBhcnJheUluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuXG4gICAgY29uc3QgdmlkZW9Mb2FkID0gZnVuY3Rpb24gKHNyYywgYXJyYXlJbmRleCwgdHlwZSkge1xuICAgICAgICBsZXQgdmlkZW9Mb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IHZpZGVvRWxlbSA9IG5ldyBET01PYmplY3QoJ3ZpZGVvJykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2luZ2xlLXNvdXJjZSddKTtcbiAgICAgICAgbGV0IHNvdXJjZSA9IG5ldyBET01PYmplY3QoJ3NvdXJjZScpLmVsZW07XG4gICAgICAgIGlmKGZzTGlnaHRib3guZGF0YS52aWRlb3NQb3N0ZXJzW2FycmF5SW5kZXhdKSB7XG4gICAgICAgICAgICB2aWRlb0VsZW0ucG9zdGVyID0gZnNMaWdodGJveC5kYXRhLnZpZGVvc1Bvc3RlcnNbYXJyYXlJbmRleF07XG4gICAgICAgICAgICB2aWRlb0VsZW0uc3R5bGUub2JqZWN0Rml0ID0gJ2NvdmVyJztcbiAgICAgICAgfVxuICAgICAgICBzb3VyY2Uuc3JjID0gc3JjO1xuICAgICAgICBzb3VyY2UudHlwZSA9IHR5cGU7XG4gICAgICAgIHZpZGVvRWxlbS5hcHBlbmRDaGlsZChzb3VyY2UpO1xuICAgICAgICBsZXQgd2lkdGg7XG4gICAgICAgIGxldCBoZWlnaHQ7XG4gICAgICAgIHZpZGVvRWxlbS5vbmxvYWRlZG1ldGFkYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHZpZGVvTG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgYnJvd3NlciBkb24ndCBzdXBwb3J0IHZpZGVvV2lkdGggYW5kIHZpZGVvSGVpZ2h0IHdlIG5lZWQgdG8gYWRkIGRlZmF1bHQgb25lc1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZpZGVvV2lkdGggfHwgdGhpcy52aWRlb1dpZHRoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgd2lkdGggPSAxOTIwO1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IDEwODA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdpZHRoID0gdGhpcy52aWRlb1dpZHRoO1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IHRoaXMudmlkZW9IZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2aWRlb0xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICBvbmxvYWRMaXN0ZW5lcih2aWRlb0VsZW0sIHdpZHRoLCBoZWlnaHQsIGFycmF5SW5kZXgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGlmIGJyb3dzZXIgZG9uJ3Qgc3VwcHJ0IGJvdGggb25sb2FkbWV0YWRhdGEgb3IgLnZpZGVvV2lkdGggd2Ugd2lsbCBsb2FkIGl0IGFmdGVyIDMwMDBtc1xuICAgICAgICBsZXQgY291bnRlciA9IDA7XG5cbiAgICAgICAgLy8gT04gSUUgb24gbG9hZCBldmVudCBkb250IHdvcmsgc28gd2UgbmVlZCB0byB3YWl0IGZvciBkaW1lbnNpb25zIHdpdGggc2V0VGltZW91dHNcbiAgICAgICAgbGV0IElFRml4ID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBpZih2aWRlb0xvYWRlZCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoSUVGaXgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdmlkZW9FbGVtLnZpZGVvV2lkdGggfHwgdmlkZW9FbGVtIC52aWRlb1dpZHRoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYoY291bnRlciA8IDMxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoID0gMTkyMDtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gMTA4MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdpZHRoID0gdmlkZW9FbGVtLnZpZGVvV2lkdGg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gdmlkZW9FbGVtLnZpZGVvSGVpZ2h0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2aWRlb0xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICBvbmxvYWRMaXN0ZW5lcih2aWRlb0VsZW0sIHdpZHRoLCBoZWlnaHQsIGFycmF5SW5kZXgpO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChJRUZpeCk7XG4gICAgICAgIH0sIDEwMCk7XG5cbiAgICAgICAgdmlkZW9FbGVtLnNldEF0dHJpYnV0ZSgnY29udHJvbHMnLCAnJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGludmFsaWRGaWxlID0gZnVuY3Rpb24gKGFycmF5SW5kZXgpIHtcbiAgICAgICAgbGV0IGludmFsaWRGaWxlV3JhcHBlciA9IG5ldyBET01PYmplY3QoJ2RpdicpXG4gICAgICAgICAgICAuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtaW52YWxpZC1maWxlLXdyYXBwZXInLCAnZnNsaWdodGJveC1mbGV4LWNlbnRlcmVkJ10pO1xuICAgICAgICBpbnZhbGlkRmlsZVdyYXBwZXIuaW5uZXJIVE1MID0gJ0ludmFsaWQgZmlsZSc7XG5cbiAgICAgICAgb25sb2FkTGlzdGVuZXIoaW52YWxpZEZpbGVXcmFwcGVyLCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0LCBhcnJheUluZGV4KTtcbiAgICB9O1xuXG5cbiAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0gPSBmdW5jdGlvbiAodXJsSW5kZXgpIHtcbiAgICAgICAgY29uc3QgcGFyc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBjb25zdCBzb3VyY2VVcmwgPSBmc0xpZ2h0Ym94LmRhdGEudXJsc1t1cmxJbmRleF07XG5cbiAgICAgICAgcGFyc2VyLmhyZWYgPSBzb3VyY2VVcmw7XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0SWQoc291cmNlVXJsKSB7XG4gICAgICAgICAgICBsZXQgcmVnRXhwID0gL14uKih5b3V0dS5iZVxcL3x2XFwvfHVcXC9cXHdcXC98ZW1iZWRcXC98d2F0Y2hcXD92PXxcXCZ2PSkoW14jXFwmXFw/XSopLiovO1xuICAgICAgICAgICAgbGV0IG1hdGNoID0gc291cmNlVXJsLm1hdGNoKHJlZ0V4cCk7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaCAmJiBtYXRjaFsyXS5sZW5ndGggPT0gMTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hbMl07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnZXJyb3InO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnNlci5ob3N0bmFtZSA9PT0gJ3d3dy55b3V0dWJlLmNvbScpIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3guZGF0YS52aWRlb3NbdXJsSW5kZXhdID0gZmFsc2U7XG4gICAgICAgICAgICBsb2FkWW91dHViZXZpZGVvKGdldElkKHNvdXJjZVVybCksIHVybEluZGV4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwIHx8IHhoci5zdGF0dXMgPT09IDIwNikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGVjayB3aGF0IHR5cGUgb2YgZmlsZSBwcm92aWRlZCBmcm9tIGxpbmtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlVHlwZSA9IHhoci5nZXRSZXNwb25zZUhlYWRlcignY29udGVudC10eXBlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhVHlwZSA9IHJlc3BvbnNlVHlwZS5zbGljZSgwLCByZXNwb25zZVR5cGUuaW5kZXhPZignLycpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFUeXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VMb2FkKHVybHNbdXJsSW5kZXhdLCB1cmxJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGFUeXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9Mb2FkKHVybHNbdXJsSW5kZXhdLCB1cmxJbmRleCwgcmVzcG9uc2VUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmc0xpZ2h0Ym94LmRhdGEudmlkZW9zW3VybEluZGV4XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludmFsaWRGaWxlKHVybEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGludmFsaWRGaWxlKHVybEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB4aHIuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB4aHIub3BlbignZ2V0Jywgc291cmNlVXJsLCB0cnVlKTtcbiAgICAgICAgICAgIHhoci5zZW5kKG51bGwpO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgaWYgKHR5cGVPZkxvYWQgPT09ICdpbml0aWFsJykge1xuICAgICAgICAvL2FwcGVuZCBsb2FkZXIgd2hlbiBsb2FkaW5nIGluaXRpYWxseVxuICAgICAgICBmc0xpZ2h0Ym94LmFwcGVuZE1ldGhvZHMucmVuZGVySG9sZGVySW5pdGlhbChzbGlkZSwgRE9NT2JqZWN0KTtcblxuICAgICAgICBpZiAodXJscy5sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNvdXJjZXNJbmRleGVzLmN1cnJlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVybHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbShzb3VyY2VzSW5kZXhlcy5uZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1cmxzLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc291cmNlc0luZGV4ZXMucHJldmlvdXMpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYXBwZW5kIGxvYWRlciB3aGVuIGxvYWRpbmcgYSBuZXh0IHNvdXJjZVxuICAgICAgICBmc0xpZ2h0Ym94LmFwcGVuZE1ldGhvZHMucmVuZGVySG9sZGVyKHNsaWRlLCB0eXBlT2ZMb2FkKTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGVPZkxvYWQpIHtcbiAgICAgICAgICAgIGNhc2UgJ3ByZXZpb3VzJzpcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc291cmNlc0luZGV4ZXMucHJldmlvdXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY3VycmVudCc6XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNvdXJjZXNJbmRleGVzLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbmV4dCc6XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNvdXJjZXNJbmRleGVzLm5leHQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmc0xpZ2h0Ym94KSB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIGNvbnN0IHNvdXJjZXMgPSBmc0xpZ2h0Ym94LmRhdGEuc291cmNlcztcbiAgICBjb25zdCByZW1lbWJlcmVkU291cmNlRGltZW5zaW9uID0gZnNMaWdodGJveC5kYXRhLnJlbWVtYmVyZWRTb3VyY2VzRGltZW5zaW9ucztcblxuICAgIHRoaXMubWVkaWFIb2xkZXJEaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBtZWRpYUhvbGRlclN0eWxlID0gZnNMaWdodGJveC5tZWRpYUhvbGRlci5zdHlsZTtcbiAgICAgICAgY29uc3Qgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIGlmICh3aW5kb3dXaWR0aCA+IDEwMDApIHtcbiAgICAgICAgICAgIG1lZGlhSG9sZGVyU3R5bGUud2lkdGggPSAod2luZG93V2lkdGggLSAoMC4xICogd2luZG93V2lkdGgpKSArICdweCc7XG4gICAgICAgICAgICBtZWRpYUhvbGRlclN0eWxlLmhlaWdodCA9ICh3aW5kb3dIZWlnaHQgLSAoMC4xICogd2luZG93SGVpZ2h0KSkgKyAncHgnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWVkaWFIb2xkZXJTdHlsZS53aWR0aCA9IHdpbmRvd1dpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIG1lZGlhSG9sZGVyU3R5bGUuaGVpZ2h0ID0gKHdpbmRvd0hlaWdodCAtICgwLjEgKiB3aW5kb3dIZWlnaHQpKSArICdweCc7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB0aGlzLnNjYWxlQW5kVHJhbnNmb3JtU291cmNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3Qgc291cmNlc0NvdW50ID0gZnNMaWdodGJveC5kYXRhLnVybHMubGVuZ3RoO1xuICAgICAgICBjb25zdCBzdGFnZVNvdXJjZXNJbmRleGVzID0gZnNMaWdodGJveC5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKGZzTGlnaHRib3guZGF0YS5zbGlkZSk7XG4gICAgICAgIGlmIChzb3VyY2VzQ291bnQgPiAwKSB7XG4gICAgICAgICAgICBmc0xpZ2h0Ym94LnNsaWRlVHJhbnNmb3JtZXIuemVybyhzb3VyY2VzW3N0YWdlU291cmNlc0luZGV4ZXMuY3VycmVudF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNvdXJjZXNDb3VudCA+IDEpIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3guc2xpZGVUcmFuc2Zvcm1lci5wbHVzKHNvdXJjZXNbc3RhZ2VTb3VyY2VzSW5kZXhlcy5uZXh0XSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc291cmNlc0NvdW50ID4gMikge1xuICAgICAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLm1pbnVzKHNvdXJjZXNbc3RhZ2VTb3VyY2VzSW5kZXhlcy5wcmV2aW91c10pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3VyY2VzQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zY2FsZVNvdXJjZShpKTtcbiAgICAgICAgICAgIGlmIChpICE9PSBzdGFnZVNvdXJjZXNJbmRleGVzLmN1cnJlbnRcbiAgICAgICAgICAgICAgICAmJiBpICE9PSBzdGFnZVNvdXJjZXNJbmRleGVzLm5leHRcbiAgICAgICAgICAgICAgICAmJiBpICE9PSBzdGFnZVNvdXJjZXNJbmRleGVzLnByZXZpb3VzXG4gICAgICAgICAgICAgICAgJiYgc291cmNlc1tpXSkge1xuICAgICAgICAgICAgICAgIGZzTGlnaHRib3guc2xpZGVUcmFuc2Zvcm1lci5wbHVzKHNvdXJjZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgdGhpcy5zY2FsZVNvdXJjZSA9IGZ1bmN0aW9uIChzb3VyY2VJbmRleCkge1xuICAgICAgICBpZiAoIXNvdXJjZXNbc291cmNlSW5kZXhdKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBzb3VyY2VzW3NvdXJjZUluZGV4XS5maXJzdENoaWxkO1xuICAgICAgICBsZXQgc291cmNlV2lkdGggPSByZW1lbWJlcmVkU291cmNlRGltZW5zaW9uW3NvdXJjZUluZGV4XS53aWR0aDtcbiAgICAgICAgbGV0IHNvdXJjZUhlaWdodCA9IHJlbWVtYmVyZWRTb3VyY2VEaW1lbnNpb25bc291cmNlSW5kZXhdLmhlaWdodDtcblxuICAgICAgICBjb25zdCBjb2VmZmljaWVudCA9IHNvdXJjZVdpZHRoIC8gc291cmNlSGVpZ2h0O1xuICAgICAgICBjb25zdCBkZXZpY2VXaWR0aCA9IHBhcnNlSW50KGZzTGlnaHRib3gubWVkaWFIb2xkZXIuc3R5bGUud2lkdGgpO1xuICAgICAgICBjb25zdCBkZXZpY2VIZWlnaHQgPSBwYXJzZUludChmc0xpZ2h0Ym94Lm1lZGlhSG9sZGVyLnN0eWxlLmhlaWdodCk7XG4gICAgICAgIGxldCBuZXdIZWlnaHQgPSBkZXZpY2VXaWR0aCAvIGNvZWZmaWNpZW50O1xuXG4gICAgICAgIGNvbnN0IHNldERpbWVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArIFwicHhcIjtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSAobmV3SGVpZ2h0ICogY29lZmZpY2llbnQpICsgXCJweFwiO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHdpZGVyIHRoYW4gaGlnaGVyXG4gICAgICAgIGlmIChuZXdIZWlnaHQgPCBkZXZpY2VIZWlnaHQpIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2VXaWR0aCA8IGRldmljZVdpZHRoKSB7XG4gICAgICAgICAgICAgICAgbmV3SGVpZ2h0ID0gc291cmNlSGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0RGltZW5zaW9ucygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9oaWdoZXIgdGhhbiB3aWRlclxuICAgICAgICBpZiAoc291cmNlSGVpZ2h0ID4gZGV2aWNlSGVpZ2h0KSB7XG4gICAgICAgICAgICBuZXdIZWlnaHQgPSBkZXZpY2VIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdIZWlnaHQgPSBzb3VyY2VIZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBzZXREaW1lbnNpb25zKCk7XG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5tZWRpYUhvbGRlckRpbWVuc2lvbnMoKTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcigpO1xuICAgIH07XG5cbiAgICB0aGlzLmFkZExpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVMaXN0ZW5lcik7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlc2l6ZUxpc3RlbmVyID0gZnVuY3Rpb24oKSAge1xuICAgICAgICBfdGhpcy5tZWRpYUhvbGRlckRpbWVuc2lvbnMoKTtcbiAgICAgICAgX3RoaXMuc2NhbGVBbmRUcmFuc2Zvcm1Tb3VyY2VzKCk7XG4gICAgfTtcblxuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZUxpc3RlbmVyKTtcbiAgICB9O1xufTtcbiJdfQ==
