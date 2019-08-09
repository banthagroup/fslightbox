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
    this.svg.setAttributeNS(null, 'class', 'fslightbox-svg-icon');
    this.svg.setAttributeNS(null, 'viewBox', '0 0 15 15');
    this.path = document.createElementNS('http://www.w3.org/2000/svg', "path");
    this.path.setAttributeNS(null, 'class', 'fslightbox-svg-path');

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
    const openFullscreenViewBox = '0 0 17.5 17.5';
    const openFullscreenD = 'M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z';
    const closeFullscreenViewBox = '0 0 950 1024';
    const closeFullscreenD = 'M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z';
    let fullscreenSvg;
    const _this = this;

    this.renderDefaultButtons = function () {
        let shouldRenderButtons = fsLightbox.data.toolbarButtons;

        if (shouldRenderButtons.fullscreen === true) {
            let button = new DOMObject('div').addClassesAndCreate(['fslightbox-toolbar-button', 'fslightbox-flex-centered']);
            fullscreenSvg = new fsLightbox.SVGIcon().getSVGIcon('0 0 17.5 17.5' +
                '', '20px', openFullscreenD);
            button.appendChild(fullscreenSvg);
            button.onclick = function () {
                (fsLightbox.data.fullscreen) ?
                    _this.closeFullscreen() :
                    _this.openFullscreen();

            };
            this.toolbarElem.appendChild(button);
        }

        if (shouldRenderButtons.close === true) {
            let button = new DOMObject('div').addClassesAndCreate(['fslightbox-toolbar-button', 'fslightbox-flex-centered']);
            let svg = new fsLightbox.SVGIcon().getSVGIcon('0 0 20 20', '16px', 'M 11.469 10 l 7.08 -7.08 c 0.406 -0.406 0.406 -1.064 0 -1.469 c -0.406 -0.406 -1.063 -0.406 -1.469 0 L 10 8.53 l -7.081 -7.08 c -0.406 -0.406 -1.064 -0.406 -1.469 0 c -0.406 0.406 -0.406 1.063 0 1.469 L 8.531 10 L 1.45 17.081 c -0.406 0.406 -0.406 1.064 0 1.469 c 0.203 0.203 0.469 0.304 0.735 0.304 c 0.266 0 0.531 -0.101 0.735 -0.304 L 10 11.469 l 7.08 7.081 c 0.203 0.203 0.469 0.304 0.735 0.304 c 0.267 0 0.532 -0.101 0.735 -0.304 c 0.406 -0.406 0.406 -1.064 0 -1.469 L 11.469 10 Z');
            button.appendChild(svg);
            button.onclick = function () {
                if (!fsLightbox.data.fadingOut) fsLightbox.hide();
            };
            this.toolbarElem.appendChild(button);
        }
    };


    this.openFullscreen = function () {
        fsLightbox.data.fullscreen = true;
        fullscreenSvg.firstChild.setAttributeNS(null, 'd', closeFullscreenD);
        fullscreenSvg.setAttributeNS(null, 'viewBox', closeFullscreenViewBox);
        fullscreenSvg.setAttributeNS(null, 'width', '24px');
        fullscreenSvg.setAttributeNS(null, 'height', '24px');
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
        fullscreenSvg.firstChild.setAttributeNS(null, 'd', openFullscreenD);
        fullscreenSvg.setAttributeNS(null, 'viewBox', openFullscreenViewBox);
        fullscreenSvg.setAttributeNS(null, 'width', '20px');
        fullscreenSvg.setAttributeNS(null, 'height', '20px');
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
        fsLightbox.element.appendChild(getDownEventDetector());
        fsLightbox.data.isfirstTimeLoad = true;
    };

    const getDownEventDetector = function () {
        return fsLightbox.data.downEventDetector = new DOMObject('div')
            .addClassesAndCreate(['fslightbox-down-event-detector', 'fslightbox-full-dimension']);
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

        if (fsLightbox.data.totalSlides > 1) {
            const counter = new slideCounter();
            counter.renderSlideCounter(fsLightbox.data.nav);
        }
        container.appendChild(fsLightbox.data.nav);

    };

    const createBTN = function (buttonContainer, container, d) {
        let btn = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn', 'fslightbox-flex-centered']);
        btn.appendChild(
            new fsLightbox.SVGIcon().getSVGIcon('0 0 20 20', '22px', d)
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
        createBTN(left_btn_container, container, 'M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788S18.707,9.212,18.271,9.212z');

        //go to previous slide onclick
        left_btn_container.onclick = function () {
            fsLightbox.appendMethods.previousSlideViaButton(fsLightbox.data.slide);
        };

        let right_btn_container = new DOMObject('div').addClassesAndCreate(['fslightbox-slide-btn-container', 'fslightbox-slide-btn-right-container']);
        createBTN(right_btn_container, container, 'M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z');
        // go to next slide on click
        right_btn_container.onclick = function () {
            fsLightbox.appendMethods.nextSlideViaButton(fsLightbox.data.slide);
        };
    };
};

},{"../Components/DOMObject":1}],6:[function(require,module,exports){
module.exports = function (self) {
    const ESCAPE = 'Escape';
    const LEFT_ARROW = 'ArrowLeft';
    const RIGHT_ARROW = 'ArrowRight';

    this.handleKeyDown = function (event) {
        switch (event.code) {
            case ESCAPE:
                self.hide();
                break;
            case LEFT_ARROW:
                if (self.data.totalSlides > 1)
                    self.appendMethods.previousSlideViaButton(self.data.slide);
                break;
            case RIGHT_ARROW:
                if (self.data.totalSlides > 1)
                    self.appendMethods.nextSlideViaButton(self.data.slide);
                break;
        }
    }
};

},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
module.exports = function (self) {
    //we will hover all windows with div with high z-index to be sure mouseup is triggered
    const invisibleHover = new (require('../Components/DOMObject'))('div').addClassesAndCreate(['fslightbox-invisible-hover']);
    const CURSOR_GRABBING_CLASS_NAME = 'fslightbox-cursor-grabbing';
    const TRANSFORM_TRANSITION_CLASS_NAME = 'fslightbox-transform-transition';

    //to these elements are added mouse events
    const elements = {
        mediaHolder: self.mediaHolder,
        invisibleHover: invisibleHover,
        downEventDetector: self.data.downEventDetector
    };
    //sources are transformed
    const sources = self.data.sources;

    // if there are only 2 or 1 urls slideTransformer will be different
    const urlsLength = self.data.urls.length;

    let is_dragging = false;
    let mouseDownClientX;
    let isSourceDownEventTarget;
    let difference;
    let slideAble = true;


    const mouseDownEvent = function (e) {
        // tag can't be video cause it would be unclickable in microsoft browsers
        if (e.target.tagName !== 'VIDEO' && !e.touches) {
            e.preventDefault();
        }
        if (e.target.classList.contains('fslightbox-source')) {
            isSourceDownEventTarget = true;
        }
        is_dragging = true;
        difference = 0;

        if (self.data.totalSlides === 1) {
            return;
        }

        (e.touches) ?
            mouseDownClientX = e.touches[0].clientX :
            mouseDownClientX = e.clientX;
    };


    const mouseUpEvent = function () {
        if (!is_dragging) {
            return;
        }
        is_dragging = false;

        if (self.element.contains(invisibleHover)) {
            self.element.removeChild(invisibleHover);
        }

        if (self.element.classList.contains(CURSOR_GRABBING_CLASS_NAME)) {
            self.element.classList.remove(CURSOR_GRABBING_CLASS_NAME);
        }

        if (difference === 0) {
            if (!isSourceDownEventTarget) {
                self.hide();
            }
            isSourceDownEventTarget = false;
            return;
        }
        isSourceDownEventTarget = false;

        if (!slideAble) {
            return;
        }
        slideAble = false;

        let sourcesIndexes = self.stageSourceIndexes.all(self.data.slide);

        // add transition if user slide to source
        sources[sourcesIndexes.previous].classList.add(TRANSFORM_TRANSITION_CLASS_NAME);
        sources[sourcesIndexes.current].classList.add(TRANSFORM_TRANSITION_CLASS_NAME);
        sources[sourcesIndexes.next].classList.add(TRANSFORM_TRANSITION_CLASS_NAME);


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
            sources[sourcesIndexes.previous].classList.remove(TRANSFORM_TRANSITION_CLASS_NAME);
            sources[sourcesIndexes.current].classList.remove(TRANSFORM_TRANSITION_CLASS_NAME);
            sources[sourcesIndexes.next].classList.remove(TRANSFORM_TRANSITION_CLASS_NAME);

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

        difference = clientX - mouseDownClientX;
        // if user swiped but there is only one slide we dont want further code to execute but we want to prevent lightbox
        // from closing so we set difference to 1
        if (difference !== 0 && self.data.totalSlides === 1) {
            difference = 1;
            return;
        }

        if (!self.element.classList.contains(CURSOR_GRABBING_CLASS_NAME))
            self.element.classList.add(CURSOR_GRABBING_CLASS_NAME);

        if (!self.element.contains(invisibleHover)) {
            self.element.appendChild(invisibleHover);
        }
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

    this.addWindowEvents = function () {
        window.addEventListener('mouseup', mouseUpEvent);
        window.addEventListener('touchend', mouseUpEvent);
        window.addEventListener('mousemove', mouseMoveEvent);
        window.addEventListener('touchmove', mouseMoveEvent, { passive: true });
    };

    this.removeWindowEvents = function () {
        window.removeEventListener('mouseup', mouseUpEvent);
        window.removeEventListener('touchend', mouseUpEvent);
        window.removeEventListener('mousemove', mouseMoveEvent);
        window.removeEventListener('touchmove', mouseMoveEvent);
    };

    invisibleHover.addEventListener('mouseup', mouseUpEvent);
    invisibleHover.addEventListener('touchend', mouseUpEvent, { passive: true });
    self.data.nav.addEventListener('mousedown', preventDefaultEvent);
};

},{"../Components/DOMObject":1}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
module.exports = function (self) {
    const keyboardController = self.keyboardController;

    this.attachListener = function () {
        document.addEventListener('keydown', keyboardController.handleKeyDown);
    };

    this.removeListener = function () {
        document.removeEventListener('keydown', keyboardController.handleKeyDown);
    };
};
},{}],13:[function(require,module,exports){
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
},{"./Components/DOMObject":1}],14:[function(require,module,exports){
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

        holderWrapper: null,
        mediaHolder: null,
        nav: null,
        toolbar: null,
        slideCounterElem: null,
        downEventDetector: null,

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
        this.eventsControllers.document.keyDown.attachListener();
        this.throwEvent('init');
        this.throwEvent('open');
        this.slideSwiping = new (require('./Core/SlideSwiping.js'))(this);
        this.slideSwiping.addWindowEvents();
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
        this.onResizeEvent.resizeListener();
        this.eventsControllers.document.keyDown.attachListener();
        this.slideSwiping.addWindowEvents();
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
        this.slideSwiping.removeWindowEvents();
        this.eventsControllers.document.keyDown.removeListener();
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
    this.keyboardController = new (require('./Core/KeyboardController'))(this);
    new (require('./Core/ScrollbarWidthGetter'))(this.data).getWidth();
    this.onResizeEvent = new (require('./onResizeEvent'))(this);
    this.scrollbarRecompensor = new (require('./Core/ScrollbarRecompensor'))(this.data.scrollbarWidth);
    this.slideTransformer = new (require('./Core/SlideTransformer'))(this.data.slideDistance);
    this.slideSwiping = null;
    this.toolbar = new (require('./Components/Toolbar'))(this);
    this.SVGIcon = require('./Components/SVGIcon');
    this.appendMethods = new (require('./appendMethods'))(this);
    this.eventsControllers = {
        document: {
            keyDown: new (require('./Core/events-controllers/DocumentKeyDownEventController'))(this)
        }
    };

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

},{"./Components/DOMObject":1,"./Components/MediaHolder":2,"./Components/SVGIcon":3,"./Components/Toolbar":4,"./Core/DomRenderer":5,"./Core/KeyboardController":6,"./Core/ScrollbarRecompensor":7,"./Core/ScrollbarWidthGetter":8,"./Core/SlideSwiping.js":9,"./Core/SlideTransformer":10,"./Core/StageSourcesIndexes":11,"./Core/events-controllers/DocumentKeyDownEventController":12,"./appendMethods":13,"./loadSource.js":15,"./onResizeEvent":16}],15:[function(require,module,exports){
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
        let iframe = new DOMObject('iframe').addClassesAndCreate(['fslightbox-source']);
        iframe.src = '//www.youtube.com/embed/' + videoId + '?enablejsapi=1';
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('frameborder', '0');
        fsLightbox.mediaHolder.appendChild(iframe);
        onloadListener(iframe, 1920, 1080, arrayIndex);
    };

    const loadVimeovideo = function (videoId, arrayIndex) {
        let iframe = new DOMObject('iframe').addClassesAndCreate(['fslightbox-source']);
        iframe.src = '//player.vimeo.com/video/' + videoId;
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('frameborder', '0');
        fsLightbox.mediaHolder.appendChild(iframe);
        onloadListener(iframe, 1920, 1080, arrayIndex);
    };


    const imageLoad = function (src, arrayIndex) {
        let sourceElem = new DOMObject('img').addClassesAndCreate(['fslightbox-source']);
        sourceElem.src = src;
        sourceElem.addEventListener('load', function () {
            onloadListener(sourceElem, this.width, this.height, arrayIndex);
        });
    };


    const videoLoad = function (src, arrayIndex, type) {
        let videoLoaded = false;
        let videoElem = new DOMObject('video').addClassesAndCreate(['fslightbox-source']);
        let source = new DOMObject('source').elem;
        if (fsLightbox.data.videosPosters[arrayIndex]) {
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

            if (videoLoaded) {
                clearInterval(IEFix);
                return;
            }
            if (!videoElem.videoWidth || videoElem.videoWidth === 0) {
                if (counter < 31) {
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

        function getYoutubeId(sourceUrl) {
            let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            let match = sourceUrl.match(regExp);

            if (match && match[2].length == 11) {
                return match[2];
            } else {
                return 'error';
            }
        }

        function getVimeoId(sourceUrl) {
            let regExp = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i;
            let match = sourceUrl.match(regExp);

            if (match) {
                return match[1];
            } else {
                return 'error';
            }
        }

        if (parser.hostname === 'www.youtube.com') {
            fsLightbox.data.videos[urlIndex] = false;
            loadYoutubevideo(getYoutubeId(sourceUrl), urlIndex);
        } else if (parser.hostname === 'vimeo.com') {
            fsLightbox.data.videos[urlIndex] = false;
            loadVimeovideo(getVimeoId(sourceUrl), urlIndex);
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
                        } else if (dataType === 'video') {
                            videoLoad(urls[urlIndex], urlIndex, responseType);
                            fsLightbox.data.videos[urlIndex] = true;
                        } else {
                            invalidFile(urlIndex);
                        }
                    } else {
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

},{"./Components/DOMObject":1}],16:[function(require,module,exports){
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
        window.addEventListener('resize', this.resizeListener);
    };

     this.resizeListener = function()  {
        _this.mediaHolderDimensions();
        _this.scaleAndTransformSources();
    };

    this.removeListener = function() {
        window.removeEventListener('resize', this.resizeListener);
    };
};

},{}]},{},[14])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9ET01PYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9NZWRpYUhvbGRlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL1NWR0ljb24uanMiLCJzcmMvanMvQ29tcG9uZW50cy9Ub29sYmFyLmpzIiwic3JjL2pzL0NvcmUvRG9tUmVuZGVyZXIuanMiLCJzcmMvanMvQ29yZS9LZXlib2FyZENvbnRyb2xsZXIuanMiLCJzcmMvanMvQ29yZS9TY3JvbGxiYXJSZWNvbXBlbnNvci5qcyIsInNyYy9qcy9Db3JlL1Njcm9sbGJhcldpZHRoR2V0dGVyLmpzIiwic3JjL2pzL0NvcmUvU2xpZGVTd2lwaW5nLmpzIiwic3JjL2pzL0NvcmUvU2xpZGVUcmFuc2Zvcm1lci5qcyIsInNyYy9qcy9Db3JlL1N0YWdlU291cmNlc0luZGV4ZXMuanMiLCJzcmMvanMvQ29yZS9ldmVudHMtY29udHJvbGxlcnMvRG9jdW1lbnRLZXlEb3duRXZlbnRDb250cm9sbGVyLmpzIiwic3JjL2pzL2FwcGVuZE1ldGhvZHMuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvbG9hZFNvdXJjZS5qcyIsInNyYy9qcy9vblJlc2l6ZUV2ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDak9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YWcpIHtcclxuICAgIHRoaXMuZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgICB0aGlzLmFkZENsYXNzZXNBbmRDcmVhdGUgPSBmdW5jdGlvbiAoY2xhc3Nlcykge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4IGluIGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3Nlc1tpbmRleF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5lbGVtXHJcbiAgICB9XHJcbn07IiwiY29uc3QgRE9NT2JqZWN0ID0gcmVxdWlyZSgnLi9ET01PYmplY3QnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgaG9sZGVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtbWVkaWEtaG9sZGVyJ10pO1xyXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gMTAwMCkge1xyXG4gICAgICAgIGhvbGRlci5zdHlsZS53aWR0aCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAtIDAuMSAqIHdpbmRvdy5pbm5lcldpZHRoKSArICdweCc7XHJcbiAgICAgICAgaG9sZGVyLnN0eWxlLmhlaWdodCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSAwLjEgKiB3aW5kb3cuaW5uZXJIZWlnaHQpICsgJ3B4JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaG9sZGVyLnN0eWxlLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggKyAncHgnO1xyXG4gICAgICAgIGhvbGRlci5zdHlsZS5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKyAncHgnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhvbGRlcjtcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIFwic3ZnXCIpO1xyXG4gICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2NsYXNzJywgJ2ZzbGlnaHRib3gtc3ZnLWljb24nKTtcclxuICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICd2aWV3Qm94JywgJzAgMCAxNSAxNScpO1xyXG4gICAgdGhpcy5wYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIFwicGF0aFwiKTtcclxuICAgIHRoaXMucGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnY2xhc3MnLCAnZnNsaWdodGJveC1zdmctcGF0aCcpO1xyXG5cclxuICAgIHRoaXMuZ2V0U1ZHSWNvbiA9IGZ1bmN0aW9uICh2aWV3Qm94LCBkaW1lbnNpb24sIGQpIHtcclxuICAgICAgICB0aGlzLnBhdGguc2V0QXR0cmlidXRlTlMobnVsbCwgJ2QnLCBkKTtcclxuICAgICAgICB0aGlzLnN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndmlld0JveCcsIHZpZXdCb3gpO1xyXG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICd3aWR0aCcsIGRpbWVuc2lvbik7XHJcbiAgICAgICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2hlaWdodCcsIGRpbWVuc2lvbik7XHJcbiAgICAgICAgdGhpcy5zdmcuYXBwZW5kQ2hpbGQodGhpcy5wYXRoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdmc7XHJcbiAgICB9XHJcbn07XHJcbiIsImNvbnN0IERPTU9iamVjdCA9IHJlcXVpcmUoJy4vRE9NT2JqZWN0Jyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmc0xpZ2h0Ym94KSB7XHJcbiAgICB0aGlzLnRvb2xiYXJFbGVtID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtdG9vbGJhciddKTtcclxuICAgIGNvbnN0IG9wZW5GdWxsc2NyZWVuVmlld0JveCA9ICcwIDAgMTcuNSAxNy41JztcclxuICAgIGNvbnN0IG9wZW5GdWxsc2NyZWVuRCA9ICdNNC41IDExSDN2NGg0di0xLjVINC41VjExek0zIDdoMS41VjQuNUg3VjNIM3Y0em0xMC41IDYuNUgxMVYxNWg0di00aC0xLjV2Mi41ek0xMSAzdjEuNWgyLjVWN0gxNVYzaC00eic7XHJcbiAgICBjb25zdCBjbG9zZUZ1bGxzY3JlZW5WaWV3Qm94ID0gJzAgMCA5NTAgMTAyNCc7XHJcbiAgICBjb25zdCBjbG9zZUZ1bGxzY3JlZW5EID0gJ002ODIgMzQyaDEyOHY4NGgtMjEydi0yMTJoODR2MTI4ek01OTggODEwdi0yMTJoMjEydjg0aC0xMjh2MTI4aC04NHpNMzQyIDM0MnYtMTI4aDg0djIxMmgtMjEydi04NGgxMjh6TTIxNCA2ODJ2LTg0aDIxMnYyMTJoLTg0di0xMjhoLTEyOHonO1xyXG4gICAgbGV0IGZ1bGxzY3JlZW5Tdmc7XHJcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJEZWZhdWx0QnV0dG9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgc2hvdWxkUmVuZGVyQnV0dG9ucyA9IGZzTGlnaHRib3guZGF0YS50b29sYmFyQnV0dG9ucztcclxuXHJcbiAgICAgICAgaWYgKHNob3VsZFJlbmRlckJ1dHRvbnMuZnVsbHNjcmVlbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgYnV0dG9uID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtdG9vbGJhci1idXR0b24nLCAnZnNsaWdodGJveC1mbGV4LWNlbnRlcmVkJ10pO1xyXG4gICAgICAgICAgICBmdWxsc2NyZWVuU3ZnID0gbmV3IGZzTGlnaHRib3guU1ZHSWNvbigpLmdldFNWR0ljb24oJzAgMCAxNy41IDE3LjUnICtcclxuICAgICAgICAgICAgICAgICcnLCAnMjBweCcsIG9wZW5GdWxsc2NyZWVuRCk7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChmdWxsc2NyZWVuU3ZnKTtcclxuICAgICAgICAgICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAoZnNMaWdodGJveC5kYXRhLmZ1bGxzY3JlZW4pID9cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jbG9zZUZ1bGxzY3JlZW4oKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub3BlbkZ1bGxzY3JlZW4oKTtcclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMudG9vbGJhckVsZW0uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzaG91bGRSZW5kZXJCdXR0b25zLmNsb3NlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCBidXR0b24gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC10b29sYmFyLWJ1dHRvbicsICdmc2xpZ2h0Ym94LWZsZXgtY2VudGVyZWQnXSk7XHJcbiAgICAgICAgICAgIGxldCBzdmcgPSBuZXcgZnNMaWdodGJveC5TVkdJY29uKCkuZ2V0U1ZHSWNvbignMCAwIDIwIDIwJywgJzE2cHgnLCAnTSAxMS40NjkgMTAgbCA3LjA4IC03LjA4IGMgMC40MDYgLTAuNDA2IDAuNDA2IC0xLjA2NCAwIC0xLjQ2OSBjIC0wLjQwNiAtMC40MDYgLTEuMDYzIC0wLjQwNiAtMS40NjkgMCBMIDEwIDguNTMgbCAtNy4wODEgLTcuMDggYyAtMC40MDYgLTAuNDA2IC0xLjA2NCAtMC40MDYgLTEuNDY5IDAgYyAtMC40MDYgMC40MDYgLTAuNDA2IDEuMDYzIDAgMS40NjkgTCA4LjUzMSAxMCBMIDEuNDUgMTcuMDgxIGMgLTAuNDA2IDAuNDA2IC0wLjQwNiAxLjA2NCAwIDEuNDY5IGMgMC4yMDMgMC4yMDMgMC40NjkgMC4zMDQgMC43MzUgMC4zMDQgYyAwLjI2NiAwIDAuNTMxIC0wLjEwMSAwLjczNSAtMC4zMDQgTCAxMCAxMS40NjkgbCA3LjA4IDcuMDgxIGMgMC4yMDMgMC4yMDMgMC40NjkgMC4zMDQgMC43MzUgMC4zMDQgYyAwLjI2NyAwIDAuNTMyIC0wLjEwMSAwLjczNSAtMC4zMDQgYyAwLjQwNiAtMC40MDYgMC40MDYgLTEuMDY0IDAgLTEuNDY5IEwgMTEuNDY5IDEwIFonKTtcclxuICAgICAgICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKHN2Zyk7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFmc0xpZ2h0Ym94LmRhdGEuZmFkaW5nT3V0KSBmc0xpZ2h0Ym94LmhpZGUoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy50b29sYmFyRWxlbS5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMub3BlbkZ1bGxzY3JlZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnNMaWdodGJveC5kYXRhLmZ1bGxzY3JlZW4gPSB0cnVlO1xyXG4gICAgICAgIGZ1bGxzY3JlZW5TdmcuZmlyc3RDaGlsZC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZCcsIGNsb3NlRnVsbHNjcmVlbkQpO1xyXG4gICAgICAgIGZ1bGxzY3JlZW5Tdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3ZpZXdCb3gnLCBjbG9zZUZ1bGxzY3JlZW5WaWV3Qm94KTtcclxuICAgICAgICBmdWxsc2NyZWVuU3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICd3aWR0aCcsICcyNHB4Jyk7XHJcbiAgICAgICAgZnVsbHNjcmVlblN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaGVpZ2h0JywgJzI0cHgnKTtcclxuICAgICAgICBsZXQgZWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuICAgICAgICBpZiAoZWxlbS5yZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAgICAgICBlbGVtLnJlcXVlc3RGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICAgIGVsZW0ubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGVsZW0ud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgZWxlbS53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbS5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgICAgIGVsZW0ubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jbG9zZUZ1bGxzY3JlZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnNMaWdodGJveC5kYXRhLmZ1bGxzY3JlZW4gPSBmYWxzZTtcclxuICAgICAgICBmdWxsc2NyZWVuU3ZnLmZpcnN0Q2hpbGQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2QnLCBvcGVuRnVsbHNjcmVlbkQpO1xyXG4gICAgICAgIGZ1bGxzY3JlZW5Tdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3ZpZXdCb3gnLCBvcGVuRnVsbHNjcmVlblZpZXdCb3gpO1xyXG4gICAgICAgIGZ1bGxzY3JlZW5Tdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3dpZHRoJywgJzIwcHgnKTtcclxuICAgICAgICBmdWxsc2NyZWVuU3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICdoZWlnaHQnLCAnMjBweCcpO1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xyXG4gICAgICAgICAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbikge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnJlbmRlclRvb2xiYXIgPSBmdW5jdGlvbiAobmF2KSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJEZWZhdWx0QnV0dG9ucygpO1xyXG4gICAgICAgIG5hdi5hcHBlbmRDaGlsZCh0aGlzLnRvb2xiYXJFbGVtKTtcclxuICAgIH07XHJcbn07IiwiY29uc3QgRE9NT2JqZWN0ID0gcmVxdWlyZSgnLi4vQ29tcG9uZW50cy9ET01PYmplY3QnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZzTGlnaHRib3gpIHtcclxuICAgIHRoaXMucmVuZGVyRE9NID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZzTGlnaHRib3guZWxlbWVudC5pZCA9IFwiZnNsaWdodGJveC1jb250YWluZXJcIjtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZzTGlnaHRib3guZWxlbWVudCk7XHJcblxyXG4gICAgICAgIC8vcmVuZGVyIHNsaWRlIGJ1dHRvbnMgYW5kIG5hdih0b29sYmFyKVxyXG4gICAgICAgIHJlbmRlck5hdihmc0xpZ2h0Ym94LmVsZW1lbnQpO1xyXG5cclxuICAgICAgICBpZiAoZnNMaWdodGJveC5kYXRhLnRvdGFsU2xpZGVzID4gMSkge1xyXG4gICAgICAgICAgICByZW5kZXJTbGlkZUJ1dHRvbnMoZnNMaWdodGJveC5lbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnNMaWdodGJveC5lbGVtZW50LmFwcGVuZENoaWxkKGZzTGlnaHRib3gubWVkaWFIb2xkZXIpO1xyXG4gICAgICAgIGZzTGlnaHRib3guZWxlbWVudC5hcHBlbmRDaGlsZChnZXREb3duRXZlbnREZXRlY3RvcigpKTtcclxuICAgICAgICBmc0xpZ2h0Ym94LmRhdGEuaXNmaXJzdFRpbWVMb2FkID0gdHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZ2V0RG93bkV2ZW50RGV0ZWN0b3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZzTGlnaHRib3guZGF0YS5kb3duRXZlbnREZXRlY3RvciA9IG5ldyBET01PYmplY3QoJ2RpdicpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1kb3duLWV2ZW50LWRldGVjdG9yJywgJ2ZzbGlnaHRib3gtZnVsbC1kaW1lbnNpb24nXSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHNsaWRlQ291bnRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbnVtYmVyQ29udGFpbmVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtbnVtYmVyLWNvbnRhaW5lcicsICdmc2xpZ2h0Ym94LWZsZXgtY2VudGVyZWQnXSk7XHJcbiAgICAgICAgZnNMaWdodGJveC5kYXRhLnNsaWRlQ291bnRlckVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb25zdCBzbGlkZUNvdW50ZXJFbGVtID0gZnNMaWdodGJveC5kYXRhLnNsaWRlQ291bnRlckVsZW07XHJcblxyXG4gICAgICAgIHNsaWRlQ291bnRlckVsZW0uaW5uZXJIVE1MID0gZnNMaWdodGJveC5kYXRhLnNsaWRlO1xyXG4gICAgICAgIHNsaWRlQ291bnRlckVsZW0uaWQgPSAnY3VycmVudF9zbGlkZSc7XHJcblxyXG4gICAgICAgIGxldCBzcGFjZSA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsYXNoJ10pO1xyXG4gICAgICAgIHNwYWNlLmlubmVySFRNTCA9ICcvJztcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHNsaWRlcy5pbm5lckhUTUwgPSBmc0xpZ2h0Ym94LmRhdGEudG90YWxTbGlkZXM7XHJcblxyXG4gICAgICAgIG51bWJlckNvbnRhaW5lci5hcHBlbmRDaGlsZChzbGlkZUNvdW50ZXJFbGVtKTtcclxuICAgICAgICBudW1iZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoc3BhY2UpO1xyXG4gICAgICAgIG51bWJlckNvbnRhaW5lci5hcHBlbmRDaGlsZChzbGlkZXMpO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlclNsaWRlQ291bnRlciA9IGZ1bmN0aW9uIChuYXYpIHtcclxuICAgICAgICAgICAgaWYgKGZzTGlnaHRib3guZGF0YS5zbGlkZUNvdW50ZXIpXHJcbiAgICAgICAgICAgICAgICBuYXYuYXBwZW5kQ2hpbGQobnVtYmVyQ29udGFpbmVyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBjb25zdCByZW5kZXJOYXYgPSBmdW5jdGlvbiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgZnNMaWdodGJveC5kYXRhLm5hdiA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LW5hdiddKTtcclxuICAgICAgICBmc0xpZ2h0Ym94LnRvb2xiYXIucmVuZGVyVG9vbGJhcihmc0xpZ2h0Ym94LmRhdGEubmF2KTtcclxuXHJcbiAgICAgICAgaWYgKGZzTGlnaHRib3guZGF0YS50b3RhbFNsaWRlcyA+IDEpIHtcclxuICAgICAgICAgICAgY29uc3QgY291bnRlciA9IG5ldyBzbGlkZUNvdW50ZXIoKTtcclxuICAgICAgICAgICAgY291bnRlci5yZW5kZXJTbGlkZUNvdW50ZXIoZnNMaWdodGJveC5kYXRhLm5hdik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmc0xpZ2h0Ym94LmRhdGEubmF2KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGNyZWF0ZUJUTiA9IGZ1bmN0aW9uIChidXR0b25Db250YWluZXIsIGNvbnRhaW5lciwgZCkge1xyXG4gICAgICAgIGxldCBidG4gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4nLCAnZnNsaWdodGJveC1mbGV4LWNlbnRlcmVkJ10pO1xyXG4gICAgICAgIGJ0bi5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgbmV3IGZzTGlnaHRib3guU1ZHSWNvbigpLmdldFNWR0ljb24oJzAgMCAyMCAyMCcsICcyMnB4JywgZClcclxuICAgICAgICApO1xyXG4gICAgICAgIGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25Db250YWluZXIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZW5kZXJTbGlkZUJ1dHRvbnMgPSBmdW5jdGlvbiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgaWYgKGZzTGlnaHRib3guZGF0YS5zbGlkZUJ1dHRvbnMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9yZW5kZXIgbGVmdCBidG5cclxuICAgICAgICBsZXQgbGVmdF9idG5fY29udGFpbmVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtYnRuLWNvbnRhaW5lcicsICdmc2xpZ2h0Ym94LXNsaWRlLWJ0bi1sZWZ0LWNvbnRhaW5lciddKTtcclxuICAgICAgICBjcmVhdGVCVE4obGVmdF9idG5fY29udGFpbmVyLCBjb250YWluZXIsICdNMTguMjcxLDkuMjEySDMuNjE1bDQuMTg0LTQuMTg0YzAuMzA2LTAuMzA2LDAuMzA2LTAuODAxLDAtMS4xMDdjLTAuMzA2LTAuMzA2LTAuODAxLTAuMzA2LTEuMTA3LDBMMS4yMSw5LjQwM0MxLjE5NCw5LjQxNywxLjE3NCw5LjQyMSwxLjE1OCw5LjQzN2MtMC4xODEsMC4xODEtMC4yNDIsMC40MjUtMC4yMDksMC42NmMwLjAwNSwwLjAzOCwwLjAxMiwwLjA3MSwwLjAyMiwwLjEwOWMwLjAyOCwwLjA5OCwwLjA3NSwwLjE4OCwwLjE0MiwwLjI3MWMwLjAyMSwwLjAyNiwwLjAyMSwwLjA2MSwwLjA0NSwwLjA4NWMwLjAxNSwwLjAxNiwwLjAzNCwwLjAyLDAuMDUsMC4wMzNsNS40ODQsNS40ODNjMC4zMDYsMC4zMDcsMC44MDEsMC4zMDcsMS4xMDcsMGMwLjMwNi0wLjMwNSwwLjMwNi0wLjgwMSwwLTEuMTA1bC00LjE4NC00LjE4NWgxNC42NTZjMC40MzYsMCwwLjc4OC0wLjM1MywwLjc4OC0wLjc4OFMxOC43MDcsOS4yMTIsMTguMjcxLDkuMjEyeicpO1xyXG5cclxuICAgICAgICAvL2dvIHRvIHByZXZpb3VzIHNsaWRlIG9uY2xpY2tcclxuICAgICAgICBsZWZ0X2J0bl9jb250YWluZXIub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZnNMaWdodGJveC5hcHBlbmRNZXRob2RzLnByZXZpb3VzU2xpZGVWaWFCdXR0b24oZnNMaWdodGJveC5kYXRhLnNsaWRlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgcmlnaHRfYnRuX2NvbnRhaW5lciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLWJ0bi1jb250YWluZXInLCAnZnNsaWdodGJveC1zbGlkZS1idG4tcmlnaHQtY29udGFpbmVyJ10pO1xyXG4gICAgICAgIGNyZWF0ZUJUTihyaWdodF9idG5fY29udGFpbmVyLCBjb250YWluZXIsICdNMS43MjksOS4yMTJoMTQuNjU2bC00LjE4NC00LjE4NGMtMC4zMDctMC4zMDYtMC4zMDctMC44MDEsMC0xLjEwN2MwLjMwNS0wLjMwNiwwLjgwMS0wLjMwNiwxLjEwNiwwbDUuNDgxLDUuNDgyYzAuMDE4LDAuMDE0LDAuMDM3LDAuMDE5LDAuMDUzLDAuMDM0YzAuMTgxLDAuMTgxLDAuMjQyLDAuNDI1LDAuMjA5LDAuNjZjLTAuMDA0LDAuMDM4LTAuMDEyLDAuMDcxLTAuMDIxLDAuMTA5Yy0wLjAyOCwwLjA5OC0wLjA3NSwwLjE4OC0wLjE0MywwLjI3MWMtMC4wMjEsMC4wMjYtMC4wMjEsMC4wNjEtMC4wNDUsMC4wODVjLTAuMDE1LDAuMDE2LTAuMDM0LDAuMDItMC4wNTEsMC4wMzNsLTUuNDgzLDUuNDgzYy0wLjMwNiwwLjMwNy0wLjgwMiwwLjMwNy0xLjEwNiwwYy0wLjMwNy0wLjMwNS0wLjMwNy0wLjgwMSwwLTEuMTA1bDQuMTg0LTQuMTg1SDEuNzI5Yy0wLjQzNiwwLTAuNzg4LTAuMzUzLTAuNzg4LTAuNzg4UzEuMjkzLDkuMjEyLDEuNzI5LDkuMjEyeicpO1xyXG4gICAgICAgIC8vIGdvIHRvIG5leHQgc2xpZGUgb24gY2xpY2tcclxuICAgICAgICByaWdodF9idG5fY29udGFpbmVyLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZzTGlnaHRib3guYXBwZW5kTWV0aG9kcy5uZXh0U2xpZGVWaWFCdXR0b24oZnNMaWdodGJveC5kYXRhLnNsaWRlKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZikge1xyXG4gICAgY29uc3QgRVNDQVBFID0gJ0VzY2FwZSc7XHJcbiAgICBjb25zdCBMRUZUX0FSUk9XID0gJ0Fycm93TGVmdCc7XHJcbiAgICBjb25zdCBSSUdIVF9BUlJPVyA9ICdBcnJvd1JpZ2h0JztcclxuXHJcbiAgICB0aGlzLmhhbmRsZUtleURvd24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBFU0NBUEU6XHJcbiAgICAgICAgICAgICAgICBzZWxmLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5kYXRhLnRvdGFsU2xpZGVzID4gMSlcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmFwcGVuZE1ldGhvZHMucHJldmlvdXNTbGlkZVZpYUJ1dHRvbihzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUklHSFRfQVJST1c6XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5kYXRhLnRvdGFsU2xpZGVzID4gMSlcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmFwcGVuZE1ldGhvZHMubmV4dFNsaWRlVmlhQnV0dG9uKHNlbGYuZGF0YS5zbGlkZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNjcm9sbGJhcldpZHRoKSB7XHJcbiAgICB0aGlzLmFkZFJlY29tcGVuc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCFkb2VzU2Nyb2xsYmFySGF2ZVdpZHRoKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUubWFyZ2luUmlnaHQgPSBzY3JvbGxiYXJXaWR0aCArICdweCc7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudHNUb1JlY29tcGVuc2UgPSBnZXRSZWNvbXBlbnNlRWxlbWVudHMoKTtcclxuICAgICAgICBpZiAoIWVsZW1lbnRzVG9SZWNvbXBlbnNlKSByZXR1cm47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50c1RvUmVjb21wZW5zZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBlbGVtZW50c1RvUmVjb21wZW5zZVtpXS5zdHlsZS5tYXJnaW5SaWdodCA9IHNjcm9sbGJhcldpZHRoICsgJ3B4JztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucmVtb3ZlUmVjb21wZW5zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIWRvZXNTY3JvbGxiYXJIYXZlV2lkdGgoKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5tYXJnaW5SaWdodCA9ICcnO1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnRzVG9SZWNvbXBlbnNlID0gZ2V0UmVjb21wZW5zZUVsZW1lbnRzKCk7XHJcbiAgICAgICAgaWYgKCFlbGVtZW50c1RvUmVjb21wZW5zZSkgcmV0dXJuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHNUb1JlY29tcGVuc2UubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZWxlbWVudHNUb1JlY29tcGVuc2VbaV0uc3R5bGUubWFyZ2luUmlnaHQgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGdldFJlY29tcGVuc2VFbGVtZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVjb21wZW5zZS1mb3Itc2Nyb2xsYmFyJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGRvZXNTY3JvbGxiYXJIYXZlV2lkdGggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICEhc2Nyb2xsYmFyV2lkdGg7XHJcbiAgICB9O1xyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgdGhpcy5nZXRXaWR0aCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgb3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIG91dGVyLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gICAgICAgIG91dGVyLnN0eWxlLndpZHRoID0gXCIxMDBweFwiO1xyXG4gICAgICAgIG91dGVyLnN0eWxlLm1zT3ZlcmZsb3dTdHlsZSA9IFwic2Nyb2xsYmFyXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlcik7XHJcbiAgICAgICAgbGV0IHdpZHRoTm9TY3JvbGwgPSBvdXRlci5vZmZzZXRXaWR0aDtcclxuICAgICAgICBvdXRlci5zdHlsZS5vdmVyZmxvdyA9IFwic2Nyb2xsXCI7XHJcbiAgICAgICAgbGV0IGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBpbm5lci5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xyXG4gICAgICAgIG91dGVyLmFwcGVuZENoaWxkKGlubmVyKTtcclxuICAgICAgICBsZXQgd2lkdGhXaXRoU2Nyb2xsID0gaW5uZXIub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgb3V0ZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvdXRlcik7XHJcbiAgICAgICAgZGF0YS5zY3JvbGxiYXJXaWR0aCA9IHdpZHRoTm9TY3JvbGwgLSB3aWR0aFdpdGhTY3JvbGw7XHJcbiAgICB9O1xyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlbGYpIHtcclxuICAgIC8vd2Ugd2lsbCBob3ZlciBhbGwgd2luZG93cyB3aXRoIGRpdiB3aXRoIGhpZ2ggei1pbmRleCB0byBiZSBzdXJlIG1vdXNldXAgaXMgdHJpZ2dlcmVkXHJcbiAgICBjb25zdCBpbnZpc2libGVIb3ZlciA9IG5ldyAocmVxdWlyZSgnLi4vQ29tcG9uZW50cy9ET01PYmplY3QnKSkoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LWludmlzaWJsZS1ob3ZlciddKTtcclxuICAgIGNvbnN0IENVUlNPUl9HUkFCQklOR19DTEFTU19OQU1FID0gJ2ZzbGlnaHRib3gtY3Vyc29yLWdyYWJiaW5nJztcclxuICAgIGNvbnN0IFRSQU5TRk9STV9UUkFOU0lUSU9OX0NMQVNTX05BTUUgPSAnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbic7XHJcblxyXG4gICAgLy90byB0aGVzZSBlbGVtZW50cyBhcmUgYWRkZWQgbW91c2UgZXZlbnRzXHJcbiAgICBjb25zdCBlbGVtZW50cyA9IHtcclxuICAgICAgICBtZWRpYUhvbGRlcjogc2VsZi5tZWRpYUhvbGRlcixcclxuICAgICAgICBpbnZpc2libGVIb3ZlcjogaW52aXNpYmxlSG92ZXIsXHJcbiAgICAgICAgZG93bkV2ZW50RGV0ZWN0b3I6IHNlbGYuZGF0YS5kb3duRXZlbnREZXRlY3RvclxyXG4gICAgfTtcclxuICAgIC8vc291cmNlcyBhcmUgdHJhbnNmb3JtZWRcclxuICAgIGNvbnN0IHNvdXJjZXMgPSBzZWxmLmRhdGEuc291cmNlcztcclxuXHJcbiAgICAvLyBpZiB0aGVyZSBhcmUgb25seSAyIG9yIDEgdXJscyBzbGlkZVRyYW5zZm9ybWVyIHdpbGwgYmUgZGlmZmVyZW50XHJcbiAgICBjb25zdCB1cmxzTGVuZ3RoID0gc2VsZi5kYXRhLnVybHMubGVuZ3RoO1xyXG5cclxuICAgIGxldCBpc19kcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgbGV0IG1vdXNlRG93bkNsaWVudFg7XHJcbiAgICBsZXQgaXNTb3VyY2VEb3duRXZlbnRUYXJnZXQ7XHJcbiAgICBsZXQgZGlmZmVyZW5jZTtcclxuICAgIGxldCBzbGlkZUFibGUgPSB0cnVlO1xyXG5cclxuXHJcbiAgICBjb25zdCBtb3VzZURvd25FdmVudCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgLy8gdGFnIGNhbid0IGJlIHZpZGVvIGNhdXNlIGl0IHdvdWxkIGJlIHVuY2xpY2thYmxlIGluIG1pY3Jvc29mdCBicm93c2Vyc1xyXG4gICAgICAgIGlmIChlLnRhcmdldC50YWdOYW1lICE9PSAnVklERU8nICYmICFlLnRvdWNoZXMpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmc2xpZ2h0Ym94LXNvdXJjZScpKSB7XHJcbiAgICAgICAgICAgIGlzU291cmNlRG93bkV2ZW50VGFyZ2V0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXNfZHJhZ2dpbmcgPSB0cnVlO1xyXG4gICAgICAgIGRpZmZlcmVuY2UgPSAwO1xyXG5cclxuICAgICAgICBpZiAoc2VsZi5kYXRhLnRvdGFsU2xpZGVzID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIChlLnRvdWNoZXMpID9cclxuICAgICAgICAgICAgbW91c2VEb3duQ2xpZW50WCA9IGUudG91Y2hlc1swXS5jbGllbnRYIDpcclxuICAgICAgICAgICAgbW91c2VEb3duQ2xpZW50WCA9IGUuY2xpZW50WDtcclxuICAgIH07XHJcblxyXG5cclxuICAgIGNvbnN0IG1vdXNlVXBFdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIWlzX2RyYWdnaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXNfZHJhZ2dpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGYuZWxlbWVudC5jb250YWlucyhpbnZpc2libGVIb3ZlcikpIHtcclxuICAgICAgICAgICAgc2VsZi5lbGVtZW50LnJlbW92ZUNoaWxkKGludmlzaWJsZUhvdmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZWxmLmVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKENVUlNPUl9HUkFCQklOR19DTEFTU19OQU1FKSkge1xyXG4gICAgICAgICAgICBzZWxmLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDVVJTT1JfR1JBQkJJTkdfQ0xBU1NfTkFNRSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGlmZmVyZW5jZSA9PT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoIWlzU291cmNlRG93bkV2ZW50VGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpc1NvdXJjZURvd25FdmVudFRhcmdldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlzU291cmNlRG93bkV2ZW50VGFyZ2V0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICghc2xpZGVBYmxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2xpZGVBYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCBzb3VyY2VzSW5kZXhlcyA9IHNlbGYuc3RhZ2VTb3VyY2VJbmRleGVzLmFsbChzZWxmLmRhdGEuc2xpZGUpO1xyXG5cclxuICAgICAgICAvLyBhZGQgdHJhbnNpdGlvbiBpZiB1c2VyIHNsaWRlIHRvIHNvdXJjZVxyXG4gICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdLmNsYXNzTGlzdC5hZGQoVFJBTlNGT1JNX1RSQU5TSVRJT05fQ0xBU1NfTkFNRSk7XHJcbiAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XS5jbGFzc0xpc3QuYWRkKFRSQU5TRk9STV9UUkFOU0lUSU9OX0NMQVNTX05BTUUpO1xyXG4gICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0uY2xhc3NMaXN0LmFkZChUUkFOU0ZPUk1fVFJBTlNJVElPTl9DTEFTU19OQU1FKTtcclxuXHJcblxyXG4gICAgICAgIC8vIHNsaWRlIHByZXZpb3VzXHJcbiAgICAgICAgaWYgKGRpZmZlcmVuY2UgPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAvLyB1cGRhdGUgc2xpZGUgbnVtYmVyXHJcbiAgICAgICAgICAgIGlmIChzZWxmLmRhdGEuc2xpZGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnRvdGFsU2xpZGVzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnNsaWRlIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh1cmxzTGVuZ3RoID49IDIpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2xpZGVUcmFuc2Zvcm1lci5wbHVzKHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0pO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zbGlkZVRyYW5zZm9ybWVyLnplcm8oc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zbGlkZVRyYW5zZm9ybWVyLnplcm8oc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGdldCBuZXcgaW5kZXhlc1xyXG4gICAgICAgICAgICBzb3VyY2VzSW5kZXhlcyA9IHNlbGYuc3RhZ2VTb3VyY2VJbmRleGVzLmFsbChzZWxmLmRhdGEuc2xpZGUpO1xyXG5cclxuICAgICAgICAgICAgLy9pZiBzb3VyY2UgaXNuJ3QgYWxyZWFkeSBpbiBtZW1vcnlcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxmLmRhdGEuc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubG9hZHNvdXJjZXMoJ3ByZXZpb3VzJywgc2VsZi5kYXRhLnNsaWRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIHNsaWRlIG5leHRcclxuICAgICAgICBlbHNlIGlmIChkaWZmZXJlbmNlIDwgMCkge1xyXG5cclxuICAgICAgICAgICAgLy91cGRhdGUgc2xpZGUgbnVtYmVyXHJcbiAgICAgICAgICAgIGlmIChzZWxmLmRhdGEuc2xpZGUgPT09IHNlbGYuZGF0YS50b3RhbFNsaWRlcykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi51cGRhdGVTbGlkZU51bWJlcigxKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnNsaWRlICsgMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodXJsc0xlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2xpZGVUcmFuc2Zvcm1lci5taW51cyhzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2xpZGVUcmFuc2Zvcm1lci56ZXJvKHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zbGlkZVRyYW5zZm9ybWVyLnplcm8oc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGdldCBuZXcgaW5kZXhlc1xyXG4gICAgICAgICAgICBzb3VyY2VzSW5kZXhlcyA9IHNlbGYuc3RhZ2VTb3VyY2VJbmRleGVzLmFsbChzZWxmLmRhdGEuc2xpZGUpO1xyXG4gICAgICAgICAgICAvL2lmIHNvdXJjZSBpc24ndCBhbHJlYWR5IGluIG1lbW9yeVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlbGYuZGF0YS5zb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRzb3VyY2VzKCduZXh0Jywgc2VsZi5kYXRhLnNsaWRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGlmZmVyZW5jZSA9IDA7XHJcbiAgICAgICAgc2VsZi5zdG9wVmlkZW9zKCk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgdHJhbnNpdGlvbiBiZWNhdXNlIHdpdGggZHJhZ2dpbmcgaXQgbG9va3MgYXdmdWxcclxuICAgICAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10uY2xhc3NMaXN0LnJlbW92ZShUUkFOU0ZPUk1fVFJBTlNJVElPTl9DTEFTU19OQU1FKTtcclxuICAgICAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XS5jbGFzc0xpc3QucmVtb3ZlKFRSQU5TRk9STV9UUkFOU0lUSU9OX0NMQVNTX05BTUUpO1xyXG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdLmNsYXNzTGlzdC5yZW1vdmUoVFJBTlNGT1JNX1RSQU5TSVRJT05fQ0xBU1NfTkFNRSk7XHJcblxyXG4gICAgICAgICAgICAvLyB1c2VyIHNob3VsZG4ndCBiZSBhYmxlIHRvIHNsaWRlIHdoZW4gYW5pbWF0aW9uIGlzIHJ1bm5pbmdcclxuICAgICAgICAgICAgc2xpZGVBYmxlID0gdHJ1ZTtcclxuICAgICAgICB9LCAyNTApO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgY29uc3QgbW91c2VNb3ZlRXZlbnQgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICghaXNfZHJhZ2dpbmcgfHwgIXNsaWRlQWJsZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjbGllbnRYO1xyXG4gICAgICAgIChlLnRvdWNoZXMpID9cclxuICAgICAgICAgICAgY2xpZW50WCA9IGUudG91Y2hlc1swXS5jbGllbnRYIDpcclxuICAgICAgICAgICAgY2xpZW50WCA9IGUuY2xpZW50WDtcclxuXHJcbiAgICAgICAgZGlmZmVyZW5jZSA9IGNsaWVudFggLSBtb3VzZURvd25DbGllbnRYO1xyXG4gICAgICAgIC8vIGlmIHVzZXIgc3dpcGVkIGJ1dCB0aGVyZSBpcyBvbmx5IG9uZSBzbGlkZSB3ZSBkb250IHdhbnQgZnVydGhlciBjb2RlIHRvIGV4ZWN1dGUgYnV0IHdlIHdhbnQgdG8gcHJldmVudCBsaWdodGJveFxyXG4gICAgICAgIC8vIGZyb20gY2xvc2luZyBzbyB3ZSBzZXQgZGlmZmVyZW5jZSB0byAxXHJcbiAgICAgICAgaWYgKGRpZmZlcmVuY2UgIT09IDAgJiYgc2VsZi5kYXRhLnRvdGFsU2xpZGVzID09PSAxKSB7XHJcbiAgICAgICAgICAgIGRpZmZlcmVuY2UgPSAxO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXNlbGYuZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ1VSU09SX0dSQUJCSU5HX0NMQVNTX05BTUUpKVxyXG4gICAgICAgICAgICBzZWxmLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChDVVJTT1JfR1JBQkJJTkdfQ0xBU1NfTkFNRSk7XHJcblxyXG4gICAgICAgIGlmICghc2VsZi5lbGVtZW50LmNvbnRhaW5zKGludmlzaWJsZUhvdmVyKSkge1xyXG4gICAgICAgICAgICBzZWxmLmVsZW1lbnQuYXBwZW5kQ2hpbGQoaW52aXNpYmxlSG92ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IHNlbGYuc3RhZ2VTb3VyY2VJbmRleGVzLmFsbChzZWxmLmRhdGEuc2xpZGUpO1xyXG5cclxuICAgICAgICBpZiAodXJsc0xlbmd0aCA+PSAzKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArXHJcbiAgICAgICAgICAgICAgICAoLXNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGggKyBkaWZmZXJlbmNlKVxyXG4gICAgICAgICAgICAgICAgKyAncHgsMCknO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHVybHNMZW5ndGggPj0gMSkge1xyXG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIGRpZmZlcmVuY2UgKyAncHgsMCknO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHVybHNMZW5ndGggPj0gMikge1xyXG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJ1xyXG4gICAgICAgICAgICAgICAgKyAoc2VsZi5kYXRhLnNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aCArIGRpZmZlcmVuY2UpXHJcbiAgICAgICAgICAgICAgICArICdweCwwKSc7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBwcmV2ZW50RGVmYXVsdEV2ZW50ID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBmb3IgKGxldCBlbGVtIGluIGVsZW1lbnRzKSB7XHJcbiAgICAgICAgZWxlbWVudHNbZWxlbV0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2VEb3duRXZlbnQpO1xyXG4gICAgICAgIGVsZW1lbnRzW2VsZW1dLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBtb3VzZURvd25FdmVudCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWRkV2luZG93RXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcEV2ZW50KTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBtb3VzZVVwRXZlbnQpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmVFdmVudCk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG1vdXNlTW92ZUV2ZW50LCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucmVtb3ZlV2luZG93RXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcEV2ZW50KTtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBtb3VzZVVwRXZlbnQpO1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmVFdmVudCk7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG1vdXNlTW92ZUV2ZW50KTtcclxuICAgIH07XHJcblxyXG4gICAgaW52aXNpYmxlSG92ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlVXBFdmVudCk7XHJcbiAgICBpbnZpc2libGVIb3Zlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG1vdXNlVXBFdmVudCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgc2VsZi5kYXRhLm5hdi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBwcmV2ZW50RGVmYXVsdEV2ZW50KTtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2xpZGVEaXN0YW5jZSkge1xyXG4gICAgdGhpcy5taW51cyA9IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgZWxlbS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyAoLXNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aCkgKyAncHgsMCknO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnplcm8gPSBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgIGVsZW0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgwLDApJztcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5wbHVzID0gZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICBlbGVtLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIHNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aCArICdweCwwKSc7XHJcbiAgICB9O1xyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIHRoaXMucHJldmlvdXMgPSBmdW5jdGlvbiAoc2xpZGUpIHtcclxuICAgICAgICBsZXQgcHJldmlvdXNTbGlkZUluZGV4O1xyXG4gICAgICAgIGNvbnN0IGFycmF5SW5kZXggPSBzbGlkZSAtIDE7XHJcblxyXG4gICAgICAgIC8vIHByZXZpb3VzXHJcbiAgICAgICAgaWYgKGFycmF5SW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgcHJldmlvdXNTbGlkZUluZGV4ID0gZGF0YS50b3RhbFNsaWRlcyAtIDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJldmlvdXNTbGlkZUluZGV4ID0gYXJyYXlJbmRleCAtIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcHJldmlvdXNTbGlkZUluZGV4O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLm5leHQgPSBmdW5jdGlvbiAoc2xpZGUpIHtcclxuXHJcbiAgICAgICAgbGV0IG5leHRTbGlkZUluZGV4O1xyXG4gICAgICAgIGNvbnN0IGFycmF5SW5kZXggPSBzbGlkZSAtIDE7XHJcblxyXG4gICAgICAgIC8vbmV4dFxyXG4gICAgICAgIGlmIChzbGlkZSA9PT0gZGF0YS50b3RhbFNsaWRlcykge1xyXG4gICAgICAgICAgICBuZXh0U2xpZGVJbmRleCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV4dFNsaWRlSW5kZXggPSBhcnJheUluZGV4ICsgMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXh0U2xpZGVJbmRleDtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5hbGwgPSBmdW5jdGlvbiAoc2xpZGUpIHtcclxuICAgICAgICAvLyBzb3VyY2VzIGFyZSBzdG9yZWQgaW4gYXJyYXkgaW5kZXhlZCBmcm9tIDBcclxuICAgICAgICBjb25zdCBhcnJheUluZGV4ID0gc2xpZGUgLSAxO1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZXNJbmRleGVzID0ge1xyXG4gICAgICAgICAgICBwcmV2aW91czogMCxcclxuICAgICAgICAgICAgY3VycmVudDogMCxcclxuICAgICAgICAgICAgbmV4dDogMFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIHByZXZpb3VzXHJcbiAgICAgICAgaWYgKGFycmF5SW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgc291cmNlc0luZGV4ZXMucHJldmlvdXMgPSBkYXRhLnRvdGFsU2xpZGVzIC0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzb3VyY2VzSW5kZXhlcy5wcmV2aW91cyA9IGFycmF5SW5kZXggLSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY3VycmVudFxyXG4gICAgICAgIHNvdXJjZXNJbmRleGVzLmN1cnJlbnQgPSBhcnJheUluZGV4O1xyXG5cclxuICAgICAgICAvL25leHRcclxuICAgICAgICBpZiAoc2xpZGUgPT09IGRhdGEudG90YWxTbGlkZXMpIHtcclxuICAgICAgICAgICAgc291cmNlc0luZGV4ZXMubmV4dCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc291cmNlc0luZGV4ZXMubmV4dCA9IGFycmF5SW5kZXggKyAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZXNJbmRleGVzO1xyXG4gICAgfTtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZikge1xyXG4gICAgY29uc3Qga2V5Ym9hcmRDb250cm9sbGVyID0gc2VsZi5rZXlib2FyZENvbnRyb2xsZXI7XHJcblxyXG4gICAgdGhpcy5hdHRhY2hMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5Ym9hcmRDb250cm9sbGVyLmhhbmRsZUtleURvd24pO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlib2FyZENvbnRyb2xsZXIuaGFuZGxlS2V5RG93bik7XHJcbiAgICB9O1xyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZzTGlnaHRib3gpIHtcclxuICAgIGNvbnN0IGxvYWRlciA9ICc8ZGl2IGNsYXNzPVwiZnNsaWdodGJveC1sb2FkZXJcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2Pic7XHJcbiAgICBjb25zdCB0cmFuc2l0aW9uID0gJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nO1xyXG4gICAgY29uc3QgZmFkZUluID0gJ2ZzbGlnaHRib3gtZmFkZS1pbic7XHJcbiAgICBjb25zdCBmYWRlT3V0ID0gJ2ZzbGlnaHRib3gtZmFkZS1vdXQnO1xyXG5cclxuICAgIGNvbnN0IGNyZWF0ZUhvbGRlciA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZUhvbGRlciA9IG5ldyAocmVxdWlyZSgnLi9Db21wb25lbnRzL0RPTU9iamVjdCcpKSgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc291cmNlLWhvbGRlcicsICdmc2xpZ2h0Ym94LWZ1bGwtZGltZW5zaW9uJ10pO1xyXG4gICAgICAgIHNvdXJjZUhvbGRlci5pbm5lckhUTUwgPSBsb2FkZXI7XHJcbiAgICAgICAgZnNMaWdodGJveC5kYXRhLnNvdXJjZXNbaW5kZXhdID0gc291cmNlSG9sZGVyO1xyXG4gICAgICAgIHJldHVybiBzb3VyY2VIb2xkZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJ1bkFuaW1hdGlvbk9uU291cmNlID0gZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICBlbGVtLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LmFkZChmYWRlSW4pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjbGVhckFuaW1hdGlvbk9uU291cmNlID0gZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICBjb25zdCBzcmMgPSBlbGVtLmZpcnN0Q2hpbGQ7XHJcbiAgICAgICAgc3JjLmNsYXNzTGlzdC5yZW1vdmUoZmFkZUluKTtcclxuICAgICAgICBzcmMuY2xhc3NMaXN0LnJlbW92ZShmYWRlT3V0KTtcclxuICAgICAgICB2b2lkIHNyYy5vZmZzZXRXaWR0aDtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcnVuRmFkZU91dEFuaW1hdGlvbk9uU291cmNlID0gZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICBlbGVtLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LmFkZChmYWRlT3V0KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIGxvYWRlciB3aGVuIGxvYWRpbmcgZnNMaWdodGJveCBpbml0aWFsbHlcclxuICAgICAqIEBwYXJhbSBzbGlkZVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJlbmRlckhvbGRlckluaXRpYWwgPSBmdW5jdGlvbiAoc2xpZGUpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IGZzTGlnaHRib3guc3RhZ2VTb3VyY2VJbmRleGVzLmFsbChzbGlkZSk7XHJcbiAgICAgICAgY29uc3QgdG90YWxTbGlkZXMgPSBmc0xpZ2h0Ym94LmRhdGEudG90YWxTbGlkZXM7XHJcblxyXG4gICAgICAgIGlmICh0b3RhbFNsaWRlcyA+PSAzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByZXYgPSBjcmVhdGVIb2xkZXIoc291cmNlc0luZGV4ZXMucHJldmlvdXMpO1xyXG4gICAgICAgICAgICBmc0xpZ2h0Ym94LnNsaWRlVHJhbnNmb3JtZXIubWludXMocHJldik7XHJcbiAgICAgICAgICAgIGZzTGlnaHRib3gubWVkaWFIb2xkZXIuYXBwZW5kQ2hpbGQocHJldik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0b3RhbFNsaWRlcyA+PSAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnIgPSBjcmVhdGVIb2xkZXIoc291cmNlc0luZGV4ZXMuY3VycmVudCk7XHJcbiAgICAgICAgICAgIGZzTGlnaHRib3gubWVkaWFIb2xkZXIuYXBwZW5kQ2hpbGQoY3Vycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0b3RhbFNsaWRlcyA+PSAyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHQgPSBjcmVhdGVIb2xkZXIoc291cmNlc0luZGV4ZXMubmV4dCk7XHJcbiAgICAgICAgICAgIGZzTGlnaHRib3guc2xpZGVUcmFuc2Zvcm1lci5wbHVzKG5leHQpO1xyXG4gICAgICAgICAgICBmc0xpZ2h0Ym94Lm1lZGlhSG9sZGVyLmFwcGVuZENoaWxkKG5leHQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMucmVuZGVySG9sZGVyID0gZnVuY3Rpb24gKHNsaWRlLCB0eXBlKSB7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3ByZXZpb3VzJzpcclxuICAgICAgICAgICAgICAgIHJlbmRlckhvbGRlclByZXZpb3VzKHNsaWRlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdjdXJyZW50JzpcclxuICAgICAgICAgICAgICAgIHJlbmRlckhvbGRlckN1cnJlbnQoc2xpZGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ25leHQnOlxyXG4gICAgICAgICAgICAgICAgcmVuZGVySG9sZGVyTmV4dChzbGlkZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBjb25zdCByZW5kZXJIb2xkZXJQcmV2aW91cyA9IGZ1bmN0aW9uIChzbGlkZSkge1xyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzU291cmNlSW5kZXggPSBmc0xpZ2h0Ym94LnN0YWdlU291cmNlSW5kZXhlcy5wcmV2aW91cyhzbGlkZSk7XHJcbiAgICAgICAgY29uc3QgcHJldiA9IGNyZWF0ZUhvbGRlcihwcmV2aW91c1NvdXJjZUluZGV4KTtcclxuICAgICAgICBmc0xpZ2h0Ym94LnNsaWRlVHJhbnNmb3JtZXIubWludXMocHJldik7XHJcbiAgICAgICAgZnNMaWdodGJveC5tZWRpYUhvbGRlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyYmVnaW4nLCBwcmV2KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIGNvbnN0IHJlbmRlckhvbGRlck5leHQgPSBmdW5jdGlvbiAoc2xpZGUpIHtcclxuICAgICAgICBjb25zdCBuZXh0U291cmNlSW5kZXggPSBmc0xpZ2h0Ym94LnN0YWdlU291cmNlSW5kZXhlcy5uZXh0KHNsaWRlKTtcclxuICAgICAgICBjb25zdCBuZXh0ID0gY3JlYXRlSG9sZGVyKG5leHRTb3VyY2VJbmRleCk7XHJcbiAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLnBsdXMobmV4dCk7XHJcbiAgICAgICAgZnNMaWdodGJveC5tZWRpYUhvbGRlci5hcHBlbmRDaGlsZChuZXh0KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIGNvbnN0IHJlbmRlckhvbGRlckN1cnJlbnQgPSBmdW5jdGlvbiAoc2xpZGUpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IGZzTGlnaHRib3guc3RhZ2VTb3VyY2VJbmRleGVzLmFsbChzbGlkZSk7XHJcbiAgICAgICAgY29uc3QgY3VyciA9IGNyZWF0ZUhvbGRlcihzb3VyY2VzSW5kZXhlcy5jdXJyZW50KTtcclxuICAgICAgICBmc0xpZ2h0Ym94LnNsaWRlVHJhbnNmb3JtZXIuemVybyhjdXJyKTtcclxuICAgICAgICBmc0xpZ2h0Ym94Lm1lZGlhSG9sZGVyLmluc2VydEJlZm9yZShjdXJyLCBmc0xpZ2h0Ym94LmRhdGEuc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGlzLnByZXZpb3VzU2xpZGVWaWFCdXR0b24gPSBmdW5jdGlvbiAocHJldmlvdXNTbGlkZSkge1xyXG4gICAgICAgIGlmIChwcmV2aW91c1NsaWRlID09PSAxKSB7XHJcbiAgICAgICAgICAgIGZzTGlnaHRib3guZGF0YS5zbGlkZSA9IGZzTGlnaHRib3guZGF0YS50b3RhbFNsaWRlcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmc0xpZ2h0Ym94LmRhdGEuc2xpZGUgLT0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5ld1NvdXJjZXNJbmRleGVzID0gc3RvcFZpZGVvc1VwZGF0ZVNsaWRlQW5kUmV0dXJuU2xpZGVOdW1iZXJJbmRleGVzKCk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZnNMaWdodGJveC5kYXRhLnNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMucHJldmlvdXNdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIGZzTGlnaHRib3gubG9hZHNvdXJjZXMoJ3ByZXZpb3VzJywgZnNMaWdodGJveC5kYXRhLnNsaWRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSBmc0xpZ2h0Ym94LmRhdGEuc291cmNlcztcclxuICAgICAgICBjb25zdCBjdXJyZW50U291cmNlID0gc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5jdXJyZW50XTtcclxuICAgICAgICBjb25zdCBuZXh0U291cmNlID0gc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5uZXh0XTtcclxuXHJcbiAgICAgICAgbmV4dFNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKHRyYW5zaXRpb24pO1xyXG4gICAgICAgIGN1cnJlbnRTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSh0cmFuc2l0aW9uKTtcclxuICAgICAgICBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5jbGFzc0xpc3QucmVtb3ZlKHRyYW5zaXRpb24pO1xyXG5cclxuXHJcbiAgICAgICAgY2xlYXJBbmltYXRpb25PblNvdXJjZShjdXJyZW50U291cmNlKTtcclxuICAgICAgICBydW5BbmltYXRpb25PblNvdXJjZShjdXJyZW50U291cmNlKTtcclxuICAgICAgICBydW5GYWRlT3V0QW5pbWF0aW9uT25Tb3VyY2UobmV4dFNvdXJjZSk7XHJcblxyXG4gICAgICAgIGZzTGlnaHRib3guc2xpZGVUcmFuc2Zvcm1lci56ZXJvKGN1cnJlbnRTb3VyY2UpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobmV3U291cmNlc0luZGV4ZXMubmV4dCAhPT0gZnNMaWdodGJveC5kYXRhLnNsaWRlIC0gMSlcclxuICAgICAgICAgICAgICAgIGZzTGlnaHRib3guc2xpZGVUcmFuc2Zvcm1lci5wbHVzKG5leHRTb3VyY2UpO1xyXG4gICAgICAgICAgICBuZXh0U291cmNlLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LnJlbW92ZShmYWRlT3V0KTtcclxuICAgICAgICB9LCAyMjApO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5uZXh0U2xpZGVWaWFCdXR0b24gPSBmdW5jdGlvbiAocHJldmlvdXNTbGlkZSkge1xyXG4gICAgICAgIGlmIChwcmV2aW91c1NsaWRlID09PSBmc0xpZ2h0Ym94LmRhdGEudG90YWxTbGlkZXMpIHtcclxuICAgICAgICAgICAgZnNMaWdodGJveC5kYXRhLnNsaWRlID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmc0xpZ2h0Ym94LmRhdGEuc2xpZGUgKz0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5ld1NvdXJjZXNJbmRleGVzID0gc3RvcFZpZGVvc1VwZGF0ZVNsaWRlQW5kUmV0dXJuU2xpZGVOdW1iZXJJbmRleGVzKCk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZnNMaWdodGJveC5kYXRhLnNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMubmV4dF0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgZnNMaWdodGJveC5sb2Fkc291cmNlcygnbmV4dCcsIGZzTGlnaHRib3guZGF0YS5zbGlkZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gZnNMaWdodGJveC5kYXRhLnNvdXJjZXM7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFNvdXJjZSA9IHNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMuY3VycmVudF07XHJcbiAgICAgICAgY29uc3QgcHJldmlvdXNTb3VyY2UgPSBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLnByZXZpb3VzXTtcclxuXHJcbiAgICAgICAgcHJldmlvdXNTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSh0cmFuc2l0aW9uKTtcclxuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5yZW1vdmUodHJhbnNpdGlvbik7XHJcbiAgICAgICAgc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5uZXh0XS5jbGFzc0xpc3QucmVtb3ZlKHRyYW5zaXRpb24pO1xyXG5cclxuICAgICAgICBjbGVhckFuaW1hdGlvbk9uU291cmNlKGN1cnJlbnRTb3VyY2UpO1xyXG4gICAgICAgIHJ1bkFuaW1hdGlvbk9uU291cmNlKGN1cnJlbnRTb3VyY2UpO1xyXG4gICAgICAgIHJ1bkZhZGVPdXRBbmltYXRpb25PblNvdXJjZShwcmV2aW91c1NvdXJjZSk7XHJcbiAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLnplcm8oY3VycmVudFNvdXJjZSk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobmV3U291cmNlc0luZGV4ZXMucHJldmlvdXMgIT09IGZzTGlnaHRib3guZGF0YS5zbGlkZSAtIDEpXHJcbiAgICAgICAgICAgICAgICBmc0xpZ2h0Ym94LnNsaWRlVHJhbnNmb3JtZXIubWludXMocHJldmlvdXNTb3VyY2UpO1xyXG4gICAgICAgICAgICBwcmV2aW91c1NvdXJjZS5maXJzdENoaWxkLmNsYXNzTGlzdC5yZW1vdmUoZmFkZU91dCk7XHJcbiAgICAgICAgfSwgMjIwKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgc3RvcFZpZGVvc1VwZGF0ZVNsaWRlQW5kUmV0dXJuU2xpZGVOdW1iZXJJbmRleGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZzTGlnaHRib3guc3RvcFZpZGVvcygpO1xyXG4gICAgICAgIGZzTGlnaHRib3gudXBkYXRlU2xpZGVOdW1iZXIoZnNMaWdodGJveC5kYXRhLnNsaWRlKTtcclxuICAgICAgICByZXR1cm4gZnNMaWdodGJveC5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKGZzTGlnaHRib3guZGF0YS5zbGlkZSk7XHJcbiAgICB9O1xyXG59OyIsIndpbmRvdy5mc0xpZ2h0Ym94Q2xhc3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBET01PYmplY3QgPSByZXF1aXJlKCcuL0NvbXBvbmVudHMvRE9NT2JqZWN0Jyk7XHJcblxyXG4gICAgdGhpcy5kYXRhID0ge1xyXG4gICAgICAgIHNsaWRlOiAxLFxyXG4gICAgICAgIHRvdGFsU2xpZGVzOiAxLFxyXG4gICAgICAgIHNsaWRlRGlzdGFuY2U6IDEuMyxcclxuICAgICAgICBzbGlkZUNvdW50ZXI6IHRydWUsXHJcbiAgICAgICAgc2xpZGVCdXR0b25zOiB0cnVlLFxyXG4gICAgICAgIGlzRmlyc3RUaW1lTG9hZDogZmFsc2UsXHJcbiAgICAgICAgbW92ZVNsaWRlc1ZpYURyYWc6IHRydWUsXHJcbiAgICAgICAgdG9vbGJhckJ1dHRvbnM6IHtcclxuICAgICAgICAgICAgXCJjbG9zZVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcImZ1bGxzY3JlZW5cIjogdHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgIHNjcm9sbGJhcldpZHRoOiAwLFxyXG5cclxuICAgICAgICB1cmxzOiBbXSxcclxuICAgICAgICBzb3VyY2VzOiBbXSxcclxuICAgICAgICBzb3VyY2VzTG9hZGVkOiBbXSxcclxuICAgICAgICByZW1lbWJlcmVkU291cmNlc0RpbWVuc2lvbnM6IFtdLFxyXG4gICAgICAgIHZpZGVvczogW10sXHJcbiAgICAgICAgdmlkZW9zUG9zdGVyczogW10sXHJcblxyXG4gICAgICAgIGhvbGRlcldyYXBwZXI6IG51bGwsXHJcbiAgICAgICAgbWVkaWFIb2xkZXI6IG51bGwsXHJcbiAgICAgICAgbmF2OiBudWxsLFxyXG4gICAgICAgIHRvb2xiYXI6IG51bGwsXHJcbiAgICAgICAgc2xpZGVDb3VudGVyRWxlbTogbnVsbCxcclxuICAgICAgICBkb3duRXZlbnREZXRlY3RvcjogbnVsbCxcclxuXHJcbiAgICAgICAgaW5pdGlhdGVkOiBmYWxzZSxcclxuICAgICAgICBmdWxsc2NyZWVuOiBmYWxzZSxcclxuICAgICAgICBmYWRpbmdPdXQ6IGZhbHNlLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0IGEgbmV3IGZzTGlnaHRib3ggaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKGluaXRIcmVmKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5pbml0aWF0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0U2V0U2xpZGUoaW5pdEhyZWYpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZ2FsbGVyeSA9IHRoaXMuZGF0YS5uYW1lO1xyXG5cclxuICAgICAgICBsZXQgdXJscyA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGEgPSBmc0xpZ2h0Ym94SGVscGVycy5hO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIWFbaV0uaGFzQXR0cmlidXRlKCdkYXRhLWZzbGlnaHRib3gnKSlcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWZzbGlnaHRib3gnKSA9PT0gZ2FsbGVyeSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVybHNMZW5ndGggPSB1cmxzLnB1c2goYVtpXS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYVtpXS5oYXNBdHRyaWJ1dGUoJ2RhdGEtdmlkZW8tcG9zdGVyJykpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnZpZGVvc1Bvc3RlcnNbdXJsc0xlbmd0aCAtIDFdID0gYVtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmlkZW8tcG9zdGVyJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YS51cmxzID0gdXJscztcclxuICAgICAgICB0aGlzLmRhdGEudG90YWxTbGlkZXMgPSB1cmxzLmxlbmd0aDtcclxuICAgICAgICBkb21SZW5kZXJlci5yZW5kZXJET00oKTtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1vcGVuJyk7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxiYXJSZWNvbXBlbnNvci5hZGRSZWNvbXBlbnNlKCk7XHJcbiAgICAgICAgdGhpcy5vblJlc2l6ZUV2ZW50LmluaXQoKTtcclxuICAgICAgICB0aGlzLmV2ZW50c0NvbnRyb2xsZXJzLmRvY3VtZW50LmtleURvd24uYXR0YWNoTGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLnRocm93RXZlbnQoJ2luaXQnKTtcclxuICAgICAgICB0aGlzLnRocm93RXZlbnQoJ29wZW4nKTtcclxuICAgICAgICB0aGlzLnNsaWRlU3dpcGluZyA9IG5ldyAocmVxdWlyZSgnLi9Db3JlL1NsaWRlU3dpcGluZy5qcycpKSh0aGlzKTtcclxuICAgICAgICB0aGlzLnNsaWRlU3dpcGluZy5hZGRXaW5kb3dFdmVudHMoKTtcclxuICAgICAgICB0aGlzLmluaXRTZXRTbGlkZShpbml0SHJlZik7XHJcbiAgICAgICAgdGhpcy5kYXRhLmluaXRpYXRlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtb3BlbicpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0IGNhbiBoYXZlIG11bHRpcGxlIHR5cGUgb2Ygc2xpZGVzXHJcbiAgICAgKiBAcGFyYW0gc2xpZGVcclxuICAgICAqL1xyXG4gICAgdGhpcy5pbml0U2V0U2xpZGUgPSBmdW5jdGlvbiAoc2xpZGUpIHtcclxuICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIHNsaWRlO1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNsaWRlKHRoaXMuZGF0YS51cmxzLmluZGV4T2Yoc2xpZGUpICsgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTbGlkZShzbGlkZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTbGlkZSgxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvdyBkb20gb2YgZnNMaWdodGJveCBpbnN0YW5jZSBpZiBleGlzdHNcclxuICAgICAqL1xyXG4gICAgdGhpcy5zaG93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IGVsZW0gPSB0aGlzLmVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxiYXJSZWNvbXBlbnNvci5hZGRSZWNvbXBlbnNlKCk7XHJcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LWZhZGUtb3V0LWNvbXBsZXRlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtb3BlbicpO1xyXG4gICAgICAgIHZvaWQgZWxlbS5vZmZzZXRXaWR0aDtcclxuICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbi1jb21wbGV0ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbSk7XHJcbiAgICAgICAgdGhpcy5vblJlc2l6ZUV2ZW50LmFkZExpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5vblJlc2l6ZUV2ZW50LnJlc2l6ZUxpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudHNDb250cm9sbGVycy5kb2N1bWVudC5rZXlEb3duLmF0dGFjaExpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZVN3aXBpbmcuYWRkV2luZG93RXZlbnRzKCk7XHJcbiAgICAgICAgdGhpcy50aHJvd0V2ZW50KCdzaG93Jyk7XHJcbiAgICAgICAgdGhpcy50aHJvd0V2ZW50KCdvcGVuJyk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZGUgZG9tIG9mIGV4aXN0aW5nIGZzTGlnaHRib3ggaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgdGhpcy5oaWRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEuZnVsbHNjcmVlbikgdGhpcy50b29sYmFyLmNsb3NlRnVsbHNjcmVlbigpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LWZhZGUtb3V0LWNvbXBsZXRlJyk7XHJcbiAgICAgICAgdGhpcy5kYXRhLmZhZGluZ091dCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy50aHJvd0V2ZW50KCdjbG9zZScpO1xyXG4gICAgICAgIHRoaXMub25SZXNpemVFdmVudC5yZW1vdmVMaXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVTd2lwaW5nLnJlbW92ZVdpbmRvd0V2ZW50cygpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzQ29udHJvbGxlcnMuZG9jdW1lbnQua2V5RG93bi5yZW1vdmVMaXN0ZW5lcigpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5zY3JvbGxiYXJSZWNvbXBlbnNvci5yZW1vdmVSZWNvbXBlbnNlKCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LW9wZW4nKTtcclxuICAgICAgICAgICAgX3RoaXMuZGF0YS5mYWRpbmdPdXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChfdGhpcy5lbGVtZW50KTtcclxuICAgICAgICB9LCAyNTApO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVNsaWRlTnVtYmVyID0gZnVuY3Rpb24gKG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZGF0YS5zbGlkZSA9IG51bWJlcjtcclxuICAgICAgICBpZiAodGhpcy5kYXRhLnRvdGFsU2xpZGVzID4gMSlcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnNsaWRlQ291bnRlckVsZW0uaW5uZXJIVE1MID0gbnVtYmVyO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnRocm93RXZlbnQgPSBmdW5jdGlvbiAoZXZlbnROYW1lKSB7XHJcbiAgICAgICAgbGV0IGV2ZW50O1xyXG4gICAgICAgIGlmICh0eXBlb2YgKEV2ZW50KSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudChldmVudE5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XHJcbiAgICAgICAgICAgIGV2ZW50LmluaXRFdmVudChldmVudE5hbWUsIHRydWUsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZWxlbWVudCA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LWNvbnRhaW5lcicsICdmc2xpZ2h0Ym94LWZ1bGwtZGltZW5zaW9uJ10pO1xyXG4gICAgdGhpcy5tZWRpYUhvbGRlciA9IG5ldyAocmVxdWlyZSgnLi9Db21wb25lbnRzL01lZGlhSG9sZGVyJykpO1xyXG4gICAgY29uc3QgZG9tUmVuZGVyZXIgPSBuZXcgKHJlcXVpcmUoJy4vQ29yZS9Eb21SZW5kZXJlcicpKSh0aGlzKTtcclxuICAgIHRoaXMuc3RhZ2VTb3VyY2VJbmRleGVzID0gbmV3IChyZXF1aXJlKCcuL0NvcmUvU3RhZ2VTb3VyY2VzSW5kZXhlcycpKSh0aGlzLmRhdGEpO1xyXG4gICAgdGhpcy5rZXlib2FyZENvbnRyb2xsZXIgPSBuZXcgKHJlcXVpcmUoJy4vQ29yZS9LZXlib2FyZENvbnRyb2xsZXInKSkodGhpcyk7XHJcbiAgICBuZXcgKHJlcXVpcmUoJy4vQ29yZS9TY3JvbGxiYXJXaWR0aEdldHRlcicpKSh0aGlzLmRhdGEpLmdldFdpZHRoKCk7XHJcbiAgICB0aGlzLm9uUmVzaXplRXZlbnQgPSBuZXcgKHJlcXVpcmUoJy4vb25SZXNpemVFdmVudCcpKSh0aGlzKTtcclxuICAgIHRoaXMuc2Nyb2xsYmFyUmVjb21wZW5zb3IgPSBuZXcgKHJlcXVpcmUoJy4vQ29yZS9TY3JvbGxiYXJSZWNvbXBlbnNvcicpKSh0aGlzLmRhdGEuc2Nyb2xsYmFyV2lkdGgpO1xyXG4gICAgdGhpcy5zbGlkZVRyYW5zZm9ybWVyID0gbmV3IChyZXF1aXJlKCcuL0NvcmUvU2xpZGVUcmFuc2Zvcm1lcicpKSh0aGlzLmRhdGEuc2xpZGVEaXN0YW5jZSk7XHJcbiAgICB0aGlzLnNsaWRlU3dpcGluZyA9IG51bGw7XHJcbiAgICB0aGlzLnRvb2xiYXIgPSBuZXcgKHJlcXVpcmUoJy4vQ29tcG9uZW50cy9Ub29sYmFyJykpKHRoaXMpO1xyXG4gICAgdGhpcy5TVkdJY29uID0gcmVxdWlyZSgnLi9Db21wb25lbnRzL1NWR0ljb24nKTtcclxuICAgIHRoaXMuYXBwZW5kTWV0aG9kcyA9IG5ldyAocmVxdWlyZSgnLi9hcHBlbmRNZXRob2RzJykpKHRoaXMpO1xyXG4gICAgdGhpcy5ldmVudHNDb250cm9sbGVycyA9IHtcclxuICAgICAgICBkb2N1bWVudDoge1xyXG4gICAgICAgICAgICBrZXlEb3duOiBuZXcgKHJlcXVpcmUoJy4vQ29yZS9ldmVudHMtY29udHJvbGxlcnMvRG9jdW1lbnRLZXlEb3duRXZlbnRDb250cm9sbGVyJykpKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3BsYXkgc291cmNlIChpbWFnZXMsIEhUTUw1IHZpZGVvLCBZb3VUdWJlIHZpZGVvKSBkZXBlbmRpbmcgb24gZ2l2ZW4gdXJsIGZyb20gdXNlclxyXG4gICAgICogT3IgaWYgZGlzcGxheSBpcyBpbml0aWFsIGRpc3BsYXkgMyBpbml0aWFsIHNvdXJjZXNcclxuICAgICAqIElmIHRoZXJlIGFyZSA+PSAzIGluaXRpYWwgc291cmNlcyB0aGVyZSB3aWxsIGJlIGFsd2F5cyAzIGluIHN0YWdlXHJcbiAgICAgKiBAcGFyYW0gdHlwZU9mTG9hZFxyXG4gICAgICogQHBhcmFtIHNsaWRlXHJcbiAgICAgKiBAcmV0dXJucyB7bW9kdWxlLmV4cG9ydHN9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubG9hZHNvdXJjZXMgPSBmdW5jdGlvbiAodHlwZU9mTG9hZCwgc2xpZGUpIHtcclxuICAgICAgICBjb25zdCBsb2Fkc291cmNlbW9kdWxlID0gcmVxdWlyZShcIi4vbG9hZFNvdXJjZS5qc1wiKTtcclxuICAgICAgICByZXR1cm4gbmV3IGxvYWRzb3VyY2Vtb2R1bGUodGhpcywgdHlwZU9mTG9hZCwgc2xpZGUpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wIHZpZGVvcyBhZnRlciBjaGFuZ2luZyBzbGlkZVxyXG4gICAgICovXHJcbiAgICB0aGlzLnN0b3BWaWRlb3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3QgdmlkZW9zID0gdGhpcy5kYXRhLnZpZGVvcztcclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gdGhpcy5kYXRhLnNvdXJjZXM7XHJcblxyXG4gICAgICAgIC8vIHRydWUgaXMgaHRtbDUgdmlkZW8sIGZhbHNlIGlzIHlvdXR1YmUgdmlkZW9cclxuICAgICAgICBmb3IgKGxldCB2aWRlb0luZGV4IGluIHZpZGVvcykge1xyXG4gICAgICAgICAgICBpZiAodmlkZW9zW3ZpZGVvSW5kZXhdID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNvdXJjZXNbdmlkZW9JbmRleF0uZmlyc3RDaGlsZC5wYXVzZSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZXNbdmlkZW9JbmRleF0uZmlyc3RDaGlsZC5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc291cmNlc1t2aWRlb0luZGV4XS5maXJzdENoaWxkLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoJ3tcImV2ZW50XCI6XCJjb21tYW5kXCIsXCJmdW5jXCI6XCJzdG9wVmlkZW9cIixcImFyZ3NcIjpcIlwifScsICcqJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuc2V0U2xpZGUgPSBmdW5jdGlvbiAoc2xpZGUpIHtcclxuICAgICAgICB0aGlzLmRhdGEuc2xpZGUgPSBzbGlkZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlTnVtYmVyKHNsaWRlKTtcclxuICAgICAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IHRoaXMuc3RhZ2VTb3VyY2VJbmRleGVzLmFsbChzbGlkZSk7XHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IHRoaXMuZGF0YS5zb3VyY2VzO1xyXG5cclxuICAgICAgICBpZiAoc291cmNlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5sb2Fkc291cmNlcygnaW5pdGlhbCcsIHNsaWRlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdID09PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2Fkc291cmNlcygncHJldmlvdXMnLCBzbGlkZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdID09PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2Fkc291cmNlcygnY3VycmVudCcsIHNsaWRlKTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0gPT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRzb3VyY2VzKCduZXh0Jywgc2xpZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgc291cmNlSW5kZXggaW4gc291cmNlcykge1xyXG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZUluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBzb3VyY2VzIGxlbmd0aCBuZWVkcyB0byBiZSBoaWdoZXIgdGhhbiAxIGJlY2F1c2UgaWYgdGhlcmUgaXMgb25seSAxIHNsaWRlXHJcbiAgICAgICAgICAgIC8vIHNvdXJjZXNJbmRleGVzLnByZXZpb3VzIHdpbGwgYmUgMCBzbyBpdCB3b3VsZCByZXR1cm4gYSBiYWQgdHJhbnNpdGlvblxyXG4gICAgICAgICAgICBpZiAoc291cmNlSW5kZXggPT0gc291cmNlc0luZGV4ZXMucHJldmlvdXMgJiYgc291cmNlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlVHJhbnNmb3JtZXIubWludXMoc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10pO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNvdXJjZUluZGV4ID09IHNvdXJjZXNJbmRleGVzLmN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVUcmFuc2Zvcm1lci56ZXJvKHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0pO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNvdXJjZUluZGV4ID09IHNvdXJjZXNJbmRleGVzLm5leHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVUcmFuc2Zvcm1lci5wbHVzKHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0pO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVUcmFuc2Zvcm1lci5taW51cyhzb3VyY2VzW3NvdXJjZUluZGV4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcblxyXG4hZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmZzTGlnaHRib3hJbnN0YW5jZXMgPSBbXTtcclxuICAgIHdpbmRvdy5mc0xpZ2h0Ym94SGVscGVycyA9IHtcclxuICAgICAgICBcImFcIjogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgYSA9IHdpbmRvdy5mc0xpZ2h0Ym94SGVscGVycy5hO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICBpZiAoIWFbaV0uaGFzQXR0cmlidXRlKCdkYXRhLWZzbGlnaHRib3gnKSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGJveE5hbWUgPSBhW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1mc2xpZ2h0Ym94Jyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuZnNMaWdodGJveEluc3RhbmNlc1tib3hOYW1lXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB3aW5kb3cuZnNMaWdodGJveCA9IG5ldyB3aW5kb3cuZnNMaWdodGJveENsYXNzKCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5mc0xpZ2h0Ym94LmRhdGEubmFtZSA9IGJveE5hbWU7XHJcbiAgICAgICAgICAgIHdpbmRvdy5mc0xpZ2h0Ym94SW5zdGFuY2VzW2JveE5hbWVdID0gd2luZG93LmZzTGlnaHRib3g7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBsZXQgZ2FsbGVyeSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWZzbGlnaHRib3gnKTtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5mc0xpZ2h0Ym94SW5zdGFuY2VzW2dhbGxlcnldLmRhdGEuaW5pdGlhdGVkKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuZnNMaWdodGJveEluc3RhbmNlc1tnYWxsZXJ5XS5zZXRTbGlkZShcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZnNMaWdodGJveEluc3RhbmNlc1tnYWxsZXJ5XS5kYXRhLnVybHMuaW5kZXhPZih0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpKSArIDFcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuZnNMaWdodGJveEluc3RhbmNlc1tnYWxsZXJ5XS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2luZG93LmZzTGlnaHRib3hJbnN0YW5jZXNbZ2FsbGVyeV0uaW5pdCh0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufShkb2N1bWVudCwgd2luZG93KTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZnNMaWdodGJveCwgdHlwZU9mTG9hZCwgc2xpZGUpIHtcclxuXHJcbiAgICBjb25zdCBET01PYmplY3QgPSByZXF1aXJlKCcuL0NvbXBvbmVudHMvRE9NT2JqZWN0Jyk7XHJcblxyXG4gICAgY29uc3Qgc291cmNlc0luZGV4ZXMgPSBmc0xpZ2h0Ym94LnN0YWdlU291cmNlSW5kZXhlcy5hbGwoc2xpZGUpO1xyXG4gICAgY29uc3QgdXJscyA9IGZzTGlnaHRib3guZGF0YS51cmxzO1xyXG4gICAgY29uc3Qgc291cmNlcyA9IGZzTGlnaHRib3guZGF0YS5zb3VyY2VzO1xyXG5cclxuXHJcbiAgICBjb25zdCBhcHBlbmQgPSBmdW5jdGlvbiAoc291cmNlSG9sZGVyLCBzb3VyY2VFbGVtKSB7XHJcbiAgICAgICAgc291cmNlSG9sZGVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIHNvdXJjZUhvbGRlci5hcHBlbmRDaGlsZChzb3VyY2VFbGVtKTtcclxuICAgICAgICB2b2lkIHNvdXJjZUhvbGRlci5maXJzdENoaWxkLm9mZnNldFdpZHRoO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgb25sb2FkTGlzdGVuZXIgPSBmdW5jdGlvbiAoc291cmNlRWxlbSwgc291cmNlV2lkdGgsIHNvdXJjZUhlaWdodCwgYXJyYXlJbmRleCkge1xyXG5cclxuICAgICAgICBsZXQgc291cmNlSG9sZGVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc291cmNlLWhvbGRlciddKTtcclxuXHJcbiAgICAgICAgLy9ub3JtYWwgc291cmNlIGRpbWVuc2lvbnMgbmVlZHMgdG8gYmUgc3RvcmVkIGluIGFycmF5XHJcbiAgICAgICAgLy9pdCB3aWxsIGJlIG5lZWRlZCB3aGVuIHJlc2l6aW5nIGEgc291cmNlXHJcbiAgICAgICAgZnNMaWdodGJveC5kYXRhLnJlbWVtYmVyZWRTb3VyY2VzRGltZW5zaW9uc1thcnJheUluZGV4XSA9IHtcclxuICAgICAgICAgICAgXCJ3aWR0aFwiOiBzb3VyY2VXaWR0aCxcclxuICAgICAgICAgICAgXCJoZWlnaHRcIjogc291cmNlSGVpZ2h0XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzb3VyY2VIb2xkZXIuYXBwZW5kQ2hpbGQoc291cmNlRWxlbSk7XHJcbiAgICAgICAgYXBwZW5kKHNvdXJjZXNbYXJyYXlJbmRleF0sIHNvdXJjZUVsZW0pO1xyXG4gICAgICAgIGZzTGlnaHRib3gub25SZXNpemVFdmVudC5zY2FsZVNvdXJjZShhcnJheUluZGV4KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIGNvbnN0IGxvYWRZb3V0dWJldmlkZW8gPSBmdW5jdGlvbiAodmlkZW9JZCwgYXJyYXlJbmRleCkge1xyXG4gICAgICAgIGxldCBpZnJhbWUgPSBuZXcgRE9NT2JqZWN0KCdpZnJhbWUnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zb3VyY2UnXSk7XHJcbiAgICAgICAgaWZyYW1lLnNyYyA9ICcvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8nICsgdmlkZW9JZCArICc/ZW5hYmxlanNhcGk9MSc7XHJcbiAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3dmdWxsc2NyZWVuJywgJycpO1xyXG4gICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2ZyYW1lYm9yZGVyJywgJzAnKTtcclxuICAgICAgICBmc0xpZ2h0Ym94Lm1lZGlhSG9sZGVyLmFwcGVuZENoaWxkKGlmcmFtZSk7XHJcbiAgICAgICAgb25sb2FkTGlzdGVuZXIoaWZyYW1lLCAxOTIwLCAxMDgwLCBhcnJheUluZGV4KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgbG9hZFZpbWVvdmlkZW8gPSBmdW5jdGlvbiAodmlkZW9JZCwgYXJyYXlJbmRleCkge1xyXG4gICAgICAgIGxldCBpZnJhbWUgPSBuZXcgRE9NT2JqZWN0KCdpZnJhbWUnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zb3VyY2UnXSk7XHJcbiAgICAgICAgaWZyYW1lLnNyYyA9ICcvL3BsYXllci52aW1lby5jb20vdmlkZW8vJyArIHZpZGVvSWQ7XHJcbiAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3dmdWxsc2NyZWVuJywgJycpO1xyXG4gICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2ZyYW1lYm9yZGVyJywgJzAnKTtcclxuICAgICAgICBmc0xpZ2h0Ym94Lm1lZGlhSG9sZGVyLmFwcGVuZENoaWxkKGlmcmFtZSk7XHJcbiAgICAgICAgb25sb2FkTGlzdGVuZXIoaWZyYW1lLCAxOTIwLCAxMDgwLCBhcnJheUluZGV4KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIGNvbnN0IGltYWdlTG9hZCA9IGZ1bmN0aW9uIChzcmMsIGFycmF5SW5kZXgpIHtcclxuICAgICAgICBsZXQgc291cmNlRWxlbSA9IG5ldyBET01PYmplY3QoJ2ltZycpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNvdXJjZSddKTtcclxuICAgICAgICBzb3VyY2VFbGVtLnNyYyA9IHNyYztcclxuICAgICAgICBzb3VyY2VFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG9ubG9hZExpc3RlbmVyKHNvdXJjZUVsZW0sIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBhcnJheUluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIGNvbnN0IHZpZGVvTG9hZCA9IGZ1bmN0aW9uIChzcmMsIGFycmF5SW5kZXgsIHR5cGUpIHtcclxuICAgICAgICBsZXQgdmlkZW9Mb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgdmlkZW9FbGVtID0gbmV3IERPTU9iamVjdCgndmlkZW8nKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zb3VyY2UnXSk7XHJcbiAgICAgICAgbGV0IHNvdXJjZSA9IG5ldyBET01PYmplY3QoJ3NvdXJjZScpLmVsZW07XHJcbiAgICAgICAgaWYgKGZzTGlnaHRib3guZGF0YS52aWRlb3NQb3N0ZXJzW2FycmF5SW5kZXhdKSB7XHJcbiAgICAgICAgICAgIHZpZGVvRWxlbS5wb3N0ZXIgPSBmc0xpZ2h0Ym94LmRhdGEudmlkZW9zUG9zdGVyc1thcnJheUluZGV4XTtcclxuICAgICAgICAgICAgdmlkZW9FbGVtLnN0eWxlLm9iamVjdEZpdCA9ICdjb3Zlcic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNvdXJjZS5zcmMgPSBzcmM7XHJcbiAgICAgICAgc291cmNlLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHZpZGVvRWxlbS5hcHBlbmRDaGlsZChzb3VyY2UpO1xyXG4gICAgICAgIGxldCB3aWR0aDtcclxuICAgICAgICBsZXQgaGVpZ2h0O1xyXG4gICAgICAgIHZpZGVvRWxlbS5vbmxvYWRlZG1ldGFkYXRhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodmlkZW9Mb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBpZiBicm93c2VyIGRvbid0IHN1cHBvcnQgdmlkZW9XaWR0aCBhbmQgdmlkZW9IZWlnaHQgd2UgbmVlZCB0byBhZGQgZGVmYXVsdCBvbmVzXHJcbiAgICAgICAgICAgIGlmICghdGhpcy52aWRlb1dpZHRoIHx8IHRoaXMudmlkZW9XaWR0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgd2lkdGggPSAxOTIwO1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gMTA4MDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdpZHRoID0gdGhpcy52aWRlb1dpZHRoO1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gdGhpcy52aWRlb0hlaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2aWRlb0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIG9ubG9hZExpc3RlbmVyKHZpZGVvRWxlbSwgd2lkdGgsIGhlaWdodCwgYXJyYXlJbmRleCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gaWYgYnJvd3NlciBkb24ndCBzdXBwcnQgYm90aCBvbmxvYWRtZXRhZGF0YSBvciAudmlkZW9XaWR0aCB3ZSB3aWxsIGxvYWQgaXQgYWZ0ZXIgMzAwMG1zXHJcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICAvLyBPTiBJRSBvbiBsb2FkIGV2ZW50IGRvbnQgd29yayBzbyB3ZSBuZWVkIHRvIHdhaXQgZm9yIGRpbWVuc2lvbnMgd2l0aCBzZXRUaW1lb3V0c1xyXG4gICAgICAgIGxldCBJRUZpeCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh2aWRlb0xvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChJRUZpeCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF2aWRlb0VsZW0udmlkZW9XaWR0aCB8fCB2aWRlb0VsZW0udmlkZW9XaWR0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIgPCAzMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoID0gMTkyMDtcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSAxMDgwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2lkdGggPSB2aWRlb0VsZW0udmlkZW9XaWR0aDtcclxuICAgICAgICAgICAgICAgIGhlaWdodCA9IHZpZGVvRWxlbS52aWRlb0hlaWdodDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmlkZW9Mb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBvbmxvYWRMaXN0ZW5lcih2aWRlb0VsZW0sIHdpZHRoLCBoZWlnaHQsIGFycmF5SW5kZXgpO1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKElFRml4KTtcclxuICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICB2aWRlb0VsZW0uc2V0QXR0cmlidXRlKCdjb250cm9scycsICcnKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaW52YWxpZEZpbGUgPSBmdW5jdGlvbiAoYXJyYXlJbmRleCkge1xyXG4gICAgICAgIGxldCBpbnZhbGlkRmlsZVdyYXBwZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtaW52YWxpZC1maWxlLXdyYXBwZXInLCAnZnNsaWdodGJveC1mbGV4LWNlbnRlcmVkJ10pO1xyXG4gICAgICAgIGludmFsaWRGaWxlV3JhcHBlci5pbm5lckhUTUwgPSAnSW52YWxpZCBmaWxlJztcclxuXHJcbiAgICAgICAgb25sb2FkTGlzdGVuZXIoaW52YWxpZEZpbGVXcmFwcGVyLCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0LCBhcnJheUluZGV4KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbSA9IGZ1bmN0aW9uICh1cmxJbmRleCkge1xyXG4gICAgICAgIGNvbnN0IHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICBjb25zdCBzb3VyY2VVcmwgPSBmc0xpZ2h0Ym94LmRhdGEudXJsc1t1cmxJbmRleF07XHJcblxyXG4gICAgICAgIHBhcnNlci5ocmVmID0gc291cmNlVXJsO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRZb3V0dWJlSWQoc291cmNlVXJsKSB7XHJcbiAgICAgICAgICAgIGxldCByZWdFeHAgPSAvXi4qKHlvdXR1LmJlXFwvfHZcXC98dVxcL1xcd1xcL3xlbWJlZFxcL3x3YXRjaFxcP3Y9fFxcJnY9KShbXiNcXCZcXD9dKikuKi87XHJcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IHNvdXJjZVVybC5tYXRjaChyZWdFeHApO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1hdGNoICYmIG1hdGNoWzJdLmxlbmd0aCA9PSAxMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoWzJdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdlcnJvcic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFZpbWVvSWQoc291cmNlVXJsKSB7XHJcbiAgICAgICAgICAgIGxldCByZWdFeHAgPSAvKD86d3d3XFwufHBsYXllclxcLik/dmltZW8uY29tXFwvKD86Y2hhbm5lbHNcXC8oPzpcXHcrXFwvKT98Z3JvdXBzXFwvKD86W15cXC9dKilcXC92aWRlb3NcXC98YWxidW1cXC8oPzpcXGQrKVxcL3ZpZGVvXFwvfHZpZGVvXFwvfCkoXFxkKykoPzpbYS16QS1aMC05X1xcLV0rKT8vaTtcclxuICAgICAgICAgICAgbGV0IG1hdGNoID0gc291cmNlVXJsLm1hdGNoKHJlZ0V4cCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaFsxXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnZXJyb3InO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyc2VyLmhvc3RuYW1lID09PSAnd3d3LnlvdXR1YmUuY29tJykge1xyXG4gICAgICAgICAgICBmc0xpZ2h0Ym94LmRhdGEudmlkZW9zW3VybEluZGV4XSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsb2FkWW91dHViZXZpZGVvKGdldFlvdXR1YmVJZChzb3VyY2VVcmwpLCB1cmxJbmRleCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYXJzZXIuaG9zdG5hbWUgPT09ICd2aW1lby5jb20nKSB7XHJcbiAgICAgICAgICAgIGZzTGlnaHRib3guZGF0YS52aWRlb3NbdXJsSW5kZXhdID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxvYWRWaW1lb3ZpZGVvKGdldFZpbWVvSWQoc291cmNlVXJsKSwgdXJsSW5kZXgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDAgfHwgeGhyLnN0YXR1cyA9PT0gMjA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgd2hhdCB0eXBlIG9mIGZpbGUgcHJvdmlkZWQgZnJvbSBsaW5rXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlVHlwZSA9IHhoci5nZXRSZXNwb25zZUhlYWRlcignY29udGVudC10eXBlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFUeXBlID0gcmVzcG9uc2VUeXBlLnNsaWNlKDAsIHJlc3BvbnNlVHlwZS5pbmRleE9mKCcvJykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFUeXBlID09PSAnaW1hZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZUxvYWQodXJsc1t1cmxJbmRleF0sIHVybEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhVHlwZSA9PT0gJ3ZpZGVvJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9Mb2FkKHVybHNbdXJsSW5kZXhdLCB1cmxJbmRleCwgcmVzcG9uc2VUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZzTGlnaHRib3guZGF0YS52aWRlb3NbdXJsSW5kZXhdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludmFsaWRGaWxlKHVybEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludmFsaWRGaWxlKHVybEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgeGhyLmFib3J0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB4aHIub3BlbignZ2V0Jywgc291cmNlVXJsLCB0cnVlKTtcclxuICAgICAgICAgICAgeGhyLnNlbmQobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgaWYgKHR5cGVPZkxvYWQgPT09ICdpbml0aWFsJykge1xyXG4gICAgICAgIC8vYXBwZW5kIGxvYWRlciB3aGVuIGxvYWRpbmcgaW5pdGlhbGx5XHJcbiAgICAgICAgZnNMaWdodGJveC5hcHBlbmRNZXRob2RzLnJlbmRlckhvbGRlckluaXRpYWwoc2xpZGUsIERPTU9iamVjdCk7XHJcblxyXG4gICAgICAgIGlmICh1cmxzLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbShzb3VyY2VzSW5kZXhlcy5jdXJyZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh1cmxzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbShzb3VyY2VzSW5kZXhlcy5uZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh1cmxzLmxlbmd0aCA+PSAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbShzb3VyY2VzSW5kZXhlcy5wcmV2aW91cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBhcHBlbmQgbG9hZGVyIHdoZW4gbG9hZGluZyBhIG5leHQgc291cmNlXHJcbiAgICAgICAgZnNMaWdodGJveC5hcHBlbmRNZXRob2RzLnJlbmRlckhvbGRlcihzbGlkZSwgdHlwZU9mTG9hZCk7XHJcblxyXG4gICAgICAgIHN3aXRjaCAodHlwZU9mTG9hZCkge1xyXG4gICAgICAgICAgICBjYXNlICdwcmV2aW91cyc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc291cmNlc0luZGV4ZXMucHJldmlvdXMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2N1cnJlbnQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNvdXJjZXNJbmRleGVzLmN1cnJlbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ25leHQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNvdXJjZXNJbmRleGVzLm5leHQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmc0xpZ2h0Ym94KSB7XHJcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XHJcbiAgICBjb25zdCBzb3VyY2VzID0gZnNMaWdodGJveC5kYXRhLnNvdXJjZXM7XHJcbiAgICBjb25zdCByZW1lbWJlcmVkU291cmNlRGltZW5zaW9uID0gZnNMaWdodGJveC5kYXRhLnJlbWVtYmVyZWRTb3VyY2VzRGltZW5zaW9ucztcclxuXHJcbiAgICB0aGlzLm1lZGlhSG9sZGVyRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBtZWRpYUhvbGRlclN0eWxlID0gZnNMaWdodGJveC5tZWRpYUhvbGRlci5zdHlsZTtcclxuICAgICAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKHdpbmRvd1dpZHRoID4gMTAwMCkge1xyXG4gICAgICAgICAgICBtZWRpYUhvbGRlclN0eWxlLndpZHRoID0gKHdpbmRvd1dpZHRoIC0gKDAuMSAqIHdpbmRvd1dpZHRoKSkgKyAncHgnO1xyXG4gICAgICAgICAgICBtZWRpYUhvbGRlclN0eWxlLmhlaWdodCA9ICh3aW5kb3dIZWlnaHQgLSAoMC4xICogd2luZG93SGVpZ2h0KSkgKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1lZGlhSG9sZGVyU3R5bGUud2lkdGggPSB3aW5kb3dXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIG1lZGlhSG9sZGVyU3R5bGUuaGVpZ2h0ID0gKHdpbmRvd0hlaWdodCAtICgwLjEgKiB3aW5kb3dIZWlnaHQpKSArICdweCc7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5zY2FsZUFuZFRyYW5zZm9ybVNvdXJjZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlc0NvdW50ID0gZnNMaWdodGJveC5kYXRhLnVybHMubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IHN0YWdlU291cmNlc0luZGV4ZXMgPSBmc0xpZ2h0Ym94LnN0YWdlU291cmNlSW5kZXhlcy5hbGwoZnNMaWdodGJveC5kYXRhLnNsaWRlKTtcclxuICAgICAgICBpZiAoc291cmNlc0NvdW50ID4gMCkge1xyXG4gICAgICAgICAgICBmc0xpZ2h0Ym94LnNsaWRlVHJhbnNmb3JtZXIuemVybyhzb3VyY2VzW3N0YWdlU291cmNlc0luZGV4ZXMuY3VycmVudF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNvdXJjZXNDb3VudCA+IDEpIHtcclxuICAgICAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLnBsdXMoc291cmNlc1tzdGFnZVNvdXJjZXNJbmRleGVzLm5leHRdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzb3VyY2VzQ291bnQgPiAyKSB7XHJcbiAgICAgICAgICAgIGZzTGlnaHRib3guc2xpZGVUcmFuc2Zvcm1lci5taW51cyhzb3VyY2VzW3N0YWdlU291cmNlc0luZGV4ZXMucHJldmlvdXNdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc291cmNlc0NvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZVNvdXJjZShpKTtcclxuICAgICAgICAgICAgaWYgKGkgIT09IHN0YWdlU291cmNlc0luZGV4ZXMuY3VycmVudFxyXG4gICAgICAgICAgICAgICAgJiYgaSAhPT0gc3RhZ2VTb3VyY2VzSW5kZXhlcy5uZXh0XHJcbiAgICAgICAgICAgICAgICAmJiBpICE9PSBzdGFnZVNvdXJjZXNJbmRleGVzLnByZXZpb3VzXHJcbiAgICAgICAgICAgICAgICAmJiBzb3VyY2VzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBmc0xpZ2h0Ym94LnNsaWRlVHJhbnNmb3JtZXIucGx1cyhzb3VyY2VzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuc2NhbGVTb3VyY2UgPSBmdW5jdGlvbiAoc291cmNlSW5kZXgpIHtcclxuICAgICAgICBpZiAoIXNvdXJjZXNbc291cmNlSW5kZXhdKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHNvdXJjZXNbc291cmNlSW5kZXhdLmZpcnN0Q2hpbGQ7XHJcbiAgICAgICAgbGV0IHNvdXJjZVdpZHRoID0gcmVtZW1iZXJlZFNvdXJjZURpbWVuc2lvbltzb3VyY2VJbmRleF0ud2lkdGg7XHJcbiAgICAgICAgbGV0IHNvdXJjZUhlaWdodCA9IHJlbWVtYmVyZWRTb3VyY2VEaW1lbnNpb25bc291cmNlSW5kZXhdLmhlaWdodDtcclxuXHJcbiAgICAgICAgY29uc3QgY29lZmZpY2llbnQgPSBzb3VyY2VXaWR0aCAvIHNvdXJjZUhlaWdodDtcclxuICAgICAgICBjb25zdCBkZXZpY2VXaWR0aCA9IHBhcnNlSW50KGZzTGlnaHRib3gubWVkaWFIb2xkZXIuc3R5bGUud2lkdGgpO1xyXG4gICAgICAgIGNvbnN0IGRldmljZUhlaWdodCA9IHBhcnNlSW50KGZzTGlnaHRib3gubWVkaWFIb2xkZXIuc3R5bGUuaGVpZ2h0KTtcclxuICAgICAgICBsZXQgbmV3SGVpZ2h0ID0gZGV2aWNlV2lkdGggLyBjb2VmZmljaWVudDtcclxuXHJcbiAgICAgICAgY29uc3Qgc2V0RGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBuZXdIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSAobmV3SGVpZ2h0ICogY29lZmZpY2llbnQpICsgXCJweFwiO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIHdpZGVyIHRoYW4gaGlnaGVyXHJcbiAgICAgICAgaWYgKG5ld0hlaWdodCA8IGRldmljZUhlaWdodCkge1xyXG4gICAgICAgICAgICBpZiAoc291cmNlV2lkdGggPCBkZXZpY2VXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgbmV3SGVpZ2h0ID0gc291cmNlSGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldERpbWVuc2lvbnMoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9oaWdoZXIgdGhhbiB3aWRlclxyXG4gICAgICAgIGlmIChzb3VyY2VIZWlnaHQgPiBkZXZpY2VIZWlnaHQpIHtcclxuICAgICAgICAgICAgbmV3SGVpZ2h0ID0gZGV2aWNlSGVpZ2h0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld0hlaWdodCA9IHNvdXJjZUhlaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldERpbWVuc2lvbnMoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubWVkaWFIb2xkZXJEaW1lbnNpb25zKCk7XHJcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmFkZExpc3RlbmVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplTGlzdGVuZXIpO1xyXG4gICAgfTtcclxuXHJcbiAgICAgdGhpcy5yZXNpemVMaXN0ZW5lciA9IGZ1bmN0aW9uKCkgIHtcclxuICAgICAgICBfdGhpcy5tZWRpYUhvbGRlckRpbWVuc2lvbnMoKTtcclxuICAgICAgICBfdGhpcy5zY2FsZUFuZFRyYW5zZm9ybVNvdXJjZXMoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUxpc3RlbmVyKTtcclxuICAgIH07XHJcbn07XHJcbiJdfQ==
