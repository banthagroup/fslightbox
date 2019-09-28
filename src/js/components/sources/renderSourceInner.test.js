import { renderSourceInner } from "./renderSourceInner";

const fsLightbox = {
    elements: {
        sourcesOuters: [{ appendChild: jest.fn() }],
        sourcesInners: []
    }
};

const el = { key: 'el' };
document.createElement = () => el;

test('renderSourceInner', () => {
    renderSourceInner(fsLightbox, 0);
    expect(fsLightbox.elements.sourcesInners[0]).toBe(el);
    expect(fsLightbox.elements.sourcesOuters[0].appendChild).toBeCalledWith(el);
});

