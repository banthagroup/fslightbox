import { renderYoutube } from "./renderYoutube";

const fsLightbox = {
    collections: { sourcesLoadsHandlers: [null, { handleMaxDimensionsSourceLoad: jest.fn() }] },
    elements: { sources: [], sourcesInners: [null, { appendChild: jest.fn() }] },
    props: { sources: [null, 'https://www.youtube.com/watch?v=xshEZzpS4CQ'] }
};

const iframe = document.createElement('iframe');
document.createElement = () => iframe;

test('renderYoutube', () => {
    renderYoutube(fsLightbox, 1);
    expect(fsLightbox.elements.sources[1]).toBe(iframe);
    expect(fsLightbox.elements.sources[1].src).toBe('https://www.youtube.com/embed/xshEZzpS4CQ');
    expect(fsLightbox.elements.sourcesInners[1].appendChild).toBeCalledWith(iframe);
    expect(fsLightbox.collections.sourcesLoadsHandlers[1].handleMaxDimensionsSourceLoad).toBeCalled();
});
