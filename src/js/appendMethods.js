module.exports = function (self) {
    const loader = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
    const transition = 'fslightbox-transform-transition';
    const fadeIn = 'fslightbox-fade-in-animation';
    const fadeOut = 'fslightbox-fade-out-animation';


    const createHolder = function (index) {
        const sourceHolder = new(require('./DOMObject'))('div').addClassesAndCreate(['fslightbox-source-holder']);
        sourceHolder.innerHTML = loader;
        self.data.sources[index] = sourceHolder;
        return sourceHolder;
    };


    const runFadeOutAnimationOnSlide = function (elem) {
        elem.classList.remove(fadeOut);
        void elem.offsetWidth;
        elem.classList.add(fadeOut);
    };


    /**
     * Renders loader when loading fsLightbox initially
     * @param slide
     */
    this.renderHolderInitial = function (slide) {
        const sourcesIndexes = self.getSourcesIndexes.all(slide);
        const totalSlides = self.data.total_slides;

        if (totalSlides >= 3) {
            const prev = createHolder(sourcesIndexes.previous);
            self.transforms.transformMinus(prev);
            self.data.mediaHolder.holder.appendChild(prev);
        }
        if (totalSlides >= 1) {
            const curr = createHolder(sourcesIndexes.current);
            self.data.mediaHolder.holder.appendChild(curr);
        }
        if (totalSlides >= 2) {
            const next = createHolder(sourcesIndexes.next);
            self.transforms.transformPlus(next);
            self.data.mediaHolder.holder.appendChild(next);
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
        const previousSourceIndex = self.getSourcesIndexes.previous(slide);
        const prev = createHolder(previousSourceIndex);
        self.transforms.transformMinus(prev);
        self.data.mediaHolder.holder.insertAdjacentElement('afterbegin', prev);
    };


    const renderHolderNext = function (slide) {
        const nextSourceIndex = self.getSourcesIndexes.next(slide);
        const next = createHolder(nextSourceIndex);
        self.transforms.transformPlus(next);
        self.data.mediaHolder.holder.appendChild(next);
    };


    const renderHolderCurrent = function (slide) {
        const sourcesIndexes = self.getSourcesIndexes.all(slide);
        const curr = createHolder(sourcesIndexes.current);
        self.transforms.transformNull(curr);
        self.data.mediaHolder.holder.insertBefore(curr, self.data.sources[sourcesIndexes.next]);
    };


    this.previousSlideViaButton = function (previousSlide) {
        if (previousSlide === 1) {
            self.data.slide = self.data.total_slides;
        } else {
            self.data.slide -= 1;
        }

        const newSourcesIndexes = stopVideosUpdateSlideAndReturnSlideNumberIndexes();

        if (typeof self.data.sources[newSourcesIndexes.previous] === "undefined") {
            self.loadsources('previous', self.data.slide);
        }

        const sources = self.data.sources;
        const currentSource = sources[newSourcesIndexes.current];
        const nextSource = sources[newSourcesIndexes.next];

        nextSource.classList.remove(transition);
        currentSource.classList.remove(transition);
        sources[newSourcesIndexes.previous].classList.remove(transition);

        runFadeOutAnimationOnSlide(nextSource);

        currentSource.classList.remove(fadeOut);
        void currentSource.offsetWidth;
        currentSource.classList.add(fadeIn);

        self.transforms.transformNull(currentSource);
        setTimeout(function () {
            self.transforms.transformPlus(nextSource);
        }, 220);
    };


    this.nextSlideViaButton = function (previousSlide) {
        if (previousSlide === self.data.total_slides) {
            self.data.slide = 1;
        } else {
            self.data.slide += 1;
        }

        const newSourcesIndexes = stopVideosUpdateSlideAndReturnSlideNumberIndexes();

        if (typeof self.data.sources[newSourcesIndexes.next] === "undefined") {
            self.loadsources('next', self.data.slide);
        }

        const sources = self.data.sources;
        const currentSource = sources[newSourcesIndexes.current];
        const previousSource = sources[newSourcesIndexes.previous];

        previousSource.classList.remove(transition);
        currentSource.classList.remove(transition);
        sources[newSourcesIndexes.next].classList.remove(transition);

        currentSource.classList.remove(fadeOut);
        void currentSource.offsetWidth;
        currentSource.classList.add(fadeIn);

        runFadeOutAnimationOnSlide(previousSource);


        self.transforms.transformNull(currentSource);
        setTimeout(function () {
            self.transforms.transformMinus(previousSource);
        }, 220);
    };


    const stopVideosUpdateSlideAndReturnSlideNumberIndexes = function () {
        self.stopVideos();
        self.data.updateSlideNumber(self.data.slide);
        return self.getSourcesIndexes.all(self.data.slide);
    };
};