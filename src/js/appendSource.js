module.exports = {

    /**
     * Renders loader when loading fsLightbox initially
     * @param self
     * @param slide
     * @param DOMObject
     */
    renderHolderInitial: function (self, slide, DOMObject) {
        const holder = self.data.mediaHolder.holder;
        const sourcesIndexes = self.getSourcesIndexes.all(slide);
        const loader = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
        const totalSlides = self.data.total_slides;

        if (totalSlides >= 3) {
            let sourceHolderPrevious = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
            sourceHolderPrevious.style.transform = 'translate(' + -self.data.slideDistance * window.innerWidth + 'px,0)';
            sourceHolderPrevious.innerHTML = loader;
            self.data.sources[sourcesIndexes.previous] = sourceHolderPrevious;
            holder.appendChild(sourceHolderPrevious);
        }

        if (totalSlides >= 1) {
            let sourceHolderCurrent = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
            sourceHolderCurrent.innerHTML = loader;
            self.data.sources[sourcesIndexes.current] = sourceHolderCurrent;
            holder.appendChild(sourceHolderCurrent);
        }

        if (totalSlides >= 2) {
            let sourceHolderNext = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
            sourceHolderNext.style.transform = 'translate(' + self.data.slideDistance * window.innerWidth + 'px,0)';
            sourceHolderNext.innerHTML = loader;

            self.data.sources[sourcesIndexes.next] = sourceHolderNext;
            holder.appendChild(sourceHolderNext);
        }
    },


    /**
     * Renders loader when loading a previous source
     * @param self
     * @param slide
     * @param DOMObject
     */
    renderHolderPrevious: function (self, slide, DOMObject) {
        const holder = self.data.mediaHolder.holder;
        const previousSourceIndex = self.getSourcesIndexes.previous(slide);

        // create holder and add a proper transform
        let sourceHolder = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
        sourceHolder.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
        const transformPrevious = -self.data.slideDistance * window.innerWidth;
        sourceHolder.style.transform = 'translate(' + transformPrevious + 'px,0)';


        self.data.sources[previousSourceIndex] = sourceHolder;
        holder.insertAdjacentElement('afterbegin', sourceHolder);
    },


    /**
     * Renders loader when loading a next source
     * @param self
     * @param slide
     * @param DOMObject
     */
    renderHolderNext: function (self, slide, DOMObject) {
        const holder = self.data.mediaHolder.holder;
        const nextSourceIndex = self.getSourcesIndexes.next(slide);

        // create holder and add a proper transform
        let sourceHolder = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
        sourceHolder.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
        sourceHolder.style.transform = 'translate(' + self.data.slideDistance * window.innerWidth + 'px,0)';

        self.data.sources[nextSourceIndex] = sourceHolder;
        holder.appendChild(sourceHolder);
    },


    /**
     * Change slide to previous after clicking button
     * @param self
     * @param slide
     * @param DOMObject
     */
    previousSlideViaButton: function (self, slide, DOMObject) {

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
        self.data.updateSlideNumber(self.data.slide);
        const newSourcesIndexes = self.getSourcesIndexes.all(self.data.slide);

        if (typeof self.data.sources[newSourcesIndexes.next] === "undefined") {
            self.loadsources('next', self.data.slide);
        }

        const sources = self.data.sources;
        const currentSource = sources[newSourcesIndexes.current];
        const previousSource = sources[newSourcesIndexes.previous];

        previousSource.classList.remove('fslightbox-transform-transition');
        currentSource.classList.remove('fslightbox-transform-transition');
        sources[newSourcesIndexes.previous].classList.remove('fslightbox-transform-transition');

        previousSource.classList.remove('fslightbox-fade-in-animation');
        void previousSource.offsetWidth;
        previousSource.classList.add('fslightbox-fade-in-animation');


        currentSource.classList.remove('fslightbox-fade-in-animation');
        void currentSource.offsetWidth;
        currentSource.classList.add('fslightbox-fade-in-animation');


        currentSource.style.transform = 'translate(0,0)';
        const minusTransform = -self.data.slideDistance * window.innerWidth;
        previousSource.style.transform = 'translate(' + minusTransform + 'px,0)';
    }


};