import * as renderSourceOuterObject from "./renderSourceOuter";
import { renderSourcesOutersWrapper } from "./renderSourcesOutersWrapper";

const fsLightbox = {
    core: { slideSwipingDown: { listener: 'listener' } },
    elements: { sourcesOutersWrapper: null, container: { appendChild: jest.fn() } },
    props: { sources: ['first', 'second'] },
};

renderSourceOuterObject.renderSourceOuter = jest.fn();
const sourceOuterWrapper = { key: 'sources-outers-wrapper', addEventListener: jest.fn() };
document.createElement = () => sourceOuterWrapper;

test('renderSourceOuterWrapper', () => {
    renderSourcesOutersWrapper(fsLightbox);
    expect(fsLightbox.elements.sourcesOutersWrapper).toEqual(sourceOuterWrapper);
    expect(fsLightbox.elements.container.appendChild).toBeCalledWith(sourceOuterWrapper);
    expect(fsLightbox.elements.sourcesOutersWrapper.addEventListener).toBeCalledWith('mousedown', 'listener');
    expect(fsLightbox.elements.sourcesOutersWrapper.addEventListener).toBeCalledWith('touchstart', 'listener', { passive: true });
    expect(renderSourceOuterObject.renderSourceOuter).toBeCalledWith(fsLightbox, 0);
    expect(renderSourceOuterObject.renderSourceOuter).toBeCalledWith(fsLightbox, 1);
});
