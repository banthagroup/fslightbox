import { getOuterElementOfWidthGetter } from "./getOuterElementOfWidthGetter";
import { getInnerElementOfWidthGetter } from "./getInnerElementOfWidthGetter";
import { SCROLLBAR_WIDTH_KEY } from "../../constants/local-storage-constants";

export function getScrollbarWidth() {
    const localStorageScrollbarWidth = localStorage.getItem(SCROLLBAR_WIDTH_KEY);
    if (localStorageScrollbarWidth)
        return localStorageScrollbarWidth;

    const outer = getOuterElementOfWidthGetter();
    const inner = getInnerElementOfWidthGetter();

    document.body.appendChild(outer);
    const widthNoScroll = outer.offsetWidth;

    outer.appendChild(inner);
    const widthWithScroll = inner.offsetWidth;

    document.body.removeChild(outer);

    const scrollbarWidth = widthNoScroll - widthWithScroll;

    localStorage.setItem(SCROLLBAR_WIDTH_KEY, scrollbarWidth.toString());

    return scrollbarWidth;
}
