import { styles } from "../../s";
import { FSLIGHTBOX_STYLES } from "../../cn/classes-names";

export function createAndAppendStyles() {
    const style = document.createElement('style');
    style.className = FSLIGHTBOX_STYLES;
    style.appendChild(document.createTextNode(styles));
    document.head.appendChild(style);
}
