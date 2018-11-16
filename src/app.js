/**
 *
 * @param tag
 * @param classNames Array
 * @returns {HTMLElement}
 */
function createElem(tag, classNames) {
    let elem = document.createElement(tag);
    for(let i in classNames) {
        elem.classList.add(classNames[i])
    }
    return elem;
}
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

function generateMedia() {
    // for(let i = 0; i < tags.length; i++) {
    //     tags[i].addEventListener('click', () => {
    //         return false;
    //     });
    //     //renderSingleSource(tags[i].getAttribute('href'));
    // }
}
function createNav(container) {
    let nav = createElem('div', ['fslightbox-nav']);
    container.appendChild(nav);
    createSlideNumber(nav);
    createToolbar(nav);
}

function setSlideNumber(slide) {
    document.getElementById('current_slide').innerHTML = slide;
}

function createSlideNumber(nav){
    let number_container = createElem('div', ['fslightbox-slide-number-container']);
    let current_slide = createElem('div', ['fslightbox-slide-slide-number']);
    current_slide.innerHTML = fsLightbox.data.total_slides;
    current_slide.id = 'current_slide';

    let space = createElem('div', ['fslightbox-slide-slide-number']);
    space.innerHTML = '/';

    let slides = createElem('div', ['fslightbox-slide-slide-number']);
    slides.innerHTML = fsLightbox.data.total_slides;

    number_container.appendChild(current_slide);
    number_container.appendChild(space);
    number_container.appendChild(slides);
    nav.appendChild(number_container);
}

function createToolbar(nav) {
    let toolbar = createElem('div', ['fslightbox-toolbar']);
    nav.appendChild(toolbar);
}


function createDOM() {
    document.body.classList.add('fslightbox-open');
    //create container
    let container = createElem('div', ['fslightbox-container']);
    container.id = "fslightbox-container";
    document.body.appendChild(container);

    createNav(container);
    //create media holder
    let media_holder = createElem('div', ['fslightbox-media-holder']);
    container.appendChild(media_holder);

    let image = createElem('img', ['fslightbox-single-source']);
    image.src = 'images/1.jpeg';
    media_holder.appendChild(image);

    console.log(1);
}
function renderSingleSource(src) {
    let singleSource = document.createElement('img');
    singleSource.classList.add('fslightbox-single-source');
    singleSource.src = src;
    data.media_holder.appendChild(singleSource);
}



function setSlide(slide) {
    fsLightbox.data.slide = slide;
    setSlideNumber(slide);
}