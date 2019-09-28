import { FLEX_CENTERED_CLASS_NAME, SLIDE_BTN } from "../constants/classes-names";
import { renderAndGetSvg } from "./helpers/renderSvg";

export function renderSlideButton(parent, d) {
    const button = document.createElement('div');
    button.className = `${ SLIDE_BTN } ${ FLEX_CENTERED_CLASS_NAME }`;

    renderAndGetSvg(button, '20px', '0 0 20 20', d);

    parent.appendChild(button);
}
