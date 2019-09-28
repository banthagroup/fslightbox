import { SLIDE_BTN_CONTAINER } from "../constants/classes-names";
import { renderSlideButton } from "./renderSlideButton";

export function renderSlideButtonContainer({ elements: { container } }, onClick, name, d) {
    const titleName = name.charAt(0).toUpperCase() + name.slice(1);

    const slideBtnContainer = document.createElement('div');
    slideBtnContainer.className = `${ SLIDE_BTN_CONTAINER } ${ SLIDE_BTN_CONTAINER }-${ name }`;
    slideBtnContainer.title = `${ titleName } slide`;
    slideBtnContainer.onclick = onClick;

    renderSlideButton(slideBtnContainer, d);

    container.appendChild(slideBtnContainer);
}
