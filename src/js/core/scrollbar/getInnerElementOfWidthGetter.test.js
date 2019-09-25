import { getInnerElementOfWidthGetter } from "./getInnerElementOfWidthGetter";

test('returning div element with right stylesElement', () => {
    const inner = getInnerElementOfWidthGetter();
    expect(inner.style.width).toBe('100%');
    expect(inner.tagName).toBe('DIV');
});
