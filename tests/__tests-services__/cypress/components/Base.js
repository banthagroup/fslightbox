import { testSources, testTypes } from "../../testVars";

export default function Base() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const custom = document.createElement('h6');
    custom.style.width = '100px';
    custom.style.height = '100px';
    custom.innerText = 'Custom source';
    container.appendChild(custom);

    const lightboxOpener = document.createElement('button');
    lightboxOpener.id = 'lightbox-opener';
    lightboxOpener.addEventListener('click', () => fsLightbox.open());
    container.appendChild(lightboxOpener);

    const fsLightbox = new FsLightbox();
    fsLightbox.props.sources = testSources;
    fsLightbox.props.types = testTypes;

    return fsLightbox;
}