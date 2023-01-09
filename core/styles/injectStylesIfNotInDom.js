import { createAndAppendStyles } from "./createAndAppendStyles";
import { FSLIGHTBOX_STYLES } from "../../constants/classes-names";

export function injectStylesIfNotInDom() {
    if (!document.getElementsByClassName(FSLIGHTBOX_STYLES).length) {
        createAndAppendStyles();
    }
}
