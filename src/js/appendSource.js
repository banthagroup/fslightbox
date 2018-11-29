module.exports = {

    initialAppend: function (self) {

        let count = 0;
        for (let source in self.data.sources) {
            if (source) {
                count++;
            }
        }

        if (count !== 3) {
            return;
        }

        if (count === 3) {

            //index of the current element stored in memory is just decremented slide number
            let arrayIndex = self.data.slide - 1;
            let lastArrayIndex = self.data.urls.length - 1;
            const sources = self.data.sources;
            const mediaHolder = self.data.mediaHolder.holder;

            let previousSource;
            let currentSource;
            let nextSource;

            //previous source
            if (arrayIndex === 0) {
                previousSource = sources[lastArrayIndex];
            } else {
                previousSource = sources[arrayIndex - 1];
            }

            //current source
            currentSource = sources[arrayIndex];

            //next source
            if (arrayIndex === lastArrayIndex) {
                nextSource = 0;
            } else {
                nextSource = sources[arrayIndex + 1];
            }

            previousSource.style.transform = 'translate(' + -self.data.slideDistance * window.innerWidth + 'px,0)';
            nextSource.style.transform = 'translate(' + self.data.slideDistance * window.innerWidth + 'px,0)';

            mediaHolder.appendChild(previousSource);
            mediaHolder.appendChild(currentSource);
            mediaHolder.appendChild(nextSource);
        }
    },


    /**
     * Loading after transition should be called first
     * but if source won't load till that this method will notice that
     * @param self
     * @param slide
     */
    useAppendMethod: function (self, slide) {
        const slideLoad = self.data.slideLoad;
        if (!slideLoad.loaded[slide] || !slideLoad.isCallingAppend[slide]) {
            return false;
        }
        slideLoad.loaded[slide] = false;
        slideLoad.isCallingAppend[slide] = false;

        return true;
    },


    /**
     * Check if previous source append is needed and call if it is
     * @param self
     * @param slide
     */
    previousAppend: function (self, slide) {
        if (!this.useAppendMethod(self, slide)) {
            return;
        }

        this.previousSourceChangeStage(self, slide);
    },


    /**
     * This method changes stage sources after sliding to previous source
     * @param self
     */
    previousSourceChangeStage: function (self) {

        const mediaHolder = self.data.mediaHolder.holder;
        const stageSources = self.data.stageSources;

        mediaHolder.removeChild(stageSources.nextSource);
        stageSources.nextSource = stageSources.currentSource;

        stageSources.currentSource = stageSources.previousSource;

        if (self.data.slide === 1) {
            stageSources.previousSource = self.data.sources[self.data.total_slides - 1];
        } else {
            stageSources.previousSource = self.data.sources[self.data.slide - 2];
        }
        mediaHolder.insertAdjacentElement('afterbegin', stageSources.previousSource);
    },


    /**
     * Check if next source append is needed and call if it is
     * @param self
     * @param slide
     */
    nextAppend: function (self, slide) {
        if (!this.useAppendMethod(self, slide)) {
            return;
        }

        this.nextSourceChangeStage(self, slide);
    },



    renderHolderNext: function (self, slide, DOMObject) {

        const sources = self.data.sources;

        // we will be removing previous element from slide before so we need to decrement slide
        const sourcesIndexes = self.getSourcesIndexes(slide - 1);
        let sourceHolder = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
        sourceHolder.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
        self.data.mediaHolder.holder.removeChild(sources[sourcesIndexes.previous]);
        sourceHolder.style.transform = 'translate(' + self.data.slideDistance * window.innerWidth + 'px,0)';

        // we are appending sourceHolder to array on slide index because array is indexed from 0
        // so next source index will be simply slide number
        self.data.sources[slide] = sourceHolder;
        self.data.mediaHolder.holder.appendChild(sourceHolder);
    },



    /**
     * This method change stage sources after sliding to next source
     * @param self
     */
    nextSourceChangeStage: function (self, slide) {
        const nextSource = self.data.sources[slide];
        const nextSourceHolder = self.data.mediaHolder.holder.childNodes[2];
        //nextSourceHolder.appendChild(nextSource.firstChild);
        console.log(nextSourceHolder);
    },
};