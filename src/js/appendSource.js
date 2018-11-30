module.exports = {
    
    /**
     * Renders loader when loading fsLightbox initially
     * @param self
     * @param slide
     * @param DOMObject
     */
    renderHolderInitial: function (self, slide, DOMObject) {
        const holder = self.data.mediaHolder.holder;
        const sourcesIndexes = self.getSourcesIndexes(slide);
        const loader = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
        const totalSlides = self.data.total_slides;

        if(totalSlides >= 3) {
            let sourceHolderPrevious = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
            sourceHolderPrevious.style.transform = 'translate(' + -self.data.slideDistance * window.innerWidth + 'px,0)';
            sourceHolderPrevious.innerHTML = loader;
            self.data.sources[sourcesIndexes.previous] = sourceHolderPrevious;
            holder.appendChild(sourceHolderPrevious);
        }

        if(totalSlides >= 1) {
            let sourceHolderCurrent= new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
            sourceHolderCurrent.innerHTML = loader;
            self.data.sources[sourcesIndexes.current] = sourceHolderCurrent;
            holder.appendChild(sourceHolderCurrent);
        }

        if(totalSlides >= 2) {
            let sourceHolderNext= new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
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
        const sourcesIndexes = self.getSourcesIndexes(slide);

        // create holder and add a proper transform
        let sourceHolder = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
        sourceHolder.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
        const transformPrevious = -self.data.slideDistance * window.innerWidth;
        sourceHolder.style.transform = 'translate(' + transformPrevious + 'px,0)';


        self.data.sources[sourcesIndexes.previous] = sourceHolder;
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
        const sourcesIndexes = self.getSourcesIndexes(slide);

        // create holder and add a proper transform
        let sourceHolder = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);
        sourceHolder.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
        sourceHolder.style.transform = 'translate(' + self.data.slideDistance * window.innerWidth + 'px,0)';

        self.data.sources[sourcesIndexes.next] = sourceHolder;
        holder.appendChild(sourceHolder);
    }


};