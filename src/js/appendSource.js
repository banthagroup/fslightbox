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
     * Renders loader when loading a previous source
     * @param self
     * @param slide
     * @param DOMObject
     */
    renderHolderPrevious: function (self, slide, DOMObject) {
        const holder = self.data.mediaHolder.holder;

        // we will be removing previous element from slide before so we need to decrement slide
        let sourceHolder = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
        sourceHolder.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
        const transformPrevious = -self.data.slideDistance * window.innerWidth;
        sourceHolder.style.transform = 'translate(' + transformPrevious + 'px,0)';

        // we are appending sourceHolder to array on slide index because array is indexed from 0
        // so next source index will be simply slide number decreased by 2
        self.data.sources[slide - 2] = sourceHolder;
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

        // we will be removing previous element from slide before so we need to decrement slide
        let sourceHolder = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
        sourceHolder.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
        sourceHolder.style.transform = 'translate(' + self.data.slideDistance * window.innerWidth + 'px,0)';

        // we are appending sourceHolder to array on slide index because array is indexed from 0
        // so next source index will be simply slide number
        self.data.sources[slide] = sourceHolder;
        holder.appendChild(sourceHolder);
    }


};