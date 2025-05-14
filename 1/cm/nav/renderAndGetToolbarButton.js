import { FLEX_CENTERED_CLASS_NAME, PREFIX } from "../../cn/classes-names";

export function renderAndGetToolbarButton(p, title) {
    var b = document.createElement("button");
    b.className = `fslightboxb ${PREFIX}toolbar-button ${FLEX_CENTERED_CLASS_NAME}`;
    b.title = title;

    p.appendChild(b);

    return b;
}
