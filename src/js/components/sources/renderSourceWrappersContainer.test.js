import * as renderSourceOuterObject from "./renderSourceMainWrapper";
import { renderSourceWrappersContainer } from "./renderSourceWrappersContainer";

const fsLightbox = {
    core: { slideSwipingDown: { listener: 'listener' } },
    elements: { sourceWrappersContainer: null, container: { appendChild: jest.fn() } },
    props: { sources: ['first', 'second'] },
};

renderSourceOuterObject.renderSourceMainWrapper = jest.fn();
const sourceMainWrapperWrapper = { key: 'sources-outers-wrapper', addEventListener: jest.fn() };
document.createElement = () => sourceMainWrapperWrapper;

test('renderSourceOuterWrapper', () => {
    renderSourceWrappersContainer(fsLightbox);
    expect(fsLightbox.elements.sourceWrappersContainer).toEqual(sourceMainWrapperWrapper);
    expect(fsLightbox.elements.container.appendChild).toBeCalledWith(sourceMainWrapperWrapper);
    expect(fsLightbox.elements.sourceWrappersContainer.addEventListener).toBeCalledWith('mousedown', 'listener');
    expect(fsLightbox.elements.sourceWrappersContainer.addEventListener).toBeCalledWith('touchstart', 'listener', { passive: true });
    expect(renderSourceOuterObject.renderSourceMainWrapper).toBeCalledWith(fsLightbox, 0);
    expect(renderSourceOuterObject.renderSourceMainWrapper).toBeCalledWith(fsLightbox, 1);
});
