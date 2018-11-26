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
     */
    useAppendMethod: function(self) {
        const slideLoad = self.data.slideLoad;
        if(!slideLoad.loaded || !slideLoad.isCallingAppend) {
            return false;
        }
        slideLoad.loaded = false;
        slideLoad.isCallingAppend = false;

        return true;
    },



    /**
     * Check if previous source append is needed and call if it is
     * @param self
     */
    previousAppend: function (self) {
        if(!this.useAppendMethod(self)) {
            return;
        }

        this.previousSourceChangeStage(self);
    },


    /**
     * This method changes stage sources after sliding to previous source
     * @param self
     */
    previousSourceChangeStage(self) {

    },




    /**
     * Check if next source append is needed and call if it is
     * @param self
     */
    nextAppend: function (self) {
        if(!this.useAppendMethod(self)) {
            return;
        }

        this.nextSourceChangeStage(self);
    },


    /**
     * This method change stage sources after sliding to next source
     * @param self
     */
    nextSourceChangeStage: function (self) {
        const mediaHolder = self.data.mediaHolder.holder;
        const stageSources = self.data.stageSources;

        mediaHolder.removeChild(stageSources.previousSource);
        stageSources.previousSource = stageSources.currentSource;

        mediaHolder.insertAdjacentElement('afterbegin', stageSources.previousSource);
        stageSources.currentSource = stageSources.nextSource;

        if(self.data.slide === self.data.total_slides) {
            stageSources.nextSource = self.data.sources[0];
        } else {
            stageSources.nextSource = self.data.sources[self.data.slide];
        }

        self.data.xPosition = -1.3 * window.innerWidth;
        for (let source in stageSources) {
            stageSources[source].style.transform = 'translate(' + -1.3 * window.innerWidth + 'px,0)';
        }
        mediaHolder.appendChild(stageSources.nextSource);
    }
};