import { createAndAppendStyles } from "./createAndAppendStyles";
import { FSLIGHTBOX_STYLES } from "../../cn/classes-names";

export function injs() {
    if (!document.getElementsByClassName(FSLIGHTBOX_STYLES).length) {
        createAndAppendStyles();
    }
}
