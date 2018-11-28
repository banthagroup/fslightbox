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
            const stageSources = self.data.stageSources;

            //previous source
            if (arrayIndex === 0) {
                stageSources.previousSource = sources[lastArrayIndex];
            } else {
                stageSources.previousSource = sources[arrayIndex - 1];
            }


            //current source
            stageSources.currentSource = sources[arrayIndex];

            //next source
            if (arrayIndex === lastArrayIndex) {
                stageSources.nextSource = 0;
            } else {
                stageSources.nextSource = sources[arrayIndex + 1];
            }

            for (let source in stageSources) {
                self.data.mediaHolder.holder.appendChild(stageSources[source]);
                stageSources[source].style.transform = 'translate(' + -1.3 * window.innerWidth + 'px,0)';
            }
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
        if (!slideLoad.loads[slide] || !slideLoad.isCallingAppends[slide]) {
            return false;
        }
        slideLoad.loaded = false;
        slideLoad.loads[slide] = false;
        slideLoad.isCallingAppend = false;
        slideLoad.isCallingAppends[slide] = false;

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

    /**
     * This method change stage sources after sliding to next source
     * @param self
     */
    nextSourceChangeStage: function (self, slide) {

        const mediaHolder = self.data.mediaHolder.holder;
        const stageSources = self.data.stageSources;

        console.log(stageSources.nextSource.firstChild);
        mediaHolder.removeChild(stageSources.previousSource);
        stageSources.previousSource = stageSources.currentSource;
        stageSources.currentSource = stageSources.nextSource;

        if (self.data.slide === self.data.total_slides) {
            stageSources.nextSource = self.data.sources[0];
        } else {
            stageSources.nextSource = self.data.sources[slide];
        }
        mediaHolder.appendChild(stageSources.nextSource);

        self.data.xPosition = -1.3 * window.innerWidth;
        for (let source in stageSources) {
            stageSources[source].style.transform = 'translate(' + -1.3 * window.innerWidth + 'px,0)';
        }
    }
};