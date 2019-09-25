import * as renderSourceInnerObject from "./renderSourceInner";
import { renderSourceOuter } from "./renderSourceOuter";

const fsLightbox = {
    elements: {
        sourcesOutersWrapper: { appendChild: jest.fn() },
        sourcesOuters: []
    }
};

renderSourceInnerObject.renderSourceInner = jest.fn();
const sourceOuter = { key: 'source-outer' };
document.createElement = jest.fn(() => sourceOuter);

test('renderSourceOuter', () => {
    renderSourceOuter(fsLightbox, 0);
    expect(fsLightbox.elements.sourcesOutersWrapper.appendChild).toBeCalledWith(sourceOuter);
    expect(sourceOuter.innerHTML).toBe(
        '<div class="fslightbox-loader"><div></div><div></div><div></div><div></div></div>'
    );
    expect(fsLightbox.elements.sourcesOuters[0]).toBe(sourceOuter);
    expect(renderSourceInnerObject.renderSourceInner).toBeCalledWith(fsLightbox, 0);
});
