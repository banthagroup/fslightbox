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