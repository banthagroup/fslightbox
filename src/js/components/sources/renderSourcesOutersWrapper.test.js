import * as renderSourceOuterObject from "./renderSourceOuter";
import { renderSourcesOutersWrapper } from "./renderSourcesOutersWrapper";

const fsLightbox = {
    elements: { sourcesOutersWrapper: null, container: { appendChild: jest.fn() } },
    props: { sources: ['first', 'second'] },
};

renderSourceOuterObject.renderSourceOuter = jest.fn();
const sourceOuterWrapper = { key: 'sources-outers-wrapper' };
document.createElement = () => sourceOuterWrapper;

test('renderSourceOuterWrapper', () => {
    renderSourcesOutersWrapper(fsLightbox);
    expect(fsLightbox.elements.sourcesOutersWrapper).toEqual(sourceOuterWrapper);
    expect(fsLightbox.elements.container.appendChild).toBeCalledWith(sourceOuterWrapper);
    expect(renderSourceOuterObject.renderSourceOuter).toBeCalledWith(fsLightbox, 0);
    expect(renderSourceOuterObject.renderSourceOuter).toBeCalledWith(fsLightbox, 1);
});
