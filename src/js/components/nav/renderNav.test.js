import * as renderSlideNumberObject from "./renderSlideNumber";
import * as renderToolbarObject from "./renderToolbar";
import { renderNav } from "./renderNav";

const fsLightbox = {
    props: { sources: { length: 1 } },
    elements: { container: { appendChild: jest.fn() } }
};

const nav = document.createElement('div');
document.createElement = () => nav;

renderToolbarObject.renderToolbar = jest.fn();
renderSlideNumberObject.renderSlideNumber = jest.fn();

test('renderNav', () => {
    renderNav(fsLightbox);
    expect(renderToolbarObject.renderToolbar).toBeCalledWith(fsLightbox, nav);
    expect(renderSlideNumberObject.renderSlideNumber).not.toBeCalled();
    expect(fsLightbox.elements.container.appendChild).toBeCalledWith(nav);

    fsLightbox.props.sources.length = 2;
    renderNav(fsLightbox);
    expect(renderSlideNumberObject.renderSlideNumber).toBeCalledWith(fsLightbox, nav);
});
