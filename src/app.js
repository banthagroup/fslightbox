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
                self.appendMethods.previousSlideViaButton(self.data.slide);
                break;
            case RIGHT_ARROW:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9ET01PYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9NZWRpYUhvbGRlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL1NWR0ljb24uanMiLCJzcmMvanMvQ29tcG9uZW50cy9Ub29sYmFyLmpzIiwic3JjL2pzL0NvcmUvRG9tUmVuZGVyZXIuanMiLCJzcmMvanMvQ29yZS9LZXlib2FyZENvbnRyb2xsZXIuanMiLCJzcmMvanMvQ29yZS9TY3JvbGxiYXJSZWNvbXBlbnNvci5qcyIsInNyYy9qcy9Db3JlL1Njcm9sbGJhcldpZHRoR2V0dGVyLmpzIiwic3JjL2pzL0NvcmUvU2xpZGVTd2lwaW5nLmpzIiwic3JjL2pzL0NvcmUvU2xpZGVUcmFuc2Zvcm1lci5qcyIsInNyYy9qcy9Db3JlL1N0YWdlU291cmNlc0luZGV4ZXMuanMiLCJzcmMvanMvQ29yZS9ldmVudHMtY29udHJvbGxlcnMvRG9jdW1lbnRLZXlEb3duRXZlbnRDb250cm9sbGVyLmpzIiwic3JjL2pzL2FwcGVuZE1ldGhvZHMuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvbG9hZFNvdXJjZS5qcyIsInNyYy9qcy9vblJlc2l6ZUV2ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhZykge1xuICAgIHRoaXMuZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcblxuICAgIHRoaXMuYWRkQ2xhc3Nlc0FuZENyZWF0ZSA9IGZ1bmN0aW9uIChjbGFzc2VzKSB7XG4gICAgICAgIGZvciAobGV0IGluZGV4IGluIGNsYXNzZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzZXNbaW5kZXhdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5lbGVtXG4gICAgfVxufTsiLCJjb25zdCBET01PYmplY3QgPSByZXF1aXJlKCcuL0RPTU9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBob2xkZXIgPSBuZXcgRE9NT2JqZWN0KCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1tZWRpYS1ob2xkZXInXSk7XG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gMTAwMCkge1xuICAgICAgICBob2xkZXIuc3R5bGUud2lkdGggPSAod2luZG93LmlubmVyV2lkdGggLSAwLjEgKiB3aW5kb3cuaW5uZXJXaWR0aCkgKyAncHgnO1xuICAgICAgICBob2xkZXIuc3R5bGUuaGVpZ2h0ID0gKHdpbmRvdy5pbm5lckhlaWdodCAtIDAuMSAqIHdpbmRvdy5pbm5lckhlaWdodCkgKyAncHgnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGhvbGRlci5zdHlsZS53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4JztcbiAgICAgICAgaG9sZGVyLnN0eWxlLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCArICdweCc7XG4gICAgfVxuICAgIHJldHVybiBob2xkZXI7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIFwic3ZnXCIpO1xuICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICdjbGFzcycsICdmc2xpZ2h0Ym94LXN2Zy1pY29uJyk7XG4gICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3ZpZXdCb3gnLCAnMCAwIDE1IDE1Jyk7XG4gICAgdGhpcy5wYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIFwicGF0aFwiKTtcbiAgICB0aGlzLnBhdGguc2V0QXR0cmlidXRlTlMobnVsbCwgJ2NsYXNzJywgJ2ZzbGlnaHRib3gtc3ZnLXBhdGgnKTtcblxuICAgIHRoaXMuZ2V0U1ZHSWNvbiA9IGZ1bmN0aW9uICh2aWV3Qm94LCBkaW1lbnNpb24sIGQpIHtcbiAgICAgICAgdGhpcy5wYXRoLnNldEF0dHJpYnV0ZU5TKG51bGwsICdkJywgZCk7XG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICd2aWV3Qm94Jywgdmlld0JveCk7XG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICd3aWR0aCcsIGRpbWVuc2lvbik7XG4gICAgICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICdoZWlnaHQnLCBkaW1lbnNpb24pO1xuICAgICAgICB0aGlzLnN2Zy5hcHBlbmRDaGlsZCh0aGlzLnBhdGgpO1xuICAgICAgICByZXR1cm4gdGhpcy5zdmc7XG4gICAgfVxufTtcbiIsImNvbnN0IERPTU9iamVjdCA9IHJlcXVpcmUoJy4vRE9NT2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZzTGlnaHRib3gpIHtcbiAgICB0aGlzLnRvb2xiYXJFbGVtID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtdG9vbGJhciddKTtcbiAgICBjb25zdCBvcGVuRnVsbHNjcmVlblZpZXdCb3ggPSAnMCAwIDE3LjUgMTcuNSc7XG4gICAgY29uc3Qgb3BlbkZ1bGxzY3JlZW5EID0gJ000LjUgMTFIM3Y0aDR2LTEuNUg0LjVWMTF6TTMgN2gxLjVWNC41SDdWM0gzdjR6bTEwLjUgNi41SDExVjE1aDR2LTRoLTEuNXYyLjV6TTExIDN2MS41aDIuNVY3SDE1VjNoLTR6JztcbiAgICBjb25zdCBjbG9zZUZ1bGxzY3JlZW5WaWV3Qm94ID0gJzAgMCA5NTAgMTAyNCc7XG4gICAgY29uc3QgY2xvc2VGdWxsc2NyZWVuRCA9ICdNNjgyIDM0MmgxMjh2ODRoLTIxMnYtMjEyaDg0djEyOHpNNTk4IDgxMHYtMjEyaDIxMnY4NGgtMTI4djEyOGgtODR6TTM0MiAzNDJ2LTEyOGg4NHYyMTJoLTIxMnYtODRoMTI4ek0yMTQgNjgydi04NGgyMTJ2MjEyaC04NHYtMTI4aC0xMjh6JztcbiAgICBsZXQgZnVsbHNjcmVlblN2ZztcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLnJlbmRlckRlZmF1bHRCdXR0b25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgc2hvdWxkUmVuZGVyQnV0dG9ucyA9IGZzTGlnaHRib3guZGF0YS50b29sYmFyQnV0dG9ucztcblxuICAgICAgICBpZiAoc2hvdWxkUmVuZGVyQnV0dG9ucy5mdWxsc2NyZWVuID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsZXQgYnV0dG9uID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtdG9vbGJhci1idXR0b24nLCAnZnNsaWdodGJveC1mbGV4LWNlbnRlcmVkJ10pO1xuICAgICAgICAgICAgZnVsbHNjcmVlblN2ZyA9IG5ldyBmc0xpZ2h0Ym94LlNWR0ljb24oKS5nZXRTVkdJY29uKCcwIDAgMTcuNSAxNy41JyArXG4gICAgICAgICAgICAgICAgJycsICcyMHB4Jywgb3BlbkZ1bGxzY3JlZW5EKTtcbiAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChmdWxsc2NyZWVuU3ZnKTtcbiAgICAgICAgICAgIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIChmc0xpZ2h0Ym94LmRhdGEuZnVsbHNjcmVlbikgP1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jbG9zZUZ1bGxzY3JlZW4oKSA6XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm9wZW5GdWxsc2NyZWVuKCk7XG5cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnRvb2xiYXJFbGVtLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2hvdWxkUmVuZGVyQnV0dG9ucy5jbG9zZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXRvb2xiYXItYnV0dG9uJywgJ2ZzbGlnaHRib3gtZmxleC1jZW50ZXJlZCddKTtcbiAgICAgICAgICAgIGxldCBzdmcgPSBuZXcgZnNMaWdodGJveC5TVkdJY29uKCkuZ2V0U1ZHSWNvbignMCAwIDIwIDIwJywgJzE2cHgnLCAnTSAxMS40NjkgMTAgbCA3LjA4IC03LjA4IGMgMC40MDYgLTAuNDA2IDAuNDA2IC0xLjA2NCAwIC0xLjQ2OSBjIC0wLjQwNiAtMC40MDYgLTEuMDYzIC0wLjQwNiAtMS40NjkgMCBMIDEwIDguNTMgbCAtNy4wODEgLTcuMDggYyAtMC40MDYgLTAuNDA2IC0xLjA2NCAtMC40MDYgLTEuNDY5IDAgYyAtMC40MDYgMC40MDYgLTAuNDA2IDEuMDYzIDAgMS40NjkgTCA4LjUzMSAxMCBMIDEuNDUgMTcuMDgxIGMgLTAuNDA2IDAuNDA2IC0wLjQwNiAxLjA2NCAwIDEuNDY5IGMgMC4yMDMgMC4yMDMgMC40NjkgMC4zMDQgMC43MzUgMC4zMDQgYyAwLjI2NiAwIDAuNTMxIC0wLjEwMSAwLjczNSAtMC4zMDQgTCAxMCAxMS40NjkgbCA3LjA4IDcuMDgxIGMgMC4yMDMgMC4yMDMgMC40NjkgMC4zMDQgMC43MzUgMC4zMDQgYyAwLjI2NyAwIDAuNTMyIC0wLjEwMSAwLjczNSAtMC4zMDQgYyAwLjQwNiAtMC40MDYgMC40MDYgLTEuMDY0IDAgLTEuNDY5IEwgMTEuNDY5IDEwIFonKTtcbiAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChzdmcpO1xuICAgICAgICAgICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFmc0xpZ2h0Ym94LmRhdGEuZmFkaW5nT3V0KSBmc0xpZ2h0Ym94LmhpZGUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnRvb2xiYXJFbGVtLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB0aGlzLm9wZW5GdWxsc2NyZWVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmc0xpZ2h0Ym94LmRhdGEuZnVsbHNjcmVlbiA9IHRydWU7XG4gICAgICAgIGZ1bGxzY3JlZW5TdmcuZmlyc3RDaGlsZC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZCcsIGNsb3NlRnVsbHNjcmVlbkQpO1xuICAgICAgICBmdWxsc2NyZWVuU3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICd2aWV3Qm94JywgY2xvc2VGdWxsc2NyZWVuVmlld0JveCk7XG4gICAgICAgIGZ1bGxzY3JlZW5Tdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3dpZHRoJywgJzI0cHgnKTtcbiAgICAgICAgZnVsbHNjcmVlblN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaGVpZ2h0JywgJzI0cHgnKTtcbiAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIGlmIChlbGVtLnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBlbGVtLnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbS5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICAgICAgZWxlbS5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW0ud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGVsZW0ud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtLm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGVsZW0ubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuY2xvc2VGdWxsc2NyZWVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmc0xpZ2h0Ym94LmRhdGEuZnVsbHNjcmVlbiA9IGZhbHNlO1xuICAgICAgICBmdWxsc2NyZWVuU3ZnLmZpcnN0Q2hpbGQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2QnLCBvcGVuRnVsbHNjcmVlbkQpO1xuICAgICAgICBmdWxsc2NyZWVuU3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICd2aWV3Qm94Jywgb3BlbkZ1bGxzY3JlZW5WaWV3Qm94KTtcbiAgICAgICAgZnVsbHNjcmVlblN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnd2lkdGgnLCAnMjBweCcpO1xuICAgICAgICBmdWxsc2NyZWVuU3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICdoZWlnaHQnLCAnMjBweCcpO1xuICAgICAgICBpZiAoZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnJlbmRlclRvb2xiYXIgPSBmdW5jdGlvbiAobmF2KSB7XG4gICAgICAgIHRoaXMucmVuZGVyRGVmYXVsdEJ1dHRvbnMoKTtcbiAgICAgICAgbmF2LmFwcGVuZENoaWxkKHRoaXMudG9vbGJhckVsZW0pO1xuICAgIH07XG59OyIsImNvbnN0IERPTU9iamVjdCA9IHJlcXVpcmUoJy4uL0NvbXBvbmVudHMvRE9NT2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZzTGlnaHRib3gpIHtcbiAgICB0aGlzLnJlbmRlckRPTSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnNMaWdodGJveC5lbGVtZW50LmlkID0gXCJmc2xpZ2h0Ym94LWNvbnRhaW5lclwiO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZzTGlnaHRib3guZWxlbWVudCk7XG5cbiAgICAgICAgLy9yZW5kZXIgc2xpZGUgYnV0dG9ucyBhbmQgbmF2KHRvb2xiYXIpXG4gICAgICAgIHJlbmRlck5hdihmc0xpZ2h0Ym94LmVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChmc0xpZ2h0Ym94LmRhdGEudG90YWxTbGlkZXMgPiAxKSB7XG4gICAgICAgICAgICByZW5kZXJTbGlkZUJ1dHRvbnMoZnNMaWdodGJveC5lbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBmc0xpZ2h0Ym94LmVsZW1lbnQuYXBwZW5kQ2hpbGQoZnNMaWdodGJveC5tZWRpYUhvbGRlcik7XG4gICAgICAgIGZzTGlnaHRib3guZWxlbWVudC5hcHBlbmRDaGlsZChnZXREb3duRXZlbnREZXRlY3RvcigpKTtcbiAgICAgICAgZnNMaWdodGJveC5kYXRhLmlzZmlyc3RUaW1lTG9hZCA9IHRydWU7XG4gICAgfTtcblxuICAgIGNvbnN0IGdldERvd25FdmVudERldGVjdG9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZnNMaWdodGJveC5kYXRhLmRvd25FdmVudERldGVjdG9yID0gbmV3IERPTU9iamVjdCgnZGl2JylcbiAgICAgICAgICAgIC5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1kb3duLWV2ZW50LWRldGVjdG9yJywgJ2ZzbGlnaHRib3gtZnVsbC1kaW1lbnNpb24nXSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNsaWRlQ291bnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IG51bWJlckNvbnRhaW5lciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLW51bWJlci1jb250YWluZXInLCAnZnNsaWdodGJveC1mbGV4LWNlbnRlcmVkJ10pO1xuICAgICAgICBmc0xpZ2h0Ym94LmRhdGEuc2xpZGVDb3VudGVyRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBzbGlkZUNvdW50ZXJFbGVtID0gZnNMaWdodGJveC5kYXRhLnNsaWRlQ291bnRlckVsZW07XG5cbiAgICAgICAgc2xpZGVDb3VudGVyRWxlbS5pbm5lckhUTUwgPSBmc0xpZ2h0Ym94LmRhdGEuc2xpZGU7XG4gICAgICAgIHNsaWRlQ291bnRlckVsZW0uaWQgPSAnY3VycmVudF9zbGlkZSc7XG5cbiAgICAgICAgbGV0IHNwYWNlID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xhc2gnXSk7XG4gICAgICAgIHNwYWNlLmlubmVySFRNTCA9ICcvJztcblxuICAgICAgICBsZXQgc2xpZGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNsaWRlcy5pbm5lckhUTUwgPSBmc0xpZ2h0Ym94LmRhdGEudG90YWxTbGlkZXM7XG5cbiAgICAgICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNsaWRlQ291bnRlckVsZW0pO1xuICAgICAgICBudW1iZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoc3BhY2UpO1xuICAgICAgICBudW1iZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoc2xpZGVzKTtcblxuICAgICAgICB0aGlzLnJlbmRlclNsaWRlQ291bnRlciA9IGZ1bmN0aW9uIChuYXYpIHtcbiAgICAgICAgICAgIGlmIChmc0xpZ2h0Ym94LmRhdGEuc2xpZGVDb3VudGVyKVxuICAgICAgICAgICAgICAgIG5hdi5hcHBlbmRDaGlsZChudW1iZXJDb250YWluZXIpO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgY29uc3QgcmVuZGVyTmF2ID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgICAgICBmc0xpZ2h0Ym94LmRhdGEubmF2ID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtbmF2J10pO1xuICAgICAgICBmc0xpZ2h0Ym94LnRvb2xiYXIucmVuZGVyVG9vbGJhcihmc0xpZ2h0Ym94LmRhdGEubmF2KTtcblxuICAgICAgICBpZiAoZnNMaWdodGJveC5kYXRhLnRvdGFsU2xpZGVzID4gMSkge1xuICAgICAgICAgICAgY29uc3QgY291bnRlciA9IG5ldyBzbGlkZUNvdW50ZXIoKTtcbiAgICAgICAgICAgIGNvdW50ZXIucmVuZGVyU2xpZGVDb3VudGVyKGZzTGlnaHRib3guZGF0YS5uYXYpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmc0xpZ2h0Ym94LmRhdGEubmF2KTtcblxuICAgIH07XG5cbiAgICBjb25zdCBjcmVhdGVCVE4gPSBmdW5jdGlvbiAoYnV0dG9uQ29udGFpbmVyLCBjb250YWluZXIsIGQpIHtcbiAgICAgICAgbGV0IGJ0biA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNsaWRlLWJ0bicsICdmc2xpZ2h0Ym94LWZsZXgtY2VudGVyZWQnXSk7XG4gICAgICAgIGJ0bi5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIG5ldyBmc0xpZ2h0Ym94LlNWR0ljb24oKS5nZXRTVkdJY29uKCcwIDAgMjAgMjAnLCAnMjJweCcsIGQpXG4gICAgICAgICk7XG4gICAgICAgIGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uQ29udGFpbmVyKTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVuZGVyU2xpZGVCdXR0b25zID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgICAgICBpZiAoZnNMaWdodGJveC5kYXRhLnNsaWRlQnV0dG9ucyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvL3JlbmRlciBsZWZ0IGJ0blxuICAgICAgICBsZXQgbGVmdF9idG5fY29udGFpbmVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtYnRuLWNvbnRhaW5lcicsICdmc2xpZ2h0Ym94LXNsaWRlLWJ0bi1sZWZ0LWNvbnRhaW5lciddKTtcbiAgICAgICAgY3JlYXRlQlROKGxlZnRfYnRuX2NvbnRhaW5lciwgY29udGFpbmVyLCAnTTE4LjI3MSw5LjIxMkgzLjYxNWw0LjE4NC00LjE4NGMwLjMwNi0wLjMwNiwwLjMwNi0wLjgwMSwwLTEuMTA3Yy0wLjMwNi0wLjMwNi0wLjgwMS0wLjMwNi0xLjEwNywwTDEuMjEsOS40MDNDMS4xOTQsOS40MTcsMS4xNzQsOS40MjEsMS4xNTgsOS40MzdjLTAuMTgxLDAuMTgxLTAuMjQyLDAuNDI1LTAuMjA5LDAuNjZjMC4wMDUsMC4wMzgsMC4wMTIsMC4wNzEsMC4wMjIsMC4xMDljMC4wMjgsMC4wOTgsMC4wNzUsMC4xODgsMC4xNDIsMC4yNzFjMC4wMjEsMC4wMjYsMC4wMjEsMC4wNjEsMC4wNDUsMC4wODVjMC4wMTUsMC4wMTYsMC4wMzQsMC4wMiwwLjA1LDAuMDMzbDUuNDg0LDUuNDgzYzAuMzA2LDAuMzA3LDAuODAxLDAuMzA3LDEuMTA3LDBjMC4zMDYtMC4zMDUsMC4zMDYtMC44MDEsMC0xLjEwNWwtNC4xODQtNC4xODVoMTQuNjU2YzAuNDM2LDAsMC43ODgtMC4zNTMsMC43ODgtMC43ODhTMTguNzA3LDkuMjEyLDE4LjI3MSw5LjIxMnonKTtcblxuICAgICAgICAvL2dvIHRvIHByZXZpb3VzIHNsaWRlIG9uY2xpY2tcbiAgICAgICAgbGVmdF9idG5fY29udGFpbmVyLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmc0xpZ2h0Ym94LmFwcGVuZE1ldGhvZHMucHJldmlvdXNTbGlkZVZpYUJ1dHRvbihmc0xpZ2h0Ym94LmRhdGEuc2xpZGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGxldCByaWdodF9idG5fY29udGFpbmVyID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc2xpZGUtYnRuLWNvbnRhaW5lcicsICdmc2xpZ2h0Ym94LXNsaWRlLWJ0bi1yaWdodC1jb250YWluZXInXSk7XG4gICAgICAgIGNyZWF0ZUJUTihyaWdodF9idG5fY29udGFpbmVyLCBjb250YWluZXIsICdNMS43MjksOS4yMTJoMTQuNjU2bC00LjE4NC00LjE4NGMtMC4zMDctMC4zMDYtMC4zMDctMC44MDEsMC0xLjEwN2MwLjMwNS0wLjMwNiwwLjgwMS0wLjMwNiwxLjEwNiwwbDUuNDgxLDUuNDgyYzAuMDE4LDAuMDE0LDAuMDM3LDAuMDE5LDAuMDUzLDAuMDM0YzAuMTgxLDAuMTgxLDAuMjQyLDAuNDI1LDAuMjA5LDAuNjZjLTAuMDA0LDAuMDM4LTAuMDEyLDAuMDcxLTAuMDIxLDAuMTA5Yy0wLjAyOCwwLjA5OC0wLjA3NSwwLjE4OC0wLjE0MywwLjI3MWMtMC4wMjEsMC4wMjYtMC4wMjEsMC4wNjEtMC4wNDUsMC4wODVjLTAuMDE1LDAuMDE2LTAuMDM0LDAuMDItMC4wNTEsMC4wMzNsLTUuNDgzLDUuNDgzYy0wLjMwNiwwLjMwNy0wLjgwMiwwLjMwNy0xLjEwNiwwYy0wLjMwNy0wLjMwNS0wLjMwNy0wLjgwMSwwLTEuMTA1bDQuMTg0LTQuMTg1SDEuNzI5Yy0wLjQzNiwwLTAuNzg4LTAuMzUzLTAuNzg4LTAuNzg4UzEuMjkzLDkuMjEyLDEuNzI5LDkuMjEyeicpO1xuICAgICAgICAvLyBnbyB0byBuZXh0IHNsaWRlIG9uIGNsaWNrXG4gICAgICAgIHJpZ2h0X2J0bl9jb250YWluZXIub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3guYXBwZW5kTWV0aG9kcy5uZXh0U2xpZGVWaWFCdXR0b24oZnNMaWdodGJveC5kYXRhLnNsaWRlKTtcbiAgICAgICAgfTtcbiAgICB9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWxmKSB7XG4gICAgY29uc3QgRVNDQVBFID0gJ0VzY2FwZSc7XG4gICAgY29uc3QgTEVGVF9BUlJPVyA9ICdBcnJvd0xlZnQnO1xuICAgIGNvbnN0IFJJR0hUX0FSUk9XID0gJ0Fycm93UmlnaHQnO1xuXG4gICAgdGhpcy5oYW5kbGVLZXlEb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgY2FzZSBFU0NBUEU6XG4gICAgICAgICAgICAgICAgc2VsZi5oaWRlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgICAgICAgc2VsZi5hcHBlbmRNZXRob2RzLnByZXZpb3VzU2xpZGVWaWFCdXR0b24oc2VsZi5kYXRhLnNsaWRlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUklHSFRfQVJST1c6XG4gICAgICAgICAgICAgICAgc2VsZi5hcHBlbmRNZXRob2RzLm5leHRTbGlkZVZpYUJ1dHRvbihzZWxmLmRhdGEuc2xpZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzY3JvbGxiYXJXaWR0aCkge1xuICAgIHRoaXMuYWRkUmVjb21wZW5zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFkb2VzU2Nyb2xsYmFySGF2ZVdpZHRoKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUubWFyZ2luUmlnaHQgPSBzY3JvbGxiYXJXaWR0aCArICdweCc7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzVG9SZWNvbXBlbnNlID0gZ2V0UmVjb21wZW5zZUVsZW1lbnRzKCk7XG4gICAgICAgIGlmICghZWxlbWVudHNUb1JlY29tcGVuc2UpIHJldHVybjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50c1RvUmVjb21wZW5zZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZWxlbWVudHNUb1JlY29tcGVuc2VbaV0uc3R5bGUubWFyZ2luUmlnaHQgPSBzY3JvbGxiYXJXaWR0aCArICdweCc7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5yZW1vdmVSZWNvbXBlbnNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWRvZXNTY3JvbGxiYXJIYXZlV2lkdGgoKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm1hcmdpblJpZ2h0ID0gJyc7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzVG9SZWNvbXBlbnNlID0gZ2V0UmVjb21wZW5zZUVsZW1lbnRzKCk7XG4gICAgICAgIGlmICghZWxlbWVudHNUb1JlY29tcGVuc2UpIHJldHVybjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50c1RvUmVjb21wZW5zZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZWxlbWVudHNUb1JlY29tcGVuc2VbaV0uc3R5bGUubWFyZ2luUmlnaHQgPSAnJztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBnZXRSZWNvbXBlbnNlRWxlbWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyZWNvbXBlbnNlLWZvci1zY3JvbGxiYXInKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZG9lc1Njcm9sbGJhckhhdmVXaWR0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICEhc2Nyb2xsYmFyV2lkdGg7XG4gICAgfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgdGhpcy5nZXRXaWR0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IG91dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgb3V0ZXIuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgIG91dGVyLnN0eWxlLndpZHRoID0gXCIxMDBweFwiO1xuICAgICAgICBvdXRlci5zdHlsZS5tc092ZXJmbG93U3R5bGUgPSBcInNjcm9sbGJhclwiO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG91dGVyKTtcbiAgICAgICAgbGV0IHdpZHRoTm9TY3JvbGwgPSBvdXRlci5vZmZzZXRXaWR0aDtcbiAgICAgICAgb3V0ZXIuc3R5bGUub3ZlcmZsb3cgPSBcInNjcm9sbFwiO1xuICAgICAgICBsZXQgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBpbm5lci5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgICBvdXRlci5hcHBlbmRDaGlsZChpbm5lcik7XG4gICAgICAgIGxldCB3aWR0aFdpdGhTY3JvbGwgPSBpbm5lci5vZmZzZXRXaWR0aDtcbiAgICAgICAgb3V0ZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvdXRlcik7XG4gICAgICAgIGRhdGEuc2Nyb2xsYmFyV2lkdGggPSB3aWR0aE5vU2Nyb2xsIC0gd2lkdGhXaXRoU2Nyb2xsO1xuICAgIH07XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlbGYpIHtcbiAgICAvL3dlIHdpbGwgaG92ZXIgYWxsIHdpbmRvd3Mgd2l0aCBkaXYgd2l0aCBoaWdoIHotaW5kZXggdG8gYmUgc3VyZSBtb3VzZXVwIGlzIHRyaWdnZXJlZFxuICAgIGNvbnN0IGludmlzaWJsZUhvdmVyID0gbmV3IChyZXF1aXJlKCcuLi9Db21wb25lbnRzL0RPTU9iamVjdCcpKSgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtaW52aXNpYmxlLWhvdmVyJ10pO1xuXG4gICAgLy90byB0aGVzZSBlbGVtZW50cyBhcmUgYWRkZWQgbW91c2UgZXZlbnRzXG4gICAgY29uc3QgZWxlbWVudHMgPSB7XG4gICAgICAgIG1lZGlhSG9sZGVyOiBzZWxmLm1lZGlhSG9sZGVyLFxuICAgICAgICBpbnZpc2libGVIb3ZlcjogaW52aXNpYmxlSG92ZXIsXG4gICAgICAgIGRvd25FdmVudERldGVjdG9yOiBzZWxmLmRhdGEuZG93bkV2ZW50RGV0ZWN0b3JcbiAgICB9O1xuICAgIC8vc291cmNlcyBhcmUgdHJhbnNmb3JtZWRcbiAgICBjb25zdCBzb3VyY2VzID0gc2VsZi5kYXRhLnNvdXJjZXM7XG5cbiAgICAvLyBpZiB0aGVyZSBhcmUgb25seSAyIG9yIDEgdXJscyBzbGlkZVRyYW5zZm9ybWVyIHdpbGwgYmUgZGlmZmVyZW50XG4gICAgY29uc3QgdXJsc0xlbmd0aCA9IHNlbGYuZGF0YS51cmxzLmxlbmd0aDtcblxuICAgIGxldCBpc19kcmFnZ2luZyA9IGZhbHNlO1xuICAgIGxldCBtb3VzZURvd25DbGllbnRYO1xuICAgIGxldCBpc1NvdXJjZURvd25FdmVudFRhcmdldDtcbiAgICBsZXQgZGlmZmVyZW5jZTtcbiAgICBsZXQgc2xpZGVBYmxlID0gdHJ1ZTtcblxuXG4gICAgY29uc3QgbW91c2VEb3duRXZlbnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAvLyB0YWcgY2FuJ3QgYmUgdmlkZW8gY2F1c2UgaXQgd291bGQgYmUgdW5jbGlja2FibGUgaW4gbWljcm9zb2Z0IGJyb3dzZXJzXG4gICAgICAgIGlmIChlLnRhcmdldC50YWdOYW1lICE9PSAnVklERU8nICYmICFlLnRvdWNoZXMpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmc2xpZ2h0Ym94LXNvdXJjZScpKSB7XG4gICAgICAgICAgICBpc1NvdXJjZURvd25FdmVudFRhcmdldCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaXNfZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICBkaWZmZXJlbmNlID0gMDtcblxuICAgICAgICBpZiAoc2VsZi5kYXRhLnRvdGFsU2xpZGVzID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgZWxlbSBpbiBlbGVtZW50cykge1xuICAgICAgICAgICAgZWxlbWVudHNbZWxlbV0uY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1jdXJzb3ItZ3JhYmJpbmcnKTtcbiAgICAgICAgfVxuICAgICAgICAoZS50b3VjaGVzKSA/XG4gICAgICAgICAgICBtb3VzZURvd25DbGllbnRYID0gZS50b3VjaGVzWzBdLmNsaWVudFggOlxuICAgICAgICAgICAgbW91c2VEb3duQ2xpZW50WCA9IGUuY2xpZW50WDtcbiAgICB9O1xuXG5cbiAgICBjb25zdCBtb3VzZVVwRXZlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzZWxmLmVsZW1lbnQuY29udGFpbnMoaW52aXNpYmxlSG92ZXIpKSB7XG4gICAgICAgICAgICBzZWxmLmVsZW1lbnQucmVtb3ZlQ2hpbGQoaW52aXNpYmxlSG92ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGVsZW0gaW4gZWxlbWVudHMpIHtcbiAgICAgICAgICAgIGVsZW1lbnRzW2VsZW1dLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtY3Vyc29yLWdyYWJiaW5nJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzX2RyYWdnaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaXNfZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgICBpZiAoZGlmZmVyZW5jZSA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKCFpc1NvdXJjZURvd25FdmVudFRhcmdldCkge1xuICAgICAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXNTb3VyY2VEb3duRXZlbnRUYXJnZXQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpc1NvdXJjZURvd25FdmVudFRhcmdldCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICghc2xpZGVBYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2xpZGVBYmxlID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IHNvdXJjZXNJbmRleGVzID0gc2VsZi5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKHNlbGYuZGF0YS5zbGlkZSk7XG5cbiAgICAgICAgLy8gYWRkIHRyYW5zaXRpb24gaWYgdXNlciBzbGlkZSB0byBzb3VyY2VcbiAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10uY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xuICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcbiAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XS5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XG5cblxuICAgICAgICAvLyBzbGlkZSBwcmV2aW91c1xuICAgICAgICBpZiAoZGlmZmVyZW5jZSA+IDApIHtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIHNsaWRlIG51bWJlclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlU2xpZGVOdW1iZXIoc2VsZi5kYXRhLnRvdGFsU2xpZGVzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEuc2xpZGUgLSAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHVybHNMZW5ndGggPj0gMikge1xuICAgICAgICAgICAgICAgIHNlbGYuc2xpZGVUcmFuc2Zvcm1lci5wbHVzKHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0pO1xuICAgICAgICAgICAgICAgIHNlbGYuc2xpZGVUcmFuc2Zvcm1lci56ZXJvKHNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zbGlkZVRyYW5zZm9ybWVyLnplcm8oc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGdldCBuZXcgaW5kZXhlc1xuICAgICAgICAgICAgc291cmNlc0luZGV4ZXMgPSBzZWxmLnN0YWdlU291cmNlSW5kZXhlcy5hbGwoc2VsZi5kYXRhLnNsaWRlKTtcblxuICAgICAgICAgICAgLy9pZiBzb3VyY2UgaXNuJ3QgYWxyZWFkeSBpbiBtZW1vcnlcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZi5kYXRhLnNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5sb2Fkc291cmNlcygncHJldmlvdXMnLCBzZWxmLmRhdGEuc2xpZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvLyBzbGlkZSBuZXh0XG4gICAgICAgIGVsc2UgaWYgKGRpZmZlcmVuY2UgPCAwKSB7XG5cbiAgICAgICAgICAgIC8vdXBkYXRlIHNsaWRlIG51bWJlclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YS5zbGlkZSA9PT0gc2VsZi5kYXRhLnRvdGFsU2xpZGVzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi51cGRhdGVTbGlkZU51bWJlcigxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi51cGRhdGVTbGlkZU51bWJlcihzZWxmLmRhdGEuc2xpZGUgKyAxKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZiAodXJsc0xlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNsaWRlVHJhbnNmb3JtZXIubWludXMoc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XSk7XG4gICAgICAgICAgICAgICAgc2VsZi5zbGlkZVRyYW5zZm9ybWVyLnplcm8oc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuc2xpZGVUcmFuc2Zvcm1lci56ZXJvKHNvdXJjZXNbc291cmNlc0luZGV4ZXMuY3VycmVudF0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBnZXQgbmV3IGluZGV4ZXNcbiAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzID0gc2VsZi5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKHNlbGYuZGF0YS5zbGlkZSk7XG4gICAgICAgICAgICAvL2lmIHNvdXJjZSBpc24ndCBhbHJlYWR5IGluIG1lbW9yeVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxmLmRhdGEuc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgIHNlbGYubG9hZHNvdXJjZXMoJ25leHQnLCBzZWxmLmRhdGEuc2xpZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZGlmZmVyZW5jZSA9IDA7XG4gICAgICAgIHNlbGYuc3RvcFZpZGVvcygpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIHRyYW5zaXRpb24gYmVjYXVzZSB3aXRoIGRyYWdnaW5nIGl0IGxvb2tzIGF3ZnVsXG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LXRyYW5zZm9ybS10cmFuc2l0aW9uJyk7XG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdLmNsYXNzTGlzdC5yZW1vdmUoJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nKTtcbiAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xuXG4gICAgICAgICAgICAvLyB1c2VyIHNob3VsZG4ndCBiZSBhYmxlIHRvIHNsaWRlIHdoZW4gYW5pbWF0aW9uIGlzIHJ1bm5pbmdcbiAgICAgICAgICAgIHNsaWRlQWJsZSA9IHRydWU7XG4gICAgICAgIH0sIDI1MCk7XG4gICAgfTtcblxuXG4gICAgY29uc3QgbW91c2VNb3ZlRXZlbnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoIWlzX2RyYWdnaW5nIHx8ICFzbGlkZUFibGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2xpZW50WDtcbiAgICAgICAgKGUudG91Y2hlcykgP1xuICAgICAgICAgICAgY2xpZW50WCA9IGUudG91Y2hlc1swXS5jbGllbnRYIDpcbiAgICAgICAgICAgIGNsaWVudFggPSBlLmNsaWVudFg7XG5cbiAgICAgICAgZGlmZmVyZW5jZSA9IGNsaWVudFggLSBtb3VzZURvd25DbGllbnRYO1xuICAgICAgICAvLyBpZiB1c2VyIHN3aXBlZCBidXQgdGhlcmUgaXMgb25seSBvbmUgc2xpZGUgd2UgZG9udCB3YW50IGZ1cnRoZXIgY29kZSB0byBleGVjdXRlIGJ1dCB3ZSB3YW50IHRvIHByZXZlbnQgbGlnaHRib3hcbiAgICAgICAgLy8gZnJvbSBjbG9zaW5nIHNvIHdlIHNldCBkaWZmZXJlbmNlIHRvIDFcbiAgICAgICAgaWYgKGRpZmZlcmVuY2UgIT09IDAgJiYgc2VsZi5kYXRhLnRvdGFsU2xpZGVzID09PSAxKSB7XG4gICAgICAgICAgICBkaWZmZXJlbmNlID0gMTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNlbGYuZWxlbWVudC5jb250YWlucyhpbnZpc2libGVIb3ZlcikpIHtcbiAgICAgICAgICAgIHNlbGYuZWxlbWVudC5hcHBlbmRDaGlsZChpbnZpc2libGVIb3Zlcik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc291cmNlc0luZGV4ZXMgPSBzZWxmLnN0YWdlU291cmNlSW5kZXhlcy5hbGwoc2VsZi5kYXRhLnNsaWRlKTtcblxuICAgICAgICBpZiAodXJsc0xlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgICBzb3VyY2VzW3NvdXJjZXNJbmRleGVzLnByZXZpb3VzXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgK1xuICAgICAgICAgICAgICAgICgtc2VsZi5kYXRhLnNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aCArIGRpZmZlcmVuY2UpXG4gICAgICAgICAgICAgICAgKyAncHgsMCknO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVybHNMZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyBkaWZmZXJlbmNlICsgJ3B4LDApJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1cmxzTGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgIHNvdXJjZXNbc291cmNlc0luZGV4ZXMubmV4dF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnXG4gICAgICAgICAgICAgICAgKyAoc2VsZi5kYXRhLnNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aCArIGRpZmZlcmVuY2UpXG4gICAgICAgICAgICAgICAgKyAncHgsMCknO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHByZXZlbnREZWZhdWx0RXZlbnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfTtcblxuXG4gICAgZm9yIChsZXQgZWxlbSBpbiBlbGVtZW50cykge1xuICAgICAgICBlbGVtZW50c1tlbGVtXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZURvd25FdmVudCk7XG4gICAgICAgIGVsZW1lbnRzW2VsZW1dLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBtb3VzZURvd25FdmVudCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIHRoaXMuYWRkV2luZG93RXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlVXBFdmVudCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG1vdXNlVXBFdmVudCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmVFdmVudCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBtb3VzZU1vdmVFdmVudCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnJlbW92ZVdpbmRvd0V2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwRXZlbnQpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBtb3VzZVVwRXZlbnQpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlRXZlbnQpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgbW91c2VNb3ZlRXZlbnQpO1xuICAgIH07XG5cbiAgICBpbnZpc2libGVIb3Zlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcEV2ZW50KTtcbiAgICBpbnZpc2libGVIb3Zlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG1vdXNlVXBFdmVudCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHNlbGYuZGF0YS5uYXYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgcHJldmVudERlZmF1bHRFdmVudCk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNsaWRlRGlzdGFuY2UpIHtcbiAgICB0aGlzLm1pbnVzID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgZWxlbS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyAoLXNsaWRlRGlzdGFuY2UgKiB3aW5kb3cuaW5uZXJXaWR0aCkgKyAncHgsMCknO1xuICAgIH07XG5cbiAgICB0aGlzLnplcm8gPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICBlbGVtLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoMCwwKSc7XG4gICAgfTtcblxuICAgIHRoaXMucGx1cyA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIGVsZW0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgc2xpZGVEaXN0YW5jZSAqIHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4LDApJztcbiAgICB9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdGhpcy5wcmV2aW91cyA9IGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgICBsZXQgcHJldmlvdXNTbGlkZUluZGV4O1xuICAgICAgICBjb25zdCBhcnJheUluZGV4ID0gc2xpZGUgLSAxO1xuXG4gICAgICAgIC8vIHByZXZpb3VzXG4gICAgICAgIGlmIChhcnJheUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICBwcmV2aW91c1NsaWRlSW5kZXggPSBkYXRhLnRvdGFsU2xpZGVzIC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByZXZpb3VzU2xpZGVJbmRleCA9IGFycmF5SW5kZXggLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzU2xpZGVJbmRleDtcbiAgICB9O1xuXG4gICAgdGhpcy5uZXh0ID0gZnVuY3Rpb24gKHNsaWRlKSB7XG5cbiAgICAgICAgbGV0IG5leHRTbGlkZUluZGV4O1xuICAgICAgICBjb25zdCBhcnJheUluZGV4ID0gc2xpZGUgLSAxO1xuXG4gICAgICAgIC8vbmV4dFxuICAgICAgICBpZiAoc2xpZGUgPT09IGRhdGEudG90YWxTbGlkZXMpIHtcbiAgICAgICAgICAgIG5leHRTbGlkZUluZGV4ID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHRTbGlkZUluZGV4ID0gYXJyYXlJbmRleCArIDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dFNsaWRlSW5kZXg7XG4gICAgfTtcblxuICAgIHRoaXMuYWxsID0gZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICAgIC8vIHNvdXJjZXMgYXJlIHN0b3JlZCBpbiBhcnJheSBpbmRleGVkIGZyb20gMFxuICAgICAgICBjb25zdCBhcnJheUluZGV4ID0gc2xpZGUgLSAxO1xuICAgICAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IHtcbiAgICAgICAgICAgIHByZXZpb3VzOiAwLFxuICAgICAgICAgICAgY3VycmVudDogMCxcbiAgICAgICAgICAgIG5leHQ6IDBcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBwcmV2aW91c1xuICAgICAgICBpZiAoYXJyYXlJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgc291cmNlc0luZGV4ZXMucHJldmlvdXMgPSBkYXRhLnRvdGFsU2xpZGVzIC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzLnByZXZpb3VzID0gYXJyYXlJbmRleCAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjdXJyZW50XG4gICAgICAgIHNvdXJjZXNJbmRleGVzLmN1cnJlbnQgPSBhcnJheUluZGV4O1xuXG4gICAgICAgIC8vbmV4dFxuICAgICAgICBpZiAoc2xpZGUgPT09IGRhdGEudG90YWxTbGlkZXMpIHtcbiAgICAgICAgICAgIHNvdXJjZXNJbmRleGVzLm5leHQgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc291cmNlc0luZGV4ZXMubmV4dCA9IGFycmF5SW5kZXggKyAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNvdXJjZXNJbmRleGVzO1xuICAgIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZikge1xuICAgIGNvbnN0IGtleWJvYXJkQ29udHJvbGxlciA9IHNlbGYua2V5Ym9hcmRDb250cm9sbGVyO1xuXG4gICAgdGhpcy5hdHRhY2hMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWJvYXJkQ29udHJvbGxlci5oYW5kbGVLZXlEb3duKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWJvYXJkQ29udHJvbGxlci5oYW5kbGVLZXlEb3duKTtcbiAgICB9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmc0xpZ2h0Ym94KSB7XG4gICAgY29uc3QgbG9hZGVyID0gJzxkaXYgY2xhc3M9XCJmc2xpZ2h0Ym94LWxvYWRlclwiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+JztcbiAgICBjb25zdCB0cmFuc2l0aW9uID0gJ2ZzbGlnaHRib3gtdHJhbnNmb3JtLXRyYW5zaXRpb24nO1xuICAgIGNvbnN0IGZhZGVJbiA9ICdmc2xpZ2h0Ym94LWZhZGUtaW4nO1xuICAgIGNvbnN0IGZhZGVPdXQgPSAnZnNsaWdodGJveC1mYWRlLW91dCc7XG5cbiAgICBjb25zdCBjcmVhdGVIb2xkZXIgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgY29uc3Qgc291cmNlSG9sZGVyID0gbmV3IChyZXF1aXJlKCcuL0NvbXBvbmVudHMvRE9NT2JqZWN0JykpKCdkaXYnKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zb3VyY2UtaG9sZGVyJywgJ2ZzbGlnaHRib3gtZnVsbC1kaW1lbnNpb24nXSk7XG4gICAgICAgIHNvdXJjZUhvbGRlci5pbm5lckhUTUwgPSBsb2FkZXI7XG4gICAgICAgIGZzTGlnaHRib3guZGF0YS5zb3VyY2VzW2luZGV4XSA9IHNvdXJjZUhvbGRlcjtcbiAgICAgICAgcmV0dXJuIHNvdXJjZUhvbGRlcjtcbiAgICB9O1xuXG4gICAgY29uc3QgcnVuQW5pbWF0aW9uT25Tb3VyY2UgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICBlbGVtLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LmFkZChmYWRlSW4pO1xuICAgIH07XG5cbiAgICBjb25zdCBjbGVhckFuaW1hdGlvbk9uU291cmNlID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgY29uc3Qgc3JjID0gZWxlbS5maXJzdENoaWxkO1xuICAgICAgICBzcmMuY2xhc3NMaXN0LnJlbW92ZShmYWRlSW4pO1xuICAgICAgICBzcmMuY2xhc3NMaXN0LnJlbW92ZShmYWRlT3V0KTtcbiAgICAgICAgdm9pZCBzcmMub2Zmc2V0V2lkdGg7XG4gICAgfTtcblxuICAgIGNvbnN0IHJ1bkZhZGVPdXRBbmltYXRpb25PblNvdXJjZSA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIGVsZW0uZmlyc3RDaGlsZC5jbGFzc0xpc3QuYWRkKGZhZGVPdXQpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGxvYWRlciB3aGVuIGxvYWRpbmcgZnNMaWdodGJveCBpbml0aWFsbHlcbiAgICAgKiBAcGFyYW0gc2xpZGVcbiAgICAgKi9cbiAgICB0aGlzLnJlbmRlckhvbGRlckluaXRpYWwgPSBmdW5jdGlvbiAoc2xpZGUpIHtcbiAgICAgICAgY29uc3Qgc291cmNlc0luZGV4ZXMgPSBmc0xpZ2h0Ym94LnN0YWdlU291cmNlSW5kZXhlcy5hbGwoc2xpZGUpO1xuICAgICAgICBjb25zdCB0b3RhbFNsaWRlcyA9IGZzTGlnaHRib3guZGF0YS50b3RhbFNsaWRlcztcblxuICAgICAgICBpZiAodG90YWxTbGlkZXMgPj0gMykge1xuICAgICAgICAgICAgY29uc3QgcHJldiA9IGNyZWF0ZUhvbGRlcihzb3VyY2VzSW5kZXhlcy5wcmV2aW91cyk7XG4gICAgICAgICAgICBmc0xpZ2h0Ym94LnNsaWRlVHJhbnNmb3JtZXIubWludXMocHJldik7XG4gICAgICAgICAgICBmc0xpZ2h0Ym94Lm1lZGlhSG9sZGVyLmFwcGVuZENoaWxkKHByZXYpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0b3RhbFNsaWRlcyA+PSAxKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyID0gY3JlYXRlSG9sZGVyKHNvdXJjZXNJbmRleGVzLmN1cnJlbnQpO1xuICAgICAgICAgICAgZnNMaWdodGJveC5tZWRpYUhvbGRlci5hcHBlbmRDaGlsZChjdXJyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG90YWxTbGlkZXMgPj0gMikge1xuICAgICAgICAgICAgY29uc3QgbmV4dCA9IGNyZWF0ZUhvbGRlcihzb3VyY2VzSW5kZXhlcy5uZXh0KTtcbiAgICAgICAgICAgIGZzTGlnaHRib3guc2xpZGVUcmFuc2Zvcm1lci5wbHVzKG5leHQpO1xuICAgICAgICAgICAgZnNMaWdodGJveC5tZWRpYUhvbGRlci5hcHBlbmRDaGlsZChuZXh0KTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHRoaXMucmVuZGVySG9sZGVyID0gZnVuY3Rpb24gKHNsaWRlLCB0eXBlKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAncHJldmlvdXMnOlxuICAgICAgICAgICAgICAgIHJlbmRlckhvbGRlclByZXZpb3VzKHNsaWRlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2N1cnJlbnQnOlxuICAgICAgICAgICAgICAgIHJlbmRlckhvbGRlckN1cnJlbnQoc2xpZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbmV4dCc6XG4gICAgICAgICAgICAgICAgcmVuZGVySG9sZGVyTmV4dChzbGlkZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICBjb25zdCByZW5kZXJIb2xkZXJQcmV2aW91cyA9IGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgICBjb25zdCBwcmV2aW91c1NvdXJjZUluZGV4ID0gZnNMaWdodGJveC5zdGFnZVNvdXJjZUluZGV4ZXMucHJldmlvdXMoc2xpZGUpO1xuICAgICAgICBjb25zdCBwcmV2ID0gY3JlYXRlSG9sZGVyKHByZXZpb3VzU291cmNlSW5kZXgpO1xuICAgICAgICBmc0xpZ2h0Ym94LnNsaWRlVHJhbnNmb3JtZXIubWludXMocHJldik7XG4gICAgICAgIGZzTGlnaHRib3gubWVkaWFIb2xkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgcHJldik7XG4gICAgfTtcblxuXG4gICAgY29uc3QgcmVuZGVySG9sZGVyTmV4dCA9IGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgICBjb25zdCBuZXh0U291cmNlSW5kZXggPSBmc0xpZ2h0Ym94LnN0YWdlU291cmNlSW5kZXhlcy5uZXh0KHNsaWRlKTtcbiAgICAgICAgY29uc3QgbmV4dCA9IGNyZWF0ZUhvbGRlcihuZXh0U291cmNlSW5kZXgpO1xuICAgICAgICBmc0xpZ2h0Ym94LnNsaWRlVHJhbnNmb3JtZXIucGx1cyhuZXh0KTtcbiAgICAgICAgZnNMaWdodGJveC5tZWRpYUhvbGRlci5hcHBlbmRDaGlsZChuZXh0KTtcbiAgICB9O1xuXG5cbiAgICBjb25zdCByZW5kZXJIb2xkZXJDdXJyZW50ID0gZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZXNJbmRleGVzID0gZnNMaWdodGJveC5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKHNsaWRlKTtcbiAgICAgICAgY29uc3QgY3VyciA9IGNyZWF0ZUhvbGRlcihzb3VyY2VzSW5kZXhlcy5jdXJyZW50KTtcbiAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLnplcm8oY3Vycik7XG4gICAgICAgIGZzTGlnaHRib3gubWVkaWFIb2xkZXIuaW5zZXJ0QmVmb3JlKGN1cnIsIGZzTGlnaHRib3guZGF0YS5zb3VyY2VzW3NvdXJjZXNJbmRleGVzLm5leHRdKTtcbiAgICB9O1xuXG5cbiAgICB0aGlzLnByZXZpb3VzU2xpZGVWaWFCdXR0b24gPSBmdW5jdGlvbiAocHJldmlvdXNTbGlkZSkge1xuICAgICAgICBpZiAocHJldmlvdXNTbGlkZSA9PT0gMSkge1xuICAgICAgICAgICAgZnNMaWdodGJveC5kYXRhLnNsaWRlID0gZnNMaWdodGJveC5kYXRhLnRvdGFsU2xpZGVzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnNMaWdodGJveC5kYXRhLnNsaWRlIC09IDE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXdTb3VyY2VzSW5kZXhlcyA9IHN0b3BWaWRlb3NVcGRhdGVTbGlkZUFuZFJldHVyblNsaWRlTnVtYmVySW5kZXhlcygpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZnNMaWdodGJveC5kYXRhLnNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMucHJldmlvdXNdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBmc0xpZ2h0Ym94LmxvYWRzb3VyY2VzKCdwcmV2aW91cycsIGZzTGlnaHRib3guZGF0YS5zbGlkZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzb3VyY2VzID0gZnNMaWdodGJveC5kYXRhLnNvdXJjZXM7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTb3VyY2UgPSBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLmN1cnJlbnRdO1xuICAgICAgICBjb25zdCBuZXh0U291cmNlID0gc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5uZXh0XTtcblxuICAgICAgICBuZXh0U291cmNlLmNsYXNzTGlzdC5yZW1vdmUodHJhbnNpdGlvbik7XG4gICAgICAgIGN1cnJlbnRTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSh0cmFuc2l0aW9uKTtcbiAgICAgICAgc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5wcmV2aW91c10uY2xhc3NMaXN0LnJlbW92ZSh0cmFuc2l0aW9uKTtcblxuXG4gICAgICAgIGNsZWFyQW5pbWF0aW9uT25Tb3VyY2UoY3VycmVudFNvdXJjZSk7XG4gICAgICAgIHJ1bkFuaW1hdGlvbk9uU291cmNlKGN1cnJlbnRTb3VyY2UpO1xuICAgICAgICBydW5GYWRlT3V0QW5pbWF0aW9uT25Tb3VyY2UobmV4dFNvdXJjZSk7XG5cbiAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLnplcm8oY3VycmVudFNvdXJjZSk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG5ld1NvdXJjZXNJbmRleGVzLm5leHQgIT09IGZzTGlnaHRib3guZGF0YS5zbGlkZSAtIDEpXG4gICAgICAgICAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLnBsdXMobmV4dFNvdXJjZSk7XG4gICAgICAgICAgICBuZXh0U291cmNlLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LnJlbW92ZShmYWRlT3V0KTtcbiAgICAgICAgfSwgMjIwKTtcbiAgICB9O1xuXG5cbiAgICB0aGlzLm5leHRTbGlkZVZpYUJ1dHRvbiA9IGZ1bmN0aW9uIChwcmV2aW91c1NsaWRlKSB7XG4gICAgICAgIGlmIChwcmV2aW91c1NsaWRlID09PSBmc0xpZ2h0Ym94LmRhdGEudG90YWxTbGlkZXMpIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3guZGF0YS5zbGlkZSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmc0xpZ2h0Ym94LmRhdGEuc2xpZGUgKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5ld1NvdXJjZXNJbmRleGVzID0gc3RvcFZpZGVvc1VwZGF0ZVNsaWRlQW5kUmV0dXJuU2xpZGVOdW1iZXJJbmRleGVzKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBmc0xpZ2h0Ym94LmRhdGEuc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5uZXh0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgZnNMaWdodGJveC5sb2Fkc291cmNlcygnbmV4dCcsIGZzTGlnaHRib3guZGF0YS5zbGlkZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzb3VyY2VzID0gZnNMaWdodGJveC5kYXRhLnNvdXJjZXM7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTb3VyY2UgPSBzb3VyY2VzW25ld1NvdXJjZXNJbmRleGVzLmN1cnJlbnRdO1xuICAgICAgICBjb25zdCBwcmV2aW91c1NvdXJjZSA9IHNvdXJjZXNbbmV3U291cmNlc0luZGV4ZXMucHJldmlvdXNdO1xuXG4gICAgICAgIHByZXZpb3VzU291cmNlLmNsYXNzTGlzdC5yZW1vdmUodHJhbnNpdGlvbik7XG4gICAgICAgIGN1cnJlbnRTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSh0cmFuc2l0aW9uKTtcbiAgICAgICAgc291cmNlc1tuZXdTb3VyY2VzSW5kZXhlcy5uZXh0XS5jbGFzc0xpc3QucmVtb3ZlKHRyYW5zaXRpb24pO1xuXG4gICAgICAgIGNsZWFyQW5pbWF0aW9uT25Tb3VyY2UoY3VycmVudFNvdXJjZSk7XG4gICAgICAgIHJ1bkFuaW1hdGlvbk9uU291cmNlKGN1cnJlbnRTb3VyY2UpO1xuICAgICAgICBydW5GYWRlT3V0QW5pbWF0aW9uT25Tb3VyY2UocHJldmlvdXNTb3VyY2UpO1xuICAgICAgICBmc0xpZ2h0Ym94LnNsaWRlVHJhbnNmb3JtZXIuemVybyhjdXJyZW50U291cmNlKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChuZXdTb3VyY2VzSW5kZXhlcy5wcmV2aW91cyAhPT0gZnNMaWdodGJveC5kYXRhLnNsaWRlIC0gMSlcbiAgICAgICAgICAgICAgICBmc0xpZ2h0Ym94LnNsaWRlVHJhbnNmb3JtZXIubWludXMocHJldmlvdXNTb3VyY2UpO1xuICAgICAgICAgICAgcHJldmlvdXNTb3VyY2UuZmlyc3RDaGlsZC5jbGFzc0xpc3QucmVtb3ZlKGZhZGVPdXQpO1xuICAgICAgICB9LCAyMjApO1xuICAgIH07XG5cbiAgICBjb25zdCBzdG9wVmlkZW9zVXBkYXRlU2xpZGVBbmRSZXR1cm5TbGlkZU51bWJlckluZGV4ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZzTGlnaHRib3guc3RvcFZpZGVvcygpO1xuICAgICAgICBmc0xpZ2h0Ym94LnVwZGF0ZVNsaWRlTnVtYmVyKGZzTGlnaHRib3guZGF0YS5zbGlkZSk7XG4gICAgICAgIHJldHVybiBmc0xpZ2h0Ym94LnN0YWdlU291cmNlSW5kZXhlcy5hbGwoZnNMaWdodGJveC5kYXRhLnNsaWRlKTtcbiAgICB9O1xufTsiLCJ3aW5kb3cuZnNMaWdodGJveENsYXNzID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IERPTU9iamVjdCA9IHJlcXVpcmUoJy4vQ29tcG9uZW50cy9ET01PYmplY3QnKTtcblxuICAgIHRoaXMuZGF0YSA9IHtcbiAgICAgICAgc2xpZGU6IDEsXG4gICAgICAgIHRvdGFsU2xpZGVzOiAxLFxuICAgICAgICBzbGlkZURpc3RhbmNlOiAxLjMsXG4gICAgICAgIHNsaWRlQ291bnRlcjogdHJ1ZSxcbiAgICAgICAgc2xpZGVCdXR0b25zOiB0cnVlLFxuICAgICAgICBpc0ZpcnN0VGltZUxvYWQ6IGZhbHNlLFxuICAgICAgICBtb3ZlU2xpZGVzVmlhRHJhZzogdHJ1ZSxcbiAgICAgICAgdG9vbGJhckJ1dHRvbnM6IHtcbiAgICAgICAgICAgIFwiY2xvc2VcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZnVsbHNjcmVlblwiOiB0cnVlXG4gICAgICAgIH0sXG5cbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIHNjcm9sbGJhcldpZHRoOiAwLFxuXG4gICAgICAgIHVybHM6IFtdLFxuICAgICAgICBzb3VyY2VzOiBbXSxcbiAgICAgICAgc291cmNlc0xvYWRlZDogW10sXG4gICAgICAgIHJlbWVtYmVyZWRTb3VyY2VzRGltZW5zaW9uczogW10sXG4gICAgICAgIHZpZGVvczogW10sXG4gICAgICAgIHZpZGVvc1Bvc3RlcnM6IFtdLFxuXG4gICAgICAgIGhvbGRlcldyYXBwZXI6IG51bGwsXG4gICAgICAgIG1lZGlhSG9sZGVyOiBudWxsLFxuICAgICAgICBuYXY6IG51bGwsXG4gICAgICAgIHRvb2xiYXI6IG51bGwsXG4gICAgICAgIHNsaWRlQ291bnRlckVsZW06IG51bGwsXG4gICAgICAgIGRvd25FdmVudERldGVjdG9yOiBudWxsLFxuXG4gICAgICAgIGluaXRpYXRlZDogZmFsc2UsXG4gICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgICBmYWRpbmdPdXQ6IGZhbHNlLFxuICAgIH07XG5cbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG5cbiAgICAvKipcbiAgICAgKiBJbml0IGEgbmV3IGZzTGlnaHRib3ggaW5zdGFuY2VcbiAgICAgKi9cbiAgICB0aGlzLmluaXQgPSBmdW5jdGlvbiAoaW5pdEhyZWYpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5pbml0aWF0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFNldFNsaWRlKGluaXRIcmVmKTtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBnYWxsZXJ5ID0gdGhpcy5kYXRhLm5hbWU7XG5cbiAgICAgICAgbGV0IHVybHMgPSBbXTtcbiAgICAgICAgY29uc3QgYSA9IGZzTGlnaHRib3hIZWxwZXJzLmE7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCFhW2ldLmhhc0F0dHJpYnV0ZSgnZGF0YS1mc2xpZ2h0Ym94JykpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIGlmIChhW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1mc2xpZ2h0Ym94JykgPT09IGdhbGxlcnkpIHtcbiAgICAgICAgICAgICAgICBsZXQgdXJsc0xlbmd0aCA9IHVybHMucHVzaChhW2ldLmdldEF0dHJpYnV0ZSgnaHJlZicpKTtcbiAgICAgICAgICAgICAgICBpZiAoYVtpXS5oYXNBdHRyaWJ1dGUoJ2RhdGEtdmlkZW8tcG9zdGVyJykpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS52aWRlb3NQb3N0ZXJzW3VybHNMZW5ndGggLSAxXSA9IGFbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLXZpZGVvLXBvc3RlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kYXRhLnVybHMgPSB1cmxzO1xuICAgICAgICB0aGlzLmRhdGEudG90YWxTbGlkZXMgPSB1cmxzLmxlbmd0aDtcbiAgICAgICAgZG9tUmVuZGVyZXIucmVuZGVyRE9NKCk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LW9wZW4nKTtcbiAgICAgICAgdGhpcy5zY3JvbGxiYXJSZWNvbXBlbnNvci5hZGRSZWNvbXBlbnNlKCk7XG4gICAgICAgIHRoaXMub25SZXNpemVFdmVudC5pbml0KCk7XG4gICAgICAgIHRoaXMuZXZlbnRzQ29udHJvbGxlcnMuZG9jdW1lbnQua2V5RG93bi5hdHRhY2hMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnRocm93RXZlbnQoJ2luaXQnKTtcbiAgICAgICAgdGhpcy50aHJvd0V2ZW50KCdvcGVuJyk7XG4gICAgICAgIHRoaXMuc2xpZGVTd2lwaW5nID0gbmV3IChyZXF1aXJlKCcuL0NvcmUvU2xpZGVTd2lwaW5nLmpzJykpKHRoaXMpO1xuICAgICAgICB0aGlzLnNsaWRlU3dpcGluZy5hZGRXaW5kb3dFdmVudHMoKTtcbiAgICAgICAgdGhpcy5pbml0U2V0U2xpZGUoaW5pdEhyZWYpO1xuICAgICAgICB0aGlzLmRhdGEuaW5pdGlhdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtb3BlbicpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEluaXQgY2FuIGhhdmUgbXVsdGlwbGUgdHlwZSBvZiBzbGlkZXNcbiAgICAgKiBAcGFyYW0gc2xpZGVcbiAgICAgKi9cbiAgICB0aGlzLmluaXRTZXRTbGlkZSA9IGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIHNsaWRlO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNsaWRlKHRoaXMuZGF0YS51cmxzLmluZGV4T2Yoc2xpZGUpICsgMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTbGlkZShzbGlkZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTbGlkZSgxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFNob3cgZG9tIG9mIGZzTGlnaHRib3ggaW5zdGFuY2UgaWYgZXhpc3RzXG4gICAgICovXG4gICAgdGhpcy5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBlbGVtID0gdGhpcy5lbGVtZW50O1xuICAgICAgICB0aGlzLnNjcm9sbGJhclJlY29tcGVuc29yLmFkZFJlY29tcGVuc2UoKTtcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LWZhZGUtb3V0LWNvbXBsZXRlJyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmc2xpZ2h0Ym94LW9wZW4nKTtcbiAgICAgICAgdm9pZCBlbGVtLm9mZnNldFdpZHRoO1xuICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2ZzbGlnaHRib3gtZmFkZS1pbi1jb21wbGV0ZScpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW0pO1xuICAgICAgICB0aGlzLm9uUmVzaXplRXZlbnQuYWRkTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZUV2ZW50LnJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuZXZlbnRzQ29udHJvbGxlcnMuZG9jdW1lbnQua2V5RG93bi5hdHRhY2hMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnNsaWRlU3dpcGluZy5hZGRXaW5kb3dFdmVudHMoKTtcbiAgICAgICAgdGhpcy50aHJvd0V2ZW50KCdzaG93Jyk7XG4gICAgICAgIHRoaXMudGhyb3dFdmVudCgnb3BlbicpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEhpZGUgZG9tIG9mIGV4aXN0aW5nIGZzTGlnaHRib3ggaW5zdGFuY2VcbiAgICAgKi9cbiAgICB0aGlzLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGEuZnVsbHNjcmVlbikgdGhpcy50b29sYmFyLmNsb3NlRnVsbHNjcmVlbigpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZnNsaWdodGJveC1mYWRlLW91dC1jb21wbGV0ZScpO1xuICAgICAgICB0aGlzLmRhdGEuZmFkaW5nT3V0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50aHJvd0V2ZW50KCdjbG9zZScpO1xuICAgICAgICB0aGlzLm9uUmVzaXplRXZlbnQucmVtb3ZlTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5zbGlkZVN3aXBpbmcucmVtb3ZlV2luZG93RXZlbnRzKCk7XG4gICAgICAgIHRoaXMuZXZlbnRzQ29udHJvbGxlcnMuZG9jdW1lbnQua2V5RG93bi5yZW1vdmVMaXN0ZW5lcigpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLnNjcm9sbGJhclJlY29tcGVuc29yLnJlbW92ZVJlY29tcGVuc2UoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdmc2xpZ2h0Ym94LW9wZW4nKTtcbiAgICAgICAgICAgIF90aGlzLmRhdGEuZmFkaW5nT3V0ID0gZmFsc2U7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKF90aGlzLmVsZW1lbnQpO1xuICAgICAgICB9LCAyNTApO1xuICAgIH07XG5cbiAgICB0aGlzLnVwZGF0ZVNsaWRlTnVtYmVyID0gZnVuY3Rpb24gKG51bWJlcikge1xuICAgICAgICB0aGlzLmRhdGEuc2xpZGUgPSBudW1iZXI7XG4gICAgICAgIGlmICh0aGlzLmRhdGEudG90YWxTbGlkZXMgPiAxKVxuICAgICAgICAgICAgdGhpcy5kYXRhLnNsaWRlQ291bnRlckVsZW0uaW5uZXJIVE1MID0gbnVtYmVyO1xuICAgIH07XG5cbiAgICB0aGlzLnRocm93RXZlbnQgPSBmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICAgIGxldCBldmVudDtcbiAgICAgICAgaWYgKHR5cGVvZiAoRXZlbnQpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudChldmVudE5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgICAgICAgIGV2ZW50LmluaXRFdmVudChldmVudE5hbWUsIHRydWUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9O1xuXG4gICAgdGhpcy5lbGVtZW50ID0gbmV3IERPTU9iamVjdCgnZGl2JykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtY29udGFpbmVyJywgJ2ZzbGlnaHRib3gtZnVsbC1kaW1lbnNpb24nXSk7XG4gICAgdGhpcy5tZWRpYUhvbGRlciA9IG5ldyAocmVxdWlyZSgnLi9Db21wb25lbnRzL01lZGlhSG9sZGVyJykpO1xuICAgIGNvbnN0IGRvbVJlbmRlcmVyID0gbmV3IChyZXF1aXJlKCcuL0NvcmUvRG9tUmVuZGVyZXInKSkodGhpcyk7XG4gICAgdGhpcy5zdGFnZVNvdXJjZUluZGV4ZXMgPSBuZXcgKHJlcXVpcmUoJy4vQ29yZS9TdGFnZVNvdXJjZXNJbmRleGVzJykpKHRoaXMuZGF0YSk7XG4gICAgdGhpcy5rZXlib2FyZENvbnRyb2xsZXIgPSBuZXcgKHJlcXVpcmUoJy4vQ29yZS9LZXlib2FyZENvbnRyb2xsZXInKSkodGhpcyk7XG4gICAgbmV3IChyZXF1aXJlKCcuL0NvcmUvU2Nyb2xsYmFyV2lkdGhHZXR0ZXInKSkodGhpcy5kYXRhKS5nZXRXaWR0aCgpO1xuICAgIHRoaXMub25SZXNpemVFdmVudCA9IG5ldyAocmVxdWlyZSgnLi9vblJlc2l6ZUV2ZW50JykpKHRoaXMpO1xuICAgIHRoaXMuc2Nyb2xsYmFyUmVjb21wZW5zb3IgPSBuZXcgKHJlcXVpcmUoJy4vQ29yZS9TY3JvbGxiYXJSZWNvbXBlbnNvcicpKSh0aGlzLmRhdGEuc2Nyb2xsYmFyV2lkdGgpO1xuICAgIHRoaXMuc2xpZGVUcmFuc2Zvcm1lciA9IG5ldyAocmVxdWlyZSgnLi9Db3JlL1NsaWRlVHJhbnNmb3JtZXInKSkodGhpcy5kYXRhLnNsaWRlRGlzdGFuY2UpO1xuICAgIHRoaXMuc2xpZGVTd2lwaW5nID0gbnVsbDtcbiAgICB0aGlzLnRvb2xiYXIgPSBuZXcgKHJlcXVpcmUoJy4vQ29tcG9uZW50cy9Ub29sYmFyJykpKHRoaXMpO1xuICAgIHRoaXMuU1ZHSWNvbiA9IHJlcXVpcmUoJy4vQ29tcG9uZW50cy9TVkdJY29uJyk7XG4gICAgdGhpcy5hcHBlbmRNZXRob2RzID0gbmV3IChyZXF1aXJlKCcuL2FwcGVuZE1ldGhvZHMnKSkodGhpcyk7XG5cbiAgICAvLyBldmVudHMtY29udHJvbGxlcnNcbiAgICB0aGlzLmV2ZW50c0NvbnRyb2xsZXJzID0ge1xuICAgICAgICBkb2N1bWVudDoge1xuICAgICAgICAgICAga2V5RG93bjogbmV3IChyZXF1aXJlKCcuL0NvcmUvZXZlbnRzLWNvbnRyb2xsZXJzL0RvY3VtZW50S2V5RG93bkV2ZW50Q29udHJvbGxlcicpKSh0aGlzKVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERpc3BsYXkgc291cmNlIChpbWFnZXMsIEhUTUw1IHZpZGVvLCBZb3VUdWJlIHZpZGVvKSBkZXBlbmRpbmcgb24gZ2l2ZW4gdXJsIGZyb20gdXNlclxuICAgICAqIE9yIGlmIGRpc3BsYXkgaXMgaW5pdGlhbCBkaXNwbGF5IDMgaW5pdGlhbCBzb3VyY2VzXG4gICAgICogSWYgdGhlcmUgYXJlID49IDMgaW5pdGlhbCBzb3VyY2VzIHRoZXJlIHdpbGwgYmUgYWx3YXlzIDMgaW4gc3RhZ2VcbiAgICAgKiBAcGFyYW0gdHlwZU9mTG9hZFxuICAgICAqIEBwYXJhbSBzbGlkZVxuICAgICAqIEByZXR1cm5zIHttb2R1bGUuZXhwb3J0c31cbiAgICAgKi9cbiAgICB0aGlzLmxvYWRzb3VyY2VzID0gZnVuY3Rpb24gKHR5cGVPZkxvYWQsIHNsaWRlKSB7XG4gICAgICAgIGNvbnN0IGxvYWRzb3VyY2Vtb2R1bGUgPSByZXF1aXJlKFwiLi9sb2FkU291cmNlLmpzXCIpO1xuICAgICAgICByZXR1cm4gbmV3IGxvYWRzb3VyY2Vtb2R1bGUodGhpcywgdHlwZU9mTG9hZCwgc2xpZGUpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFN0b3AgdmlkZW9zIGFmdGVyIGNoYW5naW5nIHNsaWRlXG4gICAgICovXG4gICAgdGhpcy5zdG9wVmlkZW9zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCB2aWRlb3MgPSB0aGlzLmRhdGEudmlkZW9zO1xuICAgICAgICBjb25zdCBzb3VyY2VzID0gdGhpcy5kYXRhLnNvdXJjZXM7XG5cbiAgICAgICAgLy8gdHJ1ZSBpcyBodG1sNSB2aWRlbywgZmFsc2UgaXMgeW91dHViZSB2aWRlb1xuICAgICAgICBmb3IgKGxldCB2aWRlb0luZGV4IGluIHZpZGVvcykge1xuICAgICAgICAgICAgaWYgKHZpZGVvc1t2aWRlb0luZGV4XSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc291cmNlc1t2aWRlb0luZGV4XS5maXJzdENoaWxkLnBhdXNlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZXNbdmlkZW9JbmRleF0uZmlyc3RDaGlsZC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc291cmNlc1t2aWRlb0luZGV4XS5maXJzdENoaWxkLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoJ3tcImV2ZW50XCI6XCJjb21tYW5kXCIsXCJmdW5jXCI6XCJzdG9wVmlkZW9cIixcImFyZ3NcIjpcIlwifScsICcqJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHRoaXMuc2V0U2xpZGUgPSBmdW5jdGlvbiAoc2xpZGUpIHtcbiAgICAgICAgdGhpcy5kYXRhLnNsaWRlID0gc2xpZGU7XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGVOdW1iZXIoc2xpZGUpO1xuICAgICAgICBjb25zdCBzb3VyY2VzSW5kZXhlcyA9IHRoaXMuc3RhZ2VTb3VyY2VJbmRleGVzLmFsbChzbGlkZSk7XG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSB0aGlzLmRhdGEuc291cmNlcztcblxuICAgICAgICBpZiAoc291cmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubG9hZHNvdXJjZXMoJ2luaXRpYWwnLCBzbGlkZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNvdXJjZXNbc291cmNlc0luZGV4ZXMucHJldmlvdXNdID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgICAgIHRoaXMubG9hZHNvdXJjZXMoJ3ByZXZpb3VzJywgc2xpZGUpO1xuXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc291cmNlc1tzb3VyY2VzSW5kZXhlcy5jdXJyZW50XSA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRzb3VyY2VzKCdjdXJyZW50Jywgc2xpZGUpO1xuXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XSA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRzb3VyY2VzKCduZXh0Jywgc2xpZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgc291cmNlSW5kZXggaW4gc291cmNlcykge1xuICAgICAgICAgICAgc291cmNlc1tzb3VyY2VJbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbicpO1xuXG4gICAgICAgICAgICAvLyBzb3VyY2VzIGxlbmd0aCBuZWVkcyB0byBiZSBoaWdoZXIgdGhhbiAxIGJlY2F1c2UgaWYgdGhlcmUgaXMgb25seSAxIHNsaWRlXG4gICAgICAgICAgICAvLyBzb3VyY2VzSW5kZXhlcy5wcmV2aW91cyB3aWxsIGJlIDAgc28gaXQgd291bGQgcmV0dXJuIGEgYmFkIHRyYW5zaXRpb25cbiAgICAgICAgICAgIGlmIChzb3VyY2VJbmRleCA9PSBzb3VyY2VzSW5kZXhlcy5wcmV2aW91cyAmJiBzb3VyY2VzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlVHJhbnNmb3JtZXIubWludXMoc291cmNlc1tzb3VyY2VzSW5kZXhlcy5wcmV2aW91c10pO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNvdXJjZUluZGV4ID09IHNvdXJjZXNJbmRleGVzLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlVHJhbnNmb3JtZXIuemVybyhzb3VyY2VzW3NvdXJjZXNJbmRleGVzLmN1cnJlbnRdKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzb3VyY2VJbmRleCA9PSBzb3VyY2VzSW5kZXhlcy5uZXh0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZVRyYW5zZm9ybWVyLnBsdXMoc291cmNlc1tzb3VyY2VzSW5kZXhlcy5uZXh0XSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2xpZGVUcmFuc2Zvcm1lci5taW51cyhzb3VyY2VzW3NvdXJjZUluZGV4XSk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuXG4hZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvdy5mc0xpZ2h0Ym94SW5zdGFuY2VzID0gW107XG4gICAgd2luZG93LmZzTGlnaHRib3hIZWxwZXJzID0ge1xuICAgICAgICBcImFcIjogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKVxuICAgIH07XG5cbiAgICBsZXQgYSA9IHdpbmRvdy5mc0xpZ2h0Ym94SGVscGVycy5hO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgaWYgKCFhW2ldLmhhc0F0dHJpYnV0ZSgnZGF0YS1mc2xpZ2h0Ym94JykpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYm94TmFtZSA9IGFbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWZzbGlnaHRib3gnKTtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuZnNMaWdodGJveEluc3RhbmNlc1tib3hOYW1lXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgd2luZG93LmZzTGlnaHRib3ggPSBuZXcgd2luZG93LmZzTGlnaHRib3hDbGFzcygpO1xuICAgICAgICAgICAgd2luZG93LmZzTGlnaHRib3guZGF0YS5uYW1lID0gYm94TmFtZTtcbiAgICAgICAgICAgIHdpbmRvdy5mc0xpZ2h0Ym94SW5zdGFuY2VzW2JveE5hbWVdID0gd2luZG93LmZzTGlnaHRib3g7XG4gICAgICAgIH1cblxuICAgICAgICBhW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxldCBnYWxsZXJ5ID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnNsaWdodGJveCcpO1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5mc0xpZ2h0Ym94SW5zdGFuY2VzW2dhbGxlcnldLmRhdGEuaW5pdGlhdGVkKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmZzTGlnaHRib3hJbnN0YW5jZXNbZ2FsbGVyeV0uc2V0U2xpZGUoXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5mc0xpZ2h0Ym94SW5zdGFuY2VzW2dhbGxlcnldLmRhdGEudXJscy5pbmRleE9mKHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJykpICsgMVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgd2luZG93LmZzTGlnaHRib3hJbnN0YW5jZXNbZ2FsbGVyeV0uc2hvdygpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpbmRvdy5mc0xpZ2h0Ym94SW5zdGFuY2VzW2dhbGxlcnldLmluaXQodGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0oZG9jdW1lbnQsIHdpbmRvdyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmc0xpZ2h0Ym94LCB0eXBlT2ZMb2FkLCBzbGlkZSkge1xuXG4gICAgY29uc3QgRE9NT2JqZWN0ID0gcmVxdWlyZSgnLi9Db21wb25lbnRzL0RPTU9iamVjdCcpO1xuXG4gICAgY29uc3Qgc291cmNlc0luZGV4ZXMgPSBmc0xpZ2h0Ym94LnN0YWdlU291cmNlSW5kZXhlcy5hbGwoc2xpZGUpO1xuICAgIGNvbnN0IHVybHMgPSBmc0xpZ2h0Ym94LmRhdGEudXJscztcbiAgICBjb25zdCBzb3VyY2VzID0gZnNMaWdodGJveC5kYXRhLnNvdXJjZXM7XG5cblxuICAgIGNvbnN0IGFwcGVuZCA9IGZ1bmN0aW9uIChzb3VyY2VIb2xkZXIsIHNvdXJjZUVsZW0pIHtcbiAgICAgICAgc291cmNlSG9sZGVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBzb3VyY2VIb2xkZXIuYXBwZW5kQ2hpbGQoc291cmNlRWxlbSk7XG4gICAgICAgIHZvaWQgc291cmNlSG9sZGVyLmZpcnN0Q2hpbGQub2Zmc2V0V2lkdGg7XG4gICAgfTtcblxuICAgIGxldCBvbmxvYWRMaXN0ZW5lciA9IGZ1bmN0aW9uIChzb3VyY2VFbGVtLCBzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0LCBhcnJheUluZGV4KSB7XG5cbiAgICAgICAgbGV0IHNvdXJjZUhvbGRlciA9IG5ldyBET01PYmplY3QoJ2RpdicpLmFkZENsYXNzZXNBbmRDcmVhdGUoWydmc2xpZ2h0Ym94LXNvdXJjZS1ob2xkZXInXSk7XG5cbiAgICAgICAgLy9ub3JtYWwgc291cmNlIGRpbWVuc2lvbnMgbmVlZHMgdG8gYmUgc3RvcmVkIGluIGFycmF5XG4gICAgICAgIC8vaXQgd2lsbCBiZSBuZWVkZWQgd2hlbiByZXNpemluZyBhIHNvdXJjZVxuICAgICAgICBmc0xpZ2h0Ym94LmRhdGEucmVtZW1iZXJlZFNvdXJjZXNEaW1lbnNpb25zW2FycmF5SW5kZXhdID0ge1xuICAgICAgICAgICAgXCJ3aWR0aFwiOiBzb3VyY2VXaWR0aCxcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IHNvdXJjZUhlaWdodFxuICAgICAgICB9O1xuICAgICAgICBzb3VyY2VIb2xkZXIuYXBwZW5kQ2hpbGQoc291cmNlRWxlbSk7XG4gICAgICAgIGFwcGVuZChzb3VyY2VzW2FycmF5SW5kZXhdLCBzb3VyY2VFbGVtKTtcbiAgICAgICAgZnNMaWdodGJveC5vblJlc2l6ZUV2ZW50LnNjYWxlU291cmNlKGFycmF5SW5kZXgpO1xuICAgIH07XG5cblxuICAgIGNvbnN0IGxvYWRZb3V0dWJldmlkZW8gPSBmdW5jdGlvbiAodmlkZW9JZCwgYXJyYXlJbmRleCkge1xuICAgICAgICBsZXQgaWZyYW1lID0gbmV3IERPTU9iamVjdCgnaWZyYW1lJykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc291cmNlJ10pO1xuICAgICAgICBpZnJhbWUuc3JjID0gJy8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLycgKyB2aWRlb0lkICsgJz9lbmFibGVqc2FwaT0xJztcbiAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3dmdWxsc2NyZWVuJywgJycpO1xuICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdmcmFtZWJvcmRlcicsICcwJyk7XG4gICAgICAgIGZzTGlnaHRib3gubWVkaWFIb2xkZXIuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgb25sb2FkTGlzdGVuZXIoaWZyYW1lLCAxOTIwLCAxMDgwLCBhcnJheUluZGV4KTtcbiAgICB9O1xuXG5cbiAgICBjb25zdCBpbWFnZUxvYWQgPSBmdW5jdGlvbiAoc3JjLCBhcnJheUluZGV4KSB7XG4gICAgICAgIGxldCBzb3VyY2VFbGVtID0gbmV3IERPTU9iamVjdCgnaW1nJykuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtc291cmNlJ10pO1xuICAgICAgICBzb3VyY2VFbGVtLnNyYyA9IHNyYztcbiAgICAgICAgc291cmNlRWxlbS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgb25sb2FkTGlzdGVuZXIoc291cmNlRWxlbSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIGFycmF5SW5kZXgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICBjb25zdCB2aWRlb0xvYWQgPSBmdW5jdGlvbiAoc3JjLCBhcnJheUluZGV4LCB0eXBlKSB7XG4gICAgICAgIGxldCB2aWRlb0xvYWRlZCA9IGZhbHNlO1xuICAgICAgICBsZXQgdmlkZW9FbGVtID0gbmV3IERPTU9iamVjdCgndmlkZW8nKS5hZGRDbGFzc2VzQW5kQ3JlYXRlKFsnZnNsaWdodGJveC1zb3VyY2UnXSk7XG4gICAgICAgIGxldCBzb3VyY2UgPSBuZXcgRE9NT2JqZWN0KCdzb3VyY2UnKS5lbGVtO1xuICAgICAgICBpZiAoZnNMaWdodGJveC5kYXRhLnZpZGVvc1Bvc3RlcnNbYXJyYXlJbmRleF0pIHtcbiAgICAgICAgICAgIHZpZGVvRWxlbS5wb3N0ZXIgPSBmc0xpZ2h0Ym94LmRhdGEudmlkZW9zUG9zdGVyc1thcnJheUluZGV4XTtcbiAgICAgICAgICAgIHZpZGVvRWxlbS5zdHlsZS5vYmplY3RGaXQgPSAnY292ZXInO1xuICAgICAgICB9XG4gICAgICAgIHNvdXJjZS5zcmMgPSBzcmM7XG4gICAgICAgIHNvdXJjZS50eXBlID0gdHlwZTtcbiAgICAgICAgdmlkZW9FbGVtLmFwcGVuZENoaWxkKHNvdXJjZSk7XG4gICAgICAgIGxldCB3aWR0aDtcbiAgICAgICAgbGV0IGhlaWdodDtcbiAgICAgICAgdmlkZW9FbGVtLm9ubG9hZGVkbWV0YWRhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodmlkZW9Mb2FkZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiBicm93c2VyIGRvbid0IHN1cHBvcnQgdmlkZW9XaWR0aCBhbmQgdmlkZW9IZWlnaHQgd2UgbmVlZCB0byBhZGQgZGVmYXVsdCBvbmVzXG4gICAgICAgICAgICBpZiAoIXRoaXMudmlkZW9XaWR0aCB8fCB0aGlzLnZpZGVvV2lkdGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB3aWR0aCA9IDE5MjA7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gMTA4MDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2lkdGggPSB0aGlzLnZpZGVvV2lkdGg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gdGhpcy52aWRlb0hlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZpZGVvTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIG9ubG9hZExpc3RlbmVyKHZpZGVvRWxlbSwgd2lkdGgsIGhlaWdodCwgYXJyYXlJbmRleCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gaWYgYnJvd3NlciBkb24ndCBzdXBwcnQgYm90aCBvbmxvYWRtZXRhZGF0YSBvciAudmlkZW9XaWR0aCB3ZSB3aWxsIGxvYWQgaXQgYWZ0ZXIgMzAwMG1zXG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcblxuICAgICAgICAvLyBPTiBJRSBvbiBsb2FkIGV2ZW50IGRvbnQgd29yayBzbyB3ZSBuZWVkIHRvIHdhaXQgZm9yIGRpbWVuc2lvbnMgd2l0aCBzZXRUaW1lb3V0c1xuICAgICAgICBsZXQgSUVGaXggPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGlmICh2aWRlb0xvYWRlZCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoSUVGaXgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdmlkZW9FbGVtLnZpZGVvV2lkdGggfHwgdmlkZW9FbGVtLnZpZGVvV2lkdGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoY291bnRlciA8IDMxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoID0gMTkyMDtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gMTA4MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdpZHRoID0gdmlkZW9FbGVtLnZpZGVvV2lkdGg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gdmlkZW9FbGVtLnZpZGVvSGVpZ2h0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2aWRlb0xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICBvbmxvYWRMaXN0ZW5lcih2aWRlb0VsZW0sIHdpZHRoLCBoZWlnaHQsIGFycmF5SW5kZXgpO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChJRUZpeCk7XG4gICAgICAgIH0sIDEwMCk7XG5cbiAgICAgICAgdmlkZW9FbGVtLnNldEF0dHJpYnV0ZSgnY29udHJvbHMnLCAnJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGludmFsaWRGaWxlID0gZnVuY3Rpb24gKGFycmF5SW5kZXgpIHtcbiAgICAgICAgbGV0IGludmFsaWRGaWxlV3JhcHBlciA9IG5ldyBET01PYmplY3QoJ2RpdicpXG4gICAgICAgICAgICAuYWRkQ2xhc3Nlc0FuZENyZWF0ZShbJ2ZzbGlnaHRib3gtaW52YWxpZC1maWxlLXdyYXBwZXInLCAnZnNsaWdodGJveC1mbGV4LWNlbnRlcmVkJ10pO1xuICAgICAgICBpbnZhbGlkRmlsZVdyYXBwZXIuaW5uZXJIVE1MID0gJ0ludmFsaWQgZmlsZSc7XG5cbiAgICAgICAgb25sb2FkTGlzdGVuZXIoaW52YWxpZEZpbGVXcmFwcGVyLCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0LCBhcnJheUluZGV4KTtcbiAgICB9O1xuXG5cbiAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0gPSBmdW5jdGlvbiAodXJsSW5kZXgpIHtcbiAgICAgICAgY29uc3QgcGFyc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBjb25zdCBzb3VyY2VVcmwgPSBmc0xpZ2h0Ym94LmRhdGEudXJsc1t1cmxJbmRleF07XG5cbiAgICAgICAgcGFyc2VyLmhyZWYgPSBzb3VyY2VVcmw7XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0SWQoc291cmNlVXJsKSB7XG4gICAgICAgICAgICBsZXQgcmVnRXhwID0gL14uKih5b3V0dS5iZVxcL3x2XFwvfHVcXC9cXHdcXC98ZW1iZWRcXC98d2F0Y2hcXD92PXxcXCZ2PSkoW14jXFwmXFw/XSopLiovO1xuICAgICAgICAgICAgbGV0IG1hdGNoID0gc291cmNlVXJsLm1hdGNoKHJlZ0V4cCk7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaCAmJiBtYXRjaFsyXS5sZW5ndGggPT0gMTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hbMl07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnZXJyb3InO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnNlci5ob3N0bmFtZSA9PT0gJ3d3dy55b3V0dWJlLmNvbScpIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3guZGF0YS52aWRlb3NbdXJsSW5kZXhdID0gZmFsc2U7XG4gICAgICAgICAgICBsb2FkWW91dHViZXZpZGVvKGdldElkKHNvdXJjZVVybCksIHVybEluZGV4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwIHx8IHhoci5zdGF0dXMgPT09IDIwNikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGVjayB3aGF0IHR5cGUgb2YgZmlsZSBwcm92aWRlZCBmcm9tIGxpbmtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlVHlwZSA9IHhoci5nZXRSZXNwb25zZUhlYWRlcignY29udGVudC10eXBlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhVHlwZSA9IHJlc3BvbnNlVHlwZS5zbGljZSgwLCByZXNwb25zZVR5cGUuaW5kZXhPZignLycpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFUeXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VMb2FkKHVybHNbdXJsSW5kZXhdLCB1cmxJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGFUeXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9Mb2FkKHVybHNbdXJsSW5kZXhdLCB1cmxJbmRleCwgcmVzcG9uc2VUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmc0xpZ2h0Ym94LmRhdGEudmlkZW9zW3VybEluZGV4XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludmFsaWRGaWxlKHVybEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGludmFsaWRGaWxlKHVybEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB4aHIuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB4aHIub3BlbignZ2V0Jywgc291cmNlVXJsLCB0cnVlKTtcbiAgICAgICAgICAgIHhoci5zZW5kKG51bGwpO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgaWYgKHR5cGVPZkxvYWQgPT09ICdpbml0aWFsJykge1xuICAgICAgICAvL2FwcGVuZCBsb2FkZXIgd2hlbiBsb2FkaW5nIGluaXRpYWxseVxuICAgICAgICBmc0xpZ2h0Ym94LmFwcGVuZE1ldGhvZHMucmVuZGVySG9sZGVySW5pdGlhbChzbGlkZSwgRE9NT2JqZWN0KTtcblxuICAgICAgICBpZiAodXJscy5sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNvdXJjZXNJbmRleGVzLmN1cnJlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVybHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU291cmNlRWxlbShzb3VyY2VzSW5kZXhlcy5uZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1cmxzLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc291cmNlc0luZGV4ZXMucHJldmlvdXMpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYXBwZW5kIGxvYWRlciB3aGVuIGxvYWRpbmcgYSBuZXh0IHNvdXJjZVxuICAgICAgICBmc0xpZ2h0Ym94LmFwcGVuZE1ldGhvZHMucmVuZGVySG9sZGVyKHNsaWRlLCB0eXBlT2ZMb2FkKTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGVPZkxvYWQpIHtcbiAgICAgICAgICAgIGNhc2UgJ3ByZXZpb3VzJzpcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNvdXJjZUVsZW0oc291cmNlc0luZGV4ZXMucHJldmlvdXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY3VycmVudCc6XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNvdXJjZXNJbmRleGVzLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbmV4dCc6XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTb3VyY2VFbGVtKHNvdXJjZXNJbmRleGVzLm5leHQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmc0xpZ2h0Ym94KSB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIGNvbnN0IHNvdXJjZXMgPSBmc0xpZ2h0Ym94LmRhdGEuc291cmNlcztcbiAgICBjb25zdCByZW1lbWJlcmVkU291cmNlRGltZW5zaW9uID0gZnNMaWdodGJveC5kYXRhLnJlbWVtYmVyZWRTb3VyY2VzRGltZW5zaW9ucztcblxuICAgIHRoaXMubWVkaWFIb2xkZXJEaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBtZWRpYUhvbGRlclN0eWxlID0gZnNMaWdodGJveC5tZWRpYUhvbGRlci5zdHlsZTtcbiAgICAgICAgY29uc3Qgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIGlmICh3aW5kb3dXaWR0aCA+IDEwMDApIHtcbiAgICAgICAgICAgIG1lZGlhSG9sZGVyU3R5bGUud2lkdGggPSAod2luZG93V2lkdGggLSAoMC4xICogd2luZG93V2lkdGgpKSArICdweCc7XG4gICAgICAgICAgICBtZWRpYUhvbGRlclN0eWxlLmhlaWdodCA9ICh3aW5kb3dIZWlnaHQgLSAoMC4xICogd2luZG93SGVpZ2h0KSkgKyAncHgnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWVkaWFIb2xkZXJTdHlsZS53aWR0aCA9IHdpbmRvd1dpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIG1lZGlhSG9sZGVyU3R5bGUuaGVpZ2h0ID0gKHdpbmRvd0hlaWdodCAtICgwLjEgKiB3aW5kb3dIZWlnaHQpKSArICdweCc7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB0aGlzLnNjYWxlQW5kVHJhbnNmb3JtU291cmNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3Qgc291cmNlc0NvdW50ID0gZnNMaWdodGJveC5kYXRhLnVybHMubGVuZ3RoO1xuICAgICAgICBjb25zdCBzdGFnZVNvdXJjZXNJbmRleGVzID0gZnNMaWdodGJveC5zdGFnZVNvdXJjZUluZGV4ZXMuYWxsKGZzTGlnaHRib3guZGF0YS5zbGlkZSk7XG4gICAgICAgIGlmIChzb3VyY2VzQ291bnQgPiAwKSB7XG4gICAgICAgICAgICBmc0xpZ2h0Ym94LnNsaWRlVHJhbnNmb3JtZXIuemVybyhzb3VyY2VzW3N0YWdlU291cmNlc0luZGV4ZXMuY3VycmVudF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNvdXJjZXNDb3VudCA+IDEpIHtcbiAgICAgICAgICAgIGZzTGlnaHRib3guc2xpZGVUcmFuc2Zvcm1lci5wbHVzKHNvdXJjZXNbc3RhZ2VTb3VyY2VzSW5kZXhlcy5uZXh0XSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc291cmNlc0NvdW50ID4gMikge1xuICAgICAgICAgICAgZnNMaWdodGJveC5zbGlkZVRyYW5zZm9ybWVyLm1pbnVzKHNvdXJjZXNbc3RhZ2VTb3VyY2VzSW5kZXhlcy5wcmV2aW91c10pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3VyY2VzQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zY2FsZVNvdXJjZShpKTtcbiAgICAgICAgICAgIGlmIChpICE9PSBzdGFnZVNvdXJjZXNJbmRleGVzLmN1cnJlbnRcbiAgICAgICAgICAgICAgICAmJiBpICE9PSBzdGFnZVNvdXJjZXNJbmRleGVzLm5leHRcbiAgICAgICAgICAgICAgICAmJiBpICE9PSBzdGFnZVNvdXJjZXNJbmRleGVzLnByZXZpb3VzXG4gICAgICAgICAgICAgICAgJiYgc291cmNlc1tpXSkge1xuICAgICAgICAgICAgICAgIGZzTGlnaHRib3guc2xpZGVUcmFuc2Zvcm1lci5wbHVzKHNvdXJjZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgdGhpcy5zY2FsZVNvdXJjZSA9IGZ1bmN0aW9uIChzb3VyY2VJbmRleCkge1xuICAgICAgICBpZiAoIXNvdXJjZXNbc291cmNlSW5kZXhdKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBzb3VyY2VzW3NvdXJjZUluZGV4XS5maXJzdENoaWxkO1xuICAgICAgICBsZXQgc291cmNlV2lkdGggPSByZW1lbWJlcmVkU291cmNlRGltZW5zaW9uW3NvdXJjZUluZGV4XS53aWR0aDtcbiAgICAgICAgbGV0IHNvdXJjZUhlaWdodCA9IHJlbWVtYmVyZWRTb3VyY2VEaW1lbnNpb25bc291cmNlSW5kZXhdLmhlaWdodDtcblxuICAgICAgICBjb25zdCBjb2VmZmljaWVudCA9IHNvdXJjZVdpZHRoIC8gc291cmNlSGVpZ2h0O1xuICAgICAgICBjb25zdCBkZXZpY2VXaWR0aCA9IHBhcnNlSW50KGZzTGlnaHRib3gubWVkaWFIb2xkZXIuc3R5bGUud2lkdGgpO1xuICAgICAgICBjb25zdCBkZXZpY2VIZWlnaHQgPSBwYXJzZUludChmc0xpZ2h0Ym94Lm1lZGlhSG9sZGVyLnN0eWxlLmhlaWdodCk7XG4gICAgICAgIGxldCBuZXdIZWlnaHQgPSBkZXZpY2VXaWR0aCAvIGNvZWZmaWNpZW50O1xuXG4gICAgICAgIGNvbnN0IHNldERpbWVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArIFwicHhcIjtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSAobmV3SGVpZ2h0ICogY29lZmZpY2llbnQpICsgXCJweFwiO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHdpZGVyIHRoYW4gaGlnaGVyXG4gICAgICAgIGlmIChuZXdIZWlnaHQgPCBkZXZpY2VIZWlnaHQpIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2VXaWR0aCA8IGRldmljZVdpZHRoKSB7XG4gICAgICAgICAgICAgICAgbmV3SGVpZ2h0ID0gc291cmNlSGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0RGltZW5zaW9ucygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9oaWdoZXIgdGhhbiB3aWRlclxuICAgICAgICBpZiAoc291cmNlSGVpZ2h0ID4gZGV2aWNlSGVpZ2h0KSB7XG4gICAgICAgICAgICBuZXdIZWlnaHQgPSBkZXZpY2VIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdIZWlnaHQgPSBzb3VyY2VIZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBzZXREaW1lbnNpb25zKCk7XG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5tZWRpYUhvbGRlckRpbWVuc2lvbnMoKTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcigpO1xuICAgIH07XG5cbiAgICB0aGlzLmFkZExpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUxpc3RlbmVyKTtcbiAgICB9O1xuXG4gICAgIHRoaXMucmVzaXplTGlzdGVuZXIgPSBmdW5jdGlvbigpICB7XG4gICAgICAgIF90aGlzLm1lZGlhSG9sZGVyRGltZW5zaW9ucygpO1xuICAgICAgICBfdGhpcy5zY2FsZUFuZFRyYW5zZm9ybVNvdXJjZXMoKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVMaXN0ZW5lcik7XG4gICAgfTtcbn07XG4iXX0=
