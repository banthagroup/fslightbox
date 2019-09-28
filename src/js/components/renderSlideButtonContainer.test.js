import { renderSlideButtonContainer } from "./renderSlideButtonContainer";
import * as renderSlideButtonObject from "./renderSlideButton";

const fsLightbox = {
    elements: { container: { appendChild: jest.fn() } }
};

const slideBtnContainer = document.createElement('div');
document.createElement = () => slideBtnContainer;
renderSlideButtonObject.renderSlideButton = jest.fn();
const onClick = jest.fn();

test('renderSlideButtonContainer', () => {
    renderSlideButtonContainer(fsLightbox, onClick, 'previous', 'example-d');
    expect(slideBtnContainer.className).toBe('fslightbox-slide-btn-container fslightbox-slide-btn-container-previous');
    expect(slideBtnContainer.title).toBe('Previous slide');
    expect(slideBtnContainer.onclick).toBe(onClick);
    expect(renderSlideButtonObject.renderSlideButton).toBeCalledWith(slideBtnContainer, 'example-d');
    expect(fsLightbox.elements.container.appendChild).toBeCalledWith(slideBtnContainer);
});
