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


/**
 * create svg icon
 * @param d
 * @returns {HTMLElement}
 */
function createSVGIcon(d) {
    let svg = document.createElementNS('http://www.w3.org/2000/svg',"svg");
    svg.setAttributeNS(null, 'class', 'fslightbox-svg-icon');
    svg.setAttributeNS(null, 'viewBox', '0 0 20 20');

    let path = document.createElementNS('http://www.w3.org/2000/svg',"path");
    path.setAttributeNS(null, 'd', d);
    svg.appendChild(path);

    return svg;
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

function renderBottomNav(container) {
    let bottomNav = createElem('div', ['fslightbox-bottom-nav']);
    container.appendChild(bottomNav);
}
function generateMedia() {
    // for(let i = 0; i < tags.length; i++) {
    //     tags[i].addEventListener('click', () => {
    //         return false;
    //     });
    //     //renderSingleSource(tags[i].getAttribute('href'));
    // }
}
function renderNav(container) {
    let nav = createElem('div', ['fslightbox-nav']);
    container.appendChild(nav);
    createSlideNumber(nav);
    createToolbar(nav);
}


function setSlideNumber(slide) {
    document.getElementById('current_slide').innerHTML = slide;
}


function createSlideNumber(nav) {
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
    createToolbarButton(toolbar);
}


function createToolbarButton(toolbar) {
    let button = createElem('div', ['fslightbox-toolbar-button']);
    button.appendChild(
        createSVGIcon('M 11.469 10 l 7.08 -7.08 c 0.406 -0.406 0.406 -1.064 0 -1.469 c -0.406 -0.406 -1.063 -0.406 -1.469 0 L 10 8.53 l -7.081 -7.08 c -0.406 -0.406 -1.064 -0.406 -1.469 0 c -0.406 0.406 -0.406 1.063 0 1.469 L 8.531 10 L 1.45 17.081 c -0.406 0.406 -0.406 1.064 0 1.469 c 0.203 0.203 0.469 0.304 0.735 0.304 c 0.266 0 0.531 -0.101 0.735 -0.304 L 10 11.469 l 7.08 7.081 c 0.203 0.203 0.469 0.304 0.735 0.304 c 0.267 0 0.532 -0.101 0.735 -0.304 c 0.406 -0.406 0.406 -1.064 0 -1.469 L 11.469 10 Z')
    );
    toolbar.appendChild(button);
}


function createDOM() {
    document.body.classList.add('fslightbox-open');
    //create container
    let container = createElem('div', ['fslightbox-container']);
    container.id = "fslightbox-container";
    document.body.appendChild(container);

    renderNav(container);
    //create media holder
    let media_holder = createElem('div', ['fslightbox-media-holder']);
    media_holder.style.height = window.innerHeight - 106 + 'px';
    container.appendChild(media_holder);

    let image = createElem('img', ['fslightbox-single-source']);
    image.src = 'images/1.jpeg';
    media_holder.appendChild(image);

    renderBottomNav(container);
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