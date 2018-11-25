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

    previousAppend: function () {

    },


    /**
     * Loading after transition should be called first
     * but if image won't load till that this method will be called to append next source when it's loaded
     * @param self
     */
    nextAppend: function (self) {

        const nextLoad = self.data.nextLoad;
        if(!nextLoad.loaded || !nextLoad.isCallingAppend) {
            return;
        }
        nextLoad.loaded = false;
        nextLoad.isCallingAppend = false;

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
        stageSources.nextSource = self.data.sources[self.data.slide];

        self.data.xPosition = -1.3 * window.innerWidth;

        for (let source in stageSources) {
            stageSources[source].style.transform = 'translate(' + -1.3 * window.innerWidth + 'px,0)';
        }
        mediaHolder.appendChild(stageSources.nextSource);
    }
};