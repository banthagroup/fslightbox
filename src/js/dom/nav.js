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

