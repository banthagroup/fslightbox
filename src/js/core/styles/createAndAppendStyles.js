import { styles } from "./styles";
import { FSLIGHTBOX_STYLES } from "../../constants/classes-names";

export function createAndAppendStyles() {
    const style = document.createElement('style');
    style.className = FSLIGHTBOX_STYLES;
    style.appendChild(document.createTextNode(styles));
    document.head.appendChild(style);
}
