import { FLEX_CENTERED_CLASS_NAME, SLIDE_BTN } from "../cn/classes-names";
import { renderAndGetSvg } from "./h/renderSvg";

export function renderSlideButton(p, d) {
    var b = document.createElement("button");
    b.className = `fslightboxb ${SLIDE_BTN} ${FLEX_CENTERED_CLASS_NAME}`;

    renderAndGetSvg(b, '20px', "0 0 20 20", d);

    p.appendChild(b);
}
