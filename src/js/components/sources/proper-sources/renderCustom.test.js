import { renderCustom } from "./renderCustom";
import { SOURCE_CLASS_NAME } from "../../../constants/classes-names";

const customSource = document.createElement('div');
const fsLightbox = {
    collections: { sourcesLoadsHandlers: [null, { handleCustomLoad: jest.fn() }] },
    elements: { sources: [], sourcesInners: [null, { appendChild: jest.fn() }] },
    props: { sources: [null, customSource], customClasses: [] }
};
customSource.classList.add = jest.fn();

test('renderCustom', () => {
    renderCustom(fsLightbox, 1);
    expect(fsLightbox.elements.sources[1]).toBe(customSource);
    expect(fsLightbox.elements.sources[1].classList.add).toBeCalledWith(SOURCE_CLASS_NAME);
    expect(fsLightbox.elements.sourcesInners[1].appendChild).toBeCalledWith(customSource);
    expect(fsLightbox.collections.sourcesLoadsHandlers[1].handleCustomLoad).toBeCalled();

    fsLightbox.props.customClasses = [null, 'example-class'];
    renderCustom(fsLightbox, 1);
    expect(fsLightbox.elements.sources[1].classList.add).toBeCalledWith('example-class');
});
