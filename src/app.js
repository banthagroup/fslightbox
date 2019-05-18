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
                const previousIndex = self.stageSourceIndexes.previous(self.data.slide) + 1;
                self.setSlide(previousIndex);
                break;
            case RIGHT_ARROW:
                const nextIndex = self.stageSourceIndexes.next(self.data.slide) + 1;
                self.setSlide(nextIndex);
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
        for (let elem in elements) {
            elements[elem].classList.add('fslightbox-cursor-grabbing');
        }
        (e.touches) ?
            mouseDownClientX = e.touches[0].clientX :
            mouseDownClientX = e.clientX;
    };


    const mouseUpEvent = function () {
        if (self.element.contains(invisibleHover)) {
            self.element.removeChild(invisibleHover);
        }
        for (let elem in elements) {
            elements[elem].classList.remove('fslightbox-cursor-grabbing');
        }

        if (!is_dragging) {
            return;
        }
        is_dragging = false;

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

        difference = clientX - mouseDownClientX;
        // if user swiped but there is only one slide we dont want further code to execute but we want to prevent lightbox
        // from closing so we set difference to 1
        if (difference !== 0 && self.data.totalSlides === 1) {
            difference = 1;
            return;
        }
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

    // events-controllers
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9ET01PYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9NZWRpYUhvbGRlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL1NWR0ljb24uanMiLCJzcmMvanMvQ29tcG9uZW50cy9Ub29sYmFyLmpzIiwic3JjL2pzL0NvcmUvRG9tUmVuZGVyZXIuanMiLCJzcmMvanMvQ29yZS9LZXlib2FyZENvbnRyb2xsZXIuanMiLCJzcmMvanMvQ29yZS9TY3JvbGxiYXJSZWNvbXBlbnNvci5qcyIsInNyYy9qcy9Db3JlL1Njcm9sbGJhcldpZHRoR2V0dGVyLmpzIiwic3JjL2pzL0NvcmUvU2xpZGVTd2lwaW5nLmpzIiwic3JjL2pzL0NvcmUvU2xpZGVUcmFuc2Zvcm1lci5qcyIsInNyYy9qcy9Db3JlL1N0YWdlU291cmNlc0luZGV4ZXMuanMiLCJzcmMvanMvQ29yZS9ldmVudHMtY29udHJvbGxlcnMvRG9jdW1lbnRLZXlEb3duRXZlbnRDb250cm9sbGVyLmpzIiwic3JjL2pzL2FwcGVuZE1ldGhvZHMuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvbG9hZFNvdXJjZS5qcyIsInNyYy9qcy9vblJlc2l6ZUV2ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDek1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgICB0aGlzLmVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG5cbiAgICB0aGlzLmFkZENsYXNzZXNBbmRDcmVhdGUgPSBmdW5jdGlvbiAoY2xhc3Nlcykge1xuICAgICAgICBmb3IgKGxldCBpbmRleCBpbiBjbGFzc2VzKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc2VzW2luZGV4XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbVxuICAgIH1cbn07IiwiY29uc3QgRE9NT2JqZWN0ID0gcmVxdWlyZSgnLi9ET01PYmplY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaG9sZGVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtbWVkaWEtaG9sZGVyJ10pO1xuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDEwMDApIHtcbiAgICAgICAgaG9sZGVyLnN0eWxlLndpZHRoID0gKHdpbmRvdy5pbm5lcldpZHRoIC0gMC4xICogd2luZG93LmlubmVyV2lkdGgpICsgJ3B4JztcbiAgICAgICAgaG9sZGVyLnN0eWxlLmhlaWdodCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSAwLjEgKiB3aW5kb3cuaW5uZXJIZWlnaHQpICsgJ3B4JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBob2xkZXIuc3R5bGUud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCArICdweCc7XG4gICAgICAgIGhvbGRlci5zdHlsZS5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKyAncHgnO1xuICAgIH1cbiAgICByZXR1cm4gaG9sZGVyO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBcInN2Z1wiKTtcbiAgICB0aGlzLnN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnY2xhc3MnLCAnZnNsaWdodGJveC1zdmctaWNvbicpO1xuICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICd2aWV3Qm94JywgJzAgMCAxNSAxNScpO1xuICAgIHRoaXMucGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBcInBhdGhcIik7XG4gICAgdGhpcy5wYXRoLnNldEF0dHJpYnV0ZU5TKG51bGwsICdjbGFzcycsICdmc2xpZ2h0Ym94LXN2Zy1wYXRoJyk7XG5cbiAgICB0aGlzLmdldFNWR0ljb24gPSBmdW5jdGlvbiAodmlld0JveCwgZGltZW5zaW9uLCBkKSB7XG4gICAgICAgIHRoaXMucGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZCcsIGQpO1xuICAgICAgICB0aGlzLnN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndmlld0JveCcsIHZpZXdCb3gpO1xuICAgICAgICB0aGlzLnN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnd2lkdGgnLCBkaW1lbnNpb24pO1xuICAgICAgICB0aGlzLnN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaGVpZ2h0JywgZGltZW5zaW9uKTtcbiAgICAgICAgdGhpcy5zdmcuYXBwZW5kQ2hpbGQodGhpcy5wYXRoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ZnO1xuICAgIH1cbn07XG4iLCJjb25zdCBET01PYmplY3QgPSByZXF1aXJlKCcuL0RPTU9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmc0xpZ2h0Ym94KSB7XG4gICAgdGhpcy50b29sYmFyRWxlbSA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXRvb2xiYXInXSk7XG4gICAgY29uc3Qgb3BlbkZ1bGxzY3JlZW5WaWV3Qm94ID0gJzAgMCAxNy41IDE3LjUnO1xuICAgIGNvbnN0IG9wZW5GdWxsc2NyZWVuRCA9ICdNNC41IDExSDN2NGg0di0xLjVINC41VjExek0zIDdoMS41VjQuNUg3VjNIM3Y0em0xMC41IDYuNUgxMVYxNWg0di00aC0xLjV2Mi41ek0xMSAzdjEuNWgyLjVWN0gxNVYzaC00eic7XG4gICAgY29uc3QgY2xvc2VGdWxsc2NyZWVuVmlld0JveCA9ICcwIDAgOTUwIDEwMjQnO1xuICAgIGNvbnN0IGNsb3NlRnVsbHNjcmVlbkQgPSAnTTY4MiAzNDJoMTI4djg0aC0yMTJ2LTIxMmg4NHYxMjh6TTU5OCA4MTB2LTIxMmgyMTJ2ODRoLTEyOHYxMjhoLTg0ek0zNDIgMzQydi0xMjhoODR2MjEyaC0yMTJ2LTg0aDEyOHpNMjE0IDY4MnYtODRoMjEydjIxMmgtODR2LTEyOGgtMTI4eic7XG4gICAgbGV0IGZ1bGxzY3JlZW5Tdmc7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5yZW5kZXJEZWZhdWx0QnV0dG9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHNob3VsZFJlbmRlckJ1dHRvbnMgPSBmc0xpZ2h0Ym94LmRhdGEudG9vbGJhckJ1dHRvbnM7XG5cbiAgICAgICAgaWYgKHNob3VsZFJlbmRlckJ1dHRvbnMuZnVsbHNjcmVlbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXRvb2xiYXItYnV0dG9uJywgJ2ZzbGlnaHRib3gtZmxleC1jZW50ZXJlZCddKTtcbiAgICAgICAgICAgIGZ1bGxzY3JlZW5TdmcgPSBuZXcgZnNMaWdodGJveC5TVkdJY29uKCkuZ2V0U1ZHSWNvbignMCAwIDE3LjUgMTcuNScgK1xuICAgICAgICAgICAgICAgICcnLCAnMjBweCcsIG9wZW5GdWxsc2NyZWVuRCk7XG4gICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoZnVsbHNjcmVlblN2Zyk7XG4gICAgICAgICAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAoZnNMaWdodGJveC5kYXRhLmZ1bGxzY3JlZW4pID9cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2xvc2VGdWxsc2NyZWVuKCkgOlxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5vcGVuRnVsbHNjcmVlbigpO1xuXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy50b29sYmFyRWxlbS5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNob3VsZFJlbmRlckJ1dHRvbnMuY2xvc2UgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGxldCBidXR0b24gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC10b29sYmFyLWJ1dHRvbicsICdmc2xpZ2h0Ym94LWZsZXgtY2VudGVyZWQnXSk7XG4gICAgICAgICAgICBsZXQgc3ZnID0gbmV3IGZzTGlnaHRib3guU1ZHSWNvbigpLmdldFNWR0ljb24oJzAgMCAyMCAyMCcsICcxNnB4JywgJ00gMTEuNDY5IDEwIGwgNy4wOCAtNy4wOCBjIDAuNDA2IC0wLjQwNiAwLjQwNiAtMS4wNjQgMCAtMS40NjkgYyAtMC40MDYgLTAuNDA2IC0xLjA2MyAtMC40MDYgLTEuNDY5IDAgTCAxMCA4LjUzIGwgLTcuMDgxIC03LjA4IGMgLTAuNDA2IC0wLjQwNiAtMS4wNjQgLTAuNDA2IC0xLjQ2OSAwIGMgLTAuNDA2IDAuNDA2IC0wLjQwNiAxLjA2MyAwIDEuNDY5IEwgOC41MzEgMTAgTCAxLjQ1IDE3LjA4MSBjIC0wLjQwNiAwLjQwNiAtMC40MDYgMS4wNjQgMCAxLjQ2OSBjIDAuMjAzIDAuMjAzIDAuNDY5IDAuMzA0IDAuNzM1IDAuMzA0IGMgMC4yNjYgMCAwLjUzMSAtMC4xMDEgMC43MzUgLTAuMzA0IEwgMTAgMTEuNDY5IGwgNy4wOCA3LjA4MSBjIDAuMjAzIDAuMjAzIDAuNDY5IDAuMzA0IDAuNzM1IDAuMzA0IGMgMC4yNjcgMCAwLjUzMiAtMC4xMDEgMC43MzUgLTAuMzA0IGMgMC40MDYgLTAuNDA2IDAuNDA2IC0xLjA2NCAwIC0xLjQ2OSBMIDExLjQ2OSAxMCBaJyk7XG4gICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoc3ZnKTtcbiAgICAgICAgICAgIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghZnNMaWdodGJveC5kYXRhLmZhZGluZ091dCkgZnNMaWdodGJveC5oaWRlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy50b29sYmFyRWxlbS5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgdGhpcy5vcGVuRnVsbHNjcmVlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnNMaWdodGJveC5kYXRhLmZ1bGxzY3JlZW4gPSB0cnVlO1xuICAgICAgICBmdWxsc2NyZWVuU3ZnLmZpcnN0Q2hpbGQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2QnLCBjbG9zZUZ1bGxzY3JlZW5EKTtcbiAgICAgICAgZnVsbHNjcmVlblN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndmlld0JveCcsIGNsb3NlRnVsbHNjcmVlblZpZXdCb3gpO1xuICAgICAgICBmdWxsc2NyZWVuU3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICd3aWR0aCcsICcyNHB4Jyk7XG4gICAgICAgIGZ1bGxzY3JlZW5Tdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2hlaWdodCcsICcyNHB4Jyk7XG4gICAgICAgIGxldCBlbGVtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICBpZiAoZWxlbS5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgZWxlbS5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW0ubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgIGVsZW0ubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBlbGVtLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbS5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBlbGVtLm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmNsb3NlRnVsbHNjcmVlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnNMaWdodGJveC5kYXRhLmZ1bGxzY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgZnVsbHNjcmVlblN2Zy5maXJzdENoaWxkLnNldEF0dHJpYnV0ZU5TKG51bGwsICdkJywgb3BlbkZ1bGxzY3JlZW5EKTtcbiAgICAgICAgZnVsbHNjcmVlblN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndmlld0JveCcsIG9wZW5GdWxsc2NyZWVuVmlld0JveCk7XG4gICAgICAgIGZ1bGxzY3JlZW5Tdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3dpZHRoJywgJzIwcHgnKTtcbiAgICAgICAgZnVsbHNjcmVlblN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaGVpZ2h0JywgJzIwcHgnKTtcbiAgICAgICAgaWYgKGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5yZW5kZXJUb29sYmFyID0gZnVuY3Rpb24gKG5hdikge1xuICAgICAgICB0aGlzLnJlbmRlckRlZmF1bHRCdXR0b25zKCk7XG4gICAgICAgIG5hdi5hcHBlbmRDaGlsZCh0aGlzLnRvb2xiYXJFbGVtKTtcbiAgICB9O1xufTsiLCJjb25zdCBET01PYmplY3QgPSByZXF1aXJlKCcuLi9Db21wb25lbnRzL0RPTU9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmc0xpZ2h0Ym94KSB7XG4gICAgdGhpcy5yZW5kZXJET00gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZzTGlnaHRib3guZWxlbWVudC5pZCA9IFwiZnNsaWdodGJveC1jb250YWluZXJcIjtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmc0xpZ2h0Ym94LmVsZW1lbnQpO1xuXG4gICAgICAgIC8vcmVuZGVyIHNsaWRlIGJ1dHRvbnMgYW5kIG5hdih0b29sYmFyKVxuICAgICAgICByZW5kZXJOYXYoZnNMaWdodGJveC5lbGVtZW50KTtcblxuICAgICAgICBpZiAoZnNMaWdodGJveC5kYXRhLnRvdGFsU2xpZGVzID4gMSkge1xuICAgICAgICAgICAgcmVuZGVyU2xpZGVCdXR0b25zKGZzTGlnaHRib3guZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZnNMaWdodGJveC5lbGVtZW50LmFwcGVuZENoaWxkKGZzTGlnaHRib3gubWVkaWFIb2xkZXIpO1xuICAgICAgICBmc0xpZ2h0Ym94LmVsZW1lbnQuYXBwZW5kQ2hpbGQoZ2V0RG93bkV2ZW50RGV0ZWN0b3IoKSk7XG4gICAgICAgIGZzTGlnaHRib3guZGF0YS5pc2ZpcnN0VGltZUxvYWQgPSB0cnVlO1xuICAgIH07XG5cbiAgICBjb25zdCBnZXREb3duRXZlbnREZXRlY3RvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZzTGlnaHRib3guZGF0YS5kb3duRXZlbnREZXRlY3RvciA9IG5ldyBET01PYmplY3QoJ2RpdicpXG4gICAgICAgICAgICAuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtZG93bi1ldmVudC1kZXRlY3RvcicsICdmc2xpZ2h0Ym94LWZ1bGwtZGltZW5zaW9uJ10pO1xuICAgIH07XG5cbiAgICBjb25zdCBzbGlkZUNvdW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBudW1iZXJDb250YWluZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1udW1iZXItY29udGFpbmVyJywgJ2ZzbGlnaHRib3gtZmxleC1jZW50ZXJlZCddKTtcbiAgICAgICAgZnNMaWdodGJveC5kYXRhLnNsaWRlQ291bnRlckVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3Qgc2xpZGVDb3VudGVyRWxlbSA9IGZzTGlnaHRib3guZGF0YS5zbGlkZUNvdW50ZXJFbGVtO1xuXG4gICAgICAgIHNsaWRlQ291bnRlckVsZW0uaW5uZXJIVE1MID0gZnNMaWdodGJveC5kYXRhLnNsaWRlO1xuICAgICAgICBzbGlkZUNvdW50ZXJFbGVtLmlkID0gJ2N1cnJlbnRfc2xpZGUnO1xuXG4gICAgICAgIGxldCBzcGFjZSA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsYXNoJ10pO1xuICAgICAgICBzcGFjZS5pbm5lckhUTUwgPSAnLyc7XG5cbiAgICAgICAgbGV0IHNsaWRlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzbGlkZXMuaW5uZXJIVE1MID0gZnNMaWdodGJveC5kYXRhLnRvdGFsU2xpZGVzO1xuXG4gICAgICAgIG51bWJlckNvbnRhaW5lci5hcHBlbmRDaGlsZChzbGlkZUNvdW50ZXJFbGVtKTtcbiAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNwYWNlKTtcbiAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNsaWRlcyk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJTbGlkZUNvdW50ZXIgPSBmdW5jdGlvbiAobmF2KSB7XG4gICAgICAgICAgICBpZiAoZnNMaWdodGJveC5kYXRhLnNsaWRlQ291bnRlcilcbiAgICAgICAgICAgICAgICBuYXYuYXBwZW5kQ2hpbGQobnVtYmVyQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIGNvbnN0IHJlbmRlck5hdiA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcbiAgICAgICAgZnNMaWdodGJveC5kYXRhLm5hdiA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LW5hdiddKTtcbiAgICAgICAgZnNMaWdodGJveC50b29sYmFyLnJlbmRlclRvb2xiYXIoZnNMaWdodGJveC5kYXRhLm5hdik7XG5cbiAgICAgICAgaWYgKGZzTGlnaHRib3guZGF0YS50b3RhbFNsaWRlcyA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ZXIgPSBuZXcgc2xpZGVDb3VudGVyKCk7XG4gICAgICAgICAgICBjb3VudGVyLnJlbmRlclNsaWRlQ291bnRlcihmc0xpZ2h0Ym94LmRhdGEubmF2KTtcbiAgICAgICAgfVxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZnNMaWdodGJveC5kYXRhLm5hdik7XG5cbiAgICB9O1xuXG4gICAgY29uc3QgY3JlYXRlQlROID0gZnVuY3Rpb24gKGJ1dHRvbkNvbnRhaW5lciwgY29udGFpbmVyLCBkKSB7XG4gICAgICAgIGxldCBidG4gPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zbGlkZS1idG4nLCAnZnNsaWdodGJveC1mbGV4LWNlbnRlcmVkJ10pO1xuICAgICAgICBidG4uYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBuZXcgZnNMaWdodGJveC5TVkdJY29uKCkuZ2V0U1ZHSWNvbignMCAwIDIwIDIwJywgJzIycHgnLCBkKVxuICAgICAgICApO1xuICAgICAgICBidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbkNvbnRhaW5lcik7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlbmRlclNsaWRlQnV0dG9ucyA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcbiAgICAgICAgaWYgKGZzTGlnaHRib3guZGF0YS5zbGlkZUJ1dHRvbnMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy9yZW5kZXIgbGVmdCBidG5cbiAgICAgICAgbGV0IGxlZnRfYnRuX2NvbnRhaW5lciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLWJ0bi1jb250YWluZXInLCAnZnNsaWdodGJveC1zbGlkZS1idG4tbGVmdC1jb250YWluZXInXSk7XG4gICAgICAgIGNyZWF0ZUJUTihsZWZ0X2J0bl9jb250YWluZXIsIGNvbnRhaW5lciwgJ00xOC4yNzEsOS4yMTJIMy42MTVsNC4xODQtNC4xODRjMC4zMDYtMC4zMDYsMC4zMDYtMC44MDEsMC0xLjEwN2MtMC4zMDYtMC4zMDYtMC44MDEtMC4zMDYtMS4xMDcsMEwxLjIxLDkuNDAzQzEuMTk0LDkuNDE3LDEuMTc0LDkuNDIxLDEuMTU4LDkuNDM3Yy0wLjE4MSwwLjE4MS0wLjI0MiwwLjQyNS0wLjIwOSwwLjY2YzAuMDA1LDAuMDM4LDAuMDEyLDAuMDcxLDAuMDIyLDAuMTA5YzAuMDI4LDAuMDk4LDAuMDc1LDAuMTg4LDAuMTQyLDAuMjcxYzAuMDIxLDAuMDI2LDAuMDIxLDAuMDYxLDAuMDQ1LDAuMDg1YzAuMDE1LDAuMDE2LDAuMDM0LDAuMDIsMC4wNSwwLjAzM2w1LjQ4NCw1LjQ4M2MwLjMwNiwwLjMwNywwLjgwMSwwLjMwNywxLjEwNywwYzAuMzA2LTAuMzA1LDAuMzA2LTAuODAxLDAtMS4xMDVsLTQuMTg0LTQuMTg1aDE0LjY1NmMwLjQzNiwwLDAuNzg4LTAuMzUzLDAuNzg4LTAuNzg4UzE4LjcwNyw5LjIxMiwxOC4yNzEsOS4yMTJ6Jyk7XG5cbiAgICAgICAgLy9nbyB0byBwcmV2aW91cyBzbGlkZSBvbmNsaWNrXG4gICAgICAgIGxlZnRfYnRuX2NvbnRhaW5lci5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZnNMaWdodGJveC5hcHBlbmRNZXRob2RzLnByZXZpb3VzU2xpZGVWaWFCdXR0b24oZnNMaWdodGJveC5kYXRhLnNsaWRlKTtcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgcmlnaHRfYnRuX2NvbnRhaW5lciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLWJ0bi1jb250YWluZXInLCAnZnNsaWdodGJveC1zbGlkZS1idG4tcmlnaHQtY29udGFpbmVyJ10pO1xuICAgICAgICBjcmVhdGVCVE4ocmlnaHRfYnRuX2NvbnRhaW5lciwgY29udGFpbmVyLCAnTTEuNzI5LDkuMjEyaDE0LjY1NmwtNC4xODQtNC4xODRjLTAuMzA3LTAuMzA2LTAuMzA3LTAuODAxLDAtMS4xMDdjMC4zMDUtMC4zMDYsMC44MDEtMC4zMDYsMS4xMDYsMGw1LjQ4MSw1LjQ4MmMwLjAxOCwwLjAxNCwwLjAzNywwLjAxOSwwLjA1MywwLjAzNGMwLjE4MSwwLjE4MSwwLjI0MiwwLjQyNSwwLjIwOSwwLjY2Yy0wLjAwNCwwLjAzOC0wLjAxMiwwLjA3MS0wLjAyMSwwLjEwOWMtMC4wMjgsMC4wOTgtMC4wNzUsMC4xODgtMC4xNDMsMC4yNzFjLTAuMDIxLDAuMDI2LTAuMDIxLDAuMDYxLTAuMDQ1LDAuMDg1Yy0wLjAxNSwwLjAxNi0wLjAzNCwwLjAyLTAuMDUxLDAuMDMzbC01LjQ4Myw1LjQ4M2MtMC4zMDYsMC4zMDctMC44MDIsMC4zMDctMS4xMDYsMGMtMC4zMDctMC4zMDUtMC4zMDctMC44MDEsMC0xLjEwNWw0LjE4NC00LjE4NUgxLjcyOWMtMC40MzYsMC0wLjc4OC0wLjM1My0wLjc4OC0wLjc4OFMxLjI5Myw5LjIxMiwxLjcyOSw5LjIxMnonKTtcbiAgICAgICAgLy8gZ28gdG8gbmV4dCBzbGlkZSBvbiBjbGlja1xuICAgICAgICByaWdodF9idG5fY29udGFpbmVyLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmc0xpZ2h0Ym94LmFwcGVuZE1ldGhvZHMubmV4dFNsaWRlVmlhQnV0dG9uKGZzTGlnaHRib3guZGF0YS5zbGlkZSk7XG4gICAgICAgIH07XG4gICAgfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZikge1xuICAgIGNvbnN0IEVTQ0FQRSA9ICdFc2NhcGUnO1xuICAgIGNvbnN0IExFRlRfQVJST1cgPSAnQXJyb3dMZWZ0JztcbiAgICBjb25zdCBSSUdIVF9BUlJPVyA9ICdBcnJvd1JpZ2h0JztcblxuICAgIHRoaXMuaGFuZGxlS2V5RG93biA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgRVNDQVBFOlxuICAgICAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzSW5kZXggPSBzZWxmLnN0YWdlU291cmNlSW5kZXhlcy5wcmV2aW91cyhzZWxmLmRhdGEuc2xpZGUpICsgMTtcbiAgICAgICAgICAgICAgICBzZWxmLnNldFNsaWRlKHByZXZpb3VzSW5kZXgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0SW5kZXggPSBzZWxmLnN0YWdlU291cmNlSW5kZXhlcy5uZXh0KHNlbGYuZGF0YS5zbGlkZSkgKyAxO1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0U2xpZGUobmV4dEluZGV4KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2Nyb2xsYmFyV2lkdGgpIHtcbiAgICB0aGlzLmFkZFJlY29tcGVuc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghZG9lc1Njcm9sbGJhckhhdmVXaWR0aCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm1hcmdpblJpZ2h0ID0gc2Nyb2xsYmFyV2lkdGggKyAncHgnO1xuICAgICAgICBjb25zdCBlbGVtZW50c1RvUmVjb21wZW5zZSA9IGdldFJlY29tcGVuc2VFbGVtZW50cygpO1xuICAgICAgICBpZiAoIWVsZW1lbnRzVG9SZWNvbXBlbnNlKSByZXR1cm47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHNUb1JlY29tcGVuc2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGVsZW1lbnRzVG9SZWNvbXBlbnNlW2ldLnN0eWxlLm1hcmdpblJpZ2h0ID0gc2Nyb2xsYmFyV2lkdGggKyAncHgnO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMucmVtb3ZlUmVjb21wZW5zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFkb2VzU2Nyb2xsYmFySGF2ZVdpZHRoKCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5tYXJnaW5SaWdodCA9ICcnO1xuICAgICAgICBjb25zdCBlbGVtZW50c1RvUmVjb21wZW5zZSA9IGdldFJlY29tcGVuc2VFbGVtZW50cygpO1xuICAgICAgICBpZiAoIWVsZW1lbnRzVG9SZWNvbXBlbnNlKSByZXR1cm47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHNUb1JlY29tcGVuc2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGVsZW1lbnRzVG9SZWNvbXBlbnNlW2ldLnN0eWxlLm1hcmdpblJpZ2h0ID0gJyc7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0UmVjb21wZW5zZUVsZW1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVjb21wZW5zZS1mb3Itc2Nyb2xsYmFyJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRvZXNTY3JvbGxiYXJIYXZlV2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAhIXNjcm9sbGJhcldpZHRoO1xuICAgIH07XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHRoaXMuZ2V0V2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBvdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIG91dGVyLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICBvdXRlci5zdHlsZS53aWR0aCA9IFwiMTAwcHhcIjtcbiAgICAgICAgb3V0ZXIuc3R5bGUubXNPdmVyZmxvd1N0eWxlID0gXCJzY3JvbGxiYXJcIjtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlcik7XG4gICAgICAgIGxldCB3aWR0aE5vU2Nyb2xsID0gb3V0ZXIub2Zmc2V0V2lkdGg7XG4gICAgICAgIG91dGVyLnN0eWxlLm92ZXJmbG93ID0gXCJzY3JvbGxcIjtcbiAgICAgICAgbGV0IGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW5uZXIuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgb3V0ZXIuYXBwZW5kQ2hpbGQoaW5uZXIpO1xuICAgICAgICBsZXQgd2lkdGhXaXRoU2Nyb2xsID0gaW5uZXIub2Zmc2V0V2lkdGg7XG4gICAgICAgIG91dGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob3V0ZXIpO1xuICAgICAgICBkYXRhLnNjcm9sbGJhcldpZHRoID0gd2lkdGhOb1Njcm9sbCAtIHdpZHRoV2l0aFNjcm9sbDtcbiAgICB9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWxmKSB7XG4gICAgLy93ZSB3aWxsIGhvdmVyIGFsbCB3aW5kb3dzIHdpdGggZGl2IHdpdGggaGlnaCB6LWluZGV4IHRvIGJlIHN1cmUgbW91c2V1cCBpcyB0cmlnZ2VyZWRcbiAgICBjb25zdCBpbnZpc2libGVIb3ZlciA9IG5ldyAocmVxdWlyZSgnLi4vQ29tcG9uZW50cy9ET01PYmplY3QnKSkoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LWludmlzaWJsZS1ob3ZlciddKTtcblxuICAgIC8vdG8gdGhlc2UgZWxlbWVudHMgYXJlIGFkZGVkIG1vdXNlIGV2ZW50c1xuICAgIGNvbnN0IGVsZW1lbnRzID0ge1xuICAgICAgICBtZWRpYUhvbGRlcjogc2VsZi5tZWRpYUhvbGRlcixcbiAgICAgICAgaW52aXNpYmxlSG92ZXI6IGludmlzaWJsZUhvdmVyLFxuICAgICAgICBkb3duRXZlbnREZXRlY3Rvcjogc2VsZi5kYXRhLmRvd25FdmVudERldGVjdG9yXG4gICAgfTtcbiAgICAvL3NvdXJjZXMgYXJlIHRyYW5zZm9ybWVkXG4gICAgY29uc3Qgc291cmNlcyA9IHNlbGYuZGF0YS5zb3VyY2VzO1xuXG4gICAgLy8gaWYgdGhlcmUgYXJlIG9ubHkgMiBvciAxIHVybHMgc2xpZGVUcmFuc2Zvcm1lciB3aWxsIGJlIGRpZmZlcmVudFxuICAgIGNvbnN0IHVybHNMZW5ndGggPSBzZWxmLmRhdGEudXJscy5sZW5ndGg7XG5cbiAgICBsZXQgaXNfZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICBsZXQgbW91c2VEb3duQ2xpZW50WDtcbiAgICBsZXQgaXNTb3VyY2VEb3duRXZlbnRUYXJnZXQ7XG4gICAgbGV0IGRpZmZlcmVuY2U7XG4gICAgbGV0IHNsaWRlQWJsZSA9IHRydWU7XG5cblxuICAgIGNvbnN0IG1vdXNlRG93bkV2ZW50ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgLy8gdGFnIGNhbid0IGJlIHZpZGVvIGNhdXNlIGl0IHdvdWxkIGJlIHVuY2xpY2thYmxlIGluIG1pY3Jvc29mdCBicm93c2Vyc1xuICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSAhPT0gJ1ZJREVPJyAmJiAhZS50b3VjaGVzKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZnNsaWdodGJveC1zb3VyY2UnKSkge1xuICAgICAgICAgICAgaXNTb3VyY2VEb3duRXZlbnRUYXJnZXQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlzX2RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgZGlmZmVyZW5jZSA9IDA7XG5cbiAgICAgICAgaWYgKHNlbGYuZGF0YS50b3RhbFNsaWRlcyA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGVsZW0gaW4gZWxlbWVudHMpIHtcbiAgICAgICAgICAgIGVsZW1lbnRzW2VsZW1dLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtY3Vyc29yLWdyYWJiaW5nJyk7XG4gICAgICAgIH1cbiAgICAgICAgKGUudG91Y2hlcykgP1xuICAgICAgICAgICAgbW91c2VEb3duQ2xpZW50WCA9IGUudG91Y2hlc1swXS5jbGllbnRYIDpcbiAgICAgICAgICAgIG1vdXNlRG93bkNsaWVudFggPSBlLmNsaWVudFg7XG4gICAgfTtcblxuXG4gICAgY29uc3QgbW91c2VVcEV2ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2VsZi5lbGVtZW50LmNvbnRhaW5zKGludmlzaWJsZUhvdmVyKSkge1xuICAgICAgICAgICAgc2VsZi5lbGVtZW50LnJlbW92ZUNoaWxkKGludmlzaWJsZUhvdmVyKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBlbGVtIGluIGVsZW1lbnRzKSB7XG4gICAgICAgICAgICBlbGVtZW50c1tlbGVtXS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LWN1cnNvci1ncmFiYmluZycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc19kcmFnZ2luZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlzX2RyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGRpZmZlcmVuY2UgPT09IDApIHtcbiAgICAgICAgICAgIGlmICghaXNTb3VyY2VEb3duRXZlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlzU291cmNlRG93bkV2ZW50VGFyZ2V0ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaXNTb3VyY2VEb3duRXZlbnRUYXJnZXQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoIXNsaWRlQWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNsaWRlQWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIGxldCBzb3VyY2VzSW5kZXhlcyA9IHNlbGYuc3RhZ2VTb3VyY2VJbmRleGVzLmFsbChzZWxmLmRhdGEuc2xpZGUpO1xuXG4gICAgICAgIC8vIGFkZCB0cmFuc2l0aW9uIGlmIHVzZXIgc2xpZGUgdG8gc291cmNlXG4gICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcbiAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XG4gICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0uY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xuXG5cbiAgICAgICAgLy8gc2xpZGUgcHJldmlvdXNcbiAgICAgICAgaWYgKGRpZmZlcmVuY2UgPiAwKSB7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBzbGlkZSBudW1iZXJcbiAgICAgICAgICAgIGlmIChzZWxmLmRhdGEuc2xpZGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZVNsaWRlTnVtYmVyKHNlbGYuZGF0YS50b3RhbFNsaWRlcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnNsaWRlIC0gMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh1cmxzTGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNsaWRlVHJhbnNmb3JtZXIucGx1cyhzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdKTtcbiAgICAgICAgICAgICAgICBzZWxmLnNsaWRlVHJhbnNmb3JtZXIuemVybyhzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuc2xpZGVUcmFuc2Zvcm1lci56ZXJvKHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBnZXQgbmV3IGluZGV4ZXNcbiAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzID0gc2VsZi5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKHNlbGYuZGF0YS5zbGlkZSk7XG5cbiAgICAgICAgICAgIC8vaWYgc291cmNlIGlzbid0IGFscmVhZHkgaW4gbWVtb3J5XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlbGYuZGF0YS5zb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgIHNlbGYubG9hZHNvdXJjZXMoJ3ByZXZpb3VzJywgc2VsZi5kYXRhLnNsaWRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gc2xpZGUgbmV4dFxuICAgICAgICBlbHNlIGlmIChkaWZmZXJlbmNlIDwgMCkge1xuXG4gICAgICAgICAgICAvL3VwZGF0ZSBzbGlkZSBudW1iZXJcbiAgICAgICAgICAgIGlmIChzZWxmLmRhdGEuc2xpZGUgPT09IHNlbGYuZGF0YS50b3RhbFNsaWRlcykge1xuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlU2xpZGVOdW1iZXIoMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnNsaWRlICsgMSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYgKHVybHNMZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zbGlkZVRyYW5zZm9ybWVyLm1pbnVzKHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0pO1xuICAgICAgICAgICAgICAgIHNlbGYuc2xpZGVUcmFuc2Zvcm1lci56ZXJvKHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNsaWRlVHJhbnNmb3JtZXIuemVybyhzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZ2V0IG5ldyBpbmRleGVzXG4gICAgICAgICAgICBzb3VyY2VzSW5kZXhlcyA9IHNlbGYuc3RhZ2VTb3VyY2VJbmRleGVzLmFsbChzZWxmLmRhdGEuc2xpZGUpO1xuICAgICAgICAgICAgLy9pZiBzb3VyY2UgaXNuJ3QgYWxyZWFkeSBpbiBtZW1vcnlcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZi5kYXRhLnNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRzb3VyY2VzKCduZXh0Jywgc2VsZi5kYXRhLnNsaWRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGRpZmZlcmVuY2UgPSAwO1xuICAgICAgICBzZWxmLnN0b3BWaWRlb3MoKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0cmFuc2l0aW9uIGJlY2F1c2Ugd2l0aCBkcmFnZ2luZyBpdCBsb29rcyBhd2Z1bFxuICAgICAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xuICAgICAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcblxuICAgICAgICAgICAgLy8gdXNlciBzaG91bGRuJ3QgYmUgYWJsZSB0byBzbGlkZSB3aGVuIGFuaW1hdGlvbiBpcyBydW5uaW5nXG4gICAgICAgICAgICBzbGlkZUFibGUgPSB0cnVlO1xuICAgICAgICB9LCAyNTApO1xuICAgIH07XG5cblxuICAgIGNvbnN0IG1vdXNlTW92ZUV2ZW50ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKCFpc19kcmFnZ2luZyB8fCAhc2xpZGVBYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNsaWVudFg7XG4gICAgICAgIChlLnRvdWNoZXMpID9cbiAgICAgICAgICAgIGNsaWVudFggPSBlLnRvdWNoZXNbMF0uY2xpZW50WCA6XG4gICAgICAgICAgICBjbGllbnRYID0gZS5jbGllbnRYO1xuXG4gICAgICAgIGRpZmZlcmVuY2UgPSBjbGllbnRYIC0gbW91c2VEb3duQ2xpZW50WDtcbiAgICAgICAgLy8gaWYgdXNlciBzd2lwZWQgYnV0IHRoZXJlIGlzIG9ubHkgb25lIHNsaWRlIHdlIGRvbnQgd2FudCBmdXJ0aGVyIGNvZGUgdG8gZXhlY3V0ZSBidXQgd2Ugd2FudCB0byBwcmV2ZW50IGxpZ2h0Ym94XG4gICAgICAgIC8vIGZyb20gY2xvc2luZyBzbyB3ZSBzZXQgZGlmZmVyZW5jZSB0byAxXG4gICAgICAgIGlmIChkaWZmZXJlbmNlICE9PSAwICYmIHNlbGYuZGF0YS50b3RhbFNsaWRlcyA9PT0gMSkge1xuICAgICAgICAgICAgZGlmZmVyZW5jZSA9IDE7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzZWxmLmVsZW1lbnQuY29udGFpbnMoaW52aXNpYmxlSG92ZXIpKSB7XG4gICAgICAgICAgICBzZWxmLmVsZW1lbnQuYXBwZW5kQ2hpbGQoaW52aXNpYmxlSG92ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNvdXJjZXNJbmRleGVzID0gc2VsZi5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKHNlbGYuZGF0YS5zbGlkZSk7XG5cbiAgICAgICAgaWYgKHVybHNMZW5ndGggPj0gMykge1xuICAgICAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICtcbiAgICAgICAgICAgICAgICAoLXNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGggKyBkaWZmZXJlbmNlKVxuICAgICAgICAgICAgICAgICsgJ3B4LDApJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1cmxzTGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgZGlmZmVyZW5jZSArICdweCwwKSc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXJsc0xlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJ1xuICAgICAgICAgICAgICAgICsgKHNlbGYuZGF0YS5zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGggKyBkaWZmZXJlbmNlKVxuICAgICAgICAgICAgICAgICsgJ3B4LDApJztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBwcmV2ZW50RGVmYXVsdEV2ZW50ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG5cblxuICAgIGZvciAobGV0IGVsZW0gaW4gZWxlbWVudHMpIHtcbiAgICAgICAgZWxlbWVudHNbZWxlbV0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2VEb3duRXZlbnQpO1xuICAgICAgICBlbGVtZW50c1tlbGVtXS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgbW91c2VEb3duRXZlbnQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZFdpbmRvd0V2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwRXZlbnQpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBtb3VzZVVwRXZlbnQpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlRXZlbnQpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgbW91c2VNb3ZlRXZlbnQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZW1vdmVXaW5kb3dFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcEV2ZW50KTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgbW91c2VVcEV2ZW50KTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZUV2ZW50KTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG1vdXNlTW92ZUV2ZW50KTtcbiAgICB9O1xuXG4gICAgaW52aXNpYmxlSG92ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlVXBFdmVudCk7XG4gICAgaW52aXNpYmxlSG92ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBtb3VzZVVwRXZlbnQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICBzZWxmLmRhdGEubmF2LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHByZXZlbnREZWZhdWx0RXZlbnQpO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzbGlkZURpc3RhbmNlKSB7XG4gICAgdGhpcy5taW51cyA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIGVsZW0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgKC1zbGlkZURpc3RhbmNlICogd2luZG93LmlubmVyV2lkdGgpICsgJ3B4LDApJztcbiAgICB9O1xuXG4gICAgdGhpcy56ZXJvID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgZWxlbS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKDAsMCknO1xuICAgIH07XG5cbiAgICB0aGlzLnBsdXMgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICBlbGVtLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIHNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aCArICdweCwwKSc7XG4gICAgfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHRoaXMucHJldmlvdXMgPSBmdW5jdGlvbiAoc2xpZGUpIHtcbiAgICAgICAgbGV0IHByZXZpb3VzU2xpZGVJbmRleDtcbiAgICAgICAgY29uc3QgYXJyYXlJbmRleCA9IHNsaWRlIC0gMTtcblxuICAgICAgICAvLyBwcmV2aW91c1xuICAgICAgICBpZiAoYXJyYXlJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgcHJldmlvdXNTbGlkZUluZGV4ID0gZGF0YS50b3RhbFNsaWRlcyAtIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcmV2aW91c1NsaWRlSW5kZXggPSBhcnJheUluZGV4IC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcmV2aW91c1NsaWRlSW5kZXg7XG4gICAgfTtcblxuICAgIHRoaXMubmV4dCA9IGZ1bmN0aW9uIChzbGlkZSkge1xuXG4gICAgICAgIGxldCBuZXh0U2xpZGVJbmRleDtcbiAgICAgICAgY29uc3QgYXJyYXlJbmRleCA9IHNsaWRlIC0gMTtcblxuICAgICAgICAvL25leHRcbiAgICAgICAgaWYgKHNsaWRlID09PSBkYXRhLnRvdGFsU2xpZGVzKSB7XG4gICAgICAgICAgICBuZXh0U2xpZGVJbmRleCA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0U2xpZGVJbmRleCA9IGFycmF5SW5kZXggKyAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRTbGlkZUluZGV4O1xuICAgIH07XG5cbiAgICB0aGlzLmFsbCA9IGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgICAvLyBzb3VyY2VzIGFyZSBzdG9yZWQgaW4gYXJyYXkgaW5kZXhlZCBmcm9tIDBcbiAgICAgICAgY29uc3QgYXJyYXlJbmRleCA9IHNsaWRlIC0gMTtcbiAgICAgICAgY29uc3Qgc291cmNlc0luZGV4ZXMgPSB7XG4gICAgICAgICAgICBwcmV2aW91czogMCxcbiAgICAgICAgICAgIGN1cnJlbnQ6IDAsXG4gICAgICAgICAgICBuZXh0OiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gcHJldmlvdXNcbiAgICAgICAgaWYgKGFycmF5SW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzLnByZXZpb3VzID0gZGF0YS50b3RhbFNsaWRlcyAtIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzb3VyY2VzSW5kZXhlcy5wcmV2aW91cyA9IGFycmF5SW5kZXggLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3VycmVudFxuICAgICAgICBzb3VyY2VzSW5kZXhlcy5jdXJyZW50ID0gYXJyYXlJbmRleDtcblxuICAgICAgICAvL25leHRcbiAgICAgICAgaWYgKHNsaWRlID09PSBkYXRhLnRvdGFsU2xpZGVzKSB7XG4gICAgICAgICAgICBzb3VyY2VzSW5kZXhlcy5uZXh0ID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzLm5leHQgPSBhcnJheUluZGV4ICsgMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzb3VyY2VzSW5kZXhlcztcbiAgICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlbGYpIHtcbiAgICBjb25zdCBrZXlib2FyZENvbnRyb2xsZXIgPSBzZWxmLmtleWJvYXJkQ29udHJvbGxlcjtcblxuICAgIHRoaXMuYXR0YWNoTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlib2FyZENvbnRyb2xsZXIuaGFuZGxlS2V5RG93bik7XG4gICAgfTtcblxuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlib2FyZENvbnRyb2xsZXIuaGFuZGxlS2V5RG93bik7XG4gICAgfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZnNMaWdodGJveCkge1xuICAgIGNvbnN0IGxvYWRlciA9ICc8ZGl2IGNsYXNzPVwiZnNsaWdodGJveC1sb2FkZXJcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2Pic7XG4gICAgY29uc3QgdHJhbnNpdGlvbiA9ICdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJztcbiAgICBjb25zdCBmYWRlSW4gPSAnZnNsaWdodGJveC1mYWRlLWluJztcbiAgICBjb25zdCBmYWRlT3V0ID0gJ2ZzbGlnaHRib3gtZmFkZS1vdXQnO1xuXG4gICAgY29uc3QgY3JlYXRlSG9sZGVyID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZUhvbGRlciA9IG5ldyAocmVxdWlyZSgnLi9Db21wb25lbnRzL0RPTU9iamVjdCcpKSgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc291cmNlLWhvbGRlcicsICdmc2xpZ2h0Ym94LWZ1bGwtZGltZW5zaW9uJ10pO1xuICAgICAgICBzb3VyY2VIb2xkZXIuaW5uZXJIVE1MID0gbG9hZGVyO1xuICAgICAgICBmc0xpZ2h0Ym94LmRhdGEuc291cmNlc1tpbmRleF0gPSBzb3VyY2VIb2xkZXI7XG4gICAgICAgIHJldHVybiBzb3VyY2VIb2xkZXI7XG4gICAgfTtcblxuICAgIGNvbnN0IHJ1bkFuaW1hdGlvbk9uU291cmNlID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgZWxlbS5maXJzdENoaWxkLmNsYXNzTGlzdC5hZGQoZmFkZUluKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2xlYXJBbmltYXRpb25PblNvdXJjZSA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IGVsZW0uZmlyc3RDaGlsZDtcbiAgICAgICAgc3JjLmNsYXNzTGlzdC5yZW1vdmUoZmFkZUluKTtcbiAgICAgICAgc3JjLmNsYXNzTGlzdC5yZW1vdmUoZmFkZU91dCk7XG4gICAgICAgIHZvaWQgc3JjLm9mZnNldFdpZHRoO1xuICAgIH07XG5cbiAgICBjb25zdCBydW5GYWRlT3V0QW5pbWF0aW9uT25Tb3VyY2UgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICBlbGVtLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LmFkZChmYWRlT3V0KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBsb2FkZXIgd2hlbiBsb2FkaW5nIGZzTGlnaHRib3ggaW5pdGlhbGx5XG4gICAgICogQHBhcmFtIHNsaWRlXG4gICAgICovXG4gICAgdGhpcy5yZW5kZXJIb2xkZXJJbml0aWFsID0gZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZXNJbmRleGVzID0gZnNMaWdodGJveC5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKHNsaWRlKTtcbiAgICAgICAgY29uc3QgdG90YWxTbGlkZXMgPSBmc0xpZ2h0Ym94LmRhdGEudG90YWxTbGlkZXM7XG5cbiAgICAgICAgaWYgKHRvdGFsU2xpZGVzID49IDMpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXYgPSBjcmVhdGVIb2xkZXIoc291cmNlc0luZGV4ZXMucHJldmlvdXMpO1xuICAgICAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLm1pbnVzKHByZXYpO1xuICAgICAgICAgICAgZnNMaWdodGJveC5tZWRpYUhvbGRlci5hcHBlbmRDaGlsZChwcmV2KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG90YWxTbGlkZXMgPj0gMSkge1xuICAgICAgICAgICAgY29uc3QgY3VyciA9IGNyZWF0ZUhvbGRlcihzb3VyY2VzSW5kZXhlcy5jdXJyZW50KTtcbiAgICAgICAgICAgIGZzTGlnaHRib3gubWVkaWFIb2xkZXIuYXBwZW5kQ2hpbGQoY3Vycik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRvdGFsU2xpZGVzID49IDIpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHQgPSBjcmVhdGVIb2xkZXIoc291cmNlc0luZGV4ZXMubmV4dCk7XG4gICAgICAgICAgICBmc0xpZ2h0Ym94LnNsaWRlVHJhbnNmb3JtZXIucGx1cyhuZXh0KTtcbiAgICAgICAgICAgIGZzTGlnaHRib3gubWVkaWFIb2xkZXIuYXBwZW5kQ2hpbGQobmV4dCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB0aGlzLnJlbmRlckhvbGRlciA9IGZ1bmN0aW9uIChzbGlkZSwgdHlwZSkge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3ByZXZpb3VzJzpcbiAgICAgICAgICAgICAgICByZW5kZXJIb2xkZXJQcmV2aW91cyhzbGlkZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjdXJyZW50JzpcbiAgICAgICAgICAgICAgICByZW5kZXJIb2xkZXJDdXJyZW50KHNsaWRlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ25leHQnOlxuICAgICAgICAgICAgICAgIHJlbmRlckhvbGRlck5leHQoc2xpZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgY29uc3QgcmVuZGVySG9sZGVyUHJldmlvdXMgPSBmdW5jdGlvbiAoc2xpZGUpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTb3VyY2VJbmRleCA9IGZzTGlnaHRib3guc3RhZ2VTb3VyY2VJbmRleGVzLnByZXZpb3VzKHNsaWRlKTtcbiAgICAgICAgY29uc3QgcHJldiA9IGNyZWF0ZUhvbGRlcihwcmV2aW91c1NvdXJjZUluZGV4KTtcbiAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLm1pbnVzKHByZXYpO1xuICAgICAgICBmc0xpZ2h0Ym94Lm1lZGlhSG9sZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIHByZXYpO1xuICAgIH07XG5cblxuICAgIGNvbnN0IHJlbmRlckhvbGRlck5leHQgPSBmdW5jdGlvbiAoc2xpZGUpIHtcbiAgICAgICAgY29uc3QgbmV4dFNvdXJjZUluZGV4ID0gZnNMaWdodGJveC5zdGFnZVNvdXJjZUluZGV4ZXMubmV4dChzbGlkZSk7XG4gICAgICAgIGNvbnN0IG5leHQgPSBjcmVhdGVIb2xkZXIobmV4dFNvdXJjZUluZGV4KTtcbiAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLnBsdXMobmV4dCk7XG4gICAgICAgIGZzTGlnaHRib3gubWVkaWFIb2xkZXIuYXBwZW5kQ2hpbGQobmV4dCk7XG4gICAgfTtcblxuXG4gICAgY29uc3QgcmVuZGVySG9sZGVyQ3VycmVudCA9IGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IGZzTGlnaHRib3guc3RhZ2VTb3VyY2VJbmRleGVzLmFsbChzbGlkZSk7XG4gICAgICAgIGNvbnN0IGN1cnIgPSBjcmVhdGVIb2xkZXIoc291cmNlc0luZGV4ZXMuY3VycmVudCk7XG4gICAgICAgIGZzTGlnaHRib3guc2xpZGVUcmFuc2Zvcm1lci56ZXJvKGN1cnIpO1xuICAgICAgICBmc0xpZ2h0Ym94Lm1lZGlhSG9sZGVyLmluc2VydEJlZm9yZShjdXJyLCBmc0xpZ2h0Ym94LmRhdGEuc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XSk7XG4gICAgfTtcblxuXG4gICAgdGhpcy5wcmV2aW91c1NsaWRlVmlhQnV0dG9uID0gZnVuY3Rpb24gKHByZXZpb3VzU2xpZGUpIHtcbiAgICAgICAgaWYgKHByZXZpb3VzU2xpZGUgPT09IDEpIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3guZGF0YS5zbGlkZSA9IGZzTGlnaHRib3guZGF0YS50b3RhbFNsaWRlcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3guZGF0YS5zbGlkZSAtPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV3U291cmNlc0luZGV4ZXMgPSBzdG9wVmlkZW9zVXBkYXRlU2xpZGVBbmRSZXR1cm5TbGlkZU51bWJlckluZGV4ZXMoKTtcblxuICAgICAgICBpZiAodHlwZW9mIGZzTGlnaHRib3guZGF0YS5zb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLnByZXZpb3VzXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgZnNMaWdodGJveC5sb2Fkc291cmNlcygncHJldmlvdXMnLCBmc0xpZ2h0Ym94LmRhdGEuc2xpZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGZzTGlnaHRib3guZGF0YS5zb3VyY2VzO1xuICAgICAgICBjb25zdCBjdXJyZW50U291cmNlID0gc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5jdXJyZW50XTtcbiAgICAgICAgY29uc3QgbmV4dFNvdXJjZSA9IHNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMubmV4dF07XG5cbiAgICAgICAgbmV4dFNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKHRyYW5zaXRpb24pO1xuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5yZW1vdmUodHJhbnNpdGlvbik7XG4gICAgICAgIHNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMucHJldmlvdXNdLmNsYXNzTGlzdC5yZW1vdmUodHJhbnNpdGlvbik7XG5cblxuICAgICAgICBjbGVhckFuaW1hdGlvbk9uU291cmNlKGN1cnJlbnRTb3VyY2UpO1xuICAgICAgICBydW5BbmltYXRpb25PblNvdXJjZShjdXJyZW50U291cmNlKTtcbiAgICAgICAgcnVuRmFkZU91dEFuaW1hdGlvbk9uU291cmNlKG5leHRTb3VyY2UpO1xuXG4gICAgICAgIGZzTGlnaHRib3guc2xpZGVUcmFuc2Zvcm1lci56ZXJvKGN1cnJlbnRTb3VyY2UpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChuZXdTb3VyY2VzSW5kZXhlcy5uZXh0ICE9PSBmc0xpZ2h0Ym94LmRhdGEuc2xpZGUgLSAxKVxuICAgICAgICAgICAgICAgIGZzTGlnaHRib3guc2xpZGVUcmFuc2Zvcm1lci5wbHVzKG5leHRTb3VyY2UpO1xuICAgICAgICAgICAgbmV4dFNvdXJjZS5maXJzdENoaWxkLmNsYXNzTGlzdC5yZW1vdmUoZmFkZU91dCk7XG4gICAgICAgIH0sIDIyMCk7XG4gICAgfTtcblxuXG4gICAgdGhpcy5uZXh0U2xpZGVWaWFCdXR0b24gPSBmdW5jdGlvbiAocHJldmlvdXNTbGlkZSkge1xuICAgICAgICBpZiAocHJldmlvdXNTbGlkZSA9PT0gZnNMaWdodGJveC5kYXRhLnRvdGFsU2xpZGVzKSB7XG4gICAgICAgICAgICBmc0xpZ2h0Ym94LmRhdGEuc2xpZGUgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnNMaWdodGJveC5kYXRhLnNsaWRlICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXdTb3VyY2VzSW5kZXhlcyA9IHN0b3BWaWRlb3NVcGRhdGVTbGlkZUFuZFJldHVyblNsaWRlTnVtYmVySW5kZXhlcygpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZnNMaWdodGJveC5kYXRhLnNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMubmV4dF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3gubG9hZHNvdXJjZXMoJ25leHQnLCBmc0xpZ2h0Ym94LmRhdGEuc2xpZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGZzTGlnaHRib3guZGF0YS5zb3VyY2VzO1xuICAgICAgICBjb25zdCBjdXJyZW50U291cmNlID0gc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5jdXJyZW50XTtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTb3VyY2UgPSBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLnByZXZpb3VzXTtcblxuICAgICAgICBwcmV2aW91c1NvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKHRyYW5zaXRpb24pO1xuICAgICAgICBjdXJyZW50U291cmNlLmNsYXNzTGlzdC5yZW1vdmUodHJhbnNpdGlvbik7XG4gICAgICAgIHNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMubmV4dF0uY2xhc3NMaXN0LnJlbW92ZSh0cmFuc2l0aW9uKTtcblxuICAgICAgICBjbGVhckFuaW1hdGlvbk9uU291cmNlKGN1cnJlbnRTb3VyY2UpO1xuICAgICAgICBydW5BbmltYXRpb25PblNvdXJjZShjdXJyZW50U291cmNlKTtcbiAgICAgICAgcnVuRmFkZU91dEFuaW1hdGlvbk9uU291cmNlKHByZXZpb3VzU291cmNlKTtcbiAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLnplcm8oY3VycmVudFNvdXJjZSk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobmV3U291cmNlc0luZGV4ZXMucHJldmlvdXMgIT09IGZzTGlnaHRib3guZGF0YS5zbGlkZSAtIDEpXG4gICAgICAgICAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLm1pbnVzKHByZXZpb3VzU291cmNlKTtcbiAgICAgICAgICAgIHByZXZpb3VzU291cmNlLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LnJlbW92ZShmYWRlT3V0KTtcbiAgICAgICAgfSwgMjIwKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc3RvcFZpZGVvc1VwZGF0ZVNsaWRlQW5kUmV0dXJuU2xpZGVOdW1iZXJJbmRleGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmc0xpZ2h0Ym94LnN0b3BWaWRlb3MoKTtcbiAgICAgICAgZnNMaWdodGJveC51cGRhdGVTbGlkZU51bWJlcihmc0xpZ2h0Ym94LmRhdGEuc2xpZGUpO1xuICAgICAgICByZXR1cm4gZnNMaWdodGJveC5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKGZzTGlnaHRib3guZGF0YS5zbGlkZSk7XG4gICAgfTtcbn07Iiwid2luZG93LmZzTGlnaHRib3hDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBET01PYmplY3QgPSByZXF1aXJlKCcuL0NvbXBvbmVudHMvRE9NT2JqZWN0Jyk7XG5cbiAgICB0aGlzLmRhdGEgPSB7XG4gICAgICAgIHNsaWRlOiAxLFxuICAgICAgICB0b3RhbFNsaWRlczogMSxcbiAgICAgICAgc2xpZGVEaXN0YW5jZTogMS4zLFxuICAgICAgICBzbGlkZUNvdW50ZXI6IHRydWUsXG4gICAgICAgIHNsaWRlQnV0dG9uczogdHJ1ZSxcbiAgICAgICAgaXNGaXJzdFRpbWVMb2FkOiBmYWxzZSxcbiAgICAgICAgbW92ZVNsaWRlc1ZpYURyYWc6IHRydWUsXG4gICAgICAgIHRvb2xiYXJCdXR0b25zOiB7XG4gICAgICAgICAgICBcImNsb3NlXCI6IHRydWUsXG4gICAgICAgICAgICBcImZ1bGxzY3JlZW5cIjogdHJ1ZVxuICAgICAgICB9LFxuXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBzY3JvbGxiYXJXaWR0aDogMCxcblxuICAgICAgICB1cmxzOiBbXSxcbiAgICAgICAgc291cmNlczogW10sXG4gICAgICAgIHNvdXJjZXNMb2FkZWQ6IFtdLFxuICAgICAgICByZW1lbWJlcmVkU291cmNlc0RpbWVuc2lvbnM6IFtdLFxuICAgICAgICB2aWRlb3M6IFtdLFxuICAgICAgICB2aWRlb3NQb3N0ZXJzOiBbXSxcblxuICAgICAgICBob2xkZXJXcmFwcGVyOiBudWxsLFxuICAgICAgICBtZWRpYUhvbGRlcjogbnVsbCxcbiAgICAgICAgbmF2OiBudWxsLFxuICAgICAgICB0b29sYmFyOiBudWxsLFxuICAgICAgICBzbGlkZUNvdW50ZXJFbGVtOiBudWxsLFxuICAgICAgICBkb3duRXZlbnREZXRlY3RvcjogbnVsbCxcblxuICAgICAgICBpbml0aWF0ZWQ6IGZhbHNlLFxuICAgICAgICBmdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgICAgZmFkaW5nT3V0OiBmYWxzZSxcbiAgICB9O1xuXG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuXG4gICAgLyoqXG4gICAgICogSW5pdCBhIG5ldyBmc0xpZ2h0Ym94IGluc3RhbmNlXG4gICAgICovXG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKGluaXRIcmVmKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGEuaW5pdGlhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRTZXRTbGlkZShpbml0SHJlZik7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZ2FsbGVyeSA9IHRoaXMuZGF0YS5uYW1lO1xuXG4gICAgICAgIGxldCB1cmxzID0gW107XG4gICAgICAgIGNvbnN0IGEgPSBmc0xpZ2h0Ym94SGVscGVycy5hO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghYVtpXS5oYXNBdHRyaWJ1dGUoJ2RhdGEtZnNsaWdodGJveCcpKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBpZiAoYVtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnNsaWdodGJveCcpID09PSBnYWxsZXJ5KSB7XG4gICAgICAgICAgICAgICAgbGV0IHVybHNMZW5ndGggPSB1cmxzLnB1c2goYVtpXS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XG4gICAgICAgICAgICAgICAgaWYgKGFbaV0uaGFzQXR0cmlidXRlKCdkYXRhLXZpZGVvLXBvc3RlcicpKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEudmlkZW9zUG9zdGVyc1t1cmxzTGVuZ3RoIC0gMV0gPSBhW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS12aWRlby1wb3N0ZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0YS51cmxzID0gdXJscztcbiAgICAgICAgdGhpcy5kYXRhLnRvdGFsU2xpZGVzID0gdXJscy5sZW5ndGg7XG4gICAgICAgIGRvbVJlbmRlcmVyLnJlbmRlckRPTSgpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1vcGVuJyk7XG4gICAgICAgIHRoaXMuc2Nyb2xsYmFyUmVjb21wZW5zb3IuYWRkUmVjb21wZW5zZSgpO1xuICAgICAgICB0aGlzLm9uUmVzaXplRXZlbnQuaW5pdCgpO1xuICAgICAgICB0aGlzLmV2ZW50c0NvbnRyb2xsZXJzLmRvY3VtZW50LmtleURvd24uYXR0YWNoTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy50aHJvd0V2ZW50KCdpbml0Jyk7XG4gICAgICAgIHRoaXMudGhyb3dFdmVudCgnb3BlbicpO1xuICAgICAgICB0aGlzLnNsaWRlU3dpcGluZyA9IG5ldyAocmVxdWlyZSgnLi9Db3JlL1NsaWRlU3dpcGluZy5qcycpKSh0aGlzKTtcbiAgICAgICAgdGhpcy5zbGlkZVN3aXBpbmcuYWRkV2luZG93RXZlbnRzKCk7XG4gICAgICAgIHRoaXMuaW5pdFNldFNsaWRlKGluaXRIcmVmKTtcbiAgICAgICAgdGhpcy5kYXRhLmluaXRpYXRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LW9wZW4nKTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBJbml0IGNhbiBoYXZlIG11bHRpcGxlIHR5cGUgb2Ygc2xpZGVzXG4gICAgICogQHBhcmFtIHNsaWRlXG4gICAgICovXG4gICAgdGhpcy5pbml0U2V0U2xpZGUgPSBmdW5jdGlvbiAoc2xpZGUpIHtcbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBzbGlkZTtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTbGlkZSh0aGlzLmRhdGEudXJscy5pbmRleE9mKHNsaWRlKSArIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2xpZGUoc2xpZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2xpZGUoMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBTaG93IGRvbSBvZiBmc0xpZ2h0Ym94IGluc3RhbmNlIGlmIGV4aXN0c1xuICAgICAqL1xuICAgIHRoaXMuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgZWxlbSA9IHRoaXMuZWxlbWVudDtcbiAgICAgICAgdGhpcy5zY3JvbGxiYXJSZWNvbXBlbnNvci5hZGRSZWNvbXBlbnNlKCk7XG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1mYWRlLW91dC1jb21wbGV0ZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1vcGVuJyk7XG4gICAgICAgIHZvaWQgZWxlbS5vZmZzZXRXaWR0aDtcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LWZhZGUtaW4tY29tcGxldGUnKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZUV2ZW50LmFkZExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMub25SZXNpemVFdmVudC5yZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmV2ZW50c0NvbnRyb2xsZXJzLmRvY3VtZW50LmtleURvd24uYXR0YWNoTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5zbGlkZVN3aXBpbmcuYWRkV2luZG93RXZlbnRzKCk7XG4gICAgICAgIHRoaXMudGhyb3dFdmVudCgnc2hvdycpO1xuICAgICAgICB0aGlzLnRocm93RXZlbnQoJ29wZW4nKTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBIaWRlIGRvbSBvZiBleGlzdGluZyBmc0xpZ2h0Ym94IGluc3RhbmNlXG4gICAgICovXG4gICAgdGhpcy5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhLmZ1bGxzY3JlZW4pIHRoaXMudG9vbGJhci5jbG9zZUZ1bGxzY3JlZW4oKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1vdXQtY29tcGxldGUnKTtcbiAgICAgICAgdGhpcy5kYXRhLmZhZGluZ091dCA9IHRydWU7XG4gICAgICAgIHRoaXMudGhyb3dFdmVudCgnY2xvc2UnKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZUV2ZW50LnJlbW92ZUxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuc2xpZGVTd2lwaW5nLnJlbW92ZVdpbmRvd0V2ZW50cygpO1xuICAgICAgICB0aGlzLmV2ZW50c0NvbnRyb2xsZXJzLmRvY3VtZW50LmtleURvd24ucmVtb3ZlTGlzdGVuZXIoKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5zY3JvbGxiYXJSZWNvbXBlbnNvci5yZW1vdmVSZWNvbXBlbnNlKCk7XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC1vcGVuJyk7XG4gICAgICAgICAgICBfdGhpcy5kYXRhLmZhZGluZ091dCA9IGZhbHNlO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChfdGhpcy5lbGVtZW50KTtcbiAgICAgICAgfSwgMjUwKTtcbiAgICB9O1xuXG4gICAgdGhpcy51cGRhdGVTbGlkZU51bWJlciA9IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICAgICAgdGhpcy5kYXRhLnNsaWRlID0gbnVtYmVyO1xuICAgICAgICBpZiAodGhpcy5kYXRhLnRvdGFsU2xpZGVzID4gMSlcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zbGlkZUNvdW50ZXJFbGVtLmlubmVySFRNTCA9IG51bWJlcjtcbiAgICB9O1xuXG4gICAgdGhpcy50aHJvd0V2ZW50ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICBsZXQgZXZlbnQ7XG4gICAgICAgIGlmICh0eXBlb2YgKEV2ZW50KSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoZXZlbnROYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICAgICAgICBldmVudC5pbml0RXZlbnQoZXZlbnROYW1lLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfTtcblxuICAgIHRoaXMuZWxlbWVudCA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LWNvbnRhaW5lcicsICdmc2xpZ2h0Ym94LWZ1bGwtZGltZW5zaW9uJ10pO1xuICAgIHRoaXMubWVkaWFIb2xkZXIgPSBuZXcgKHJlcXVpcmUoJy4vQ29tcG9uZW50cy9NZWRpYUhvbGRlcicpKTtcbiAgICBjb25zdCBkb21SZW5kZXJlciA9IG5ldyAocmVxdWlyZSgnLi9Db3JlL0RvbVJlbmRlcmVyJykpKHRoaXMpO1xuICAgIHRoaXMuc3RhZ2VTb3VyY2VJbmRleGVzID0gbmV3IChyZXF1aXJlKCcuL0NvcmUvU3RhZ2VTb3VyY2VzSW5kZXhlcycpKSh0aGlzLmRhdGEpO1xuICAgIHRoaXMua2V5Ym9hcmRDb250cm9sbGVyID0gbmV3IChyZXF1aXJlKCcuL0NvcmUvS2V5Ym9hcmRDb250cm9sbGVyJykpKHRoaXMpO1xuICAgIG5ldyAocmVxdWlyZSgnLi9Db3JlL1Njcm9sbGJhcldpZHRoR2V0dGVyJykpKHRoaXMuZGF0YSkuZ2V0V2lkdGgoKTtcbiAgICB0aGlzLm9uUmVzaXplRXZlbnQgPSBuZXcgKHJlcXVpcmUoJy4vb25SZXNpemVFdmVudCcpKSh0aGlzKTtcbiAgICB0aGlzLnNjcm9sbGJhclJlY29tcGVuc29yID0gbmV3IChyZXF1aXJlKCcuL0NvcmUvU2Nyb2xsYmFyUmVjb21wZW5zb3InKSkodGhpcy5kYXRhLnNjcm9sbGJhcldpZHRoKTtcbiAgICB0aGlzLnNsaWRlVHJhbnNmb3JtZXIgPSBuZXcgKHJlcXVpcmUoJy4vQ29yZS9TbGlkZVRyYW5zZm9ybWVyJykpKHRoaXMuZGF0YS5zbGlkZURpc3RhbmNlKTtcbiAgICB0aGlzLnNsaWRlU3dpcGluZyA9IG51bGw7XG4gICAgdGhpcy50b29sYmFyID0gbmV3IChyZXF1aXJlKCcuL0NvbXBvbmVudHMvVG9vbGJhcicpKSh0aGlzKTtcbiAgICB0aGlzLlNWR0ljb24gPSByZXF1aXJlKCcuL0NvbXBvbmVudHMvU1ZHSWNvbicpO1xuICAgIHRoaXMuYXBwZW5kTWV0aG9kcyA9IG5ldyAocmVxdWlyZSgnLi9hcHBlbmRNZXRob2RzJykpKHRoaXMpO1xuXG4gICAgLy8gZXZlbnRzLWNvbnRyb2xsZXJzXG4gICAgdGhpcy5ldmVudHNDb250cm9sbGVycyA9IHtcbiAgICAgICAgZG9jdW1lbnQ6IHtcbiAgICAgICAgICAgIGtleURvd246IG5ldyAocmVxdWlyZSgnLi9Db3JlL2V2ZW50cy1jb250cm9sbGVycy9Eb2N1bWVudEtleURvd25FdmVudENvbnRyb2xsZXInKSkodGhpcylcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEaXNwbGF5IHNvdXJjZSAoaW1hZ2VzLCBIVE1MNSB2aWRlbywgWW91VHViZSB2aWRlbykgZGVwZW5kaW5nIG9uIGdpdmVuIHVybCBmcm9tIHVzZXJcbiAgICAgKiBPciBpZiBkaXNwbGF5IGlzIGluaXRpYWwgZGlzcGxheSAzIGluaXRpYWwgc291cmNlc1xuICAgICAqIElmIHRoZXJlIGFyZSA+PSAzIGluaXRpYWwgc291cmNlcyB0aGVyZSB3aWxsIGJlIGFsd2F5cyAzIGluIHN0YWdlXG4gICAgICogQHBhcmFtIHR5cGVPZkxvYWRcbiAgICAgKiBAcGFyYW0gc2xpZGVcbiAgICAgKiBAcmV0dXJucyB7bW9kdWxlLmV4cG9ydHN9XG4gICAgICovXG4gICAgdGhpcy5sb2Fkc291cmNlcyA9IGZ1bmN0aW9uICh0eXBlT2ZMb2FkLCBzbGlkZSkge1xuICAgICAgICBjb25zdCBsb2Fkc291cmNlbW9kdWxlID0gcmVxdWlyZShcIi4vbG9hZFNvdXJjZS5qc1wiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBsb2Fkc291cmNlbW9kdWxlKHRoaXMsIHR5cGVPZkxvYWQsIHNsaWRlKTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBTdG9wIHZpZGVvcyBhZnRlciBjaGFuZ2luZyBzbGlkZVxuICAgICAqL1xuICAgIHRoaXMuc3RvcFZpZGVvcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgdmlkZW9zID0gdGhpcy5kYXRhLnZpZGVvcztcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IHRoaXMuZGF0YS5zb3VyY2VzO1xuXG4gICAgICAgIC8vIHRydWUgaXMgaHRtbDUgdmlkZW8sIGZhbHNlIGlzIHlvdXR1YmUgdmlkZW9cbiAgICAgICAgZm9yIChsZXQgdmlkZW9JbmRleCBpbiB2aWRlb3MpIHtcbiAgICAgICAgICAgIGlmICh2aWRlb3NbdmlkZW9JbmRleF0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNvdXJjZXNbdmlkZW9JbmRleF0uZmlyc3RDaGlsZC5wYXVzZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2VzW3ZpZGVvSW5kZXhdLmZpcnN0Q2hpbGQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNvdXJjZXNbdmlkZW9JbmRleF0uZmlyc3RDaGlsZC5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKCd7XCJldmVudFwiOlwiY29tbWFuZFwiLFwiZnVuY1wiOlwic3RvcFZpZGVvXCIsXCJhcmdzXCI6XCJcIn0nLCAnKicpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB0aGlzLnNldFNsaWRlID0gZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICAgIHRoaXMuZGF0YS5zbGlkZSA9IHNsaWRlO1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlTnVtYmVyKHNsaWRlKTtcbiAgICAgICAgY29uc3Qgc291cmNlc0luZGV4ZXMgPSB0aGlzLnN0YWdlU291cmNlSW5kZXhlcy5hbGwoc2xpZGUpO1xuICAgICAgICBjb25zdCBzb3VyY2VzID0gdGhpcy5kYXRhLnNvdXJjZXM7XG5cbiAgICAgICAgaWYgKHNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRzb3VyY2VzKCdpbml0aWFsJywgc2xpZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXSA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRzb3VyY2VzKCdwcmV2aW91cycsIHNsaWRlKTtcblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0gPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgdGhpcy5sb2Fkc291cmNlcygnY3VycmVudCcsIHNsaWRlKTtcblxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0gPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgdGhpcy5sb2Fkc291cmNlcygnbmV4dCcsIHNsaWRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHNvdXJjZUluZGV4IGluIHNvdXJjZXMpIHtcbiAgICAgICAgICAgIHNvdXJjZXNbc291cmNlSW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcblxuICAgICAgICAgICAgLy8gc291cmNlcyBsZW5ndGggbmVlZHMgdG8gYmUgaGlnaGVyIHRoYW4gMSBiZWNhdXNlIGlmIHRoZXJlIGlzIG9ubHkgMSBzbGlkZVxuICAgICAgICAgICAgLy8gc291cmNlc0luZGV4ZXMucHJldmlvdXMgd2lsbCBiZSAwIHNvIGl0IHdvdWxkIHJldHVybiBhIGJhZCB0cmFuc2l0aW9uXG4gICAgICAgICAgICBpZiAoc291cmNlSW5kZXggPT0gc291cmNlc0luZGV4ZXMucHJldmlvdXMgJiYgc291cmNlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZVRyYW5zZm9ybWVyLm1pbnVzKHNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzb3VyY2VJbmRleCA9PSBzb3VyY2VzSW5kZXhlcy5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZVRyYW5zZm9ybWVyLnplcm8oc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc291cmNlSW5kZXggPT0gc291cmNlc0luZGV4ZXMubmV4dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVUcmFuc2Zvcm1lci5wbHVzKHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0pO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNsaWRlVHJhbnNmb3JtZXIubWludXMoc291cmNlc1tzb3VyY2VJbmRleF0pO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cblxuIWZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3cuZnNMaWdodGJveEluc3RhbmNlcyA9IFtdO1xuICAgIHdpbmRvdy5mc0xpZ2h0Ym94SGVscGVycyA9IHtcbiAgICAgICAgXCJhXCI6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJylcbiAgICB9O1xuXG4gICAgbGV0IGEgPSB3aW5kb3cuZnNMaWdodGJveEhlbHBlcnMuYTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIGlmICghYVtpXS5oYXNBdHRyaWJ1dGUoJ2RhdGEtZnNsaWdodGJveCcpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJveE5hbWUgPSBhW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1mc2xpZ2h0Ym94Jyk7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93LmZzTGlnaHRib3hJbnN0YW5jZXNbYm94TmFtZV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5mc0xpZ2h0Ym94ID0gbmV3IHdpbmRvdy5mc0xpZ2h0Ym94Q2xhc3MoKTtcbiAgICAgICAgICAgIHdpbmRvdy5mc0xpZ2h0Ym94LmRhdGEubmFtZSA9IGJveE5hbWU7XG4gICAgICAgICAgICB3aW5kb3cuZnNMaWdodGJveEluc3RhbmNlc1tib3hOYW1lXSA9IHdpbmRvdy5mc0xpZ2h0Ym94O1xuICAgICAgICB9XG5cbiAgICAgICAgYVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgZ2FsbGVyeSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWZzbGlnaHRib3gnKTtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuZnNMaWdodGJveEluc3RhbmNlc1tnYWxsZXJ5XS5kYXRhLmluaXRpYXRlZCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5mc0xpZ2h0Ym94SW5zdGFuY2VzW2dhbGxlcnldLnNldFNsaWRlKFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZnNMaWdodGJveEluc3RhbmNlc1tnYWxsZXJ5XS5kYXRhLnVybHMuaW5kZXhPZih0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpKSArIDFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5mc0xpZ2h0Ym94SW5zdGFuY2VzW2dhbGxlcnldLnNob3coKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aW5kb3cuZnNMaWdodGJveEluc3RhbmNlc1tnYWxsZXJ5XS5pbml0KHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJykpO1xuICAgICAgICB9KTtcbiAgICB9XG59KGRvY3VtZW50LCB3aW5kb3cpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZnNMaWdodGJveCwgdHlwZU9mTG9hZCwgc2xpZGUpIHtcblxuICAgIGNvbnN0IERPTU9iamVjdCA9IHJlcXVpcmUoJy4vQ29tcG9uZW50cy9ET01PYmplY3QnKTtcblxuICAgIGNvbnN0IHNvdXJjZXNJbmRleGVzID0gZnNMaWdodGJveC5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKHNsaWRlKTtcbiAgICBjb25zdCB1cmxzID0gZnNMaWdodGJveC5kYXRhLnVybHM7XG4gICAgY29uc3Qgc291cmNlcyA9IGZzTGlnaHRib3guZGF0YS5zb3VyY2VzO1xuXG5cbiAgICBjb25zdCBhcHBlbmQgPSBmdW5jdGlvbiAoc291cmNlSG9sZGVyLCBzb3VyY2VFbGVtKSB7XG4gICAgICAgIHNvdXJjZUhvbGRlci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgc291cmNlSG9sZGVyLmFwcGVuZENoaWxkKHNvdXJjZUVsZW0pO1xuICAgICAgICB2b2lkIHNvdXJjZUhvbGRlci5maXJzdENoaWxkLm9mZnNldFdpZHRoO1xuICAgIH07XG5cbiAgICBsZXQgb25sb2FkTGlzdGVuZXIgPSBmdW5jdGlvbiAoc291cmNlRWxlbSwgc291cmNlV2lkdGgsIHNvdXJjZUhlaWdodCwgYXJyYXlJbmRleCkge1xuXG4gICAgICAgIGxldCBzb3VyY2VIb2xkZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zb3VyY2UtaG9sZGVyJ10pO1xuXG4gICAgICAgIC8vbm9ybWFsIHNvdXJjZSBkaW1lbnNpb25zIG5lZWRzIHRvIGJlIHN0b3JlZCBpbiBhcnJheVxuICAgICAgICAvL2l0IHdpbGwgYmUgbmVlZGVkIHdoZW4gcmVzaXppbmcgYSBzb3VyY2VcbiAgICAgICAgZnNMaWdodGJveC5kYXRhLnJlbWVtYmVyZWRTb3VyY2VzRGltZW5zaW9uc1thcnJheUluZGV4XSA9IHtcbiAgICAgICAgICAgIFwid2lkdGhcIjogc291cmNlV2lkdGgsXG4gICAgICAgICAgICBcImhlaWdodFwiOiBzb3VyY2VIZWlnaHRcbiAgICAgICAgfTtcbiAgICAgICAgc291cmNlSG9sZGVyLmFwcGVuZENoaWxkKHNvdXJjZUVsZW0pO1xuICAgICAgICBhcHBlbmQoc291cmNlc1thcnJheUluZGV4XSwgc291cmNlRWxlbSk7XG4gICAgICAgIGZzTGlnaHRib3gub25SZXNpemVFdmVudC5zY2FsZVNvdXJjZShhcnJheUluZGV4KTtcbiAgICB9O1xuXG5cbiAgICBjb25zdCBsb2FkWW91dHViZXZpZGVvID0gZnVuY3Rpb24gKHZpZGVvSWQsIGFycmF5SW5kZXgpIHtcbiAgICAgICAgbGV0IGlmcmFtZSA9IG5ldyBET01PYmplY3QoJ2lmcmFtZScpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNvdXJjZSddKTtcbiAgICAgICAgaWZyYW1lLnNyYyA9ICcvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8nICsgdmlkZW9JZCArICc/ZW5hYmxlanNhcGk9MSc7XG4gICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FsbG93ZnVsbHNjcmVlbicsICcnKTtcbiAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnZnJhbWVib3JkZXInLCAnMCcpO1xuICAgICAgICBmc0xpZ2h0Ym94Lm1lZGlhSG9sZGVyLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgICAgIG9ubG9hZExpc3RlbmVyKGlmcmFtZSwgMTkyMCwgMTA4MCwgYXJyYXlJbmRleCk7XG4gICAgfTtcblxuXG4gICAgY29uc3QgaW1hZ2VMb2FkID0gZnVuY3Rpb24gKHNyYywgYXJyYXlJbmRleCkge1xuICAgICAgICBsZXQgc291cmNlRWxlbSA9IG5ldyBET01PYmplY3QoJ2ltZycpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNvdXJjZSddKTtcbiAgICAgICAgc291cmNlRWxlbS5zcmMgPSBzcmM7XG4gICAgICAgIHNvdXJjZUVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9ubG9hZExpc3RlbmVyKHNvdXJjZUVsZW0sIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBhcnJheUluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuXG4gICAgY29uc3QgdmlkZW9Mb2FkID0gZnVuY3Rpb24gKHNyYywgYXJyYXlJbmRleCwgdHlwZSkge1xuICAgICAgICBsZXQgdmlkZW9Mb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IHZpZGVvRWxlbSA9IG5ldyBET01PYmplY3QoJ3ZpZGVvJykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc291cmNlJ10pO1xuICAgICAgICBsZXQgc291cmNlID0gbmV3IERPTU9iamVjdCgnc291cmNlJykuZWxlbTtcbiAgICAgICAgaWYgKGZzTGlnaHRib3guZGF0YS52aWRlb3NQb3N0ZXJzW2FycmF5SW5kZXhdKSB7XG4gICAgICAgICAgICB2aWRlb0VsZW0ucG9zdGVyID0gZnNMaWdodGJveC5kYXRhLnZpZGVvc1Bvc3RlcnNbYXJyYXlJbmRleF07XG4gICAgICAgICAgICB2aWRlb0VsZW0uc3R5bGUub2JqZWN0Rml0ID0gJ2NvdmVyJztcbiAgICAgICAgfVxuICAgICAgICBzb3VyY2Uuc3JjID0gc3JjO1xuICAgICAgICBzb3VyY2UudHlwZSA9IHR5cGU7XG4gICAgICAgIHZpZGVvRWxlbS5hcHBlbmRDaGlsZChzb3VyY2UpO1xuICAgICAgICBsZXQgd2lkdGg7XG4gICAgICAgIGxldCBoZWlnaHQ7XG4gICAgICAgIHZpZGVvRWxlbS5vbmxvYWRlZG1ldGFkYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHZpZGVvTG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgYnJvd3NlciBkb24ndCBzdXBwb3J0IHZpZGVvV2lkdGggYW5kIHZpZGVvSGVpZ2h0IHdlIG5lZWQgdG8gYWRkIGRlZmF1bHQgb25lc1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZpZGVvV2lkdGggfHwgdGhpcy52aWRlb1dpZHRoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgd2lkdGggPSAxOTIwO1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IDEwODA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdpZHRoID0gdGhpcy52aWRlb1dpZHRoO1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IHRoaXMudmlkZW9IZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2aWRlb0xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICBvbmxvYWRMaXN0ZW5lcih2aWRlb0VsZW0sIHdpZHRoLCBoZWlnaHQsIGFycmF5SW5kZXgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGlmIGJyb3dzZXIgZG9uJ3Qgc3VwcHJ0IGJvdGggb25sb2FkbWV0YWRhdGEgb3IgLnZpZGVvV2lkdGggd2Ugd2lsbCBsb2FkIGl0IGFmdGVyIDMwMDBtc1xuICAgICAgICBsZXQgY291bnRlciA9IDA7XG5cbiAgICAgICAgLy8gT04gSUUgb24gbG9hZCBldmVudCBkb250IHdvcmsgc28gd2UgbmVlZCB0byB3YWl0IGZvciBkaW1lbnNpb25zIHdpdGggc2V0VGltZW91dHNcbiAgICAgICAgbGV0IElFRml4ID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBpZiAodmlkZW9Mb2FkZWQpIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKElFRml4KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXZpZGVvRWxlbS52aWRlb1dpZHRoIHx8IHZpZGVvRWxlbS52aWRlb1dpZHRoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIgPCAzMSkge1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IDE5MjA7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IDEwODA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aWR0aCA9IHZpZGVvRWxlbS52aWRlb1dpZHRoO1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IHZpZGVvRWxlbS52aWRlb0hlaWdodDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmlkZW9Mb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgb25sb2FkTGlzdGVuZXIodmlkZW9FbGVtLCB3aWR0aCwgaGVpZ2h0LCBhcnJheUluZGV4KTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoSUVGaXgpO1xuICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgIHZpZGVvRWxlbS5zZXRBdHRyaWJ1dGUoJ2NvbnRyb2xzJywgJycpO1xuICAgIH07XG5cbiAgICBjb25zdCBpbnZhbGlkRmlsZSA9IGZ1bmN0aW9uIChhcnJheUluZGV4KSB7XG4gICAgICAgIGxldCBpbnZhbGlkRmlsZVdyYXBwZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKVxuICAgICAgICAgICAgLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LWludmFsaWQtZmlsZS13cmFwcGVyJywgJ2ZzbGlnaHRib3gtZmxleC1jZW50ZXJlZCddKTtcbiAgICAgICAgaW52YWxpZEZpbGVXcmFwcGVyLmlubmVySFRNTCA9ICdJbnZhbGlkIGZpbGUnO1xuXG4gICAgICAgIG9ubG9hZExpc3RlbmVyKGludmFsaWRGaWxlV3JhcHBlciwgd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCwgYXJyYXlJbmRleCk7XG4gICAgfTtcblxuXG4gICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtID0gZnVuY3Rpb24gKHVybEluZGV4KSB7XG4gICAgICAgIGNvbnN0IHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgY29uc3Qgc291cmNlVXJsID0gZnNMaWdodGJveC5kYXRhLnVybHNbdXJsSW5kZXhdO1xuXG4gICAgICAgIHBhcnNlci5ocmVmID0gc291cmNlVXJsO1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldElkKHNvdXJjZVVybCkge1xuICAgICAgICAgICAgbGV0IHJlZ0V4cCA9IC9eLiooeW91dHUuYmVcXC98dlxcL3x1XFwvXFx3XFwvfGVtYmVkXFwvfHdhdGNoXFw/dj18XFwmdj0pKFteI1xcJlxcP10qKS4qLztcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IHNvdXJjZVVybC5tYXRjaChyZWdFeHApO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2ggJiYgbWF0Y2hbMl0ubGVuZ3RoID09IDExKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoWzJdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2Vycm9yJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJzZXIuaG9zdG5hbWUgPT09ICd3d3cueW91dHViZS5jb20nKSB7XG4gICAgICAgICAgICBmc0xpZ2h0Ym94LmRhdGEudmlkZW9zW3VybEluZGV4XSA9IGZhbHNlO1xuICAgICAgICAgICAgbG9hZFlvdXR1YmV2aWRlbyhnZXRJZChzb3VyY2VVcmwpLCB1cmxJbmRleCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCB8fCB4aHIuc3RhdHVzID09PSAyMDYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgd2hhdCB0eXBlIG9mIGZpbGUgcHJvdmlkZWQgZnJvbSBsaW5rXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZVR5cGUgPSB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ2NvbnRlbnQtdHlwZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YVR5cGUgPSByZXNwb25zZVR5cGUuc2xpY2UoMCwgcmVzcG9uc2VUeXBlLmluZGV4T2YoJy8nKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhVHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlTG9hZCh1cmxzW3VybEluZGV4XSwgdXJsSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhVHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvTG9hZCh1cmxzW3VybEluZGV4XSwgdXJsSW5kZXgsIHJlc3BvbnNlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnNMaWdodGJveC5kYXRhLnZpZGVvc1t1cmxJbmRleF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZhbGlkRmlsZSh1cmxJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZhbGlkRmlsZSh1cmxJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgeGhyLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgeGhyLm9wZW4oJ2dldCcsIHNvdXJjZVVybCwgdHJ1ZSk7XG4gICAgICAgICAgICB4aHIuc2VuZChudWxsKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIGlmICh0eXBlT2ZMb2FkID09PSAnaW5pdGlhbCcpIHtcbiAgICAgICAgLy9hcHBlbmQgbG9hZGVyIHdoZW4gbG9hZGluZyBpbml0aWFsbHlcbiAgICAgICAgZnNMaWdodGJveC5hcHBlbmRNZXRob2RzLnJlbmRlckhvbGRlckluaXRpYWwoc2xpZGUsIERPTU9iamVjdCk7XG5cbiAgICAgICAgaWYgKHVybHMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbShzb3VyY2VzSW5kZXhlcy5jdXJyZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1cmxzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc291cmNlc0luZGV4ZXMubmV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXJscy5sZW5ndGggPj0gMykge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNvdXJjZXNJbmRleGVzLnByZXZpb3VzKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGFwcGVuZCBsb2FkZXIgd2hlbiBsb2FkaW5nIGEgbmV4dCBzb3VyY2VcbiAgICAgICAgZnNMaWdodGJveC5hcHBlbmRNZXRob2RzLnJlbmRlckhvbGRlcihzbGlkZSwgdHlwZU9mTG9hZCk7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlT2ZMb2FkKSB7XG4gICAgICAgICAgICBjYXNlICdwcmV2aW91cyc6XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNvdXJjZXNJbmRleGVzLnByZXZpb3VzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2N1cnJlbnQnOlxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbShzb3VyY2VzSW5kZXhlcy5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ25leHQnOlxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbShzb3VyY2VzSW5kZXhlcy5uZXh0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZnNMaWdodGJveCkge1xuICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICBjb25zdCBzb3VyY2VzID0gZnNMaWdodGJveC5kYXRhLnNvdXJjZXM7XG4gICAgY29uc3QgcmVtZW1iZXJlZFNvdXJjZURpbWVuc2lvbiA9IGZzTGlnaHRib3guZGF0YS5yZW1lbWJlcmVkU291cmNlc0RpbWVuc2lvbnM7XG5cbiAgICB0aGlzLm1lZGlhSG9sZGVyRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgbWVkaWFIb2xkZXJTdHlsZSA9IGZzTGlnaHRib3gubWVkaWFIb2xkZXIuc3R5bGU7XG4gICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICBpZiAod2luZG93V2lkdGggPiAxMDAwKSB7XG4gICAgICAgICAgICBtZWRpYUhvbGRlclN0eWxlLndpZHRoID0gKHdpbmRvd1dpZHRoIC0gKDAuMSAqIHdpbmRvd1dpZHRoKSkgKyAncHgnO1xuICAgICAgICAgICAgbWVkaWFIb2xkZXJTdHlsZS5oZWlnaHQgPSAod2luZG93SGVpZ2h0IC0gKDAuMSAqIHdpbmRvd0hlaWdodCkpICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lZGlhSG9sZGVyU3R5bGUud2lkdGggPSB3aW5kb3dXaWR0aCArICdweCc7XG4gICAgICAgICAgICBtZWRpYUhvbGRlclN0eWxlLmhlaWdodCA9ICh3aW5kb3dIZWlnaHQgLSAoMC4xICogd2luZG93SGVpZ2h0KSkgKyAncHgnO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgdGhpcy5zY2FsZUFuZFRyYW5zZm9ybVNvdXJjZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZXNDb3VudCA9IGZzTGlnaHRib3guZGF0YS51cmxzLmxlbmd0aDtcbiAgICAgICAgY29uc3Qgc3RhZ2VTb3VyY2VzSW5kZXhlcyA9IGZzTGlnaHRib3guc3RhZ2VTb3VyY2VJbmRleGVzLmFsbChmc0xpZ2h0Ym94LmRhdGEuc2xpZGUpO1xuICAgICAgICBpZiAoc291cmNlc0NvdW50ID4gMCkge1xuICAgICAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLnplcm8oc291cmNlc1tzdGFnZVNvdXJjZXNJbmRleGVzLmN1cnJlbnRdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzb3VyY2VzQ291bnQgPiAxKSB7XG4gICAgICAgICAgICBmc0xpZ2h0Ym94LnNsaWRlVHJhbnNmb3JtZXIucGx1cyhzb3VyY2VzW3N0YWdlU291cmNlc0luZGV4ZXMubmV4dF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNvdXJjZXNDb3VudCA+IDIpIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3guc2xpZGVUcmFuc2Zvcm1lci5taW51cyhzb3VyY2VzW3N0YWdlU291cmNlc0luZGV4ZXMucHJldmlvdXNdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc291cmNlc0NvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuc2NhbGVTb3VyY2UoaSk7XG4gICAgICAgICAgICBpZiAoaSAhPT0gc3RhZ2VTb3VyY2VzSW5kZXhlcy5jdXJyZW50XG4gICAgICAgICAgICAgICAgJiYgaSAhPT0gc3RhZ2VTb3VyY2VzSW5kZXhlcy5uZXh0XG4gICAgICAgICAgICAgICAgJiYgaSAhPT0gc3RhZ2VTb3VyY2VzSW5kZXhlcy5wcmV2aW91c1xuICAgICAgICAgICAgICAgICYmIHNvdXJjZXNbaV0pIHtcbiAgICAgICAgICAgICAgICBmc0xpZ2h0Ym94LnNsaWRlVHJhbnNmb3JtZXIucGx1cyhzb3VyY2VzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHRoaXMuc2NhbGVTb3VyY2UgPSBmdW5jdGlvbiAoc291cmNlSW5kZXgpIHtcbiAgICAgICAgaWYgKCFzb3VyY2VzW3NvdXJjZUluZGV4XSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gc291cmNlc1tzb3VyY2VJbmRleF0uZmlyc3RDaGlsZDtcbiAgICAgICAgbGV0IHNvdXJjZVdpZHRoID0gcmVtZW1iZXJlZFNvdXJjZURpbWVuc2lvbltzb3VyY2VJbmRleF0ud2lkdGg7XG4gICAgICAgIGxldCBzb3VyY2VIZWlnaHQgPSByZW1lbWJlcmVkU291cmNlRGltZW5zaW9uW3NvdXJjZUluZGV4XS5oZWlnaHQ7XG5cbiAgICAgICAgY29uc3QgY29lZmZpY2llbnQgPSBzb3VyY2VXaWR0aCAvIHNvdXJjZUhlaWdodDtcbiAgICAgICAgY29uc3QgZGV2aWNlV2lkdGggPSBwYXJzZUludChmc0xpZ2h0Ym94Lm1lZGlhSG9sZGVyLnN0eWxlLndpZHRoKTtcbiAgICAgICAgY29uc3QgZGV2aWNlSGVpZ2h0ID0gcGFyc2VJbnQoZnNMaWdodGJveC5tZWRpYUhvbGRlci5zdHlsZS5oZWlnaHQpO1xuICAgICAgICBsZXQgbmV3SGVpZ2h0ID0gZGV2aWNlV2lkdGggLyBjb2VmZmljaWVudDtcblxuICAgICAgICBjb25zdCBzZXREaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBuZXdIZWlnaHQgKyBcInB4XCI7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gKG5ld0hlaWdodCAqIGNvZWZmaWNpZW50KSArIFwicHhcIjtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyB3aWRlciB0aGFuIGhpZ2hlclxuICAgICAgICBpZiAobmV3SGVpZ2h0IDwgZGV2aWNlSGVpZ2h0KSB7XG4gICAgICAgICAgICBpZiAoc291cmNlV2lkdGggPCBkZXZpY2VXaWR0aCkge1xuICAgICAgICAgICAgICAgIG5ld0hlaWdodCA9IHNvdXJjZUhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldERpbWVuc2lvbnMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaGlnaGVyIHRoYW4gd2lkZXJcbiAgICAgICAgaWYgKHNvdXJjZUhlaWdodCA+IGRldmljZUhlaWdodCkge1xuICAgICAgICAgICAgbmV3SGVpZ2h0ID0gZGV2aWNlSGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3SGVpZ2h0ID0gc291cmNlSGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RGltZW5zaW9ucygpO1xuICAgIH07XG5cbiAgICB0aGlzLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubWVkaWFIb2xkZXJEaW1lbnNpb25zKCk7XG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIoKTtcbiAgICB9O1xuXG4gICAgdGhpcy5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVMaXN0ZW5lcik7XG4gICAgfTtcblxuICAgICB0aGlzLnJlc2l6ZUxpc3RlbmVyID0gZnVuY3Rpb24oKSAge1xuICAgICAgICBfdGhpcy5tZWRpYUhvbGRlckRpbWVuc2lvbnMoKTtcbiAgICAgICAgX3RoaXMuc2NhbGVBbmRUcmFuc2Zvcm1Tb3VyY2VzKCk7XG4gICAgfTtcblxuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplTGlzdGVuZXIpO1xuICAgIH07XG59O1xuIl19
