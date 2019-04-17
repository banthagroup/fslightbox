module.exports = function (fsLightbox) {
    const _this = this;
    const sources = fsLightbox.data.sources;
    const rememberedSourceDimension = fsLightbox.data.rememberedSourcesDimensions;

    this.mediaHolderDimensions = function () {
        const mediaHolderStyle = fsLightbox.mediaHolder.style;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if (windowWidth > 1000) {
            mediaHolderStyle.width = (windowWidth - (0.1 * windowWidth)) + 'px';
            mediaHolderStyle.height = (windowHeight - (0.1 * windowHeight)) + 'px';
        } else {
            mediaHolderStyle.width = windowWidth + 'px';
            mediaHolderStyle.height = (windowHeight - (0.1 * windowHeight)) + 'px';
        }
    };


    this.scaleAndTransformSources = function () {
        const sourcesCount = fsLightbox.data.urls.length;
        const stageSourcesIndexes = fsLightbox.stageSourceIndexes.all(fsLightbox.data.slide);
        if (sourcesCount > 0) {
            fsLightbox.slideTransformer.zero(sources[stageSourcesIndexes.current]);
        }

        if (sourcesCount > 1) {
            fsLightbox.slideTransformer.plus(sources[stageSourcesIndexes.next]);
        }

        if (sourcesCount > 2) {
            fsLightbox.slideTransformer.minus(sources[stageSourcesIndexes.previous]);
        }

        for (let i = 0; i < sourcesCount; i++) {
            this.scaleSource(i);
            if (i !== stageSourcesIndexes.current
                && i !== stageSourcesIndexes.next
                && i !== stageSourcesIndexes.previous
                && sources[i]) {
                fsLightbox.slideTransformer.plus(sources[i]);
            }
        }
    };


    this.scaleSource = function (sourceIndex) {
        if (!sources[sourceIndex]) return;
        const element = sources[sourceIndex].firstChild;
        let sourceWidth = rememberedSourceDimension[sourceIndex].width;
        let sourceHeight = rememberedSourceDimension[sourceIndex].height;

        const coefficient = sourceWidth / sourceHeight;
        const deviceWidth = parseInt(fsLightbox.mediaHolder.style.width);
        const deviceHeight = parseInt(fsLightbox.mediaHolder.style.height);
        let newHeight = deviceWidth / coefficient;

        const setDimensions = function () {
            element.style.height = newHeight + "px";
            element.style.width = (newHeight * coefficient) + "px";
        };

        // wider than higher
        if (newHeight < deviceHeight) {
            if (sourceWidth < deviceWidth) {
                newHeight = sourceHeight;
            }
            setDimensions();
            return;
        }

        //higher than wider
        if (sourceHeight > deviceHeight) {
            newHeight = deviceHeight;
        } else {
            newHeight = sourceHeight;
        }

        setDimensions();
    };

    this.init = function () {
        this.mediaHolderDimensions();
        this.addListener();
    };

    this.addListener = function() {
        window.addEventListener('resize', this.resizeListener);
    };

     this.resizeListener = function()  {
        _this.mediaHolderDimensions();
        _this.scaleAndTransformSources();
    };

    this.removeListener = function() {
        window.removeEventListener('resize', this.resizeListener);
    };
};
