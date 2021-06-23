import * as renderSourceMainWrapperObject from "./renderSourceMainWrapper";
import { renderSourceWrappersContainer } from "./renderSourceWrappersContainer";

const fsLightbox = {
    core: { sourcesPointerDown: { listener: 'listener' } },
    elements: { sourceWrappersContainer: null, container: { appendChild: jest.fn() } },
    props: { sources: ['first', 'second'] },
};

renderSourceMainWrapperObject.renderSourceMainWrapper = jest.fn();
const sourceMainWrapperWrapper = { key: 'sources-outers-wrapper', addEventListener: () => {} };
document.createElement = () => sourceMainWrapperWrapper;

test('render SourceWrappersContainer', () => {
    renderSourceWrappersContainer(fsLightbox);
    expect(fsLightbox.elements.sourceWrappersContainer).toEqual(sourceMainWrapperWrapper);
    expect(fsLightbox.elements.container.appendChild).toBeCalledWith(sourceMainWrapperWrapper);
    expect(renderSourceMainWrapperObject.renderSourceMainWrapper).toBeCalledWith(fsLightbox, 0);
    expect(renderSourceMainWrapperObject.renderSourceMainWrapper).toBeCalledWith(fsLightbox, 1);
});
