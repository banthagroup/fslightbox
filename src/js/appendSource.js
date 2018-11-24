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
            if(arrayIndex === lastArrayIndex) {
                stageSources.nextSource = 0;
            } else {
                stageSources.nextSource = sources[arrayIndex + 1];
            }

            for(let source in stageSources) {
                self.data.mediaHolder.holder.appendChild(stageSources[source]);
            }
        }
    },

    previousAppend: function () {

    },

    nextAppend: function () {

    }
};