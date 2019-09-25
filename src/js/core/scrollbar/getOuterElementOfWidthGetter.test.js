import { getOuterElementOfWidthGetter } from "./getOuterElementOfWidthGetter";

test('returning div with proper stylesElement', () => {
    const outer = getOuterElementOfWidthGetter();
    expect(outer.style.visibility).toBe('hidden');
    expect(outer.style.width).toBe('100px');
    expect(outer.style.msOverflowStyle).toBe('scrollbar');
    expect(outer.style.overflow).toBe('scroll');
    expect(outer.tagName).toBe('DIV');
});
