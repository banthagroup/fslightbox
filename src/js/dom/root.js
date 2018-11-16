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