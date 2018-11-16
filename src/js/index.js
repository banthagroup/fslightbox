let fsLightbox = ({
    data: {
        running: false,
        slide: 1,
        total_slides: 1,
    },
    init: function () {
        console.log(this.data.slide);
        createDOM();
    },
    clear: function () {
        document.getElementById('fslightbox-container').remove();
    }
});

data = {
    media_holder: ''
};

!function () {
    "use strict";
    fsLightbox.init();
    let tags = document.getElementsByTagName('a');
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].hasAttribute('data-fslightbox')) {
            tags[i].onclick = function () {
                fsLightbox.init();
                return false;
            };
        }
    }
}(document);