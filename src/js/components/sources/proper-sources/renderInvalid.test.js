import { renderInvalid } from "./renderInvalid";
import { FADE_IN_STRONG_CLASS_NAME } from "../../../constants/classes-names";

const fsLightbox = {
    elements: {
        sources: [],
        sourcesInners: [null, { appendChild: jest.fn(), classList: { add: jest.fn() } }],
        sourcesOuters: [null, { removeChild: jest.fn(), firstChild: 'loader' }]
    },
    props: { sources: [null, 'image/1.jpg'] }
};

const invalid = document.createElement('div');
document.createElement = () => invalid;

test('renderInvalid', () => {
    renderInvalid(fsLightbox, 1);
    expect(fsLightbox.elements.sources[1]).toBe(invalid);
    expect(fsLightbox.elements.sourcesInners[1].appendChild).toBeCalledWith(invalid);
    expect(fsLightbox.elements.sourcesInners[1].classList.add).toBeCalledWith(FADE_IN_STRONG_CLASS_NAME);
    expect(fsLightbox.elements.sourcesOuters[1].removeChild).toBeCalledWith('loader');
});
