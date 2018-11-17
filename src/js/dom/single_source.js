function renderSingleSource(src) {
    let singleSource = document.createElement('img');
    singleSource.classList.add('fslightbox-single-source');
    singleSource.src = src;
    data.media_holder.appendChild(singleSource);
}

