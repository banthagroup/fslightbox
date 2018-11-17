function createDOM() {
    document.body.classList.add('fslightbox-open');
    //create container
    let container = createElem('div', ['fslightbox-container']);
    container.id = "fslightbox-container";
    document.body.appendChild(container);

    renderSlideButtons(container);
    renderNav(container);
    //create media holder
    let media_holder = createElem('div', ['fslightbox-media-holder']);
    media_holder.style.height = window.innerHeight + 'px';
    window.onresize = function() {
        media_holder.style.height = window.innerHeight + 'px';
    };
    container.appendChild(media_holder);

    let image = createElem('img', ['fslightbox-single-source']);
    image.src = 'images/4.jpeg';
    media_holder.appendChild(image);
}


function renderSlideButtons(container) {
    let left_btn_container = createElem('div', ['fslightbox-slide-btn-container']);
    let left_btn = createElem('div', ['fslightbox-slide-btn', 'button-style']);
    let left_svg = createSVGIcon('M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z');
    left_btn.appendChild(left_svg);
    left_btn_container.appendChild(left_btn);
    container.appendChild(left_btn_container);

    let right_btn_container = createElem('div', ['fslightbox-slide-btn-container', 'fslightbox-slide-btn-right-container']);
    let right_btn = createElem('div', ['fslightbox-slide-btn', 'button-style']);
    let right_svg = createSVGIcon('M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z');
    right_btn.appendChild(right_svg);
    right_btn_container.appendChild(right_btn);
    container.appendChild(right_btn_container);
}