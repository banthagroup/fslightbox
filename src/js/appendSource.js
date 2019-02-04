module.exports = {

    loader: '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>',
    DOMObject: '',
    transition: 'fslightbox-transform-transition',
    fadeIn: 'fslightbox-fade-in-animation',
    fadeOut: 'fslightbox-fade-out-animation',

    createHolder: function (self, index) {
        let sourceHolder = new this.DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
        sourceHolder.innerHTML = this.loader;
        self.data.sources[index] = sourceHolder;
        return sourceHolder;
    },

    runFadeOutAnimationOnSlide(self, elem) {
        elem.classList.remove(this.fadeOut);
        void elem.offsetWidth;
        elem.classList.add(this.fadeOut);
    },


    /**
     * Renders loader when loading fsLightbox initially
     * @param slide
     * @param DOMObject
     */
    renderHolderInitial: function (self, slide, DOMObject) {
        this.DOMObject = DOMObject;
        const sourcesIndexes = self.getSourcesIndexes.all(slide);
        const totalSlides = self.data.total_slides;

        if (totalSlides >= 3) {
            const prev = this.createHolder(self, sourcesIndexes.previous);
            self.transforms.transformMinus(prev);
            self.data.mediaHolder.holder.appendChild(prev);
        }
        if (totalSlides >= 1) {
            const curr = this.createHolder(self, sourcesIndexes.current);
            self.data.mediaHolder.holder.appendChild(curr);
        }
        if (totalSlides >= 2) {
            const next = this.createHolder(self, sourcesIndexes.next);
            self.transforms.transformPlus(next);
            self.data.mediaHolder.holder.appendChild(next);
        }
    },

    renderHolder: function (self, slide, type) {
        switch (type) {
            case 'previous':
                this.renderHolderPrevious(self, slide);
                break;
            case 'current':
                this.renderHolderCurrent(self, slide);
                break;
            case 'next':
                this.renderHolderNext(self, slide);
                break;
        }
    },

    /**
     * Renders loader when loading a previous source
     * @param self
     * @param slide
     */
    renderHolderPrevious: function (self, slide) {
        const previousSourceIndex = self.getSourcesIndexes.previous(slide);
        const prev = this.createHolder(self, previousSourceIndex);
        self.transforms.transformMinus(prev);
        self.data.mediaHolder.holder.insertAdjacentElement('afterbegin', prev);
    },


    /**
     * Renders loader when loading a next source
     * @param self
     * @param slide
     */
    renderHolderNext: function (self, slide) {
        const nextSourceIndex = self.getSourcesIndexes.next(slide);
        const next = this.createHolder(self, nextSourceIndex);
        self.transforms.transformPlus(next);
        self.data.mediaHolder.holder.appendChild(next);
    },


    /**
     * Renders loader when loading a previous source
     * @param self
     * @param slide
     */
    renderHolderCurrent: function (self, slide) {
        const sourcesIndexes = self.getSourcesIndexes.all(slide);
        const curr = this.createHolder(self, sourcesIndexes.current);
        self.transforms.transformNull(curr);
        self.data.mediaHolder.holder.insertBefore(curr, self.data.sources[sourcesIndexes.next]);
    },


    /**
     * Change slide to previous after clicking button
     * @param self
     * @param previousSlide
     */
    previousSlideViaButton: function (self, previousSlide) {
        if (previousSlide === 1) {
            self.data.slide = self.data.total_slides;
        } else {
            self.data.slide -= 1;
        }

        self.stopVideos();
        self.data.updateSlideNumber(self.data.slide);
        const newSourcesIndexes = self.getSourcesIndexes.all(self.data.slide);

        if (typeof self.data.sources[newSourcesIndexes.previous] === "undefined") {
            self.loadsources('previous', self.data.slide);
        }

        const sources = self.data.sources;
        const currentSource = sources[newSourcesIndexes.current];
        const nextSource = sources[newSourcesIndexes.next];

        nextSource.classList.remove(this.transition);
        currentSource.classList.remove(this.transition);
        sources[newSourcesIndexes.previous].classList.remove(this.transition);

        this.runFadeOutAnimationOnSlide(self, nextSource);

        currentSource.classList.remove(this.fadeOut);
        void currentSource.offsetWidth;
        currentSource.classList.add(this.fadeIn);

        self.transforms.transformNull(currentSource);
        setTimeout(function () {
            self.transforms.transformPlus(nextSource);
        }, 230);
    },


    /**
     * Change slide to next after clicking button
     * @param self
     * @param previousSlide
     */
    nextSlideViaButton: function (self, previousSlide) {
        if (previousSlide === self.data.total_slides) {
            self.data.slide = 1;
        } else {
            self.data.slide += 1;
        }

        self.stopVideos();
        self.data.updateSlideNumber(self.data.slide);
        const newSourcesIndexes = self.getSourcesIndexes.all(self.data.slide);

        if (typeof self.data.sources[newSourcesIndexes.next] === "undefined") {
            self.loadsources('next', self.data.slide);
        }

        const sources = self.data.sources;
        const currentSource = sources[newSourcesIndexes.current];
        const previousSource = sources[newSourcesIndexes.previous];

        previousSource.classList.remove(this.transition);
        currentSource.classList.remove(this.transition);
        sources[newSourcesIndexes.next].classList.remove(this.transition);

        currentSource.classList.remove(this.fadeOut);
        void currentSource.offsetWidth;
        currentSource.classList.add(this.fadeIn);

        this.runFadeOutAnimationOnSlide(self, previousSource);


        self.transforms.transformNull(currentSource);
        setTimeout(function () {
            self.transforms.transformMinus(previousSource);
        }, 230);
    }
};