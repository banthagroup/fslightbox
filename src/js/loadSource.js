module.exports = function (self, DOMObject, url) {

    const indexOfSourceURL = self.data.urls.indexOf(url);
    const _this = this;

    let sourceDimensions = function (sourceElem, sourceWidth, sourceHeight) {
        if (typeof  sourceWidth === "undefined") {
            sourceWidth = self.data.onResizeEvent.rememberdWidth;
            sourceHeight = self.data.onResizeEvent.rememberdHeight;
        }

        const coefficient = sourceWidth / sourceHeight;
        const deviceWidth = window.innerWidth;
        const deviceHeight = window.innerHeight;
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
    let onloadListener = function (sourceElem, sourceWidth, sourceHeight) {

        //add method that changes source dimension on window resize
        self.data.onResizeEvent.sourceDimensions = function () {
            sourceDimensions(sourceElem, sourceWidth, sourceHeight);
        };

        // dimensions will be given only one time so we will need to remember it
        // for next onresize event calls
        self.data.onResizeEvent.rememberdWidth = sourceWidth;
        self.data.onResizeEvent.rememberdHeight = sourceHeight;

        //normal source dimensions needs to be stored in array
        //it will be needed when loading source from memory
        self.data.rememberedSourcesDimensions[indexOfSourceURL] = {
            "width": sourceWidth,
            "height": sourceHeight
        };
        //set dimension for the first time
        self.data.onResizeEvent.sourceDimensions(sourceWidth, sourceHeight);

        //append elem
        self.data.mediaHolder.holder.innerHTML = '';
        self.data.mediaHolder.holder.appendChild(sourceElem);

        //add some fade in animation
        sourceElem.classList.remove('fslightbox-fade-in');
        void sourceElem.offsetWidth;
        sourceElem.classList.add('fslightbox-fade-in');

        //push elem to array from where it will be loaded again if needed
        self.data.sources[indexOfSourceURL] = sourceElem;
    };


    this.loadYoutubevideo = function (videoId) {
        let iframe = new DOMObject('iframe').addClassesAndCreate(['fslightbox-single-source']);
        iframe.src = '//www.youtube.com/embed/' + videoId;
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('frameborder', '0');
        this.data.mediaHolder.holder.appendChild(iframe);
        onloadListener(iframe, 1920, 1080);
    };


    this.imageLoad = function (src) {
        let sourceElem = new DOMObject('img').addClassesAndCreate(['fslightbox-single-source']);
        let loader = new DOMObject('div').addClassesAndCreate(['fslightbox-loader']);
        self.data.mediaHolder.holder.appendChild(loader);
        sourceElem.src = src;
        sourceElem.addEventListener('load', function () {
            onloadListener(sourceElem, this.width, this.height);
        });
    };


    this.videoLoad = function (src) {
        let videoElem = new DOMObject('video').addClassesAndCreate(['fslightbox-single-source']);
        let source = new DOMObject('source').elem;
        console.log(source.offsetWidth);
        console.log(source.videoWidth);
        source.src = src;
        videoElem.innerText = 'Sorry, your browser doesn\'t support embedded videos, <a\n' +
            '            href="http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4">download</a> and watch\n' +
            '        with your favorite video player!';

        videoElem.setAttribute('controls', '');
        videoElem.appendChild(source);
        //let loader = new DOMObject('div').addClassesAndCreate(['fslightbox-loader']);
        videoElem.addEventListener('loadedmetadata', function () {
            onloadListener(videoElem, this.videoWidth, this.videoHeight);
        });
    };


    this.createSourceElem = function () {
        const parser = document.createElement('a');
        parser.href = url;

        function getId(url) {
            let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            let match = url.match(regExp);

            if (match && match[2].length == 11) {
                return match[2];
            } else {
                return 'error';
            }
        }


        if (parser.hostname === 'www.youtube.com') {
            this.loadYoutubevideo(getId(url));
        } else {
            const xhr = new XMLHttpRequest();
            xhr.onloadstart = function () {
                xhr.responseType = "blob";
            };

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let responseType = xhr.response.type;
                        responseType.indexOf('/');
                        responseType = responseType.slice(0, responseType.indexOf('/'));

                        if (responseType === 'image') {
                            _this.imageLoad(URL.createObjectURL(xhr.response));
                        }

                        if (responseType === 'video') {
                            _this.videoLoad(URL.createObjectURL(xhr.response));
                        }
                    }
                }
            };

            xhr.open('get', url, true);
            xhr.send(null);
        }
    };


    //if first time load add loader
    if (self.data.isfirstTimeLoad === true) {
        self.data.mediaHolder.holder.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
        self.data.isfirstTimeLoad = false;
    }

    //check if source was previously created and
    // create it if it wasn't or if it was load it from variable
    if (typeof self.data.sources[indexOfSourceURL] === "undefined") {
        this.createSourceElem();
    } else {
        const sourceElem = self.data.sources[indexOfSourceURL];
        const rememberedSourceDimensions = self.data.rememberedSourcesDimensions[indexOfSourceURL];
        self.data.mediaHolder.holder.innerHTML = '';
        self.data.mediaHolder.holder.appendChild(sourceElem);

        self.data.onResizeEvent.sourceDimensions = function () {
            sourceDimensions(
                sourceElem,
                rememberedSourceDimensions.width,
                rememberedSourceDimensions.height
            );
        };
        self.data.onResizeEvent.sourceDimensions();
    }


    // let index = 1;
    // setInterval( function () {
    //
    //     if(index === 6){
    //         index = 0;
    //     }
    //
    //     if(typeof self.data.sources[index] !== "undefined") {
    //         self.data.mediaHolder.holder.innerHTML = '';
    //         self.data.mediaHolder.holder.appendChild(self.data.sources[index]);
    //         index++;
    //         return;
    //     }
    //
    //     const xhr = new XMLHttpRequest();
    //     xhr.onloadstart = function() {
    //         xhr.responseType = "blob";
    //     };
    //     xhr.onreadystatechange = function() {
    //         if(xhr.readyState === 4) {
    //             if(xhr.status === 200) {
    //                 sourceElem.src = URL.createObjectURL(xhr.response);
    //             }
    //         }
    //     };
    //     xhr.open('get', self.data.urls[index], true);
    //     xhr.send(null);
    //
    //     self.data.mediaHolder.holder.innerHTML = '';
    //     self.data.sourceElem = new DOMObject('img').addClassesAndCreate(['fslightbox-single-source']);
    //
    //     sourceElem.onload = function() {
    //         self.data.onResizeEvent.rememberdWidth = this.width;
    //         self.data.onResizeEvent.rememberdHeight = this.height;
    //         self.data.onResizeEvent.sourceDimensions(this.width, this.height);
    //         self.data.mediaHolder.holder.appendChild(self.data.sourceElem);
    //         sourceElem.classList.remove('fslightbox-fade-in');
    //         void sourceElem.offsetWidth;
    //         sourceElem.classList.add('fslightbox-fade-in');
    //         self.data.sources.push(self.data.sourceElem);
    //         console.log(self.data.sources);
    //     };
    //     index++;
    // },500);
};