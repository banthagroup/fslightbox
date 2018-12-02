module.exports = function (self, DOMObject, typeOfLoad, slide) {

    const _this = this;
    const sourcesIndexes = self.getSourcesIndexes.all(slide);
    const urls = self.data.urls;
    const sources = self.data.sources;
    let tempSources = {};

    let sourceDimensions = function (sourceElem, sourceWidth, sourceHeight) {

        const coefficient = sourceWidth / sourceHeight;
        const deviceWidth = window.innerWidth;
        const deviceHeight = parseInt(self.data.mediaHolder.holder.style.height);
        let newHeight = deviceWidth / coefficient;
        if (newHeight < deviceHeight - 60) {
            sourceElem.style.height = newHeight + "px";
            sourceElem.style.width = deviceWidth + "px";
        } else {
            newHeight = deviceHeight - 60;
            sourceElem.style.height = newHeight + "px";
            sourceElem.style.width = newHeight * coefficient + "px";
        }
    };


    /**
     * add fade in class and dimension function
     */
    let onloadListener = function (sourceElem, sourceWidth, sourceHeight, arrayIndex) {

        let sourceHolder = new DOMObject('div').addClassesAndCreate(['fslightbox-source-holder']);

        //normal source dimensions needs to be stored in array
        //it will be needed when resizing a source
        self.data.rememberedSourcesDimensions[arrayIndex] = {
            "width": sourceWidth,
            "height": sourceHeight
        };

        // set dimensions for the 1st time
        sourceDimensions(sourceElem, sourceWidth, sourceHeight);

        sourceHolder.appendChild(sourceElem);
        const previousSource = sources[sourcesIndexes.previous];
        const currentSource = sources[sourcesIndexes.current];
        const nextSource = sources[sourcesIndexes.next];

        switch (typeOfLoad) {
            case 'initial':
                // add to temp array because loading is asynchronous so we can't depend on load order
                tempSources[arrayIndex] = sourceHolder;
                const tempSourcesLength = Object.keys(tempSources).length;

                let appends = {

                    appendPrevious: function () {
                        previousSource.innerHTML = '';
                        previousSource.appendChild(tempSources[sourcesIndexes.previous].firstChild);
                        previousSource.firstChild.classList.add('fslightbox-fade-in');
                    },

                    appendCurrent: function () {
                        currentSource.innerHTML = '';
                        currentSource.appendChild(tempSources[sourcesIndexes.current].firstChild);
                        void currentSource.firstChild.offsetWidth;
                        currentSource.firstChild.classList.add('fslightbox-fade-in');
                    },

                    appendNext: function () {
                        nextSource.innerHTML = '';
                        nextSource.appendChild(tempSources[sourcesIndexes.next].firstChild);
                        nextSource.firstChild.classList.add('fslightbox-fade-in');
                    }
                };

                if(urls.length >= 3) {
                    // append sources only if all stage sources are loaded
                    if(tempSourcesLength >= 3) {
                        appends.appendPrevious();
                        appends.appendCurrent();
                        appends.appendNext();
                    }
                }


                if(urls.length === 2) {
                    if(tempSourcesLength >= 2) {
                        appends.appendPrevious();
                        appends.appendCurrent();
                    }
                }

                if(urls.length === 1) {
                    appends.appendCurrent();
                }
                break;
            case 'next':
                // replace loader with loaded source
                nextSource.innerHTML = '';
                nextSource.appendChild(sourceElem);
                void currentSource.firstChild.offsetWidth;
                nextSource.firstChild.classList.add('fslightbox-fade-in');
                break;
            case 'previous':
                // replace loader with loaded source
                previousSource.innerHTML = '';
                previousSource.appendChild(sourceElem);
                void currentSource.firstChild.offsetWidth;
                previousSource.firstChild.classList.add('fslightbox-fade-in');
                break;
        }
    };


    this.loadYoutubevideo = function (videoId, arrayIndex) {
        let iframe = new DOMObject('iframe').addClassesAndCreate(['fslightbox-single-source']);
        iframe.src = '//www.youtube.com/embed/' + videoId + '?enablejsapi=1';
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('frameborder', '0');
        iframe.onmouseup = function () {
            console.log('japierdoel');
        };
        self.data.mediaHolder.holder.appendChild(iframe);
        onloadListener(iframe, 1920, 1080, arrayIndex);
    };


    this.imageLoad = function (src, arrayIndex) {
        let sourceElem = new DOMObject('img').addClassesAndCreate(['fslightbox-single-source']);
        sourceElem.src = src;
        sourceElem.addEventListener('load', function () {
            onloadListener(sourceElem, this.width, this.height, arrayIndex);
        });
    };


    this.videoLoad = function (src, arrayIndex) {
        let videoElem = new DOMObject('video').addClassesAndCreate(['fslightbox-single-source']);
        let source = new DOMObject('source').elem;
        source.src = src;
        videoElem.innerText = 'Sorry, your browser doesn\'t support embedded videos, <a\n' +
            '            href="http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4">download</a> and watch\n' +
            '        with your favorite video player!';

        videoElem.setAttribute('controls', '');
        videoElem.appendChild(source);
        videoElem.addEventListener('loadedmetadata', function () {
            onloadListener(videoElem, this.videoWidth, this.videoHeight, arrayIndex);
        });
    };

    this.invalidFile = function (arrayIndex) {
        let invalidFileWrapper = new DOMObject('div').addClassesAndCreate(['fslightbox-invalid-file-wrapper']);
        invalidFileWrapper.innerHTML = 'Invalid file';

        onloadListener(invalidFileWrapper, window.innerWidth, window.innerHeight, arrayIndex);
    };


    this.createSourceElem = function (sourceUrl) {
        const parser = document.createElement('a');
        const indexOfSource = self.data.urls.indexOf(sourceUrl);

        parser.href = sourceUrl;

        function getId(sourceUrl) {
            let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            let match = sourceUrl.match(regExp);

            if (match && match[2].length == 11) {
                return match[2];
            } else {
                return 'error';
            }
        }

        if (parser.hostname === 'www.youtube.com') {
            self.data.videos[indexOfSource] = false;
            this.loadYoutubevideo(getId(sourceUrl), indexOfSource);
        } else {
            const xhr = new XMLHttpRequest();
            xhr.onloadstart = function () {
                xhr.responseType = "blob";
            };

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {

                        //check what type of file provided from link
                        let responseType = xhr.response.type;
                        responseType.indexOf('/');
                        responseType = responseType.slice(0, responseType.indexOf('/'));

                        if (responseType === 'image') {
                            _this.imageLoad(URL.createObjectURL(xhr.response), indexOfSource);
                        }

                        else if (responseType === 'video') {
                            _this.videoLoad(URL.createObjectURL(xhr.response), indexOfSource);
                            self.data.videos[indexOfSource] = true;
                        }

                        else {
                            _this.invalidFile(indexOfSource);
                        }
                    }
                }
            };

            xhr.open('get', sourceUrl, true);
            xhr.send(null);
        }
    };


    switch (typeOfLoad) {
        case 'initial':
            //append loader when loading initially
            self.appendMethods.renderHolderInitial(self,slide,DOMObject);

            if(urls.length >= 1) {
                this.createSourceElem(urls[sourcesIndexes.current]);
            }

            if(urls.length >= 2) {
                this.createSourceElem(urls[sourcesIndexes.next]);
            }

            if(urls.length >= 3) {
                this.createSourceElem(urls[sourcesIndexes.previous]);
                break;
            }
            break;

        case 'previous':
            // append loader when loading a next source
            self.appendMethods.renderHolderPrevious(self, slide, DOMObject);

            // load previous source
            this.createSourceElem(urls[sourcesIndexes.previous]);
            break;

        case 'next':
            // append loader when loading a next source
            self.appendMethods.renderHolderNext(self, slide, DOMObject);

            //load next source
            this.createSourceElem(urls[sourcesIndexes.next]);
            break;
    }
};