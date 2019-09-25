import { createAndAppendStyles } from "./createAndAppendStyles";
import { styles } from "./styles";
import { FSLIGHTBOX_STYLES } from "../../constants/classes-names";

document.head.innerHTML = '';
createAndAppendStyles();
const stylesAppendedToHead = document.head.firstChild;

test('actions', () => {
    expect(stylesAppendedToHead.tagName).toBe('STYLE');
    expect(stylesAppendedToHead.tagName).toBe('STYLE');
    expect(stylesAppendedToHead.innerHTML).toBe(styles);
    expect(stylesAppendedToHead.className).toBe(FSLIGHTBOX_STYLES);
});
