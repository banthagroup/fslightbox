import { renderImage } from "./renderImage";

const fsLightbox = {
    collections: { sourcesLoadsHandlers: [null, { handleImageLoad: jest.fn() }] },
    elements: { sources: [], sourcesInners: [null, { appendChild: jest.fn() }] },
    props: { sources: [null, 'image/1.jpg'] }
};

const img = document.createElement('img');
document.createElement = () => img;

test('renderImage', () => {
    renderImage(fsLightbox, 1);
    expect(fsLightbox.elements.sources[1]).toBe(img);
    expect(fsLightbox.elements.sourcesInners[1].appendChild).toBeCalledWith(img);
    img.dispatchEvent(new Event('load'));
    expect(fsLightbox.collections.sourcesLoadsHandlers[1].handleImageLoad).toBeCalled();
});
