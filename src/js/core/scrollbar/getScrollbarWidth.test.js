import * as getOuterElementOfWidthGetterObject from "./getOuterElementOfWidthGetter";
import * as getInnerElementOfWidthGetterObject from "./getInnerElementOfWidthGetter";
import { getScrollbarWidth } from "./getScrollbarWidth";

const outer = {
    offsetWidth: 0,
    appendChild: () => {}
};
const inner = {
    offsetWidth: 0
};

test('simple actions', () => {
    getOuterElementOfWidthGetterObject.getOuterElementOfWidthGetter = jest.fn(() => outer);
    getInnerElementOfWidthGetterObject.getInnerElementOfWidthGetter = jest.fn(() => inner);
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
    outer.appendChild = jest.fn();

    getScrollbarWidth();

    expect(getOuterElementOfWidthGetterObject.getOuterElementOfWidthGetter).toBeCalled();
    expect(getInnerElementOfWidthGetterObject.getInnerElementOfWidthGetter).toBeCalled();
    expect(document.body.appendChild).toBeCalledWith(outer);
    expect(outer.appendChild).toBeCalledWith(inner);
    expect(document.body.removeChild).toBeCalledWith(outer);
});

describe('returning right scrollbar width from divs or local storage', () => {
    test('retrieved from divs', () => {
        const outer = document.createElement('div');
        const inner = document.createElement('div');
        // clearing local storage to be sure that width comes from detecting service
        localStorage.clear();
        jest.spyOn(outer, 'offsetWidth', 'get').mockReturnValue(30);
        jest.spyOn(inner, 'offsetWidth', 'get').mockReturnValue(10);
        getOuterElementOfWidthGetterObject.getOuterElementOfWidthGetter = () => outer;
        getInnerElementOfWidthGetterObject.getInnerElementOfWidthGetter = () => inner;
        expect(getScrollbarWidth()).toBe(20);
        expect(localStorage.getItem('fslightbox-scrollbar-width')).toBe('20');
    });

    test('retrieved from local storage', () => {
        localStorage.setItem('fslightbox-scrollbar-width', '200px');
        expect(getScrollbarWidth()).toBe('200px');
    });
});
